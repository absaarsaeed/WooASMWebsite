import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, Bot, BarChart3, Heart, Package, Users, 
  FlaskConical, PenTool, ArrowRight 
} from 'lucide-react';
import { features } from '../../data/mock';

const iconMap = {
  MessageSquare, Bot, BarChart3, Heart, Package, Users,
  FlaskConical, PenTool
};

const FeaturesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const mainFeatures = features.slice(0, 8);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title mb-4"
          >
            Everything You Need to Run a{' '}
            <span className="gradient-text">Smarter Store</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-subtitle mx-auto"
          >
            16 powerful features that work together seamlessly. 
            No bloat, no complexity — just intelligent tools that save you time.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {mainFeatures.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || MessageSquare;
            return (
              <motion.div
                key={feature.id}
                variants={itemVariants}
              >
                <Link
                  to={`/features/${feature.id}`}
                  className="feature-card h-full flex flex-col group"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                    <IconComponent className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm flex-1">
                    {feature.shortDesc}
                  </p>
                  <div className="mt-4 flex items-center text-purple-600 dark:text-purple-400 font-medium text-sm group-hover:gap-2 transition-all">
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* See All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/features"
            className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold hover:gap-3 transition-all"
          >
            See All 16 Features
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
