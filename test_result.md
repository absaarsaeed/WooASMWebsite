# WooASM Frontend - Test Results

## Project Overview
WooASM is a frontend-only React application for a SaaS platform that provides AI-powered store management for WooCommerce. The frontend communicates with an external NestJS backend API hosted at `api.wooasm.com`.

## Recent Changes (API Alignment)
Updated frontend to align with the new backend API specification:

1. **API Service (`api.js`):**
   - Updated `refreshToken()` - backend returns tokens at root level (accessToken, refreshToken), not nested in data
   - Changed `verifyEmail()` from GET to POST method
   - Updated admin token handling

2. **Authentication:**
   - `AdminLoginPage.jsx` - updated to handle `data.token` instead of `data.adminToken`

3. **Dashboard Pages:**
   - `DashboardOverview.jsx` - updated to handle `license.key` field name (in addition to `license.licenseKey`)
   - `LicensePage.jsx` - same license key field handling
   - `SitesPage.jsx` - handles both `maxSites` and `sitesAllowed` for backwards compatibility
   - `UsagePage.jsx` - added support for new limits like `assistantMonthly`, `weightedCap`

4. **Admin Dashboard:**
   - `AdminDashboard.jsx` - updated to handle both flatter response structure (new API) and nested structure (old API)

5. **Backend URL:**
   - Updated from `https://code-harmony-4.preview.emergentagent.com` to `https://api.wooasm.com`

## Testing Protocol
When testing, please verify:
1. Authentication flows (login, register, logout)
2. Dashboard data loading
3. License key display
4. Sites management
5. Usage statistics
6. Billing/subscription handling
7. Admin login and dashboard

## API Endpoints (Backend at api.wooasm.com)
- Auth: `/api/v1/auth/*`
- Dashboard: `/api/v1/dashboard/*`
- Billing: `/api/v1/billing/*`
- Admin: `/api/v1/admin/*`
- Notifications: `/api/v1/notifications/*`

## Test Credentials (from API docs)
- User: test@example.com / Test123!
- License Key: WASM-F2G7-RONA-3HOR
- Admin: admin@wooasm.com / admin123
