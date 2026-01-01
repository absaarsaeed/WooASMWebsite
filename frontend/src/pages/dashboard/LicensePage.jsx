import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Key, Copy, RefreshCw, AlertTriangle, Check, Download, ExternalLink, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import SEO from '../../components/SEO';

const LicensePage = () => {
  const { user, refreshUser } = useAuth();
  const [licenseData, setLicenseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchLicenseData();
  }, []);

  const fetchLicenseData = async () => {
    try {
      const response = await api.getLicense();
      // Backend returns: { success: true, data: { hasLicense, licenseKey, status, plan, maxSites, sitesUsed, ... } }
      if (response.success && response.data) {
        setLicenseData(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch license:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const key = licenseData?.licenseKey || user?.licenseKey;
    if (key) {
      navigator.clipboard.writeText(key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRegenerate = async () => {
    setRegenerating(true);
    setMessage({ type: '', text: '' });
    try {
      const response = await api.regenerateLicense();
      if (response.success) {
        await fetchLicenseData();
        await refreshUser();
        setMessage({ 
          type: 'success', 
          text: 'License key regenerated successfully! Your old key is now invalid. All sites using the old key will need to be reactivated with your new key.' 
        });
      } else {
        setMessage({ 
          type: 'error', 
          text: response.message || 'Failed to regenerate license key. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Failed to regenerate:', error);
      setMessage({ 
        type: 'error', 
        text: 'Failed to regenerate license key. Please try again.' 
      });
    } finally {
      setRegenerating(false);
      setShowConfirm(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // Backend returns hasLicense flag, or check licenseKey directly
  const hasLicense = licenseData?.hasLicense || !!licenseData?.licenseKey || !!user?.licenseKey;
  const licenseKey = licenseData?.licenseKey || user?.licenseKey;
  
  // Get sites data from license response or user
  const sitesUsed = licenseData?.sitesUsed ?? user?.sitesUsed ?? 0;
  const maxSites = licenseData?.maxSites ?? user?.maxSites ?? 1;

  // If user doesn't have a license, show subscribe prompt
  if (!hasLicense) {
    return (
      <div className="p-8 max-w-4xl">
        <SEO title="License Key - WooASM Dashboard" />
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">License Key</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Get your license key to activate WooASM on your WordPress site
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-8 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
            <Key className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">No License Key Yet</h2>
          <p className="text-purple-100 mb-6 max-w-md mx-auto">
            Subscribe to a plan to get your license key. Once subscribed, you'll be able to activate WooASM on your WordPress store.
          </p>
          <Link
            to="/dashboard/billing"
            className="inline-flex items-center gap-2 bg-white text-purple-600 font-semibold px-8 py-3 rounded-xl hover:bg-purple-50 transition-colors"
          >
            Choose a Plan
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl">
      <SEO title="License Key - WooASM Dashboard" />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">License Key</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your license key and plugin activation
        </p>
      </motion.div>

      {/* License Key Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 mb-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <Key className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white">Your License Key</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Use this to activate WooASM</p>
          </div>
        </div>

        <div className="bg-gray-900 dark:bg-gray-700 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <code className="text-lg sm:text-xl font-mono text-emerald-400">
              {licenseKey}
            </code>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 rounded-lg text-white transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Plan:</span>
            <span className="font-medium text-gray-900 dark:text-white capitalize">
              {licenseData?.plan || user?.plan}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Status:</span>
            <span className={`font-medium capitalize ${
              (licenseData?.status || user?.subscriptionStatus) === 'active' ? 'text-emerald-600' : 'text-amber-600'
            }`}>
              {licenseData?.status || user?.subscriptionStatus || 'active'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Sites:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {sitesUsed} / {maxSites}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Regenerate Key */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 mb-6"
      >
        <h2 className="font-semibold text-gray-900 dark:text-white mb-2">Regenerate License Key</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Generate a new license key if you suspect your current key has been compromised.
        </p>

        {/* Success/Error Message */}
        {message.text && (
          <div className={`mb-4 p-4 rounded-xl ${
            message.type === 'success' 
              ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
          }`}>
            <div className="flex items-start gap-3">
              {message.type === 'success' ? (
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              )}
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        )}
        
        {showConfirm ? (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800 dark:text-amber-200 mb-2">
                  Are you sure you want to regenerate your license key?
                </p>
                <ul className="text-sm text-amber-700 dark:text-amber-300 mb-4 list-disc list-inside space-y-1">
                  <li>Your current key will be <strong>immediately invalidated</strong></li>
                  <li>All WordPress sites using this key will be <strong>deactivated</strong></li>
                  <li>You will need to enter the new key in each WordPress site</li>
                  <li>This action <strong>cannot be undone</strong></li>
                </ul>
                <div className="flex gap-3">
                  <button
                    onClick={handleRegenerate}
                    disabled={regenerating}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium disabled:opacity-50"
                  >
                    {regenerating ? 'Regenerating...' : 'Yes, Regenerate Key'}
                  </button>
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => { setShowConfirm(true); setMessage({ type: '', text: '' }); }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Regenerate Key
          </button>
        )}
      </motion.div>

      {/* Installation Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
      >
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Installation Guide</h2>
        
        <ol className="space-y-4">
          <li className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center font-semibold">1</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Download the plugin</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get the latest version of WooASM plugin</p>
              <button className="mt-2 flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium">
                <Download className="w-4 h-4" />
                Download Plugin
              </button>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center font-semibold">2</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Install in WordPress</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Go to Plugins &gt; Add New &gt; Upload Plugin in your WordPress admin
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center font-semibold">3</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Enter your license key</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Go to WooASM settings and paste your license key to activate
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-semibold">
              <Check className="w-4 h-4" />
            </span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Start using WooASM!</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You're all set. Start managing your store with AI!
              </p>
            </div>
          </li>
        </ol>

        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <a
            href="/docs"
            className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium hover:underline"
          >
            <ExternalLink className="w-4 h-4" />
            Read full documentation
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default LicensePage;
