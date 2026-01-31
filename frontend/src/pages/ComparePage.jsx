import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight, ChevronRight } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';

const comparisons = {
  'wooasm-vs-woocommerce-admin': {
    title: 'WooASM vs WooCommerce Admin',
    subtitle: 'See how WooASM\'s AI-powered management compares to the default WooCommerce dashboard',
    competitor: 'WooCommerce Admin',
    description: 'Compare WooASM AI Store Manager with the default WooCommerce Admin dashboard. See why hundreds of store owners are switching to AI-powered store management.',
    keywords: 'WooASM vs WooCommerce Admin, WooCommerce dashboard alternative, AI store manager comparison',
    features: [
      { name: 'Natural Language Queries', wooasm: true, competitor: false },
      { name: 'AI-Powered Insights', wooasm: true, competitor: false },
      { name: 'Automated Inventory Alerts', wooasm: true, competitor: false },
      { name: 'One-Click Actions', wooasm: true, competitor: false },
      { name: 'Store Health Score', wooasm: true, competitor: false },
      { name: 'Demand Forecasting', wooasm: true, competitor: false },
      { name: 'Basic Order Management', wooasm: true, competitor: true },
      { name: 'Basic Reports', wooasm: true, competitor: true },
      { name: 'Product Management', wooasm: true, competitor: true },
      { name: 'Customer List', wooasm: true, competitor: true },
      { name: 'Free to Use', wooasm: 'Freemium', competitor: true },
    ],
    bestFor: {
      wooasm: 'Store owners who want to save time with AI automation, get proactive insights, and manage their store through natural conversation.',
      competitor: 'Very small stores with minimal needs who only need basic order and product management.'
    },
    faq: [
      {
        question: 'Can WooASM replace WooCommerce Admin?',
        answer: 'WooASM works alongside WooCommerce Admin, giving you AI-powered capabilities on top of the standard features. You can use both, but most users find they spend 90% less time in WooCommerce Admin after switching to WooASM.'
      },
      {
        question: 'Is WooASM compatible with WooCommerce Admin?',
        answer: 'Yes, WooASM is fully compatible and designed to work with WooCommerce. There are no conflicts, and you can use both tools.'
      },
      {
        question: 'Do I need coding skills to use WooASM?',
        answer: 'No! Unlike configuring WooCommerce Admin, you just talk to WooASM in plain English. Ask questions like "What were my sales last week?" and get instant answers.'
      }
    ]
  },
  'wooasm-vs-jetpack': {
    title: 'WooASM vs Jetpack',
    subtitle: 'Compare AI-powered store management with Jetpack\'s general WordPress tools',
    competitor: 'Jetpack',
    description: 'Compare WooASM with Jetpack for WooCommerce store management. While Jetpack offers general WordPress features, WooASM is purpose-built for e-commerce.',
    keywords: 'WooASM vs Jetpack, Jetpack WooCommerce alternative, WooCommerce AI plugin',
    features: [
      { name: 'AI Store Assistant', wooasm: true, competitor: false },
      { name: 'E-commerce Focused', wooasm: true, competitor: false },
      { name: 'Inventory Management', wooasm: true, competitor: false },
      { name: 'Store Health Score', wooasm: true, competitor: false },
      { name: 'Sales Analytics', wooasm: true, competitor: 'Basic' },
      { name: 'Demand Forecasting', wooasm: true, competitor: false },
      { name: 'Site Security', wooasm: false, competitor: true },
      { name: 'Backups', wooasm: false, competitor: true },
      { name: 'CDN/Performance', wooasm: false, competitor: true },
      { name: 'Social Sharing', wooasm: false, competitor: true },
    ],
    bestFor: {
      wooasm: 'WooCommerce store owners who need powerful AI-driven e-commerce management, analytics, and automation.',
      competitor: 'WordPress site owners who need general security, backups, and performance features (not e-commerce specific).'
    },
    faq: [
      {
        question: 'Can I use both WooASM and Jetpack?',
        answer: 'Yes! Many users use Jetpack for security and backups, and WooASM for e-commerce management. They serve different purposes and work great together.'
      },
      {
        question: 'Does WooASM provide site security?',
        answer: 'WooASM focuses on e-commerce management, not general WordPress security. We recommend using a dedicated security plugin alongside WooASM.'
      },
      {
        question: 'Which should I choose for my store?',
        answer: 'If you need better store management, analytics, and AI assistance, choose WooASM. If you need WordPress security and backups, choose Jetpack. Most successful stores use both.'
      }
    ]
  },
  'wooasm-vs-woocommerce-analytics': {
    title: 'WooASM vs WooCommerce Analytics',
    subtitle: 'AI-powered insights vs basic reporting - see the difference',
    competitor: 'WooCommerce Analytics',
    description: 'Compare WooASM\'s AI-powered analytics with standard WooCommerce Analytics. Get proactive insights instead of just reports.',
    keywords: 'WooASM vs WooCommerce Analytics, WooCommerce reporting alternative, AI analytics WooCommerce',
    features: [
      { name: 'Natural Language Queries', wooasm: true, competitor: false },
      { name: 'AI-Generated Insights', wooasm: true, competitor: false },
      { name: 'Proactive Recommendations', wooasm: true, competitor: false },
      { name: 'Store Health Score', wooasm: true, competitor: false },
      { name: 'Predictive Analytics', wooasm: true, competitor: false },
      { name: 'Custom Dashboards', wooasm: true, competitor: 'Limited' },
      { name: 'Basic Sales Reports', wooasm: true, competitor: true },
      { name: 'Order Reports', wooasm: true, competitor: true },
      { name: 'Product Reports', wooasm: true, competitor: true },
      { name: 'Free to Use', wooasm: 'Freemium', competitor: true },
    ],
    bestFor: {
      wooasm: 'Store owners who want actionable insights, not just data. WooASM tells you what to do, not just what happened.',
      competitor: 'Stores that only need basic historical reporting and don\'t mind manually analyzing data.'
    },
    faq: [
      {
        question: 'How is WooASM analytics different?',
        answer: 'WooCommerce Analytics shows you data. WooASM tells you what the data means and what you should do about it. Instead of staring at charts, ask "Why did sales drop last week?" and get an actual answer.'
      },
      {
        question: 'Will I lose WooCommerce Analytics data?',
        answer: 'No, WooASM works alongside WooCommerce Analytics. All your historical data is preserved and WooASM uses it to provide better insights.'
      },
      {
        question: 'Can WooASM predict future trends?',
        answer: 'Yes! WooASM uses AI to forecast demand, predict stockouts, and identify trends before they become obvious in standard reports.'
      }
    ]
  }
};

