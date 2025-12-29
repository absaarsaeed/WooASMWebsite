import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, TrendingUp, CreditCard, AlertTriangle } from 'lucide-react';
import SEO from '../../components/SEO';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const AdminSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const token = localStorage.getItem('wooasm_admin_token');
      const response = await fetch(`${API_URL}/api/admin/subscriptions`, {
        headers: { 'X-Admin-Token': token }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSubscriptions(data);
      }
    } catch (error) {
      console.error('Failed to fetch subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <SEO title="Subscriptions - Admin Dashboard" />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Subscriptions</h1>
        <p className="text-gray-400">Monitor subscription metrics and revenue</p>
      </motion.div>

      {/* Revenue Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-2xl p-6 border border-gray-700"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-900/30 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">${subscriptions?.revenue?.mrr || 0}</p>
          <p className="text-sm text-gray-400">Monthly Recurring Revenue</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-2xl p-6 border border-gray-700"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-900/30 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">${subscriptions?.revenue?.arr || 0}</p>
          <p className="text-sm text-gray-400">Annual Recurring Revenue</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-2xl p-6 border border-gray-700"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-900/30 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{subscriptions?.active?.total || 0}</p>
          <p className="text-sm text-gray-400">Active Subscriptions</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800 rounded-2xl p-6 border border-gray-700"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-900/30 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{subscriptions?.cancelled || 0}</p>
          <p className="text-sm text-gray-400">Cancelled</p>
        </motion.div>
      </div>

      {/* Subscription Breakdown */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-lg font-semibold text-white mb-6">Active by Plan</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-900/30 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Starter</p>
                  <p className="text-sm text-gray-500">$29/month</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">{subscriptions?.active?.starter || 0}</p>
                <p className="text-sm text-gray-500">subscribers</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-900/30 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Professional</p>
                  <p className="text-sm text-gray-500">$79/month</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">{subscriptions?.active?.professional || 0}</p>
                <p className="text-sm text-gray-500">subscribers</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-lg font-semibold text-white mb-6">Subscription Health</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Active</span>
                <span className="text-emerald-400">{subscriptions?.active?.total || 0}</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Cancelled</span>
                <span className="text-amber-400">{subscriptions?.cancelled || 0}</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ 
                    width: `${subscriptions?.active?.total ? 
                      (subscriptions?.cancelled / (subscriptions?.active?.total + subscriptions?.cancelled)) * 100 : 0}%` 
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Past Due</span>
                <span className="text-red-400">{subscriptions?.past_due || 0}</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full"
                  style={{ 
                    width: `${subscriptions?.active?.total ? 
                      (subscriptions?.past_due / (subscriptions?.active?.total + subscriptions?.past_due)) * 100 : 0}%` 
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminSubscriptions;
