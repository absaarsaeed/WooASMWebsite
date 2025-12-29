const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { PLAN_LIMITS, generateId } = require('../utils/helpers');

const router = express.Router();

// Stripe API key (use test key for development)
const STRIPE_API_KEY = process.env.STRIPE_API_KEY || 'sk_test_emergent';
let stripe;
try {
  stripe = require('stripe')(STRIPE_API_KEY);
} catch (e) {
  console.log('Stripe not configured');
}

// Plan pricing
const PLAN_PRICES = {
  starter: { monthly: 29, yearly: 290 },
  professional: { monthly: 79, yearly: 790 }
};

// Create checkout session
router.post('/create-checkout', authenticateToken, async (req, res) => {
  try {
    const { plan, billing_cycle } = req.body;
    
    if (!['starter', 'professional'].includes(plan)) {
      return res.status(400).json({ detail: 'Invalid plan' });
    }
    
    if (!['monthly', 'yearly'].includes(billing_cycle)) {
      return res.status(400).json({ detail: 'Invalid billing cycle' });
    }
    
    if (!stripe) {
      return res.status(500).json({ detail: 'Stripe not configured' });
    }
    
    const price = PLAN_PRICES[plan][billing_cycle];
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `WooASM ${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`,
            description: `${billing_cycle === 'yearly' ? 'Annual' : 'Monthly'} subscription`
          },
          unit_amount: price * 100,
          recurring: {
            interval: billing_cycle === 'yearly' ? 'year' : 'month'
          }
        },
        quantity: 1
      }],
      mode: 'subscription',
      success_url: `${process.env.APP_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL || 'http://localhost:3000'}/checkout/cancel`,
      customer_email: req.user.email,
      metadata: {
        user_id: req.user.id,
        plan,
        billing_cycle
      }
    });
    
    res.json({ checkout_url: session.url, session_id: session.id });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ detail: 'Failed to create checkout session' });
  }
});

// Get checkout status
router.get('/checkout/status/:session_id', authenticateToken, async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({ detail: 'Stripe not configured' });
    }
    
    const session = await stripe.checkout.sessions.retrieve(req.params.session_id);
    
    res.json({
      status: session.status,
      payment_status: session.payment_status,
      customer_email: session.customer_email
    });
  } catch (error) {
    res.status(500).json({ detail: 'Failed to get checkout status' });
  }
});

// Get subscription details
router.get('/subscription', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    const limits = PLAN_LIMITS[user.plan] || PLAN_LIMITS.free;
    
    res.json({
      plan: user.plan,
      billing_cycle: user.billing_cycle,
      status: user.subscription_status,
      ends_at: user.subscription_ends_at,
      stripe_customer_id: user.stripe_customer_id,
      limits,
      price: user.plan !== 'free' ? PLAN_PRICES[user.plan]?.[user.billing_cycle] : 0
    });
  } catch (error) {
    res.status(500).json({ detail: 'Failed to get subscription' });
  }
});

// Cancel subscription
router.post('/cancel', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    
    if (user.plan === 'free') {
      return res.status(400).json({ detail: 'No active subscription to cancel' });
    }
    
    // Cancel in Stripe if subscription exists
    if (stripe && user.stripe_subscription_id) {
      await stripe.subscriptions.update(user.stripe_subscription_id, {
        cancel_at_period_end: true
      });
    }
    
    await req.db.collection('users').updateOne(
      { id: user.id },
      { $set: { subscription_status: 'cancelling', updated_at: new Date().toISOString() } }
    );
    
    res.json({ message: 'Subscription will be cancelled at the end of the billing period' });
  } catch (error) {
    res.status(500).json({ detail: 'Failed to cancel subscription' });
  }
});

// Activate test plan (for development)
router.post('/activate-test-plan', authenticateToken, async (req, res) => {
  try {
    const { plan, billing_cycle } = req.body;
    
    if (!['starter', 'professional'].includes(plan)) {
      return res.status(400).json({ detail: 'Invalid plan' });
    }
    
    const cycle = billing_cycle || 'monthly';
    const endsAt = new Date();
    endsAt.setMonth(endsAt.getMonth() + (cycle === 'yearly' ? 12 : 1));
    
    await req.db.collection('users').updateOne(
      { id: req.user.id },
      {
        $set: {
          plan,
          billing_cycle: cycle,
          subscription_status: 'active',
          subscription_ends_at: endsAt.toISOString(),
          updated_at: new Date().toISOString()
        }
      }
    );
    
    // Create purchase notification
    await req.db.collection('purchase_notifications').insertOne({
      id: generateId(),
      user_id: req.user.id,
      user_name: req.user.name,
      plan,
      display_name: `${req.user.name.split(' ')[0]} (Test)`,
      created_at: new Date().toISOString()
    });
    
    res.json({
      message: `Test ${plan} plan activated successfully`,
      plan,
      billing_cycle: cycle,
      ends_at: endsAt.toISOString()
    });
  } catch (error) {
    console.error('Activate test plan error:', error);
    res.status(500).json({ detail: 'Failed to activate test plan' });
  }
});

// Stripe webhook
router.post('/webhook/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({ detail: 'Stripe not configured' });
    }
    
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    let event;
    
    if (endpointSecret && sig) {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } else {
      event = req.body;
    }
    
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const { user_id, plan, billing_cycle } = session.metadata;
        
        const endsAt = new Date();
        endsAt.setMonth(endsAt.getMonth() + (billing_cycle === 'yearly' ? 12 : 1));
        
        await req.db.collection('users').updateOne(
          { id: user_id },
          {
            $set: {
              plan,
              billing_cycle,
              subscription_status: 'active',
              subscription_ends_at: endsAt.toISOString(),
              stripe_customer_id: session.customer,
              stripe_subscription_id: session.subscription,
              updated_at: new Date().toISOString()
            }
          }
        );
        break;
      }
      
      case 'invoice.paid': {
        const invoice = event.data.object;
        // Extend subscription
        break;
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        await req.db.collection('users').updateOne(
          { stripe_subscription_id: subscription.id },
          {
            $set: {
              plan: 'free',
              subscription_status: 'cancelled',
              billing_cycle: null,
              updated_at: new Date().toISOString()
            }
          }
        );
        break;
      }
    }
    
    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ detail: 'Webhook error' });
  }
});

// Customer portal
router.post('/portal', authenticateToken, async (req, res) => {
  try {
    if (!stripe || !req.user.stripe_customer_id) {
      return res.status(400).json({ detail: 'No billing account found' });
    }
    
    const session = await stripe.billingPortal.sessions.create({
      customer: req.user.stripe_customer_id,
      return_url: `${process.env.APP_URL || 'http://localhost:3000'}/dashboard/billing`
    });
    
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ detail: 'Failed to create portal session' });
  }
});

module.exports = router;
