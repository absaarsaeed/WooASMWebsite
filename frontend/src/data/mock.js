// Mock data for WooASM.ai marketing website

export const features = [
  {
    id: 'ai-assistant',
    icon: 'MessageSquare',
    title: 'AI Store Assistant',
    tagline: 'Chat With Your Store Like Texting a Friend',
    shortDesc: 'Chat with your store like texting a friend. Ask anything, get instant answers and actions.',
    category: 'core',
    plans: ['free', 'starter', 'professional']
  },
  {
    id: 'customer-chatbot',
    icon: 'Bot',
    title: 'Customer AI Chatbot',
    tagline: '24/7 Support That Actually Knows Your Products',
    shortDesc: '24/7 AI support for your customers. Answers questions using YOUR store knowledge.',
    category: 'customer',
    plans: ['free', 'starter', 'professional']
  },
  {
    id: 'store-insights',
    icon: 'BarChart3',
    title: 'Store Insights Dashboard',
    tagline: 'Real-time Pulse of Your Store',
    shortDesc: 'Real-time dashboard showing exactly what\'s working and what needs attention.',
    category: 'core',
    plans: ['free', 'starter', 'professional']
  },
  {
    id: 'health-score',
    icon: 'Heart',
    title: 'Store Health Score',
    tagline: 'Your Store\'s Vital Signs in One Number',
    shortDesc: 'A single number (0-100) that tells you how your store is performing across all metrics.',
    category: 'core',
    plans: ['free', 'starter', 'professional']
  },
  {
    id: 'inventory-autopilot',
    icon: 'Package',
    title: 'Inventory Autopilot',
    tagline: 'Never Run Out of Your Best Sellers Again',
    shortDesc: 'Never run out of stock again. AI predicts demand and tells you exactly what to order.',
    category: 'operations',
    plans: ['professional']
  },
  {
    id: 'customer-intelligence',
    icon: 'Users',
    title: 'Customer Intelligence',
    tagline: 'Know Your Customers Better Than They Know Themselves',
    shortDesc: 'Understand your customers deeply. Segments, lifetime value, and win-back strategies.',
    category: 'customer',
    plans: ['starter', 'professional']
  },
  {
    id: 'growth-experiments',
    icon: 'FlaskConical',
    title: 'Growth Experiments Lab',
    tagline: 'AI-Suggested A/B Tests to Grow Revenue',
    shortDesc: 'AI-suggested A/B tests and optimizations to grow your revenue.',
    category: 'growth',
    plans: ['professional']
  },
  {
    id: 'content-studio',
    icon: 'PenTool',
    title: 'AI Content Studio',
    tagline: 'Create Weeks of Content in Minutes',
    shortDesc: 'Generate product descriptions, tags, and summaries with one click. Auto-save to products.',
    category: 'content',
    plans: ['free', 'starter', 'professional']
  },
  {
    id: 'analytics',
    icon: 'TrendingUp',
    title: 'Google Analytics Integration',
    tagline: 'Deep GA4 Insights Powered by AI',
    shortDesc: 'Deep GA4 integration with AI-powered insights on your traffic.',
    category: 'content',
    plans: ['professional']
  },
  {
    id: 'competitor-watch',
    icon: 'Eye',
    title: 'Competitor Price Watch',
    tagline: 'Track Competitor Pricing in Real-Time',
    shortDesc: 'Track competitor pricing and get alerts when you\'re being undercut.',
    category: 'growth',
    plans: ['professional']
  },
  {
    id: 'review-monitor',
    icon: 'Star',
    title: 'Review Monitor',
    tagline: 'AI-Powered Review Analysis',
    shortDesc: 'AI-powered review analysis with sentiment tracking and response suggestions.',
    category: 'customer',
    plans: ['starter', 'professional']
  },
  {
    id: 'support-aggregator',
    icon: 'Headphones',
    title: 'Support Aggregator',
    tagline: 'Centralized Support Dashboard',
    shortDesc: 'Centralized support dashboard with templates and FAQ suggestions.',
    category: 'customer',
    plans: ['starter', 'professional']
  },
  {
    id: 'fraud-detection',
    icon: 'Shield',
    title: 'Fraud Detection',
    tagline: 'Protect Your Store from Fraud',
    shortDesc: 'Risk scoring for orders with configurable rules and alerts.',
    category: 'operations',
    plans: ['professional']
  },
  {
    id: 'activity-logs',
    icon: 'ClipboardList',
    title: 'Activity Logs',
    tagline: 'Complete Audit Trail with One-Click Restore',
    shortDesc: 'Complete audit trail with one-click restore for any AI action.',
    category: 'operations',
    plans: ['free', 'starter', 'professional']
  },
  {
    id: 'ai-memory',
    icon: 'Brain',
    title: 'AI Memory System',
    tagline: 'Teach the AI About Your Store',
    shortDesc: 'Teach the AI about your store policies, products, and brand voice.',
    category: 'core',
    plans: ['starter', 'professional']
  },
  {
    id: 'chat-export',
    icon: 'Download',
    title: 'Chat History & Export',
    tagline: 'Full Control Over Your Data',
    shortDesc: 'Save conversations, export data, and maintain full control.',
    category: 'operations',
    plans: ['starter', 'professional']
  }
];

