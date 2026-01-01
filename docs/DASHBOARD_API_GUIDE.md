# Backend API - Dashboard & License Endpoints Guide

The frontend expects specific data formats from these endpoints. Here's what each should return:

---

## 1. GET /api/v1/dashboard

This is the main dashboard endpoint that returns all user data.

**Expected Response Format:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "plan": "starter",              // "none", "free", "starter", "professional"
      "billingCycle": "monthly",      // "monthly", "yearly", null
      "subscriptionStatus": "active", // "active", "cancelled", "past_due", null
      "licenseKey": "WASM-XXXX-XXXX-XXXX",  // null if no subscription
      "maxSites": 1,                  // Based on plan
      "sitesUsed": 0                  // Number of activated sites
    },
    "license": {
      "licenseKey": "WASM-XXXX-XXXX-XXXX",
      "status": "active",
      "plan": "starter",
      "maxSites": 1,
      "sitesUsed": 0,
      "sitesRemaining": 1
    },
    "hasSubscription": true,          // IMPORTANT: Frontend uses this to show/hide license
    "usage": {
      "current": {
        "assistantActions": 15,
        "chatbotMessages": 45,
        "contentGenerations": 8,
        "insightsRefreshes": 3
      },
      "limits": {
        "assistantActions": 100,
        "chatbotMessages": 500,
        "contentGenerations": 100,
        "insightsRefreshes": 50
      },
      "percentages": {
        "assistantActions": 15,
        "chatbotMessages": 9,
        "contentGenerations": 8,
        "insightsRefreshes": 6,
        "weighted": 10,
        "overall": 10
      }
    }
  }
}
```

**When user has NO subscription:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "plan": "none",
      "billingCycle": null,
      "subscriptionStatus": null,
      "licenseKey": null,
      "maxSites": 0,
      "sitesUsed": 0
    },
    "license": null,
    "hasSubscription": false,
    "usage": null
  }
}
```

### NestJS Implementation:

```typescript
@Get()
@UseGuards(JwtAuthGuard)
async getDashboard(@Request() req) {
  const user = await this.userService.findById(req.user.id);
  
  const hasSubscription = 
    user.subscriptionStatus === 'active' && 
    user.plan && 
    user.plan !== 'none';

  const sitesUsed = await this.siteService.countUserSites(user.id);
  const maxSites = this.getMaxSites(user.plan);

  return {
    success: true,
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        plan: user.plan || 'none',
        billingCycle: user.billingCycle,
        subscriptionStatus: user.subscriptionStatus,
        licenseKey: user.licenseKey,
        maxSites,
        sitesUsed,
      },
      license: hasSubscription ? {
        licenseKey: user.licenseKey,
        status: user.subscriptionStatus,
        plan: user.plan,
        maxSites,
        sitesUsed,
        sitesRemaining: maxSites - sitesUsed,
      } : null,
      hasSubscription,
      usage: hasSubscription ? await this.getUsageData(user.id, user.plan) : null,
    },
  };
}

private getMaxSites(plan: string): number {
  const planSites = {
    'starter': 1,
    'professional': 5,
    'enterprise': 999,
  };
  return planSites[plan] || 0;
}

private async getUsageData(userId: string, plan: string) {
  const usage = await this.usageService.getCurrentMonthUsage(userId);
  const limits = this.getPlanLimits(plan);
  
  return {
    current: {
      assistantActions: usage.assistantActions || 0,
      chatbotMessages: usage.chatbotMessages || 0,
      contentGenerations: usage.contentGenerations || 0,
      insightsRefreshes: usage.insightsRefreshes || 0,
    },
    limits,
    percentages: {
      assistantActions: Math.round((usage.assistantActions / limits.assistantActions) * 100),
      chatbotMessages: Math.round((usage.chatbotMessages / limits.chatbotMessages) * 100),
      contentGenerations: Math.round((usage.contentGenerations / limits.contentGenerations) * 100),
      insightsRefreshes: Math.round((usage.insightsRefreshes / limits.insightsRefreshes) * 100),
      weighted: 10, // Calculate your weighted average
      overall: 10,
    },
  };
}
```

---

## 2. GET /api/v1/dashboard/license

Returns detailed license information.

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "licenseKey": "WASM-XXXX-XXXX-XXXX",
    "status": "active",
    "plan": "starter",
    "maxSites": 1,
    "sitesUsed": 1,
    "sitesRemaining": 0,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "expiresAt": "2027-01-01T00:00:00.000Z"
  }
}
```

---

## 3. GET /api/v1/dashboard/usage

Returns usage statistics.

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "currentMonth": "2026-01",
    "usage": {
      "current": {
        "assistantActions": 15,
        "chatbotMessages": 45,
        "contentGenerations": 8,
        "insightsRefreshes": 3
      },
      "limits": {
        "assistantActions": 100,
        "chatbotMessages": 500,
        "contentGenerations": 100,
        "insightsRefreshes": 50
      },
      "percentages": {
        "assistantActions": 15,
        "chatbotMessages": 9,
        "contentGenerations": 8,
        "insightsRefreshes": 6
      }
    },
    "history": [
      {
        "month": "2025-12",
        "assistantActions": 89,
        "chatbotMessages": 234,
        "contentGenerations": 45,
        "insightsRefreshes": 12
      }
    ]
  }
}
```

---

## 4. GET /api/v1/dashboard/sites

Returns activated sites for the user.

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "sitesAllowed": 1,
    "sitesUsed": 1,
    "sites": [
      {
        "siteId": "site_xxx",
        "siteUrl": "https://mystore.com",
        "isActive": true,
        "pluginVersion": "1.2.0",
        "wordpressVersion": "6.4",
        "lastSeenAt": "2026-01-01T12:00:00.000Z",
        "activatedAt": "2025-12-15T00:00:00.000Z"
      }
    ]
  }
}
```

---

## 5. Site Activation from WordPress Plugin

When the WordPress plugin activates a license, it should call:

**POST /api/v1/sites/activate**
```json
{
  "licenseKey": "WASM-XXXX-XXXX-XXXX",
  "siteUrl": "https://mystore.com",
  "pluginVersion": "1.2.0",
  "wordpressVersion": "6.4"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Site activated successfully",
  "data": {
    "siteId": "site_xxx",
    "activated": true
  }
}
```

This endpoint should:
1. Validate the license key
2. Check if user has available site slots (`sitesUsed < maxSites`)
3. Create or update the site record
4. Increment `sitesUsed` counter

---

## CRITICAL CHECKLIST

After a user subscribes (mock or real):

- [ ] `user.plan` is updated ("starter" or "professional")
- [ ] `user.subscriptionStatus` is set to "active"
- [ ] `user.licenseKey` is generated (if not already exists)
- [ ] `user.billingCycle` is set ("monthly" or "yearly")
- [ ] `user.maxSites` is set based on plan

The dashboard will show license key when:
```javascript
hasSubscription = user.subscriptionStatus === 'active' && user.plan !== 'none'
licenseKey = user.licenseKey !== null
```

Both must be true for license to display!
