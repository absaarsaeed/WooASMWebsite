import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Key, Globe, BarChart3, TrendingUp, ArrowRight,
  CheckCircle, AlertCircle, Clock, Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/SEO';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const DashboardOverview = () => {
  const { user, getToken } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/dashboard`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const usage = dashboardData?.usage || {};
  const limits = dashboardData?.limits || {};
  const subscription = dashboardData?.subscription || {};

  return (
    <div className="p-8">
      <SEO title="Dashboard - WooASM" />
      
      {/* Header */}
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
        >
          {getGreeting()}, {user?.name?.split(' ')[0]}!
        </motion.h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's an overview of your WooASM account
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Key className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            {subscription.status === 'active' ? (
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-500" />
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Current Plan</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
            {user?.plan}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <Globe className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Active Sites</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {dashboardData?.sites_count || 0} / {limits.max_sites || 1}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Usage This Month</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {usage.percentage_used || 0}%
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Billing Cycle</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
            {subscription.billing_cycle || 'N/A'}
          </p>
        </motion.div>
      </div>

      {/* License Key Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your License Key</h2>
          <Link
            to="/dashboard/license"
            className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline flex items-center gap-1"
          >
            Manage
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="bg-gray-900 dark:bg-gray-700 rounded-xl p-4 font-mono text-lg text-emerald-400 flex items-center justify-between">
          <span>{user?.license_key}</span>
          <button
            onClick={() => navigator.clipboard.writeText(user?.license_key)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Copy
          </button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
          Use this key to activate WooASM on your WordPress site.
        </p>
      </motion.div>

      {/* Usage Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Usage Breakdown</h2>
          <Link
            to="/dashboard/usage"
            className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline flex items-center gap-1"
          >
            View Details
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'AI Assistant', used: usage.assistant_actions || 0, limit: limits.assistant_monthly || 0, color: 'purple' },
            { label: 'Chatbot Messages', used: usage.chatbot_messages || 0, limit: limits.chatbot_monthly || 0, color: 'emerald' },
            { label: 'Content Generated', used: usage.content_generations || 0, limit: limits.content_monthly || 0, color: 'blue' },
            { label: 'Insights Refreshes', used: usage.insights_refreshes || 0, limit: limits.insights_monthly || 0, color: 'amber' }
          ].map((item, index) => {
            const percentage = item.limit > 0 ? Math.min(100, (item.used / item.limit) * 100) : 0;
            return (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.label}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {item.used} / {item.limit}
                </p>
                <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-${item.color}-500 rounded-full transition-all`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Quick Actions */}
      {user?.plan === 'free' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Upgrade to unlock more features</h3>
              <p className="text-purple-100">
                Get access to AI chatbot, content studio, competitor tracking, and more!
              </p>
            </div>
            <Link
              to="/pricing"
              className="flex-shrink-0 bg-white text-purple-600 font-semibold px-6 py-3 rounded-xl hover:bg-purple-50 transition-colors flex items-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Upgrade Now
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DashboardOverview;