export const pricingPlans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'Perfect for trying WooASM',
    features: [
      'AI Assistant (10 queries/day)',
      'Basic Health Score',
      'Basic Store Insights',
      'Customer Chatbot (50 msg/month)',
      'Activity Logs (7 days)',
      'Content Studio (10/month)'
    ],
    notIncluded: [
      'Inventory Autopilot',
      'Customer Intelligence',
      'Growth Experiments',
      'Advanced Analytics',
      'Competitor Watch',
      'Fraud Detection'
    ],
    cta: 'Get Started Free',
    popular: false
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    yearlyPrice: 24,
    description: 'For growing stores',
    features: [
      'AI Assistant (unlimited)',
      'Full Health Score',
      'Full Store Insights',
      'Customer Chatbot (500 msg/month)',
      'Activity Logs (30 days)',
      'AI Memory (10 items)',
      'Content Studio (100/month)',
      'Review Monitor',
      'Support Aggregator',
      'Customer Intelligence (basic)'
    ],
    notIncluded: [
      'Inventory Autopilot',
      'Growth Experiments',
      'Advanced Analytics',
      'Competitor Watch',
      'Fraud Detection'
    ],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 79,
    yearlyPrice: 64,
    description: 'For serious store owners',
    features: [
      'AI Assistant (priority)',
      'Customer Chatbot (unlimited)',
      'Activity Logs (unlimited + restore)',
      'AI Memory (unlimited)',
      'Content Studio (unlimited + auto-save)',
      'Inventory Autopilot',
      'Full Customer Intelligence',
      'Growth Experiments',
      'Google Analytics Integration',
      'Competitor Price Watch',
      'Fraud Detection',
      'Priority Support',
      'Export Everything'
    ],
    notIncluded: [],
    cta: 'Start Free Trial',
    popular: false
  }
];

export const testimonials = [
  {
    id: 1,
    quote: "WooASM saved me 15 hours a week. I just ask 'what needs attention today' and it tells me exactly what to do. Game changer.",
    author: 'Sarah M.',
    role: 'Fashion Boutique Owner',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 2,
    quote: "The customer chatbot handles 70% of our support questions automatically. Our response time went from hours to seconds.",
    author: 'James K.',
    role: 'Electronics Store',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 3,
    quote: "I used to dread writing product descriptions. Now I generate them in seconds and they're better than what I wrote myself.",
    author: 'Maria L.',
    role: 'Home Goods Store',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 4,
    quote: "The inventory autopilot is incredible. I haven't had a single stockout since installing WooASM three months ago.",
    author: 'David R.',
    role: 'Sports Equipment Store',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  }
];

