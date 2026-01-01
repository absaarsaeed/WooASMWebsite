# WooASM Backend API Changes Required

## Overview
This document outlines the changes needed in your NestJS backend API (`api.wooasm.com`) to properly handle the subscription and license key workflow.

---

## Current Issue
The backend is currently:
1. Generating license keys on user registration (WRONG)
2. Returning license keys in login/register responses before user has paid (WRONG)
3. Showing red success messages instead of proper success responses

## Correct Workflow

```
User Signup → Account Created (NO license key, plan='none')
    ↓
User Logs In → Dashboard shows "No subscription"
    ↓
User clicks "Subscribe" → Stripe Checkout
    ↓
Stripe Payment Success → Webhook triggers
    ↓
Backend generates license key → User now has access
```

---

## Required Backend Changes

### 1. User Registration (`POST /auth/register`)

**Current (Wrong):**
```json
{
  "success": true,
  "data": {
    "accessToken": "...",
    "refreshToken": "...",
    "user": {
      "id": "...",
      "email": "...",
      "licenseKey": "WA-XXXX-XXXX-XXXX"  // ❌ REMOVE THIS
    }
  }
}
```

**Correct:**
```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "accessToken": "...",
    "refreshToken": "...",
    "user": {
      "id": "...",
      "email": "...",
      "name": "...",
      "plan": "none",           // or "free" if you have a free tier
      "licenseKey": null,       // NULL until they subscribe
      "subscriptionStatus": null
    }
  }
}
```

**Changes in your code:**
```typescript
// In your user.service.ts or auth.service.ts
async createUser(dto: CreateUserDto) {
  const user = new this.userModel({
    email: dto.email,
    password: await bcrypt.hash(dto.password, 10),
    name: dto.name,
    companyName: dto.companyName,
    plan: 'none',              // No plan until they pay
    licenseKey: null,          // No license until they pay
    subscriptionStatus: null,
    createdAt: new Date(),
  });
  
  return await user.save();
}
```

---

### 2. User Login (`POST /auth/login`)

**Response format (correct as-is, just ensure no licenseKey for non-subscribers):**
```json
{
  "success": true,
  "data": {
    "accessToken": "...",
    "refreshToken": "...",
    "tokenType": "Bearer",
    "expiresIn": 3600,
    "user": {
      "id": "...",
      "email": "...",
      "name": "...",
      "plan": "none",
      "licenseKey": null,       // null if no subscription
      "subscriptionStatus": null
    }
  }
}
```

---

### 3. Stripe Webhook Handler (CRITICAL)

Create or update your Stripe webhook handler to generate the license key ONLY when payment is successful:

```typescript
// stripe-webhook.controller.ts

import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';

@Post('/webhook/stripe')
async handleStripeWebhook(@Req() req: RawBodyRequest<Request>, @Res() res: Response) {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  let event: Stripe.Event;
  
  try {
    event = this.stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      await this.handleCheckoutComplete(event.data.object as Stripe.Checkout.Session);
      break;
      
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      await this.handleSubscriptionUpdate(event.data.object as Stripe.Subscription);
      break;
      
    case 'customer.subscription.deleted':
      await this.handleSubscriptionCanceled(event.data.object as Stripe.Subscription);
      break;
      
    case 'invoice.payment_succeeded':
      await this.handleInvoicePaid(event.data.object as Stripe.Invoice);
      break;
  }

  return res.json({ received: true });
}

// Generate license key on successful checkout
async handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const userId = session.client_reference_id;  // You should pass this when creating checkout
  const user = await this.userService.findById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }

  // Determine plan from Stripe price
  const plan = this.getPlanFromPriceId(session.line_items?.data[0]?.price?.id);
  const billingCycle = session.line_items?.data[0]?.price?.recurring?.interval === 'year' 
    ? 'yearly' 
    : 'monthly';

  // Generate license key ONLY NOW
  const licenseKey = this.generateLicenseKey();

  // Update user with subscription info
  await this.userService.updateUser(userId, {
    plan: plan,
    licenseKey: licenseKey,
    subscriptionStatus: 'active',
    billingCycle: billingCycle,
    stripeCustomerId: session.customer as string,
    stripeSubscriptionId: session.subscription as string,
  });
  
  // Optional: Send welcome email with license key
  await this.emailService.sendLicenseKeyEmail(user.email, licenseKey);
}

// License key generator
generateLicenseKey(): string {
  // Format: WA-XXXX-XXXX-XXXX-XXXX
  const segments = [];
  for (let i = 0; i < 4; i++) {
    segments.push(uuidv4().substring(0, 4).toUpperCase());
  }
  return `WA-${segments.join('-')}`;
}

// Map Stripe price IDs to your plans
getPlanFromPriceId(priceId: string): string {
  const priceMap = {
    'price_starter_monthly': 'starter',
    'price_starter_yearly': 'starter',
    'price_professional_monthly': 'professional',
    'price_professional_yearly': 'professional',
  };
  return priceMap[priceId] || 'starter';
}

// Handle subscription cancellation
async handleSubscriptionCanceled(subscription: Stripe.Subscription) {
  const user = await this.userService.findByStripeSubscriptionId(subscription.id);
  
  if (user) {
    await this.userService.updateUser(user.id, {
      subscriptionStatus: 'cancelled',
      // Optionally keep licenseKey but mark as inactive
      // Or set to null: licenseKey: null
    });
  }
}
```

