import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Check, X, Zap, Shield, ArrowRight } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

// Pricing Plans
const pricingPlans = [
  {
    id: 'free',
    name: 'Free Trial',
    price: 0,
    period: '14 days',
    description: 'Try WooASM risk-free',
    features: [
      { text: 'AI Assistant (20 queries/day)', included: true },
      { text: 'Basic product search', included: true },
      { text: 'Order viewing', included: true },
      { text: 'Coupon listing', included: true },
      { text: 'Write operations', included: false },
      { text: 'Bulk actions', included: false },
      { text: 'Advanced insights', included: false },
    ],
    cta: 'Start Free Trial',
    ctaStyle: 'outline',
    popular: false
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    period: 'month',
    description: 'For small stores getting started',
    features: [
      { text: 'AI Assistant (100 queries/day)', included: true },
      { text: 'MAGIC Dashboard', included: true },
      { text: 'Product & order search', included: true },
      { text: 'Customer lookup', included: true },
      { text: 'Sales summary', included: true },
      { text: '1 site', included: true },
      { text: 'Write operations', included: false },
      { text: 'Bulk actions', included: false },
    ],
    cta: 'Get Started',
    ctaStyle: 'primary',
    popular: false
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 79,
    period: 'month',
    description: 'For growing stores that need power',
    features: [
      { text: 'AI Assistant (1,000 queries/day)', included: true },
      { text: 'All 12 dashboards', included: true },
      { text: 'Update prices & stock', included: true, highlight: true },
      { text: 'Create & manage coupons', included: true, highlight: true },
      { text: 'Bulk operations (100 items)', included: true, highlight: true },
      { text: 'Store Insights + Alerts', included: true, highlight: true },
      { text: 'Inventory Intelligence', included: true, highlight: true },
      { text: 'Customer Segments', included: true, highlight: true },
      { text: 'AI Content Studio (100/mo)', included: true, highlight: true },
      { text: 'Activity Logs + Undo', included: true, highlight: true },
      { text: '3 sites', included: true },
      { text: 'Priority support', included: true },
    ],
    cta: 'Get Started',
    ctaStyle: 'primary',
    popular: true
  },
  {
    id: 'agency',
    name: 'Agency',
    price: 199,
    period: 'month',
    description: 'For agencies & large stores',
    features: [
      { text: 'Unlimited AI queries', included: true, highlight: true },
      { text: 'All 101 abilities', included: true, highlight: true },
      { text: 'All 12 dashboards', included: true },
      { text: 'Bulk operations (500 items)', included: true },
      { text: 'A/B Experiments', included: true },
      { text: 'Fraud Alerts', included: true },
      { text: 'Review Management', included: true },
      { text: 'AI Content (500/mo)', included: true },
      { text: '10 sites', included: true },
      { text: 'White-label (coming soon)', included: true },
      { text: 'Dedicated support', included: true },
    ],
    cta: 'Contact Sales',
    ctaStyle: 'outline',
    popular: false
  }
];

// Pricing FAQ
const pricingFaq = [
  {
    question: "What happens after my free trial?",
    answer: "Your free trial lasts 14 days. After that, you can choose to upgrade to a paid plan or continue with limited free features. We'll never charge you without your explicit consent."
  },
  {
    question: "Can I change plans anytime?",
    answer: "Yes! You can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to new features. When downgrading, changes take effect at the end of your billing cycle."
  },
  {
    question: "What's the difference between plans?",
    answer: "The main differences are: query limits (how many times you can ask the AI), write permissions (ability to update products, create coupons), bulk operation limits, and number of sites supported."
  },
  {
    question: "Do you offer annual billing?",
    answer: "Yes! Annual billing saves you 20% compared to monthly billing. All plans are available with annual billing."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express) through our secure payment processor Stripe."
  },
  {
    question: "Is there a money-back guarantee?",
    answer: "Yes! We offer a 30-day money-back guarantee on all paid plans. If WooASM isn't right for you, just contact us for a full refund — no questions asked."
  },
  {
    question: "Can I use WooASM on multiple sites?",
    answer: "Yes, depending on your plan. Starter includes 1 site, Professional includes 3 sites, and Agency includes 10 sites. Need more? Contact us for custom enterprise pricing."
  },
  {
    question: "What counts as an AI query?",
    answer: "Each message you send to the AI assistant counts as one query. Viewing dashboards and browsing features doesn't count against your query limit."
  }
];

