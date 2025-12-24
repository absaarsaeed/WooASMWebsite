import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { costSavings } from '../../data/mock';
import { Calculator, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CostSavingsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const totalManual = costSavings.reduce((acc, item) => acc + item.manual, 0);
  const totalWithWooasm = costSavings.reduce((acc, item) => acc + item.withWooasm, 0);
  const totalSavings = costSavings.reduce((acc, item) => acc + item.savings, 0);

  return (
    <section className="py-24 bg-gradient-to-b from-purple-50 to-white dark:from-purple-950/20 dark:to-gray-900">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title mb-4"
          >
            Save <span className="gradient-text">$2,000+/Month</span> in Labor Costs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-subtitle mx-auto"
          >
            See how WooASM saves you time on everyday tasks
          </motion.p>
        </div>

        {/* Comparison Table */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-gray-100/50 dark:shadow-none border border-gray-100 dark:border-gray-700 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Task</div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">Manual Time</div>
              <div className="text-sm font-semibold text-purple-600 dark:text-purple-400 text-center">With WooASM</div>
              <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 text-center">Savings</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {costSavings.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="grid grid-cols-4 gap-4 px-6 py-4 items-center"
                >
                  <div className="text-gray-900 dark:text-white font-medium">{item.task}</div>
                  <div className="text-center">
                    <span className="text-gray-600 dark:text-gray-400">{item.manual} hrs/week</span>
                  </div>
                  <div className="text-center">
                    <span className="text-purple-600 dark:text-purple-400 font-medium">
                      {item.withWooasm === 0 ? '0 hrs' : `${item.withWooasm} hr${item.withWooasm > 1 ? 's' : ''}`}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-semibold text-sm">
                      {item.savings} hrs
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Total Row */}
              <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-purple-50 dark:bg-purple-900/20">
                <div className="text-gray-900 dark:text-white font-bold">TOTAL</div>
                <div className="text-center">
                  <span className="text-gray-900 dark:text-white font-bold">{totalManual} hrs/week</span>
                </div>
                <div className="text-center">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">{totalWithWooasm} hrs/week</span>
                </div>
                <div className="text-center">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-500 text-white font-bold">
                    {totalSavings} hrs
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Calculation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700">
              <Calculator className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <p className="text-gray-900 dark:text-white">
                At <span className="font-bold">$25/hour</span>, that's{' '}
                <span className="font-bold text-purple-600 dark:text-purple-400">$3,500/month</span> in savings.
                <br />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  WooASM pays for itself 10x over.
                </span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CostSavingsSection;
