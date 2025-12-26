import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  DollarSign, Tag, MessageSquare, Package, ShoppingCart,
  BarChart3, ArrowRight, Quote
} from 'lucide-react';

const UseCasesSection = () => {
  const useCases = [
    {
      icon: DollarSign,
      title: 'Update Prices Instantly',
      command: '"Set price of Blue Widget to $29.99"',
      result: 'Done! Blue Widget price updated to $29.99. Want me to update related products too?',
      color: 'emerald'
    },
    {
      icon: Tag,
      title: 'Create Coupons in Seconds',
      command: '"Create a 20% discount for first-time buyers"',
      result: 'Created coupon WELCOME20 - 20% off for new customers, valid for 30 days. Ready to share!',
      color: 'purple'
    },
    {
      icon: Package,
      title: 'Check Inventory Levels',
      command: '"What products are running low?"',
      result: '5 products below threshold: Blue Widget (3 left), Red Gadget (5 left)... Shall I create restock orders?',
      color: 'amber'
    },
    {
      icon: ShoppingCart,
      title: 'Manage Orders Effortlessly',
      command: '"Show me orders from California this week"',
      result: '12 orders from California totaling $2,340. 2 pending fulfillment. Want to see details?',
      color: 'blue'
    },
    {
      icon: BarChart3,
      title: 'Get Instant Insights',
      command: '"How did we do compared to last month?"',
      result: 'Revenue up 23%! Orders increased by 18%. Your conversion rate improved from 2.1% to 2.8%.',
      color: 'pink'
    },
    {
      icon: MessageSquare,
      title: 'Generate Product Content',
      command: '"Write a description for the new leather jacket"',
      result: 'Here\'s an SEO-optimized description highlighting quality, features, and style. Shall I save it?',
      color: 'indigo'
    }
  ];

  const colorClasses = {
    emerald: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    pink: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400',
    indigo: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
  };

  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Just Type What You Want.
            <br />
            <span className="gradient-text">WooASM Does the Rest.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            No more navigating through endless admin screens. Say goodbye to complex plugins.
            Just tell WooASM what you need in plain English.
          </motion.p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className={`w-12 h-12 rounded-xl ${colorClasses[useCase.color].split(' ').slice(0, 2).join(' ')} flex items-center justify-center mb-4`}>
                <useCase.icon className={`w-6 h-6 ${colorClasses[useCase.color].split(' ').slice(2).join(' ')}`} />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {useCase.title}
              </h3>

              {/* Command */}
              <div className="mb-3">
                <div className="flex items-start gap-2">
                  <Quote className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0 rotate-180" />
                  <p className="text-purple-600 dark:text-purple-400 font-mono text-sm">
                    {useCase.command}
                  </p>
                </div>
              </div>

              {/* AI Response */}
              <div className="bg-white dark:bg-gray-700 rounded-xl p-3 border border-gray-200 dark:border-gray-600">
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {useCase.result}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/features/ai-assistant"
            className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold hover:gap-3 transition-all"
          >
            See all AI Assistant capabilities
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCasesSection;
