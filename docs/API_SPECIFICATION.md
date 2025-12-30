# WooASM Complete API Specification

> **Master Document for All Builders**
> - API Backend Builder: Implement these endpoints at `api.wooasm.com`
> - Frontend Builder: Consume these endpoints from `wooasm.com`
> - Plugin Builder: Integrate with plugin API endpoints

**Last Updated:** December 2024
**API Base URL:** `https://api.wooasm.com/api/v1`
**Frontend URL:** `https://wooasm.com`

---

## Table of Contents

1. [Authentication & Users](#1-authentication--users)
2. [User Dashboard](#2-user-dashboard)
3. [Billing & Subscriptions](#3-billing--subscriptions)
4. [Admin Dashboard](#4-admin-dashboard)
5. [Plugin API](#5-plugin-api)
6. [Notifications](#6-notifications)
7. [Data Models](#7-data-models)
8. [Response Formats](#8-response-formats)
9. [Error Codes](#9-error-codes)

---

## 1. Authentication & Users

### 1.1 User Registration

**Endpoint:** `POST /api/v1/auth/register`

**Description:** Register a new user account. Creates user with FREE plan by default.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "name": "John Doe",
  "company_name": "Acme Inc"  // optional
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Registration successful. Please check your email to verify your account.",
  "data": {
    "user": {
      "id": "user_abc123",
      "email": "user@example.com",
      "name": "John Doe",
      "plan": "free",
      "email_verified": false,
      "license_key": "WASM-XXXX-XXXX-XXXX",
      "created_at": "2024-12-30T10:00:00.000Z"
    }
  }
}
```

**Errors:**
- `400` - Invalid input (validation errors)
- `409` - Email already registered

---

### 1.2 User Login

**Endpoint:** `POST /api/v1/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
    "token_type": "bearer",
    "expires_in": 3600,
    "user": {
      "id": "user_abc123",
      "email": "user@example.com",
      "name": "John Doe",
      "plan": "starter",
      "license_key": "WASM-XXXX-XXXX-XXXX",
      "subscription_status": "active"
    }
  }
}
```

**Errors:**
- `401` - Invalid email or password
- `403` - Email not verified

---

### 1.3 Refresh Token

**Endpoint:** `POST /api/v1/auth/refresh`

**Request Body:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIs...",
    "token_type": "bearer",
    "expires_in": 3600
  }
}
```

---

### 1.4 Logout

**Endpoint:** `POST /api/v1/auth/logout`

**Headers:** `Authorization: Bearer {access_token}`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### 1.5 Verify Email

**Endpoint:** `POST /api/v1/auth/verify-email`

**Request Body:**
```json
{
  "token": "verification_token_from_email"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

---

### 1.6 Forgot Password

**Endpoint:** `POST /api/v1/auth/forgot-password`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "If an account exists, a reset link has been sent."
}
```

---

### 1.7 Reset Password

**Endpoint:** `POST /api/v1/auth/reset-password`

**Request Body:**
```json
{
  "token": "reset_token_from_email",
  "new_password": "NewSecurePassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

---

### 1.8 Get Current User

**Endpoint:** `GET /api/v1/auth/me`

**Headers:** `Authorization: Bearer {access_token}`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "user_abc123",
    "email": "user@example.com",
    "name": "John Doe",
    "company_name": "Acme Inc",
    "plan": "starter",
    "billing_cycle": "monthly",
    "subscription_status": "active",
    "license_key": "WASM-XXXX-XXXX-XXXX",
    "email_verified": true,
    "created_at": "2024-12-30T10:00:00.000Z"
  }
}
```

---

## 2. User Dashboard

> All endpoints require `Authorization: Bearer {access_token}` header

### 2.1 Dashboard Overview

**Endpoint:** `GET /api/v1/dashboard`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_abc123",
      "name": "John Doe",
      "email": "user@example.com",
      "plan": "starter",
      "license_key": "WASM-XXXX-XXXX-XXXX"
    },
    "subscription": {
      "plan": "starter",
      "status": "active",
      "billing_cycle": "monthly",
      "current_period_end": "2025-01-30T10:00:00.000Z",
      "cancel_at_period_end": false
    },
    "usage": {
      "month": "2024-12",
      "assistant_actions": 45,
      "content_generations": 12,
      "chatbot_messages": 156,
      "insights_refreshes": 2,
      "weighted_total": 269
    },
    "limits": {
      "sites": 1,
      "sites_used": 1,
      "assistant_actions": 500,
      "content_generations": 100,
      "chatbot_messages": 500,
      "insights_refreshes": 4,
      "weighted_cap": 8000
    }
  }
}
```

---

### 2.2 Get License Details

**Endpoint:** `GET /api/v1/dashboard/license`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "license_key": "WASM-XXXX-XXXX-XXXX",
    "status": "active",
    "plan": "starter",
    "max_sites": 1,
    "sites_used": 1,
    "expires_at": "2025-01-30T10:00:00.000Z",
    "features": ["full_assistant", "full_chatbot", "content_generation", "basic_insights"],
    "activated_sites": [
      {
        "site_id": "abc123",
        "site_url": "https://mystore.com",
        "activated_at": "2024-12-15T10:00:00.000Z",
        "last_seen_at": "2024-12-30T08:00:00.000Z"
      }
    ]
  }
}
```

---

### 2.3 Regenerate License Key

**Endpoint:** `POST /api/v1/dashboard/regenerate-license`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "License key regenerated. All sites have been deactivated.",
  "data": {
    "license_key": "WASM-YYYY-YYYY-YYYY"
  }
}
```

---

### 2.4 Get Usage Statistics

**Endpoint:** `GET /api/v1/dashboard/usage`

**Query Params:** `?months=6` (optional, default 6)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "current_month": "2024-12",
    "usage": {
      "assistant_actions": 45,
      "content_generations": 12,
      "chatbot_messages": 156,
      "insights_refreshes": 2,
      "weighted_total": 269
    },
    "limits": {
      "assistant_actions": 500,
      "content_generations": 100,
      "chatbot_messages": 500,
      "insights_refreshes": 4,
      "weighted_cap": 8000
    },
    "history": [
      { "month": "2024-12", "assistant_actions": 45, "content_generations": 12, "chatbot_messages": 156, "insights_refreshes": 2 },
      { "month": "2024-11", "assistant_actions": 120, "content_generations": 35, "chatbot_messages": 420, "insights_refreshes": 4 }
    ]
  }
}
```

---

### 2.5 Get Activated Sites

**Endpoint:** `GET /api/v1/dashboard/sites`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "sites_allowed": 1,
    "sites_used": 1,
    "sites": [
      {
        "site_id": "abc123",
        "site_url": "https://mystore.com",
        "plugin_version": "1.0.0",
        "wordpress_version": "6.4.2",
        "woocommerce_version": "8.4.0",
        "is_active": true,
        "activated_at": "2024-12-15T10:00:00.000Z",
        "last_seen_at": "2024-12-30T08:00:00.000Z"
      }
    ]
  }
}
```

---

### 2.6 Deactivate Site

**Endpoint:** `DELETE /api/v1/dashboard/sites/{site_id}`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Site deactivated successfully"
}
```

