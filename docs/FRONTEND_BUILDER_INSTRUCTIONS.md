# Frontend Website Builder Instructions

> **For:** Frontend Developer building `wooasm.com`
> **Stack:** React + TailwindCSS
> **Reference:** See `API_SPECIFICATION.md` for complete endpoint details

---

## Overview

You are building the marketing website and user dashboard for WooASM at `wooasm.com`. All API calls go to `api.wooasm.com`.

---

## Environment Configuration

```env
# /frontend/.env
REACT_APP_BACKEND_URL=https://api.wooasm.com

# For local development:
# REACT_APP_BACKEND_URL=http://localhost:8001
```

---

## API Integration

### Base URL

All API calls should use the `/api/v1/` prefix:

```javascript
const API_URL = process.env.REACT_APP_BACKEND_URL;

// Example API call
const response = await fetch(`${API_URL}/api/v1/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
```

---

## Authentication Flow

### 1. Update AuthContext

The AuthContext should:
- Store access_token and refresh_token
- Auto-refresh tokens before expiry
- Include token in all authenticated requests

```javascript
// src/context/AuthContext.jsx

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for stored token on mount
  useEffect(() => {
    const token = localStorage.getItem('wooasm_access_token');
    if (token) {
      fetchUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const response = await fetch(`${API_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
      localStorage.setItem('wooasm_access_token', data.data.access_token);
      localStorage.setItem('wooasm_refresh_token', data.data.refresh_token);
      setUser(data.data.user);
      return { success: true };
    }
    
    return { success: false, error: data.message };
  };

  const register = async (name, email, password) => {
    const response = await fetch(`${API_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    
    return response.json();
  };

  const logout = () => {
    localStorage.removeItem('wooasm_access_token');
    localStorage.removeItem('wooasm_refresh_token');
    setUser(null);
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('wooasm_access_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  // ...
};
```

---

## API Service Layer

Create a centralized API service:

```javascript
// src/services/api.js

const API_URL = process.env.REACT_APP_BACKEND_URL;

class ApiService {
  constructor() {
    this.baseUrl = `${API_URL}/api/v1`;
  }

  getToken() {
    return localStorage.getItem('wooasm_access_token');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    // Add auth token if available
    const token = this.getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  }

  // Auth
  login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  register(name, email, password) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  }

  // Dashboard
  getDashboard() {
    return this.request('/dashboard');
  }

  getLicense() {
    return this.request('/dashboard/license');
  }

  getUsage() {
    return this.request('/dashboard/usage');
  }

  getSites() {
    return this.request('/dashboard/sites');
  }

  deactivateSite(siteId) {
    return this.request(`/dashboard/sites/${siteId}`, { method: 'DELETE' });
  }

  updateSettings(data) {
    return this.request('/dashboard/settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  changePassword(currentPassword, newPassword) {
    return this.request('/dashboard/change-password', {
      method: 'POST',
      body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
    });
  }

  // Billing
  createCheckout(plan, billingCycle) {
    return this.request('/billing/create-checkout', {
      method: 'POST',
      body: JSON.stringify({ plan, billing_cycle: billingCycle }),
    });
  }

  getSubscription() {
    return this.request('/billing/subscription');
  }

  cancelSubscription(reason) {
    return this.request('/billing/cancel', {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  getPortalUrl() {
    return this.request('/billing/portal', { method: 'POST' });
  }

  // Notifications (public)
  getRecentNotification() {
    return fetch(`${this.baseUrl}/notifications/recent`).then(r => r.json());
  }
}

export const api = new ApiService();
```

---

## Page Updates

### 1. Pricing Page - Checkout Flow

```javascript
// src/pages/PricingPage.jsx

const handleSubscribe = async (plan, billingCycle) => {
  if (!isAuthenticated) {
    // Redirect to signup with plan info
    navigate(`/signup?plan=${plan}&billing=${billingCycle}`);
    return;
  }

  setLoading(true);
  try {
    const response = await api.createCheckout(plan, billingCycle);
    if (response.success) {
      // Redirect to Stripe Checkout
      window.location.href = response.data.checkout_url;
    }
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

### 2. Signup Page - After Registration

```javascript
// src/pages/auth/SignupPage.jsx

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await api.register(name, email, password);
    
    if (response.success) {
      setSuccess(true);
      // Show success message about email verification
      
      // If user came from pricing page with a plan, redirect to checkout
      const params = new URLSearchParams(window.location.search);
      const plan = params.get('plan');
      if (plan) {
        // Auto-login and redirect to checkout
        await login(email, password);
        navigate(`/pricing?plan=${plan}`);
      }
    }
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

### 3. Dashboard Pages - Use API Service

```javascript
// src/pages/dashboard/DashboardOverview.jsx

const DashboardOverview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getDashboard();
        setData(response.data);
      } catch (error) {
        console.error('Dashboard fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ... render
};
```

### 4. Billing Page - Real Stripe

```javascript
// src/pages/dashboard/BillingPage.jsx

const BillingPage = () => {
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    api.getSubscription().then(res => setSubscription(res.data));
  }, []);

  const handleUpgrade = async (plan, cycle) => {
    const response = await api.createCheckout(plan, cycle);
    window.location.href = response.data.checkout_url;
  };

  const handleManageBilling = async () => {
    const response = await api.getPortalUrl();
    window.location.href = response.data.portal_url;
  };

  const handleCancel = async () => {
    if (confirm('Are you sure you want to cancel?')) {
      await api.cancelSubscription('User requested');
      // Refresh subscription data
    }
  };

  // ... render
};
```

---

## Remove Test Plan Feature

Remove the "Testing Plan (Dev Only)" section from BillingPage since we're using real Stripe:

```javascript
// REMOVE this section from BillingPage.jsx:
// - Test plan selection
// - /api/billing/activate-test-plan calls
// - Any test plan UI
```

---

## Checkout Success/Cancel Pages

### Success Page
```javascript
// src/pages/checkout/CheckoutSuccessPage.jsx

const CheckoutSuccessPage = () => {
  const [status, setStatus] = useState('loading');
  const searchParams = new URLSearchParams(window.location.search);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      // Verify payment was successful
      api.request(`/billing/checkout/status/${sessionId}`)
        .then(res => {
          if (res.data.status === 'complete') {
            setStatus('success');
          } else {
            setStatus('pending');
          }
        })
        .catch(() => setStatus('error'));
    }
  }, [sessionId]);

  return (
    // Show appropriate UI based on status
  );
};
```

---

## Admin Dashboard Updates

```javascript
// src/pages/admin/AdminDashboard.jsx

// Use X-Admin-Token header instead of Authorization
const getAdminHeaders = () => ({
  'Content-Type': 'application/json',
  'X-Admin-Token': localStorage.getItem('wooasm_admin_token')
});

const fetchStats = async () => {
  const response = await fetch(`${API_URL}/api/v1/admin/stats`, {
    headers: getAdminHeaders()
  });
  return response.json();
};
```

---

## Update README

Add to your README:

```markdown
## API Integration

The frontend connects to the WooASM API backend.

### Configuration

```env
# Production
REACT_APP_BACKEND_URL=https://api.wooasm.com

# Development
REACT_APP_BACKEND_URL=http://localhost:8001
```

### API Endpoints Used

All endpoints use `/api/v1/` prefix.

- Authentication: `/api/v1/auth/*`
- Dashboard: `/api/v1/dashboard/*`
- Billing: `/api/v1/billing/*`
- Admin: `/api/v1/admin/*`
- Notifications: `/api/v1/notifications/*`
```

---

## Checklist

- [ ] Update API_URL to use `api.wooasm.com`
- [ ] Update all endpoints to use `/api/v1/` prefix
- [ ] Update AuthContext to handle new response format
- [ ] Create API service layer
- [ ] Update dashboard pages to use API service
- [ ] Remove test plan feature from billing page
- [ ] Update pricing page for real Stripe checkout
- [ ] Update checkout success/cancel pages
- [ ] Update admin dashboard for new API format
- [ ] Test all flows end-to-end

---

## Questions?

Coordinate with:
- **Backend Builder** - For API response format
- **Plugin Builder** - For license key display format
