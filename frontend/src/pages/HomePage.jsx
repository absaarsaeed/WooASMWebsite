import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Check, 
  ChevronDown,
  MessageSquare,
  BarChart3,
  Package,
  Users,
  Activity,
  FileText,
  Zap,
  Shield,
  RefreshCw,
  Bot,
  ShoppingCart,
  Tag,
  TrendingUp,
  AlertTriangle,
  Clock,
  Star,
  Play,
  X,
  Sparkles,
  Target,
  Rocket,
  Timer,
  Brain
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';

// Rotating Headlines
const rotatingHeadlines = [
  "Ask your store anything.",
  "AI insight in seconds, not hours.",
  "Stop clicking. Start asking.",
  "Automate what others do manually.",
  "Be the store competitors fear."
];

// FAQ Data with Schema
const homeFaq = [
  {
    question: "What makes WooASM different from other WooCommerce plugins?",
    answer: "WooASM is the only plugin that lets you manage your entire store through natural conversation. It understands typos, handles multiple requests at once, remembers context, and has 101 built-in abilities covering products, orders, coupons, customers, and analytics."
  },
  {
    question: "Will WooASM work with my theme and other plugins?",
    answer: "Yes! WooASM works with any WordPress theme and is compatible with all major WooCommerce extensions. It uses native WooCommerce data and APIs."
  },
  {
    question: "Is my data safe?",
    answer: "Absolutely. WooASM processes everything through our secure API. We never store your product data or customer information. All AI queries are processed in real-time and not logged."
  },
  {
    question: "Can WooASM mess up my store?",
    answer: "We've built multiple safety features: confirmation required for all write actions, preview before bulk operations, one-click undo for mistakes, and activity logs showing exactly what changed. You're always in control."
  },
  {
    question: "How does the AI understand typos?",
    answer: "Our AI is trained to understand common typing mistakes, shorthand, and natural language. 'shwo prodcts' becomes 'show products', 'ordr 1234' becomes 'order #1234'. It learns context too — 'update that one' refers to the last item shown."
  },
  {
    question: "Why should I adopt AI for my store now?",
    answer: "AI adoption in ecommerce is accelerating rapidly. Stores using AI automation are seeing 3x faster growth, 40% time savings, and better customer experiences. Early adopters gain competitive advantages that compound over time."
  },
  {
    question: "Can I undo actions I've taken?",
    answer: "Yes! The Activity Logs page shows every action with before/after values. For supported actions (price changes, stock updates, order status, coupons), you can click 'Undo' to instantly reverse the change."
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 30-day money-back guarantee on all paid plans. If WooASM isn't right for you, just contact us for a full refund — no questions asked."
  }
];

// AI-First Benefits
const aiBenefits = [
  {
    icon: TrendingUp,
    title: "Sell More With Less Effort",
    description: "Get AI-optimized upsell recommendations and smart discount ideas that actually convert.",
    stat: "32%",
    statLabel: "avg. revenue increase"
  },
  {
    icon: Package,
    title: "Never Run Out of Stock Again",
    description: "AI predicts restocks and stockout risks before they hurt revenue. Stay ahead, always.",
    stat: "Zero",
    statLabel: "missed sales from stockouts"
  },
  {
    icon: FileText,
    title: "Scale Your Content Machine",
    description: "Turn product data into high-ranking SEO pages, emails, and ads in seconds.",
    stat: "10x",
    statLabel: "faster content creation"
  },
  {
    icon: BarChart3,
    title: "Insights Without the Overwhelm",
    description: "Instant analytics summaries — no spreadsheets, no confusion. Just ask.",
    stat: "35+",
    statLabel: "hours saved weekly"
  },
  {
    icon: Users,
    title: "Know Your Customers Deeply",
    description: "AI identifies VIPs, at-risk churners, and growth opportunities automatically.",
    stat: "2x",
    statLabel: "repeat purchase rate"
  },
  {
    icon: Shield,
    title: "Protect Your Revenue",
    description: "Fraud detection, pricing anomalies, and issue alerts before they become problems.",
    stat: "24/7",
    statLabel: "automated monitoring"
  }
];

// Comparison Data
const comparisonData = [
  { traditional: "Manual dashboards & reports", ai: "Conversational insights in seconds" },
  { traditional: "Hours of clicking through menus", ai: "One sentence commands" },
  { traditional: "Human guesswork on inventory", ai: "AI-backed predictions & alerts" },
  { traditional: "Weeks writing product content", ai: "Instant SEO-optimized copy" },
  { traditional: "Reactive problem solving", ai: "Proactive AI recommendations" },
  { traditional: "Spreadsheet data analysis", ai: "Ask questions, get answers" }
];

