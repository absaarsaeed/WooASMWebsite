import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Calendar, ExternalLink, AlertTriangle, Check, Zap, FlaskConical } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/SEO';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const BillingPage = () => {
  const { user, getToken, refreshUser } = useAuth();
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [testPlanLoading, setTestPlanLoading] = useState(false);
  const [testPlan, setTestPlan] = useState({ plan: 'starter', billing_cycle: 'monthly' });
  const [cancelConfirm, setCancelConfirm] = useState(false);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const response = await fetch(`${API_URL}/api/billing/subscription`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      if (response.ok) {
        const data = await response.json();
        setSubscriptionData(data);
      }
    } catch (error) {
      console.error('Failed to fetch subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async (plan, billingCycle) => {
    setCheckoutLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/billing/create-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          plan,
          billing_cycle: billingCycle,
          origin_url: window.location.origin
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        window.location.href = data.checkout_url;
      } else {
        const error = await response.json();
        alert(error.detail || 'Failed to create checkout');
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Failed to create checkout session');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleActivateTestPlan = async () => {
    setTestPlanLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/billing/activate-test-plan`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testPlan)
      });
      
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        await refreshUser();
        fetchSubscription();
      } else {
        const error = await response.json();
        alert(error.detail || 'Failed to activate test plan');
      }
    } catch (error) {
      console.error('Test plan activation failed:', error);
      alert('Failed to activate test plan');
    } finally {
      setTestPlanLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      const response = await fetch(`${API_URL}/api/billing/cancel`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        await refreshUser();
        fetchSubscription();
      }
    } catch (error) {
      console.error('Cancel failed:', error);
    } finally {
      setCancelConfirm(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const plans = [
    {
      name: 'Starter',
      id: 'starter',
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: ['500 AI queries/month', '1 site', 'Customer chatbot', 'Content studio', 'Email support']
    },
    {
      name: 'Professional',
      id: 'professional',
      monthlyPrice: 79,
      yearlyPrice: 790,
      features: ['2000 AI queries/month', '5 sites', 'All Starter features', 'Inventory autopilot', 'Competitor watch', 'Priority support'],
      popular: true
    }
  ];

  return (
    <div className="p-8 max-w-4xl">
      <SEO title="Billing - WooASM Dashboard" />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Billing</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your subscription and billing information
        </p>
      </motion.div>

      {/* Current Subscription */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 mb-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Current Subscription</h2>
        
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Plan</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white capitalize">
              {user?.plan}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
            <p className={`text-xl font-bold capitalize ${
              subscriptionData?.status === 'active' ? 'text-emerald-600' : 'text-amber-600'
            }`}>
              {subscriptionData?.status || 'active'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Billing Cycle</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white capitalize">
              {subscriptionData?.billing_cycle || 'N/A'}
            </p>
          </div>
        </div>

        {subscriptionData?.current_period_end && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              Next billing date: {formatDate(subscriptionData.current_period_end)}
            </div>
          </div>
        )}

        {user?.plan !== 'free' && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            {cancelConfirm ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">Are you sure?</span>
                <button
                  onClick={handleCancelSubscription}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Yes, cancel subscription
                </button>
                <button
                  onClick={() => setCancelConfirm(false)}
                  className="text-gray-600 hover:text-gray-700 text-sm"
                >
                  No, keep it
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCancelConfirm(true)}
                className="text-sm text-gray-500 hover:text-red-600"
              >
                Cancel subscription
              </button>
            )}
          </div>
        )}
      </motion.div>

      {/* Test Plan (Dev Only) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800 mb-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <FlaskConical className="w-5 h-5 text-amber-600" />
          <h2 className="text-lg font-semibold text-amber-900 dark:text-amber-200">Testing Plan (Dev Only)</h2>
        </div>
        <p className="text-sm text-amber-700 dark:text-amber-300 mb-4">
          Activate any plan for free testing. This bypasses Stripe and gives you 30 days access.
        </p>
        
        <div className="flex flex-wrap items-center gap-4">
          <select
            value={testPlan.plan}
            onChange={(e) => setTestPlan({ ...testPlan, plan: e.target.value })}
            className="px-4 py-2 rounded-lg border border-amber-300 dark:border-amber-700 bg-white dark:bg-amber-900/30 text-gray-900 dark:text-white"
          >
            <option value="starter">Starter</option>
            <option value="professional">Professional</option>
          </select>
          <select
            value={testPlan.billing_cycle}
            onChange={(e) => setTestPlan({ ...testPlan, billing_cycle: e.target.value })}
            className="px-4 py-2 rounded-lg border border-amber-300 dark:border-amber-700 bg-white dark:bg-amber-900/30 text-gray-900 dark:text-white"
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button
            onClick={handleActivateTestPlan}
            disabled={testPlanLoading}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium disabled:opacity-50"
          >
            {testPlanLoading ? 'Activating...' : 'Activate Test Plan'}
          </button>
        </div>
      </motion.div>

      {/* Upgrade Options */}
      {user?.plan === 'free' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upgrade Your Plan</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl p-6 border ${
                  plan.popular
                    ? 'border-purple-500 ring-2 ring-purple-500'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded-full">
                    Most Popular
                  </span>
                )}
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">${plan.monthlyPrice}</span>
                  <span className="text-gray-500 dark:text-gray-400">/month</span>
                </div>
                
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Check className="w-4 h-4 text-emerald-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="space-y-2">
                  <button
                    onClick={() => handleCheckout(plan.id, 'monthly')}
                    disabled={checkoutLoading}
                    className={`w-full py-2 rounded-lg font-medium disabled:opacity-50 ${
                      plan.popular
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                    }`}
                  >
                    Get {plan.name} Monthly
                  </button>
                  <button
                    onClick={() => handleCheckout(plan.id, 'yearly')}
                    disabled={checkoutLoading}
                    className="w-full py-2 rounded-lg font-medium bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white disabled:opacity-50"
                  >
                    Get {plan.name} Yearly (Save 16%)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BillingPage;
