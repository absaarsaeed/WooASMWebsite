import { 
  Bot, 
  BarChart3, 
  Package, 
  Users, 
  Tag, 
  ShoppingCart, 
  LineChart, 
  FileText, 
  Shield, 
  Activity, 
  Eye, 
  Star,
  Zap,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Target,
  Sparkles,
  MessageSquare,
  RefreshCw,
  DollarSign,
  Percent
} from 'lucide-react';

export const featuresData = {
  'ai-store-assistant': {
    slug: 'ai-store-assistant',
    title: 'AI Store Assistant',
    subtitle: 'Chat with your WooCommerce store in natural language. Ask anything, get instant answers.',
    description: 'The AI Store Assistant lets you manage your WooCommerce store by simply asking questions. Get sales reports, check inventory, create coupons, and more - all through natural conversation.',
    icon: Bot,
    keywords: 'WooCommerce AI assistant, store chatbot, AI store manager, natural language WooCommerce, conversational commerce',
    benefits: [
      {
        icon: MessageSquare,
        title: 'Natural Language Queries',
        description: 'Ask questions like "What were my sales last week?" or "Show me low stock products" and get instant answers.'
      },
      {
        icon: Zap,
        title: 'Instant Actions',
        description: 'Create coupons, update prices, change order status - all by simply asking the AI.'
      },
      {
        icon: Clock,
        title: 'Save Hours Every Day',
        description: 'No more clicking through menus. Get the information you need in seconds, not minutes.'
      },
      {
        icon: Target,
        title: 'Smart Recommendations',
        description: 'The AI proactively suggests actions based on your store data and trends.'
      },
      {
        icon: CheckCircle,
        title: 'Safe Operations',
        description: 'Risky actions require confirmation. You always stay in control of your store.'
      },
      {
        icon: RefreshCw,
        title: 'Always Learning',
        description: 'The more you use it, the better it understands your store and preferences.'
      }
    ],
    howItWorks: [
      {
        title: 'Install the Plugin',
        description: 'One-click install from WordPress. No coding required.'
      },
      {
        title: 'Start a Conversation',
        description: 'Type your question or request in natural language.'
      },
      {
        title: 'Get Instant Results',
        description: 'The AI analyzes your store data and responds with accurate information or takes action.'
      },
      {
        title: 'Confirm Actions',
        description: 'For important changes, the AI asks for confirmation before proceeding.'
      }
    ],
    useCases: [
      {
        title: 'Quick Sales Check',
        description: '"Show me today\'s revenue compared to yesterday" - Get instant sales comparisons without navigating reports.'
      },
      {
        title: 'Inventory Management',
        description: '"Which products are running low?" - Instantly see products that need restocking.'
      },
      {
        title: 'Customer Insights',
        description: '"Who are my top customers this month?" - Identify your best customers quickly.'
      },
      {
        title: 'Coupon Creation',
        description: '"Create a 20% off coupon for VIP customers" - Generate promotional codes instantly.'
      }
    ],
    faq: [
      {
        question: 'What can I ask the AI Store Assistant?',
        answer: 'You can ask about sales, orders, products, customers, inventory, and more. You can also request actions like creating coupons, updating prices, or changing order statuses.'
      },
      {
        question: 'Is my store data safe?',
        answer: 'Yes, all data is processed securely. The AI only accesses the data it needs to answer your questions, and sensitive operations require confirmation.'
      },
      {
        question: 'Does it work with all WooCommerce versions?',
        answer: 'WooASM works with WooCommerce 5.0 and above, and WordPress 5.8 and above.'
      },
      {
        question: 'Can the AI make mistakes?',
        answer: 'The AI is highly accurate, but important actions always require your confirmation. You stay in control of all changes to your store.'
      },
      {
        question: 'How many questions can I ask?',
        answer: 'It depends on your plan. Free users get 50 queries per month, while paid plans offer unlimited queries.'
      }
    ],
    relatedFeatures: [
      { slug: 'store-insights-dashboard', title: 'Store Insights', description: 'Visual analytics dashboard' },
      { slug: 'content-studio', title: 'Content Studio', description: 'AI-powered content creation' },
      { slug: 'inventory-autopilot', title: 'Inventory Autopilot', description: 'Automated stock management' }
    ]
  },

  'store-health-score': {
    slug: 'store-health-score',
    title: 'Store Health Score',
    subtitle: 'Get a comprehensive health score for your WooCommerce store with actionable recommendations.',
    description: 'Store Health Score analyzes your WooCommerce store across multiple dimensions including revenue, conversion, inventory, customers, and operations to give you a single score with specific improvement recommendations.',
    icon: Activity,
    keywords: 'WooCommerce health score, store analytics, ecommerce metrics, store performance, WooCommerce optimization',
    benefits: [
      {
        icon: BarChart3,
        title: 'Single Score Overview',
        description: 'See your store\'s overall health at a glance with a score from 0-100.'
      },
      {
        icon: Target,
        title: 'Category Breakdown',
        description: 'Understand performance across revenue, conversion, inventory, customers, and operations.'
      },
      {
        icon: TrendingUp,
        title: 'Trend Tracking',
        description: 'Monitor how your health score changes over time and spot issues early.'
      },
      {
        icon: Sparkles,
        title: 'AI Recommendations',
        description: 'Get specific, actionable recommendations to improve each category.'
      },
      {
        icon: AlertTriangle,
        title: 'Issue Alerts',
        description: 'Get notified when any category drops below acceptable thresholds.'
      },
      {
        icon: CheckCircle,
        title: 'Benchmark Comparison',
        description: 'See how your store compares to industry averages and top performers.'
      }
    ],
    howItWorks: [
      {
        title: 'Automatic Analysis',
        description: 'WooASM continuously analyzes your store data across all dimensions.'
      },
      {
        title: 'Score Calculation',
        description: 'Each category is scored individually, then combined into an overall health score.'
      },
      {
        title: 'Recommendations Generated',
        description: 'AI identifies the biggest opportunities for improvement.'
      },
      {
        title: 'Track Progress',
        description: 'Monitor your score over time and see the impact of your improvements.'
      }
    ],
    useCases: [
      {
        title: 'Morning Check-in',
        description: 'Start your day by checking your store health score and addressing any urgent issues.'
      },
      {
        title: 'Strategic Planning',
        description: 'Use category scores to prioritize which areas of your business need attention.'
      },
      {
        title: 'Performance Reviews',
        description: 'Track health score trends during team meetings or monthly reviews.'
      },
      {
        title: 'Before Promotions',
        description: 'Check store health before running big sales to ensure you\'re prepared.'
      }
    ],
    faq: [
      {
        question: 'How is the health score calculated?',
        answer: 'The score is calculated across 5 categories: Revenue (20%), Conversion (20%), Inventory (20%), Customers (20%), and Operations (20%). Each category is scored 0-20, totaling 100.'
      },
      {
        question: 'How often is the score updated?',
        answer: 'The health score is updated daily, with real-time updates available on paid plans.'
      },
      {
        question: 'What\'s a good health score?',
        answer: '80+ is excellent, 60-79 is good, 40-59 needs attention, below 40 requires immediate action.'
      },
      {
        question: 'Can I customize the scoring weights?',
        answer: 'Yes, on Professional and Developer plans you can adjust category weights to match your priorities.'
      }
    ],
    relatedFeatures: [
      { slug: 'store-insights-dashboard', title: 'Store Insights', description: 'Detailed analytics dashboard' },
      { slug: 'analytics-reports', title: 'Analytics Reports', description: 'In-depth reporting' },
      { slug: 'ai-store-assistant', title: 'AI Assistant', description: 'Ask about your health score' }
    ]
  },

  'store-insights-dashboard': {
    slug: 'store-insights-dashboard',
    title: 'Store Insights Dashboard',
    subtitle: 'A beautiful, real-time dashboard showing everything happening in your WooCommerce store.',
    description: 'Store Insights Dashboard gives you a complete view of your WooCommerce store with real-time metrics, trends, and visualizations. See sales, orders, customers, and inventory all in one place.',
    icon: BarChart3,
    keywords: 'WooCommerce dashboard, store analytics, real-time metrics, ecommerce insights, sales dashboard',
    benefits: [
      {
        icon: BarChart3,
        title: 'Real-Time Metrics',
        description: 'See live updates of sales, orders, and customer activity as they happen.'
      },
      {
        icon: LineChart,
        title: 'Trend Visualization',
        description: 'Beautiful charts showing your store\'s performance over time.'
      },
      {
        icon: Target,
        title: 'KPI Tracking',
        description: 'Track your most important metrics against goals you set.'
      },
      {
        icon: Zap,
        title: 'Quick Actions',
        description: 'Take action directly from the dashboard without navigating away.'
      },
      {
        icon: RefreshCw,
        title: 'Auto-Refresh',
        description: 'Dashboard updates automatically so you always see the latest data.'
      },
      {
        icon: Sparkles,
        title: 'AI Insights',
        description: 'Get AI-generated insights about unusual patterns or opportunities.'
      }
    ],
    howItWorks: [
      {
        title: 'Connect Your Store',
        description: 'Install the plugin and your dashboard starts populating immediately.'
      },
      {
        title: 'Customize Your View',
        description: 'Choose which widgets and metrics matter most to you.'
      },
      {
        title: 'Set Your Goals',
        description: 'Define targets for key metrics to track progress.'
      },
      {
        title: 'Monitor & Act',
        description: 'Check your dashboard and take action when needed.'
      }
    ],
    useCases: [
      {
        title: 'Daily Overview',
        description: 'Get a quick snapshot of store performance every morning.'
      },
      {
        title: 'Campaign Monitoring',
        description: 'Watch real-time results during marketing campaigns or sales events.'
      },
      {
        title: 'Team Dashboards',
        description: 'Display on a monitor for the whole team to see store performance.'
      },
      {
        title: 'Executive Reporting',
        description: 'Share beautiful visualizations with stakeholders.'
      }
    ],
    faq: [
      {
        question: 'What metrics are shown on the dashboard?',
        answer: 'Revenue, orders, average order value, conversion rate, top products, customer activity, inventory status, and more. You can customize which widgets appear.'
      },
      {
        question: 'Can I create custom dashboards?',
        answer: 'Yes, on Professional and Developer plans you can create multiple custom dashboards with different widget configurations.'
      },
      {
        question: 'Does the dashboard slow down my store?',
        answer: 'No, the dashboard runs independently and doesn\'t affect your store\'s frontend performance.'
      },
      {
        question: 'Can I export dashboard data?',
        answer: 'Yes, you can export data to CSV or PDF from any dashboard view.'
      }
    ],
    relatedFeatures: [
      { slug: 'store-health-score', title: 'Store Health Score', description: 'Overall store health metrics' },
      { slug: 'analytics-reports', title: 'Analytics Reports', description: 'Detailed reporting' },
      { slug: 'ai-store-assistant', title: 'AI Assistant', description: 'Ask questions about your data' }
    ]
  },

  'inventory-autopilot': {
    slug: 'inventory-autopilot',
    title: 'Inventory Autopilot',
    subtitle: 'Never run out of stock again. AI-powered inventory management that predicts demand and alerts you.',
    description: 'Inventory Autopilot uses AI to predict demand, identify low stock products before they run out, and automate restock alerts. Keep your bestsellers in stock and reduce carrying costs.',
    icon: Package,
    keywords: 'WooCommerce inventory management, stock alerts, demand forecasting, auto restock, inventory automation',
    benefits: [
      {
        icon: AlertTriangle,
        title: 'Low Stock Alerts',
        description: 'Get notified before products run out, not after.'
      },
      {
        icon: TrendingUp,
        title: 'Demand Forecasting',
        description: 'AI predicts future demand based on historical data and trends.'
      },
      {
        icon: Clock,
        title: 'Days Until Stockout',
        description: 'See exactly how many days of stock you have for each product.'
      },
      {
        icon: Target,
        title: 'Reorder Points',
        description: 'Automatically calculated optimal reorder points for each product.'
      },
      {
        icon: DollarSign,
        title: 'Dead Stock Detection',
        description: 'Identify slow-moving inventory that\'s tying up capital.'
      },
      {
        icon: RefreshCw,
        title: 'Automated Reports',
        description: 'Weekly inventory reports delivered to your inbox.'
      }
    ],
    howItWorks: [
      {
        title: 'Analysis',
        description: 'Inventory Autopilot analyzes your sales history and current stock levels.'
      },
      {
        title: 'Prediction',
        description: 'AI predicts future demand considering seasonality and trends.'
      },
      {
        title: 'Alerts',
        description: 'You get notified when products approach their reorder points.'
      },
      {
        title: 'Action',
        description: 'Review recommendations and reorder with one click.'
      }
    ],
    useCases: [
      {
        title: 'Prevent Stockouts',
        description: 'Know which products will run out and when, so you can reorder in time.'
      },
      {
        title: 'Seasonal Planning',
        description: 'Prepare inventory for upcoming seasonal demand spikes.'
      },
      {
        title: 'Clear Dead Stock',
        description: 'Identify slow-moving products and create promotions to clear them.'
      },
      {
        title: 'Supplier Orders',
        description: 'Generate purchase orders based on predicted demand.'
      }
    ],
    faq: [
      {
        question: 'How accurate is the demand forecasting?',
        answer: 'Our AI achieves 85-95% accuracy for products with at least 3 months of sales history. Accuracy improves over time as the AI learns your patterns.'
      },
      {
        question: 'Can I set custom reorder points?',
        answer: 'Yes, you can override the AI\'s suggested reorder points for any product.'
      },
      {
        question: 'Does it work with variable products?',
        answer: 'Yes, Inventory Autopilot tracks stock at the variation level for variable products.'
      },
      {
        question: 'Can it integrate with my supplier?',
        answer: 'On Developer plans, you can set up integrations to automatically send purchase orders to suppliers.'
      }
    ],
    relatedFeatures: [
      { slug: 'ai-store-assistant', title: 'AI Assistant', description: 'Ask about inventory status' },
      { slug: 'analytics-reports', title: 'Analytics Reports', description: 'Inventory reports' },
      { slug: 'price-watch', title: 'Price Watch', description: 'Monitor competitor pricing' }
    ]
  },

  'customer-insights': {
    slug: 'customer-insights',
    title: 'Customer Insights',
    subtitle: 'Understand your customers better. See who they are, what they buy, and how to keep them coming back.',
    description: 'Customer Insights gives you deep analytics about your WooCommerce customers including lifetime value, purchase patterns, segments, and churn risk. Build better relationships and increase retention.',
    icon: Users,
    keywords: 'WooCommerce customer analytics, customer lifetime value, customer segmentation, retention analytics, customer insights',
    benefits: [
      {
        icon: Users,
        title: 'Customer Segments',
        description: 'Automatically group customers by behavior, value, and preferences.'
      },
      {
        icon: DollarSign,
        title: 'Lifetime Value',
        description: 'See each customer\'s total value and predicted future value.'
      },
      {
        icon: TrendingUp,
        title: 'Purchase Patterns',
        description: 'Understand what, when, and how often customers buy.'
      },
      {
        icon: AlertTriangle,
        title: 'Churn Risk',
        description: 'Identify customers at risk of not returning.'
      },
      {
        icon: Target,
        title: 'Top Customers',
        description: 'Know your VIPs and give them special attention.'
      },
      {
        icon: Sparkles,
        title: 'AI Recommendations',
        description: 'Get personalized suggestions for each customer segment.'
      }
    ],
    howItWorks: [
      {
        title: 'Data Collection',
        description: 'Customer Insights analyzes all your order and customer data.'
      },
      {
        title: 'Segmentation',
        description: 'AI automatically creates meaningful customer segments.'
      },
      {
        title: 'Insights Generation',
        description: 'Get insights about each segment\'s behavior and value.'
      },
      {
        title: 'Take Action',
        description: 'Use insights to create targeted campaigns and improve retention.'
      }
    ],
    useCases: [
      {
        title: 'VIP Programs',
        description: 'Identify and reward your most valuable customers.'
      },
      {
        title: 'Win-Back Campaigns',
        description: 'Target at-risk customers with special offers before they churn.'
      },
      {
        title: 'Product Recommendations',
        description: 'Suggest products based on customer segment preferences.'
      },
      {
        title: 'Marketing Optimization',
        description: 'Focus marketing spend on high-value customer segments.'
      }
    ],
    faq: [
      {
        question: 'What customer segments are created?',
        answer: 'Default segments include: New Customers, One-Time Buyers, Repeat Customers, VIPs, At-Risk, and Lost Customers. You can also create custom segments.'
      },
      {
        question: 'How is customer lifetime value calculated?',
        answer: 'CLV is calculated using historical purchase data and predictive models that consider purchase frequency, recency, and monetary value.'
      },
      {
        question: 'Can I export customer lists?',
        answer: 'Yes, you can export any segment to CSV for use in email marketing or other tools.'
      },
      {
        question: 'Does it track individual customer history?',
        answer: 'Yes, you can view complete purchase history, interactions, and analytics for any individual customer.'
      }
    ],
    relatedFeatures: [
      { slug: 'ai-store-assistant', title: 'AI Assistant', description: 'Ask about customers' },
      { slug: 'analytics-reports', title: 'Analytics Reports', description: 'Customer reports' },
      { slug: 'coupon-management', title: 'Coupon Management', description: 'Create targeted offers' }
    ]
  },

  'coupon-management': {
    slug: 'coupon-management',
    title: 'Coupon Management',
    subtitle: 'Create, manage, and optimize coupons with AI-powered recommendations.',
    description: 'Coupon Management makes it easy to create effective promotional codes, track their performance, and get AI recommendations for better discounts. Increase sales without killing your margins.',
    icon: Tag,
    keywords: 'WooCommerce coupons, discount codes, promotional codes, coupon analytics, WooCommerce discounts',
    benefits: [
      {
        icon: Zap,
        title: 'Quick Creation',
        description: 'Create coupons in seconds by just describing what you want.'
      },
      {
        icon: BarChart3,
        title: 'Performance Tracking',
        description: 'See how each coupon performs in terms of revenue and redemptions.'
      },
      {
        icon: Sparkles,
        title: 'AI Recommendations',
        description: 'Get suggestions for optimal discount amounts and targeting.'
      },
      {
        icon: Target,
        title: 'Smart Targeting',
        description: 'Limit coupons to specific products, categories, or customer segments.'
      },
      {
        icon: DollarSign,
        title: 'Margin Protection',
        description: 'Ensure discounts don\'t eat into your profits.'
      },
      {
        icon: Clock,
        title: 'Scheduled Coupons',
        description: 'Set up coupons to activate and expire automatically.'
      }
    ],
    howItWorks: [
      {
        title: 'Describe Your Coupon',
        description: 'Tell the AI what kind of promotion you want to run.'
      },
      {
        title: 'AI Creates It',
        description: 'The coupon is created with optimal settings based on your store data.'
      },
      {
        title: 'Review & Activate',
        description: 'Review the coupon details and activate when ready.'
      },
      {
        title: 'Track Performance',
        description: 'Monitor redemptions and revenue impact in real-time.'
      }
    ],
    useCases: [
      {
        title: 'Flash Sales',
        description: 'Quickly create time-limited discount codes for flash promotions.'
      },
      {
        title: 'Customer Recovery',
        description: 'Send personalized discount codes to customers who haven\'t purchased recently.'
      },
      {
        title: 'VIP Rewards',
        description: 'Create exclusive discounts for your best customers.'
      },
      {
        title: 'First Purchase',
        description: 'Offer new customers a discount on their first order.'
      }
    ],
    faq: [
      {
        question: 'What types of discounts can I create?',
        answer: 'Percentage discounts, fixed amount discounts, free shipping, buy X get Y, and more. All standard WooCommerce coupon types are supported.'
      },
      {
        question: 'Can I limit who can use a coupon?',
        answer: 'Yes, you can restrict coupons to specific customer emails, roles, segments, or those who match certain criteria.'
      },
      {
        question: 'How do I track coupon performance?',
        answer: 'The Coupon Management dashboard shows redemptions, revenue generated, and ROI for each coupon.'
      },
      {
        question: 'Can I create coupons by just asking?',
        answer: 'Yes! Just tell the AI assistant something like "Create a 15% off coupon for first-time customers" and it will create it for you.'
      }
    ],
    relatedFeatures: [
      { slug: 'ai-store-assistant', title: 'AI Assistant', description: 'Create coupons by asking' },
      { slug: 'customer-insights', title: 'Customer Insights', description: 'Target customer segments' },
      { slug: 'analytics-reports', title: 'Analytics Reports', description: 'Coupon performance reports' }
    ]
  },

  'order-management': {
    slug: 'order-management',
    title: 'Order Management',
    subtitle: 'Manage orders faster with AI assistance. Update statuses, process refunds, and handle issues efficiently.',
    description: 'Order Management streamlines your WooCommerce order processing with AI-powered tools. Update order statuses, process refunds, add notes, and handle customer issues - all from one place or by simply asking.',
    icon: ShoppingCart,
    keywords: 'WooCommerce order management, order processing, refund management, order automation, WooCommerce orders',
    benefits: [
      {
        icon: Zap,
        title: 'Quick Actions',
        description: 'Update multiple orders at once or by simply asking the AI.'
      },
      {
        icon: RefreshCw,
        title: 'Status Automation',
        description: 'Set up rules to automatically update order statuses.'
      },
      {
        icon: DollarSign,
        title: 'Refund Processing',
        description: 'Handle refunds with proper tracking and customer communication.'
      },
      {
        icon: MessageSquare,
        title: 'Order Notes',
        description: 'Add and view internal notes for better team communication.'
      },
      {
        icon: AlertTriangle,
        title: 'Issue Detection',
        description: 'AI flags orders that may have issues needing attention.'
      },
      {
        icon: Target,
        title: 'Search & Filter',
        description: 'Find any order instantly with powerful search and filters.'
      }
    ],
    howItWorks: [
      {
        title: 'View Orders',
        description: 'See all your orders in a clean, sortable list.'
      },
      {
        title: 'Take Action',
        description: 'Update status, process refunds, or add notes with one click.'
      },
      {
        title: 'Or Just Ask',
        description: 'Tell the AI what you want to do and it handles the rest.'
      },
      {
        title: 'Stay Informed',
        description: 'Get alerts for orders needing attention.'
      }
    ],
    useCases: [
      {
        title: 'Bulk Processing',
        description: 'Mark multiple orders as shipped after a batch pickup.'
      },
      {
        title: 'Refund Handling',
        description: 'Process customer refund requests with proper documentation.'
      },
      {
        title: 'Issue Resolution',
        description: 'Quickly identify and resolve problematic orders.'
      },
      {
        title: 'Team Handoffs',
        description: 'Add notes for team members handling specific orders.'
      }
    ],
    faq: [
      {
        question: 'Can I update multiple orders at once?',
        answer: 'Yes, you can select multiple orders and update their status in bulk. Or ask the AI to update all orders matching certain criteria.'
      },
      {
        question: 'How are refunds processed?',
        answer: 'Refunds are processed through your payment gateway. WooASM tracks the refund, updates order status, and can notify the customer.'
      },
      {
        question: 'Can I set up automation rules?',
        answer: 'Yes, on paid plans you can create rules like "automatically mark orders as completed when shipped via tracking number".'
      },
      {
        question: 'Does it integrate with shipping providers?',
        answer: 'WooASM integrates with popular shipping plugins and can pull tracking information automatically.'
      }
    ],
    relatedFeatures: [
      { slug: 'ai-store-assistant', title: 'AI Assistant', description: 'Manage orders by asking' },
      { slug: 'analytics-reports', title: 'Analytics Reports', description: 'Order analytics' },
      { slug: 'fraud-alerts', title: 'Fraud Alerts', description: 'Detect suspicious orders' }
    ]
  },

  'analytics-reports': {
    slug: 'analytics-reports',
    title: 'Analytics & Reports',
    subtitle: 'Deep analytics and beautiful reports for your WooCommerce store. Export, share, and make data-driven decisions.',
    description: 'Analytics & Reports gives you comprehensive insights into your WooCommerce store performance with customizable reports, scheduled exports, and AI-powered analysis.',
    icon: LineChart,
    keywords: 'WooCommerce analytics, store reports, sales analytics, ecommerce reporting, WooCommerce insights',
    benefits: [
      {
        icon: BarChart3,
        title: 'Comprehensive Reports',
        description: 'Sales, products, customers, inventory - reports for every aspect of your store.'
      },
      {
        icon: Calendar,
        title: 'Date Range Flexibility',
        description: 'Analyze any time period with custom date ranges and comparisons.'
      },
      {
        icon: FileText,
        title: 'Export Options',
        description: 'Export to CSV, PDF, or Excel for sharing and further analysis.'
      },
      {
        icon: Clock,
        title: 'Scheduled Reports',
        description: 'Automatically receive reports via email on your schedule.'
      },
      {
        icon: Sparkles,
        title: 'AI Analysis',
        description: 'Get AI-generated insights about trends and anomalies.'
      },
      {
        icon: Target,
        title: 'Custom Reports',
        description: 'Build custom reports with the metrics that matter to you.'
      }
    ],
    howItWorks: [
      {
        title: 'Choose Report Type',
        description: 'Select from pre-built reports or create your own.'
      },
      {
        title: 'Set Parameters',
        description: 'Choose date range, filters, and metrics to include.'
      },
      {
        title: 'Generate Report',
        description: 'Get instant results with beautiful visualizations.'
      },
      {
        title: 'Export or Schedule',
        description: 'Download, share, or set up automatic delivery.'
      }
    ],
    useCases: [
      {
        title: 'Monthly Reviews',
        description: 'Generate comprehensive monthly performance reports for stakeholders.'
      },
      {
        title: 'Product Analysis',
        description: 'Understand which products drive revenue and which underperform.'
      },
      {
        title: 'Tax Reporting',
        description: 'Export sales data for tax preparation and compliance.'
      },
      {
        title: 'Trend Analysis',
        description: 'Compare periods to understand growth patterns.'
      }
    ],
    faq: [
      {
        question: 'What reports are available?',
        answer: 'Sales reports, product performance, customer analytics, inventory status, refund analysis, coupon performance, and many more. Custom reports are also available.'
      },
      {
        question: 'Can I schedule automatic reports?',
        answer: 'Yes, you can schedule any report to be generated and emailed daily, weekly, or monthly.'
      },
      {
        question: 'What export formats are supported?',
        answer: 'CSV, PDF, and Excel formats are supported. API access for custom integrations is available on Developer plans.'
      },
      {
        question: 'Can I compare different time periods?',
        answer: 'Yes, all reports support period comparison - this week vs last week, this year vs last year, and custom date ranges.'
      }
    ],
    relatedFeatures: [
      { slug: 'store-insights-dashboard', title: 'Store Insights', description: 'Real-time dashboard' },
      { slug: 'store-health-score', title: 'Store Health Score', description: 'Performance metrics' },
      { slug: 'ai-store-assistant', title: 'AI Assistant', description: 'Ask for reports' }
    ]
  },

  'content-studio': {
    slug: 'content-studio',
    title: 'Content Studio',
    subtitle: 'AI-powered content creation for your WooCommerce store. Generate product descriptions, emails, and more.',
    description: 'Content Studio uses AI to help you create compelling product descriptions, marketing emails, social media posts, and more. Save hours on content creation while maintaining quality.',
    icon: FileText,
    keywords: 'WooCommerce content, AI copywriting, product descriptions, marketing automation, content creation',
    benefits: [
      {
        icon: FileText,
        title: 'Product Descriptions',
        description: 'Generate SEO-optimized product descriptions in seconds.'
      },
      {
        icon: MessageSquare,
        title: 'Marketing Emails',
        description: 'Create compelling email campaigns for promotions and updates.'
      },
      {
        icon: Sparkles,
        title: 'Social Media Posts',
        description: 'Generate engaging posts for all your social channels.'
      },
      {
        icon: Target,
        title: 'Brand Voice',
        description: 'Content matches your brand\'s tone and style.'
      },
      {
        icon: Zap,
        title: 'Bulk Generation',
        description: 'Generate content for multiple products at once.'
      },
      {
        icon: CheckCircle,
        title: 'Edit & Refine',
        description: 'Fine-tune generated content before publishing.'
      }
    ],
    howItWorks: [
      {
        title: 'Select Content Type',
        description: 'Choose what you want to create - description, email, social post, etc.'
      },
      {
        title: 'Provide Context',
        description: 'Select the product or provide details about your promotion.'
      },
      {
        title: 'Generate Options',
        description: 'AI creates multiple variations to choose from.'
      },
      {
        title: 'Edit & Publish',
        description: 'Refine the content and use it in your store or marketing.'
      }
    ],
    useCases: [
      {
        title: 'New Product Launches',
        description: 'Quickly create descriptions for new products.'
      },
      {
        title: 'Sale Promotions',
        description: 'Generate email and social content for upcoming sales.'
      },
      {
        title: 'SEO Improvement',
        description: 'Rewrite existing descriptions to be more SEO-friendly.'
      },
      {
        title: 'Bulk Updates',
        description: 'Update descriptions for entire product categories.'
      }
    ],
    faq: [
      {
        question: 'What types of content can I create?',
        answer: 'Product descriptions, meta descriptions, marketing emails, social media posts, blog outlines, and ad copy.'
      },
      {
        question: 'Will the content be unique?',
        answer: 'Yes, each generation creates original content. You can also regenerate to get different variations.'
      },
      {
        question: 'Can I set my brand voice?',
        answer: 'Yes, you can configure your brand\'s tone (professional, casual, playful, etc.) and the AI will match it.'
      },
      {
        question: 'Is the content SEO-optimized?',
        answer: 'Yes, product descriptions and meta descriptions are generated with SEO best practices in mind.'
      }
    ],
    relatedFeatures: [
      { slug: 'ai-store-assistant', title: 'AI Assistant', description: 'Ask for content ideas' },
      { slug: 'analytics-reports', title: 'Analytics Reports', description: 'Content performance' },
      { slug: 'customer-insights', title: 'Customer Insights', description: 'Understand your audience' }
    ]
  },

  'fraud-alerts': {
    slug: 'fraud-alerts',
    title: 'Fraud Alerts',
    subtitle: 'Protect your store from fraud with AI-powered detection and alerts.',
    description: 'Fraud Alerts uses AI to detect suspicious orders, flag high-risk transactions, and protect your WooCommerce store from chargebacks and fraud.',
    icon: Shield,
    keywords: 'WooCommerce fraud protection, fraud detection, chargeback prevention, order security, fraud alerts',
    benefits: [
      {
        icon: Shield,
        title: 'AI Detection',
        description: 'Machine learning identifies suspicious patterns and behaviors.'
      },
      {
        icon: AlertTriangle,
        title: 'Real-Time Alerts',
        description: 'Get notified immediately when a high-risk order is placed.'
      },
      {
        icon: Target,
        title: 'Risk Scoring',
        description: 'Each order gets a fraud risk score for easy prioritization.'
      },
      {
        icon: CheckCircle,
        title: 'False Positive Reduction',
        description: 'Smart algorithms minimize blocking legitimate customers.'
      },
      {
        icon: DollarSign,
        title: 'Chargeback Prevention',
        description: 'Reduce costly chargebacks by catching fraud early.'
      },
      {
        icon: Activity,
        title: 'Fraud Reports',
        description: 'Understand fraud patterns and trends in your store.'
      }
    ],
    howItWorks: [
      {
        title: 'Order Analysis',
        description: 'Every order is analyzed in real-time using multiple data points.'
      },
      {
        title: 'Risk Assessment',
        description: 'AI calculates a fraud risk score based on patterns and signals.'
      },
      {
        title: 'Alert Generation',
        description: 'High-risk orders trigger immediate alerts.'
      },
      {
        title: 'Review & Action',
        description: 'Review flagged orders and take appropriate action.'
      }
    ],
    useCases: [
      {
        title: 'High-Value Orders',
        description: 'Extra scrutiny on large orders that could result in big losses.'
      },
      {
        title: 'New Customer Orders',
        description: 'Verify orders from first-time customers with no history.'
      },
      {
        title: 'International Orders',
        description: 'Flag orders from high-risk regions or with mismatched addresses.'
      },
      {
        title: 'Velocity Checks',
        description: 'Detect multiple rapid orders that may indicate fraud.'
      }
    ],
    faq: [
      {
        question: 'How does fraud detection work?',
        answer: 'The AI analyzes multiple signals including IP address, email patterns, billing/shipping match, order history, device fingerprint, and more.'
      },
      {
        question: 'Will it block legitimate customers?',
        answer: 'The system is tuned to minimize false positives. High-risk orders are flagged for review, not automatically blocked, so you make the final decision.'
      },
      {
        question: 'What happens when fraud is detected?',
        answer: 'You receive an immediate alert with the order details and risk factors. You can then review and decide to process, verify with customer, or cancel.'
      },
      {
        question: 'Does it work with all payment gateways?',
        answer: 'Yes, Fraud Alerts works with all WooCommerce payment gateways including Stripe, PayPal, Square, and more.'
      }
    ],
    relatedFeatures: [
      { slug: 'order-management', title: 'Order Management', description: 'Manage flagged orders' },
      { slug: 'analytics-reports', title: 'Analytics Reports', description: 'Fraud analysis reports' },
      { slug: 'activity-logs', title: 'Activity Logs', description: 'Track all store activity' }
    ]
  },

  'activity-logs': {
    slug: 'activity-logs',
    title: 'Activity Logs',
    subtitle: 'Complete audit trail of everything that happens in your WooCommerce store.',
    description: 'Activity Logs provides a detailed record of all actions taken in your store - by you, your team, the AI, or automated processes. Never wonder what happened or when.',
    icon: Activity,
    keywords: 'WooCommerce audit log, activity tracking, store history, admin logs, WooCommerce security',
    benefits: [
      {
        icon: Activity,
        title: 'Complete History',
        description: 'Every action is logged with timestamp, user, and details.'
      },
      {
        icon: Users,
        title: 'User Tracking',
        description: 'See who did what and when across your entire team.'
      },
      {
        icon: Bot,
        title: 'AI Actions',
        description: 'Track all actions taken by the AI assistant.'
      },
      {
        icon: Target,
        title: 'Powerful Search',
        description: 'Find any action quickly with filters and search.'
      },
      {
        icon: FileText,
        title: 'Export Logs',
        description: 'Export logs for compliance or analysis.'
      },
      {
        icon: AlertTriangle,
        title: 'Anomaly Detection',
        description: 'Get alerted to unusual activity patterns.'
      }
    ],
    howItWorks: [
      {
        title: 'Automatic Logging',
        description: 'All actions are automatically recorded without any setup.'
      },
      {
        title: 'Categorization',
        description: 'Logs are organized by type, user, and severity.'
      },
      {
        title: 'Search & Filter',
        description: 'Find specific actions with powerful search tools.'
      },
      {
        title: 'Review & Export',
        description: 'Review activity and export for compliance needs.'
      }
    ],
    useCases: [
      {
        title: 'Troubleshooting',
        description: 'Understand what changed when diagnosing issues.'
      },
      {
        title: 'Security Audit',
        description: 'Review all user actions for security compliance.'
      },
      {
        title: 'Team Oversight',
        description: 'Monitor team member activity and changes.'
      },
      {
        title: 'AI Verification',
        description: 'Review and verify all AI-initiated actions.'
      }
    ],
    faq: [
      {
        question: 'What actions are logged?',
        answer: 'Everything - logins, order changes, product edits, setting updates, AI actions, coupon usage, and more.'
      },
      {
        question: 'How long are logs retained?',
        answer: 'Free plans retain 7 days, Starter 30 days, Professional 90 days, and Developer plans 1 year with optional extended retention.'
      },
      {
        question: 'Can I export logs?',
        answer: 'Yes, logs can be exported to CSV or JSON for external analysis or compliance documentation.'
      },
      {
        question: 'Are AI actions tracked separately?',
        answer: 'Yes, you can filter to see only AI-initiated actions, making it easy to audit what the assistant has done.'
      }
    ],
    relatedFeatures: [
      { slug: 'fraud-alerts', title: 'Fraud Alerts', description: 'Security monitoring' },
      { slug: 'order-management', title: 'Order Management', description: 'Order history' },
      { slug: 'ai-store-assistant', title: 'AI Assistant', description: 'AI action tracking' }
    ]
  },

  'price-watch': {
    slug: 'price-watch',
    title: 'Price Watch',
    subtitle: 'Monitor competitor prices and market trends. Stay competitive without constant manual checking.',
    description: 'Price Watch tracks competitor pricing for your products, alerts you to market changes, and helps you optimize your pricing strategy with AI recommendations.',
    icon: Eye,
    keywords: 'WooCommerce price monitoring, competitor tracking, price optimization, pricing strategy, market intelligence',
    benefits: [
      {
        icon: Eye,
        title: 'Competitor Tracking',
        description: 'Monitor prices from competitors automatically.'
      },
      {
        icon: AlertTriangle,
        title: 'Price Change Alerts',
        description: 'Get notified when competitors change their prices.'
      },
      {
        icon: TrendingUp,
        title: 'Market Trends',
        description: 'Understand pricing trends in your market.'
      },
      {
        icon: Sparkles,
        title: 'AI Recommendations',
        description: 'Get suggestions for optimal pricing based on market data.'
      },
      {
        icon: Target,
        title: 'Price Rules',
        description: 'Set rules to automatically adjust prices based on competition.'
      },
      {
        icon: BarChart3,
        title: 'Price History',
        description: 'View historical pricing data and trends.'
      }
    ],
    howItWorks: [
      {
        title: 'Add Competitors',
        description: 'Tell us which competitors to track for each product.'
      },
      {
        title: 'Automatic Monitoring',
        description: 'Price Watch checks competitor prices regularly.'
      },
      {
        title: 'Analysis',
        description: 'AI analyzes pricing patterns and opportunities.'
      },
      {
        title: 'Act on Insights',
        description: 'Adjust your prices based on market intelligence.'
      }
    ],
    useCases: [
      {
        title: 'Competitive Pricing',
        description: 'Ensure your prices stay competitive in the market.'
      },
      {
        title: 'Dynamic Pricing',
        description: 'Automatically adjust prices based on competition.'
      },
      {
        title: 'Market Research',
        description: 'Understand pricing strategies in your industry.'
      },
      {
        title: 'Sale Planning',
        description: 'Time your promotions based on competitor activity.'
      }
    ],
    faq: [
      {
        question: 'How many competitors can I track?',
        answer: 'Depends on your plan - Starter: 5, Professional: 20, Developer: Unlimited competitors.'
      },
      {
        question: 'How often are prices checked?',
        answer: 'Prices are checked daily on most plans, with hourly updates available on Developer plans.'
      },
      {
        question: 'Can it automatically change my prices?',
        answer: 'Yes, on Professional and Developer plans you can set rules to automatically adjust prices within limits you define.'
      },
      {
        question: 'Which websites can be monitored?',
        answer: 'Most public e-commerce websites can be monitored. Some sites with strong anti-bot measures may have limitations.'
      }
    ],
    relatedFeatures: [
      { slug: 'analytics-reports', title: 'Analytics Reports', description: 'Pricing analytics' },
      { slug: 'ai-store-assistant', title: 'AI Assistant', description: 'Ask about competitor prices' },
      { slug: 'inventory-autopilot', title: 'Inventory Autopilot', description: 'Combined inventory & pricing' }
    ]
  },

  'reviews-management': {
    slug: 'reviews-management',
    title: 'Reviews Management',
    subtitle: 'Monitor, respond to, and leverage customer reviews to build trust and improve your products.',
    description: 'Reviews Management helps you track customer reviews, respond quickly, identify sentiment trends, and use feedback to improve your products and store.',
    icon: Star,
    keywords: 'WooCommerce reviews, review management, customer feedback, review monitoring, reputation management',
    benefits: [
      {
        icon: Star,
        title: 'Review Monitoring',
        description: 'Track all reviews across your store in one place.'
      },
      {
        icon: MessageSquare,
        title: 'Quick Responses',
        description: 'Respond to reviews quickly with AI-suggested replies.'
      },
      {
        icon: TrendingUp,
        title: 'Sentiment Analysis',
        description: 'Understand overall sentiment trends from reviews.'
      },
      {
        icon: AlertTriangle,
        title: 'Negative Review Alerts',
        description: 'Get notified immediately about negative reviews.'
      },
      {
        icon: Target,
        title: 'Review Requests',
        description: 'Automatically request reviews from happy customers.'
      },
      {
        icon: Sparkles,
        title: 'AI Insights',
        description: 'Extract product improvement ideas from review themes.'
      }
    ],
    howItWorks: [
      {
        title: 'Monitor Reviews',
        description: 'All reviews are collected and displayed in your dashboard.'
      },
      {
        title: 'Analyze Sentiment',
        description: 'AI categorizes reviews and identifies themes.'
      },
      {
        title: 'Respond Quickly',
        description: 'Use AI-suggested responses or write your own.'
      },
      {
        title: 'Take Action',
        description: 'Use insights to improve products and processes.'
      }
    ],
    useCases: [
      {
        title: 'Reputation Management',
        description: 'Maintain a positive store image by responding to all reviews.'
      },
      {
        title: 'Product Improvement',
        description: 'Identify common complaints to improve products.'
      },
      {
        title: 'Review Generation',
        description: 'Increase review count by asking satisfied customers.'
      },
      {
        title: 'Damage Control',
        description: 'Quickly address negative reviews before they spread.'
      }
    ],
    faq: [
      {
        question: 'Can it respond to reviews automatically?',
        answer: 'AI can suggest responses, but all replies require your approval to maintain authenticity and brand voice.'
      },
      {
        question: 'Does it work with external review platforms?',
        answer: 'Currently focused on WooCommerce reviews. Integration with Google Reviews and other platforms is coming soon.'
      },
      {
        question: 'How does sentiment analysis work?',
        answer: 'AI reads each review and categorizes it as positive, negative, or neutral, and identifies specific topics mentioned.'
      },
      {
        question: 'Can I request reviews from customers?',
        answer: 'Yes, you can set up automated review request emails sent to customers after order completion.'
      }
    ],
    relatedFeatures: [
      { slug: 'customer-insights', title: 'Customer Insights', description: 'Understand your customers' },
      { slug: 'content-studio', title: 'Content Studio', description: 'Create review response templates' },
      { slug: 'ai-store-assistant', title: 'AI Assistant', description: 'Ask about review trends' }
    ]
  }
};

// Calendar import for analytics
import { Calendar } from 'lucide-react';

export default featuresData;