const ComparePage = () => {
  const { slug } = useParams();
  const comparison = comparisons[slug];

  if (!comparison) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Comparison not found</h1>
            <Link to="/" className="text-purple-600 hover:underline">Go back home</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const breadcrumbs = [
    { name: 'Home', url: 'https://wooasm.com' },
    { name: 'Compare', url: 'https://wooasm.com/compare' },
    { name: comparison.title, url: `https://wooasm.com/compare/${slug}` }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEO
        title={comparison.title}
        description={comparison.description}
        keywords={comparison.keywords}
        url={`https://wooasm.com/compare/${slug}`}
        breadcrumbs={breadcrumbs}
        faq={comparison.faq}
      />
      <Header />

      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 pt-20">
        <div className="container-wide py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Link to="/" className="hover:text-purple-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-white">{comparison.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container-wide text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {comparison.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              {comparison.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">Feature</th>
                    <th className="text-center py-4 px-4 font-semibold text-purple-600">WooASM</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-600 dark:text-gray-400">{comparison.competitor}</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.features.map((feature, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-4 px-4 text-gray-900 dark:text-white">{feature.name}</td>
                      <td className="py-4 px-4 text-center">
                        {feature.wooasm === true ? (
                          <Check className="w-6 h-6 text-green-500 mx-auto" />
                        ) : feature.wooasm === false ? (
                          <X className="w-6 h-6 text-gray-300 mx-auto" />
                        ) : (
                          <span className="text-sm text-gray-600 dark:text-gray-400">{feature.wooasm}</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {feature.competitor === true ? (
                          <Check className="w-6 h-6 text-green-500 mx-auto" />
                        ) : feature.competitor === false ? (
                          <X className="w-6 h-6 text-gray-300 mx-auto" />
                        ) : (
                          <span className="text-sm text-gray-600 dark:text-gray-400">{feature.competitor}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Best For */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Who Is It Best For?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-500">
              <h3 className="text-xl font-bold text-purple-600 mb-4">WooASM</h3>
              <p className="text-gray-700 dark:text-gray-300">{comparison.bestFor.wooasm}</p>
            </div>
            <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400 mb-4">{comparison.competitor}</h3>
              <p className="text-gray-600 dark:text-gray-400">{comparison.bestFor.competitor}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {comparison.faq.map((item, index) => (
              <div key={index} className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.question}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="container-wide text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to try WooASM?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Start free and see the difference AI makes.
          </p>
          <Link to="/signup" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ComparePage;
