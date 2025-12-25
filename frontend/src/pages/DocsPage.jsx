import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Rocket, MessageSquare, Bot, Brain, PenTool, BarChart3, ChevronRight, BookOpen } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';
import { docsCategories } from '../data/mock';

const iconMap = {
  Rocket, MessageSquare, Bot, Brain, PenTool, BarChart3
};

const DocsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen">
      <SEO
        title="Documentation - Knowledge Base & Help Center"
        description="Learn how to use WooASM with our comprehensive documentation. Guides, tutorials, and API references for getting the most out of your AI store manager."
        keywords="WooASM documentation, help center, tutorials, guides, API docs, WooCommerce AI help"
        url="https://wooasm.ai/docs"
      />
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
                <span className="gradient-text">Knowledge Base</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-700 dark:text-gray-400 mb-10"
              >
                Everything you need to get started with WooASM
              </motion.p>

              {/* Search */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative max-w-xl mx-auto"
              >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Docs Grid */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {docsCategories.map((category, index) => {
                const IconComponent = iconMap[category.icon] || BookOpen;
                
                return (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {category.title}
                      </h3>
                    </div>

                    <ul className="space-y-2">
                      {category.articles.map((article, i) => (
                        <li key={i}>
                          <Link
                            to="#"
                            className="flex items-center justify-between py-2 px-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
                          >
                            <span>{article}</span>
                            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
          <div className="container-wide">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Can't Find What You Need?
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact" className="btn-primary">
                  Contact Support
                </Link>
                <a href="#" className="btn-secondary">
                  Join Discord Community
                </a>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-4">
                We typically respond within 24 hours.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DocsPage;
