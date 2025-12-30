import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X } from 'lucide-react';
import api from '../services/api';

const TrustNotifications = () => {
  const [notification, setNotification] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initial delay before showing first notification
    const initialDelay = setTimeout(() => {
      fetchNotification();
    }, 10000);

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (!notification) return;

    // Show notification
    setIsVisible(true);

    // Hide after 5 seconds
    const hideTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    // Fetch next notification after 30 seconds
    const nextTimeout = setTimeout(() => {
      fetchNotification();
    }, 30000);

    return () => {
      clearTimeout(hideTimeout);
      clearTimeout(nextTimeout);
    };
  }, [notification]);

  const fetchNotification = async () => {
    try {
      const response = await api.getRecentNotification();
      if (response.success && response.data?.notification) {
        setNotification(response.data.notification);
      }
    } catch (error) {
      // Silently fail - this is non-critical
      console.log('Trust notification fetch failed');
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const formatTimeAgo = (seconds) => {
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  const getPlanLabel = (plan) => {
    if (plan === 'professional') return 'Professional';
    if (plan === 'starter') return 'Starter';
    return 'Free';
  };

  return (
    <AnimatePresence>
      {isVisible && notification && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-6 z-50 max-w-sm"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                <ShoppingCart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {notification.display_name} purchased
                </p>
                <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold">
                  {getPlanLabel(notification.plan)} Plan
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {formatTimeAgo(notification.seconds_ago || 300)}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TrustNotifications;
