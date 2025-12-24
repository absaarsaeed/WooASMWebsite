import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 dark:from-purple-900 dark:via-purple-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
      </div>

      <div className="container-wide relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Ready to Transform Your Store?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-purple-100 mb-10"
          >
            Join 500+ store owners who are saving time and growing revenue with WooASM.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-4"
          >
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-700 font-semibold rounded-xl hover:bg-purple-50 transition-all duration-200 hover:scale-105 shadow-2xl shadow-purple-900/30"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>

            <p className="text-purple-200 text-sm">
              No credit card required • 5-minute setup • Cancel anytime
            </p>

            <p className="text-purple-300 text-sm flex items-center gap-2 mt-4">
              <Mail className="w-4 h-4" />
              Questions? Contact us at hello@wooasm.ai
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
