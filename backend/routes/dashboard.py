from fastapi import APIRouter, HTTPException, Depends
from datetime import datetime, timezone
from typing import Optional, List
import logging

from models.user import User, UserUpdate, PasswordChange, PlanType
from models.subscription import PLAN_LIMITS, UsageRecord
from utils.auth import hash_password, verify_password
from routes.auth import get_current_user, user_to_response

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

# This will be set from server.py
db = None

def set_db(database):
    global db
    db = database


@router.get("")
async def get_dashboard(current_user: User = Depends(get_current_user)):
    """Get dashboard overview"""
    plan = current_user.plan.value if isinstance(current_user.plan, PlanType) else current_user.plan
    limits = PLAN_LIMITS.get(plan, PLAN_LIMITS["free"])
    
    # Get current month usage
    current_month = datetime.now(timezone.utc).strftime("%Y-%m")
    usage_doc = await db.usage_records.find_one(
        {"user_id": current_user.id, "month": current_month},
        {"_id": 0}
    )
    
    if not usage_doc:
        usage_doc = {
            "assistant_actions": 0,
            "content_generations": 0,
            "chatbot_messages": 0,
            "insights_refreshes": 0
        }
    
    # Calculate usage percentage
    total_used = (
        usage_doc.get("assistant_actions", 0) +
        usage_doc.get("chatbot_messages", 0) +
        (usage_doc.get("content_generations", 0) * 4) +
        (usage_doc.get("insights_refreshes", 0) * 10)
    )
    total_limit = (
        limits["assistant_monthly"] +
        limits["chatbot_monthly"] +
        (limits["content_monthly"] * 4) +
        (limits["insights_monthly"] * 10)
    )
    percentage_used = min(100, int((total_used / total_limit) * 100)) if total_limit > 0 else 0
    
    # Get active sites count
    sites = await db.site_activations.count_documents(
        {"user_id": current_user.id, "is_active": True}
    )
    
    return {
        "user": {
            "name": current_user.name,
            "email": current_user.email,
            "plan": plan,
            "license_key": current_user.license_key
        },
        "subscription": {
            "status": current_user.subscription_status.value if hasattr(current_user.subscription_status, 'value') else current_user.subscription_status,
            "ends_at": current_user.subscription_ends_at,
            "billing_cycle": current_user.billing_cycle.value if current_user.billing_cycle and hasattr(current_user.billing_cycle, 'value') else current_user.billing_cycle
        },
        "usage": {
            **usage_doc,
            "percentage_used": percentage_used
        },
        "sites_count": sites,
        "limits": limits
    }


@router.get("/license")
async def get_license(current_user: User = Depends(get_current_user)):
    """Get license key details"""
    plan = current_user.plan.value if isinstance(current_user.plan, PlanType) else current_user.plan
    limits = PLAN_LIMITS.get(plan, PLAN_LIMITS["free"])
    
    sites_count = await db.site_activations.count_documents(
        {"user_id": current_user.id, "is_active": True}
    )
    
    return {
        "license_key": current_user.license_key,
        "plan": plan,
        "status": current_user.subscription_status.value if hasattr(current_user.subscription_status, 'value') else current_user.subscription_status,
        "sites_used": sites_count,
        "sites_allowed": limits["max_sites"]
    }


@router.post("/regenerate-license")
async def regenerate_license(current_user: User = Depends(get_current_user)):
    """Regenerate license key (deactivates all sites)"""
    from models.user import generate_license_key
    
    new_license_key = generate_license_key()
    
    # Deactivate all sites
    await db.site_activations.update_many(
        {"user_id": current_user.id},
        {"$set": {"is_active": False}}
    )
    
    # Update user's license key
    await db.users.update_one(
        {"id": current_user.id},
        {"$set": {
            "license_key": new_license_key,
            "updated_at": datetime.now(timezone.utc).isoformat()
        }}
    )
    
    logger.info(f"License key regenerated for user {current_user.id}")
    
    return {
        "success": True,
        "new_license_key": new_license_key,
        "message": "License key regenerated. All sites have been deactivated. Please re-activate your plugin."
    }


