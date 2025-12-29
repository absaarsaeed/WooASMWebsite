from fastapi import APIRouter, HTTPException, Depends, Header
from datetime import datetime, timezone, timedelta
from typing import Optional
from pydantic import BaseModel
import logging

from models.admin import AdminUser, AdminLogin, AdminTokenResponse, AdminRole
from utils.auth import hash_password, verify_password, create_access_token, verify_token

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/admin", tags=["Admin"])

# This will be set from server.py
db = None

# Hardcoded admin credentials (as requested)
ADMIN_USERNAME = "absaar"
ADMIN_PASSWORD = "AbsaarAdmin@12345"

def set_db(database):
    global db
    db = database


async def get_admin_user(x_admin_token: str = Header(..., alias="X-Admin-Token")):
    """Verify admin token"""
    payload = verify_token(x_admin_token, "access")
    if not payload or payload.get("admin") != True:
        raise HTTPException(status_code=401, detail="Invalid admin token")
    return payload


@router.post("/login", response_model=AdminTokenResponse)
async def admin_login(credentials: AdminLogin):
    """Admin login"""
    if credentials.username != ADMIN_USERNAME or credentials.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    admin_token = create_access_token(
        {"sub": ADMIN_USERNAME, "admin": True, "role": "super_admin"},
        timedelta(hours=24)
    )
    
    logger.info(f"Admin logged in: {ADMIN_USERNAME}")
    
    return AdminTokenResponse(
        admin_token=admin_token,
        role=AdminRole.SUPER_ADMIN
    )


@router.get("/stats")
async def get_stats(admin: dict = Depends(get_admin_user)):
    """Get admin dashboard statistics"""
    now = datetime.now(timezone.utc)
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    week_start = today_start - timedelta(days=7)
    month_start = today_start - timedelta(days=30)
    
    # Total users
    total_users = await db.users.count_documents({})
    
    # Users today (need to check created_at)
    users_today = await db.users.count_documents({
        "created_at": {"$gte": today_start.isoformat()}
    })
    
    # Users this week
    users_week = await db.users.count_documents({
        "created_at": {"$gte": week_start.isoformat()}
    })
    
    # Users this month
    users_month = await db.users.count_documents({
        "created_at": {"$gte": month_start.isoformat()}
    })
    
    # Plan distribution
    free_users = await db.users.count_documents({"plan": "free"})
    starter_users = await db.users.count_documents({"plan": "starter"})
    professional_users = await db.users.count_documents({"plan": "professional"})
    
    # Calculate MRR (Monthly Recurring Revenue)
    starter_mrr = starter_users * 29
    professional_mrr = professional_users * 79
    total_mrr = starter_mrr + professional_mrr
    
    # Sites
    total_sites = await db.site_activations.count_documents({"is_active": True})
    sites_last_7_days = await db.site_activations.count_documents({
        "last_seen_at": {"$gte": week_start.isoformat()}
    })
    
    # Usage stats
    current_month = now.strftime("%Y-%m")
    pipeline = [
        {"$match": {"month": current_month}},
        {"$group": {
            "_id": None,
            "total_assistant": {"$sum": "$assistant_actions"},
            "total_chatbot": {"$sum": "$chatbot_messages"},
            "total_content": {"$sum": "$content_generations"},
            "total_insights": {"$sum": "$insights_refreshes"}
        }}
    ]
    usage_result = await db.usage_records.aggregate(pipeline).to_list(1)
    usage_stats = usage_result[0] if usage_result else {
        "total_assistant": 0,
        "total_chatbot": 0,
        "total_content": 0,
        "total_insights": 0
    }
    
    total_ai_queries = (
        usage_stats.get("total_assistant", 0) +
        usage_stats.get("total_chatbot", 0) +
        usage_stats.get("total_content", 0) +
        usage_stats.get("total_insights", 0)
    )
    
    return {
        "overview": {
            "total_users": total_users,
            "users_today": users_today,
            "users_this_week": users_week,
            "users_this_month": users_month
        },
        "plans": {
            "free": free_users,
            "starter": starter_users,
            "professional": professional_users
        },
        "revenue": {
            "mrr": total_mrr,
            "arr": total_mrr * 12,
            "starter_mrr": starter_mrr,
            "professional_mrr": professional_mrr
        },
        "usage": {
            "total_ai_queries_this_month": total_ai_queries,
            "assistant_actions": usage_stats.get("total_assistant", 0),
            "chatbot_messages": usage_stats.get("total_chatbot", 0),
            "content_generations": usage_stats.get("total_content", 0),
            "insights_refreshes": usage_stats.get("total_insights", 0)
        },
        "sites": {
            "total_activated": total_sites,
            "active_last_7_days": sites_last_7_days
        }
    }


@router.get("/users")
async def get_users(
    page: int = 1,
    limit: int = 50,
    plan: Optional[str] = None,
    search: Optional[str] = None,
    admin: dict = Depends(get_admin_user)
):
    """Get paginated user list"""
    query = {}
    
    if plan:
        query["plan"] = plan
    
    if search:
        query["$or"] = [
            {"email": {"$regex": search, "$options": "i"}},
            {"name": {"$regex": search, "$options": "i"}}
        ]
    
    total = await db.users.count_documents(query)
    skip = (page - 1) * limit
    
    users = await db.users.find(
        query,
        {"_id": 0, "password_hash": 0, "verification_token": 0, "reset_token": 0}
    ).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    
    # Get usage count for each user
    current_month = datetime.now(timezone.utc).strftime("%Y-%m")
    for user in users:
        usage = await db.usage_records.find_one(
            {"user_id": user["id"], "month": current_month},
            {"_id": 0}
        )
        user["current_usage"] = usage
        
        sites = await db.site_activations.count_documents(
            {"user_id": user["id"], "is_active": True}
        )
        user["sites_count"] = sites
    
    return {
        "users": users,
        "total": total,
        "pages": (total + limit - 1) // limit,
        "current_page": page
    }