---

### 2.7 Update Profile Settings

**Endpoint:** `PUT /api/v1/dashboard/settings`

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "company_name": "New Company Name"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Settings updated successfully"
}
```

---

### 2.8 Change Password

**Endpoint:** `POST /api/v1/dashboard/change-password`

**Request Body:**
```json
{
  "current_password": "OldPassword123",
  "new_password": "NewPassword456"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

### 2.9 Delete Account

**Endpoint:** `DELETE /api/v1/dashboard/account`

**Request Body:**
```json
{
  "password": "CurrentPassword123",
  "confirm": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Account deleted successfully"
}
```

---

## 3. Billing & Subscriptions

> All endpoints require `Authorization: Bearer {access_token}` header

### 3.1 Create Stripe Checkout Session

**Endpoint:** `POST /api/v1/billing/create-checkout`

**Request Body:**
```json
{
  "plan": "starter",
  "billing_cycle": "monthly"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "checkout_url": "https://checkout.stripe.com/c/pay/cs_test_...",
    "session_id": "cs_test_abc123"
  }
}
```

**Plan Options:** `starter`, `professional`
**Billing Cycle Options:** `monthly`, `yearly`

---

### 3.2 Get Checkout Session Status

**Endpoint:** `GET /api/v1/billing/checkout/status/{session_id}`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "status": "complete",
    "payment_status": "paid",
    "plan": "starter",
    "billing_cycle": "monthly"
  }
}
```

---

### 3.3 Get Current Subscription

**Endpoint:** `GET /api/v1/billing/subscription`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "plan": "starter",
    "billing_cycle": "monthly",
    "status": "active",
    "current_period_start": "2024-12-01T00:00:00.000Z",
    "current_period_end": "2025-01-01T00:00:00.000Z",
    "cancel_at_period_end": false,
    "amount": 2900,
    "currency": "usd",
    "next_invoice": {
      "amount": 2900,
      "date": "2025-01-01T00:00:00.000Z"
    }
  }
}
```

