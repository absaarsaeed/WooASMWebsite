import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Sparkles, Bug, Zap, ArrowRight } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const ChangelogPage = () => {
  const releases = [
    {
      version: '2.1.0',
      date: '2024-12-15',
      type: 'feature',
      title: 'Customer AI Chatbot Launch',
      changes: [
        'New customer-facing AI chatbot widget',
        'Product-aware responses',
        'Multi-language support',
        'Customizable appearance',
        'Rate limiting and moderation'
      ]
    },
    {
      version: '2.0.5',
      date: '2024-12-10',
      type: 'improvement',
      title: 'Performance Improvements',
      changes: [
        'Faster AI response times (30% improvement)',
        'Reduced memory usage',
        'Better caching for product data',
        'Optimized database queries'
      ]
    },
    {
      version: '2.0.4',
      date: '2024-12-05',
      type: 'bugfix',
      title: 'Bug Fixes',
      changes: [
        'Fixed inventory sync issues',
        'Resolved dashboard loading errors',
        'Fixed coupon creation edge cases',
        'Improved error messages'
      ]
    },
    {
      version: '2.0.0',
      date: '2024-11-20',
      type: 'feature',
      title: 'Major Release: Health Score & Insights',
      changes: [
        'New Store Health Score feature',
        'Redesigned Store Insights dashboard',
        'Customer Intelligence module',
        'Growth Experiments Lab',
        'New AI Memory system'
      ]
    },
    {
      version: '1.5.0',
      date: '2024-10-15',
      type: 'feature',
      title: 'Content Studio',
      changes: [
        'AI-powered product descriptions',
        'Automatic tag generation',
        'Review summaries',
        'Bulk content generation',
        'Auto-save to products'
      ]
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'feature':
        return <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      case 'bugfix':
        return <Bug className="w-5 h-5 text-red-500" />;
      case 'improvement':
        return <Zap className="w-5 h-5 text-amber-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-purple-600" />;
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'feature':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300';
      case 'bugfix':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      case 'improvement':
        return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 gradient-bg">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6"
              >
                <span className="gradient-text">Changelog</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-600 dark:text-gray-400"
              >
                See what's new in WooASM
              </motion.p>
            </div>
          </div>
        </section>

        {/* Changelog */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

                {/* Releases */}
                <div className="space-y-12">
                  {releases.map((release, index) => (
                    <motion.div
                      key={release.version}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative pl-20"
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-5 w-6 h-6 rounded-full bg-white dark:bg-gray-800 border-4 border-purple-600 dark:border-purple-400" />

                      {/* Content */}
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <span className="px-3 py-1 rounded-full bg-purple-600 text-white text-sm font-bold">
                            v{release.version}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeBadge(release.type)}`}>
                            {release.type.charAt(0).toUpperCase() + release.type.slice(1)}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                            <Calendar className="w-4 h-4" />
                            {new Date(release.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                          {release.title}
                        </h3>

                        <ul className="space-y-2">
                          {release.changes.map((change, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                              {getTypeIcon(release.type)}
                              <span>{change}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ChangelogPage;
