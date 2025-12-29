from fastapi import APIRouter, HTTPException, Header, Request
from datetime import datetime, timezone
from typing import Optional, Dict, Any
from pydantic import BaseModel
import logging
import hashlib

from models.user import User, PlanType
from models.subscription import SiteActivation, UsageRecord, PluginEvent, PLAN_LIMITS

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/plugin", tags=["Plugin API"])

# This will be set from server.py
db = None

def set_db(database):
    global db
    db = database


class ValidateLicenseRequest(BaseModel):
    license_key: str
    site_url: str
    site_id: str
    plugin_version: str
    wordpress_version: Optional[str] = None
    woocommerce_version: Optional[str] = None


class TrackUsageRequest(BaseModel):
    action_type: str  # 'assistant_action', 'content_generation', 'chatbot_message', 'insights_refresh'
    count: int = 1


class TrackEventRequest(BaseModel):
    event_type: str
    event_name: str
    event_data: Dict[str, Any] = {}


def hash_ip(ip: str) -> str:
    """Hash IP address for privacy"""
    return hashlib.sha256(ip.encode()).hexdigest()[:16]


@router.post("/validate-license")
async def validate_license(data: ValidateLicenseRequest, request: Request):
    """
    Validate a license key and return plan features.
    Called by the WordPress plugin to verify license.
    """
    # Find user by license key
    user_doc = await db.users.find_one({"license_key": data.license_key}, {"_id": 0})
    
    if not user_doc:
        return {
            "valid": False,
            "error": "invalid_license",
            "message": "License key not found. Please check your license key and try again.",
            "dashboard_url": "https://wooasm.com/dashboard/license"
        }
    
    user = User(**user_doc)
    plan = user.plan.value if isinstance(user.plan, PlanType) else user.plan
    
    # Check subscription status
    if user.subscription_status.value == "cancelled":
        # Check if subscription has expired
        if user.subscription_ends_at:
            ends_at = user.subscription_ends_at
            if isinstance(ends_at, str):
                ends_at = datetime.fromisoformat(ends_at.replace('Z', '+00:00'))
            if ends_at < datetime.now(timezone.utc):
                return {
                    "valid": False,
                    "error": "license_expired",
                    "message": "Your subscription has expired. Please renew to continue using premium features.",
                    "renew_url": "https://wooasm.com/dashboard/billing"
                }
    
    if user.subscription_status.value == "past_due":
        return {
            "valid": False,
            "error": "payment_failed",
            "message": "Payment failed. Please update your payment method.",
            "billing_url": "https://wooasm.com/dashboard/billing"
        }
    
    limits = PLAN_LIMITS.get(plan, PLAN_LIMITS["free"])
    
    # Check site limits
    active_sites = await db.site_activations.count_documents({
        "user_id": user.id,
        "is_active": True,
        "site_id": {"$ne": data.site_id}
    })
    
    if active_sites >= limits["max_sites"]:
        # Check if this site is already activated
        existing_site = await db.site_activations.find_one({
            "user_id": user.id,
            "site_id": data.site_id
        })
        if not existing_site:
            return {
                "valid": False,
                "error": "site_limit_reached",
                "message": f"You've reached the maximum number of sites ({limits['max_sites']}) for your plan. Please upgrade or deactivate another site.",
                "upgrade_url": "https://wooasm.com/pricing",
                "sites_url": "https://wooasm.com/dashboard/sites"
            }
    
    # Get current month usage
    current_month = datetime.now(timezone.utc).strftime("%Y-%m")
    usage_doc = await db.usage_records.find_one(
        {"user_id": user.id, "month": current_month},
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
        usage_doc.get("chatbot_messages", 0)
    )
    total_limit = limits["assistant_monthly"] + limits["chatbot_monthly"]
    percentage_used = min(100, int((total_used / total_limit) * 100)) if total_limit > 0 else 0
    
    # Activate/update site
    site_data = {
        "user_id": user.id,
        "license_key": data.license_key,
        "site_url": data.site_url,
        "site_id": data.site_id,
        "plugin_version": data.plugin_version,
        "wordpress_version": data.wordpress_version,
        "woocommerce_version": data.woocommerce_version,
        "last_seen_at": datetime.now(timezone.utc).isoformat(),
        "is_active": True
    }
    
    existing_site = await db.site_activations.find_one({"site_id": data.site_id})
    if existing_site:
        await db.site_activations.update_one(
            {"site_id": data.site_id},
            {"$set": site_data}
        )
    else:
        site_data["id"] = str(__import__('uuid').uuid4())
        site_data["activated_at"] = datetime.now(timezone.utc).isoformat()
        await db.site_activations.insert_one(site_data)
    
    # Track plugin activation event
    await track_event_internal(
        user_id=user.id,
        site_id=data.site_id,
        license_key=data.license_key,
        event_type="plugin_activated",
        event_name="license_validated",
        plugin_version=data.plugin_version,
        ip_hash=hash_ip(request.client.host) if request.client else None
    )
    
    logger.info(f"License validated for {user.email} on {data.site_url}")
    
    return {
        "valid": True,
        "plan": plan,
        "features": limits["features"],
        "limits": {
            "assistant_monthly": limits["assistant_monthly"],
            "content_monthly": limits["content_monthly"],
            "chatbot_monthly": limits["chatbot_monthly"],
            "insights_monthly": limits["insights_monthly"],
            "max_sites": limits["max_sites"]
        },
        "usage": {
            "assistant_actions": usage_doc.get("assistant_actions", 0),
            "content_generations": usage_doc.get("content_generations", 0),
            "chatbot_messages": usage_doc.get("chatbot_messages", 0),
            "insights_refreshes": usage_doc.get("insights_refreshes", 0),
            "percentage_used": percentage_used
        }
    }


