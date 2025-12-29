import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, DollarSign, Globe, BarChart3, TrendingUp, Calendar
} from 'lucide-react';
import SEO from '../../components/SEO';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('wooasm_admin_token');
      const response = await fetch(`${API_URL}/api/admin/stats`, {
        headers: { 'X-Admin-Token': token }
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
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

  const statCards = [
    {
      label: 'Total Users',
      value: stats?.overview?.total_users || 0,
      change: `+${stats?.overview?.users_today || 0} today`,
      icon: Users,
      color: 'purple'
    },
    {
      label: 'MRR',
      value: `$${stats?.revenue?.mrr?.toLocaleString() || 0}`,
      change: `ARR: $${stats?.revenue?.arr?.toLocaleString() || 0}`,
      icon: DollarSign,
      color: 'emerald'
    },
    {
      label: 'Active Sites',
      value: stats?.sites?.total_activated || 0,
      change: `${stats?.sites?.active_last_7_days || 0} active this week`,
      icon: Globe,
      color: 'blue'
    },
    {
      label: 'AI Queries',
      value: stats?.usage?.total_ai_queries_this_month?.toLocaleString() || 0,
      change: 'This month',
      icon: BarChart3,
      color: 'amber'
    }
  ];

  const colorClasses = {
    purple: 'bg-purple-900/30 text-purple-400',
    emerald: 'bg-emerald-900/30 text-emerald-400',
    blue: 'bg-blue-900/30 text-blue-400',
    amber: 'bg-amber-900/30 text-amber-400'
  };

  return (
    <div className="p-8">
      <SEO title="Admin Dashboard - WooASM" />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Overview of your WooASM platform</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800 rounded-2xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[stat.color]}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
            <p className="text-xs text-gray-500 mt-2">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Plan Distribution & Usage */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-lg font-semibold text-white mb-6">Plan Distribution</h2>
          <div className="space-y-4">
            {[
              { label: 'Free', count: stats?.plans?.free || 0, color: 'bg-gray-500' },
              { label: 'Starter', count: stats?.plans?.starter || 0, color: 'bg-purple-500' },
              { label: 'Professional', count: stats?.plans?.professional || 0, color: 'bg-amber-500' }
            ].map((plan) => {
              const total = (stats?.plans?.free || 0) + (stats?.plans?.starter || 0) + (stats?.plans?.professional || 0);
              const percentage = total > 0 ? (plan.count / total) * 100 : 0;
              
              return (
                <div key={plan.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">{plan.label}</span>
                    <span className="text-gray-400">{plan.count} users</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${plan.color} rounded-full transition-all`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-lg font-semibold text-white mb-6">Usage This Month</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Assistant Actions', value: stats?.usage?.assistant_actions || 0, icon: TrendingUp },
              { label: 'Chatbot Messages', value: stats?.usage?.chatbot_messages || 0, icon: BarChart3 },
              { label: 'Content Generated', value: stats?.usage?.content_generations || 0, icon: Calendar },
              { label: 'Insights Refreshes', value: stats?.usage?.insights_refreshes || 0, icon: Globe }
            ].map((item) => (
              <div key={item.label} className="bg-gray-700 rounded-xl p-4">
                <item.icon className="w-5 h-5 text-gray-400 mb-2" />
                <p className="text-2xl font-bold text-white">{item.value.toLocaleString()}</p>
                <p className="text-xs text-gray-400">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gray-800 rounded-2xl p-6 border border-gray-700"
      >
        <h2 className="text-lg font-semibold text-white mb-6">Growth Metrics</h2>
        <div className="grid sm:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-400">{stats?.overview?.users_today || 0}</p>
            <p className="text-sm text-gray-400">New Today</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-400">{stats?.overview?.users_this_week || 0}</p>
            <p className="text-sm text-gray-400">This Week</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-400">{stats?.overview?.users_this_month || 0}</p>
            <p className="text-sm text-gray-400">This Month</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-amber-400">${stats?.revenue?.mrr || 0}</p>
            <p className="text-sm text-gray-400">Monthly Revenue</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
