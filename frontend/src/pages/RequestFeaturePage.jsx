import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Send, ThumbsUp, Sparkles, Check } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';

const RequestFeaturePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    featureTitle: '',
    category: 'enhancement',
    description: '',
    useCase: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    { value: 'enhancement', label: 'Enhancement to Existing Feature' },
    { value: 'new', label: 'New Feature Request' },
    { value: 'integration', label: 'New Integration' },
    { value: 'automation', label: 'Automation Idea' },
    { value: 'other', label: 'Other' }
  ];

  const popularRequests = [
    { title: 'Multi-store Management', votes: 142, status: 'planned' },
    { title: 'Shopify Integration', votes: 98, status: 'considering' },
    { title: 'Email Marketing Integration', votes: 87, status: 'planned' },
    { title: 'Advanced A/B Testing', votes: 76, status: 'in-progress' },
    { title: 'Mobile App', votes: 65, status: 'considering' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Request a Feature - Help Shape WooASM"
        description="Have an idea for WooASM? Submit your feature request and help us build the perfect AI store manager for WooCommerce."
        keywords="feature request, WooASM ideas, product feedback, suggest feature"
        url="https://wooasm.ai/request-feature"
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 gradient-bg">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-20 h-20 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-6"
              >
                <Lightbulb className="w-10 h-10 text-purple-600 dark:text-purple-400" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6"
              >
                Request a <span className="gradient-text">Feature</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-700 dark:text-gray-400"
              >
                Have an idea that would make WooASM even better? We'd love to hear it!
              </motion.p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container-wide">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Form */}
              <div className="lg:col-span-2">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-8 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6">
                      <Check className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Thank You!
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      Your feature request has been submitted. We review every suggestion and will update you on its status.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', featureTitle: '', category: 'enhancement', description: '', useCase: '' }); }}
                      className="btn-secondary"
                    >
                      Submit Another Idea
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleSubmit}
                    className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
                  >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Submit Your Idea
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Feature Title
                      </label>
                      <input
                        type="text"
                        name="featureTitle"
                        value={formData.featureTitle}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Brief title for your feature idea"
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        {categories.map(cat => (
                          <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Describe Your Feature
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        placeholder="Describe your feature idea in detail..."
                      />
                    </div>

                    <div className="mb-8">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        How Would You Use This Feature?
                      </label>
                      <textarea
                        name="useCase"
                        value={formData.useCase}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        placeholder="Describe your use case..."
                      />
                    </div>

                    <button type="submit" className="btn-primary w-full">
                      <Send className="w-5 h-5" />
                      Submit Feature Request
                    </button>
                  </motion.form>
                )}
              </div>

              {/* Popular Requests Sidebar */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Popular Requests
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {popularRequests.map((request, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                              {request.title}
                            </h4>
                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                              request.status === 'planned' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' :
                              request.status === 'in-progress' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' :
                              'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400'
                            }`}>
                              {request.status === 'planned' ? 'Planned' :
                               request.status === 'in-progress' ? 'In Progress' : 'Under Review'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                            <ThumbsUp className="w-4 h-4" />
                            <span className="text-sm font-medium">{request.votes}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      How We Prioritize
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      We consider votes, technical feasibility, and alignment with our roadmap when prioritizing features.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RequestFeaturePage;