@router.get("/users/{user_id}")
async def get_user_detail(user_id: str, admin: dict = Depends(get_admin_user)):
    """Get detailed user info"""
    user = await db.users.find_one(
        {"id": user_id},
        {"_id": 0, "password_hash": 0, "verification_token": 0, "reset_token": 0}
    )
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    sites = await db.site_activations.find(
        {"user_id": user_id},
        {"_id": 0}
    ).to_list(100)
    
    usage_history = await db.usage_records.find(
        {"user_id": user_id},
        {"_id": 0}
    ).sort("month", -1).limit(12).to_list(12)
    
    events = await db.plugin_events.find(
        {"user_id": user_id},
        {"_id": 0}
    ).sort("created_at", -1).limit(50).to_list(50)
    
    return {
        "user": user,
        "sites": sites,
        "usage_history": usage_history,
        "events": events
    }


@router.get("/usage-chart")
async def get_usage_chart(
    period: str = "30d",
    metric: str = "ai_queries",
    admin: dict = Depends(get_admin_user)
):
    """Get usage chart data"""
    days = 30 if period == "30d" else 90 if period == "90d" else 365
    start_date = datetime.now(timezone.utc) - timedelta(days=days)
    
    # Group by day
    pipeline = [
        {"$match": {"created_at": {"$gte": start_date.isoformat()}}},
        {"$group": {
            "_id": {"$substr": ["$created_at", 0, 10]},
            "count": {"$sum": 1}
        }},
        {"$sort": {"_id": 1}}
    ]
    
    result = await db.plugin_events.aggregate(pipeline).to_list(365)
    
    labels = [r["_id"] for r in result]
    data = [r["count"] for r in result]
    
    return {
        "labels": labels,
        "data": data
    }


@router.get("/events")
async def get_events(
    event_type: Optional[str] = None,
    limit: int = 100,
    admin: dict = Depends(get_admin_user)
):
    """Get recent events"""
    query = {}
    if event_type:
        query["event_type"] = event_type
    
    events = await db.plugin_events.find(
        query,
        {"_id": 0}
    ).sort("created_at", -1).limit(limit).to_list(limit)
    
    return {"events": events}


@router.get("/sites")
async def get_all_sites(admin: dict = Depends(get_admin_user)):
    """Get all activated sites with stats"""
    sites = await db.site_activations.find(
        {},
        {"_id": 0}
    ).sort("last_seen_at", -1).to_list(1000)
    
    # Group by plugin version
    version_counts = {}
    wp_version_counts = {}
    wc_version_counts = {}
    
    for site in sites:
        pv = site.get("plugin_version", "unknown")
        version_counts[pv] = version_counts.get(pv, 0) + 1
        
        wpv = site.get("wordpress_version", "unknown")
        wp_version_counts[wpv] = wp_version_counts.get(wpv, 0) + 1
        
        wcv = site.get("woocommerce_version", "unknown")
        wc_version_counts[wcv] = wc_version_counts.get(wcv, 0) + 1
    
    return {
        "sites": sites,
        "by_plugin_version": version_counts,
        "by_wordpress_version": wp_version_counts,
        "by_woocommerce_version": wc_version_counts
    }


@router.get("/revenue-chart")
async def get_revenue_chart(
    period: str = "12m",
    admin: dict = Depends(get_admin_user)
):
    """Get revenue chart data"""
    # For now, return mock data since we'd need to track actual payments over time
    # In production, this would aggregate from payment_transactions
    now = datetime.now(timezone.utc)
    labels = []
    data = []
    
    for i in range(12, 0, -1):
        month = now - timedelta(days=30 * i)
        labels.append(month.strftime("%b %Y"))
        # Mock growing revenue
        base = 5000 + (12 - i) * 500
        data.append(base)
    
    return {
        "labels": labels,
        "data": data
    }


@router.get("/subscriptions")
async def get_subscriptions(admin: dict = Depends(get_admin_user)):
    """Get subscription statistics"""
    # Active subscriptions
    active_starter = await db.users.count_documents({
        "plan": "starter",
        "subscription_status": "active"
    })
    active_pro = await db.users.count_documents({
        "plan": "professional",
        "subscription_status": "active"
    })
    
    # Cancelled
    cancelled = await db.users.count_documents({
        "subscription_status": "cancelled"
    })
    
    # Past due
    past_due = await db.users.count_documents({
        "subscription_status": "past_due"
    })
    
    return {
        "active": {
            "starter": active_starter,
            "professional": active_pro,
            "total": active_starter + active_pro
        },
        "cancelled": cancelled,
        "past_due": past_due,
        "revenue": {
            "mrr": (active_starter * 29) + (active_pro * 79),
            "arr": ((active_starter * 29) + (active_pro * 79)) * 12
        }
    }
