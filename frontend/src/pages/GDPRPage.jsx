import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Trash2, Download, Mail } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';

const GDPRPage = () => {
  const rights = [
    {
      icon: Eye,
      title: 'Right to Access',
      description: 'You can request a copy of all personal data we hold about you at any time.'
    },
    {
      icon: Download,
      title: 'Right to Data Portability',
      description: 'Export your data in a machine-readable format to transfer to another service.'
    },
    {
      icon: Trash2,
      title: 'Right to Erasure',
      description: 'Request deletion of your personal data. We will comply within 30 days.'
    },
    {
      icon: Lock,
      title: 'Right to Rectification',
      description: 'Update or correct any inaccurate personal information we hold.'
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="GDPR Compliance - Your Data Rights"
        description="WooASM GDPR compliance information. Learn about your data rights under the General Data Protection Regulation."
        keywords="GDPR, data protection, privacy rights, EU regulations, data compliance"
        url="https://wooasm.ai/gdpr"
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 gradient-bg">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-20 h-20 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-6"
              >
                <Shield className="w-10 h-10 text-purple-600 dark:text-purple-400" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6"
              >
                GDPR <span className="gradient-text">Compliance</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-700 dark:text-gray-400"
              >
                We are committed to protecting your privacy and complying with the General Data Protection Regulation (GDPR).
              </motion.p>
            </div>
          </div>
        </section>

        {/* Your Rights */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container-wide">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12"
            >
              Your Data Rights Under GDPR
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {rights.map((right, index) => (
                <motion.div
                  key={right.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                    <right.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {right.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {right.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Data Processing */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
              >
                How We Process Your Data
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Lawful Basis for Processing</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We process your data based on:
                  </p>
                  <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-700 dark:text-gray-300">
                    <li><strong>Contract:</strong> To provide our services as agreed</li>
                    <li><strong>Consent:</strong> When you explicitly agree (e.g., marketing emails)</li>
                    <li><strong>Legitimate Interest:</strong> To improve our services and prevent fraud</li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Data Minimization</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We only collect data that is necessary to provide our services. We do not collect or store unnecessary personal information.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Data Transfers</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    When data is transferred outside the EU/EEA, we ensure adequate protection through Standard Contractual Clauses (SCCs) or other approved mechanisms.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Security Measures</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We implement technical and organizational measures including encryption, access controls, and regular security audits to protect your data.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Exercise Rights */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container-wide">
            <div className="max-w-2xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Mail className="w-16 h-16 text-purple-600 dark:text-purple-400 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Exercise Your Rights
                </h2>
                <p className="text-gray-700 dark:text-gray-400 mb-8">
                  To exercise any of your GDPR rights or if you have questions about how we handle your data, please contact our Data Protection Officer:
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-8">
                  <p className="text-gray-900 dark:text-white font-medium">privacy@wooasm.ai</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">We will respond within 30 days</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact" className="btn-primary">
                    Contact Us
                  </Link>
                  <Link to="/privacy" className="btn-secondary">
                    Read Privacy Policy
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GDPRPage;
