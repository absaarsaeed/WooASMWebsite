# WooASM.ai - Product Requirements Document

## Project Overview
WooASM.ai is a frontend-only React application for a SaaS platform that provides AI-powered store management for WooCommerce. The frontend communicates with an external NestJS backend API hosted at `api.wooasm.com`.

## Architecture
- **Frontend**: React + TailwindCSS + Framer Motion (hosted at wooasm.com)
- **Backend**: External NestJS API (hosted at api.wooasm.com) - NOT part of this project
- **Plugin**: WordPress/WooCommerce plugin - separate project

## Core Requirements

### Marketing Website
- [x] Homepage with hero section, features, testimonials
- [x] Pricing page with Starter ($29/mo) and Professional ($79/mo) plans
- [x] Blog page
- [x] Documentation/Knowledge base
- [x] Features page

### Authentication
- [x] Login page with email/password
- [x] Signup page with name, email, password, company name (optional)
- [x] Forgot password flow
- [x] Reset password flow
- [x] Email verification flow
- [x] JWT token storage and refresh logic

### User Dashboard
- [x] Dashboard Overview - usage stats, license key, quick actions
- [x] License Page - view/copy license key, regenerate, installation guide
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

### API Integration
- [x] Central API service (`/app/frontend/src/services/api.js`)
- [x] All field names use camelCase (matching NestJS backend)
- [x] Proper token management (access + refresh tokens)
- [x] Auth context with login, register, logout, password reset, email verification

## Technical Details

### API Base URL
```
Production: https://api.wooasm.com/api/v1
```

### Key API Endpoints
- Auth: `/auth/register`, `/auth/login`, `/auth/refresh`, `/auth/me`
- Dashboard: `/dashboard`, `/dashboard/license`, `/dashboard/usage`, `/dashboard/sites`, `/dashboard/settings`
- Billing: `/billing/create-checkout`, `/billing/subscription`, `/billing/cancel`, `/billing/portal`
- Admin: `/admin/login`, `/admin/stats`, `/admin/users`, `/admin/sites`

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
- Completed full alignment of frontend API calls with NestJS backend specification
- All field names converted from snake_case to camelCase
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
  - `/app/frontend/src/pages/admin/AdminUsers.jsx`
  - `/app/frontend/src/pages/admin/AdminSubscriptions.jsx`
  - `/app/frontend/src/pages/admin/AdminSites.jsx`

### Testing Status
- All frontend pages load correctly without JavaScript errors
- Forms are functional
- Navigation works
- API service properly structured with all required methods
- 100% frontend test pass rate

## Roadmap

### P0 - Critical
- [x] Complete API alignment with backend spec

### P1 - High Priority
- [ ] Implement token refresh interceptor (auto-refresh on 401)
- [ ] Add loading states for all async operations
- [ ] Error boundary for React components

### P2 - Medium Priority
- [ ] Add toast notifications for success/error states
- [ ] Implement invoice history view
- [ ] Add usage charts/graphs
- [ ] Optimize mobile responsiveness

### P3 - Low Priority / Enhancements
- [ ] Dark mode toggle
- [ ] User avatar upload
- [ ] Export usage data to CSV
- [ ] Add keyboard shortcuts

## Key Files Reference
```
/app/frontend/
├── src/
│   ├── services/api.js          # Central API service
│   ├── context/AuthContext.jsx  # Auth state management
│   ├── pages/
│   │   ├── auth/               # Login, Signup, Forgot/Reset Password
│   │   ├── dashboard/          # User dashboard pages
│   │   └── admin/              # Admin dashboard pages
│   └── components/             # Reusable UI components
├── .env                         # REACT_APP_BACKEND_URL
└── package.json
```

## Notes
- This is a **frontend-only** project
- Backend is managed separately and hosted at api.wooasm.com
- WordPress plugin is a separate project
- No local backend should be created in this repository
