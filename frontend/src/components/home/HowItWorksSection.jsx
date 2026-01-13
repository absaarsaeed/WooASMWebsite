import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Download, MessageSquareText, Rocket, ArrowRight } from 'lucide-react';

const HowItWorksSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const steps = [
    {
      icon: Download,
      number: '01',
      title: 'Install the Plugin',
      description: 'One-click install from WordPress. No coding required.'
    },
    {
      icon: MessageSquareText,
      number: '02',
      title: 'Start Asking',
      description: 'Chat with your AI assistant. "Show me today\'s sales"'
    },
    {
      icon: Rocket,
      number: '03',
      title: 'Watch It Work',
      description: 'Get insights, take actions, and grow your store.'
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title mb-4"
          >
            Up and Running in <span className="gradient-text">5 Minutes</span>
          </motion.h2>
        </div>

        {/* Steps */}
        <motion.div
          ref={ref}
          className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-purple-300 to-purple-100 dark:from-purple-700 dark:to-purple-900" />
              )}

              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 text-center">
                {/* Number Badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-purple-600 text-white text-sm font-bold">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-6 mt-4">
                  <step.icon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
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
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/pricing" className="btn-primary">
            Get Started in 5 Minutes
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
