# Backend API Builder Instructions

> **For:** Backend Developer building `api.wooasm.com`
> **Stack:** NestJS + Prisma + MongoDB
> **Reference:** See `API_SPECIFICATION.md` for complete endpoint details

---

## Overview

You are building the API backend for WooASM SaaS platform. The API will be deployed to `api.wooasm.com` and will serve:
1. **Frontend Website** (`wooasm.com`) - User registration, login, dashboard, billing
2. **WordPress Plugin** - License validation, AI proxy, usage tracking
3. **Admin Dashboard** - User management, analytics

---

## Required Endpoints to Add

Your current NestJS backend needs these additional endpoints for the website:

### 1. User Authentication Module (`/api/v1/auth/*`)

Create a new `auth` module with these endpoints:

```typescript
// src/modules/auth/auth.controller.ts

@Controller('auth')
export class AuthController {
  @Post('register')      // User registration
  @Post('login')         // User login (returns JWT)
  @Post('refresh')       // Refresh access token
  @Post('logout')        // Logout
  @Post('verify-email')  // Email verification
  @Post('forgot-password') // Request password reset
  @Post('reset-password')  // Reset password
  @Get('me')             // Get current user (protected)
}
```

**Key Points:**
- Use `bcryptjs` for password hashing
- Generate JWT tokens with `@nestjs/jwt`
- Create license key automatically on registration
- Send verification email on registration (optional for now, can mock)
- Default plan is `free`

---

### 2. User Dashboard Module (`/api/v1/dashboard/*`)

Create a new `dashboard` module (protected by JWT):

```typescript
// src/modules/dashboard/dashboard.controller.ts

@Controller('dashboard')
@UseGuards(JwtAuthGuard)  // All routes require JWT
export class DashboardController {
  @Get()                      // Dashboard overview
  @Get('license')             // License details
  @Post('regenerate-license') // Regenerate license key
  @Get('usage')               // Usage statistics
  @Get('sites')               // Activated sites
  @Delete('sites/:siteId')    // Deactivate site
  @Put('settings')            // Update profile
  @Post('change-password')    // Change password
  @Delete('account')          // Delete account
}
```

---

### 3. Billing Module Updates (`/api/v1/billing/*`)

Add these endpoints for website billing:

```typescript
// src/modules/billing/billing.controller.ts

@Controller('billing')
@UseGuards(JwtAuthGuard)
export class BillingController {
  @Post('create-checkout')    // Create Stripe checkout session
  @Get('checkout/status/:id') // Get checkout status
  @Get('subscription')        // Get current subscription
  @Post('cancel')             // Cancel subscription
  @Post('resume')             // Resume cancelled subscription
  @Post('portal')             // Get Stripe customer portal URL
  @Get('invoices')            // Get billing history
}
```

**Stripe Integration:**
- Use Stripe test keys for development: `sk_test_...`
- Create checkout sessions with `stripe.checkout.sessions.create()`
- Handle webhooks for subscription lifecycle

---

### 4. Admin Module Updates (`/api/v1/admin/*`)

Your existing admin module needs these additions:

```typescript
// Additional admin endpoints
@Get('purchases')  // Recent purchases for notification widget
```

---

### 5. Notifications Module (`/api/v1/notifications/*`)

Public endpoint for social proof:

```typescript
@Controller('notifications')
export class NotificationsController {
  @Get('recent')  // Public - returns random recent purchase
}
```

---

## Database Schema Updates

Update your Prisma schema to include:

```prisma
// prisma/schema.prisma

model User {
  id                   String    @id @default(auto()) @map("_id") @db.ObjectId
  email                String    @unique
  passwordHash         String    // ADD: for user auth
  name                 String
  companyName          String?   // ADD
  
  // Auth
  emailVerified        Boolean   @default(false)  // ADD
  verificationToken    String?   // ADD
  resetToken           String?   // ADD
  resetTokenExpires    DateTime? // ADD
  
  // Subscription
  plan                 Plan      @default(free)
  billingCycle         BillingCycle?
  subscriptionStatus   SubscriptionStatus @default(active)
  subscriptionEndsAt   DateTime?
  stripeCustomerId     String?
  stripeSubscriptionId String?
  
  // License (moved from License model for simplicity)
  licenseKey           String    @unique  // ADD: WASM-XXXX-XXXX-XXXX
  
  lastLoginAt          DateTime?
  createdAt            DateTime  @default(now())
  updatedAt            DateTime  @updatedAt
  
  sites                SiteActivation[]
  usageRecords         UsageRecord[]
}

model PurchaseNotification {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  userId      String   @db.ObjectId
  userName    String
  plan        String
  country     String?
  createdAt   DateTime @default(now())
}
```

