// WooASM API Service
// Centralized API calls to api.wooasm.com
// All field names use camelCase to match NestJS backend

const API_URL = process.env.REACT_APP_BACKEND_URL;

class ApiService {
  constructor() {
    this.baseUrl = `${API_URL}/api/v1`;
  }

  getToken() {
    return localStorage.getItem('wooasm_access_token');
  }

  getAdminToken() {
    return localStorage.getItem('wooasm_admin_token');
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

    // Add auth token if available and not explicitly set
    const token = this.getToken();
    if (token && !config.headers['Authorization'] && !config.headers['X-Admin-Token']) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      
      // Handle rate limiting (429 Too Many Requests)
      if (response.status === 429) {
        return {
          success: false,
          error: 'rate_limited',
          message: 'Too many requests. Please wait a moment and try again.',
          statusCode: 429
        };
      }

      // Handle unauthorized - try to refresh token
      if (response.status === 401) {
        const refreshed = await this.refreshToken();
        if (refreshed) {
          // Retry the request with new token
          config.headers['Authorization'] = `Bearer ${this.getToken()}`;
          const retryResponse = await fetch(url, config);
          if (retryResponse.ok) {
            return retryResponse.json();
          }
        }
        // Return the original 401 response
        return {
          success: false,
          error: 'unauthorized',
          message: 'Session expired. Please log in again.',
          statusCode: 401
        };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      // Return error object instead of throwing
      return {
        success: false,
        error: 'network_error',
        message: 'Network error. Please check your connection.',
      };
    }
  }

