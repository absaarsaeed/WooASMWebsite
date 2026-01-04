import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  DollarSign, 
  Zap, 
  MessageSquare, 
  FileText, 
  BarChart3,
  Globe,
  Edit2,
  X,
  Check,
  AlertCircle,
  Loader2,
  Save,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import api from '../../services/api';

const AdminPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingPlan, setEditingPlan] = useState(null);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.getAdminPlans();
      if (response.success && response.data) {
        // Sort by sortOrder
        const sortedPlans = response.data.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
        setPlans(sortedPlans);
      } else {
        setError(response.message || 'Failed to load plans');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (plan) => {
    setEditingPlan({ ...plan });
    setSuccessMessage('');
  };

  const handleCancelEdit = () => {
    setEditingPlan(null);
  };

  const handleSavePlan = async () => {
    if (!editingPlan) return;
    
    setSaving(true);
    setError('');
    setSuccessMessage('');

    try {
      // Prepare update payload - only include changed fields
      const updates = {
        displayName: editingPlan.displayName,
        priceMonthly: editingPlan.priceMonthly,
        priceYearly: editingPlan.priceYearly,
        assistantDaily: editingPlan.assistantDaily,
        assistantMonthly: editingPlan.assistantMonthly,
        contentMonthly: editingPlan.contentMonthly,
        chatbotMonthly: editingPlan.chatbotMonthly,
        insightsMonthly: editingPlan.insightsMonthly,
        weightedCap: editingPlan.weightedCap,
        maxSites: editingPlan.maxSites,
        insightsCacheTTL: editingPlan.insightsCacheTTL,
        features: editingPlan.features,
        isActive: editingPlan.isActive,
        sortOrder: editingPlan.sortOrder
      };

      const response = await api.updateAdminPlan(editingPlan.id, updates);
      
      if (response.success) {
        setSuccessMessage('Plan updated successfully!');
        setEditingPlan(null);
        fetchPlans(); // Refresh the list
      } else {
        setError(response.message || 'Failed to update plan');
      }
    } catch (err) {
      setError('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const handleFieldChange = (field, value) => {
    setEditingPlan(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFeatureToggle = (feature) => {
    setEditingPlan(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: !prev.features[feature]
      }
    }));
  };

  const formatPrice = (cents) => {
    if (cents === 0) return 'Free';
    return `$${(cents / 100).toFixed(2)}`;
  };

  const formatLimit = (value) => {
    if (value === null || value === -1) return 'Unlimited';
    return value.toLocaleString();
  };

  const parseLimit = (value) => {
    if (value === '' || value === 'unlimited' || value === 'Unlimited') return null;
    const num = parseInt(value, 10);
    return isNaN(num) ? null : num;
  };

  const parsePrice = (value) => {
    // Convert dollar amount to cents
    const num = parseFloat(value);
    return isNaN(num) ? 0 : Math.round(num * 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Plan Configuration</h1>
          <p className="text-gray-400 mt-1">Manage subscription plans, pricing, and limits</p>
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

      {/* Plans Grid */}
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-gray-800 rounded-2xl border ${
              plan.planKey === 'professional' ? 'border-purple-500' : 'border-gray-700'
            } overflow-hidden`}
          >
            {/* Plan Header */}
            <div className={`p-6 ${
              plan.planKey === 'professional' 
                ? 'bg-gradient-to-r from-purple-600/20 to-purple-800/20' 
                : ''
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    plan.planKey === 'free' ? 'bg-gray-700' :
                    plan.planKey === 'starter' ? 'bg-blue-600' :
                    plan.planKey === 'professional' ? 'bg-purple-600' :
                    'bg-amber-600'
                  }`}>
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{plan.displayName}</h3>
                    <p className="text-sm text-gray-400">{plan.planKey}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleEditClick(plan)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Edit2 className="w-5 h-5 text-gray-400 hover:text-white" />
                </button>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">
                  {formatPrice(plan.priceMonthly)}
                </span>
                {plan.priceMonthly > 0 && (
                  <span className="text-gray-400">/month</span>
                )}
              </div>
              {plan.priceYearly > 0 && (
                <p className="text-sm text-gray-400 mt-1">
                  or {formatPrice(plan.priceYearly)}/year (save 2 months)
                </p>
              )}
            </div>

            {/* Plan Details */}
            <div className="p-6 border-t border-gray-700 space-y-4">
              {/* Limits */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-300 uppercase tracking-wider">Usage Limits</h4>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-400">
                    <Zap className="w-4 h-4" />
                    AI Assistant (Monthly)
                  </span>
                  <span className="text-white font-medium">{formatLimit(plan.assistantMonthly)}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-400">
                    <Zap className="w-4 h-4" />
                    AI Assistant (Daily)
                  </span>
                  <span className="text-white font-medium">{formatLimit(plan.assistantDaily)}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-400">
                    <FileText className="w-4 h-4" />
                    Content Generation
                  </span>
                  <span className="text-white font-medium">{formatLimit(plan.contentMonthly)}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-400">
                    <MessageSquare className="w-4 h-4" />
                    Chatbot Messages
                  </span>
                  <span className="text-white font-medium">{formatLimit(plan.chatbotMonthly)}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-400">
                    <BarChart3 className="w-4 h-4" />
                    Insights Refreshes
                  </span>
                  <span className="text-white font-medium">{formatLimit(plan.insightsMonthly)}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-400">
                    <Globe className="w-4 h-4" />
                    Max Sites
                  </span>
                  <span className="text-white font-medium">{plan.maxSites}</span>
                </div>
              </div>

              {/* Status */}
              <div className="pt-4 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    plan.isActive 
                      ? 'bg-emerald-900/30 text-emerald-400' 
                      : 'bg-red-900/30 text-red-400'
                  }`}>
                    {plan.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingPlan && (
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
              className="bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <h2 className="text-xl font-semibold text-white">
                  Edit {editingPlan.displayName} Plan
                </h2>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider">Basic Info</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Display Name</label>
                      <input
                        type="text"
                        value={editingPlan.displayName}
                        onChange={(e) => handleFieldChange('displayName', e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Sort Order</label>
                      <input
                        type="number"
                        value={editingPlan.sortOrder || 0}
                        onChange={(e) => handleFieldChange('sortOrder', parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <label className="text-sm text-gray-400">Active</label>
                    <button
                      onClick={() => handleFieldChange('isActive', !editingPlan.isActive)}
                      className={`p-1 rounded-lg transition-colors ${
                        editingPlan.isActive ? 'text-emerald-400' : 'text-gray-500'
                      }`}
                    >
                      {editingPlan.isActive ? (
                        <ToggleRight className="w-8 h-8" />
                      ) : (
                        <ToggleLeft className="w-8 h-8" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Pricing */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider">Pricing (in dollars)</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Monthly Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={(editingPlan.priceMonthly / 100).toFixed(2)}
                        onChange={(e) => handleFieldChange('priceMonthly', parsePrice(e.target.value))}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Yearly Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={(editingPlan.priceYearly / 100).toFixed(2)}
                        onChange={(e) => handleFieldChange('priceYearly', parsePrice(e.target.value))}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Usage Limits */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider">
                    Usage Limits <span className="text-gray-500">(leave empty for unlimited)</span>
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">AI Assistant (Daily)</label>
                      <input
                        type="text"
                        value={editingPlan.assistantDaily === null ? '' : editingPlan.assistantDaily}
                        onChange={(e) => handleFieldChange('assistantDaily', parseLimit(e.target.value))}
                        placeholder="Unlimited"
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">AI Assistant (Monthly)</label>
                      <input
                        type="text"
                        value={editingPlan.assistantMonthly === null ? '' : editingPlan.assistantMonthly}
                        onChange={(e) => handleFieldChange('assistantMonthly', parseLimit(e.target.value))}
                        placeholder="Unlimited"
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Content Generation (Monthly)</label>
                      <input
                        type="text"
                        value={editingPlan.contentMonthly === null ? '' : editingPlan.contentMonthly}
                        onChange={(e) => handleFieldChange('contentMonthly', parseLimit(e.target.value))}
                        placeholder="Unlimited"
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Chatbot Messages (Monthly)</label>
                      <input
                        type="text"
                        value={editingPlan.chatbotMonthly === null ? '' : editingPlan.chatbotMonthly}
                        onChange={(e) => handleFieldChange('chatbotMonthly', parseLimit(e.target.value))}
                        placeholder="Unlimited"
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Insights Refreshes (Monthly)</label>
                      <input
                        type="text"
                        value={editingPlan.insightsMonthly === null ? '' : editingPlan.insightsMonthly}
                        onChange={(e) => handleFieldChange('insightsMonthly', parseLimit(e.target.value))}
                        placeholder="Unlimited"
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Weighted Cap</label>
                      <input
                        type="text"
                        value={editingPlan.weightedCap === null ? '' : editingPlan.weightedCap}
                        onChange={(e) => handleFieldChange('weightedCap', parseLimit(e.target.value))}
                        placeholder="Unlimited"
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Max Sites</label>
                      <input
                        type="number"
                        value={editingPlan.maxSites || 1}
                        onChange={(e) => handleFieldChange('maxSites', parseInt(e.target.value) || 1)}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Insights Cache TTL (seconds)</label>
                      <input
                        type="number"
                        value={editingPlan.insightsCacheTTL || 0}
                        onChange={(e) => handleFieldChange('insightsCacheTTL', parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider">Features</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {Object.keys(editingPlan.features || {}).map((feature) => (
                      <button
                        key={feature}
                        onClick={() => handleFeatureToggle(feature)}
                        className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                          editingPlan.features[feature]
                            ? 'bg-emerald-900/20 border-emerald-700 text-emerald-400'
                            : 'bg-gray-700 border-gray-600 text-gray-400'
                        }`}
                      >
                        <span className="text-sm capitalize">
                          {feature.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        {editingPlan.features[feature] ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <X className="w-4 h-4" />
                        )}
                      </button>
                    ))}
                  </div>
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
                  onClick={handleSavePlan}
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

export default AdminPlans;
