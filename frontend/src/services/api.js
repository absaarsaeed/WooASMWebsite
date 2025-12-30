// WooASM API Service
// Centralized API calls to api.wooasm.com

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
      const data = await response.json();

      // Handle token refresh if needed
      if (response.status === 401 && data.error === 'token_expired') {
        const refreshed = await this.refreshToken();
        if (refreshed) {
          // Retry the request with new token
          config.headers['Authorization'] = `Bearer ${this.getToken()}`;
          const retryResponse = await fetch(url, config);
          return retryResponse.json();
        }
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async refreshToken() {
    const refreshToken = localStorage.getItem('wooasm_refresh_token');
    if (!refreshToken) return false;

    try {
      const response = await fetch(`${this.baseUrl}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('wooasm_access_token', data.data.access_token);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  // ============ Auth ============
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(name, email, password, companyName = '') {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, company_name: companyName }),
    });
  }

  async verifyEmail(token) {
    return this.request('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  }

  async forgotPassword(email) {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(token, newPassword) {
    return this.request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, new_password: newPassword }),
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  async logout() {
    return this.request('/auth/logout', { method: 'POST' });
  }

  // ============ Dashboard ============
  async getDashboard() {
    return this.request('/dashboard');
  }

  async getLicense() {
    return this.request('/dashboard/license');
  }

  async regenerateLicense() {
    return this.request('/dashboard/regenerate-license', { method: 'POST' });
  }

  async getUsage(months = 6) {
    return this.request(`/dashboard/usage?months=${months}`);
  }

  async getSites() {
    return this.request('/dashboard/sites');
  }

  async deactivateSite(siteId) {
    return this.request(`/dashboard/sites/${siteId}`, { method: 'DELETE' });
  }

  async updateSettings(data) {
    return this.request('/dashboard/settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async changePassword(currentPassword, newPassword) {
    return this.request('/dashboard/change-password', {
      method: 'POST',
      body: JSON.stringify({ 
        current_password: currentPassword, 
        new_password: newPassword 
      }),
    });
  }

  async deleteAccount(password) {
    return this.request('/dashboard/account', {
      method: 'DELETE',
      body: JSON.stringify({ password, confirm: true }),
    });
  }

  // ============ Billing ============
  async createCheckout(plan, billingCycle) {
    return this.request('/billing/create-checkout', {
      method: 'POST',
      body: JSON.stringify({ plan, billing_cycle: billingCycle }),
    });
  }

  async getCheckoutStatus(sessionId) {
    return this.request(`/billing/checkout/status/${sessionId}`);
  }

  async getSubscription() {
    return this.request('/billing/subscription');
  }

  async cancelSubscription(reason = '', feedback = '') {
    return this.request('/billing/cancel', {
      method: 'POST',
      body: JSON.stringify({ reason, feedback }),
    });
  }

  async resumeSubscription() {
    return this.request('/billing/resume', { method: 'POST' });
  }

  async getBillingPortal() {
    return this.request('/billing/portal', { method: 'POST' });
  }

  async getInvoices(limit = 10) {
    return this.request(`/billing/invoices?limit=${limit}`);
  }

  // ============ Admin ============
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

  async getAdminStats() {
    return this.adminRequest('/admin/stats');
  }

  async getAdminUsers(page = 1, limit = 20, filters = {}) {
    const params = new URLSearchParams({ page, limit, ...filters });
    return this.adminRequest(`/admin/users?${params}`);
  }

  async getAdminUser(userId) {
    return this.adminRequest(`/admin/users/${userId}`);
  }

  async createAdminUser(data) {
    return this.adminRequest('/admin/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateAdminUser(userId, data) {
    return this.adminRequest(`/admin/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getAdminSubscriptions() {
    return this.adminRequest('/admin/subscriptions');
  }

  async getAdminSites(page = 1, limit = 50) {
    return this.adminRequest(`/admin/sites?page=${page}&limit=${limit}`);
  }

  async getAdminPurchases(limit = 20) {
    return this.adminRequest(`/admin/purchases?limit=${limit}`);
  }

  // ============ Notifications (Public) ============
  async getRecentNotification() {
    try {
      const response = await fetch(`${this.baseUrl}/notifications/recent`);
      return response.json();
    } catch {
      return { success: false };
    }
  }
}

export const api = new ApiService();
export default api;
