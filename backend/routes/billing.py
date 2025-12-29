from fastapi import APIRouter, HTTPException, Depends, Request, Header
from datetime import datetime, timedelta, timezone
from typing import Optional
from pydantic import BaseModel
import logging
import os

from models.user import User, PlanType, BillingCycle, SubscriptionStatus
from models.subscription import STRIPE_PRICES, PurchaseNotification
from routes.auth import get_current_user
from utils.email import send_purchase_confirmation_email

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/billing", tags=["Billing"])

# This will be set from server.py
db = None
stripe_checkout = None

def set_db(database):
    global db
    db = database

def set_stripe(checkout):
    global stripe_checkout
    stripe_checkout = checkout


class CreateCheckoutRequest(BaseModel):
    plan: str  # 'starter' or 'professional'
    billing_cycle: str  # 'monthly' or 'yearly'
    origin_url: str  # Frontend origin URL


class TestPlanRequest(BaseModel):
    plan: str  # 'starter' or 'professional'
    billing_cycle: str  # 'monthly' or 'yearly'


@router.post("/create-checkout")
async def create_checkout(data: CreateCheckoutRequest, current_user: User = Depends(get_current_user)):
    """Create Stripe checkout session"""
    if not stripe_checkout:
        raise HTTPException(status_code=500, detail="Payment system not configured")
    
    # Validate plan
    price_key = f"{data.plan}_{data.billing_cycle}"
    if price_key not in STRIPE_PRICES:
        raise HTTPException(status_code=400, detail="Invalid plan or billing cycle")
    
    price_info = STRIPE_PRICES[price_key]
    
    try:
        from emergentintegrations.payments.stripe.checkout import CheckoutSessionRequest
        
        success_url = f"{data.origin_url}/checkout/success?session_id={{CHECKOUT_SESSION_ID}}"
        cancel_url = f"{data.origin_url}/checkout/cancel"
        
        checkout_request = CheckoutSessionRequest(
            amount=price_info["amount"],
            currency=price_info["currency"],
            success_url=success_url,
            cancel_url=cancel_url,
            metadata={
                "user_id": current_user.id,
                "plan": data.plan,
                "billing_cycle": data.billing_cycle,
                "email": current_user.email
            }
        )
        
        session = await stripe_checkout.create_checkout_session(checkout_request)
        
        # Create payment transaction record
        await db.payment_transactions.insert_one({
            "session_id": session.session_id,
            "user_id": current_user.id,
            "amount": price_info["amount"],
            "currency": price_info["currency"],
            "plan": data.plan,
            "billing_cycle": data.billing_cycle,
            "payment_status": "initiated",
            "created_at": datetime.now(timezone.utc).isoformat()
        })
        
        return {"checkout_url": session.url, "session_id": session.session_id}
        
    except Exception as e:
        logger.error(f"Failed to create checkout session: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create checkout session")


@router.get("/checkout/status/{session_id}")
async def get_checkout_status(session_id: str, current_user: User = Depends(get_current_user)):
    """Get checkout session status"""
    if not stripe_checkout:
        raise HTTPException(status_code=500, detail="Payment system not configured")
    
    try:
        status = await stripe_checkout.get_checkout_status(session_id)
        
        # Update payment transaction
        await db.payment_transactions.update_one(
            {"session_id": session_id},
            {"$set": {
                "payment_status": status.payment_status,
                "status": status.status,
                "updated_at": datetime.now(timezone.utc).isoformat()
            }}
        )
        
        # If payment is successful, update user subscription
        if status.payment_status == "paid":
            # Get transaction to find plan details
            transaction = await db.payment_transactions.find_one({"session_id": session_id})
            if transaction and transaction.get("payment_status") != "completed":
                plan = transaction.get("plan", "starter")
                billing_cycle = transaction.get("billing_cycle", "monthly")
                
                # Calculate subscription end date
                if billing_cycle == "yearly":
                    ends_at = datetime.now(timezone.utc) + timedelta(days=365)
                else:
                    ends_at = datetime.now(timezone.utc) + timedelta(days=30)
                
                # Update user subscription
                await db.users.update_one(
                    {"id": current_user.id},
                    {"$set": {
                        "plan": plan,
                        "billing_cycle": billing_cycle,
                        "subscription_status": "active",
                        "subscription_ends_at": ends_at.isoformat(),
                        "updated_at": datetime.now(timezone.utc).isoformat()
                    }}
                )
                
                # Mark transaction as completed
                await db.payment_transactions.update_one(
                    {"session_id": session_id},
                    {"$set": {"payment_status": "completed"}}
                )
                
                # Create purchase notification
                first_name = current_user.name.split()[0] if current_user.name else "Customer"
                last_initial = current_user.name.split()[-1][0] if len(current_user.name.split()) > 1 else ""
                display_name = f"{first_name} {last_initial}." if last_initial else first_name
                
                notification = PurchaseNotification(
                    user_name=display_name,
                    plan=plan,
                    billing_cycle=billing_cycle,
                    is_real=True
                )
                notification.compute_display_name()
                
                await db.purchase_notifications.insert_one({
                    **notification.model_dump(),
                    "created_at": datetime.now(timezone.utc).isoformat()
                })
                
                # Send confirmation email
                send_purchase_confirmation_email(
                    current_user.email,
                    current_user.name,
                    plan,
                    billing_cycle,
                    current_user.license_key
                )
                
                logger.info(f"Subscription activated for {current_user.email}: {plan} ({billing_cycle})")
        
        return {
            "status": status.status,
            "payment_status": status.payment_status,
            "amount_total": status.amount_total,
            "currency": status.currency
        }
        
    except Exception as e:
        logger.error(f"Failed to get checkout status: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get checkout status")


