# Backend API - Mock Checkout Endpoint Required

## The Issue
The frontend mock checkout page collects card details but the backend never knows about the "payment" to:
1. Update the user's plan
2. Generate a license key
3. Set subscription status to "active"

## Required Backend Endpoint

### POST /api/v1/billing/mock-checkout

This endpoint simulates a successful Stripe payment in test mode.

**Request:**
```json
{
  "plan": "starter",        // or "professional"
  "billingCycle": "monthly" // or "yearly"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Test subscription activated successfully",
  "data": {
    "sessionId": "mock_session_123456",
    "plan": "starter",
    "billingCycle": "monthly",
    "licenseKey": "WASM-XXXX-XXXX-XXXX",
    "subscriptionStatus": "active"
  }
}
```

## NestJS Implementation

### 1. Add to billing.controller.ts

```typescript
@Post('mock-checkout')
@UseGuards(JwtAuthGuard)
async processMockCheckout(
  @Body() dto: { plan: string; billingCycle: string },
  @Request() req,
) {
  // Only allow in development/test mode
  if (process.env.NODE_ENV === 'production' && process.env.STRIPE_SECRET_KEY) {
    throw new BadRequestException('Mock checkout not available in production');
  }

  const user = req.user;
  
  // Validate plan
  if (!['starter', 'professional'].includes(dto.plan)) {
    throw new BadRequestException('Invalid plan');
  }
  
  // Validate billing cycle
  if (!['monthly', 'yearly'].includes(dto.billingCycle)) {
    throw new BadRequestException('Invalid billing cycle');
  }

  // Generate license key
  const licenseKey = this.generateLicenseKey();
  
  // Calculate max sites based on plan
  const maxSites = dto.plan === 'professional' ? 5 : 1;

  // Update user in database
  await this.userService.updateUser(user.id, {
    plan: dto.plan,
    licenseKey: licenseKey,
    subscriptionStatus: 'active',
    billingCycle: dto.billingCycle,
    maxSites: maxSites,
    subscriptionStartDate: new Date(),
    // For test mode, set expiry to 1 year from now
    subscriptionEndDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  });

  // Generate a mock session ID
  const sessionId = `mock_session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

  return {
    success: true,
    message: 'Test subscription activated successfully',
    data: {
      sessionId,
      plan: dto.plan,
      billingCycle: dto.billingCycle,
      licenseKey,
      subscriptionStatus: 'active',
    },
  };
}

private generateLicenseKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segments = [];
  for (let i = 0; i < 4; i++) {
    let segment = '';
    for (let j = 0; j < 4; j++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    segments.push(segment);
  }
  return `WASM-${segments.join('-')}`;
}
```

### 2. Add DTO validation (optional but recommended)

```typescript
// dto/mock-checkout.dto.ts
import { IsIn, IsNotEmpty } from 'class-validator';

export class MockCheckoutDto {
  @IsNotEmpty()
  @IsIn(['starter', 'professional'])
  plan: string;

  @IsNotEmpty()
  @IsIn(['monthly', 'yearly'])
  billingCycle: string;
}
```

### 3. Update User Service

Make sure your `userService.updateUser` method can update these fields:

```typescript
// user.service.ts
async updateUser(userId: string, updateData: Partial<User>) {
  return this.userModel.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true }
  );
}
```

### 4. Update User Schema (if not already)

```typescript
// user.schema.ts
@Schema()
export class User {
  // ... existing fields ...

  @Prop({ default: 'none' })
  plan: string;

  @Prop({ default: null })
  licenseKey: string;

  @Prop({ default: null })
  subscriptionStatus: string;

  @Prop({ default: null })
  billingCycle: string;

  @Prop({ default: 1 })
  maxSites: number;

  @Prop()
  subscriptionStartDate: Date;

  @Prop()
  subscriptionEndDate: Date;
}
```

---

## Also Update: GET /api/v1/dashboard

Make sure the dashboard endpoint returns `hasSubscription` correctly:

```typescript
@Get()
@UseGuards(JwtAuthGuard)
async getDashboard(@Request() req) {
  const user = await this.userService.findById(req.user.id);
  
  const hasSubscription = user.subscriptionStatus === 'active' && user.plan !== 'none';
  
  return {
    success: true,
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        billingCycle: user.billingCycle,
        subscriptionStatus: user.subscriptionStatus,
      },
      license: hasSubscription ? {
        licenseKey: user.licenseKey,
        status: 'active',
        plan: user.plan,
        maxSites: user.maxSites || 1,
        sitesUsed: await this.siteService.countUserSites(user.id) || 0,
        sitesRemaining: (user.maxSites || 1) - (await this.siteService.countUserSites(user.id) || 0),
      } : null,
      hasSubscription,
      usage: hasSubscription ? await this.usageService.getUserUsage(user.id) : null,
    },
  };
}
```

---

## Also Update: GET /api/v1/auth/me

Return the license key and plan info:

```typescript
@Get('me')
@UseGuards(JwtAuthGuard)
async getCurrentUser(@Request() req) {
  const user = await this.userService.findById(req.user.id);
  
  return {
    success: true,
    data: {
      id: user.id,
      email: user.email,
      name: user.name,
      companyName: user.companyName,
      plan: user.plan || 'none',
      licenseKey: user.licenseKey || null,
      subscriptionStatus: user.subscriptionStatus || null,
      billingCycle: user.billingCycle || null,
      maxSites: user.maxSites || 1,
      emailVerified: user.emailVerified || false,
    },
  };
}
```

---

## Testing Checklist

After implementing the changes:

1. [ ] Login with test user
2. [ ] Go to Pricing page
3. [ ] Click "Start Free Trial" on Starter plan
4. [ ] Enter test card: `4242 4242 4242 4242`, any future date, any CVC
5. [ ] Click Pay button
6. [ ] Should redirect to success page with license key
7. [ ] Go to Dashboard - should show license key (not "Subscribe" prompt)
8. [ ] License page should show the key

---

## Quick Fix for Testing

If you need a quick fix to test the frontend without implementing the full endpoint, you can temporarily:

1. Make `/billing/mock-checkout` simply update the user's plan and generate a license key
2. Return the license key in the response
3. The frontend will then show it on the success page and dashboard

The key thing is: **the user's `plan`, `licenseKey`, and `subscriptionStatus` must be updated in the database**.
