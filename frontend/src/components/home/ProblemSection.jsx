import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock, Frown, Brain } from 'lucide-react';

const ProblemSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const problems = [
    {
      icon: Clock,
      title: 'Hours Wasted on Data',
      description: 'Jumping between dashboards, spreadsheets, and reports just to understand your store.',
      emoji: '😰'
    },
    {
      icon: Frown,
      title: 'Missed Opportunities',
      description: "Stockouts, pricing mistakes, and angry customers because you can't monitor 24/7.",
      emoji: '📉'
    },
    {
      icon: Brain,
      title: 'Content Burnout',
      description: 'Writing descriptions, tags, and responses for hundreds of products is exhausting.',
      emoji: '🤯'
    }
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800/50">
      <div className="container-wide">
        {/* Problem Section */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title mb-4"
          >
            Still Managing Your Store the <span className="text-red-500">Hard Way</span>?
          </motion.h2>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 text-center"
            >
              <span className="text-5xl mb-6 block">{problem.emoji}</span>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {problem.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Solution Intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-6">
            <span className="text-2xl">↓</span>
          </div>
          <h2 className="section-title mb-6">
            There's a <span className="gradient-text">Better Way</span>
          </h2>
          <p className="section-subtitle mx-auto">
            WooASM transforms how you manage your store. Just ask questions in plain English 
            and get instant answers, insights, and actions — like having a store manager who 
            knows everything and never takes a day off.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
