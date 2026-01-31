# WooASM.ai - Product Requirements Document

## Project Overview
WooASM.ai is a frontend-only React application for a SaaS platform that provides AI-powered store management for WooCommerce. The frontend communicates with an external NestJS backend API hosted at `api.wooasm.com`.

## Architecture
- **Frontend**: React + TailwindCSS + Framer Motion (hosted at wooasm.com)
- **Backend**: External NestJS API (hosted at api.wooasm.com) - NOT part of this project
- **Plugin**: WordPress/WooCommerce plugin - separate project

## Correct User Workflow

```
1. User signs up → Account created (NO license key, plan='none')
2. User logs in → Dashboard shows "No subscription" prompt
3. User clicks "Subscribe" → Stripe Checkout
4. Stripe payment succeeds → Backend webhook generates license key
5. User returns to dashboard → License key now visible
6. User can activate WooASM plugin with license key
```

## Core Requirements

### Marketing Website
- [x] Homepage with hero section, features, testimonials
- [x] Pricing page with Starter ($29/mo) and Professional ($79/mo) plans
- [x] Blog page
- [x] Documentation/Knowledge base
- [x] Features page

### Authentication
- [x] Login page with email/password
- [x] Signup page - redirects to pricing after registration
- [x] Forgot password flow
- [x] Reset password flow
- [x] Email verification flow
- [x] JWT token storage and refresh logic

### User Dashboard
- [x] Dashboard Overview - shows "Subscribe" prompt if no license
- [x] License Page - shows license key OR subscribe prompt
- [x] Sites Page - view/manage activated WordPress sites
- [x] Usage Page - view monthly usage across all features
- [x] Settings Page - update profile, change password, delete account
- [x] Billing Page - view/manage subscription, upgrade/downgrade plans

### Admin Dashboard
- [x] Admin login (email-based)
- [x] Dashboard with platform stats
- [x] Users management with search/filter
- [x] Subscriptions analytics
- [x] Sites overview
- [x] Plans management (`/admin/plans`) - View and update subscription plans
- [x] Features management (`/admin/features`) - Create, seed, and manage features
- [x] Abilities management (`/admin/abilities`) - Create, seed, and manage abilities
- [x] Email logs (`/admin/emails`) - View sent email logs and delivery status

### API Integration
- [x] Central API service (`/app/frontend/src/services/api.js`)
- [x] All field names use camelCase (matching NestJS backend)
- [x] Proper token management (access + refresh tokens)
- [x] Auth context with login, register, logout, password reset, email verification

## Technical Details

### API Base URL
```
Production: https://api.wooasm.com/api/v1
Frontend .env: REACT_APP_BACKEND_URL=https://api.wooasm.com
```

### Key API Endpoints
- Auth: `/auth/register`, `/auth/login`, `/auth/refresh`, `/auth/me`
- Dashboard: `/dashboard`, `/dashboard/license`, `/dashboard/usage`, `/dashboard/sites`, `/dashboard/settings`
- Billing: `/billing/create-checkout`, `/billing/subscription`, `/billing/cancel`, `/billing/portal`
- Admin: `/admin/login`, `/admin/stats`, `/admin/users`, `/admin/sites`
- Admin Plans: `/admin/plans`, `/admin/plans/:planKey`
- Admin Features: `/admin/features`, `/admin/features/seed`
- Admin Abilities: `/admin/abilities`, `/admin/abilities/seed`
- Admin Emails: `/admin/emails`, `/admin/emails/:id`, `/admin/emails/resend/:id`

### Response Format
All responses from backend follow this structure:
```json
{
  "success": true,
  "data": { ... },
  "message": "optional message"
}
```

### Authentication
- User auth: `Authorization: Bearer {access_token}`
- Admin auth: `X-Admin-Token: {admin_token}`

## What's Been Implemented

### December 2024 - API Alignment Refactor
- Completed full alignment of frontend API calls with NestJS backend specification (camelCase field names)
- Updated files:
  - `/app/frontend/src/services/api.js` - 38 API methods
  - `/app/frontend/src/context/AuthContext.jsx` - added forgotPassword, resetPassword, verifyEmail
  - `/app/frontend/src/pages/dashboard/LicensePage.jsx`
  - `/app/frontend/src/pages/dashboard/SitesPage.jsx`
  - `/app/frontend/src/pages/dashboard/UsagePage.jsx`
  - `/app/frontend/src/pages/dashboard/SettingsPage.jsx`
  - `/app/frontend/src/pages/dashboard/BillingPage.jsx`
  - `/app/frontend/src/pages/admin/AdminLoginPage.jsx`
  - `/app/frontend/src/pages/admin/AdminDashboard.jsx`

### January 2025 - Backend Integration Updates
- Added 429 rate limiting handler in API service
- Fixed email verification endpoint (GET with query param)
- Fixed reset password endpoint (uses `password` not `newPassword`)
- Created mock checkout page (`/checkout/mock`) for test mode
- Updated Dashboard to use `hasSubscription` flag from backend
- Pricing page buttons now work - trigger Stripe checkout or redirect
- All pages have proper SEO meta tags

