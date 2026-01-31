import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ChevronRight, Store, TrendingUp, Users, Package, DollarSign, RefreshCw } from 'lucide-react';
import SEO from '../components/SEO';

const useCases = {
  'small-business': {
    title: 'WooASM for Small Business',
    subtitle: 'AI-powered store management designed for small business owners who wear many hats',
    description: 'Discover how WooASM helps small business owners save time and grow their WooCommerce stores with AI automation, smart insights, and easy-to-use tools.',
    keywords: 'WooCommerce small business, small store management, AI for small business, WooCommerce automation small stores',
    icon: Store,
    challenges: [
      'Limited time to analyze reports and data',
      'No dedicated team for inventory management',
      'Difficulty tracking what\'s working and what\'s not',
      'Wearing multiple hats - owner, marketer, support'
    ],
    solutions: [
      {
        title: 'Ask Instead of Click',
        description: 'Stop navigating through menus. Just ask "How did we do last week?" and get instant answers.'
      },
      {
        title: 'Automated Inventory Alerts',
        description: 'Never run out of bestsellers. WooASM alerts you before stock runs low.'
      },
      {
        title: 'One-Click Reports',
        description: 'Get the insights you need without spending hours on spreadsheets.'
      },
      {
        title: 'AI Recommendations',
        description: 'Know exactly what to focus on with AI-powered suggestions.'
      }
    ],
    testimonial: {
      quote: 'As a one-person operation, WooASM is like having a smart assistant who knows my store inside out.',
      author: 'Sarah M.',
      role: 'Handmade Jewelry Store Owner'
    },
    stats: [
      { value: '35+', label: 'Hours saved per week' },
      { value: '2x', label: 'Faster order processing' },
      { value: '40%', label: 'Fewer stockouts' }
    ],
    faq: [
      {
        question: 'Is WooASM affordable for small businesses?',
        answer: 'Yes! WooASM offers a free plan with core features, and paid plans starting at $29/month. Most small businesses find the time savings alone worth the investment.'
      },
      {
        question: 'Do I need technical skills?',
        answer: 'Not at all. WooASM is designed for store owners, not developers. If you can send a text message, you can use WooASM.'
      },
      {
        question: 'How quickly can I get started?',
        answer: 'Installation takes less than 5 minutes. Most users are getting value from WooASM within the first hour.'
      }
    ]
  },
  'fashion-stores': {
    title: 'WooASM for Fashion Stores',
    subtitle: 'Manage seasonal inventory, track trends, and never miss a sale in the fast-paced fashion industry',
    description: 'Learn how fashion and apparel WooCommerce stores use WooASM to manage seasonal inventory, track style trends, and optimize their product mix.',
    keywords: 'WooCommerce fashion store, apparel store management, fashion inventory, clothing store WooCommerce',
    icon: Package,
    challenges: [
      'Managing seasonal inventory transitions',
      'Tracking size/color variations effectively',
      'Identifying trending vs slow-moving styles',
      'High return rates affecting profitability'
    ],
    solutions: [
      {
        title: 'Variation-Level Tracking',
        description: 'See exactly which sizes and colors are selling fast or sitting idle.'
      },
      {
        title: 'Seasonal Forecasting',
        description: 'AI predicts demand changes as seasons shift.'
      },
      {
        title: 'Return Analysis',
        description: 'Understand why products are returned and reduce return rates.'
      },
      {
        title: 'Trend Detection',
        description: 'Spot emerging bestsellers early and stock up before you miss sales.'
      }
    ],
    testimonial: {
      quote: 'WooASM helped us reduce our end-of-season markdowns by 30% by identifying slow movers earlier.',
      author: 'Michael R.',
      role: 'Fashion Boutique Owner'
    },
    stats: [
      { value: '30%', label: 'Less dead stock' },
      { value: '25%', label: 'Fewer stockouts on bestsellers' },
      { value: '20%', label: 'Reduced return rate' }
    ],
    faq: [
      {
        question: 'Does WooASM track product variations?',
        answer: 'Yes! WooASM tracks inventory and sales at the variation level, so you know exactly which sizes and colors are performing.'
      },
      {
        question: 'Can it help with seasonal planning?',
        answer: 'Absolutely. WooASM\'s AI considers seasonality in its demand forecasting and can help you plan inventory for upcoming seasons.'
      },
      {
        question: 'How does it handle returns?',
        answer: 'WooASM tracks return rates by product and identifies patterns, helping you understand which products have issues and why.'
      }
    ]
  },
  'electronics': {
    title: 'WooASM for Electronics Stores',
    subtitle: 'Manage complex catalogs, track warranties, and stay competitive in the electronics market',
    description: 'See how electronics and tech WooCommerce stores use WooASM to manage large catalogs, track competitor pricing, and handle technical product information.',
    keywords: 'WooCommerce electronics store, tech store management, electronics inventory, gadget store WooCommerce',
    icon: Package,
    challenges: [
      'Large catalogs with complex specifications',
      'Rapidly changing prices and competition',
      'Managing multiple suppliers and lead times',
      'Technical customer questions'
    ],
    solutions: [
      {
        title: 'Price Watch',
        description: 'Monitor competitor pricing and get alerts when the market shifts.'
      },
      {
        title: 'Smart Search',
        description: 'Find products instantly by specs, not just names.'
      },
      {
        title: 'Supplier Management',
        description: 'Track lead times and optimize reorder timing.'
      },
      {
        title: 'AI Product Descriptions',
        description: 'Generate accurate, SEO-friendly descriptions for technical products.'
      }
    ],
    testimonial: {
      quote: 'Managing 5,000+ SKUs used to be a nightmare. Now I just ask WooASM what needs attention.',
      author: 'David K.',
      role: 'Electronics Store Owner'
    },
    stats: [
      { value: '5000+', label: 'SKUs managed effortlessly' },
      { value: '15%', label: 'Better margins with price monitoring' },
      { value: '50%', label: 'Faster product listing' }
    ],
    faq: [
      {
        question: 'Can WooASM handle large catalogs?',
        answer: 'Yes! WooASM is built to handle stores with thousands of products. The AI makes finding and managing products easy regardless of catalog size.'
      },
      {
        question: 'Does it track competitor prices?',
        answer: 'Yes, the Price Watch feature monitors competitor pricing and alerts you to changes so you can stay competitive.'
      },
      {
        question: 'Can it help with product descriptions?',
        answer: 'WooASM\'s Content Studio can generate technical product descriptions from specifications, saving hours of writing.'
      }
    ]
  },
  'high-volume-stores': {
    title: 'WooASM for High-Volume Stores',
    subtitle: 'Scale your operations without scaling your team. AI automation for busy stores.',
    description: 'Learn how high-volume WooCommerce stores use WooASM to handle thousands of orders, automate repetitive tasks, and maintain quality at scale.',
    keywords: 'high volume WooCommerce, large WooCommerce store, WooCommerce automation, scale WooCommerce',
    icon: TrendingUp,
    challenges: [
      'Processing hundreds of orders daily',
      'Maintaining quality at scale',
      'Team coordination and handoffs',
      'Performance monitoring across channels'
    ],
    solutions: [
      {
        title: 'Bulk Operations',
        description: 'Process multiple orders with a single command.'
      },
      {
        title: 'Activity Logs',
        description: 'Complete audit trail of all actions across your team.'
      },
      {
        title: 'Automated Workflows',
        description: 'Set up rules to handle routine tasks automatically.'
      },
      {
        title: 'Real-Time Dashboard',
        description: 'Monitor everything at a glance with live updates.'
      }
    ],
    testimonial: {
      quote: 'We went from 500 to 2000 orders/day without adding staff. WooASM\'s automation made it possible.',
      author: 'Jennifer L.',
      role: 'Operations Director'
    },
    stats: [
      { value: '4x', label: 'Order processing capacity' },
      { value: '60%', label: 'Reduction in manual tasks' },
      { value: '99.9%', label: 'Order accuracy' }
    ],
    faq: [
      {
        question: 'Can WooASM handle thousands of orders?',
        answer: 'Yes! WooASM is built for scale. Our enterprise clients process 10,000+ orders daily without issues.'
      },
      {
        question: 'Does it slow down my store?',
        answer: 'No. WooASM runs on separate infrastructure and doesn\'t affect your store\'s frontend performance.'
      },
      {
        question: 'Can multiple team members use it?',
        answer: 'Yes, WooASM supports teams with role-based access and complete activity logging for accountability.'
      }
    ]
  },
  'reduce-refunds': {
    title: 'Reduce Refunds with WooASM',
    subtitle: 'Understand why customers return products and take action to reduce refund rates',
    description: 'Discover how WooCommerce stores use WooASM to analyze refund patterns, identify problem products, and implement changes that reduce return rates.',
    keywords: 'reduce WooCommerce refunds, lower return rate, refund analysis, WooCommerce returns',
    icon: RefreshCw,
    challenges: [
      'High refund rates eating into profits',
      'Not knowing which products have issues',
      'Unable to identify patterns in returns',
      'Reactive instead of proactive approach'
    ],
    solutions: [
      {
        title: 'Refund Analytics',
        description: 'See refund rates by product, category, and reason.'
      },
      {
        title: 'Pattern Detection',
        description: 'AI identifies common themes in refund reasons.'
      },
      {
        title: 'Product Alerts',
        description: 'Get notified when a product\'s refund rate spikes.'
      },
      {
        title: 'Actionable Insights',
        description: 'Specific recommendations to reduce returns.'
      }
    ],
    testimonial: {
      quote: 'We identified that 40% of our returns were due to sizing issues. WooASM helped us fix our size guide and returns dropped immediately.',
      author: 'Amanda T.',
      role: 'E-commerce Manager'
    },
    stats: [
      { value: '35%', label: 'Average refund reduction' },
      { value: '$10K+', label: 'Monthly savings' },
      { value: '2x', label: 'Faster issue detection' }
    ],
    faq: [
      {
        question: 'How does WooASM reduce refunds?',
        answer: 'By analyzing refund patterns and reasons, WooASM identifies which products have issues and why. You can then fix product descriptions, sizing guides, images, or quality issues.'
      },
      {
        question: 'Can it track refund reasons?',
        answer: 'Yes, if you collect refund reasons, WooASM analyzes them to find patterns. Even without structured data, AI can identify common themes.'
      },
      {
        question: 'How quickly will I see results?',
        answer: 'Most stores see measurable improvement within 30-60 days after implementing WooASM\'s recommendations.'
      }
    ]
  },
  'increase-repeat-customers': {
    title: 'Increase Repeat Customers with WooASM',
    subtitle: 'Turn one-time buyers into loyal customers with AI-powered retention strategies',
    description: 'Learn how WooCommerce stores use WooASM to identify at-risk customers, build loyalty programs, and increase customer lifetime value.',
    keywords: 'WooCommerce customer retention, repeat customers, customer loyalty, increase CLV WooCommerce',
    icon: Users,
    challenges: [
      'Most customers only buy once',
      'Not knowing who\'s at risk of churning',
      'No time for personalized outreach',
      'Unclear which loyalty tactics work'
    ],
    solutions: [
      {
        title: 'Churn Prediction',
        description: 'AI identifies customers likely to not return.'
      },
      {
        title: 'Customer Segments',
        description: 'Automatically group customers by behavior and value.'
      },
      {
        title: 'Win-Back Triggers',
        description: 'Automated alerts when it\'s time to reach out.'
      },
      {
        title: 'CLV Tracking',
        description: 'See customer lifetime value and how it\'s trending.'
      }
    ],
    testimonial: {
      quote: 'Our repeat customer rate went from 15% to 32% in 6 months. WooASM showed us exactly who to target.',
      author: 'Robert C.',
      role: 'Store Owner'
    },
    stats: [
      { value: '2x', label: 'Repeat purchase rate' },
      { value: '45%', label: 'Higher customer lifetime value' },
      { value: '30%', label: 'Fewer lost customers' }
    ],
    faq: [
      {
        question: 'How does WooASM predict churn?',
        answer: 'The AI analyzes purchase patterns, recency, and behavior to score each customer\'s likelihood of returning. Customers with low scores are flagged for attention.'
      },
      {
        question: 'Can it integrate with email marketing?',
        answer: 'Yes, you can export customer segments to your email platform or use WooASM\'s recommendations to create targeted campaigns.'
      },
      {
        question: 'What\'s a realistic improvement to expect?',
        answer: 'Most stores see 20-50% improvement in repeat purchase rates within 3-6 months of implementing WooASM\'s retention strategies.'
      }
    ]
  }
};

