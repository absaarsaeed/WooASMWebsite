from fastapi import APIRouter, HTTPException, Depends, Header, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from datetime import datetime, timedelta, timezone
from typing import Optional
import logging

from models.user import (
    User, UserCreate, UserLogin, UserResponse, TokenResponse,
    PasswordResetRequest, PasswordReset, PlanType, SubscriptionStatus
)
from utils.auth import (
    hash_password, verify_password, create_access_token,
    create_refresh_token, verify_token, generate_verification_token
)
from utils.email import (
    send_welcome_email, send_verification_email, send_password_reset_email
)

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/auth", tags=["Authentication"])
security = HTTPBearer(auto_error=False)

# This will be set from server.py
db = None

def set_db(database):
    global db
    db = database


async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> Optional[User]:
    """Get current user from JWT token"""
    if not credentials:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    payload = verify_token(credentials.credentials, "access")
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token payload")
    
    user_doc = await db.users.find_one({"id": user_id}, {"_id": 0})
    if not user_doc:
        raise HTTPException(status_code=401, detail="User not found")
    
    return User(**user_doc)


def user_to_response(user: User) -> UserResponse:
    """Convert User model to UserResponse"""
    return UserResponse(
        id=user.id,
        email=user.email,
        name=user.name,
        company_name=user.company_name,
        email_verified=user.email_verified,
        plan=user.plan,
        billing_cycle=user.billing_cycle,
        subscription_status=user.subscription_status,
        subscription_ends_at=user.subscription_ends_at,
        license_key=user.license_key,
        created_at=user.created_at,
        last_login_at=user.last_login_at
    )


@router.post("/register", response_model=dict)
async def register(user_data: UserCreate):
    """Register a new user"""
    # Check if email already exists
    existing_user = await db.users.find_one({"email": user_data.email.lower()})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create verification token
    verification_token = generate_verification_token()
    
    # Create user
    user = User(
        email=user_data.email.lower(),
        password_hash=hash_password(user_data.password),
        name=user_data.name,
        company_name=user_data.company_name,
        verification_token=verification_token
    )
    
    # Save to database
    user_dict = user.model_dump()
    user_dict['created_at'] = user_dict['created_at'].isoformat()
    user_dict['updated_at'] = user_dict['updated_at'].isoformat()
    
    await db.users.insert_one(user_dict)
    
    # Send verification email
    send_verification_email(user.email, user.name, verification_token)
    send_welcome_email(user.email, user.name)
    
    logger.info(f"New user registered: {user.email}")
    
    return {
        "success": True,
        "message": "Registration successful. Please check your email to verify your account.",
        "user": user_to_response(user).model_dump()
    }


@router.post("/login", response_model=TokenResponse)
async def login(credentials: UserLogin):
    """Login and get access tokens"""
    user_doc = await db.users.find_one({"email": credentials.email.lower()}, {"_id": 0})
    if not user_doc:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    user = User(**user_doc)
    
    if not verify_password(credentials.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Update last login
    await db.users.update_one(
        {"id": user.id},
        {"$set": {"last_login_at": datetime.now(timezone.utc).isoformat()}}
    )
    user.last_login_at = datetime.now(timezone.utc)
    
    # Create tokens
    access_token = create_access_token({"sub": user.id, "email": user.email})
    refresh_token = create_refresh_token({"sub": user.id, "email": user.email})
    
    logger.info(f"User logged in: {user.email}")
    
    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        user=user_to_response(user)
    )


@router.post("/logout")
async def logout(current_user: User = Depends(get_current_user)):
    """Logout user (invalidate tokens client-side)"""
    # In a production app, you might want to blacklist the token
    return {"success": True, "message": "Logged out successfully"}


@router.post("/refresh")
async def refresh_token(refresh_token: str):
    """Refresh access token"""
    payload = verify_token(refresh_token, "refresh")
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired refresh token")
    
    user_id = payload.get("sub")
    user_doc = await db.users.find_one({"id": user_id}, {"_id": 0})
    if not user_doc:
        raise HTTPException(status_code=401, detail="User not found")
    
    user = User(**user_doc)
    access_token = create_access_token({"sub": user.id, "email": user.email})
    
    return {"access_token": access_token}


@router.post("/verify-email")
async def verify_email(token: str):
    """Verify email address"""
    user_doc = await db.users.find_one({"verification_token": token}, {"_id": 0})
    if not user_doc:
        raise HTTPException(status_code=400, detail="Invalid verification token")
    
    await db.users.update_one(
        {"verification_token": token},
        {"$set": {
            "email_verified": True,
            "verification_token": None,
            "updated_at": datetime.now(timezone.utc).isoformat()
        }}
    )
    
    return {"success": True, "message": "Email verified successfully"}


@router.post("/forgot-password")
async def forgot_password(data: PasswordResetRequest):
    """Request password reset"""
    user_doc = await db.users.find_one({"email": data.email.lower()}, {"_id": 0})
    
    # Always return success to prevent email enumeration
    if user_doc:
        user = User(**user_doc)
        reset_token = generate_verification_token()
        expires = datetime.now(timezone.utc) + timedelta(hours=1)
        
        await db.users.update_one(
            {"id": user.id},
            {"$set": {
                "reset_token": reset_token,
                "reset_token_expires": expires.isoformat(),
                "updated_at": datetime.now(timezone.utc).isoformat()
            }}
        )
        
        send_password_reset_email(user.email, user.name, reset_token)
    
    return {"success": True, "message": "If the email exists, a reset link has been sent."}


@router.post("/reset-password")
async def reset_password(data: PasswordReset):
    """Reset password with token"""
    user_doc = await db.users.find_one({"reset_token": data.token}, {"_id": 0})
    if not user_doc:
        raise HTTPException(status_code=400, detail="Invalid reset token")
    
    user = User(**user_doc)
    
    # Check if token expired
    if user.reset_token_expires:
        expires = user.reset_token_expires
        if isinstance(expires, str):
            expires = datetime.fromisoformat(expires)
        if expires < datetime.now(timezone.utc):
            raise HTTPException(status_code=400, detail="Reset token has expired")
    
    # Update password
    await db.users.update_one(
        {"id": user.id},
        {"$set": {
            "password_hash": hash_password(data.new_password),
            "reset_token": None,
            "reset_token_expires": None,
            "updated_at": datetime.now(timezone.utc).isoformat()
        }}
    )
    
    return {"success": True, "message": "Password reset successfully"}


@router.get("/me", response_model=dict)
async def get_me(current_user: User = Depends(get_current_user)):
    """Get current user info"""
    # Get user's sites
    sites = await db.site_activations.find(
        {"user_id": current_user.id, "is_active": True},
        {"_id": 0}
    ).to_list(100)
    
    # Get current month usage
    current_month = datetime.now(timezone.utc).strftime("%Y-%m")
    usage_doc = await db.usage_records.find_one(
        {"user_id": current_user.id, "month": current_month},
        {"_id": 0}
    )
    
    return {
        "user": user_to_response(current_user).model_dump(),
        "sites": sites,
        "usage": usage_doc
    }


@router.post("/resend-verification")
async def resend_verification(current_user: User = Depends(get_current_user)):
    """Resend verification email"""
    if current_user.email_verified:
        return {"success": True, "message": "Email already verified"}
    
    verification_token = generate_verification_token()
    
    await db.users.update_one(
        {"id": current_user.id},
        {"$set": {
            "verification_token": verification_token,
            "updated_at": datetime.now(timezone.utc).isoformat()
        }}
    )
    
    send_verification_email(current_user.email, current_user.name, verification_token)
    
    return {"success": True, "message": "Verification email sent"}
