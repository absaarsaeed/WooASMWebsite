import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Trash2, AlertTriangle, Clock, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import SEO from '../../components/SEO';

const SitesPage = () => {
  const { user } = useAuth();
  const [sitesData, setSitesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const response = await api.getSites();
      // Backend returns: { success: true, data: { sitesAllowed, sitesUsed, sites: [...] } }
      if (response.success && response.data) {
        setSitesData(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch sites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = async (siteId) => {
    try {
      const response = await api.deactivateSite(siteId);
      if (response.success) {
        fetchSites();
      }
    } catch (error) {
      console.error('Failed to deactivate site:', error);
    } finally {
      setDeleteConfirm(null);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Never';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const sites = sitesData?.sites || [];
  const activeSites = sites.filter(s => s.isActive);

  return (
    <div className="p-8 max-w-4xl">
      <SEO title="Sites - WooASM Dashboard" />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Sites</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your activated WordPress sites
        </p>
      </motion.div>

      {/* Sites Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 mb-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Sites Used</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {sitesData?.sitesUsed || activeSites.length} / {sitesData?.sitesAllowed || 1}
            </p>
          </div>
          {(sitesData?.sitesAllowed - sitesData?.sitesUsed) > 0 && (
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">Sites Remaining</p>
              <p className="text-2xl font-bold text-emerald-600">
                {sitesData?.sitesAllowed - sitesData?.sitesUsed}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Sites List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        {sites.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 text-center">
            <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No sites activated yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Install the WooASM plugin on your WordPress site and enter your license key to activate.
            </p>
          </div>
        ) : (
          sites.map((site, index) => (
            <motion.div
              key={site.siteId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white dark:bg-gray-800 rounded-2xl p-6 border ${
                site.isActive 
                  ? 'border-gray-200 dark:border-gray-700' 
                  : 'border-gray-200 dark:border-gray-700 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    site.isActive 
                      ? 'bg-emerald-100 dark:bg-emerald-900/30' 
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}>
                    <Globe className={`w-6 h-6 ${
                      site.isActive 
                        ? 'text-emerald-600 dark:text-emerald-400' 
                        : 'text-gray-400'
                    }`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {site.siteUrl}
                      </h3>
                      <a
                        href={site.siteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        site.isActive
                          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}>
                        {site.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        Plugin v{site.pluginVersion}
                      </span>
                      {site.wordpressVersion && (
                        <span className="text-gray-500 dark:text-gray-400">
                          WP {site.wordpressVersion}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      Last seen: {formatDate(site.lastSeenAt)}
                    </div>
                  </div>
                </div>

                {site.isActive && (
                  deleteConfirm === site.siteId ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDeactivate(site.siteId)}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(site.siteId)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Deactivate site"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )
                )}
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4"
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-700 dark:text-blue-300">
            <p className="font-medium mb-1">Need more sites?</p>
            <p>
              Your current plan allows {sitesData?.sitesAllowed || 1} site(s). 
              Upgrade to Professional to connect up to 5 sites with a single license.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SitesPage;
