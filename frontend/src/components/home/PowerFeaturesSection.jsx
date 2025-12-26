import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  MessageSquare, Bot, Eye, Package, PenTool, Heart,
  Zap, DollarSign, Tag, ShoppingCart, Users, TrendingUp,
  ArrowRight, Check, Sparkles
} from 'lucide-react';

const PowerFeaturesSection = () => {
  const features = [
    {
      icon: MessageSquare,
      title: 'Control Your Store by Asking',
      tagline: 'The New Way to Manage WooCommerce',
      description: 'Forget clicking through endless menus. Just ask "update price of Blue Widget to $29.99" or "create a 20% coupon for VIP customers" — and it\'s done.',
      capabilities: [
        'Update prices with natural language',
        'Create coupons instantly',
        'Manage inventory by asking',
        'Get answers about any order'
      ],
      color: 'purple',
      link: '/features/ai-assistant'
    },
    {
      icon: Bot,
      title: '24/7 AI Customer Support',
      tagline: 'Support That Actually Knows Your Products',
      description: 'Your customers get instant answers about YOUR products, policies, and shipping — not generic chatbot responses. Reduce support tickets by 70%.',
      capabilities: [
        'Knows every product detail',
        'Answers in customer\'s language',
        'Handles FAQs automatically',
        'Escalates when needed'
      ],
      color: 'emerald',
      link: '/features/customer-chatbot'
    },
    {
      icon: Eye,
      title: 'Spy on Competitor Prices',
      tagline: 'Never Get Undercut Again',
      description: 'Track competitor pricing in real-time. Get alerts when you\'re being undercut. Make data-driven pricing decisions to stay competitive.',
      capabilities: [
        'Real-time price monitoring',
        'Instant undercut alerts',
        'Price history tracking',
        'Competitive analysis'
      ],
      color: 'amber',
      link: '/features/competitor-watch'
    },
    {
      icon: Package,
      title: 'Never Run Out of Stock',
      tagline: 'AI Predicts What You Need',
      description: 'Stop losing sales to stockouts. AI analyzes your sales patterns and tells you exactly what to reorder and when — before you run out.',
      capabilities: [
        'Demand forecasting',
        'Restock alerts',
        'Dead stock identification',
        'Supplier order lists'
      ],
      color: 'blue',
      link: '/features/inventory-autopilot'
    },
    {
      icon: PenTool,
      title: 'Content on Autopilot',
      tagline: 'Descriptions, Tags & More in Seconds',
      description: 'Generate SEO-optimized product descriptions, tags, and summaries with one click. Bulk generate for hundreds of products. Auto-save to WooCommerce.',
      capabilities: [
        'Product descriptions',
        'SEO-friendly tags',
        'Review summaries',
        'Bulk generation'
      ],
      color: 'pink',
      link: '/features/content-studio'
    },
    {
      icon: Heart,
      title: 'Store Health at a Glance',
      tagline: 'One Score to Know Everything',
      description: 'A single number (0-100) tells you how your store is performing. Revenue, conversion, inventory, customers — all distilled into actionable insights.',
      capabilities: [
        'Unified health score',
        'Category breakdown',
        'Trend analysis',
        'AI recommendations'
      ],
      color: 'red',
      link: '/features/health-score'
    }
  ];

  const colorClasses = {
    purple: {
      bg: 'bg-purple-100 dark:bg-purple-900/30',
      text: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-200 dark:border-purple-800',
      gradient: 'from-purple-500 to-purple-600'
    },
    emerald: {
      bg: 'bg-emerald-100 dark:bg-emerald-900/30',
      text: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-200 dark:border-emerald-800',
      gradient: 'from-emerald-500 to-emerald-600'
    },
    amber: {
      bg: 'bg-amber-100 dark:bg-amber-900/30',
      text: 'text-amber-600 dark:text-amber-400',
      border: 'border-amber-200 dark:border-amber-800',
      gradient: 'from-amber-500 to-amber-600'
    },
    blue: {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-800',
      gradient: 'from-blue-500 to-blue-600'
    },
    pink: {
      bg: 'bg-pink-100 dark:bg-pink-900/30',
      text: 'text-pink-600 dark:text-pink-400',
      border: 'border-pink-200 dark:border-pink-800',
      gradient: 'from-pink-500 to-pink-600'
    },
    red: {
      bg: 'bg-red-100 dark:bg-red-900/30',
      text: 'text-red-600 dark:text-red-400',
      border: 'border-red-200 dark:border-red-800',
      gradient: 'from-red-500 to-red-600'
    }
  };

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800/50">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Mind-Boggling Features
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Everything Changes When You
            <br />
            <span className="gradient-text">Just Ask Your Store</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            WooASM isn't just another plugin. It's a complete paradigm shift in how you manage your WooCommerce store.
            Type what you want, get it done. No menus. No clicking. No complexity.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const colors = colorClasses[feature.color];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link
                  to={feature.link}
                  className={`block h-full bg-white dark:bg-gray-800 rounded-2xl p-6 border ${colors.border} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center mb-5`}>
                    <feature.icon className={`w-7 h-7 ${colors.text}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className={`text-sm font-medium ${colors.text} mb-3`}>
                    {feature.tagline}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-5 text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  <ul className="space-y-2 mb-5">
                    {feature.capabilities.map((cap, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <Check className={`w-4 h-4 ${colors.text} flex-shrink-0`} />
                        {cap}
                      </li>
                    ))}
                  </ul>

                  <div className={`flex items-center gap-2 ${colors.text} font-medium text-sm group-hover:gap-3 transition-all`}>
                    Learn more
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            );
          })}        </div>

        {/* See All Features CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/features"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all hover:scale-105"
          >
            <Zap className="w-5 h-5" />
            See All 16 Features
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PowerFeaturesSection;
