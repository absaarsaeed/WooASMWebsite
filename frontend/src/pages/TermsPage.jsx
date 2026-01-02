import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';

const TermsPage = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Terms of Service - WooASM Usage Agreement"
        description="WooASM Terms of Service. Read our terms and conditions for using the WooASM AI store manager plugin for WooCommerce."
        keywords="terms of service, terms and conditions, WooASM terms, usage agreement"
        url="https://wooasm.ai/terms"
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 gradient-bg">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6"
              >
                Terms of <span className="gradient-text">Service</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-gray-700 dark:text-gray-400"
              >
                Last updated: December 2024
              </motion.p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-8"
              >
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    By installing, activating, or using WooASM, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Description of Service</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    WooASM is an AI-powered store management plugin for WooCommerce. Our service includes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-4">
                    <li>AI Store Assistant for store queries and actions</li>
                    <li>Customer AI Chatbot for automated support</li>
                    <li>Inventory management and demand forecasting</li>
                    <li>Content generation for products</li>
                    <li>Analytics and insights dashboard</li>
                    <li>Additional features as described on our website</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Account Requirements</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    To use WooASM, you must:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-4">
                    <li>Have a valid WooCommerce store running WordPress 5.8+</li>
                    <li>Have a valid WooASM license key</li>
                    <li>Maintain accurate account information</li>
                    <li>Be at least 18 years old or have parental consent</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Subscription & Billing</h2>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4.1 Free Tier</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Our free tier includes limited features and usage quotas as described on our pricing page.
                  </p>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4.2 Paid Plans</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Paid subscriptions are billed monthly or annually. All prices are in USD. Subscriptions auto-renew unless cancelled.
                  </p>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4.3 Usage Limits</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Each plan has usage limits for AI features. Usage beyond your plan limits may result in temporary service restrictions until the next billing cycle.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Acceptable Use</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    You agree NOT to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Use WooASM for illegal activities</li>
                    <li>Attempt to reverse engineer or modify the plugin</li>
                    <li>Share your license key with unauthorized users</li>
                    <li>Use the service to harm, harass, or deceive others</li>
                    <li>Overload our systems with excessive requests</li>
                    <li>Resell or redistribute WooASM without authorization</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Intellectual Property</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    WooASM and its original content, features, and functionality are owned by WooASM and are protected by international copyright, trademark, and other intellectual property laws.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Limitation of Liability</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    WooASM is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service. Our total liability shall not exceed the amount you paid us in the 12 months prior to the claim.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Termination</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    We may terminate or suspend your access immediately, without prior notice, for any breach of these Terms. Upon termination, your right to use the service ceases immediately.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Changes to Terms</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    We reserve the right to modify these terms at any time. We will notify users of significant changes via email or in-app notification. Continued use after changes constitutes acceptance.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Contact</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Questions about these Terms? Contact us at legal@wooasm.ai
                  </p>
                </section>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TermsPage;
