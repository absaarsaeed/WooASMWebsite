import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Privacy Policy - How We Protect Your Data"
        description="WooASM Privacy Policy. Learn how we collect, use, and protect your personal information. Your privacy is our priority."
        keywords="privacy policy, data protection, GDPR, WooASM privacy, data security"
        url="https://wooasm.ai/privacy"
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
                Privacy <span className="gradient-text">Policy</span>
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
            <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-8"
              >
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    WooASM ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our WordPress plugin and related services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Information We Collect</h2>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2.1 Store Data</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    To provide our AI-powered features, WooASM accesses your WooCommerce store data including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Product information (names, prices, descriptions, inventory levels)</li>
                    <li>Order data (anonymized for analytics)</li>
                    <li>Customer segments (no personal customer data is stored)</li>
                    <li>Store settings and configurations</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">2.2 Account Information</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    When you create a WooASM account, we collect your email address, store URL, and license key information.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">2.3 Usage Data</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    We collect anonymized usage statistics to improve our service, including feature usage patterns and error logs.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. How We Use Your Information</h2>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>To provide AI-powered store management features</li>
                    <li>To generate insights and recommendations for your store</li>
                    <li>To power the customer chatbot with your store's knowledge</li>
                    <li>To improve our services and develop new features</li>
                    <li>To send important updates about your subscription</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Data Security</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    We implement industry-standard security measures to protect your data:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-4">
                    <li>All data transmissions are encrypted using SSL/TLS</li>
                    <li>Your store data is processed locally within your WordPress installation</li>
                    <li>API calls to OpenAI are encrypted and not stored by OpenAI</li>
                    <li>We never share your store data with third parties for marketing</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Third-Party Services</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    WooASM uses OpenAI's API for AI features. When you use AI features, relevant store data is sent to OpenAI for processing. OpenAI does not use this data to train their models. Please review OpenAI's privacy policy for more information.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Your Rights</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Access the personal data we hold about you</li>
                    <li>Request correction of inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Export your data in a portable format</li>
                    <li>Opt-out of marketing communications</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Data Retention</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    We retain your data for as long as your account is active. Upon account deletion or subscription cancellation, your data is permanently deleted within 30 days.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Contact Us</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    If you have questions about this Privacy Policy or your data, please contact us at:
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mt-4">
                    <strong>Email:</strong> privacy@wooasm.ai<br />
                    <strong>Address:</strong> San Francisco, CA, USA
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

export default PrivacyPage;
