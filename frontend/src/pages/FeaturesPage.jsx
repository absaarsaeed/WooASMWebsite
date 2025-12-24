import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, MessageSquare, Bot, BarChart3, Heart, Package, Users, FlaskConical, PenTool, TrendingUp, Eye, Star, Headphones, Shield, ClipboardList, Brain, Download } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { features } from '../data/mock';

const iconMap = {
  MessageSquare, Bot, BarChart3, Heart, Package, Users,
  FlaskConical, PenTool, TrendingUp, Eye, Star, Headphones,
  Shield, ClipboardList, Brain, Download
};

const FeaturesPage = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const categories = [
    { id: 'core', label: 'Core Intelligence', description: 'The brain behind your store management' },
    { id: 'customer', label: 'Customer Experience', description: 'Delight your customers at every touchpoint' },
    { id: 'operations', label: 'Operations & Inventory', description: 'Streamline your day-to-day operations' },
    { id: 'growth', label: 'Growth & Marketing', description: 'Scale your business intelligently' },
    { id: 'content', label: 'Content & Analytics', description: 'Create content and understand your data' }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 gradient-bg">
          <div className="container-wide">
            <div className="text-center max-w-4xl mx-auto">
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
                className="text-xl text-gray-600 dark:text-gray-400"
              >
                WooASM is packed with 16 powerful tools that work together seamlessly.
                No bloat, no complexity — just intelligent features that save you time.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Features by Category */}
        <section className="py-24 bg-white dark:bg-gray-900">
          <div className="container-wide">
            {categories.map((category, catIndex) => {
              const categoryFeatures = features.filter(f => f.category === category.id);
              
              return (
                <div key={category.id} className="mb-20 last:mb-0">
                  {/* Category Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10"
                  >
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {category.label}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {category.description}
                    </p>
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
                            className="feature-card h-full flex flex-col group"
                          >
                            <div className="flex items-start gap-4 mb-4">
                              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                                <IconComponent className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  {feature.title}
                                </h3>
                                <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                                  {feature.tagline}
                                </p>
                              </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm flex-1">
                              {feature.shortDesc}
                            </p>
                            <div className="mt-4 flex items-center justify-between">
                              <div className="flex gap-1">
                                {feature.plans.includes('free') && (
                                  <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs">
                                    Free
                                  </span>
                                )}
                                {feature.plans.includes('starter') && !feature.plans.includes('free') && (
                                  <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs">
                                    Starter+
                                  </span>
                                )}
                                {feature.plans.length === 1 && feature.plans[0] === 'professional' && (
                                  <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs">
                                    Pro
                                  </span>
                                )}
                              </div>
                              <span className="text-purple-600 dark:text-purple-400 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
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

        {/* CTA */}
        <section className="py-20 bg-purple-600 dark:bg-purple-900">
          <div className="container-wide text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to try all 16 features?
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

export default FeaturesPage;
