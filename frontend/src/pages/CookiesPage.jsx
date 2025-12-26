import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';

const CookiesPage = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Cookie Policy - How We Use Cookies"
        description="WooASM Cookie Policy. Learn how we use cookies and similar technologies on our website and plugin."
        keywords="cookie policy, cookies, tracking, WooASM cookies"
        url="https://wooasm.ai/cookies"
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
                Cookie <span className="gradient-text">Policy</span>
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
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What Are Cookies?</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve your browsing experience.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How We Use Cookies</h2>
                  
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">Essential Cookies</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    These cookies are necessary for the website to function properly. They enable core functionality like security, network management, and accessibility.
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Examples:</strong> Session cookies, authentication cookies, security cookies</p>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Analytics Cookies</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    We use analytics cookies to understand how visitors interact with our website. This helps us improve our website and services.
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Examples:</strong> Google Analytics, page view tracking, feature usage analytics</p>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Preference Cookies</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    These cookies remember your preferences such as language, theme (light/dark mode), and other settings.
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Examples:</strong> Theme preference, language selection, dismissed notifications</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Third-Party Cookies</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Some cookies are set by third-party services that appear on our pages:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-4">
                    <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                    <li><strong>Stripe:</strong> For payment processing (on checkout pages)</li>
                    <li><strong>Intercom/Support:</strong> For customer support chat functionality</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Managing Cookies</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    You can control and manage cookies in several ways:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                    <li><strong>Browser Settings:</strong> Most browsers allow you to refuse or delete cookies through settings</li>
                    <li><strong>Our Cookie Banner:</strong> Use our cookie consent banner to manage preferences</li>
                    <li><strong>Opt-Out Tools:</strong> Use opt-out tools like Google's Ads Settings</li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                    Note: Disabling certain cookies may affect website functionality.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Cookie Retention</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="py-3 pr-4 text-gray-900 dark:text-white font-semibold">Cookie Type</th>
                          <th className="py-3 text-gray-900 dark:text-white font-semibold">Retention Period</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-700 dark:text-gray-300">
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <td className="py-3 pr-4">Session Cookies</td>
                          <td className="py-3">Until browser is closed</td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <td className="py-3 pr-4">Preference Cookies</td>
                          <td className="py-3">1 year</td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <td className="py-3 pr-4">Analytics Cookies</td>
                          <td className="py-3">2 years</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4">Authentication Cookies</td>
                          <td className="py-3">30 days</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Updates to This Policy</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated revision date.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    If you have questions about our use of cookies, please contact us at privacy@wooasm.ai
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

export default CookiesPage;
