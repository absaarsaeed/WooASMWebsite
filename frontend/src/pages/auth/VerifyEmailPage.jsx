import React, { useEffect, useState, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Check, X, Loader } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/SEO';

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const { verifyEmail } = useAuth();

  const handleVerify = useCallback(async () => {
    const result = await verifyEmail(token);
    
    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error || 'Verification failed');
    }
    
    setLoading(false);
  }, [token, verifyEmail]);

  useEffect(() => {
    if (token) {
      handleVerify();
    } else {
      setLoading(false);
      setError('Invalid verification link');
    }
  }, [token, handleVerify]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-8">
      <SEO
        title="Verify Email - WooASM"
        description="Verify your email address to complete your WooASM registration."
        url="https://wooasm.com/verify-email"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center"
      >
        <Link to="/" className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">WooASM</span>
        </Link>

        {loading ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <Loader className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Verifying your email...
            </h1>
          </div>
        ) : success ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Email verified!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your email has been verified successfully. You can now access all features.
            </p>
            <Link to="/dashboard" className="btn-primary">
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-6">
              <X className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Verification failed
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {error || 'This verification link is invalid or has expired.'}
            </p>
            <Link to="/login" className="btn-primary">
              Go to Login
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default VerifyEmailPage;
