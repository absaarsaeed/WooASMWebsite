import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Circle, Clock, Sparkles, ArrowRight } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const RoadmapPage = () => {
  const roadmapItems = [
    {
      quarter: 'Q4 2024',
      status: 'completed',
      items: [
        { title: 'Customer AI Chatbot', status: 'completed', description: 'AI-powered customer support widget' },
        { title: 'Store Health Score', status: 'completed', description: 'Comprehensive store health metrics' },
        { title: 'AI Memory System', status: 'completed', description: 'Store knowledge base for AI' }
      ]
    },
    {
      quarter: 'Q1 2025',
      status: 'in-progress',
      items: [
        { title: 'Advanced Analytics', status: 'in-progress', description: 'Deeper insights and custom reports' },
        { title: 'Competitor Price Watch', status: 'in-progress', description: 'Real-time competitor monitoring' },
        { title: 'Fraud Detection v2', status: 'planned', description: 'ML-powered fraud prevention' }
      ]
    },
    {
      quarter: 'Q2 2025',
      status: 'planned',
      items: [
        { title: 'Shopify Migration Tool', status: 'planned', description: 'Easy migration from Shopify' },
        { title: 'Multi-store Support', status: 'planned', description: 'Manage multiple stores from one dashboard' },
        { title: 'API for Developers', status: 'planned', description: 'Public API for custom integrations' }
      ]
    },
    {
      quarter: 'Q3 2025',
      status: 'planned',
      items: [
        { title: 'Mobile App', status: 'planned', description: 'iOS and Android apps' },
        { title: 'AI Automation Rules', status: 'planned', description: 'Set up automated workflows' },
        { title: 'White-label Solution', status: 'planned', description: 'For agencies and resellers' }
      ]
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-amber-500" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300';
      case 'in-progress':
        return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
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
                <span className="gradient-text">Roadmap</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-600 dark:text-gray-400"
              >
                See what we're building and what's coming next
              </motion.p>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-12">
                {roadmapItems.map((quarter, qIndex) => (
                  <motion.div
                    key={quarter.quarter}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: qIndex * 0.1 }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {quarter.quarter}
                      </h2>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(quarter.status)}`}>
                        {quarter.status === 'completed' ? 'Completed' : quarter.status === 'in-progress' ? 'In Progress' : 'Planned'}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      {quarter.items.map((item, iIndex) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: qIndex * 0.1 + iIndex * 0.05 }}
                          className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700"
                        >
                          <div className="flex items-start justify-between mb-3">
                            {getStatusIcon(item.status)}
                            {item.status === 'in-progress' && (
                              <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-medium">
                                Building
                              </span>
                            )}
                          </div>
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Request Feature */}
        <section className="py-16 bg-purple-600 dark:bg-purple-900">
          <div className="container-wide text-center">
            <Sparkles className="w-12 h-12 text-purple-200 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">
              Have a feature request?
            </h2>
            <p className="text-purple-100 mb-8 max-w-xl mx-auto">
              We love hearing from our users. Share your ideas and help shape the future of WooASM.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-700 font-semibold rounded-xl hover:bg-purple-50 transition-all hover:scale-105"
            >
              Submit a Request
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RoadmapPage;
