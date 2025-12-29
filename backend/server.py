from fastapi import FastAPI, APIRouter, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(
    title="WooASM API",
    description="API for WooASM - AI Store Manager for WooCommerce",
    version="1.0.0"
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize Stripe (if configured)
stripe_checkout = None
stripe_api_key = os.environ.get('STRIPE_API_KEY')
if stripe_api_key:
    try:
        from emergentintegrations.payments.stripe.checkout import StripeCheckout
        # Webhook URL will be set dynamically
        stripe_checkout = None  # Will be initialized on first request
        logger.info("Stripe API key configured")
    except ImportError:
        logger.warning("emergentintegrations not installed, Stripe will not work")

# Import and set up routes
from routes import auth, dashboard, billing, plugin, admin, notifications

# Set database for all routers
auth.set_db(db)
dashboard.set_db(db)
billing.set_db(db)
plugin.set_db(db)
admin.set_db(db)
notifications.set_db(db)

# Include all routers
api_router.include_router(auth.router)
api_router.include_router(dashboard.router)
api_router.include_router(billing.router)
api_router.include_router(plugin.router)
api_router.include_router(admin.router)
api_router.include_router(notifications.router)


# Health check
@api_router.get("/")
async def root():
    return {
        "message": "WooASM API",
        "version": "1.0.0",
        "status": "healthy"
    }


@api_router.get("/health")
async def health():
    return {"status": "healthy"}


# Middleware to initialize Stripe with correct webhook URL
@app.middleware("http")
async def init_stripe_middleware(request: Request, call_next):
    global stripe_checkout
    
    if stripe_checkout is None and stripe_api_key:
        try:
            from emergentintegrations.payments.stripe.checkout import StripeCheckout
            host_url = str(request.base_url).rstrip('/')
            webhook_url = f"{host_url}/api/billing/webhook/stripe"
            stripe_checkout = StripeCheckout(api_key=stripe_api_key, webhook_url=webhook_url)
            billing.set_stripe(stripe_checkout)
            logger.info(f"Stripe initialized with webhook URL: {webhook_url}")
        except Exception as e:
            logger.error(f"Failed to initialize Stripe: {e}")
    
    response = await call_next(request)
    return response


# Include the router in the main app
app.include_router(api_router)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_db_client():
    """Initialize database indexes and seed data on startup"""
    logger.info("Starting up WooASM API...")
    
    # Create indexes
    await db.users.create_index("email", unique=True)
    await db.users.create_index("license_key", unique=True)
    await db.users.create_index("verification_token")
    await db.users.create_index("reset_token")
    
    await db.site_activations.create_index("site_id", unique=True)
    await db.site_activations.create_index("user_id")
    await db.site_activations.create_index("license_key")
    
    await db.usage_records.create_index([("user_id", 1), ("site_id", 1), ("month", 1)])
    
    await db.plugin_events.create_index("user_id")
    await db.plugin_events.create_index("site_id")
    await db.plugin_events.create_index("created_at")
    
    await db.payment_transactions.create_index("session_id", unique=True)
    await db.payment_transactions.create_index("user_id")
    
    logger.info("Database indexes created")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
    logger.info("Database connection closed")
