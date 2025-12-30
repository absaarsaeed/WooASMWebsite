import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Calendar, ExternalLink, Check, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import SEO from '../../components/SEO';

const BillingPage = () => {
  const { user, refreshUser } = useAuth();
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [cancelConfirm, setCancelConfirm] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const response = await api.getSubscription();
      if (response.success) {
        setSubscriptionData(response.data);
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
      const response = await api.createCheckout(plan, billingCycle);
      
      if (response.success && response.data.checkout_url) {
        window.location.href = response.data.checkout_url;
      } else {
        alert(response.message || 'Failed to create checkout');
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Failed to create checkout session. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleManageBilling = async () => {
    setPortalLoading(true);
    try {
      const response = await api.getBillingPortal();
      if (response.success && response.data.portal_url) {
        window.location.href = response.data.portal_url;
      } else {
        alert('Could not open billing portal');
      }
    } catch (error) {
      console.error('Portal failed:', error);
      alert('Failed to open billing portal');
    } finally {
      setPortalLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      const response = await api.cancelSubscription('User requested cancellation');
      
      if (response.success) {
        alert(response.message || 'Subscription will be cancelled at the end of the billing period');
        await refreshUser();
        fetchSubscription();
      } else {
        alert(response.message || 'Failed to cancel subscription');
      }
    } catch (error) {
      console.error('Cancel failed:', error);
      alert('Failed to cancel subscription');
    } finally {
      setCancelConfirm(false);
    }
  };

  const handleResumeSubscription = async () => {
    try {
      const response = await api.resumeSubscription();
      if (response.success) {
        alert('Subscription resumed successfully');
        await refreshUser();
        fetchSubscription();
      }
    } catch (error) {
      console.error('Resume failed:', error);
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

  const currentPlan = user?.plan || 'free';

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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Current Subscription</h2>
          {currentPlan !== 'free' && (
            <button
              onClick={handleManageBilling}
              disabled={portalLoading}
              className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              <CreditCard className="w-4 h-4" />
              {portalLoading ? 'Loading...' : 'Manage Billing'}
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>
        
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Plan</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white capitalize">
              {currentPlan}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
            <p className={`text-xl font-bold capitalize ${
              subscriptionData?.status === 'active' ? 'text-emerald-600' : 
              subscriptionData?.status === 'cancelled' ? 'text-red-600' :
              'text-amber-600'
            }`}>
              {subscriptionData?.status || 'active'}
              {subscriptionData?.cancel_at_period_end && ' (Cancelling)'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Billing Cycle</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white capitalize">
              {subscriptionData?.billing_cycle || 'N/A'}
            </p>
          </div>
        </div>

        {subscriptionData?.current_period_end && currentPlan !== 'free' && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              {subscriptionData?.cancel_at_period_end ? 'Access until: ' : 'Next billing date: '}
              {formatDate(subscriptionData.current_period_end)}
            </div>
            {subscriptionData?.next_invoice && !subscriptionData?.cancel_at_period_end && (
              <p className="text-sm text-gray-500 mt-1">
                Next charge: ${(subscriptionData.next_invoice.amount / 100).toFixed(2)}
              </p>
            )}
          </div>
        )}

        {currentPlan !== 'free' && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            {subscriptionData?.cancel_at_period_end ? (
              <button
                onClick={handleResumeSubscription}
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                Resume subscription
              </button>
            ) : cancelConfirm ? (
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

      {/* Upgrade/Change Plan Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {currentPlan === 'free' ? 'Upgrade Your Plan' : 'Change Plan'}
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {plans.map((plan) => {
            const isCurrent = currentPlan === plan.id;
            
            return (
              <div
                key={plan.id}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl p-6 border ${
                  plan.popular
                    ? 'border-purple-500 ring-2 ring-purple-500'
                    : isCurrent
                    ? 'border-emerald-500'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded-full">
                    Most Popular
                  </span>
                )}
                {isCurrent && (
                  <span className="absolute -top-3 right-4 px-3 py-1 bg-emerald-600 text-white text-xs font-medium rounded-full">
                    Current Plan
                  </span>
                )}
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">${plan.monthlyPrice}</span>
                  <span className="text-gray-500 dark:text-gray-400">/month</span>
                  <p className="text-sm text-gray-500 mt-1">
                    or ${plan.yearlyPrice}/year (save ~17%)
                  </p>
                </div>
                
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {!isCurrent && (
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
                      {checkoutLoading ? 'Loading...' : `Get ${plan.name} Monthly`}
                    </button>
                    <button
                      onClick={() => handleCheckout(plan.id, 'yearly')}
                      disabled={checkoutLoading}
                      className="w-full py-2 rounded-lg font-medium bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white disabled:opacity-50"
                    >
                      {checkoutLoading ? 'Loading...' : `Get ${plan.name} Yearly (Save 17%)`}
                    </button>
                  </div>
                )}
                
                {isCurrent && (
                  <div className="flex items-center justify-center gap-2 py-2 text-emerald-600">
                    <Zap className="w-5 h-5" />
                    <span className="font-medium">You're on this plan</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Billing History Link */}
      {currentPlan !== 'free' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-center"
        >
          <button
            onClick={handleManageBilling}
            className="text-purple-600 hover:text-purple-700 text-sm font-medium"
          >
            View billing history and invoices →
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default BillingPage;
