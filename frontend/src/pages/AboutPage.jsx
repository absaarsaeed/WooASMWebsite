import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Target, Heart, Users, ArrowRight } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';

const AboutPage = () => {
  const values = [
    {
      icon: Target,
      title: 'Simplicity First',
      description: 'We believe powerful tools should be simple to use. No learning curve, no complexity.'
    },
    {
      icon: Heart,
      title: 'Customer Obsessed',
      description: 'Every feature we build starts with a real problem faced by store owners like you.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Our roadmap is shaped by our users. Your feedback drives our development.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We leverage cutting-edge AI to solve problems in ways that weren\'t possible before.'
    }
  ];

  const team = [
    {
      name: 'Alex Chen',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      bio: 'Former WooCommerce developer with 10 years of e-commerce experience.'
    },
    {
      name: 'Sarah Johnson',
      role: 'Head of AI',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
      bio: 'Machine learning expert previously at OpenAI and Google.'
    },
    {
      name: 'Michael Park',
      role: 'Lead Engineer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      bio: 'Full-stack developer passionate about building great products.'
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="About Us - Our Mission & Team"
        description="Learn about WooASM's mission to make e-commerce effortless with AI. Meet our team and discover why we're building the most powerful AI store manager for WooCommerce."
        keywords="about WooASM, WooASM team, ecommerce AI company, WooCommerce plugin company"
        url="https://wooasm.ai/about"
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 gradient-bg">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
              >
                Making E-commerce{' '}
                <span className="gradient-text">Effortless</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-700 dark:text-gray-400"
              >
                We're on a mission to help every WooCommerce store owner work smarter, 
                not harder, with the power of AI.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
              >
                Our Story
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="space-y-4"
              >
                <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
                  WooASM was born from frustration. As WooCommerce developers and store consultants, 
                  we watched countless store owners struggle with the same problems: endless hours 
                  analyzing data, writing product content, managing inventory, and answering the 
                  same customer questions over and over.
                </p>
                <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
                  When GPT-4 and advanced AI models became available, we saw an opportunity. 
                  What if we could build an AI that truly understood e-commerce? One that could 
                  answer any question about your store, take actions on your behalf, and even 
                  talk to your customers 24/7?
                </p>
                <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
                  That's WooASM. Not just another AI tool, but a complete AI store manager that 
                  works tirelessly alongside you. Today, we're proud to serve hundreds of store 
                  owners who are saving time and growing their businesses with our help.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
          <div className="container-wide">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12"
            >
              Our Values
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container-wide">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12"
            >
              Meet the Team
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-purple-600 dark:text-purple-400 text-sm font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {member.bio}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-purple-600 dark:bg-purple-900">
          <div className="container-wide text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Want to join us?
            </h2>
            <p className="text-purple-100 mb-8 max-w-xl mx-auto">
              We're always looking for talented people who share our passion for 
              making e-commerce better.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-700 font-semibold rounded-xl hover:bg-purple-50 transition-all hover:scale-105"
            >
              View Open Positions
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