// Dashboard Tabs Data
const dashboards = [
  {
    id: 'insights',
    name: 'Store Insights',
    icon: BarChart3,
    description: 'See exactly how your store is performing at a glance.',
    features: [
      { label: 'Today vs Yesterday', desc: 'Revenue, orders, AOV comparison' },
      { label: 'Week over Week', desc: 'Trend analysis with % change' },
      { label: 'Top Products', desc: 'Best performers by revenue & units' },
      { label: 'Smart Alerts', desc: 'Stockout risks, refund spikes, revenue drops' },
      { label: 'Next Best Actions', desc: 'AI-recommended actions to take' }
    ]
  },
  {
    id: 'health',
    name: 'Health Score',
    icon: Activity,
    description: 'A clear 0-100 score showing your store\'s overall health.',
    features: [
      { label: 'Revenue Health', desc: 'Sales trends & growth rate' },
      { label: 'Inventory Health', desc: 'Stock levels & turnover' },
      { label: 'Customer Health', desc: 'Retention & satisfaction' },
      { label: 'Operations Health', desc: 'Order fulfillment & issues' },
      { label: 'What\'s Hurting Your Score', desc: 'Top issues to fix' }
    ]
  },
  {
    id: 'inventory',
    name: 'Inventory',
    icon: Package,
    description: 'AI-powered inventory management and predictions.',
    features: [
      { label: 'Low Stock Alerts', desc: 'Products running low' },
      { label: 'Stockout Risk', desc: 'Predict stockouts before they happen' },
      { label: 'Dead Stock', desc: 'Products that haven\'t sold' },
      { label: 'Overstock', desc: 'Excess inventory tying up cash' },
      { label: 'Restock Recommendations', desc: 'AI-calculated reorder quantities' }
    ]
  },
  {
    id: 'customers',
    name: 'Customers',
    icon: Users,
    description: 'Know your customers better than ever.',
    features: [
      { label: 'VIP Customers', desc: 'Your top spenders (Platinum/Gold/Silver)' },
      { label: 'Repeat Buyers', desc: 'Loyal customers with multiple orders' },
      { label: 'At-Risk', desc: 'Customers who haven\'t ordered recently' },
      { label: 'Churned', desc: 'Lost customers (180+ days inactive)' },
      { label: 'New Customers', desc: 'Recent signups to nurture' }
    ]
  },
  {
    id: 'content',
    name: 'Content Studio',
    icon: FileText,
    description: 'Generate professional content in seconds.',
    features: [
      { label: 'Product Descriptions', desc: 'SEO-optimized descriptions' },
      { label: 'Short Descriptions', desc: 'Punchy product summaries' },
      { label: 'SEO Meta', desc: 'Titles & meta descriptions' },
      { label: 'Email Campaigns', desc: 'Marketing emails & newsletters' },
      { label: 'Social Posts', desc: 'Ready-to-post social content' }
    ]
  },
  {
    id: 'logs',
    name: 'Activity Logs',
    icon: RefreshCw,
    description: 'Full transparency and peace of mind.',
    features: [
      { label: 'Every Action Logged', desc: 'Who did what, when' },
      { label: 'Before/After', desc: 'See exactly what changed' },
      { label: 'One-Click Undo', desc: 'Reverse mistakes instantly' },
      { label: 'CSV Export', desc: 'Download logs for records' },
      { label: 'Filter & Search', desc: 'Find specific actions quickly' }
    ]
  }
];

// Abilities Data
const abilities = [
  { category: 'Product Management', icon: Package, count: 30, color: 'bg-blue-500' },
  { category: 'Order Actions', icon: ShoppingCart, count: 20, color: 'bg-green-500' },
  { category: 'Coupon Actions', icon: Tag, count: 13, color: 'bg-purple-500' },
  { category: 'Customer Insights', icon: Users, count: 12, color: 'bg-pink-500' },
  { category: 'Analytics', icon: BarChart3, count: 14, color: 'bg-orange-500' },
  { category: 'Smart Insights', icon: Zap, count: 12, color: 'bg-yellow-500' }
];

