import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Lock, AlertTriangle, Check, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import SEO from '../../components/SEO';

const CheckoutMockPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  
  const plan = searchParams.get('plan') || 'starter';
  const billing = searchParams.get('billing') || 'monthly';
  const userId = searchParams.get('userId');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const planDetails = {
    starter: { name: 'Starter', price: billing === 'yearly' ? 23 : 29 },
    professional: { name: 'Professional', price: billing === 'yearly' ? 63 : 79 }
  };

  const currentPlan = planDetails[plan] || planDetails.starter;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Call backend to process mock payment and activate subscription
      const response = await api.processMockCheckout(plan, billing);
      
      if (response.success) {
        // Refresh user data to get updated plan and license key
        await refreshUser();
        // Redirect to success page with the session ID from response
        const sessionId = response.data?.sessionId || 'mock_success';
        navigate(`/checkout/success?session_id=${sessionId}`);
      } else {
        setError(response.message || 'Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Mock checkout error:', error);
      setError('Payment processing failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4">
      <SEO 
        title="Complete Payment - WooASM (Test Mode)"
        description="Complete your WooASM subscription payment in test mode."
      />

      <div className="max-w-lg mx-auto">
        {/* Test Mode Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-800 dark:text-amber-200">Test Mode</p>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                This is a test checkout. Use card number <code className="bg-amber-200 dark:bg-amber-800 px-1 rounded">4242 4242 4242 4242</code> with any future date and CVC.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Checkout Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-purple-600 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold">WooASM</h1>
                <p className="text-purple-200 text-sm">Secure Checkout</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-3">Order Summary</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{currentPlan.name} Plan</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">Billed {billing}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">${currentPlan.price}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">/month</p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mx-6 mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Card Number
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  maxLength={19}
                  placeholder="4242 4242 4242 4242"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expiry
                </label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  maxLength={5}
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  CVC
                </label>
                <input
                  type="text"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  maxLength={4}
                  placeholder="123"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl disabled:opacity-70 transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Pay ${currentPlan.price}/month
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Lock className="w-4 h-4" />
              <span>Secured by Stripe (Test Mode)</span>
            </div>
          </form>

          {/* Features */}
          <div className="px-6 pb-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Included with {currentPlan.name}:</p>
              <div className="space-y-2">
                {[
                  'AI Store Assistant',
                  'Customer Chatbot',
                  'Content Studio',
                  'Priority Support'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Check className="w-4 h-4 text-emerald-500" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back Link */}
        <p className="text-center mt-6 text-gray-500 dark:text-gray-400 text-sm">
          <button
            onClick={() => navigate(-1)}
            className="text-purple-600 dark:text-purple-400 hover:underline"
          >
            ← Go back
          </button>
        </p>
      </div>
    </div>
  );
};

export default CheckoutMockPage;
