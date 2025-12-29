import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, ExternalLink, Clock, Server } from 'lucide-react';
import SEO from '../../components/SEO';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const AdminSites = () => {
  const [sitesData, setSitesData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const token = localStorage.getItem('wooasm_admin_token');
      const response = await fetch(`${API_URL}/api/admin/sites`, {
        headers: { 'X-Admin-Token': token }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSitesData(data);
      }
    } catch (error) {
      console.error('Failed to fetch sites:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Never';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const sites = sitesData?.sites || [];
  const versionStats = sitesData?.by_plugin_version || {};
  const wpStats = sitesData?.by_wordpress_version || {};

  return (
    <div className="p-8">
      <SEO title="Sites - Admin Dashboard" />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Sites</h1>
        <p className="text-gray-400">All activated WordPress sites</p>
      </motion.div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-2xl p-6 border border-gray-700"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-900/30 flex items-center justify-center">
              <Globe className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{sites.length}</p>
          <p className="text-sm text-gray-400">Total Sites</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-2xl p-6 border border-gray-700"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-900/30 flex items-center justify-center">
              <Server className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{sites.filter(s => s.is_active).length}</p>
          <p className="text-sm text-gray-400">Active Sites</p>
        </motion.div>
      </div>

      {/* Version Distribution */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Plugin Versions</h2>
          <div className="space-y-3">
            {Object.entries(versionStats).map(([version, count]) => (
              <div key={version} className="flex items-center justify-between">
                <span className="text-gray-300">v{version}</span>
                <span className="px-3 py-1 rounded-full bg-purple-900/30 text-purple-300 text-sm">
                  {count} sites
                </span>
              </div>
            ))}
            {Object.keys(versionStats).length === 0 && (
              <p className="text-gray-500">No data available</p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-lg font-semibold text-white mb-4">WordPress Versions</h2>
          <div className="space-y-3">
            {Object.entries(wpStats).slice(0, 5).map(([version, count]) => (
              <div key={version} className="flex items-center justify-between">
                <span className="text-gray-300">WP {version}</span>
                <span className="px-3 py-1 rounded-full bg-blue-900/30 text-blue-300 text-sm">
                  {count} sites
                </span>
              </div>
            ))}
            {Object.keys(wpStats).length === 0 && (
              <p className="text-gray-500">No data available</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Sites Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Site URL</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Plugin</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">WordPress</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Last Seen</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {sites.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    No sites activated yet
                  </td>
                </tr>
              ) : (
                sites.map((site) => (
                  <tr key={site.site_id} className="border-b border-gray-700 hover:bg-gray-700/50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <span className="text-white">{site.site_url}</span>
                        <a
                          href={site.site_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-gray-300"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-400">
                      v{site.plugin_version}
                    </td>
                    <td className="py-4 px-6 text-gray-400">
                      {site.wordpress_version || 'Unknown'}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1 text-gray-400">
                        <Clock className="w-4 h-4" />
                        {formatDate(site.last_seen_at)}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        site.is_active 
                          ? 'bg-emerald-900/50 text-emerald-300'
                          : 'bg-gray-700 text-gray-400'
                      }`}>
                        {site.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminSites;
