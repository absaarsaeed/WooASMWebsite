import React, { useState } from 'react';
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
  Star
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';

// FAQ Data with Schema
const homeFaq = [
  {
    question: "How is WooASM different from other WooCommerce plugins?",
    answer: "WooASM is the only plugin that lets you run your entire store just by talking to it. No menus, no confusion - just ask for what you need. It understands typos, handles multiple tasks at once, and knows your products, orders, and customers inside out."
  },
  {
    question: "Will it work with my existing setup?",
    answer: "Yes! WooASM plays nicely with any WordPress theme and all your existing WooCommerce plugins. It connects directly to your store data - no migrations or imports needed."
  },
  {
    question: "Is my store data safe?",
    answer: "100%. Your data stays in your store - we never store your products or customer info. All AI processing happens in real-time through secure connections, and nothing is logged."
  },
  {
    question: "Can it accidentally break my store?",
    answer: "We've made sure that's nearly impossible. Every change needs your confirmation first. Bulk updates show you exactly what will happen before it does. And if anything goes wrong, one click reverses it instantly."
  },
  {
    question: "I'm not tech-savvy. Can I still use this?",
    answer: "That's exactly who we built this for! If you can send a text message, you can use WooASM. Just type what you want in plain English - even with typos - and it figures out the rest."
  },
  {
    question: "What if I type something wrong?",
    answer: "No worries! WooASM understands messy typing. 'shwo me prodcts under 50' becomes 'show me products under $50' automatically. It also remembers what you were just talking about, so you can say 'update that one' and it knows exactly what you mean."
  },
  {
    question: "What happens when I reach my daily limit?",
    answer: "You'll see a friendly heads-up with your remaining queries and when they reset (midnight UTC). You can upgrade instantly for more, or just wait until tomorrow - your data isn't going anywhere."
  },
  {
    question: "Can I reverse something I did by accident?",
    answer: "Absolutely! Every action is logged with before-and-after details. For things like price changes, stock updates, or order status changes, just click 'Undo' and it's like it never happened."
  },
  {
    question: "What if it's not right for my store?",
    answer: "No problem at all. Try it free for 14 days, and if you upgrade and change your mind, we offer a 30-day money-back guarantee. No hoops to jump through, no questions asked."
  }
];

// Features Data
const features = [
  {
    icon: MessageSquare,
    title: "Your Store, Your Way",
    description: "Just type what you need. 'Show me last week's sales' or 'Create a 20% off coupon' - done in seconds.",
    highlights: ["Works even with typos", "Handle multiple tasks at once", "Remembers what you asked", "101 things it can do"],
    link: "/features/ai-store-assistant"
  },
  {
    icon: BarChart3,
    title: "Know Your Numbers",
    description: "Stop wondering how your store is doing. See everything at a glance and spot problems before they grow.",
    highlights: ["Today vs Yesterday", "Week over Week trends", "Alerts when things go wrong", "What to do next"],
    link: "/features/store-insights-dashboard"
  },
  {
    icon: Package,
    title: "Never Run Out of Stock",
    description: "Imagine knowing exactly what to reorder and when. No more 'out of stock' emails from angry customers.",
    highlights: ["Predict stockouts in advance", "Find products that aren't selling", "Smart restock suggestions", "Alert before you run low"],
    link: "/features/inventory-autopilot"
  },
  {
    icon: Users,
    title: "Know Your Customers",
    description: "Find out who your best buyers are, who's about to leave, and how to keep them coming back.",
    highlights: ["Spot your VIP shoppers", "Catch customers before they leave", "Predict who's likely to buy again", "See what each customer is worth"],
    link: "/features/customer-insights"
  },
  {
    icon: Activity,
    title: "Store Health at a Glance",
    description: "One number tells you if your store is thriving or needs attention. Like a fitness tracker, but for your business.",
    highlights: ["Revenue check", "Inventory check", "Customer check", "Operations check"],
    link: "/features/store-health-score"
  },
  {
    icon: FileText,
    title: "Content That Writes Itself",
    description: "Need product descriptions, emails, or social posts? Just describe what you're selling and let the magic happen.",
    highlights: ["Product descriptions", "SEO-friendly content", "Email campaigns", "Social media posts"],
    link: "/features/content-studio"
  }
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
    query: "What's selling fast but running low on stock?",
    result: "Shows your hot sellers with less than 10 units left, sorted by how fast they're moving, plus exactly how many to reorder.",
    time: "2 seconds"
  },
  {
    query: "Make a special 15% off code for my best customers, $100 minimum",
    result: "Creates your VIP15 coupon, sets all the rules, shows you a preview. One click to go live.",
    time: "3 seconds"
  },
  {
    query: "Who spent big money but hasn't come back in 2 months?",
    result: "Lists your at-risk VIPs with their spending history, last order date, and ideas to win them back.",
    time: "2 seconds"
  },
  {
    query: "How'd we do this week compared to last week?",
    result: 'Revenue up 12%, orders up 8%, average order up 3.5%. Your Blue Widget was the star performer (+45%).',
    time: "1 second"
  },
  {
    query: "Mark today's processing orders as completed",
    result: 'Found 12 orders. Shows you the list. "Ready to update all 12?" - you stay in control.',
    time: "Safe & simple"
  },
  {
    query: "Write something catchy for our new organic coffee blend",
    result: "Creates a scroll-stopping description highlighting what makes it special, with a clear call to buy.",
    time: "Content that converts"
  }
];

