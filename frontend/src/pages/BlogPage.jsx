import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';
import { blogPosts } from '../data/mock';

const BlogPage = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Blog - Tips & Insights for WooCommerce Store Owners"
        description="Expert tips, insights, and best practices for WooCommerce store owners. Learn about AI, automation, inventory management, and growing your ecommerce business."
        keywords="WooCommerce blog, ecommerce tips, AI automation, store management tips, WooCommerce tutorials"
        url="https://wooasm.ai/blog"
      />
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
                <span className="gradient-text">Blog</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-700 dark:text-gray-400"
              >
                Tips, insights, and best practices for WooCommerce store owners
              </motion.p>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Link to={`/blog/${post.slug}`} className="block">
                    <div className="relative overflow-hidden rounded-2xl mb-4">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-purple-600 text-white text-xs font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {post.excerpt}
                    </p>

                    <span className="text-purple-600 dark:text-purple-400 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read more
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
