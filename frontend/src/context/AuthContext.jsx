import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const clearAuth = () => {
    localStorage.removeItem('wooasm_access_token');
    localStorage.removeItem('wooasm_refresh_token');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Check for stored token on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('wooasm_access_token');
      if (token) {
        try {
          const response = await api.getCurrentUser();
          // Backend returns user object directly or in data property
          const userData = response.data || response;
          if (userData && userData.id) {
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            clearAuth();
          }
        } catch (error) {
          clearAuth();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.login(email, password);
      
      // Backend response format:
      // { success: true, data: { accessToken, refreshToken, tokenType, expiresIn, user } }
      if (response.success && response.data) {
        localStorage.setItem('wooasm_access_token', response.data.accessToken);
        localStorage.setItem('wooasm_refresh_token', response.data.refreshToken);
        setUser(response.data.user);
        setIsAuthenticated(true);
        return { success: true };
      }
      
      return { success: false, error: response.message || 'Login failed' };
    } catch (error) {
      return { success: false, error: 'Connection error. Please try again.' };
    }
  };

  const register = async (name, email, password, companyName = '') => {
    try {
      const response = await api.register(name, email, password, companyName);
      
      // Backend response format:
      // { success: true, message, data: { accessToken, refreshToken, user: { id, email, name, plan, ... } } }
      // NOTE: User does NOT have a license key yet - they need to purchase a subscription first
      if (response.success && response.data) {
        // Auto-login after registration if tokens provided
        if (response.data.accessToken) {
          localStorage.setItem('wooasm_access_token', response.data.accessToken);
          localStorage.setItem('wooasm_refresh_token', response.data.refreshToken);
          setUser(response.data.user);
          setIsAuthenticated(true);
        }
        return { 
          success: true, 
          user: response.data.user,
          message: response.message 
        };
      }
      
      return { success: false, error: response.message || 'Registration failed' };
    } catch (error) {
      return { success: false, error: 'Connection error. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch {
      // Ignore errors, clear local state anyway
    }
    clearAuth();
  };

  const refreshUser = async () => {
    try {
      const response = await api.getCurrentUser();
      const userData = response.data || response;
      if (userData && userData.id) {
        setUser(userData);
        return true;
      }
    } catch {
      // Ignore
    }
    return false;
  };

  const forgotPassword = async (email) => {
    try {
      const response = await api.forgotPassword(email);
      // Backend always returns success to prevent email enumeration
      return { success: response.success || true };
    } catch (error) {
      return { success: false, error: 'Connection error. Please try again.' };
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      const response = await api.resetPassword(token, newPassword);
      if (response.success) {
        return { success: true };
      }
      return { success: false, error: response.message || 'Reset failed' };
    } catch (error) {
      return { success: false, error: 'Connection error. Please try again.' };
    }
  };

  const verifyEmail = async (token) => {
    try {
      const response = await api.verifyEmail(token);
      if (response.success) {
        // Refresh user data after verification
        await refreshUser();
        return { success: true };
      }
      return { success: false, error: response.message || 'Verification failed' };
    } catch (error) {
      return { success: false, error: 'Connection error. Please try again.' };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshUser,
    forgotPassword,
    resetPassword,
    verifyEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