// Testimonials Data
const testimonials = [
  {
    quote: "I used to spend my mornings digging through reports and checking inventory. Now I just ask and get answers. It's like having a business partner who never sleeps.",
    author: "Sarah M.",
    role: "Fashion Boutique Owner",
    avatar: "S"
  },
  {
    quote: "Found 47 loyal customers who hadn't bought in 2 months. Sent one win-back email, recovered $8,000. Paid for the whole year in one afternoon.",
    author: "Mike R.",
    role: "Electronics Store",
    avatar: "M"
  },
  {
    quote: "I can type 'shwo low stok' at midnight and it just works. No more digging through endless WooCommerce menus trying to find what I need.",
    author: "Lisa K.",
    role: "Home Goods Store",
    avatar: "L"
  }
];

const HomePage = () => {
  const [activeDashboard, setActiveDashboard] = useState('insights');
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEO
        title="WooASM - Run Your WooCommerce Store Just By Asking"
        description="Stop clicking through endless menus. Just tell WooASM what you need and watch it happen. 101 things your store assistant can do - from stock alerts to customer insights. Start free."
        keywords="WooCommerce plugin, AI store assistant, WooCommerce automation, inventory management, ecommerce AI, smart store management"
        url="https://wooasm.com"
        faq={homeFaq}
      />
      <Header />
      
      <main>
        {/* ==================== HERO SECTION ==================== */}
        <section className="relative pt-20 pb-24 lg:pt-28 lg:pb-32 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-800" />
          
          <div className="container-wide relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-sm font-medium mb-8"
              >
                <Zap className="w-4 h-4" />
                <span>Trusted by 5,000+ Store Owners</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
              >
                Run Your Store{' '}
                <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                  Just By Asking
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
              >
                Stop clicking through endless menus. Type what you need in plain English - 
                even with typos - and watch it happen. Like having a brilliant assistant who knows your entire store.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap justify-center gap-8 sm:gap-12 mb-10"
              >
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-purple-600">101</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Things It Can Do</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-purple-600">35+</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Hours Saved Weekly</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-purple-600">1-Click</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Undo Any Mistake</div>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap justify-center gap-4 mb-6"
              >
                <Link
                  to="/signup"
                  className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105 flex items-center gap-2"
                  data-testid="hero-cta-start-trial"
                >
                  Start Free - No Card Needed
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/features"
                  className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-500 transition-all"
                  data-testid="hero-cta-see-features"
                >
                  See What It Can Do
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-sm text-gray-500 dark:text-gray-400"
              >
                Works in 2 minutes • No coding needed • Cancel anytime
              </motion.p>
            </div>

            {/* Hero Chat Demo */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-16 max-w-3xl mx-auto"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
                  <Bot className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-900 dark:text-white">Your Store Assistant</span>
                </div>
                <div className="p-4 space-y-4">
                  {/* Typo Example */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">You</span>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-tl-none px-4 py-2">
                      <span className="text-gray-800 dark:text-gray-200">shwo me prodcts under 50 dolars</span>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <div className="bg-purple-100 dark:bg-purple-900/40 rounded-2xl rounded-tr-none px-4 py-2 max-w-md">
                      <div className="text-xs text-purple-600 dark:text-purple-400 mb-1">Got it! "Show me products under $50"</div>
                      <span className="text-gray-800 dark:text-gray-200">Found <strong>24 products</strong> under $50. Here are your top sellers:</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ==================== FEATURES SECTION ==================== */}
        <section className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-800">
          <div className="container-wide">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Everything You Need, <span className="text-purple-600">Nothing You Don't</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Built for store owners who want results, not complexity
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-2xl border transition-all hover:shadow-lg ${
                    index === 0
                      ? 'bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800 border-purple-200 dark:border-purple-800'
                      : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-purple-500'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {feature.description}
                  </p>
                  <ul className="space-y-2 mb-4">
                    {feature.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={feature.link}
                    className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium text-sm"
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== AI ASSISTANT SECTION ==================== */}
        <section className="py-20 lg:py-28">
          <div className="container-wide">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
                Works Like Magic
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Type Messy. <span className="text-purple-600">Get Perfect Results.</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                No special commands. No learning curve. Just talk like you would to a helpful colleague.
              </p>
            </div>

            {/* Chat Examples */}
            <div className="max-w-3xl mx-auto space-y-8 mb-16">
              {/* Example 1 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="mb-4">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">You type (typos and all):</span>
                  <p className="text-lg text-gray-900 dark:text-white font-mono bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded mt-1">
                    "shwo me prodcts under 50 dolars"
                  </p>
                </div>
                <div className="mb-4">
                  <span className="text-xs font-medium text-purple-600 uppercase tracking-wide">WooASM figures it out:</span>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mt-1">
                    "Show me products under $50"
                  </p>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">Boom - 24 products, sorted by bestsellers</span>
                </div>
              </motion.div>

              {/* Example 2 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="mb-4">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">You ask for two things at once:</span>
                  <p className="text-lg text-gray-900 dark:text-white font-mono bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded mt-1">
                    "show low stock and make a 10% coupon for VIPs"
                  </p>
                </div>
                <div className="mb-4">
                  <span className="text-xs font-medium text-purple-600 uppercase tracking-wide">WooASM handles both:</span>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-sm font-bold text-purple-600">1</span>
                      <span className="text-gray-700 dark:text-gray-300">Pulls your low stock report</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-sm font-bold text-purple-600">2</span>
                      <span className="text-gray-700 dark:text-gray-300">Creates your VIP10 coupon, ready to activate</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Abilities Counter */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl p-8 lg:p-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-white text-center mb-8">
                101 Ways to Make Your Life Easier
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {abilities.map((ability, index) => (
                  <motion.div
                    key={ability.category}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white/10 backdrop-blur rounded-xl p-4 text-center"
                  >
                    <ability.icon className="w-6 h-6 text-white mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{ability.count}</div>
                    <div className="text-xs text-purple-200">{ability.category}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================== DASHBOARD SHOWCASE ==================== */}
        <section className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-800">
          <div className="container-wide">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
                See Everything That Matters
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                12 Dashboards, <span className="text-purple-600">Zero Guesswork</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Finally, a bird's eye view of your business - without hiring an analyst
              </p>
            </div>

            {/* Dashboard Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {dashboards.map((dashboard) => (
                <button
                  key={dashboard.id}
                  onClick={() => setActiveDashboard(dashboard.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    activeDashboard === dashboard.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-purple-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <dashboard.icon className="w-4 h-4" />
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
                    className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                      {/* Preview */}
                      <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-gray-800 rounded-xl flex items-center justify-center">
                        <dashboard.icon className="w-24 h-24 text-purple-400" />
                      </div>
                      
                      {/* Info */}
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

        {/* ==================== USE CASES SECTION ==================== */}
        <section className="py-20 lg:py-28">
          <div className="container-wide">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Real Questions, <span className="text-purple-600">Instant Answers</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Here's what store owners are asking every day
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <span className="text-xs font-medium text-purple-600 uppercase tracking-wide">And gets:</span>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{useCase.result}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-purple-600 font-medium">
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
                Loved by WooCommerce Store Owners
              </h2>
            </div>

            {/* Stats Bar */}
            <div className="flex flex-wrap justify-center gap-8 lg:gap-16 mb-16 p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600">5,000+</div>
                <div className="text-gray-500 dark:text-gray-400">Active Stores</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600">2M+</div>
                <div className="text-gray-500 dark:text-gray-400">AI Queries Processed</div>
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
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 font-bold">
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
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white pr-4">{faq.question}</h3>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
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

        {/* ==================== FINAL CTA ==================== */}
        <section className="py-20 lg:py-28 bg-gradient-to-r from-purple-600 to-purple-800">
          <div className="container-wide text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Work Smarter?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join 5,000+ store owners who manage their WooCommerce stores with AI
            </p>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8">
              <span className="flex items-center gap-2 text-purple-100">
                <Check className="w-5 h-5 text-green-400" />
                14-day free trial
              </span>
              <span className="flex items-center gap-2 text-purple-100">
                <Check className="w-5 h-5 text-green-400" />
                No credit card required
              </span>
              <span className="flex items-center gap-2 text-purple-100">
                <Check className="w-5 h-5 text-green-400" />
                Setup in 2 minutes
              </span>
            </div>

            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Start Your Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>

            <p className="mt-6 text-purple-200">
              Questions? <Link to="/contact" className="text-white underline hover:no-underline">Talk to our team</Link> or{' '}
              <Link to="/features" className="text-white underline hover:no-underline">watch a demo</Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