const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSelectPlan = async (plan) => {
    if (plan.id === 'free') {
      navigate('/signup');
      return;
    }

    if (!isAuthenticated) {
      navigate('/signup');
      return;
    }

    if (plan.id === 'agency') {
      navigate('/contact');
      return;
    }

    setLoadingPlan(plan.id);
    try {
      const response = await api.createCheckout(plan.id, isYearly ? 'yearly' : 'monthly');
      if (response.success && response.data?.checkoutUrl) {
        window.location.href = response.data.checkoutUrl;
      } else {
        alert(response.message || 'Failed to create checkout. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to create checkout session. Please try again.');
    } finally {
      setLoadingPlan(null);
    }
  };

  const getPrice = (plan) => {
    if (plan.price === 0) return '$0';
    const price = isYearly ? Math.round(plan.price * 0.8) : plan.price;
    return `$${price}`;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEO
        title="Pricing - Simple, Transparent Plans"
        description="WooASM pricing plans for every store size. Start free, upgrade when you need more. 14-day free trial, no credit card required. 30-day money-back guarantee."
        keywords="WooASM pricing, WooCommerce AI pricing, store manager cost, WooASM plans"
        url="https://wooasm.com/pricing"
        faq={pricingFaq}
      />
      <Header />

      <main className="pt-8">
        {/* Hero */}
        <section className="py-16 lg:py-20">
          <div className="container-wide text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Simple, <span className="text-purple-600">Transparent</span> Pricing
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Start free, upgrade when you need more
              </p>

              {/* Billing Toggle */}
              <div className="flex items-center justify-center gap-4 mb-12">
                <span className={`font-medium ${!isYearly ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
                  Monthly
                </span>
                <button
                  onClick={() => setIsYearly(!isYearly)}
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    isYearly ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      isYearly ? 'translate-x-8' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`font-medium ${isYearly ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
                  Yearly
                </span>
                {isYearly && (
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium rounded">
                    Save 20%
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="pb-20 lg:pb-28">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative rounded-2xl p-6 ${
                    plan.popular
                      ? 'bg-gradient-to-b from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800 border-2 border-purple-500 shadow-xl'
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 bg-purple-600 text-white text-sm font-medium rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        {getPrice(plan)}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">/{plan.period}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {plan.description}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        {feature.included ? (
                          <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${feature.highlight ? 'text-purple-600' : 'text-green-500'}`} />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={`text-sm ${
                          feature.included 
                            ? feature.highlight 
                              ? 'text-gray-900 dark:text-white font-medium' 
                              : 'text-gray-600 dark:text-gray-400'
                            : 'text-gray-400 dark:text-gray-500'
                        }`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSelectPlan(plan)}
                    disabled={loadingPlan === plan.id}
                    className={`w-full py-3 rounded-xl font-semibold transition-all ${
                      plan.ctaStyle === 'primary'
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 hover:border-purple-500'
                    } ${loadingPlan === plan.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {loadingPlan === plan.id ? 'Loading...' : plan.cta}
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Guarantee */}
            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 dark:bg-green-900/20 rounded-full">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-green-700 dark:text-green-400 font-medium">
                  30-day money-back guarantee • No questions asked
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-800">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Compare Plans
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                See what's included in each plan
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">Feature</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-600 dark:text-gray-400">Free</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-600 dark:text-gray-400">Starter</th>
                    <th className="text-center py-4 px-4 font-semibold text-purple-600">Professional</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-600 dark:text-gray-400">Agency</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-4 px-4 text-gray-900 dark:text-white">AI Queries</td>
                    <td className="py-4 px-4 text-center text-gray-600 dark:text-gray-400">20/day</td>
                    <td className="py-4 px-4 text-center text-gray-600 dark:text-gray-400">100/day</td>
                    <td className="py-4 px-4 text-center text-purple-600 font-medium">1,000/day</td>
                    <td className="py-4 px-4 text-center text-gray-600 dark:text-gray-400">Unlimited</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-4 px-4 text-gray-900 dark:text-white">Write Operations</td>
                    <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-4 px-4 text-gray-900 dark:text-white">Bulk Operations</td>
                    <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                    <td className="py-4 px-4 text-center text-purple-600 font-medium">100 items</td>
                    <td className="py-4 px-4 text-center text-gray-600 dark:text-gray-400">500 items</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-4 px-4 text-gray-900 dark:text-white">Dashboards</td>
                    <td className="py-4 px-4 text-center text-gray-600 dark:text-gray-400">Basic</td>
                    <td className="py-4 px-4 text-center text-gray-600 dark:text-gray-400">MAGIC only</td>
                    <td className="py-4 px-4 text-center text-purple-600 font-medium">All 12</td>
                    <td className="py-4 px-4 text-center text-gray-600 dark:text-gray-400">All 12</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-4 px-4 text-gray-900 dark:text-white">Sites Included</td>
                    <td className="py-4 px-4 text-center text-gray-600 dark:text-gray-400">1</td>
                    <td className="py-4 px-4 text-center text-gray-600 dark:text-gray-400">1</td>
                    <td className="py-4 px-4 text-center text-purple-600 font-medium">3</td>
                    <td className="py-4 px-4 text-center text-gray-600 dark:text-gray-400">10</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-4 px-4 text-gray-900 dark:text-white">AI Content Studio</td>
                    <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                    <td className="py-4 px-4 text-center text-purple-600 font-medium">100/mo</td>
                    <td className="py-4 px-4 text-center text-gray-600 dark:text-gray-400">500/mo</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-4 px-4 text-gray-900 dark:text-white">Activity Logs + Undo</td>
                    <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-4 px-4 text-gray-900 dark:text-white">Priority Support</td>
                    <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="py-4 px-4 text-center text-gray-600 dark:text-gray-400">Dedicated</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 lg:py-28">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {pricingFaq.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-28 bg-gradient-to-r from-purple-600 to-purple-800">
          <div className="container-wide text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Try WooASM free for 14 days. No credit card required.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition-all"
            >
              Start Your Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PricingPage;
