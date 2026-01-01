import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, TrendingUp, CreditCard, AlertTriangle } from 'lucide-react';
import api from '../../services/api';
import SEO from '../../components/SEO';

const AdminSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      // Using admin stats endpoint which includes subscription data
      const response = await api.getAdminStats();
      // Backend returns: { success: true, data: { overview, plans, revenue, ... } }
      if (response.success && response.data) {
        setSubscriptions(response.data);
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

  // Calculate active subscriptions (starter + professional)
  const activeStarter = subscriptions?.plans?.starter || 0;
  const activeProfessional = subscriptions?.plans?.professional || 0;
  const activeTotal = activeStarter + activeProfessional;

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
          <p className="text-3xl font-bold text-white">{activeTotal}</p>
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
          <p className="text-3xl font-bold text-white">{subscriptions?.revenue?.today || 0}</p>
          <p className="text-sm text-gray-400">Revenue Today ($)</p>
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
                <p className="text-2xl font-bold text-white">{activeStarter}</p>
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
                <p className="text-2xl font-bold text-white">{activeProfessional}</p>
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
          <h2 className="text-lg font-semibold text-white mb-6">Revenue Breakdown</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Starter MRR</span>
                <span className="text-purple-400">${(activeStarter * 29).toLocaleString()}</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: activeTotal > 0 ? `${(activeStarter / activeTotal) * 100}%` : '0%' }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Professional MRR</span>
                <span className="text-amber-400">${(activeProfessional * 79).toLocaleString()}</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: activeTotal > 0 ? `${(activeProfessional / activeTotal) * 100}%` : '0%' }}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 font-medium">Total MRR</span>
                <span className="text-emerald-400 font-bold text-lg">
                  ${subscriptions?.revenue?.mrr || 0}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminSubscriptions;