// Use Cases Data
const useCases = [
  {
    query: "What products are selling well but running low on stock?",
    result: "Shows hot sellers with <10 units, sorted by sales velocity, with restock recommendations.",
    time: "2 seconds"
  },
  {
    query: "Create a 15% off coupon for VIP customers, minimum $100 order",
    result: "Creates coupon VIP15, 15% discount, $100 minimum. Shows preview, waits for confirmation.",
    time: "3 seconds"
  },
  {
    query: "Show me customers who spent over $500 but haven't ordered in 60 days",
    result: "Lists at-risk VIP customers with total spend, last order date, and win-back suggestions.",
    time: "2 seconds"
  },
  {
    query: "How did we do this week compared to last week?",
    result: 'Revenue up 12%, orders up 8%, AOV up 3.5%. Top performer was "Blue Widget" (+45%).',
    time: "1 second"
  }
];

// Testimonials Data
const testimonials = [
  {
    quote: "We automated what used to take our team 4 hours every morning. Now I just ask WooASM and move on. Our competitors are still clicking through dashboards.",
    author: "Sarah M.",
    role: "Fashion Boutique Owner",
    avatar: "S",
    metric: "35 hrs/week saved"
  },
  {
    quote: "The customer segments feature is gold. I found 47 VIP customers who hadn't ordered in 60 days. One win-back campaign later, I recovered $8,000 in sales.",
    author: "Mike R.",
    role: "Electronics Store",
    avatar: "M",
    metric: "$8K recovered"
  },
  {
    quote: "Being able to type 'shwo low stok' and have it understand me is incredible. This is what AI should feel like — invisible and instant.",
    author: "Lisa K.",
    role: "Home Goods Store",
    avatar: "L",
    metric: "Zero stockouts"
  }
];

