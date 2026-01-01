import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Download, ArrowRight, Copy, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import SEO from '../../components/SEO';

const CheckoutSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { user, refreshUser, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [checkoutData, setCheckoutData] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      if (sessionId && isAuthenticated) {
        try {
          const response = await api.getCheckoutStatus(sessionId);
          // Backend returns: { success: true, data: { status, plan, licenseKey, ... } }
          if (response.success && response.data) {
            setCheckoutData(response.data);
          }
          // Refresh user to get updated plan and license key
          await refreshUser();
        } catch (error) {
          console.error('Failed to check status:', error);
        }
      }
      setLoading(false);
    };

    checkStatus();
  }, [sessionId, isAuthenticated, refreshUser]);

  const handleCopyLicense = () => {
    const licenseKey = checkoutData?.licenseKey || user?.licenseKey;
    if (licenseKey) {
      navigator.clipboard.writeText(licenseKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <SEO title="Processing Order... - WooASM" />
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Processing your order...</p>
        </div>
      </div>
    );
  }

  const licenseKey = checkoutData?.licenseKey || user?.licenseKey;
  const plan = checkoutData?.plan || user?.plan;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-8">
      <SEO 
        title="Thank You for Your Purchase - WooASM"
        description="Your WooASM subscription is now active. Get your license key and start managing your WooCommerce store with AI."
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg w-full"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Thank You!
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Your <span className="font-semibold capitalize">{plan}</span> subscription is now active.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You're all set to start managing your store with AI!
          </p>

          {licenseKey && (
            <div className="bg-gray-900 dark:bg-gray-700 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-400 mb-2">Your License Key</p>
              <div className="flex items-center justify-between gap-2">
                <code className="font-mono text-lg text-emerald-400 break-all">
                  {licenseKey}
                </code>
                <button
                  onClick={handleCopyLicense}
                  className="flex-shrink-0 p-2 text-gray-400 hover:text-white transition-colors"
                  title="Copy license key"
                >
                  {copied ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          )}

          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 mb-6 text-left">
            <h3 className="font-semibold text-purple-900 dark:text-purple-200 mb-3">Next Steps:</h3>
            <ol className="space-y-2 text-sm text-purple-700 dark:text-purple-300">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-200 dark:bg-purple-800 flex items-center justify-center text-xs font-medium flex-shrink-0">1</span>
                <span>Download the WooASM plugin from your dashboard</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-200 dark:bg-purple-800 flex items-center justify-center text-xs font-medium flex-shrink-0">2</span>
                <span>Install it on your WordPress site (Plugins → Add New → Upload)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-200 dark:bg-purple-800 flex items-center justify-center text-xs font-medium flex-shrink-0">3</span>
                <span>Enter your license key in WooASM settings to activate</span>
              </li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/dashboard"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/dashboard/license"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-xl transition-colors"
            >
              <Download className="w-5 h-5" />
              Get Plugin
            </Link>
          </div>
        </div>

        {/* Support Note */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          A confirmation email has been sent to your email address.<br />
          Need help? <Link to="/docs" className="text-purple-600 dark:text-purple-400 hover:underline">Check our documentation</Link> or{' '}
          <Link to="/contact" className="text-purple-600 dark:text-purple-400 hover:underline">contact support</Link>.
        </p>
      </motion.div>
    </div>
  );
};

export default CheckoutSuccessPage;
