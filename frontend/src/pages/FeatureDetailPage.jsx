import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Play, MessageSquare, Bot, BarChart3, Heart, Package, Users, FlaskConical, PenTool, TrendingUp, Eye, Star, Headphones, Shield, ClipboardList, Brain, Download } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';
import { features, featureContent, blogPosts } from '../data/mock';

const iconMap = {
  MessageSquare, Bot, BarChart3, Heart, Package, Users,
  FlaskConical, PenTool, TrendingUp, Eye, Star, Headphones,
  Shield, ClipboardList, Brain, Download
};

const FeatureDetailPage = () => {
  const { featureId } = useParams();
  const feature = features.find(f => f.id === featureId);

  if (!feature) {
    return <Navigate to="/features" replace />;
  }

  const IconComponent = iconMap[feature.icon] || MessageSquare;
  const content = featureContent[featureId] || {
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop',
    problem: 'Managing this aspect of your store manually takes significant time and effort. Without the right tools, you\'re likely missing opportunities and working harder than you need to.',
    solution: `WooASM's ${feature.title} automates and simplifies this process, giving you instant insights and actions that would otherwise take hours.`,
    howItWorks: [
      { step: 1, title: 'Connect', description: 'WooASM connects to your WooCommerce data automatically.' },
      { step: 2, title: 'Analyze', description: 'AI analyzes your store data to provide intelligent insights.' },
      { step: 3, title: 'Act', description: 'Take action directly from the dashboard or through chat.' },
      { step: 4, title: 'Monitor', description: 'Track results and improvements over time.' }
    ],
    capabilities: [
      'Automated monitoring and alerts',
      'AI-powered insights and recommendations',
      'One-click actions and bulk operations',
      'Detailed reporting and analytics',
      'Integration with your existing workflow'
    ],
    useCases: [
      { title: 'Daily Operations', example: 'Check status and take action', result: 'Save time on routine tasks.' },
      { title: 'Problem Detection', example: 'Identify issues early', result: 'Prevent problems before they escalate.' },
      { title: 'Optimization', example: 'Get AI recommendations', result: 'Improve performance continuously.' }
    ],
    demoConversation: [
      { role: 'user', message: 'How can you help me?' },
      { role: 'ai', message: `I can help you with ${feature.title.toLowerCase()}. Just ask me anything and I'll provide instant insights and take actions on your behalf.` }
    ],
    relatedBlogs: ['ai-revolutionizing-woocommerce', 'inventory-management-guide']
  };

  // Find related features
  const relatedFeatures = features
    .filter(f => f.category === feature.category && f.id !== feature.id)
    .slice(0, 3);

  // Find related blog posts
  const relatedBlogPosts = blogPosts.filter(post => 
    content.relatedBlogs?.includes(post.id)
  ).slice(0, 3);

  return (
    <div className="min-h-screen">
      <SEO
        title={feature.seo?.title || feature.title}
        description={feature.seo?.description || feature.shortDesc}
        keywords={feature.seo?.keywords}
        url={`https://wooasm.ai/features/${feature.id}`}
        image={content.heroImage}
      />
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

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
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
                  className="text-xl text-gray-700 dark:text-gray-300 mb-8"
                >
                  {feature.shortDesc}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap gap-4"
                >
                  <Link to="/pricing" className="btn-primary">
                    Get Started Free
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <button className="btn-ghost">
                    <Play className="w-5 h-5" />
                    Watch Demo
                  </button>
                </motion.div>

                {/* Plan Badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-3 mt-8"
                >
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Available on:</span>
                  {feature.plans.includes('free') && (
                    <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium">
                      Free
                    </span>
                  )}
                  {feature.plans.includes('starter') && (
                    <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium">
                      Starter
                    </span>
                  )}
                  {feature.plans.includes('professional') && (
                    <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-medium">
                      Professional
                    </span>
                  )}
                </motion.div>
              </div>

              {/* Hero Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-purple-400/20 rounded-3xl blur-2xl" />
                <img
                  src={content.heroImage}
                  alt={feature.title}
                  className="relative rounded-2xl shadow-2xl w-full"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="inline-block px-4 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm font-medium mb-4">
                  The Problem
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Why You Need This
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {content.problem}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-20 bg-purple-50 dark:bg-purple-950/20">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="inline-block px-4 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-4">
                  The Solution
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  How {feature.title} Helps
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {content.solution}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                How It Works
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Get started in minutes with these simple steps
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {content.howItWorks?.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {index < (content.howItWorks.length - 1) && (
                    <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-purple-300 to-purple-100 dark:from-purple-700 dark:to-purple-900" />
                  )}
                  <div className="relative bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-purple-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Demo Conversation */}
        {content.demoConversation && (
          <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
            <div className="container-wide">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  See It In Action
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Real example of how {feature.title} works
                </p>
              </motion.div>

              <div className="max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  {/* Chat Header */}
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">WooASM Assistant</h3>
                      <p className="text-sm text-emerald-600 dark:text-emerald-400">Online</p>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-6 space-y-4">
                    {content.demoConversation.map((msg, index) => (
                      <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                        {msg.role === 'ai' && (
                          <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          </div>
                        )}
                        <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          msg.role === 'user'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
                        }`}>
                          <p className="text-sm whitespace-pre-line">{msg.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* Capabilities */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  Key Capabilities
                </h2>
                <div className="space-y-4">
                  {content.capabilities?.map((capability, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
                    >
                      <Check className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{capability}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Use Cases */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  Use Cases
                </h2>
                <div className="space-y-6">
                  {content.useCases?.map((useCase, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-purple-50 dark:bg-purple-950/30 rounded-2xl p-6 border border-purple-100 dark:border-purple-900/50"
                    >
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {useCase.title}
                      </h3>
                      <p className="text-purple-700 dark:text-purple-300 font-mono text-sm mb-3">
                        "{useCase.example}"
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        → {useCase.result}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related Blog Posts */}
        {relatedBlogPosts.length > 0 && (
          <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
            <div className="container-wide">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Learn More
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Related articles from our blog
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {relatedBlogPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <Link to={`/blog/${post.slug}`} className="block">
                      <div className="relative overflow-hidden rounded-2xl mb-4">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full bg-purple-600 text-white text-xs font-medium">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {post.excerpt}
                      </p>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Features */}
        {relatedFeatures.length > 0 && (
          <section className="py-20 bg-white dark:bg-gray-900">
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
            <p className="text-purple-100 mb-8 max-w-xl mx-auto">
              Join 500+ store owners who are saving time and growing revenue with WooASM.
            </p>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-700 font-semibold rounded-xl hover:bg-purple-50 transition-all hover:scale-105"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-purple-200 text-sm mt-4">
              No credit card required • 5-minute setup
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FeatureDetailPage;
