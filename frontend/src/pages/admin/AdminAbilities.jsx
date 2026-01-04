import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wand2, 
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
  ShieldAlert,
  ShieldCheck,
  Shield,
  Package,
  ShoppingCart,
  FileText,
  Tag,
  AlertTriangle
} from 'lucide-react';
import api from '../../services/api';

// Category icons
const categoryIcons = {
  products: Package,
  orders: ShoppingCart,
  reports: FileText,
  coupons: Tag,
  default: Wand2
};

// Risk level colors and icons
const riskLevelConfig = {
  low: { color: 'bg-emerald-500', textColor: 'text-emerald-400', icon: ShieldCheck, label: 'Low Risk' },
  medium: { color: 'bg-amber-500', textColor: 'text-amber-400', icon: Shield, label: 'Medium Risk' },
  high: { color: 'bg-red-500', textColor: 'text-red-400', icon: ShieldAlert, label: 'High Risk' }
};

// Plan colors
const planColors = {
  free: 'bg-gray-500',
  starter: 'bg-blue-500',
  professional: 'bg-purple-500',
  enterprise: 'bg-amber-500'
};

const AdminAbilities = () => {
  const [abilities, setAbilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingAbility, setEditingAbility] = useState(null);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');

  // Default abilities based on the specification
  const defaultAbilities = [
    // Products - READ (Low Risk)
    { abilityId: 'get_products', name: 'Get Products', category: 'products', riskLevel: 'low', requiresConfirmation: false, plans: ['free', 'starter', 'professional', 'enterprise'], enabled: true },
    { abilityId: 'search_products', name: 'Search Products', category: 'products', riskLevel: 'low', requiresConfirmation: false, plans: ['free', 'starter', 'professional', 'enterprise'], enabled: true },
    { abilityId: 'get_product_details', name: 'Get Product Details', category: 'products', riskLevel: 'low', requiresConfirmation: false, plans: ['free', 'starter', 'professional', 'enterprise'], enabled: true },
    { abilityId: 'get_low_stock_products', name: 'Get Low Stock Products', category: 'products', riskLevel: 'low', requiresConfirmation: false, plans: ['free', 'starter', 'professional', 'enterprise'], enabled: true },
    { abilityId: 'get_top_products', name: 'Get Top Products', category: 'products', riskLevel: 'low', requiresConfirmation: false, plans: ['free', 'starter', 'professional', 'enterprise'], enabled: true },
    
    // Products - WRITE (Medium/High Risk)
    { abilityId: 'update_product_price', name: 'Update Product Price', category: 'products', riskLevel: 'medium', requiresConfirmation: true, plans: ['starter', 'professional', 'enterprise'], dailyLimit: 50, enabled: true },
    { abilityId: 'update_product_stock', name: 'Update Product Stock', category: 'products', riskLevel: 'medium', requiresConfirmation: true, plans: ['starter', 'professional', 'enterprise'], dailyLimit: 50, enabled: true },
    { abilityId: 'bulk_update_prices', name: 'Bulk Update Prices', category: 'products', riskLevel: 'high', requiresConfirmation: true, plans: ['professional', 'enterprise'], dailyLimit: 10, enabled: true },
    { abilityId: 'set_product_sale', name: 'Set Product Sale', category: 'products', riskLevel: 'medium', requiresConfirmation: true, plans: ['starter', 'professional', 'enterprise'], dailyLimit: 20, enabled: true },
    { abilityId: 'duplicate_product', name: 'Duplicate Product', category: 'products', riskLevel: 'medium', requiresConfirmation: true, plans: ['professional', 'enterprise'], dailyLimit: 10, enabled: true },
    
    // Orders - READ
    { abilityId: 'get_orders', name: 'Get Orders', category: 'orders', riskLevel: 'low', requiresConfirmation: false, plans: ['free', 'starter', 'professional', 'enterprise'], enabled: true },
    { abilityId: 'get_order_details', name: 'Get Order Details', category: 'orders', riskLevel: 'low', requiresConfirmation: false, plans: ['free', 'starter', 'professional', 'enterprise'], enabled: true },
    { abilityId: 'search_orders', name: 'Search Orders', category: 'orders', riskLevel: 'low', requiresConfirmation: false, plans: ['free', 'starter', 'professional', 'enterprise'], enabled: true },
    
    // Orders - WRITE
    { abilityId: 'update_order_status', name: 'Update Order Status', category: 'orders', riskLevel: 'medium', requiresConfirmation: true, plans: ['starter', 'professional', 'enterprise'], dailyLimit: 100, enabled: true },
    { abilityId: 'cancel_order', name: 'Cancel Order', category: 'orders', riskLevel: 'high', requiresConfirmation: true, plans: ['professional', 'enterprise'], dailyLimit: 20, enabled: true },
    { abilityId: 'process_refund', name: 'Process Refund', category: 'orders', riskLevel: 'high', requiresConfirmation: true, plans: ['professional', 'enterprise'], dailyLimit: 10, enabled: true },
    { abilityId: 'add_order_note', name: 'Add Order Note', category: 'orders', riskLevel: 'low', requiresConfirmation: false, plans: ['starter', 'professional', 'enterprise'], enabled: true },
    
    // Reports
    { abilityId: 'get_sales_report', name: 'Get Sales Report', category: 'reports', riskLevel: 'low', requiresConfirmation: false, plans: ['free', 'starter', 'professional', 'enterprise'], enabled: true },
    { abilityId: 'get_revenue_comparison', name: 'Get Revenue Comparison', category: 'reports', riskLevel: 'low', requiresConfirmation: false, plans: ['starter', 'professional', 'enterprise'], enabled: true },
    { abilityId: 'get_customer_insights', name: 'Get Customer Insights', category: 'reports', riskLevel: 'low', requiresConfirmation: false, plans: ['starter', 'professional', 'enterprise'], enabled: true },
    { abilityId: 'get_refund_summary', name: 'Get Refund Summary', category: 'reports', riskLevel: 'low', requiresConfirmation: false, plans: ['professional', 'enterprise'], enabled: true },
    
    // Coupons
    { abilityId: 'get_coupons', name: 'Get Coupons', category: 'coupons', riskLevel: 'low', requiresConfirmation: false, plans: ['free', 'starter', 'professional', 'enterprise'], enabled: true },
    { abilityId: 'create_coupon', name: 'Create Coupon', category: 'coupons', riskLevel: 'medium', requiresConfirmation: true, plans: ['starter', 'professional', 'enterprise'], dailyLimit: 10, enabled: true },
    { abilityId: 'update_coupon', name: 'Update Coupon', category: 'coupons', riskLevel: 'medium', requiresConfirmation: true, plans: ['starter', 'professional', 'enterprise'], dailyLimit: 20, enabled: true },
    { abilityId: 'delete_coupon', name: 'Delete Coupon', category: 'coupons', riskLevel: 'high', requiresConfirmation: true, plans: ['professional', 'enterprise'], dailyLimit: 5, enabled: true },
  ];

  useEffect(() => {
    fetchAbilities();
  }, []);

  const fetchAbilities = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.getAdminAbilities();
      if (response.success && response.data) {
        setAbilities(response.data);
      } else {
        setAbilities(defaultAbilities);
      }
    } catch (err) {
      setAbilities(defaultAbilities);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (ability) => {
    setEditingAbility({ ...ability });
    setSuccessMessage('');
  };

  const handleCancelEdit = () => {
    setEditingAbility(null);
  };

  const handleSaveAbility = async () => {
    if (!editingAbility) return;
    
    setSaving(true);
    setError('');

    try {
      const response = await api.updateAdminAbility(editingAbility.abilityId, {
        name: editingAbility.name,
        category: editingAbility.category,
        riskLevel: editingAbility.riskLevel,
        requiresConfirmation: editingAbility.requiresConfirmation,
        plans: editingAbility.plans,
        dailyLimit: editingAbility.dailyLimit,
        monthlyLimit: editingAbility.monthlyLimit,
        enabled: editingAbility.enabled
      });
      
      if (response.success) {
        setSuccessMessage('Ability updated successfully!');
        setEditingAbility(null);
        fetchAbilities();
      } else {
        setError(response.message || 'Failed to update ability');
      }
    } catch (err) {
      setError('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const handlePlanToggle = (plan) => {
    const currentPlans = editingAbility.plans || [];
    const newPlans = currentPlans.includes(plan)
      ? currentPlans.filter(p => p !== plan)
      : [...currentPlans, plan];
    
    setEditingAbility(prev => ({
      ...prev,
      plans: newPlans
    }));
  };

  // Get unique categories
  const categories = ['all', ...new Set(abilities.map(a => a.category))];

  // Filter abilities
  const filteredAbilities = abilities.filter(ability => {
    const matchesSearch = ability.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ability.abilityId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || ability.category === categoryFilter;
    const matchesRisk = riskFilter === 'all' || ability.riskLevel === riskFilter;
    return matchesSearch && matchesCategory && matchesRisk;
  });

  // Group by category for display
  const groupedAbilities = filteredAbilities.reduce((acc, ability) => {
    const cat = ability.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(ability);
    return acc;
  }, {});

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
          <h1 className="text-2xl font-bold text-white">AI Abilities Management</h1>
          <p className="text-gray-400 mt-1">Configure AI assistant capabilities per plan</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            Low Risk: {abilities.filter(a => a.riskLevel === 'low').length}
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            Medium: {abilities.filter(a => a.riskLevel === 'medium').length}
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            High: {abilities.filter(a => a.riskLevel === 'high').length}
          </div>
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
            placeholder="Search abilities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
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
        <select
          value={riskFilter}
          onChange={(e) => setRiskFilter(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="all">All Risk Levels</option>
          <option value="low">Low Risk</option>
          <option value="medium">Medium Risk</option>
          <option value="high">High Risk</option>
        </select>
      </div>

      {/* Abilities by Category */}
      {Object.entries(groupedAbilities).map(([category, categoryAbilities]) => {
        const IconComponent = categoryIcons[category] || categoryIcons.default;
        return (
          <div key={category} className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700 flex items-center gap-3">
              <IconComponent className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-semibold text-white capitalize">{category}</h2>
              <span className="px-2 py-0.5 rounded-full bg-gray-700 text-gray-400 text-sm">
                {categoryAbilities.length} abilities
              </span>
            </div>
            <div className="divide-y divide-gray-700">
              {categoryAbilities.map((ability) => {
                const riskConfig = riskLevelConfig[ability.riskLevel] || riskLevelConfig.low;
                const RiskIcon = riskConfig.icon;
                return (
                  <div key={ability.abilityId} className="px-6 py-4 flex items-center justify-between hover:bg-gray-700/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <RiskIcon className={`w-5 h-5 ${riskConfig.textColor}`} />
                        <div>
                          <p className="text-white font-medium">{ability.name}</p>
                          <p className="text-sm text-gray-500 font-mono">{ability.abilityId}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      {ability.requiresConfirmation && (
                        <span className="flex items-center gap-1 text-amber-400 text-sm">
                          <AlertTriangle className="w-4 h-4" />
                          Confirmation
                        </span>
                      )}
                      
                      {ability.dailyLimit && (
                        <span className="text-gray-400 text-sm">
                          {ability.dailyLimit}/day
                        </span>
                      )}
                      
                      <div className="flex gap-1">
                        {(ability.plans || []).map(plan => (
                          <span
                            key={plan}
                            className={`px-2 py-0.5 rounded text-xs text-white ${planColors[plan] || 'bg-gray-600'}`}
                          >
                            {plan.charAt(0).toUpperCase()}
                          </span>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => handleEditClick(ability)}
                        className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-gray-400 hover:text-white" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {Object.keys(groupedAbilities).length === 0 && (
        <div className="p-12 text-center text-gray-400 bg-gray-800 rounded-2xl border border-gray-700">
          No abilities found matching your criteria
        </div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {editingAbility && (
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
              className="bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <h2 className="text-xl font-semibold text-white">
                  Edit Ability
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
                  <label className="block text-sm text-gray-400 mb-2">Ability ID</label>
                  <input
                    type="text"
                    value={editingAbility.abilityId}
                    disabled
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Display Name</label>
                  <input
                    type="text"
                    value={editingAbility.name}
                    onChange={(e) => setEditingAbility(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Category</label>
                    <select
                      value={editingAbility.category}
                      onChange={(e) => setEditingAbility(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="products">Products</option>
                      <option value="orders">Orders</option>
                      <option value="reports">Reports</option>
                      <option value="coupons">Coupons</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Risk Level</label>
                    <select
                      value={editingAbility.riskLevel}
                      onChange={(e) => setEditingAbility(prev => ({ ...prev, riskLevel: e.target.value }))}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="low">Low Risk</option>
                      <option value="medium">Medium Risk</option>
                      <option value="high">High Risk</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Daily Limit</label>
                    <input
                      type="number"
                      value={editingAbility.dailyLimit || ''}
                      onChange={(e) => setEditingAbility(prev => ({ ...prev, dailyLimit: e.target.value ? parseInt(e.target.value) : null }))}
                      placeholder="Unlimited"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Monthly Limit</label>
                    <input
                      type="number"
                      value={editingAbility.monthlyLimit || ''}
                      onChange={(e) => setEditingAbility(prev => ({ ...prev, monthlyLimit: e.target.value ? parseInt(e.target.value) : null }))}
                      placeholder="Unlimited"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Available in Plans</label>
                  <div className="flex flex-wrap gap-2">
                    {['free', 'starter', 'professional', 'enterprise'].map(plan => (
                      <button
                        key={plan}
                        onClick={() => handlePlanToggle(plan)}
                        className={`px-4 py-2 rounded-lg border transition-colors capitalize ${
                          (editingAbility.plans || []).includes(plan)
                            ? `${planColors[plan]} border-transparent text-white`
                            : 'bg-gray-700 border-gray-600 text-gray-400'
                        }`}
                      >
                        {plan}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <span className="text-sm text-gray-400">Requires Confirmation</span>
                  <button
                    onClick={() => setEditingAbility(prev => ({ ...prev, requiresConfirmation: !prev.requiresConfirmation }))}
                    className={`p-1 rounded-lg transition-colors ${
                      editingAbility.requiresConfirmation ? 'text-amber-400' : 'text-gray-500'
                    }`}
                  >
                    {editingAbility.requiresConfirmation ? (
                      <ToggleRight className="w-8 h-8" />
                    ) : (
                      <ToggleLeft className="w-8 h-8" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Ability Enabled</span>
                  <button
                    onClick={() => setEditingAbility(prev => ({ ...prev, enabled: !prev.enabled }))}
                    className={`p-1 rounded-lg transition-colors ${
                      editingAbility.enabled ? 'text-emerald-400' : 'text-gray-500'
                    }`}
                  >
                    {editingAbility.enabled ? (
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
                  onClick={handleSaveAbility}
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

export default AdminAbilities;