---

### 3.4 Cancel Subscription

**Endpoint:** `POST /api/v1/billing/cancel`

**Request Body:**
```json
{
  "reason": "Too expensive",
  "feedback": "Optional feedback"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Subscription will be cancelled at the end of the billing period",
  "data": {
    "cancel_at": "2025-01-01T00:00:00.000Z"
  }
}
```

---

### 3.5 Resume Subscription

**Endpoint:** `POST /api/v1/billing/resume`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Subscription resumed successfully"
}
```

---

### 3.6 Update Payment Method (Stripe Portal)

**Endpoint:** `POST /api/v1/billing/portal`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "portal_url": "https://billing.stripe.com/p/session/..."
  }
}
```

---

### 3.7 Get Billing History

**Endpoint:** `GET /api/v1/billing/invoices`

**Query Params:** `?limit=10`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "invoices": [
      {
        "id": "inv_abc123",
        "amount": 2900,
        "currency": "usd",
        "status": "paid",
        "invoice_pdf": "https://pay.stripe.com/invoice/...",
        "created_at": "2024-12-01T00:00:00.000Z"
      }
    ]
  }
}
```

---

### 3.8 Stripe Webhook Handler

**Endpoint:** `POST /api/v1/webhooks/stripe`

**Headers:** `Stripe-Signature: {signature}`

**Events to Handle:**
- `checkout.session.completed` - Upgrade user plan
- `customer.subscription.updated` - Update subscription status
- `customer.subscription.deleted` - Downgrade to free
- `invoice.paid` - Record payment, extend subscription
- `invoice.payment_failed` - Mark as past_due, send email

---

## 4. Admin Dashboard

> All endpoints require `X-Admin-Token: {jwt_token}` header

### 4.1 Admin Login

**Endpoint:** `POST /api/v1/admin/login`

**Request Body:**
```json
{
  "email": "admin@wooasm.com",
  "password": "AdminPassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "admin_token": "eyJhbGciOiJIUzI1NiIs...",
    "role": "super_admin",
    "expires_in": 28800
  }
}
```

---

### 4.2 Get Dashboard Stats

**Endpoint:** `GET /api/v1/admin/stats`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "overview": {
      "total_users": 1250,
      "users_today": 12,
      "users_this_week": 85,
      "users_this_month": 320
    },
    "plans": {
      "free": 850,
      "starter": 320,
      "professional": 80
    },
    "revenue": {
      "mrr": 15600,
      "arr": 187200,
      "today": 290,
      "this_month": 4500
    },
    "usage": {
      "total_ai_queries_this_month": 125000,
      "assistant_actions": 45000,
      "content_generations": 12000,
      "chatbot_messages": 68000
    },
    "sites": {
      "total_activated": 420,
      "active_last_7_days": 380
    }
  }
}
```

