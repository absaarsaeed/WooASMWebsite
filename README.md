# WooASM.ai - AI Store Manager for WooCommerce

<p align="center">
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=nodedotjs" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-6.0+-47A248?style=for-the-badge&logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss" alt="TailwindCSS" />
</p>

WooASM is a powerful AI-powered store manager for WooCommerce. This is a complete **MERN Stack** SaaS application including:
- 🎨 Marketing website with conversion-focused design
- 🔐 User authentication with JWT tokens
- 💳 Stripe subscription billing
- 📊 User dashboard with license management
- 🔌 WordPress plugin API for license validation
- 👨‍💼 Admin analytics dashboard

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [WordPress Plugin Integration](#-wordpress-plugin-integration)
- [Admin Access](#-admin-access)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

## ✨ Features

### Marketing Website
- Conversion-focused homepage with hero section
- Features page with 16 AI-powered capabilities
- Pricing page with plan comparison
- Documentation/Knowledge base
- Blog, About, Contact pages
- Legal pages (Privacy, Terms, Cookies, GDPR)

### User Dashboard
- **Overview**: Quick stats, license key, usage breakdown
- **License Management**: View, copy, and regenerate license keys
- **Usage Tracking**: Monitor AI queries, chatbot messages, content generation
- **Sites Management**: View and manage activated WordPress sites
- **Billing**: Subscription management, plan upgrades, Stripe integration
- **Settings**: Profile management, password change, account deletion

### Admin Dashboard
- User management with search and filtering
- Subscription analytics (MRR, ARR, plan distribution)
- Site activation monitoring
- Usage statistics across all users

### Plugin API
- License key validation
- Usage tracking and limits enforcement
- Site activation/deactivation
- Event tracking for analytics

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **TailwindCSS** - Utility-first CSS
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **React Helmet Async** - SEO management

### Backend (Node.js/Express)
- **Express.js** - Web framework
- **MongoDB** - Native driver for database
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **Stripe SDK** - Payment processing
- **uuid** - ID generation

### Database
- **MongoDB** - NoSQL database

## 📁 Project Structure

```
/app
├── backend/                    # Node.js/Express Backend
│   ├── src/
│   │   ├── middleware/
│   │   │   └── auth.js         # JWT authentication middleware
│   │   ├── routes/
│   │   │   ├── admin.js        # Admin dashboard APIs
│   │   │   ├── auth.js         # Authentication endpoints
│   │   │   ├── billing.js      # Stripe & subscription
│   │   │   ├── dashboard.js    # User dashboard APIs
│   │   │   ├── notifications.js # Trust notifications
│   │   │   └── plugin.js       # WordPress plugin API
│   │   ├── utils/
│   │   │   └── helpers.js      # Utility functions
│   │   └── server.js           # Main Express app
│   ├── package.json            # Node dependencies
│   └── .env                    # Environment variables
│
├── frontend/                   # React Frontend
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── layout/         # Header, Footer
│   │   │   ├── home/           # Homepage sections
│   │   │   └── ui/             # Shadcn UI components
│   │   ├── context/            # React contexts
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/              # Page components
│   │   │   ├── admin/          # Admin dashboard pages
│   │   │   ├── auth/           # Login, Signup, etc.
│   │   │   ├── checkout/       # Success, Cancel pages
│   │   │   └── dashboard/      # User dashboard pages
│   │   ├── data/               # Mock data
│   │   ├── App.js              # Main app with routes
│   │   └── index.css           # Global styles
│   ├── public/                 # Static assets
│   ├── package.json            # Node dependencies
│   └── .env                    # Frontend env variables
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB 6.0+
- Yarn package manager

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wooasm.git
   cd wooasm
   ```

2. **Backend Setup**
   ```bash
   cd backend
   
   # Install dependencies
   yarn install
   
   # Copy environment file
   cp .env.example .env
   # Edit .env with your values
   
   # Run the server
   yarn dev
   # Or for production:
   yarn start
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   
   # Install dependencies
   yarn install
   
   # Copy environment file
   cp .env.example .env
   # Edit .env with your values
   
   # Run development server
   yarn start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8001/api
   - Health Check: http://localhost:8001/

## 🔐 Environment Variables

### Backend (`/backend/.env`)

```env
# Server Port
PORT=8001

# Database
MONGO_URL="mongodb://localhost:27017"
DB_NAME="wooasm_database"

# Security
# Generate a secure random string for production:
# node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"

# CORS
CORS_ORIGINS="http://localhost:3000,https://yourdomain.com"

# Stripe (Payment Processing)
STRIPE_API_KEY="sk_test_your_stripe_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"

# SendGrid (Email) - Optional
SENDGRID_API_KEY="your_sendgrid_api_key"
FROM_EMAIL="noreply@yourdomain.com"

# App URL (for email links and redirects)
APP_URL="https://yourdomain.com"
```

### Frontend (`/frontend/.env`)

```env
# Backend API URL
REACT_APP_BACKEND_URL="http://localhost:8001"
```

## 📖 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and get tokens |
| POST | `/api/auth/logout` | Logout user |
| POST | `/api/auth/refresh` | Refresh access token |
| POST | `/api/auth/verify-email` | Verify email with token |
| POST | `/api/auth/forgot-password` | Request password reset |
| POST | `/api/auth/reset-password` | Reset password with token |
| GET | `/api/auth/me` | Get current user info |

### Dashboard Endpoints (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard` | Get dashboard overview |
| GET | `/api/dashboard/license` | Get license details |
| POST | `/api/dashboard/regenerate-license` | Generate new license key |
| GET | `/api/dashboard/usage` | Get usage statistics |
| GET | `/api/dashboard/sites` | Get activated sites |
| DELETE | `/api/dashboard/sites/:site_id` | Deactivate a site |
| PUT | `/api/dashboard/settings` | Update user settings |
| POST | `/api/dashboard/change-password` | Change password |
| DELETE | `/api/dashboard/account` | Delete account |

### Billing Endpoints (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/billing/create-checkout` | Create Stripe checkout |
| GET | `/api/billing/checkout/status/:id` | Get checkout status |
| GET | `/api/billing/subscription` | Get subscription details |
| POST | `/api/billing/cancel` | Cancel subscription |
| POST | `/api/billing/activate-test-plan` | Activate test plan (dev) |
| POST | `/api/billing/webhook/stripe` | Stripe webhook handler |
| POST | `/api/billing/portal` | Get Stripe customer portal URL |

### Plugin API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/plugin/validate-license` | Validate license key |
| POST | `/api/plugin/track-usage` | Track feature usage |
| POST | `/api/plugin/track-event` | Track plugin events |
| GET | `/api/plugin/health` | Health check |

### Admin Endpoints (Admin Token Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/login` | Admin login |
| GET | `/api/admin/stats` | Dashboard statistics |
| GET | `/api/admin/users` | List all users |
| GET | `/api/admin/users/:id` | Get user details |
| GET | `/api/admin/subscriptions` | Subscription analytics |
| GET | `/api/admin/sites` | All activated sites |

## 🔌 WordPress Plugin Integration

### License Validation

Your WordPress plugin should validate licenses against the API:

```php
<?php
function wooasm_validate_license($license_key) {
    $response = wp_remote_post('https://api.wooasm.com/api/plugin/validate-license', [
        'body' => json_encode([
            'license_key' => $license_key,
            'site_url' => get_site_url(),
            'site_id' => md5(get_site_url()),
            'plugin_version' => WOOASM_VERSION,
            'wordpress_version' => get_bloginfo('version'),
            'woocommerce_version' => WC_VERSION
        ]),
        'headers' => [
            'Content-Type' => 'application/json'
        ]
    ]);
    
    $body = json_decode(wp_remote_retrieve_body($response), true);
    
    if ($body['valid']) {
        // License is valid
        // Store $body['plan'], $body['features'], $body['limits']
        return true;
    }
    
    // Handle error: $body['error'], $body['message']
    return false;
}
```

### Usage Tracking

Track feature usage to enforce limits:

```php
<?php
function wooasm_track_usage($action_type, $count = 1) {
    $response = wp_remote_post('https://api.wooasm.com/api/plugin/track-usage', [
        'body' => json_encode([
            'action_type' => $action_type, // 'assistant_action', 'chatbot_message', etc.
            'count' => $count
        ]),
        'headers' => [
            'Content-Type' => 'application/json',
            'X-License-Key' => get_option('wooasm_license_key'),
            'X-Site-ID' => md5(get_site_url())
        ]
    ]);
    
    $body = json_decode(wp_remote_retrieve_body($response), true);
    
    if (!$body['success'] && $body['error'] === 'limit_exceeded') {
        // Show upgrade message to user
        return false;
    }
    
    return true;
}
```

### Response Example - Valid License

```json
{
  "valid": true,
  "plan": "starter",
  "features": ["full_assistant", "full_chatbot", "content_generation", "basic_insights"],
  "limits": {
    "assistant_actions": 500,
    "content_generations": 100,
    "chatbot_messages": 1000,
    "insights_refreshes": 30
  },
  "usage": {
    "assistant_actions": 45,
    "content_generations": 12,
    "chatbot_messages": 156,
    "insights_refreshes": 5
  },
  "user_name": "John Doe",
  "subscription_ends_at": "2025-01-29T00:00:00.000Z"
}
```

## 👨‍💼 Admin Access

Default admin credentials (change in production):

- **URL**: `/admin/login`
- **Username**: `absaar`
- **Password**: `AbsaarAdmin@12345`

To change admin credentials, edit `/backend/src/routes/admin.js`:

```javascript
const ADMIN_USERNAME = 'your_username';
const ADMIN_PASSWORD = 'your_secure_password';
```

## 🚢 Deployment

### Docker Deployment

```dockerfile
# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY backend/package.json backend/yarn.lock ./
RUN yarn install --production
COPY backend/ .
EXPOSE 8001
CMD ["node", "src/server.js"]
```

```dockerfile
# Frontend Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY frontend/package.json frontend/yarn.lock ./
RUN yarn install
COPY frontend/ .
RUN yarn build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
```

### Docker Compose

```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:6
    volumes:
      - mongo_data:/data/db
    ports:
      - "27017:27017"

  backend:
    build: ./backend
    ports:
      - "8001:8001"
    environment:
      - MONGO_URL=mongodb://mongodb:27017
      - DB_NAME=wooasm_database
      - JWT_SECRET=${JWT_SECRET}
      - STRIPE_API_KEY=${STRIPE_API_KEY}
    depends_on:
      - mongodb

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    environment:
      - REACT_APP_BACKEND_URL=http://localhost:8001

volumes:
  mongo_data:
```

### Environment-Specific Configuration

#### Production Checklist
- [ ] Change `JWT_SECRET` to a secure random string
- [ ] Update `CORS_ORIGINS` to your production domains
- [ ] Configure real Stripe keys (not test keys)
- [ ] Set up Stripe webhook endpoint
- [ ] Set up SendGrid for transactional emails
- [ ] Change admin credentials
- [ ] Set up MongoDB with authentication
- [ ] Configure SSL/HTTPS
- [ ] Set up monitoring and logging
- [ ] Configure rate limiting

### Recommended Hosting

- **Frontend**: Vercel, Netlify, AWS S3 + CloudFront
- **Backend**: AWS EC2, Google Cloud Run, DigitalOcean App Platform, Railway
- **Database**: MongoDB Atlas, AWS DocumentDB

## 📊 Database Schema

### Users Collection
```javascript
{
  id: String,           // UUID
  email: String,        // Unique, lowercase
  password_hash: String,
  name: String,
  company_name: String,
  email_verified: Boolean,
  verification_token: String,
  reset_token: String,
  reset_token_expires: String, // ISO DateTime
  plan: String,         // 'free', 'starter', 'professional'
  billing_cycle: String, // 'monthly', 'yearly', null
  subscription_status: String, // 'active', 'cancelled', 'expired', 'past_due'
  subscription_ends_at: String, // ISO DateTime
  stripe_customer_id: String,
  stripe_subscription_id: String,
  license_key: String,  // Unique, format: WASM-XXXX-XXXX-XXXX
  created_at: String,   // ISO DateTime
  updated_at: String,   // ISO DateTime
  last_login_at: String // ISO DateTime
}
```

### Site Activations Collection
```javascript
{
  id: String,           // UUID
  user_id: String,
  license_key: String,
  site_url: String,
  site_id: String,      // Unique (typically MD5 of site URL)
  plugin_version: String,
  wordpress_version: String,
  woocommerce_version: String,
  is_active: Boolean,
  activated_at: String, // ISO DateTime
  last_seen_at: String  // ISO DateTime
}
```

### Usage Records Collection
```javascript
{
  id: String,           // UUID
  user_id: String,
  site_id: String,
  month: String,        // Format: YYYY-MM
  assistant_actions: Number,
  content_generations: Number,
  chatbot_messages: Number,
  insights_refreshes: Number,
  created_at: String,   // ISO DateTime
  updated_at: String    // ISO DateTime
}
```

### Plugin Events Collection
```javascript
{
  id: String,           // UUID
  user_id: String,
  site_id: String,
  event_type: String,
  event_name: String,
  event_data: Object,
  created_at: String    // ISO DateTime
}
```

### Purchase Notifications Collection
```javascript
{
  id: String,           // UUID
  user_id: String,
  user_name: String,
  plan: String,
  display_name: String,
  country: String,
  created_at: String    // ISO DateTime
}
```

## 📦 Plan Limits

| Feature | Free | Starter ($29/mo) | Professional ($79/mo) |
|---------|------|------------------|----------------------|
| Sites | 1 | 3 | 10 |
| Assistant Actions | 50/mo | 500/mo | 2,000/mo |
| Content Generations | 10/mo | 100/mo | 500/mo |
| Chatbot Messages | 100/mo | 1,000/mo | 5,000/mo |
| Insights Refreshes | 5/mo | 30/mo | Unlimited |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Support

- **Documentation**: [docs.wooasm.com](https://docs.wooasm.com)
- **Email**: support@wooasm.com
- **Discord**: [Join our community](https://discord.gg/wooasm)

---

<p align="center">
  Made with ❤️ by the WooASM Team
</p>
