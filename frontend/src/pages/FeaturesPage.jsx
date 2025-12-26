import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, MessageSquare, Bot, BarChart3, Heart, Package, Users, 
  FlaskConical, PenTool, TrendingUp, Eye, Star, Headphones, Shield, 
  ClipboardList, Brain, Download, Check, Zap, Sparkles
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';
import { features } from '../data/mock';

const iconMap = {
  MessageSquare, Bot, BarChart3, Heart, Package, Users,
  FlaskConical, PenTool, TrendingUp, Eye, Star, Headphones,
  Shield, ClipboardList, Brain, Download
};

const FeaturesPage = () => {
  const categories = [
    { 
      id: 'core', 
      label: 'Core Intelligence', 
      description: 'The AI brain that powers your entire store management',
      color: 'purple',
      highlight: 'Ask anything, do anything'
    },
    { 
      id: 'customer', 
      label: 'Customer Experience', 
      description: 'Delight your customers with AI-powered support and insights',
      color: 'emerald',
      highlight: 'Reduce support tickets by 70%'
    },
    { 
      id: 'operations', 
      label: 'Operations & Inventory', 
      description: 'Never run out of stock, prevent fraud, track everything',
      color: 'blue',
      highlight: 'Autopilot for your store'
    },
    { 
      id: 'growth', 
      label: 'Growth & Marketing', 
      description: 'Spy on competitors, run experiments, scale intelligently',
      color: 'amber',
      highlight: 'Data-driven growth'
    },
    { 
      id: 'content', 
      label: 'Content & Analytics', 
      description: 'Create content and understand your data with AI',
      color: 'pink',
      highlight: 'Content on autopilot'
    }
  ];

  const colorClasses = {
    purple: {
      bg: 'bg-purple-100 dark:bg-purple-900/30',
      text: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-200 dark:border-purple-800',
      badge: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
    },
    emerald: {
      bg: 'bg-emerald-100 dark:bg-emerald-900/30',
      text: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-200 dark:border-emerald-800',
      badge: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
    },
    blue: {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-800',
      badge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
    },
    amber: {
      bg: 'bg-amber-100 dark:bg-amber-900/30',
      text: 'text-amber-600 dark:text-amber-400',
      border: 'border-amber-200 dark:border-amber-800',
      badge: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
    },
    pink: {
      bg: 'bg-pink-100 dark:bg-pink-900/30',
      text: 'text-pink-600 dark:text-pink-400',
      border: 'border-pink-200 dark:border-pink-800',
      badge: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300'
    }
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="All Features - 16 Powerful AI Tools for WooCommerce"
        description="Discover all 16 powerful features of WooASM: AI Store Assistant, Customer Chatbot, Competitor Price Watch, Inventory Autopilot, Content Studio, and more. Everything you need to run a smarter store."
        keywords="WooCommerce features, AI features, store management tools, ecommerce automation, inventory management, customer chatbot, competitor tracking, content generation"
        url="https://wooasm.ai/features"
        image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop"
      />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 gradient-bg relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-200/40 via-transparent to-transparent dark:from-purple-900/20" />
          
          <div className="container-wide relative">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-6"
              >
                <Sparkles className="w-4 h-4" />
                16 Mind-Boggling Features
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
              >
                Every Feature You Need
                <br />
                <span className="gradient-text">Zero Features You Don't</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-700 dark:text-gray-400 mb-8"
              >
                WooASM is packed with 16 powerful tools that work together seamlessly.
                No bloat, no complexity — just intelligent features that save you 35+ hours every week.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-4 justify-center"
              >
                <Link to="/pricing" className="btn-primary">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/docs" className="btn-secondary">
                  Read Documentation
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="container-wide">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">16</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Powerful Features</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">35+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Hours Saved/Week</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">70%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Support Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">5 min</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Setup Time</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features by Category */}
        <section className="py-24 bg-white dark:bg-gray-900">
          <div className="container-wide">
            {categories.map((category, catIndex) => {
              const categoryFeatures = features.filter(f => f.category === category.id);
              const colors = colorClasses[category.color];
              
              return (
                <div key={category.id} id={category.id} className="mb-24 last:mb-0 scroll-mt-24">
                  {/* Category Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                  >
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                      <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${colors.badge}`}>
                          {category.highlight}
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                          {category.label}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                          {category.description}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {categoryFeatures.length} features
                      </div>
                    </div>
                    <div className={`h-1 w-24 rounded-full ${colors.bg}`} />
                  </motion.div>

                  {/* Features Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryFeatures.map((feature, index) => {
                      const IconComponent = iconMap[feature.icon] || MessageSquare;
                      
                      return (
                        <motion.div
                          key={feature.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Link
                            to={`/features/${feature.id}`}
                            className={`feature-card h-full flex flex-col group border-l-4 ${colors.border}`}
                          >
                            <div className="flex items-start gap-4 mb-4">
                              <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                <IconComponent className={`w-6 h-6 ${colors.text}`} />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  {feature.title}
                                </h3>
                                <p className={`text-sm font-medium ${colors.text}`}>
                                  {feature.tagline}
                                </p>
                              </div>
                            </div>
                            
                            <p className="text-gray-600 dark:text-gray-400 text-sm flex-1 mb-4">
                              {feature.shortDesc}
                            </p>
                            
                            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                              <div className="flex gap-1">
                                {feature.plans.includes('free') && (
                                  <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium">
                                    Free
                                  </span>
                                )}
                                {feature.plans.includes('starter') && !feature.plans.includes('free') && (
                                  <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-medium">
                                    Starter+
                                  </span>
                                )}
                                {feature.plans.length === 1 && feature.plans[0] === 'professional' && (
                                  <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-medium">
                                    Pro
                                  </span>
                                )}
                              </div>
                              <span className={`${colors.text} font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all`}>
                                Learn more
                                <ArrowRight className="w-4 h-4" />
                              </span>
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Compare Plans
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                See which features are included in each plan
              </p>
            </motion.div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-4 px-4 text-gray-900 dark:text-white font-semibold">Feature</th>
                    <th className="text-center py-4 px-4 text-gray-900 dark:text-white font-semibold">Free</th>
                    <th className="text-center py-4 px-4 text-gray-900 dark:text-white font-semibold">Starter</th>
                    <th className="text-center py-4 px-4 text-gray-900 dark:text-white font-semibold">Professional</th>
                  </tr>
                </thead>
                <tbody>
                  {features.slice(0, 10).map((feature) => (
                    <tr key={feature.id} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{feature.title}</td>
                      <td className="py-3 px-4 text-center">
                        {feature.plans.includes('free') ? (
                          <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {feature.plans.includes('starter') || feature.plans.includes('free') ? (
                          <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center mt-8">
              <Link to="/pricing" className="text-purple-600 dark:text-purple-400 font-medium hover:underline">
                View full pricing comparison →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-purple-600 dark:bg-purple-900">
          <div className="container-wide text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Zap className="w-12 h-12 text-purple-200 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Store?
              </h2>
              <p className="text-purple-100 mb-8 max-w-xl mx-auto">
                Join 500+ store owners who are saving 35+ hours every week with WooASM.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-purple-700 font-semibold rounded-xl hover:bg-purple-50 transition-all hover:scale-105"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/request-feature"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/10 transition-all"
                >
                  Request a Feature
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
