import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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

  const clearAuth = useCallback(() => {
    localStorage.removeItem('wooasm_access_token');
    localStorage.removeItem('wooasm_refresh_token');
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  // Fetch current user data
  const fetchUser = useCallback(async () => {
    try {
      const response = await api.getCurrentUser();
      // Backend returns: { success: true, data: { id, email, name, ... } }
      const userData = response.data || response;
      if (userData && userData.id) {
        setUser(userData);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      return false;
    }
  }, []);

  // Check for stored token on mount
  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem('wooasm_access_token');
      const refreshToken = localStorage.getItem('wooasm_refresh_token');
      
      if (!accessToken) {
        // No token stored - user is not logged in
        setLoading(false);
        return;
      }

      // Try to fetch user with current token
      const success = await fetchUser();
      
      if (!success && refreshToken) {
        // Token might be expired, try to refresh
        try {
          const refreshed = await api.refreshToken();
          if (refreshed) {
            // Token refreshed, try fetching user again
            await fetchUser();
          } else {
            // Refresh failed - clear auth
            clearAuth();
          }
        } catch (error) {
          console.error('Token refresh failed:', error);
          clearAuth();
        }
      } else if (!success && !refreshToken) {
        // No refresh token and access token didn't work
        clearAuth();
      }
      
      setLoading(false);
    };

    checkAuth();
  }, [fetchUser, clearAuth]);

  const login = async (email, password) => {
    try {
      const response = await api.login(email, password);
      console.log('Login response:', response); // Debug log
      
      // Backend returns tokens at root level OR nested in data
      // Format 1: { success: true, accessToken, refreshToken, user }
      // Format 2: { success: true, data: { accessToken, refreshToken, user } }
      const accessToken = response.accessToken || response.data?.accessToken;
      const refreshToken = response.refreshToken || response.data?.refreshToken;
      const userData = response.user || response.data?.user;
      
      if (response.success && accessToken) {
        localStorage.setItem('wooasm_access_token', accessToken);
        if (refreshToken) {
          localStorage.setItem('wooasm_refresh_token', refreshToken);
        }
        if (userData) {
          setUser(userData);
        }
        setIsAuthenticated(true);
        return { success: true };
      }
      
      if (response.success && !accessToken) {
        // Backend returned success but no token
        return { success: false, error: 'Login succeeded but no token received.' };
      }
      
      return { success: false, error: response.message || 'Login failed' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Connection error. Please try again.' };
    }
  };

  const register = async (name, email, password, companyName = '') => {
    try {
      const response = await api.register(name, email, password, companyName);
      console.log('Register response:', response); // Debug log
      
      // Handle multiple possible response formats from backend:
      // Format 1: { success: true, data: { accessToken, refreshToken, user } }
      // Format 2: { success: true, accessToken, refreshToken, user }
      const accessToken = response.data?.accessToken || response.accessToken;
      const refreshToken = response.data?.refreshToken || response.refreshToken;
      const userData = response.data?.user || response.user;
      
      if (response.success) {
        // Auto-login after registration if tokens provided
        if (accessToken) {
          localStorage.setItem('wooasm_access_token', accessToken);
          if (refreshToken) {
            localStorage.setItem('wooasm_refresh_token', refreshToken);
          }
          if (userData) {
            setUser(userData);
          }
          setIsAuthenticated(true);
        }
        return { 
          success: true, 
          user: userData,
          message: response.message 
        };
      }
      
      return { success: false, error: response.message || 'Registration failed' };
    } catch (error) {
      console.error('Registration error:', error);
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

  const refreshUser = useCallback(async () => {
    return fetchUser();
  }, [fetchUser]);

  const forgotPassword = async (email) => {
    try {
      const response = await api.forgotPassword(email);
      // Backend always returns success to prevent email enumeration
      return { success: response.success !== false };
    } catch (error) {
      console.error('Forgot password error:', error);
      return { success: false, error: 'Connection error. Please try again.' };
    }
  };

  const resetPassword = async (token, password) => {
    try {
      const response = await api.resetPassword(token, password);
      if (response.success) {
        return { success: true };
      }
      return { success: false, error: response.message || 'Reset failed' };
    } catch (error) {
      console.error('Reset password error:', error);
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
      console.error('Verify email error:', error);
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
