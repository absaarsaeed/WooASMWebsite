import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Rocket, MessageSquare, Bot, Brain, PenTool, BarChart3, ChevronRight, BookOpen, ExternalLink } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';

const docsData = [
  {
    title: 'Getting Started',
    icon: 'Rocket',
    description: 'Quick setup guide to get WooASM running on your store',
    articles: [
      { title: 'Installing WooASM', slug: 'installing-wooasm', readTime: '3 min' },
      { title: 'Adding Your API Key', slug: 'adding-api-key', readTime: '2 min' },
      { title: 'Activating Your License', slug: 'activating-license', readTime: '2 min' },
      { title: 'Your First Conversation', slug: 'first-conversation', readTime: '5 min' },
      { title: 'Understanding the Dashboard', slug: 'dashboard-overview', readTime: '4 min' }
    ]
  },
  {
    title: 'AI Assistant',
    icon: 'MessageSquare',
    description: 'Learn how to get the most out of your AI store assistant',
    articles: [
      { title: 'What Can I Ask?', slug: 'what-can-i-ask', readTime: '5 min' },
      { title: 'Example Commands', slug: 'example-commands', readTime: '8 min' },
      { title: 'Understanding Plans & Confirmations', slug: 'plans-confirmations', readTime: '4 min' },
      { title: 'Safety Features', slug: 'safety-features', readTime: '3 min' },
      { title: 'Troubleshooting Responses', slug: 'troubleshooting-responses', readTime: '5 min' }
    ]
  },
  {
    title: 'Customer Chatbot',
    icon: 'Bot',
    description: 'Set up and customize your AI customer support chatbot',
    articles: [
      { title: 'Enabling the Chatbot', slug: 'enabling-chatbot', readTime: '3 min' },
      { title: 'Customizing Appearance', slug: 'customizing-appearance', readTime: '5 min' },
      { title: 'Training with AI Memory', slug: 'training-ai-memory', readTime: '6 min' },
      { title: 'Rate Limits & Moderation', slug: 'rate-limits', readTime: '4 min' },
      { title: 'Viewing Chat Analytics', slug: 'chat-analytics', readTime: '4 min' }
    ]
  },
  {
    title: 'AI Memory',
    icon: 'Brain',
    description: 'Teach the AI about your store policies and products',
    articles: [
      { title: 'What is AI Memory?', slug: 'what-is-ai-memory', readTime: '3 min' },
      { title: 'Adding Store Policies', slug: 'adding-policies', readTime: '4 min' },
      { title: 'Adding Product Info', slug: 'adding-product-info', readTime: '5 min' },
      { title: 'Best Practices', slug: 'memory-best-practices', readTime: '6 min' },
      { title: 'Memory Templates', slug: 'memory-templates', readTime: '4 min' }
    ]
  },
  {
    title: 'Content Studio',
    icon: 'PenTool',
    description: 'Generate product descriptions, tags, and more with AI',
    articles: [
      { title: 'Generating Descriptions', slug: 'generating-descriptions', readTime: '4 min' },
      { title: 'Creating Product Tags', slug: 'creating-tags', readTime: '3 min' },
      { title: 'Review Summaries', slug: 'review-summaries', readTime: '4 min' },
      { title: 'Auto-Save Feature', slug: 'auto-save', readTime: '2 min' },
      { title: 'Bulk Generation', slug: 'bulk-generation', readTime: '5 min' }
    ]
  },
  {
    title: 'Store Management',
    icon: 'BarChart3',
    description: 'Analytics, health scores, and inventory management',
    articles: [
      { title: 'Understanding Health Score', slug: 'health-score', readTime: '5 min' },
      { title: 'Reading Store Insights', slug: 'store-insights', readTime: '6 min' },
      { title: 'Inventory Autopilot Setup', slug: 'inventory-autopilot', readTime: '7 min' },
      { title: 'Customer Segments', slug: 'customer-segments', readTime: '5 min' }
    ]
  }
];

const iconMap = {
  Rocket, MessageSquare, Bot, Brain, PenTool, BarChart3
};

const DocsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState(null);

  const filteredDocs = searchQuery
    ? docsData.map(category => ({
        ...category,
        articles: category.articles.filter(article =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.articles.length > 0)
    : docsData;

  return (
    <div className="min-h-screen">
      <SEO
        title="Documentation - Knowledge Base & Help Center"
        description="Learn how to use WooASM with our comprehensive documentation. Guides, tutorials, and step-by-step instructions for getting the most out of your AI store manager."
        keywords="WooASM documentation, help center, tutorials, guides, WooCommerce AI help, knowledge base"
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
                Everything you need to master WooASM and transform your store management
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

        {/* Quick Links */}
        <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="container-wide">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">Quick links:</span>
              <Link to="/docs#getting-started" className="text-sm text-purple-600 dark:text-purple-400 hover:underline">Getting Started</Link>
              <Link to="/docs#ai-assistant" className="text-sm text-purple-600 dark:text-purple-400 hover:underline">AI Assistant Guide</Link>
              <Link to="/docs#chatbot" className="text-sm text-purple-600 dark:text-purple-400 hover:underline">Chatbot Setup</Link>
              <Link to="/features" className="text-sm text-purple-600 dark:text-purple-400 hover:underline">All Features →</Link>
            </div>
          </div>
        </section>

        {/* Docs Grid */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDocs.map((category, index) => {
                const IconComponent = iconMap[category.icon] || BookOpen;
                const isExpanded = expandedCategory === category.title;
                
                return (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {category.title}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    <ul className="space-y-1">
                      {(isExpanded ? category.articles : category.articles.slice(0, 4)).map((article) => (
                        <li key={article.slug}>
                          <Link
                            to={`/docs/${article.slug}`}
                            className="flex items-center justify-between py-2 px-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
                          >
                            <span className="text-sm">{article.title}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-400">{article.readTime}</span>
                              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>

                    {category.articles.length > 4 && (
                      <button
                        onClick={() => setExpandedCategory(isExpanded ? null : category.title)}
                        className="mt-3 text-sm text-purple-600 dark:text-purple-400 hover:underline"
                      >
                        {isExpanded ? 'Show less' : `View all ${category.articles.length} articles`}
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Video Tutorials */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Video Tutorials
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Learn visually with our step-by-step video guides
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Getting Started in 5 Minutes', duration: '5:32', thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop' },
                { title: 'Mastering the AI Assistant', duration: '8:45', thumbnail: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=225&fit=crop' },
                { title: 'Setting Up Customer Chatbot', duration: '6:18', thumbnail: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=225&fit=crop' }
              ].map((video, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 group cursor-pointer"
                >
                  <div className="relative">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-40 object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                        <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-t-transparent border-b-transparent border-l-purple-600 ml-1" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                      {video.duration}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {video.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container-wide">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Can't Find What You Need?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Our support team is here to help. Reach out and we'll get back to you within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact" className="btn-primary">
                  Contact Support
                </Link>
                <a 
                  href="https://discord.gg/wooasm" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <ExternalLink className="w-4 h-4" />
                  Join Discord Community
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DocsPage;
