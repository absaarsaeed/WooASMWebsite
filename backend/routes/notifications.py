from fastapi import APIRouter
from datetime import datetime, timezone, timedelta
from typing import List
import random
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/notifications", tags=["Notifications"])

# This will be set from server.py
db = None

# Seed data for initial launch
SEED_NOTIFICATIONS = [
    {"user_name": "Michael R.", "country": "Germany", "plan": "professional", "billing_cycle": "yearly"},
    {"user_name": "Emma S.", "country": "Canada", "plan": "starter", "billing_cycle": "monthly"},
    {"user_name": "James L.", "country": "Australia", "plan": "professional", "billing_cycle": "monthly"},
    {"user_name": "Sophie T.", "country": "France", "plan": "starter", "billing_cycle": "yearly"},
    {"user_name": "David K.", "country": "USA", "plan": "professional", "billing_cycle": "yearly"},
    {"user_name": "Lisa M.", "country": "UK", "plan": "starter", "billing_cycle": "monthly"},
    {"user_name": "Thomas B.", "country": "Netherlands", "plan": "professional", "billing_cycle": "monthly"},
    {"user_name": "Anna K.", "country": "Sweden", "plan": "starter", "billing_cycle": "yearly"},
    {"user_name": "Robert J.", "country": "USA", "plan": "professional", "billing_cycle": "yearly"},
    {"user_name": "Maria G.", "country": "Spain", "plan": "starter", "billing_cycle": "monthly"},
    {"user_name": "William H.", "country": "Canada", "plan": "professional", "billing_cycle": "yearly"},
    {"user_name": "Jennifer W.", "country": "Australia", "plan": "starter", "billing_cycle": "monthly"},
    {"user_name": "Christopher P.", "country": "UK", "plan": "professional", "billing_cycle": "monthly"},
    {"user_name": "Sarah D.", "country": "USA", "plan": "starter", "billing_cycle": "yearly"},
    {"user_name": "Daniel F.", "country": "Germany", "plan": "professional", "billing_cycle": "yearly"},
    {"user_name": "Jessica N.", "country": "France", "plan": "starter", "billing_cycle": "monthly"},
    {"user_name": "Matthew C.", "country": "Canada", "plan": "professional", "billing_cycle": "monthly"},
    {"user_name": "Emily R.", "country": "UK", "plan": "starter", "billing_cycle": "yearly"},
    {"user_name": "Andrew V.", "country": "USA", "plan": "professional", "billing_cycle": "yearly"},
    {"user_name": "Rachel T.", "country": "Australia", "plan": "starter", "billing_cycle": "monthly"}
]

def set_db(database):
    global db
    db = database


def time_ago(dt: datetime) -> str:
    """Convert datetime to 'X hours ago' format"""
    if isinstance(dt, str):
        dt = datetime.fromisoformat(dt.replace('Z', '+00:00'))
    
    now = datetime.now(timezone.utc)
    diff = now - dt
    
    if diff.total_seconds() < 60:
        return "just now"
    elif diff.total_seconds() < 3600:
        mins = int(diff.total_seconds() / 60)
        return f"{mins} minute{'s' if mins != 1 else ''} ago"
    elif diff.total_seconds() < 86400:
        hours = int(diff.total_seconds() / 3600)
        return f"{hours} hour{'s' if hours != 1 else ''} ago"
    else:
        days = int(diff.total_seconds() / 86400)
        return f"{days} day{'s' if days != 1 else ''} ago"


@router.get("/recent-purchases")
async def get_recent_purchases():
    """Get recent purchase notifications for trust badges"""
    # Get real notifications from database
    real_notifications = await db.purchase_notifications.find(
        {},
        {"_id": 0}
    ).sort("created_at", -1).limit(20).to_list(20)
    
    # Mix with seed data if not enough real notifications
    notifications = []
    
    for notif in real_notifications:
        display_name = notif.get("display_name") or notif.get("user_name", "Customer")
        if notif.get("country") and not notif.get("display_name"):
            display_name = f"{notif.get('user_name')} from {notif.get('country')}"
        
        notifications.append({
            "display_name": display_name,
            "plan": notif.get("plan", "starter"),
            "time_ago": time_ago(notif.get("created_at", datetime.now(timezone.utc)))
        })
    
    # Add seed data if needed
    if len(notifications) < 10:
        seed_sample = random.sample(SEED_NOTIFICATIONS, min(10 - len(notifications), len(SEED_NOTIFICATIONS)))
        for seed in seed_sample:
            # Randomize time_ago for seed data
            hours_ago = random.randint(1, 48)
            fake_time = datetime.now(timezone.utc) - timedelta(hours=hours_ago)
            
            notifications.append({
                "display_name": f"{seed['user_name']} from {seed['country']}",
                "plan": seed["plan"],
                "time_ago": time_ago(fake_time)
            })
    
    # Shuffle to mix real and seed
    random.shuffle(notifications)
    
    return {"notifications": notifications[:20]}


@router.get("/recent")
async def get_recent_notification():
    """Get a single recent notification for floating trust badge"""
    # Get real notifications from database
    real_notifications = await db.purchase_notifications.find(
        {},
        {"_id": 0}
    ).sort("created_at", -1).limit(10).to_list(10)
    
    # If we have real notifications, pick one randomly
    if real_notifications:
        notif = random.choice(real_notifications)
        display_name = notif.get("display_name") or notif.get("user_name", "Customer")
        
        created_at = notif.get("created_at")
        if isinstance(created_at, str):
            created_at = datetime.fromisoformat(created_at.replace('Z', '+00:00'))
        
        seconds_ago = int((datetime.now(timezone.utc) - created_at).total_seconds()) if created_at else 300
        
        return {
            "notification": {
                "display_name": display_name,
                "plan": notif.get("plan", "starter"),
                "seconds_ago": min(seconds_ago, 86400)  # Max 1 day
            }
        }
    
    # Use seed data if no real notifications
    seed = random.choice(SEED_NOTIFICATIONS)
    seconds_ago = random.randint(300, 7200)  # 5 mins to 2 hours ago
    
    return {
        "notification": {
            "display_name": f"{seed['user_name']} from {seed['country']}",
            "plan": seed["plan"],
            "seconds_ago": seconds_ago
        }
    }


@router.get("/count")
async def get_notification_count():
    """Get total purchase count for social proof"""
    real_count = await db.purchase_notifications.count_documents({})
    
    # Add base count for social proof
    base_count = 500  # "500+ store owners"
    
    return {
        "total_purchases": base_count + real_count,
        "display_text": f"{base_count + real_count}+ store owners"
    }