---

### 4. Create Checkout Session (`POST /billing/create-checkout`)

Make sure you pass the user ID as `client_reference_id`:

```typescript
@Post('/billing/create-checkout')
@UseGuards(JwtAuthGuard)
async createCheckout(@Body() dto: CreateCheckoutDto, @Request() req) {
  const user = req.user;
  
  // Get price ID based on plan and billing cycle
  const priceId = this.getPriceId(dto.plan, dto.billingCycle);
  
  const session = await this.stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer_email: user.email,
    client_reference_id: user.id,  // IMPORTANT: This links payment to user
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/pricing`,
    metadata: {
      userId: user.id,
      plan: dto.plan,
      billingCycle: dto.billingCycle,
    },
  });

  return {
    success: true,
    data: {
      checkoutUrl: session.url,
      sessionId: session.id,
    },
  };
}

// Helper to get Stripe price IDs
getPriceId(plan: string, billingCycle: string): string {
  const prices = {
    starter: {
      monthly: process.env.STRIPE_PRICE_STARTER_MONTHLY,
      yearly: process.env.STRIPE_PRICE_STARTER_YEARLY,
    },
    professional: {
      monthly: process.env.STRIPE_PRICE_PROFESSIONAL_MONTHLY,
      yearly: process.env.STRIPE_PRICE_PROFESSIONAL_YEARLY,
    },
  };
  return prices[plan]?.[billingCycle];
}
```

---

### 5. Dashboard Endpoint (`GET /dashboard`)

Ensure dashboard returns proper structure:

```typescript
@Get('/dashboard')
@UseGuards(JwtAuthGuard)
async getDashboard(@Request() req) {
  const user = req.user;
  
  return {
    success: true,
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        plan: user.plan || 'none',
        subscriptionStatus: user.subscriptionStatus,
        billingCycle: user.billingCycle,
      },
      license: {
        licenseKey: user.licenseKey,  // null if no subscription
        status: user.subscriptionStatus === 'active' ? 'active' : 'inactive',
        plan: user.plan,
        maxSites: this.getMaxSites(user.plan),
        sitesUsed: await this.siteService.countUserSites(user.id),
      },
      usage: await this.usageService.getUserUsage(user.id),
    },
  };
}
```

---

### 6. Environment Variables Needed

Add these to your `.env`:

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Price IDs (create these in Stripe Dashboard)
STRIPE_PRICE_STARTER_MONTHLY=price_...
STRIPE_PRICE_STARTER_YEARLY=price_...
STRIPE_PRICE_PROFESSIONAL_MONTHLY=price_...
STRIPE_PRICE_PROFESSIONAL_YEARLY=price_...

# Frontend URL for redirects
FRONTEND_URL=https://wooasm.com
```

---

### 7. User Schema Update

Update your MongoDB/Prisma user schema:

```typescript
// user.schema.ts (MongoDB/Mongoose)
@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  companyName: string;

  @Prop({ default: 'none' })  // 'none', 'starter', 'professional'
  plan: string;

  @Prop({ default: null })    // NULL until they pay!
  licenseKey: string;

  @Prop({ default: null })    // 'active', 'cancelled', 'past_due'
  subscriptionStatus: string;

  @Prop({ default: null })    // 'monthly', 'yearly'
  billingCycle: string;

  @Prop()
  stripeCustomerId: string;

  @Prop()
  stripeSubscriptionId: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}
```

---

## Testing Checklist

After making these changes, test:

1. [ ] Register new user → No license key in response
2. [ ] Login → No license key (for new users without subscription)
3. [ ] Dashboard shows "Subscribe to get license key" prompt
4. [ ] Create checkout → Redirects to Stripe
5. [ ] Complete test payment → Webhook fires
6. [ ] User now has license key in dashboard
7. [ ] License page shows the key
8. [ ] Cancellation removes/deactivates license

---

## Stripe Test Cards

For testing:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Requires Auth: `4000 0025 0000 3155`

Use any future expiry date and any CVC.

---

## Summary

**Key Changes:**
1. Remove license key generation from registration
2. Set `licenseKey: null` for new users
3. Generate license key ONLY in Stripe webhook after successful payment
4. Update all responses to use proper `{ success: true, data: {...} }` format
5. Add proper Stripe webhook handling

Let me know if you need any clarification!
