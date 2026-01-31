import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ChevronRight, ArrowRight, Tag } from 'lucide-react';
import SEO from '../components/SEO';

// Sample blog posts data - In production, this would come from a CMS or API
const blogPosts = {
  'how-to-find-low-stock-products-woocommerce': {
    title: 'How to Find Low Stock Products in WooCommerce (Fastest Methods)',
    excerpt: 'Learn the fastest ways to identify products running low on stock in your WooCommerce store before you lose sales.',
    content: `
      <p>Running out of stock on your best-selling products is one of the most costly mistakes an e-commerce store can make. Not only do you lose immediate sales, but you also risk losing customers to competitors permanently.</p>
      
      <p>In this guide, we'll show you the fastest methods to find low stock products in WooCommerce, from the built-in tools to AI-powered solutions that can predict stockouts before they happen.</p>
      
      <h2>Why Finding Low Stock Products Matters</h2>
      
      <p>Before we dive into the how, let's understand why this is so critical:</p>
      
      <ul>
        <li><strong>Lost Revenue:</strong> Every hour a product is out of stock is revenue you'll never recover</li>
        <li><strong>Customer Frustration:</strong> 37% of customers who encounter stockouts won't return</li>
        <li><strong>SEO Impact:</strong> Out-of-stock products can hurt your search rankings</li>
        <li><strong>Competitive Risk:</strong> Customers will find alternatives, possibly permanently</li>
      </ul>
      
      <h2>Method 1: WooCommerce Reports (Built-in)</h2>
      
      <p>WooCommerce includes basic stock reports that can show you products with low inventory:</p>
      
      <ol>
        <li>Go to WooCommerce → Reports → Stock</li>
        <li>Click "Low in Stock" to see products below threshold</li>
        <li>Review the list and create purchase orders</li>
      </ol>
      
      <p><strong>Pros:</strong> Free, built into WooCommerce</p>
      <p><strong>Cons:</strong> Manual process, no predictions, no automation</p>
      
      <h2>Method 2: Ask WooASM's AI Assistant</h2>
      
      <p>With WooASM, finding low stock products is as simple as asking:</p>
      
      <blockquote>"Show me products running low on stock"</blockquote>
      
      <p>The AI will instantly show you:</p>
      
      <ul>
        <li>Products below your restock threshold</li>
        <li>Estimated days until stockout</li>
        <li>Sales velocity to prioritize restocking</li>
        <li>Recommendations for reorder quantities</li>
      </ul>
      
      <h2>Method 3: Automated Inventory Alerts</h2>
      
      <p>The best approach is to not have to check at all. With WooASM's Inventory Autopilot:</p>
      
      <ul>
        <li>Set custom low stock thresholds per product</li>
        <li>Receive email/SMS alerts when products drop below threshold</li>
        <li>Get daily inventory reports automatically</li>
        <li>AI predicts stockouts before they happen</li>
      </ul>
      
      <h2>Best Practices for Stock Management</h2>
      
      <ol>
        <li><strong>Set product-specific thresholds:</strong> A bestseller needs more buffer than a slow mover</li>
        <li><strong>Consider lead times:</strong> Factor in how long it takes to restock</li>
        <li><strong>Track seasonal patterns:</strong> Adjust thresholds for busy periods</li>
        <li><strong>Use demand forecasting:</strong> Don't just react, predict</li>
      </ol>
      
      <h2>Conclusion</h2>
      
      <p>Finding low stock products shouldn't be a daily manual task. Whether you use WooCommerce's built-in reports or upgrade to AI-powered inventory management with WooASM, the key is to be proactive rather than reactive.</p>
      
      <p>Ready to never run out of stock again? <a href="/signup">Try WooASM free</a> and experience AI-powered inventory management.</p>
    `,
    category: 'Inventory',
    author: 'WooASM Team',
    date: '2025-01-10',
    readTime: '5 min read',
    tags: ['Inventory', 'Stock Management', 'WooCommerce Tips'],
    relatedPosts: ['how-to-restock-woocommerce-products-bulk', 'best-inventory-management-tips-woocommerce']
  },
  'woocommerce-sales-report-track-revenue': {
    title: 'WooCommerce Sales Report: How to Track Revenue Correctly',
    excerpt: 'Master WooCommerce sales reporting. Learn how to track revenue, understand key metrics, and make data-driven decisions.',
    content: `
      <p>Understanding your WooCommerce sales data is essential for growing your business. But with so many numbers to look at, where do you start?</p>
      
      <h2>Key Metrics to Track</h2>
      
      <p>Focus on these essential sales metrics:</p>
      
      <ul>
        <li><strong>Gross Revenue:</strong> Total sales before any deductions</li>
        <li><strong>Net Revenue:</strong> Sales minus refunds and discounts</li>
        <li><strong>Average Order Value (AOV):</strong> Revenue divided by number of orders</li>
        <li><strong>Conversion Rate:</strong> Percentage of visitors who purchase</li>
      </ul>
      
      <h2>Using WooCommerce Analytics</h2>
      
      <p>WooCommerce's built-in analytics provides basic sales tracking. Navigate to Analytics → Revenue to see your sales data.</p>
      
      <h2>The WooASM Advantage</h2>
      
      <p>Instead of clicking through reports, just ask WooASM:</p>
      
      <blockquote>"What was my revenue this week compared to last week?"</blockquote>
      
      <p>Get instant answers with context and recommendations.</p>
    `,
    category: 'Analytics',
    author: 'WooASM Team',
    date: '2025-01-08',
    readTime: '4 min read',
    tags: ['Analytics', 'Reports', 'Revenue'],
    relatedPosts: ['how-to-calculate-aov-woocommerce', 'compare-weekly-sales-woocommerce']
  }
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPosts[slug];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
          <Link to="/blog" className="text-purple-600 hover:underline">Back to Blog</Link>
        </div>
      </div>
    );
  }

  const breadcrumbs = [
    { name: 'Home', url: 'https://wooasm.com' },
    { name: 'Blog', url: 'https://wooasm.com/blog' },
    { name: post.title, url: `https://wooasm.com/blog/${slug}` }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title={post.title}
        description={post.excerpt}
        keywords={post.tags.join(', ')}
        url={`https://wooasm.com/blog/${slug}`}
        type="article"
        author={post.author}
        publishedTime={post.date}
        breadcrumbs={breadcrumbs}
      />

      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container-wide py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 flex-wrap">
            <Link to="/" className="hover:text-purple-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/blog" className="hover:text-purple-600">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-white line-clamp-1">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <header className="py-12 lg:py-16 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium">
                  {post.category}
                </span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {post.title}
              </h1>
              
              <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="py-12 lg:py-16">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <div 
              className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                prose-p:text-gray-600 dark:prose-p:text-gray-300
                prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline
                prose-ul:text-gray-600 dark:prose-ul:text-gray-300
                prose-ol:text-gray-600 dark:prose-ol:text-gray-300
                prose-blockquote:border-purple-500 prose-blockquote:bg-purple-50 dark:prose-blockquote:bg-purple-900/20 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
                prose-strong:text-gray-900 dark:prose-strong:text-white"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-gray-400" />
                {post.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="py-12 lg:py-16 bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Ready to manage your store smarter?
            </h2>
            <p className="text-purple-100 mb-6">
              Try WooASM free and see the difference AI makes.
            </p>
            <Link to="/signup" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Back to Blog */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-2 text-purple-600 hover:underline">
              ← Back to Blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;
