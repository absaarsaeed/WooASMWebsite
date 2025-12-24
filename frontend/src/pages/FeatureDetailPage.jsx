import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, MessageSquare, Bot, BarChart3, Heart, Package, Users, FlaskConical, PenTool, TrendingUp, Eye, Star, Headphones, Shield, ClipboardList, Brain, Download } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { features } from '../data/mock';

const iconMap = {
  MessageSquare, Bot, BarChart3, Heart, Package, Users,
  FlaskConical, PenTool, TrendingUp, Eye, Star, Headphones,
  Shield, ClipboardList, Brain, Download
};

// Feature-specific content
const featureContent = {
  'ai-assistant': {
    problem: 'Running an ecommerce store means constantly jumping between dashboards, spreadsheets, and admin panels. Finding a simple answer like "what\'s my best seller this month?" requires clicking through multiple screens, exporting data, and doing manual analysis. Store owners waste 10+ hours per week just trying to understand what\'s happening in their own store.',
    solution: 'WooASM\'s AI Assistant lets you simply ask. Type "what\'s my best seller this month?" and get an instant, accurate answer with context. No more dashboard diving. But it doesn\'t stop at questions. The AI can also take actions — create coupons, update prices, adjust inventory — all through natural conversation. And every action requires your confirmation first.',
    capabilities: [
      'Ask anything about your store in plain English',
      'Get instant, data-backed responses',
      'Create coupons, update prices, and manage inventory',
      'Review and confirm actions before execution',
      'Complete action logging with one-click restore'
    ],
    examples: [
      '"What\'s my revenue this week compared to last week?"',
      '"Show me products running low on stock"',
      '"Create a 20% off coupon for email subscribers"',
      '"List my top 10 best selling products"'
    ]
  },
  'customer-chatbot': {
    problem: 'Customers have questions at all hours. "Do you ship to Canada?" "Is this jacket waterproof?" "What\'s your return policy?" Every unanswered question is a potential lost sale. But hiring 24/7 support is expensive, and generic chatbots give frustrating, irrelevant answers.',
    solution: 'WooASM\'s Customer Chatbot is trained on YOUR store. It knows your products, your policies, and your brand voice. When a customer asks "Do you ship to Canada?", they get YOUR shipping policy — not a generic "Please contact support." And it\'s smart about products. When a customer asks about sizing while viewing a product, the chatbot knows which product they\'re looking at.',
    capabilities: [
      'Product-aware responses based on what page customer is viewing',
      'Multi-language support',
      'Brand voice customization',
      'Rate limiting to prevent abuse',
      'Real-time product recommendations'
    ],
    examples: [
      '"Do you ship to Canada?"',
      '"What\'s your return policy?"',
      '"Is this product waterproof?"',
      '"What size should I get?"'
    ]
  }
};

const FeatureDetailPage = () => {
  const { featureId } = useParams();
  const feature = features.find(f => f.id === featureId);

  if (!feature) {
    return <Navigate to="/features" replace />;
  }

  const IconComponent = iconMap[feature.icon] || MessageSquare;
  const content = featureContent[featureId] || {
    problem: 'Managing this aspect of your store manually takes significant time and effort. Without the right tools, you\'re likely missing opportunities and working harder than you need to.',
    solution: `WooASM\'s ${feature.title} automates and simplifies this process, giving you instant insights and actions that would otherwise take hours.`,
    capabilities: [
      'Automated monitoring and alerts',
      'AI-powered insights and recommendations',
      'One-click actions and bulk operations',
      'Detailed reporting and analytics',
      'Integration with your existing workflow'
    ],
    examples: [
      'Get instant summaries and status updates',
      'Automate repetitive tasks',
      'Receive proactive recommendations',
      'Take action with confidence'
    ]
  };

  // Find related features
  const relatedFeatures = features
    .filter(f => f.category === feature.category && f.id !== feature.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 gradient-bg">
          <div className="container-wide">
            <Link
              to="/features"
              className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium mb-8 hover:gap-3 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              All Features
            </Link>

            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <IconComponent className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                    {feature.title}
                  </h1>
                  <p className="text-lg text-purple-600 dark:text-purple-400 font-medium">
                    {feature.tagline}
                  </p>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-600 dark:text-gray-400 mb-8"
              >
                {feature.shortDesc}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link to="/pricing" className="btn-primary">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6"
              >
                The Problem
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed"
              >
                {content.problem}
              </motion.p>
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6"
              >
                The Solution
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed"
              >
                {content.solution}
              </motion.p>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8"
              >
                Key Capabilities
              </motion.h2>
              <div className="space-y-4">
                {content.capabilities.map((capability, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800"
                  >
                    <Check className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{capability}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Examples */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8"
              >
                Example Use Cases
              </motion.h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {content.examples.map((example, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
                  >
                    <code className="text-sm text-purple-600 dark:text-purple-400">
                      {example}
                    </code>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Availability */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8"
              >
                Available On
              </motion.h2>
              <div className="flex flex-wrap gap-3">
                {feature.plans.includes('free') && (
                  <span className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium">
                    ✅ Free
                  </span>
                )}
                {feature.plans.includes('starter') && (
                  <span className="px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium">
                    ✅ Starter
                  </span>
                )}
                {feature.plans.includes('professional') && (
                  <span className="px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-medium">
                    ✅ Professional
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Related Features */}
        {relatedFeatures.length > 0 && (
          <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
            <div className="container-wide">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Related Features
              </h2>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {relatedFeatures.map((related) => {
                  const RelatedIcon = iconMap[related.icon] || MessageSquare;
                  return (
                    <Link
                      key={related.id}
                      to={`/features/${related.id}`}
                      className="feature-card group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                        <RelatedIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {related.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {related.shortDesc}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-20 bg-purple-600 dark:bg-purple-900">
          <div className="container-wide text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to try {feature.title}?
            </h2>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-700 font-semibold rounded-xl hover:bg-purple-50 transition-all hover:scale-105"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FeatureDetailPage;