---

### 4.3 List Users

**Endpoint:** `GET /api/v1/admin/users`

**Query Params:**
- `page` (default: 1)
- `limit` (default: 20)
- `plan` (filter: free, starter, professional)
- `search` (email or name)
- `status` (active, cancelled, past_due)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "user_abc123",
        "email": "user@example.com",
        "name": "John Doe",
        "plan": "starter",
        "subscription_status": "active",
        "license_key": "WASM-XXXX-XXXX-XXXX",
        "sites_count": 1,
        "email_verified": true,
        "created_at": "2024-12-01T00:00:00.000Z",
        "last_login_at": "2024-12-30T08:00:00.000Z"
      }
    ],
    "pagination": {
      "total": 1250,
      "page": 1,
      "pages": 63,
      "limit": 20
    }
  }
}
```

---

### 4.4 Get User Details

**Endpoint:** `GET /api/v1/admin/users/{user_id}`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_abc123",
      "email": "user@example.com",
      "name": "John Doe",
      "company_name": "Acme Inc",
      "plan": "starter",
      "billing_cycle": "monthly",
      "subscription_status": "active",
      "license_key": "WASM-XXXX-XXXX-XXXX",
      "stripe_customer_id": "cus_abc123",
      "email_verified": true,
      "created_at": "2024-12-01T00:00:00.000Z"
    },
    "sites": [
      {
        "site_id": "abc123",
        "site_url": "https://mystore.com",
        "is_active": true,
        "last_seen_at": "2024-12-30T08:00:00.000Z"
      }
    ],
    "usage_history": [
      { "month": "2024-12", "assistant_actions": 45, "content_generations": 12 }
    ],
    "billing_history": [
      { "date": "2024-12-01", "amount": 2900, "status": "paid" }
    ]
  }
}
```

---

### 4.5 Create User (Admin)

**Endpoint:** `POST /api/v1/admin/users`

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "name": "New User",
  "plan": "starter",
  "send_welcome_email": true
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_xyz789",
      "email": "newuser@example.com",
      "name": "New User",
      "plan": "starter"
    },
    "license": {
      "license_key": "WASM-YYYY-YYYY-YYYY",
      "status": "active"
    },
    "temp_password": "TempPass123!"  // Only if password not provided
  }
}
```

---

### 4.6 Update User (Admin)

**Endpoint:** `PUT /api/v1/admin/users/{user_id}`

**Request Body:**
```json
{
  "plan": "professional",
  "subscription_status": "active"
}
```

---

### 4.7 Get Subscription Analytics

**Endpoint:** `GET /api/v1/admin/subscriptions`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "active": {
      "total": 400,
      "starter": 320,
      "professional": 80
    },
    "mrr_by_plan": {
      "starter": 9280,
      "professional": 6320
    },
    "churn": {
      "cancelled_this_month": 15,
      "churn_rate": 3.75
    },
    "growth": {
      "new_subscriptions_this_month": 45,
      "upgrades": 12,
      "downgrades": 3
    }
  }
}
```

---

### 4.8 Get All Sites

**Endpoint:** `GET /api/v1/admin/sites`

**Query Params:** `?page=1&limit=50&active_only=true`

---

### 4.9 Get Recent Purchases (for notifications)

**Endpoint:** `GET /api/v1/admin/purchases`