  async refreshToken() {
    const refreshToken = localStorage.getItem('wooasm_refresh_token');
    if (!refreshToken) return false;

    try {
      const response = await fetch(`${this.baseUrl}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }), // camelCase per API spec
      });
      
      const result = await response.json();
      
      // Backend returns: { success: true, accessToken, refreshToken } (tokens at root level)
      if (result.success && result.accessToken) {
        localStorage.setItem('wooasm_access_token', result.accessToken);
        if (result.refreshToken) {
          localStorage.setItem('wooasm_refresh_token', result.refreshToken);
        }
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  // ============ Auth ============
  
  // POST /auth/register
  async register(name, email, password, companyName = '') {
    const body = {
      email,
      password,
      name,
    };
    
    // Only include companyName if it has a value
    if (companyName && companyName.trim()) {
      body.companyName = companyName.trim();
    }
    
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  // POST /auth/login
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // GET /auth/verify-email?token=xxx
  async verifyEmail(token) {
    return this.request(`/auth/verify-email?token=${encodeURIComponent(token)}`);
  }

  // POST /auth/forgot-password
  async forgotPassword(email) {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // POST /auth/reset-password
  async resetPassword(token, password) {
    return this.request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }), // Backend expects 'password'
    });
  }

  // GET /auth/me
  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // POST /auth/logout
  async logout() {
    return this.request('/auth/logout', { method: 'POST' });
  }

  // ============ Dashboard ============
  
  // GET /dashboard
  async getDashboard() {
    return this.request('/dashboard');
  }

  // GET /dashboard/license
  async getLicense() {
    return this.request('/dashboard/license');
  }

  // POST /dashboard/regenerate-license
  async regenerateLicense() {
    return this.request('/dashboard/regenerate-license', { method: 'POST' });
  }

  // GET /dashboard/usage
  async getUsage() {
    return this.request('/dashboard/usage');
  }

  // GET /dashboard/sites
  async getSites() {
    return this.request('/dashboard/sites');
  }

  // DELETE /dashboard/sites/:siteId
  async deactivateSite(siteId) {
    return this.request(`/dashboard/sites/${siteId}`, { method: 'DELETE' });
  }

  // PUT /dashboard/settings
  async updateSettings(data) {
    // Backend expects: { name?, companyName? }
    const body = {};
    if (data.name) body.name = data.name;
    if (data.companyName !== undefined) body.companyName = data.companyName;
    
    return this.request('/dashboard/settings', {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  // POST /dashboard/change-password
  async changePassword(currentPassword, newPassword) {
    return this.request('/dashboard/change-password', {
      method: 'POST',
      body: JSON.stringify({ 
        currentPassword,  // camelCase
        newPassword       // camelCase
      }),
    });
  }

  // DELETE /dashboard/account
  async deleteAccount() {
    return this.request('/dashboard/account', { method: 'DELETE' });
  }

  // ============ Billing ============
  
  // POST /billing/create-checkout
  async createCheckout(plan, billingCycle) {
    return this.request('/billing/create-checkout', {
      method: 'POST',
      body: JSON.stringify({ 
        plan,           // 'starter' | 'professional'
        billingCycle    // 'monthly' | 'yearly' (camelCase!)
      }),
    });
  }

  // GET /billing/checkout/status/:sessionId
  async getCheckoutStatus(sessionId) {
    return this.request(`/billing/checkout/status/${sessionId}`);
  }

  // POST /billing/mock-checkout - Process mock payment in test mode
  async processMockCheckout(plan, billingCycle) {
    return this.request('/billing/mock-checkout', {
      method: 'POST',
      body: JSON.stringify({ plan, billingCycle }),
    });
  }

  // GET /billing/subscription
  async getSubscription() {
    return this.request('/billing/subscription');
  }

  // POST /billing/cancel
  async cancelSubscription(reason = '', feedback = '') {
    return this.request('/billing/cancel', { 
      method: 'POST',
      body: JSON.stringify({ reason, feedback }),
    });
  }

  // POST /billing/resume
  async resumeSubscription() {
    return this.request('/billing/resume', { method: 'POST' });
  }

  // POST /billing/portal
  async getBillingPortal() {
    return this.request('/billing/portal', { method: 'POST' });
  }

  // GET /billing/invoices
  async getInvoices() {
    return this.request('/billing/invoices');
  }

  // ============ Admin ============
  
  // POST /admin/login
  async adminLogin(email, password) {
    return this.request('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async adminRequest(endpoint, options = {}) {
    const adminToken = this.getAdminToken();
    return this.request(endpoint, {
      ...options,
      headers: {
        ...options.headers,
        'X-Admin-Token': adminToken,
      },
    });
  }

  // GET /admin/stats
  async getAdminStats() {
    return this.adminRequest('/admin/stats');
  }

  // GET /admin/users
  async getAdminUsers(page = 1, limit = 50, filters = {}) {
    const params = new URLSearchParams({ page, limit, ...filters });
    return this.adminRequest(`/admin/users?${params}`);
  }

  // GET /admin/users/:id
  async getAdminUser(userId) {
    return this.adminRequest(`/admin/users/${userId}`);
  }

  // POST /admin/users
  async createAdminUser(data) {
    return this.adminRequest('/admin/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT /admin/users/:id
  async updateAdminUser(userId, data) {
    return this.adminRequest(`/admin/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // GET /admin/subscriptions - Note: Backend might not have this, using /admin/stats
  async getAdminSubscriptions() {
    return this.adminRequest('/admin/stats');
  }

  // GET /admin/sites
  async getAdminSites(page = 1, limit = 50) {
    return this.adminRequest(`/admin/sites?page=${page}&limit=${limit}`);
  }

  // GET /admin/revenue
  async getAdminRevenue(period = '30d') {
    return this.adminRequest(`/admin/revenue?period=${period}`);
  }

  // ============ Notifications (Public) ============
  
  // GET /notifications/random
  async getRecentNotification() {
    try {
      const response = await fetch(`${this.baseUrl}/notifications/random`);
      return response.json();
    } catch {
      return { success: false };
    }
  }

  // GET /notifications/recent
  async getRecentPurchases(limit = 10) {
    try {
      const response = await fetch(`${this.baseUrl}/notifications/recent?limit=${limit}`);
      return response.json();
    } catch {
      return { success: false, purchases: [] };
    }
  }
}

export const api = new ApiService();
export default api;