@router.get("/usage")
async def get_usage(period: str = "30d", current_user: User = Depends(get_current_user)):
    """Get usage history"""
    # Get current month usage
    current_month = datetime.now(timezone.utc).strftime("%Y-%m")
    current_usage = await db.usage_records.find_one(
        {"user_id": current_user.id, "month": current_month},
        {"_id": 0}
    )
    
    if not current_usage:
        current_usage = {
            "month": current_month,
            "assistant_actions": 0,
            "content_generations": 0,
            "chatbot_messages": 0,
            "insights_refreshes": 0
        }
    
    # Get usage history (last 6 months)
    history = await db.usage_records.find(
        {"user_id": current_user.id},
        {"_id": 0}
    ).sort("month", -1).limit(6).to_list(6)
    
    return {
        "current_month": current_usage,
        "history": history
    }


@router.get("/sites")
async def get_sites(current_user: User = Depends(get_current_user)):
    """Get all activated sites"""
    plan = current_user.plan.value if isinstance(current_user.plan, PlanType) else current_user.plan
    limits = PLAN_LIMITS.get(plan, PLAN_LIMITS["free"])
    
    sites = await db.site_activations.find(
        {"user_id": current_user.id},
        {"_id": 0}
    ).to_list(100)
    
    active_count = sum(1 for s in sites if s.get("is_active", False))
    
    return {
        "sites": sites,
        "max_sites": limits["max_sites"],
        "sites_remaining": max(0, limits["max_sites"] - active_count)
    }


@router.delete("/sites/{site_id}")
async def deactivate_site(site_id: str, current_user: User = Depends(get_current_user)):
    """Deactivate a site"""
    result = await db.site_activations.update_one(
        {"site_id": site_id, "user_id": current_user.id},
        {"$set": {"is_active": False}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Site not found")
    
    return {"success": True, "message": "Site deactivated"}


@router.put("/settings")
async def update_settings(data: UserUpdate, current_user: User = Depends(get_current_user)):
    """Update user settings"""
    update_fields = {}
    
    if data.name:
        update_fields["name"] = data.name
    if data.company_name is not None:
        update_fields["company_name"] = data.company_name
    if data.email:
        # Check if email is already taken
        existing = await db.users.find_one({"email": data.email.lower(), "id": {"$ne": current_user.id}})
        if existing:
            raise HTTPException(status_code=400, detail="Email already in use")
        update_fields["email"] = data.email.lower()
        update_fields["email_verified"] = False  # Require re-verification
    
    if update_fields:
        update_fields["updated_at"] = datetime.now(timezone.utc).isoformat()
        await db.users.update_one(
            {"id": current_user.id},
            {"$set": update_fields}
        )
    
    # Get updated user
    user_doc = await db.users.find_one({"id": current_user.id}, {"_id": 0})
    updated_user = User(**user_doc)
    
    return {
        "success": True,
        "user": user_to_response(updated_user).model_dump()
    }


@router.post("/change-password")
async def change_password(data: PasswordChange, current_user: User = Depends(get_current_user)):
    """Change user password"""
    if not verify_password(data.current_password, current_user.password_hash):
        raise HTTPException(status_code=400, detail="Current password is incorrect")
    
    await db.users.update_one(
        {"id": current_user.id},
        {"$set": {
            "password_hash": hash_password(data.new_password),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }}
    )
    
    return {"success": True, "message": "Password changed successfully"}


@router.delete("/account")
async def delete_account(current_user: User = Depends(get_current_user)):
    """Delete user account"""
    # Delete all associated data
    await db.site_activations.delete_many({"user_id": current_user.id})
    await db.usage_records.delete_many({"user_id": current_user.id})
    await db.plugin_events.delete_many({"user_id": current_user.id})
    await db.users.delete_one({"id": current_user.id})
    
    logger.info(f"Account deleted: {current_user.email}")
    
    return {"success": True, "message": "Account deleted successfully"}
