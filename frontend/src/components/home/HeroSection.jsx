import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Check, ArrowRight, Star } from 'lucide-react';
import ChatDemo from './ChatDemo';

const HeroSection = () => {
  const trustBadges = [
    { label: '500+ Active Stores' },
    { label: '⭐ 4.9/5 Rating' },
    { label: 'GDPR Compliant' }
  ];

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden gradient-bg">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-200/30 to-transparent dark:from-purple-900/20 rounded-full blur-3xl" />
      </div>

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/40 border border-purple-200 dark:border-purple-700 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                Now with AI-Powered Customer Chatbot
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6"
            >
              Your AI Store Manager{' '}
              <span className="gradient-text">That Never Sleeps</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-xl"
            >
              The most powerful AI assistant for WooCommerce. Get instant insights, 
              automate inventory, create content, and boost sales — all by just asking.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Link to="/pricing" className="btn-primary text-lg px-8 py-4">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="btn-ghost text-lg px-8 py-4 group">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-4"
            >
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  No credit card required
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  5-minute setup
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  Works with any WooCommerce store
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {trustBadges.map((badge, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {badge.label}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Chat Demo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <ChatDemo />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
