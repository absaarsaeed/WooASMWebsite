import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const BlogPage = () => {
  const posts = [
    {
      id: 1,
      title: 'How AI is Revolutionizing WooCommerce Store Management',
      excerpt: 'Discover how artificial intelligence is transforming the way store owners manage their WooCommerce stores, from inventory to customer support.',
      date: '2024-12-15',
      readTime: '5 min read',
      category: 'AI & Automation',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop'
    },
    {
      id: 2,
      title: '10 Ways to Reduce Customer Support Time with AI Chatbots',
      excerpt: 'Learn practical strategies for implementing AI chatbots that actually help your customers and reduce your support workload.',
      date: '2024-12-10',
      readTime: '7 min read',
      category: 'Customer Support',
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=400&fit=crop'
    },
    {
      id: 3,
      title: 'The Complete Guide to Inventory Management for E-commerce',
      excerpt: 'A comprehensive guide to mastering inventory management, preventing stockouts, and optimizing your product catalog.',
      date: '2024-12-05',
      readTime: '10 min read',
      category: 'Operations',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=400&fit=crop'
    },
    {
      id: 4,
      title: 'Writing Product Descriptions That Convert: AI vs Human',
      excerpt: 'We compare AI-generated product descriptions with human-written ones. The results might surprise you.',
      date: '2024-11-28',
      readTime: '6 min read',
      category: 'Content',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=400&fit=crop'
    },
    {
      id: 5,
      title: 'Understanding Your Store Health Score: A Deep Dive',
      excerpt: 'What makes a healthy store? We break down the metrics that matter and how to improve your store health score.',
      date: '2024-11-20',
      readTime: '8 min read',
      category: 'Analytics',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop'
    },
    {
      id: 6,
      title: 'Case Study: How Fashion Boutique XYZ Saved 20 Hours/Week',
      excerpt: 'Real results from a real store. See how a small fashion boutique transformed their operations with WooASM.',
      date: '2024-11-15',
      readTime: '5 min read',
      category: 'Case Studies',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop'
    }
  ];

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
                <span className="gradient-text">Blog</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-600 dark:text-gray-400"
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
              {posts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Link to="#" className="block">
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
