# WooASM.ai - Product Requirements Document

## Project Overview
WooASM.ai is a frontend-only React application for a SaaS platform that provides AI-powered store management for WooCommerce. The frontend communicates with an external NestJS backend API hosted at `api.wooasm.com`.

## Architecture
- **Frontend**: React + TailwindCSS + Framer Motion (hosted at wooasm.com)
- **Backend**: External NestJS API (hosted at api.wooasm.com) - NOT part of this project
- **Plugin**: WordPress/WooCommerce plugin - separate project

## Current Status (February 2025)
The website has undergone a comprehensive SEO and content overhaul with AI-era messaging. All major pages have been implemented with rich, SEO-optimized content. Performance optimizations have been applied including code splitting and deferred third-party scripts.

## What's Been Implemented

### Performance Optimizations (Feb 2, 2025)
- [x] React.lazy code splitting - 132 JS chunks for faster initial load
- [x] Deferred third-party scripts (GA, PostHog, Iubenda load after page interactive)
- [x] Preconnect hints for critical origins
- [x] Async font loading with font-display: swap
- [x] Critical CSS inlined in index.html
- [x] Accessibility improvements (aria-labels, roles, expanded states)

### Header & Navigation Improvements (Feb 2, 2025)
- [x] Redesigned mega menu with categories sidebar and feature cards with icons/descriptions
- [x] Fixed Features Hub page - added Header and Footer
- [x] Fixed Single Feature pages - added Header and Footer
- [x] Improved mobile navigation with collapsible category sections

### Marketing Website
- [x] Homepage with AI-era messaging, rotating taglines, feature sections, testimonials, comparison tables, and multiple CTAs
- [x] Pricing page with 4 tiers (Free Trial, Starter $29/mo, Professional $79/mo, Agency $199/mo)
- [x] Features Hub page with category organization
- [x] 13 Individual Feature pages with comprehensive content:
  - AI Store Assistant
  - Store Health Score
  - Store Insights Dashboard
  - Inventory Autopilot
  - Customer Insights
  - Coupon Management
  - Order Management
  - Analytics & Reports
  - Content Studio
  - Fraud Alerts
  - Activity Logs
  - Price Watch
  - Reviews Management
- [x] 3 Comparison pages (vs WooCommerce Admin, Jetpack, WooCommerce Analytics)
- [x] 6 Use Case pages (Small Business, Fashion Stores, Electronics, High-Volume, Reduce Refunds, Increase Repeat Customers)
- [x] Blog page with 2 initial posts
- [x] Documentation/Knowledge base
- [x] About, Contact, Changelog, Roadmap pages
- [x] Legal pages (Privacy, Terms, Cookies, GDPR)

### SEO Implementation
- [x] robots.txt configured
- [x] sitemap.xml created (placeholder)
- [x] SEO.jsx component with JSON-LD schema, canonicals, meta tags
- [x] FAQ schema on relevant pages
- [x] Breadcrumb schema on feature/compare/use-case pages
- [x] Google Analytics integration
- [x] Iubenda cookie consent integration

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
- [x] Plans management
- [x] Features management
- [x] Abilities management
- [x] Email logs

## Technical Details

### API Base URL
```
Production: https://api.wooasm.com/api/v1
Frontend .env: REACT_APP_BACKEND_URL=https://api.wooasm.com
```

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

## Known Issues

### Backend Issues (Outside Scope)
- **CRITICAL**: Backend `/api/v1/billing/create-checkout` returns `localhost:3000` in checkoutUrl - needs backend fix
- **Workaround**: Frontend patches the URL in `api.js` to replace `localhost:3000` with `wooasm.com`

### Environment Issues
- CORS blocks API calls in preview environment (production backend doesn't allow preview domain)
- API calls work correctly in production

## Key Files Reference
```
/app/frontend/
├── src/
│   ├── services/api.js          # Central API service
│   ├── context/AuthContext.jsx  # Auth state management
│   ├── components/
│   │   ├── SEO.jsx              # SEO meta tags & schema
│   │   └── FeaturePageTemplate.jsx
│   ├── data/
│   │   └── featuresData.js      # 13 feature definitions
│   ├── pages/
│   │   ├── HomePage.jsx         # AI-era homepage
│   │   ├── PricingPage.jsx      # 4-tier pricing
│   │   ├── FeaturesHubPage.jsx  # Features overview
│   │   ├── FeaturePage.jsx      # Individual feature pages
│   │   ├── ComparePage.jsx      # Comparison pages
│   │   ├── UseCasePage.jsx      # Use case pages
│   │   ├── BlogPostPage.jsx     # Blog post template
│   │   ├── dashboard/           # User dashboard pages
│   │   └── admin/               # Admin dashboard pages
│   └── App.js                   # Routes configuration
├── public/
│   ├── index.html               # GA & Iubenda scripts
│   ├── robots.txt
│   └── sitemap.xml
└── .env
```

## Roadmap

### P0 - Critical (Complete)
- [x] AI-era homepage messaging
- [x] Feature pages content
- [x] Comparison pages
- [x] Use case pages
- [x] SEO foundation

### P1 - High Priority
- [ ] Add more blog posts (SEO content)
- [ ] Implement image lazy-loading
- [ ] Add actual dashboard screenshots to feature pages
- [ ] Implement GA4 conversion tracking events

### P2 - Medium Priority
- [ ] Create lead magnet assets (PDFs, cheat sheets)
- [ ] Add video demos to feature pages
- [ ] Implement token refresh interceptor (auto-refresh on 401)
- [ ] Add loading states for all async operations

### P3 - Low Priority / Enhancements
- [ ] Dark mode toggle
- [ ] User avatar upload
- [ ] Export usage data to CSV
- [ ] Add keyboard shortcuts

## Notes
- This is a **frontend-only** project
- Backend is managed separately and hosted at api.wooasm.com
- WordPress plugin is a separate project
- No local backend should be created in this repository