**Query Params:** `?limit=20`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "purchases": [
      {
        "user_name": "John D.",
        "plan": "starter",
        "country": "US",
        "created_at": "2024-12-30T10:00:00.000Z"
      }
    ]
  }
}
```

---

## 5. Plugin API

> These endpoints are called by the WordPress plugin

### 5.1 Validate License

**Endpoint:** `POST /api/v1/license/validate`

**Request Body:**
```json
{
  "license_key": "WASM-XXXX-XXXX-XXXX",
  "site_url": "https://mystore.com",
  "site_id": "md5_hash_of_site_url",
  "plugin_version": "1.0.0",
  "wordpress_version": "6.4.2",
  "woocommerce_version": "8.4.0"
}
```

**Response (200 OK) - Valid:**
```json
{
  "valid": true,
  "plan": "starter",
  "features": ["full_assistant", "full_chatbot", "content_generation", "basic_insights"],
  "limits": {
    "assistant_actions": 500,
    "content_generations": 100,
    "chatbot_messages": 500,
    "insights_refreshes": 4,
    "weighted_cap": 8000
  },
  "usage": {
    "assistant_actions": 45,
    "content_generations": 12,
    "chatbot_messages": 156,
    "insights_refreshes": 2,
    "weighted_total": 269
  },
  "user_name": "John Doe",
  "subscription_ends_at": "2025-01-01T00:00:00.000Z"
}
```

**Response (200 OK) - Invalid:**
```json
{
  "valid": false,
  "error": "invalid_license",
  "message": "Invalid license key"
}
```

**Error Codes:**
- `invalid_license` - License key doesn't exist
- `expired` - Subscription expired
- `suspended` - License suspended by admin
- `site_limit_reached` - Max sites activated

---

### 5.2 AI Chat

**Endpoint:** `POST /api/v1/ai/chat`

**Headers:**
- `X-License-Key: WASM-XXXX-XXXX-XXXX`
- `X-Site-Id: md5_hash_of_site_url`

**Request Body:**
```json
{
  "messages": [
    { "role": "system", "content": "You are a WooCommerce store assistant." },
    { "role": "user", "content": "Write a product description for..." }
  ],
  "model": "gpt-4o",
  "temperature": 0.7,
  "max_tokens": 2000
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "content": "Here's a compelling product description...",
    "usage": {
      "prompt_tokens": 150,
      "completion_tokens": 350,
      "total_tokens": 500
    },
    "remaining": {
      "assistant_actions": 454,
      "weighted_remaining": 7730
    }
  }
}
```

---

### 5.3 Content Generation

**Endpoint:** `POST /api/v1/ai/content`

**Headers:**
- `X-License-Key: WASM-XXXX-XXXX-XXXX`
- `X-Site-Id: md5_hash_of_site_url`

**Request Body:**
```json
{
  "prompt": "Write a blog post about sustainable fashion",
  "content_type": "blog_post",
  "model": "gpt-4o",
  "temperature": 0.8
}
```

**Content Types:** `product_description`, `blog_post`, `email_campaign`, `social_media`, `seo_content`

---

### 5.4 Chatbot Message

**Endpoint:** `POST /api/v1/ai/chatbot`

**Headers:**
- `X-License-Key: WASM-XXXX-XXXX-XXXX`
- `X-Site-Id: md5_hash_of_site_url`

**Request Body:**
```json
{
  "message": "What's your return policy?",
  "conversation_id": "conv_abc123",
  "context": {
    "store_name": "My Store",
    "customer_name": "Jane"
  }
}
```

---

### 5.5 Track Usage

**Endpoint:** `POST /api/v1/usage/track`

**Headers:**
- `X-License-Key: WASM-XXXX-XXXX-XXXX`
- `X-Site-Id: md5_hash_of_site_url`

**Request Body:**
```json
{
  "action_type": "assistant_action",
  "count": 1
}
```

**Action Types:**
- `assistant_action` (weight: 1)
- `content_generation` (weight: 4)
- `chatbot_message` (weight: 1)
- `insights_refresh` (weight: 10)

---

### 5.6 Get Usage Summary

**Endpoint:** `GET /api/v1/usage/summary`

**Headers:**
- `X-License-Key: WASM-XXXX-XXXX-XXXX`
- `X-Site-Id: md5_hash_of_site_url`

---

### 5.7 Track Event

**Endpoint:** `POST /api/v1/events/track`

**Request Body:**
```json
{
  "license_key": "WASM-XXXX-XXXX-XXXX",
  "site_id": "md5_hash",
  "event_type": "feature_used",
  "event_name": "product_description_generated",
  "event_data": {
    "product_id": 123,
    "generation_time_ms": 1500
  },
  "plugin_version": "1.0.0"
}
```

**Event Types:** `lifecycle`, `feature_used`, `error`, `api_call`

---

## 6. Notifications

### 6.1 Get Recent Notification (Public)

**Endpoint:** `GET /api/v1/notifications/recent`

**Description:** Returns a random recent purchase for social proof toast

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "notification": {
      "display_name": "John from US",
      "plan": "starter",
      "seconds_ago": 1800
    }
  }
}
```

