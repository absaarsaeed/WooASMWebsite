import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { featuresData } from '../data/featuresData';

const FeaturesHubPage = () => {
  const features = Object.values(featuresData);
  
  const categories = {
    'AI & Automation': ['ai-store-assistant', 'content-studio', 'inventory-autopilot'],
    'Analytics & Insights': ['store-health-score', 'store-insights-dashboard', 'analytics-reports', 'customer-insights'],
    'Store Operations': ['order-management', 'coupon-management', 'reviews-management'],
    'Security & Monitoring': ['fraud-alerts', 'activity-logs', 'price-watch']
  };

  const faq = [
    {
      question: 'What makes WooASM different from other WooCommerce plugins?',
      answer: 'WooASM is the only AI-powered store manager that lets you control your entire store through natural language. Instead of clicking through menus, you just ask for what you need.'
    },
    {
      question: 'Do I need technical knowledge to use these features?',
      answer: 'No! WooASM is designed for store owners, not developers. Just describe what you want in plain English, and the AI handles the rest.'
    },
    {
      question: 'Are all features included in every plan?',
      answer: 'Core features like the AI Assistant and basic analytics are included in all plans. Advanced features like Inventory Autopilot and Fraud Detection are available on higher-tier plans.'
    },
    {
      question: 'Can I try features before upgrading?',
      answer: 'Yes! Our Free plan includes limited access to most features, so you can try before you buy. You can upgrade anytime to unlock full functionality.'
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Features - AI-Powered WooCommerce Store Management"
        description="Discover all WooASM features: AI assistant, inventory management, analytics, fraud protection, and more. Everything you need to manage your WooCommerce store smarter."
        keywords="WooCommerce features, AI store management, inventory automation, store analytics, WooCommerce plugin features"
        url="https://wooasm.com/features"
        faq={faq}
      />

      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container-wide text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Powerful Features for <span className="gradient-text">Smarter Stores</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Everything you need to manage your WooCommerce store with AI. From inventory automation to fraud protection, we have got you covered.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup" className="btn-primary">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/pricing" className="btn-secondary">
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features by Category */}
      {Object.entries(categories).map(([category, slugs], catIndex) => (
        <section key={category} className={`py-16 lg:py-20 ${catIndex % 2 === 0 ? '' : 'bg-gray-50 dark:bg-gray-900'}`}>
          <div className="container-wide">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              {category}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {slugs.map((slug, index) => {
                const feature = featuresData[slug];
                if (!feature) return null;
                const Icon = feature.icon;
                
                return (
                  <motion.div
                    key={slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={`/features/${slug}`}
                      className="block p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-purple-500 hover:shadow-lg transition-all group h-full"
                    >
                      <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors">
                        {Icon && <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {feature.subtitle}
                      </p>
                      <div className="mt-4 flex items-center text-purple-600 dark:text-purple-400 text-sm font-medium">
                        Learn more
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faq.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="container-wide text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to transform your store?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join 500+ WooCommerce store owners who save 35+ hours every week with WooASM.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup" className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
              Start Free Trial
            </Link>
            <Link to="/pricing" className="px-8 py-4 bg-purple-700 text-white font-semibold rounded-xl hover:bg-purple-800 transition-colors border border-purple-500">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesHubPage;
