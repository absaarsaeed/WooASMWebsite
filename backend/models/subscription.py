from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, Dict, Any
from datetime import datetime, timezone
from enum import Enum
import uuid


class SiteActivation(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    license_key: str
    site_url: str
    site_id: str  # Unique identifier for the site
    plugin_version: str
    wordpress_version: Optional[str] = None
    woocommerce_version: Optional[str] = None
    activated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    last_seen_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    is_active: bool = True


class UsageRecord(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    site_id: str
    month: str  # Format: YYYY-MM
    
    # Counters
    assistant_actions: int = 0
    content_generations: int = 0
    chatbot_messages: int = 0
    insights_refreshes: int = 0
    
    # Computed (formula: assistant + chatbot + content*4 + insights*10)
    weighted_total: int = 0
    
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    
    def calculate_weighted_total(self):
        self.weighted_total = (
            self.assistant_actions + 
            self.chatbot_messages + 
            (self.content_generations * 4) + 
            (self.insights_refreshes * 10)
        )
        return self.weighted_total


class PluginEvent(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: Optional[str] = None  # Can be null for anonymous
    site_id: str
    license_key: Optional[str] = None
    
    event_type: str  # e.g., 'plugin_activated', 'plugin_deactivated', 'feature_used', 'error'
    event_name: str  # e.g., 'chat_sent', 'content_generated', 'stock_updated'
    event_data: Dict[str, Any] = Field(default_factory=dict)
    
    # Context
    plugin_version: str
    user_agent: Optional[str] = None
    ip_hash: Optional[str] = None  # Hashed for privacy
    
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class PurchaseNotification(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_name: str  # First name only or anonymized like "John D."
    plan: str  # 'starter' or 'professional'
    billing_cycle: str  # 'monthly' or 'yearly'
    country: Optional[str] = None  # From Stripe
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    
    # For display
    display_name: str = ""  # Computed: "John D. from USA"
    is_real: bool = True  # False for seed data
    
    def compute_display_name(self):
        if self.country:
            self.display_name = f"{self.user_name} from {self.country}"
        else:
            self.display_name = self.user_name
        return self.display_name


# Plan limits configuration
PLAN_LIMITS = {
    "free": {
        "assistant_monthly": 50,
        "content_monthly": 10,
        "chatbot_monthly": 100,
        "insights_monthly": 5,
        "max_sites": 1,
        "features": {
            "assistant": True,
            "chatbot": False,
            "insights": True,
            "content_studio": False,
            "inventory_autopilot": False,
            "competitor_watch": False,
            "ai_memory": False,
        }
    },
    "starter": {
        "assistant_monthly": 500,
        "content_monthly": 100,
        "chatbot_monthly": 1000,
        "insights_monthly": 50,
        "max_sites": 1,
        "features": {
            "assistant": True,
            "chatbot": True,
            "insights": True,
            "content_studio": True,
            "inventory_autopilot": False,
            "competitor_watch": False,
            "ai_memory": True,
        }
    },
    "professional": {
        "assistant_monthly": 2000,
        "content_monthly": 500,
        "chatbot_monthly": 5000,
        "insights_monthly": 200,
        "max_sites": 5,
        "features": {
            "assistant": True,
            "chatbot": True,
            "insights": True,
            "content_studio": True,
            "inventory_autopilot": True,
            "competitor_watch": True,
            "ai_memory": True,
        }
    }
}

# Stripe price IDs (to be created in Stripe Dashboard)
STRIPE_PRICES = {
    "starter_monthly": {
        "price_id": "price_starter_monthly",  # Will be replaced with actual Stripe price ID
        "amount": 29.00,
        "currency": "usd"
    },
    "starter_yearly": {
        "price_id": "price_starter_yearly",
        "amount": 290.00,
        "currency": "usd"
    },
    "professional_monthly": {
        "price_id": "price_professional_monthly",
        "amount": 79.00,
        "currency": "usd"
    },
    "professional_yearly": {
        "price_id": "price_professional_yearly",
        "amount": 790.00,
        "currency": "usd"
    }
}
