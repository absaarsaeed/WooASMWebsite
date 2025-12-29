import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('wooasm_user');
    const storedToken = localStorage.getItem('wooasm_token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      // Verify token is still valid
      verifyToken(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        localStorage.setItem('wooasm_user', JSON.stringify(data.user));
      } else {
        // Token invalid, clear storage
        logout();
      }
    } catch (err) {
      console.error('Token verification failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, name, companyName = null) => {
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, company_name: companyName })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Registration failed');
      }
      
      return { success: true, data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const login = async (email, password) => {
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Login failed');
      }
      
      // Store tokens and user
      localStorage.setItem('wooasm_token', data.access_token);
      localStorage.setItem('wooasm_refresh_token', data.refresh_token);
      localStorage.setItem('wooasm_user', JSON.stringify(data.user));
      
      setUser(data.user);
      
      return { success: true, data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('wooasm_token');
    localStorage.removeItem('wooasm_refresh_token');
    localStorage.removeItem('wooasm_user');
    setUser(null);
  };

  const forgotPassword = async (email) => {
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      return { success: true, data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const resetPassword = async (token, newPassword) => {
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, new_password: newPassword })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Reset failed');
      }
      
      return { success: true, data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const verifyEmail = async (token) => {
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/auth/verify-email?token=${token}`, {
        method: 'POST'
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Verification failed');
      }
      
      // Update user's verified status if logged in
      if (user) {
        const updatedUser = { ...user, email_verified: true };
        setUser(updatedUser);
        localStorage.setItem('wooasm_user', JSON.stringify(updatedUser));
      }
      
      return { success: true, data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const getToken = () => localStorage.getItem('wooasm_token');

  const refreshUser = async () => {
    const token = getToken();
    if (token) {
      await verifyToken(token);
    }
  };

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    verifyEmail,
    getToken,
    refreshUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