@router.post("/track-usage")
async def track_usage(
    data: TrackUsageRequest,
    x_license_key: str = Header(..., alias="X-License-Key"),
    x_site_id: str = Header(..., alias="X-Site-ID")
):
    """Track usage for a specific action type"""
    # Verify license
    user_doc = await db.users.find_one({"license_key": x_license_key}, {"_id": 0})
    if not user_doc:
        raise HTTPException(status_code=401, detail="Invalid license key")
    
    user = User(**user_doc)
    plan = user.plan.value if isinstance(user.plan, PlanType) else user.plan
    limits = PLAN_LIMITS.get(plan, PLAN_LIMITS["free"])
    
    # Get or create usage record for current month
    current_month = datetime.now(timezone.utc).strftime("%Y-%m")
    usage_doc = await db.usage_records.find_one(
        {"user_id": user.id, "site_id": x_site_id, "month": current_month},
        {"_id": 0}
    )
    
    if not usage_doc:
        usage_record = UsageRecord(
            user_id=user.id,
            site_id=x_site_id,
            month=current_month
        )
        await db.usage_records.insert_one(usage_record.model_dump())
        usage_doc = usage_record.model_dump()
    
    # Map action type to field
    field_map = {
        "assistant_action": "assistant_actions",
        "content_generation": "content_generations",
        "chatbot_message": "chatbot_messages",
        "insights_refresh": "insights_refreshes"
    }
    
    limit_map = {
        "assistant_action": "assistant_monthly",
        "content_generation": "content_monthly",
        "chatbot_message": "chatbot_monthly",
        "insights_refresh": "insights_monthly"
    }
    
    field = field_map.get(data.action_type)
    limit_key = limit_map.get(data.action_type)
    
    if not field:
        raise HTTPException(status_code=400, detail="Invalid action type")
    
    current_count = usage_doc.get(field, 0)
    limit = limits.get(limit_key, 0)
    
    # Check if limit exceeded
    if current_count + data.count > limit:
        return {
            "success": False,
            "error": "limit_exceeded",
            "message": f"You've reached your monthly limit for {data.action_type.replace('_', ' ')}.",
            "remaining": max(0, limit - current_count),
            "limit": limit,
            "upgrade_url": "https://wooasm.com/pricing"
        }
    
    # Update usage
    await db.usage_records.update_one(
        {"user_id": user.id, "site_id": x_site_id, "month": current_month},
        {
            "$inc": {field: data.count},
            "$set": {"updated_at": datetime.now(timezone.utc).isoformat()}
        }
    )
    
    return {
        "success": True,
        "remaining": limit - current_count - data.count,
        "limit": limit
    }


@router.post("/track-event")
async def track_event(
    data: TrackEventRequest,
    request: Request,
    x_license_key: str = Header(None, alias="X-License-Key"),
    x_site_id: str = Header(..., alias="X-Site-ID")
):
    """Track plugin events for analytics"""
    user_id = None
    
    if x_license_key:
        user_doc = await db.users.find_one({"license_key": x_license_key}, {"_id": 0})
        if user_doc:
            user_id = user_doc.get("id")
    
    await track_event_internal(
        user_id=user_id,
        site_id=x_site_id,
        license_key=x_license_key,
        event_type=data.event_type,
        event_name=data.event_name,
        event_data=data.event_data,
        plugin_version=data.event_data.get("plugin_version", ""),
        user_agent=request.headers.get("User-Agent"),
        ip_hash=hash_ip(request.client.host) if request.client else None
    )
    
    return {"success": True}


async def track_event_internal(
    site_id: str,
    event_type: str,
    event_name: str,
    user_id: Optional[str] = None,
    license_key: Optional[str] = None,
    event_data: Dict[str, Any] = {},
    plugin_version: str = "",
    user_agent: Optional[str] = None,
    ip_hash: Optional[str] = None
):
    """Internal function to track events"""
    event = PluginEvent(
        user_id=user_id,
        site_id=site_id,
        license_key=license_key,
        event_type=event_type,
        event_name=event_name,
        event_data=event_data,
        plugin_version=plugin_version,
        user_agent=user_agent,
        ip_hash=ip_hash
    )
    
    event_dict = event.model_dump()
    event_dict['created_at'] = event_dict['created_at'].isoformat()
    
    await db.plugin_events.insert_one(event_dict)


@router.get("/health")
async def plugin_health():
    """Health check endpoint for plugin"""
    return {
        "status": "healthy",
        "api_version": "1.0",
        "timestamp": datetime.now(timezone.utc).isoformat()
    }
