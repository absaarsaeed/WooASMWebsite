import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Download } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import SEO from '../../components/SEO';

const UsagePage = () => {
  const { user } = useAuth();
  const [usageData, setUsageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsage();
  }, []);

  const fetchUsage = async () => {
    try {
      const response = await api.getUsage();
      // Backend may return: { success: true, data: { ... } } or direct data
      if (response.success && response.data) {
        setUsageData(response.data);
      } else if (response.success === false) {
        setError(response.message || 'Failed to load usage data');
      } else {
        // Direct data format
        setUsageData(response);
      }
    } catch (error) {
      console.error('Failed to fetch usage:', error);
      setError('Failed to load usage data');
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

  // Handle multiple response formats from backend
  const currentUsage = usageData?.usage?.current || usageData?.usage || usageData?.current || {};
  const limits = usageData?.usage?.limits || usageData?.limits || {};
  const percentages = usageData?.usage?.percentages || usageData?.percentages || {};
  const history = usageData?.history || [];

  const usageItems = [
    { label: 'AI Assistant Actions', key: 'assistantActions', altKey: 'assistant_actions', color: 'purple' },
    { label: 'Chatbot Messages', key: 'chatbotMessages', altKey: 'chatbot_messages', color: 'emerald' },
    { label: 'Content Generations', key: 'contentGenerations', altKey: 'content_generations', color: 'blue' },
    { label: 'Insights Refreshes', key: 'insightsRefreshes', altKey: 'insights_refreshes', color: 'amber' }
  ];

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
              {usageData?.currentMonth || new Date().toISOString().slice(0, 7)}
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {usageItems.map((item, index) => {
            const used = currentUsage[item.key] || 0;
            const limit = limits[item.key] || 0;
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
                    className={`h-full rounded-full transition-all`}
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

        {/* Weighted Total */}
        {usageData?.usage?.weightedTotal !== undefined && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Weighted Total Usage</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Combined weighted score of all features</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {(usageData.usage.weightedTotal || 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  / {(limits.weightedCap || 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
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
                      {(record.assistantActions || 0).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-right text-gray-600 dark:text-gray-400">
                      {(record.chatbotMessages || 0).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-right text-gray-600 dark:text-gray-400">
                      {(record.contentGenerations || 0).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-right text-gray-600 dark:text-gray-400">
                      {(record.insightsRefreshes || 0).toLocaleString()}
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
