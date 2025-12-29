import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Download } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/SEO';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const UsagePage = () => {
  const { getToken, user } = useAuth();
  const [usageData, setUsageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsage();
  }, []);

  const fetchUsage = async () => {
    try {
      const response = await fetch(`${API_URL}/api/dashboard/usage`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUsageData(data);
      }
    } catch (error) {
      console.error('Failed to fetch usage:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const currentMonth = usageData?.current_month || {};
  const history = usageData?.history || [];

  const usageItems = [
    { label: 'AI Assistant Actions', key: 'assistant_actions', color: 'purple', limit: 50 },
    { label: 'Chatbot Messages', key: 'chatbot_messages', color: 'emerald', limit: 100 },
    { label: 'Content Generations', key: 'content_generations', color: 'blue', limit: 10 },
    { label: 'Insights Refreshes', key: 'insights_refreshes', color: 'amber', limit: 5 }
  ];

  // Adjust limits based on plan
  const planLimits = {
    free: { assistant_actions: 50, chatbot_messages: 100, content_generations: 10, insights_refreshes: 5 },
    starter: { assistant_actions: 500, chatbot_messages: 1000, content_generations: 100, insights_refreshes: 50 },
    professional: { assistant_actions: 2000, chatbot_messages: 5000, content_generations: 500, insights_refreshes: 200 }
  };

  const limits = planLimits[user?.plan] || planLimits.free;

  return (
    <div className="p-8 max-w-4xl">
      <SEO title="Usage - WooASM Dashboard" />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Usage</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Monitor your monthly usage across all features
        </p>
      </motion.div>

      {/* Current Month Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 mb-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Current Month</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {currentMonth.month || new Date().toISOString().slice(0, 7)}
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {usageItems.map((item, index) => {
            const used = currentMonth[item.key] || 0;
            const limit = limits[item.key] || item.limit;
            const percentage = limit > 0 ? Math.min(100, (used / limit) * 100) : 0;
            
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {item.label}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {percentage.toFixed(0)}%
                  </span>
                </div>
                <div className="mb-2">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {used.toLocaleString()}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">
                    / {limit.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all bg-${item.color}-500`}
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: item.color === 'purple' ? '#8B5CF6' : 
                                       item.color === 'emerald' ? '#10B981' :
                                       item.color === 'blue' ? '#3B82F6' : '#F59E0B'
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Usage History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Usage History</h2>
        
        {history.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No usage history available yet
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Month</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Assistant</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Chatbot</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Content</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Insights</th>
                </tr>
              </thead>
              <tbody>
                {history.map((record, index) => (
                  <tr key={record.month || index} className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">
                      {record.month}
                    </td>
                    <td className="py-3 px-4 text-sm text-right text-gray-600 dark:text-gray-400">
                      {(record.assistant_actions || 0).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-right text-gray-600 dark:text-gray-400">
                      {(record.chatbot_messages || 0).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-right text-gray-600 dark:text-gray-400">
                      {(record.content_generations || 0).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-right text-gray-600 dark:text-gray-400">
                      {(record.insights_refreshes || 0).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default UsagePage;