const UseCasePage = () => {
  const { slug } = useParams();
  const useCase = useCases[slug];

  if (!useCase) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Use case not found</h1>
          <Link to="/" className="text-purple-600 hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const Icon = useCase.icon;

  return (
    <div className="min-h-screen">
      <SEO
        title={useCase.title}
        description={useCase.description}
        keywords={useCase.keywords}
        url={`https://wooasm.com/use-cases/${slug}`}
        faq={useCase.faq}
      />

      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container-wide py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Link to="/" className="hover:text-purple-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-white">{useCase.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/30 mb-6">
                <Icon className="w-8 h-8 text-purple-600" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {useCase.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {useCase.subtitle}
              </p>
              <Link to="/signup" className="btn-primary">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-purple-600">
        <div className="container-wide">
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            {useCase.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-purple-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              The Challenges You Face
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {useCase.challenges.map((challenge, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20">
                  <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 dark:text-red-400 text-sm">✕</span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{challenge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              How WooASM Helps
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {useCase.solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                >
                  <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {solution.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {solution.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="text-2xl lg:text-3xl font-medium text-gray-900 dark:text-white mb-6">
              "{useCase.testimonial.quote}"
            </blockquote>
            <div className="text-gray-600 dark:text-gray-400">
              <span className="font-semibold">{useCase.testimonial.author}</span>
              <span className="mx-2">·</span>
              <span>{useCase.testimonial.role}</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {useCase.faq.map((item, index) => (
              <div key={index} className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.question}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="container-wide text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to transform your store?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join hundreds of stores already using WooASM.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup" className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
              Start Free Trial
            </Link>
            <Link to="/pricing" className="px-8 py-4 bg-purple-700 text-white font-semibold rounded-xl hover:bg-purple-800 transition-colors border border-purple-500">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UseCasePage;
