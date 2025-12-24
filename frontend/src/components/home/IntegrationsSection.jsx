import React from 'react';
import { motion } from 'framer-motion';
import { integrations } from '../../data/mock';

const IntegrationsSection = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Works With Your Favorite Tools
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Built for WooCommerce, integrates with everything else.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6"
        >
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3 px-6 py-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-2xl">{integration.logo}</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {integration.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400"
        >
          Coming Soon: Shopify migration tool
        </motion.p>
      </div>
    </section>
  );
};

export default IntegrationsSection;