---

## 7. Data Models

### User Model
```typescript
{
  id: string;                    // UUID
  email: string;                 // Unique, lowercase
  password_hash: string;         // bcrypt hashed
  name: string;
  company_name?: string;
  
  // Subscription
  plan: 'free' | 'starter' | 'professional';
  billing_cycle?: 'monthly' | 'yearly';
  subscription_status: 'active' | 'cancelled' | 'past_due' | 'expired';
  subscription_ends_at?: Date;
  
  // Stripe
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  
  // License
  license_key: string;           // Format: WASM-XXXX-XXXX-XXXX
  
  // Verification
  email_verified: boolean;
  verification_token?: string;
  reset_token?: string;
  reset_token_expires?: Date;
  
  // Timestamps
  created_at: Date;
  updated_at: Date;
  last_login_at?: Date;
}
```

### Site Activation Model
```typescript
{
  id: string;
  user_id: string;               // Reference to User
  license_key: string;
  site_url: string;
  site_id: string;               // Unique (MD5 of site_url)
  plugin_version?: string;
  wordpress_version?: string;
  woocommerce_version?: string;
  is_active: boolean;
  activated_at: Date;
  last_seen_at: Date;
}
```

### Usage Record Model
```typescript
{
  id: string;
  user_id: string;
  site_id: string;
  month: string;                 // Format: YYYY-MM
  assistant_actions: number;
  content_generations: number;
  chatbot_messages: number;
  insights_refreshes: number;
  weighted_total: number;        // Calculated
  created_at: Date;
  updated_at: Date;
}
```

---

## 8. Response Formats

### Success Response
```json
{
  "success": true,
  "message": "Optional message",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": "error_code",
  "message": "Human readable message",
  "details": { }  // Optional validation errors
}
```

---

## 9. Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `validation_error` | 400 | Invalid request body |
| `unauthorized` | 401 | Missing or invalid auth |
| `forbidden` | 403 | Not allowed |
| `not_found` | 404 | Resource not found |
| `conflict` | 409 | Resource already exists |
| `limit_exceeded` | 429 | Usage limit reached |
| `server_error` | 500 | Internal server error |

---

## Plan Pricing

| Plan | Monthly | Yearly (2 months free) |
|------|---------|------------------------|
| Starter | $29 | $290 |
| Professional | $79 | $790 |

---

## Authentication Summary

| Endpoint Type | Auth Method | Header |
|---------------|-------------|--------|
| User Auth | JWT Bearer Token | `Authorization: Bearer {token}` |
| Admin | JWT Admin Token | `X-Admin-Token: {token}` |
| Plugin | License Key | `X-License-Key: {key}` + `X-Site-Id: {id}` |
| Webhook | Stripe Signature | `Stripe-Signature: {sig}` |
| Public | None | - |