---

## Guards to Create

### 1. JWT Auth Guard (for website users)

```typescript
// src/common/guards/jwt-auth.guard.ts

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Access token required');
    }
    
    const token = authHeader.split(' ')[1];
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.userService.findById(payload.userId);
      request.user = user;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
```

### 2. Current User Decorator

```typescript
// src/common/decorators/current-user.decorator.ts

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
```

---

## CORS Configuration

Update CORS to allow the frontend:

```typescript
// src/main.ts

app.enableCors({
  origin: [
    'https://wooasm.com',
    'https://www.wooasm.com',
    'http://localhost:3000',  // Development
  ],
  credentials: true,
});
```

---

## Environment Variables

Add these to your `.env`:

```env
# JWT for user auth
JWT_SECRET=your-jwt-secret-for-user-auth
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# Stripe
STRIPE_API_KEY=sk_test_your_stripe_test_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Pricing (cents)
STRIPE_STARTER_MONTHLY_PRICE=2900
STRIPE_STARTER_YEARLY_PRICE=29000
STRIPE_PROFESSIONAL_MONTHLY_PRICE=7900
STRIPE_PROFESSIONAL_YEARLY_PRICE=79000

# Frontend URL (for redirects)
FRONTEND_URL=https://wooasm.com
```

---

## Stripe Checkout Flow

```typescript
// src/modules/billing/billing.service.ts

async createCheckoutSession(user: User, plan: string, billingCycle: string) {
  // Get or create Stripe customer
  let customerId = user.stripeCustomerId;
  if (!customerId) {
    const customer = await this.stripe.customers.create({
      email: user.email,
      name: user.name,
      metadata: { userId: user.id }
    });
    customerId = customer.id;
    await this.prisma.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: customerId }
    });
  }

  // Create checkout session
  const session = await this.stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: `WooASM ${plan} Plan`,
          description: `${billingCycle} subscription`
        },
        unit_amount: this.getPriceInCents(plan, billingCycle),
        recurring: {
          interval: billingCycle === 'yearly' ? 'year' : 'month'
        }
      },
      quantity: 1
    }],
    mode: 'subscription',
    success_url: `${process.env.FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/checkout/cancel`,
    metadata: {
      userId: user.id,
      plan,
      billingCycle
    }
  });

  return { checkout_url: session.url, session_id: session.id };
}
```

---

## Webhook Handler Updates

Update your Stripe webhook to handle:

```typescript
// Handle checkout.session.completed
async handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const { userId, plan, billingCycle } = session.metadata;
  
  // Update user subscription
  await this.prisma.user.update({
    where: { id: userId },
    data: {
      plan,
      billingCycle,
      subscriptionStatus: 'active',
      stripeSubscriptionId: session.subscription as string,
      subscriptionEndsAt: this.calculateEndDate(billingCycle)
    }
  });
  
  // Create purchase notification for social proof
  await this.prisma.purchaseNotification.create({
    data: {
      userId,
      userName: user.name,
      plan,
      country: session.customer_details?.address?.country
    }
  });
}
```

---

## Update README

Add these sections to your README:

```markdown
## Website Integration Endpoints

The API also serves the WooASM website (`wooasm.com`) with:

### User Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh token
- `GET /api/v1/auth/me` - Get current user

### User Dashboard
- `GET /api/v1/dashboard` - Dashboard overview
- `GET /api/v1/dashboard/license` - License details
- `GET /api/v1/dashboard/usage` - Usage stats
- `GET /api/v1/dashboard/sites` - Activated sites

### Billing
- `POST /api/v1/billing/create-checkout` - Stripe checkout
- `GET /api/v1/billing/subscription` - Current subscription
- `POST /api/v1/billing/cancel` - Cancel subscription
```

---

## Testing Checklist

- [ ] User can register with email/password
- [ ] User receives license key on registration
- [ ] User can login and receive JWT tokens
- [ ] JWT auth protects dashboard routes
- [ ] User can view dashboard data
- [ ] User can create Stripe checkout
- [ ] Stripe webhook updates subscription
- [ ] License validation works with new schema
- [ ] Admin can view/manage users
- [ ] CORS allows frontend origin

---

## Questions?

Coordinate with:
- **Frontend Builder** - For request/response format alignment
- **Plugin Builder** - For license validation flow
