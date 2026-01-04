import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Puzzle, 
  Search,
  Edit2,
  X,
  Check,
  AlertCircle,
  Loader2,
  Save,
  ToggleLeft,
  ToggleRight,
  Filter,
  Zap,
  MessageSquare,
  BarChart3,
  Package,
  Users,
  Shield,
  Eye,
  FileText,
  Bot
} from 'lucide-react';
import api from '../../services/api';

// Feature category icons
const categoryIcons = {
  ai: Zap,
  analytics: BarChart3,
  automation: Package,
  security: Shield,
  support: Users,
  advanced: Puzzle,
  default: Puzzle
};

// Plan colors
const planColors = {
  free: 'bg-gray-500',
  starter: 'bg-blue-500',
  professional: 'bg-purple-500',
  developer: 'bg-amber-500'
};

const AdminFeatures = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingFeature, setEditingFeature] = useState(null);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Default features based on the integration guide specification
  const defaultFeatures = [
    // AI Features
    { featureKey: 'ai_assistant', name: 'AI Store Assistant', description: 'Chat with your store in natural language', category: 'ai', allowedPlans: ['free', 'starter', 'professional', 'developer'], enabled: true, sortOrder: 0 },
    { featureKey: 'content_studio', name: 'Content Studio', description: 'AI-powered content generation', category: 'ai', allowedPlans: ['starter', 'professional', 'developer'], enabled: true, sortOrder: 1 },
    { featureKey: 'customer_chatbot', name: 'Customer Chatbot', description: '24/7 AI-powered customer support', category: 'ai', allowedPlans: ['starter', 'professional', 'developer'], enabled: true, sortOrder: 2 },
    
    // Analytics Features
    { featureKey: 'ga4_integration', name: 'GA4 Integration', description: 'Google Analytics 4 connection', category: 'analytics', allowedPlans: ['professional', 'developer'], enabled: true, sortOrder: 3 },
    { featureKey: 'store_health_score', name: 'Store Health Score', description: 'Overall store performance metrics', category: 'analytics', allowedPlans: ['starter', 'professional', 'developer'], enabled: true, sortOrder: 4 },
    { featureKey: 'magic_insights', name: 'MAGIC Insights', description: 'AI-powered store analytics', category: 'analytics', allowedPlans: ['free', 'starter', 'professional', 'developer'], enabled: true, sortOrder: 5 },
    
    // Automation Features
    { featureKey: 'inventory_autopilot', name: 'Inventory Autopilot', description: 'Automated inventory management', category: 'automation', allowedPlans: ['professional', 'developer'], enabled: true, sortOrder: 6 },
    { featureKey: 'competitor_monitor', name: 'Competitor Monitor', description: 'Monitor competitor pricing', category: 'automation', allowedPlans: ['starter', 'professional', 'developer'], enabled: true, sortOrder: 7 },
    { featureKey: 'review_monitor', name: 'Review Monitor', description: 'Track and respond to reviews', category: 'automation', allowedPlans: ['starter', 'professional', 'developer'], enabled: true, sortOrder: 8 },
    
    // Security Features
    { featureKey: 'fraud_detection', name: 'Fraud Detection', description: 'AI-powered fraud prevention', category: 'security', allowedPlans: ['professional', 'developer'], enabled: true, sortOrder: 9 },
    
    // Support Features
    { featureKey: 'priority_support', name: 'Priority Support', description: 'Priority email and chat support', category: 'support', allowedPlans: ['professional', 'developer'], enabled: true, sortOrder: 10 },
    
    // Advanced Features
    { featureKey: 'api_access', name: 'API Access', description: 'Full API access for custom integrations', category: 'advanced', allowedPlans: ['developer'], enabled: true, sortOrder: 11 },
    { featureKey: 'export_import', name: 'Export/Import', description: 'Export and import data', category: 'advanced', allowedPlans: ['starter', 'professional', 'developer'], enabled: true, sortOrder: 12 },
    { featureKey: 'scheduled_exports', name: 'Scheduled Exports', description: 'Automated scheduled exports', category: 'advanced', allowedPlans: ['professional', 'developer'], enabled: true, sortOrder: 13 },
  ];

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.getAdminFeatures();
      if (response.success && response.data) {
        setFeatures(response.data);
      } else {
        // Use default features if API fails
        setFeatures(defaultFeatures);
      }
    } catch (err) {
      // Use default features on error
      setFeatures(defaultFeatures);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFeature = async (feature) => {
    const newEnabled = !feature.enabled;
    
    // Optimistic update
    setFeatures(prev => prev.map(f => 
      f.featureKey === feature.featureKey ? { ...f, enabled: newEnabled } : f
    ));

    try {
      const response = await api.toggleAdminFeature(feature.featureKey, newEnabled);
      if (!response.success) {
        // Revert on failure
        setFeatures(prev => prev.map(f => 
          f.featureKey === feature.featureKey ? { ...f, enabled: !newEnabled } : f
        ));
        setError('Failed to toggle feature');
      } else {
        setSuccessMessage(`${feature.name} ${newEnabled ? 'enabled' : 'disabled'}`);
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (err) {
      // Revert on error
      setFeatures(prev => prev.map(f => 
        f.featureKey === feature.featureKey ? { ...f, enabled: !newEnabled } : f
      ));
    }
  };

  const handleEditClick = (feature) => {
    setEditingFeature({ ...feature });
    setSuccessMessage('');
  };

  const handleCancelEdit = () => {
    setEditingFeature(null);
  };

  const handleSaveFeature = async () => {
    if (!editingFeature) return;
    
    setSaving(true);
    setError('');

    try {
      const response = await api.updateAdminFeature(editingFeature.featureKey, {
        name: editingFeature.name,
        description: editingFeature.description,
        category: editingFeature.category,
        allowedPlans: editingFeature.allowedPlans,
        enabled: editingFeature.enabled,
        sortOrder: editingFeature.sortOrder
      });
      
      if (response.success) {
        setSuccessMessage('Feature updated successfully!');
        setEditingFeature(null);
        fetchFeatures();
      } else {
        setError(response.message || 'Failed to update feature');
      }
    } catch (err) {
      setError('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const handlePlanToggle = (plan) => {
    const currentPlans = editingFeature.allowedPlans || [];
    const newPlans = currentPlans.includes(plan)
      ? currentPlans.filter(p => p !== plan)
      : [...currentPlans, plan];
    
    setEditingFeature(prev => ({
      ...prev,
      allowedPlans: newPlans
    }));
  };

  // Get unique categories
  const categories = ['all', ...new Set(features.map(f => f.category))];

  // Filter features
  const filteredFeatures = features.filter(feature => {
    const matchesSearch = feature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          feature.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || feature.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Feature Management</h1>
          <p className="text-gray-400 mt-1">Control feature availability across plans</p>
        </div>
        <div className="text-sm text-gray-400">
          {features.length} features · {features.filter(f => f.enabled).length} enabled
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-900/20 border border-red-800 rounded-xl text-red-400 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}

      {successMessage && (
        <div className="p-4 bg-emerald-900/20 border border-emerald-800 rounded-xl text-emerald-400 flex items-center gap-2">
          <Check className="w-5 h-5 flex-shrink-0" />
          {successMessage}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search features..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Features Table */}
      <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Feature</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Category</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Available In</th>
              <th className="px-6 py-4 text-center text-sm font-medium text-gray-400">Status</th>
              <th className="px-6 py-4 text-center text-sm font-medium text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredFeatures.map((feature) => {
              const IconComponent = categoryIcons[feature.category] || categoryIcons.default;
              return (
                <tr key={feature.featureKey} className="hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{feature.name}</p>
                        <p className="text-sm text-gray-400">{feature.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-gray-700 text-gray-300 text-sm capitalize">
                      {feature.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {(feature.allowedPlans || []).map(plan => (
                        <span
                          key={plan}
                          className={`px-2 py-0.5 rounded text-xs text-white ${planColors[plan] || 'bg-gray-600'}`}
                        >
                          {plan}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleToggleFeature(feature)}
                      className={`p-1 rounded-lg transition-colors ${
                        feature.enabled ? 'text-emerald-400' : 'text-gray-500'
                      }`}
                    >
                      {feature.enabled ? (
                        <ToggleRight className="w-8 h-8" />
                      ) : (
                        <ToggleLeft className="w-8 h-8" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleEditClick(feature)}
                      className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-gray-400 hover:text-white" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredFeatures.length === 0 && (
          <div className="p-12 text-center text-gray-400">
            No features found matching your criteria
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={handleCancelEdit}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <h2 className="text-xl font-semibold text-white">
                  Edit Feature
                </h2>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Feature Name</label>
                  <input
                    type="text"
                    value={editingFeature.name}
                    onChange={(e) => setEditingFeature(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Description</label>
                  <textarea
                    value={editingFeature.description || ''}
                    onChange={(e) => setEditingFeature(prev => ({ ...prev, description: e.target.value }))}
                    rows={2}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Category</label>
                  <select
                    value={editingFeature.category}
                    onChange={(e) => setEditingFeature(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="ai">AI</option>
                    <option value="analytics">Analytics</option>
                    <option value="automation">Automation</option>
                    <option value="security">Security</option>
                    <option value="support">Support</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Available in Plans</label>
                  <div className="flex flex-wrap gap-2">
                    {['free', 'starter', 'professional', 'developer'].map(plan => (
                      <button
                        key={plan}
                        onClick={() => handlePlanToggle(plan)}
                        className={`px-4 py-2 rounded-lg border transition-colors capitalize ${
                          (editingFeature.allowedPlans || []).includes(plan)
                            ? `${planColors[plan]} border-transparent text-white`
                            : 'bg-gray-700 border-gray-600 text-gray-400'
                        }`}
                      >
                        {plan}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <span className="text-sm text-gray-400">Feature Enabled</span>
                  <button
                    onClick={() => setEditingFeature(prev => ({ ...prev, enabled: !prev.enabled }))}
                    className={`p-1 rounded-lg transition-colors ${
                      editingFeature.enabled ? 'text-emerald-400' : 'text-gray-500'
                    }`}
                  >
                    {editingFeature.enabled ? (
                      <ToggleRight className="w-8 h-8" />
                    ) : (
                      <ToggleLeft className="w-8 h-8" />
                    )}
                  </button>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-4 p-6 border-t border-gray-700">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveFeature}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg disabled:opacity-50 transition-colors"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminFeatures;