@router.get("/subscription")
async def get_subscription(current_user: User = Depends(get_current_user)):
    """Get subscription details"""
    plan = current_user.plan.value if hasattr(current_user.plan, 'value') else current_user.plan
    
    return {
        "plan": plan,
        "status": current_user.subscription_status.value if hasattr(current_user.subscription_status, 'value') else current_user.subscription_status,
        "billing_cycle": current_user.billing_cycle.value if current_user.billing_cycle and hasattr(current_user.billing_cycle, 'value') else current_user.billing_cycle,
        "current_period_end": current_user.subscription_ends_at,
        "stripe_customer_id": current_user.stripe_customer_id,
        "stripe_subscription_id": current_user.stripe_subscription_id
    }


@router.post("/cancel")
async def cancel_subscription(current_user: User = Depends(get_current_user)):
    """Cancel subscription (will end at period end)"""
    await db.users.update_one(
        {"id": current_user.id},
        {"$set": {
            "subscription_status": "cancelled",
            "updated_at": datetime.now(timezone.utc).isoformat()
        }}
    )
    
    ends_at = current_user.subscription_ends_at
    message = "Subscription cancelled."
    if ends_at:
        message = f"Subscription cancelled. You'll have access until {ends_at}."
    
    return {"success": True, "message": message}


# TESTING PLAN - For development only
@router.post("/activate-test-plan")
async def activate_test_plan(data: TestPlanRequest, current_user: User = Depends(get_current_user)):
    """Activate a plan without Stripe payment (for testing only)"""
    if data.plan not in ["starter", "professional"]:
        raise HTTPException(status_code=400, detail="Invalid plan")
    
    if data.billing_cycle not in ["monthly", "yearly"]:
        raise HTTPException(status_code=400, detail="Invalid billing cycle")
    
    # Calculate subscription end date (30 days for testing)
    ends_at = datetime.now(timezone.utc) + timedelta(days=30)
    
    # Update user
    await db.users.update_one(
        {"id": current_user.id},
        {"$set": {
            "plan": data.plan,
            "billing_cycle": data.billing_cycle,
            "subscription_status": "active",
            "subscription_ends_at": ends_at.isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }}
    )
    
    # Get updated user
    user_doc = await db.users.find_one({"id": current_user.id}, {"_id": 0})
    
    # Create a test purchase notification
    first_name = current_user.name.split()[0] if current_user.name else "Tester"
    notification = PurchaseNotification(
        user_name=f"{first_name} (Test)",
        plan=data.plan,
        billing_cycle=data.billing_cycle,
        is_real=False
    )
    notification.compute_display_name()
    
    await db.purchase_notifications.insert_one({
        **notification.model_dump(),
        "created_at": datetime.now(timezone.utc).isoformat()
    })
    
    logger.info(f"Test plan activated for {current_user.email}: {data.plan} ({data.billing_cycle})")
    
    return {
        "success": True,
        "message": f"Test plan activated! You now have {data.plan} plan for 30 days.",
        "user": {
            "plan": data.plan,
            "billing_cycle": data.billing_cycle,
            "subscription_status": "active",
            "subscription_ends_at": ends_at.isoformat()
        }
    }


# Stripe webhook handler
@router.post("/webhook/stripe")
async def stripe_webhook(request: Request, stripe_signature: str = Header(None, alias="Stripe-Signature")):
    """Handle Stripe webhook events"""
    if not stripe_checkout:
        raise HTTPException(status_code=500, detail="Payment system not configured")
    
    try:
        body = await request.body()
        webhook_response = await stripe_checkout.handle_webhook(body, stripe_signature)
        
        event_type = webhook_response.event_type
        metadata = webhook_response.metadata or {}
        
        logger.info(f"Stripe webhook received: {event_type}")
        
        if event_type == "checkout.session.completed":
            user_id = metadata.get("user_id")
            plan = metadata.get("plan")
            billing_cycle = metadata.get("billing_cycle")
            
            if user_id and plan:
                # Update user subscription
                if billing_cycle == "yearly":
                    ends_at = datetime.now(timezone.utc) + timedelta(days=365)
                else:
                    ends_at = datetime.now(timezone.utc) + timedelta(days=30)
                
                await db.users.update_one(
                    {"id": user_id},
                    {"$set": {
                        "plan": plan,
                        "billing_cycle": billing_cycle,
                        "subscription_status": "active",
                        "subscription_ends_at": ends_at.isoformat(),
                        "updated_at": datetime.now(timezone.utc).isoformat()
                    }}
                )
        
        return {"received": True}
        
    except Exception as e:
        logger.error(f"Webhook error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