const HomePage = () => {
  const [activeDashboard, setActiveDashboard] = useState('insights');
  const [openFaq, setOpenFaq] = useState(null);
  const [currentHeadline, setCurrentHeadline] = useState(0);

  // Rotate headlines
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % rotatingHeadlines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEO
        title="ChatGPT for WooCommerce | AI Store Manager - 101 AI Abilities"
        description="AI is rewriting ecommerce. Manage your WooCommerce store with AI. 101 abilities for products, orders, coupons, customers & analytics. While others click, you ask. Start free trial."
        keywords="WooCommerce AI, ChatGPT WooCommerce, AI store manager, WooCommerce assistant, WooCommerce automation, ecommerce AI, AI inventory management"
        url="https://wooasm.com"
        faq={homeFaq}
      />
      <Header />
      
      <main>
        {/* ==================== HERO SECTION ==================== */}
        <section className="relative pt-20 pb-24 lg:pt-28 lg:pb-32 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-800" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-3xl" />
          
          <div className="container-wide relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Urgency Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 text-purple-700 dark:text-purple-300 text-sm font-medium mb-8"
              >
                <Sparkles className="w-4 h-4" />
                <span>The AI era of ecommerce is here — don't get left behind</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
              >
                AI is Rewriting Ecommerce.{' '}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Are You Still Doing WooCommerce the Old Way?
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto"
              >
                While others are automating products, inventory, support, and growth — 
                you're still clicking. <strong>Ask your store like you would a human</strong>, and watch it execute.
              </motion.p>

              {/* Rotating Tagline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="h-8 mb-8"
              >
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentHeadline}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-purple-600 dark:text-purple-400 font-semibold"
                  >
                    "{rotatingHeadlines[currentHeadline]}"
                  </motion.p>
                </AnimatePresence>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap justify-center gap-8 sm:gap-12 mb-10"
              >
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-purple-600">101</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">AI Abilities</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-purple-600">12</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Smart Dashboards</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-purple-600">35+</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Hours Saved/Week</div>
                </div>
              </motion.div>

              {/* CTAs - Dual Path */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row justify-center gap-4 mb-6"
              >
                <Link
                  to="/signup"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25"
                >
                  <Rocket className="w-5 h-5" />
                  Start Free 14-Day AI Trial
                </Link>
                <Link
                  to="/features"
                  className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-500 transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  See AI in Action
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-sm text-gray-500 dark:text-gray-400"
              >
                No credit card required • Setup in 2 minutes • 30-day money-back guarantee
              </motion.p>
            </div>

            {/* Hero Chat Demo */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-16 max-w-3xl mx-auto"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2 bg-gray-50 dark:bg-gray-900">
                  <Bot className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-900 dark:text-white">WooASM AI Assistant</span>
                  <span className="ml-auto px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full">Online</span>
                </div>
                <div className="p-4 space-y-4">
                  {/* Typo Example */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-300">You</span>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-tl-none px-4 py-2">
                      <span className="text-gray-800 dark:text-gray-200">shwo me prodcts running low on stok</span>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 rounded-2xl rounded-tr-none px-4 py-3 max-w-md">
                      <div className="text-xs text-purple-600 dark:text-purple-400 mb-2 flex items-center gap-1">
                        <Brain className="w-3 h-3" />
                        Understood: "Show me products running low on stock"
                      </div>
                      <span className="text-gray-800 dark:text-gray-200">Found <strong>8 products</strong> below restock threshold. Your best seller "Blue Widget" only has 3 units left — will run out in 2 days at current velocity.</span>
                      <div className="mt-2 flex gap-2">
                        <span className="px-2 py-1 bg-white dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-400">Blue Widget (3)</span>
                        <span className="px-2 py-1 bg-white dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-400">Red Gadget (5)</span>
                        <span className="px-2 py-1 bg-white dark:bg-gray-800 rounded text-xs text-red-600">⚠️ Urgent</span>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ==================== WHY AI MATTERS NOW ==================== */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium mb-6"
              >
                <Timer className="w-4 h-4" />
                <span>The Shift Is Happening Now</span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl lg:text-5xl font-bold mb-6"
              >
                The AI Transformation in Ecommerce{' '}
                <span className="text-purple-400">Has Already Happened</span> — Are You In?
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xl text-gray-300 mb-12"
              >
                AI isn't coming. It's here — reshaping how stores optimize inventory, drive sales, and interact with customers.
                <br />
                <strong className="text-white">Smart ecommerce teams don't waste hours on manual tasks. They ask AI and act on data instantly.</strong>
              </motion.p>

              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { icon: Package, text: "Automate inventory decisions and never run out of stock" },
                  { icon: FileText, text: "Generate compelling SEO content at scale" },
                  { icon: BarChart3, text: "See revenue trends in seconds, not hours" },
                  { icon: MessageSquare, text: "Respond to reviews instantly with AI-assisted replies" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10"
                  >
                    <item.icon className="w-8 h-8 text-purple-400 mb-4 mx-auto" />
                    <p className="text-gray-300 text-sm">{item.text}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12"
              >
                <Link
                  to="/features"
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium"
                >
                  See Why AI Is a Must-Have for WooCommerce Stores
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================== AI-FIRST BENEFITS ==================== */}
        <section className="py-20 lg:py-28">
          <div className="container-wide">
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4"
              >
                AI-Powered Outcomes
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4"
              >
                Stop Managing. Start <span className="text-purple-600">Dominating</span>.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              >
                Real outcomes from AI automation — not just features, but transformation
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-purple-500 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <benefit.icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">{benefit.stat}</div>
                      <div className="text-xs text-gray-500">{benefit.statLabel}</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== COMPETITIVE COMPARISON ==================== */}
        <section className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-800">
          <div className="container-wide">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4"
              >
                Most WooCommerce Stores Still <span className="text-red-500">Work the Hard Way</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-lg text-gray-600 dark:text-gray-400"
              >
                Which side are you on?
              </motion.p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <X className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <span className="font-semibold text-red-700 dark:text-red-400">Traditional Store</span>
                </div>
                <div className="text-center p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                  <Check className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <span className="font-semibold text-green-700 dark:text-green-400">AI-Powered Store</span>
                </div>
              </div>

              {comparisonData.map((row, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="grid grid-cols-2 gap-4 mb-3"
                >
                  <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">
                    {row.traditional}
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 text-gray-900 dark:text-white font-medium">
                    {row.ai}
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 text-center"
              >
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:opacity-90 transition-all"
                >
                  Become an AI-Powered Store
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================== DASHBOARD SHOWCASE ==================== */}
        <section className="py-20 lg:py-28">
          <div className="container-wide">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
                12 Powerful Dashboards
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Every Tool You Need, <span className="text-purple-600">One Plugin</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                From daily insights to fraud detection — all in your WordPress admin
              </p>
            </div>

            {/* Dashboard Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8" role="tablist" aria-label="Dashboard features">
              {dashboards.map((dashboard) => (
                <button
                  key={dashboard.id}
                  onClick={() => setActiveDashboard(dashboard.id)}
                  role="tab"
                  aria-selected={activeDashboard === dashboard.id}
                  aria-controls={`panel-${dashboard.id}`}
                  aria-label={dashboard.name}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    activeDashboard === dashboard.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-purple-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <dashboard.icon className="w-4 h-4" aria-hidden="true" />
                  <span className="hidden sm:inline">{dashboard.name}</span>
                </button>
              ))}
            </div>

            {/* Dashboard Content */}
            <AnimatePresence mode="wait">
              {dashboards.map((dashboard) => (
                activeDashboard === dashboard.id && (
                  <motion.div
                    key={dashboard.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                      <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl flex items-center justify-center">
                        <dashboard.icon className="w-24 h-24 text-purple-400" />
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                          {dashboard.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                          {dashboard.description}
                        </p>
                        <ul className="space-y-3">
                          {dashboard.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <div>
                                <span className="font-medium text-gray-900 dark:text-white">{feature.label}:</span>{' '}
                                <span className="text-gray-600 dark:text-gray-400">{feature.desc}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* ==================== 101 ABILITIES ==================== */}
        <section className="py-20 lg:py-28 bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                101 Things WooASM Can Do For You
              </h2>
              <p className="text-xl text-purple-100">
                Every ability built-in, no coding required
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
              {abilities.map((ability, index) => (
                <motion.div
                  key={ability.category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/10 backdrop-blur rounded-xl p-4 text-center hover:bg-white/20 transition-colors"
                >
                  <ability.icon className="w-6 h-6 text-white mx-auto mb-2" />
                  <div className="text-3xl font-bold text-white">{ability.count}</div>
                  <div className="text-xs text-purple-200">{ability.category}</div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/features"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition-all"
              >
                Explore All 101 Abilities
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ==================== USE CASES ==================== */}
        <section className="py-20 lg:py-28">
          <div className="container-wide">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                See WooASM <span className="text-purple-600">in Action</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Real queries from real store owners — answered in seconds
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
                >
                  <div className="mb-4">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Store owner asks:</span>
                    <p className="text-gray-900 dark:text-white font-medium mt-1">"{useCase.query}"</p>
                  </div>
                  <div className="mb-4">
                    <span className="text-xs font-medium text-purple-600 uppercase tracking-wide">WooASM responds:</span>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{useCase.result}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                    <Zap className="w-4 h-4" />
                    {useCase.time}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== SOCIAL PROOF ==================== */}
        <section className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-800">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Forward-Thinking Stores Use WooASM to <span className="text-purple-600">Outpace Competition</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Stores with AI automation grow faster — don't let manual workflows slow you down
              </p>
            </div>

            {/* Stats Bar */}
            <div className="flex flex-wrap justify-center gap-8 lg:gap-16 mb-16 p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600">5,000+</div>
                <div className="text-gray-500 dark:text-gray-400">AI-Powered Stores</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600">2M+</div>
                <div className="text-gray-500 dark:text-gray-400">AI Queries Processed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600">3x</div>
                <div className="text-gray-500 dark:text-gray-400">Faster Growth</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600">4.9/5</div>
                <div className="text-gray-500 dark:text-gray-400">Average Rating</div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded">
                      {testimonial.metric}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== FAQ SECTION ==================== */}
        <section className="py-20 lg:py-28">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {homeFaq.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left"
                    aria-expanded={openFaq === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white pr-4">{faq.question}</h3>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-4 text-gray-600 dark:text-gray-400">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== RACE BANNER ==================== */}
        <section className="py-12 bg-gradient-to-r from-red-600 to-orange-500">
          <div className="container-wide text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-xl lg:text-2xl font-semibold text-white mb-4">
                More ecommerce brands are adopting AI every day.
                <br />
                <span className="text-red-100">Slow workflows today means lost revenue tomorrow.</span>
              </p>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-600 font-semibold rounded-xl hover:bg-gray-100 transition-all"
              >
                Be an AI Store, Not a Legacy Store
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ==================== FINAL CTA ==================== */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-gray-900 to-black text-white">
          <div className="container-wide text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-6" />
              <h2 className="text-3xl lg:text-5xl font-bold mb-4">
                Ready to Join the AI Revolution?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                In the era where AI answers your questions… why is your store still behind?
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <Link
                  to="/signup"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Rocket className="w-5 h-5" />
                  Start Free 14-Day AI Trial
                </Link>
                <Link
                  to="/features"
                  className="px-8 py-4 bg-white/10 backdrop-blur text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  See AI in Action
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8">
                <span className="flex items-center gap-2 text-gray-300">
                  <Check className="w-5 h-5 text-green-400" />
                  No credit card required
                </span>
                <span className="flex items-center gap-2 text-gray-300">
                  <Check className="w-5 h-5 text-green-400" />
                  Setup in 2 minutes
                </span>
                <span className="flex items-center gap-2 text-gray-300">
                  <Check className="w-5 h-5 text-green-400" />
                  30-day money-back guarantee
                </span>
              </div>

              <p className="text-gray-400">
                Questions? <Link to="/contact" className="text-purple-400 hover:underline">Talk to our team</Link> or{' '}
                <Link to="/features" className="text-purple-400 hover:underline">explore all features</Link>
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