### January 2025 - Admin Dashboard Expansion
- Created Dynamic Plan Management page (`/admin/plans`)
- Made Pricing page dynamic with API fallback to mock data
- Created Admin Features page (`/admin/features`) with Create & Seed Defaults
- Created Admin Abilities page (`/admin/abilities`) with Create & Seed Defaults
- Created Admin Email Logs page (`/admin/emails`) with filtering and resend capability
- Permanently removed "Made with Emergent" badge (multi-layer solution)
- Fixed admin login success message styling (green instead of red)
- Fixed auth flow token handling and redirects

### January 2025 - SEO & Content Overhaul
- **Complete Website Copy Refresh**: Rewrote all homepage and feature page copy to be non-technical, exciting, and conversion-focused
- Removed all "ChatGPT" mentions - positioned as "smart store assistant" without referencing underlying AI technology
- Updated all section headlines to be benefit-focused (e.g., "Run Your Store Just By Asking", "101 Ways to Make Your Life Easier")
- Created compelling testimonials with real-world results ($8,000 recovered revenue, 35+ hours saved weekly)
- Updated FAQs to address non-technical store owner concerns
- Added proper Header and Footer components to all SEO pages (FeaturesHubPage, FeaturePageTemplate, ComparePage, UseCasePage)
- Updated SEO component schema markup with non-technical descriptions
- Added data-testid attributes to key CTA buttons for analytics tracking
- Fixed all ESLint escape character issues

### January 2025 - Hero Section Redesign
- **Complete hero section visual overhaul** with modern, premium dark theme
- Added animated gradient orbs with pulsing effects
- Implemented grid pattern background for depth
- Added floating particle animations
- Created glass-morphism chat demo card with realistic product examples
- Floating stat cards (101 things, 35+ hours saved)
- Modern gradient CTA buttons with hover effects
- Responsive design works beautifully on mobile
- Trust badges with green checkmarks
- **"Trusted by store owners worldwide"** logo strip with wave transition
- **Smart adaptive header** that shows white text on dark hero, dark text on light pages
- **Animated typing chat demo** with multiple conversation examples
  - Real-time character-by-character typing animation
  - Cycles through 4 different queries (products, customers, coupons, revenue)
  - Shows AI "thinking" dots before response
  - Smooth transitions between conversations
  - Clickable conversation dots to manually switch
- **Modern typography update**
  - Plus Jakarta Sans for headings (bold, modern feel)
  - Inter for body text (clean, readable)
  - Tighter letter-spacing for professional look

### Testing Status
- All frontend pages load correctly without JavaScript errors
- Forms are functional
- Navigation works
- API service properly structured with all required methods
- Note: API calls may fail in preview environment due to CORS (production backend doesn't allow preview domain)
- Mobile menu improved with proper overlay/backdrop

### Known Issues (Backend - Outside Scope)
- **CRITICAL**: Backend `/api/v1/billing/create-checkout` returns `localhost:3000` in checkoutUrl - needs backend fix
- Stripe configuration on backend uses localhost for success/cancel URLs

## Roadmap

### P0 - Critical
- [x] Complete API alignment with backend spec
- [x] Website copy overhaul (non-technical, conversion-focused)

### P1 - High Priority
- [ ] Implement token refresh interceptor (auto-refresh on 401)
- [ ] Add loading states for all async operations
- [ ] Error boundary for React components
- [ ] Populate all SEO stub pages with full content
- [ ] Make sitemap.xml auto-generated during build

### P2 - Medium Priority
- [ ] Add toast notifications for success/error states
- [ ] Implement invoice history view
- [ ] Add usage charts/graphs
- [ ] Optimize mobile responsiveness
- [ ] Site speed optimization (Lighthouse audit)
- [ ] GA4 conversion tracking for CTAs

### P3 - Low Priority / Enhancements
- [ ] Dark mode toggle
- [ ] User avatar upload
- [ ] Export usage data to CSV
- [ ] Add keyboard shortcuts
- [ ] Create downloadable PDF lead magnets
- [ ] Implement A/B testing
- [ ] Build white-label feature for Agency plan

## Key Files Reference
```
/app/frontend/
├── src/
│   ├── services/api.js          # Central API service (38+ methods)
│   ├── context/AuthContext.jsx  # Auth state management
│   ├── pages/
│   │   ├── auth/               # Login, Signup, Forgot/Reset Password
│   │   ├── dashboard/          # User dashboard pages
│   │   ├── admin/              # Admin dashboard pages
│   │   │   ├── AdminPlans.jsx  # Plan management
│   │   │   ├── AdminFeatures.jsx # Features management
│   │   │   ├── AdminAbilities.jsx # Abilities management
│   │   │   └── AdminEmails.jsx # Email logs viewer
│   │   └── PricingPage.jsx     # Dynamic pricing (API + fallback)
│   └── components/             # Reusable UI components
├── public/index.html           # Badge removal script
├── .env                        # REACT_APP_BACKEND_URL
└── package.json
```

## Notes
- This is a **frontend-only** project
- Backend is managed separately and hosted at api.wooasm.com
- WordPress plugin is a separate project
- No local backend should be created in this repository
