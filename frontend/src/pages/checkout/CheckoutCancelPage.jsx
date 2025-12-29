import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, ArrowLeft, MessageCircle } from 'lucide-react';
import SEO from '../../components/SEO';

const CheckoutCancelPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-8">
      <SEO title="Checkout Cancelled - WooASM" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-6">
            <X className="w-8 h-8 text-gray-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Checkout Cancelled
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your checkout was cancelled. No worries - you can try again whenever you're ready.
          </p>

          <div className="space-y-3">
            <Link
              to="/pricing"
              className="block w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl"
            >
              View Plans Again
            </Link>
            <Link
              to="/"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-xl"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Have questions about our plans?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium hover:underline"
            >
              <MessageCircle className="w-4 h-4" />
              Contact Support
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutCancelPage;
