# WooASM.ai - AI Store Manager for WooCommerce

<p align="center">
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss" alt="TailwindCSS" />
</p>

WooASM is a powerful AI-powered store manager for WooCommerce. This repository contains the **frontend website** deployed to `wooasm.com`.

## 🏗 Architecture

| Component | URL | Repository |
|-----------|-----|------------|
| **Frontend Website** | wooasm.com | This repo |
| **Backend API** | api.wooasm.com | Separate repo (NestJS) |
| **WordPress Plugin** | WordPress.org | Separate repo |

## 📋 Documentation

All builders should read the documentation in `/docs/`:

| Document | For |
|----------|-----|
| [API_SPECIFICATION.md](./docs/API_SPECIFICATION.md) | Complete API endpoints spec |
| [BACKEND_BUILDER_INSTRUCTIONS.md](./docs/BACKEND_BUILDER_INSTRUCTIONS.md) | Backend API developer |
| [FRONTEND_BUILDER_INSTRUCTIONS.md](./docs/FRONTEND_BUILDER_INSTRUCTIONS.md) | Frontend website developer |
| [PLUGIN_BUILDER_INSTRUCTIONS.md](./docs/PLUGIN_BUILDER_INSTRUCTIONS.md) | WordPress plugin developer |

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
- **Billing**: Subscription management via Stripe
- **Settings**: Profile management, password change

### Admin Dashboard
- User management with search and filtering
- Subscription analytics (MRR, ARR, plan distribution)
- Site activation monitoring
- Usage statistics

## 🛠 Tech Stack

- **React 18** - UI library
- **React Router v6** - Client-side routing
- **TailwindCSS** - Utility-first CSS
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **React Helmet Async** - SEO management

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Yarn package manager

### Installation

```bash
cd frontend
yarn install
```

### Configuration

```bash
cp .env.example .env
```

Edit `.env`:
```env
# Production
REACT_APP_BACKEND_URL=https://api.wooasm.com

# Development (if running API locally)
# REACT_APP_BACKEND_URL=http://localhost:8001
```

### Development

```bash
yarn start
```

### Build for Production

```bash
yarn build
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/         # Reusable components
│   │   ├── layout/         # Header, Footer
│   │   ├── home/           # Homepage sections
│   │   └── ui/             # Shadcn UI components
│   ├── context/            # React contexts
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── pages/              # Page components
│   │   ├── admin/          # Admin dashboard pages
│   │   ├── auth/           # Login, Signup, etc.
│   │   ├── checkout/       # Success, Cancel pages
│   │   └── dashboard/      # User dashboard pages
│   ├── services/           # API service layer
│   │   └── api.js          # Centralized API calls
│   ├── data/               # Mock data
│   ├── App.js              # Main app with routes
│   └── index.css           # Global styles
├── public/                 # Static assets
├── package.json
└── .env
```

## 🔌 API Integration

All API calls go to the backend at `api.wooasm.com`:

```javascript
import api from './services/api';

// Authentication
await api.login(email, password);
await api.register(name, email, password);

// Dashboard
await api.getDashboard();
await api.getLicense();
await api.getUsage();

// Billing (Stripe)
await api.createCheckout('starter', 'monthly');
await api.getSubscription();
```

See [FRONTEND_BUILDER_INSTRUCTIONS.md](./docs/FRONTEND_BUILDER_INSTRUCTIONS.md) for complete API integration guide.

## 💳 Pricing Plans

| Plan | Monthly | Yearly |
|------|---------|--------|
| Starter | $29 | $290 |
| Professional | $79 | $790 |

## 👨‍💼 Admin Access

Admin dashboard is at `/admin/login`. Credentials are configured in the backend.

## 🚢 Deployment

### Build

```bash
yarn build
```

### Deploy

Deploy the `build/` folder to any static hosting:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static file server

### Environment

Ensure `REACT_APP_BACKEND_URL` is set correctly for production:
```env
REACT_APP_BACKEND_URL=https://api.wooasm.com
```

## 📄 License

Proprietary. All rights reserved.

---

<p align="center">
  Made with ❤️ by the WooASM Team
</p>
