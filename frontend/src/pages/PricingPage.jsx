import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, X, ArrowRight, HelpCircle } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { pricingPlans, faqs } from '../data/mock';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen">
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
                Simple, <span className="gradient-text">Transparent</span> Pricing
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-600 dark:text-gray-400 mb-10"
              >
                Start free, upgrade when you're ready. No hidden fees.
              </motion.p>

              {/* Billing Toggle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 p-1.5 rounded-full bg-gray-100 dark:bg-gray-800"
              >
                <button
                  onClick={() => setIsYearly(false)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    !isYearly
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsYearly(true)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                    isYearly
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Yearly
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                    Save 20%
                  </span>
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container-wide">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative rounded-2xl p-8 ${
                    plan.popular
                      ? 'bg-purple-600 text-white ring-4 ring-purple-300 dark:ring-purple-700'
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-amber-900 text-sm font-semibold">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className={`text-xl font-bold mb-2 ${
                      plan.popular ? 'text-white' : 'text-gray-900 dark:text-white'
                    }`}>
                      {plan.name}
                    </h3>
                    <p className={`text-sm ${
                      plan.popular ? 'text-purple-200' : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-4xl font-bold ${
                        plan.popular ? 'text-white' : 'text-gray-900 dark:text-white'
                      }`}>
                        ${isYearly && plan.yearlyPrice ? plan.yearlyPrice : plan.price}
                      </span>
                      {plan.price > 0 && (
                        <span className={`text-sm ${
                          plan.popular ? 'text-purple-200' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          /month
                        </span>
                      )}
                    </div>
                    {isYearly && plan.yearlyPrice && (
                      <p className={`text-sm mt-1 ${
                        plan.popular ? 'text-purple-200' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        Billed annually
                      </p>
                    )}
                  </div>

                  <button
                    className={`w-full py-3 rounded-xl font-semibold transition-all mb-8 ${
                      plan.popular
                        ? 'bg-white text-purple-700 hover:bg-purple-50'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                  >
                    {plan.cta}
                  </button>

                  <div className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check className={`w-5 h-5 flex-shrink-0 ${
                          plan.popular ? 'text-purple-200' : 'text-emerald-500'
                        }`} />
                        <span className={`text-sm ${
                          plan.popular ? 'text-purple-100' : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                    {plan.notIncluded.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 opacity-50">
                        <X className={`w-5 h-5 flex-shrink-0 ${
                          plan.popular ? 'text-purple-300' : 'text-gray-400'
                        }`} />
                        <span className={`text-sm ${
                          plan.popular ? 'text-purple-200' : 'text-gray-500 dark:text-gray-500'
                        }`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enterprise Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 max-w-6xl mx-auto"
            >
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Enterprise
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    For large stores & agencies. Custom pricing with multiple stores, white-label options, and dedicated support.
                  </p>
                </div>
                <button className="btn-secondary whitespace-nowrap">
                  Contact Sales
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
          <div className="container-wide">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.slice(0, 4).map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 px-6 overflow-hidden"
                  >
                    <AccordionTrigger className="py-5 text-left text-gray-900 dark:text-white font-semibold hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