export const faqs = [
  {
    question: 'Do I need technical skills to use WooASM?',
    answer: 'Not at all! If you can send a text message, you can use WooASM. Just type your questions in plain English and the AI handles the rest.'
  },
  {
    question: 'Is my store data secure?',
    answer: 'Absolutely. WooASM runs entirely within your WordPress installation. Your data never leaves your server except for API calls to OpenAI, which are encrypted and not stored.'
  },
  {
    question: "What's the cost of using OpenAI's API?",
    answer: 'Most stores spend $5-20/month on API costs depending on usage. The time savings far outweigh this minimal expense.'
  },
  {
    question: 'Can I try before I buy?',
    answer: 'Yes! We offer a free tier with basic features so you can experience WooASM before upgrading. No credit card required.'
  },
  {
    question: 'Does it work with my theme/plugins?',
    answer: "WooASM works with any WordPress theme and is compatible with all major WooCommerce extensions. It uses WordPress's native REST API."
  },
  {
    question: 'What if the AI makes a mistake?',
    answer: "Every risky action requires your confirmation first. Plus, all actions are logged and can be restored with one click. You're always in control."
  }
];

export const chatDemoMessages = [
  {
    type: 'user',
    text: 'Show me products running low on stock'
  },
  {
    type: 'ai',
    text: 'I found 8 products below your restock threshold. Your best seller "Blue Widget" only has 3 units left and will likely run out in 2 days based on current sales velocity.',
    products: [
      { name: 'Blue Widget', stock: 3, daysLeft: 2, urgent: true },
      { name: 'Red Gadget', stock: 5, daysLeft: 4, urgent: true },
      { name: 'Green Tool', stock: 8, daysLeft: 7, urgent: false }
    ]
  }
];

export const integrations = [
  { name: 'WooCommerce', logo: '🛒' },
  { name: 'WordPress', logo: '📝' },
  { name: 'Google Analytics', logo: '📊' },
  { name: 'OpenAI', logo: '🤖' },
  { name: 'Stripe', logo: '💳' },
  { name: 'PayPal', logo: '💰' },
  { name: 'ShipStation', logo: '📦' },
  { name: 'Mailchimp', logo: '📧' }
];

export const stats = [
  { label: 'Active Stores', value: '500+' },
  { label: 'Average Rating', value: '4.9/5' },
  { label: 'Hours Saved Weekly', value: '35+' },
  { label: 'Support Messages Automated', value: '70%' }
];

export const costSavings = [
  { task: 'Inventory monitoring', manual: 8, withWooasm: 0, savings: 8 },
  { task: 'Writing product content', manual: 10, withWooasm: 1, savings: 9 },
  { task: 'Customer support', manual: 15, withWooasm: 5, savings: 10 },
  { task: 'Data analysis', manual: 5, withWooasm: 0, savings: 5 },
  { task: 'Price monitoring', manual: 3, withWooasm: 0, savings: 3 }
];

export const docsCategories = [
  {
    title: 'Getting Started',
    icon: 'Rocket',
    articles: [
      'Installing WooASM',
      'Adding Your API Key',
      'Activating Your License',
      'Your First Conversation',
      'Understanding the Dashboard'
    ]
  },
  {
    title: 'AI Assistant',
    icon: 'MessageSquare',
    articles: [
      'What Can I Ask?',
      'Example Commands',
      'Understanding Plans & Confirmations',
      'Safety Features',
      'Troubleshooting Responses'
    ]
  },
  {
    title: 'Customer Chatbot',
    icon: 'Bot',
    articles: [
      'Enabling the Chatbot',
      'Customizing Appearance',
      'Training with AI Memory',
      'Rate Limits & Moderation',
      'Viewing Chat Analytics'
    ]
  },
  {
    title: 'AI Memory',
    icon: 'Brain',
    articles: [
      'What is AI Memory?',
      'Adding Store Policies',
      'Adding Product Info',
      'Best Practices',
      'Memory Templates'
    ]
  },
  {
    title: 'Content Studio',
    icon: 'PenTool',
    articles: [
      'Generating Descriptions',
      'Creating Product Tags',
      'Review Summaries',
      'Auto-Save Feature',
      'Bulk Generation'
    ]
  },
  {
    title: 'Store Management',
    icon: 'BarChart3',
    articles: [
      'Understanding Health Score',
      'Reading Store Insights',
      'Inventory Autopilot Setup',
      'Customer Segments'
    ]
  }
];
