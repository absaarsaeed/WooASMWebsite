import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Download, ArrowRight, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/SEO';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const CheckoutSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { user, getToken, refreshUser, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (sessionId && isAuthenticated) {
      checkStatus();
    } else {
      setLoading(false);
    }
  }, [sessionId, isAuthenticated]);

  const checkStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/api/billing/checkout/status/${sessionId}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setStatus(data);
        // Refresh user to get updated plan
        await refreshUser();
      }
    } catch (error) {
      console.error('Failed to check status:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Processing your order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-8">
      <SEO title="Thank You! - WooASM" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg w-full"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Thank You!
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your subscription is now active. You're all set to start managing your store with AI!
          </p>

          {user && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Your License Key</p>
              <p className="font-mono text-lg text-purple-600 dark:text-purple-400">
                {user.license_key}
              </p>
            </div>
          )}

          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 mb-6 text-left">
            <h3 className="font-semibold text-purple-900 dark:text-purple-200 mb-3">Next Steps:</h3>
            <ol className="space-y-2 text-sm text-purple-700 dark:text-purple-300">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-200 dark:bg-purple-800 flex items-center justify-center text-xs font-medium">1</span>
                Download the WooASM plugin
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-200 dark:bg-purple-800 flex items-center justify-center text-xs font-medium">2</span>
                Install it on your WordPress site
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-200 dark:bg-purple-800 flex items-center justify-center text-xs font-medium">3</span>
                Enter your license key to activate
              </li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/dashboard"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-xl">
              <Download className="w-5 h-5" />
              Download Plugin
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutSuccessPage;
