import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  Sun, 
  Moon, 
  Zap, 
  User, 
  LogOut, 
  LayoutDashboard,
  Bot,
  BarChart3,
  Heart,
  Package,
  Users,
  PenTool,
  Shield,
  Activity,
  Tag,
  Star,
  Eye,
  TrendingUp,
  FlaskConical,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

// Feature icons mapping
const iconMap = {
  'ai-store-assistant': Bot,
  'store-health-score': Heart,
  'store-insights-dashboard': BarChart3,
  'inventory-autopilot': Package,
  'customer-insights': Users,
  'content-studio': PenTool,
  'fraud-alerts': Shield,
  'activity-logs': Activity,
  'coupon-management': Tag,
  'reviews-management': Star,
  'price-watch': Eye,
  'analytics-reports': TrendingUp,
  'order-management': Package
};

// Mega menu data with categories and features
const megaMenuData = {
  categories: [
    {
      id: 'ai-automation',
      label: 'AI & Automation',
      icon: Sparkles,
      color: 'purple',
      features: [
        { 
          slug: 'ai-store-assistant', 
          title: 'AI Store Assistant', 
          desc: 'Chat with your store in plain English',
          icon: Bot
        },
        { 
          slug: 'content-studio', 
          title: 'AI Content Studio', 
          desc: 'Generate product descriptions instantly',
          icon: PenTool
        },
        { 
          slug: 'inventory-autopilot', 
          title: 'Inventory Autopilot', 
          desc: 'AI-powered demand forecasting',
          icon: Package
        }
      ]
    },
    {
      id: 'analytics',
      label: 'Analytics & Insights',
      icon: BarChart3,
      color: 'blue',
      features: [
        { 
          slug: 'store-health-score', 
          title: 'Store Health Score', 
          desc: 'Overall performance in one number',
          icon: Heart
        },
        { 
          slug: 'store-insights-dashboard', 
          title: 'Store Insights', 
          desc: 'Real-time analytics dashboard',
          icon: BarChart3
        },
        { 
          slug: 'analytics-reports', 
          title: 'Analytics & Reports', 
          desc: 'Detailed performance reports',
          icon: TrendingUp
        },
        { 
          slug: 'customer-insights', 
          title: 'Customer Insights', 
          desc: 'Deep customer analytics & LTV',
          icon: Users
        }
      ]
    },
    {
      id: 'operations',
      label: 'Store Operations',
      icon: Package,
      color: 'green',
      features: [
        { 
          slug: 'order-management', 
          title: 'Order Management', 
          desc: 'Streamline your order workflow',
          icon: Package
        },
        { 
          slug: 'coupon-management', 
          title: 'Coupon Management', 
          desc: 'Create & track promotions',
          icon: Tag
        },
        { 
          slug: 'reviews-management', 
          title: 'Reviews Management', 
          desc: 'Monitor & respond to reviews',
          icon: Star
        }
      ]
    },
    {
      id: 'security',
      label: 'Security & Monitoring',
      icon: Shield,
      color: 'red',
      features: [
        { 
          slug: 'fraud-alerts', 
          title: 'Fraud Detection', 
          desc: 'AI-powered fraud protection',
          icon: Shield
        },
        { 
          slug: 'activity-logs', 
          title: 'Activity Logs', 
          desc: 'Complete audit trail',
          icon: Activity
        },
        { 
          slug: 'price-watch', 
          title: 'Price Watch', 
          desc: 'Monitor competitor pricing',
          icon: Eye
        }
      ]
    }
  ]
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFeatureDropdownOpen, setIsFeatureDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('ai-automation');
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change - this is intentional for UX
  const locationPathname = location.pathname;
  useEffect(() => {
    // Resetting menu states when location changes is the standard UX pattern
    const resetMenus = () => {
      setIsMobileMenuOpen(false);
      setIsFeatureDropdownOpen(false);
      setIsUserDropdownOpen(false);
    };
    resetMenus();
  }, [locationPathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const activeCategoryData = megaMenuData.categories.find(c => c.id === activeCategory);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg shadow-gray-100/20 dark:shadow-none'
          : 'bg-transparent'
      }`}
    >
      <div className="container-wide">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">WooASM</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Features Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setIsFeatureDropdownOpen(true)}
              onMouseLeave={() => setIsFeatureDropdownOpen(false)}
            >
              <button 
                className="nav-link flex items-center gap-1"
                aria-expanded={isFeatureDropdownOpen}
                aria-haspopup="true"
              >
                Features
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isFeatureDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isFeatureDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                  >
                    <div className="w-[800px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-100 dark:border-gray-700 overflow-hidden">
                      <div className="flex">
                        {/* Left sidebar - Categories */}
                        <div className="w-56 bg-gray-50 dark:bg-gray-900/50 p-4 border-r border-gray-100 dark:border-gray-700">
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
                            Categories
                          </p>
                          {megaMenuData.categories.map((category) => {
                            const CategoryIcon = category.icon;
                            return (
                              <button
                                key={category.id}
                                onMouseEnter={() => setActiveCategory(category.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                                  activeCategory === category.id
                                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                              >
                                <CategoryIcon className="w-4 h-4" />
                                <span className="text-sm font-medium">{category.label}</span>
                                <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${activeCategory === category.id ? 'translate-x-0.5' : ''}`} />
                              </button>
                            );
                          })}
                        </div>

                        {/* Right side - Features */}
                        <div className="flex-1 p-6">
                          <div className="flex items-center gap-2 mb-4">
                            {activeCategoryData?.icon && (
                              <activeCategoryData.icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            )}
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {activeCategoryData?.label}
                            </h3>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            {activeCategoryData?.features.map((feature) => {
                              const FeatureIcon = feature.icon;
                              return (
                                <Link
                                  key={feature.slug}
                                  to={`/features/${feature.slug}`}
                                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all group"
                                >
                                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors">
                                    <FeatureIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                  </div>
                                  <div>
                                    <span className="block text-sm font-semibold text-gray-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                                      {feature.title}
                                    </span>
                                    <span className="block text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                      {feature.desc}
                                    </span>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>

                          {/* Bottom CTA */}
                          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                            <Link
                              to="/features"
                              className="inline-flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-medium text-sm hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                            >
                              View all 13 features
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                              to="/signup"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
                            >
                              Start Free Trial
                              <Sparkles className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/pricing" className="nav-link">Pricing</Link>
            <Link to="/docs" className="nav-link">Docs</Link>
            <Link to="/blog" className="nav-link">Blog</Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Authenticated User Menu */}
            {isAuthenticated ? (
              <div 
                className="relative hidden sm:block"
                onMouseEnter={() => setIsUserDropdownOpen(true)}
                onMouseLeave={() => setIsUserDropdownOpen(false)}
              >
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-sm font-medium">
                    {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isUserDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full pt-2"
                    >
                      <div className="w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2">
                        <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {user?.name || 'User'}
                          </p>
                          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                        <div className="py-1">
                          <Link
                            to="/dashboard"
                            className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            <span className="text-sm">Dashboard</span>
                          </Link>
                          <Link
                            to="/dashboard/settings"
                            className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <User className="w-4 h-4" />
                            <span className="text-sm">Settings</span>
                          </Link>
                        </div>
                        <div className="border-t border-gray-100 dark:border-gray-700 pt-1">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 w-full transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            <span className="text-sm">Logout</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/signup" className="btn-primary">
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-900 dark:text-white" />
              ) : (
                <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden"
                style={{ top: '80px' }}
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              {/* Mobile Menu Panel */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 lg:hidden shadow-xl z-50"
              >
                <div className="container-wide py-4">
                  {/* Features Section */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4">
                      Features
                    </p>
                    {megaMenuData.categories.map((category) => {
                      const CategoryIcon = category.icon;
                      return (
                        <div key={category.id} className="mb-2">
                          <div className="flex items-center gap-2 px-4 py-2 text-gray-900 dark:text-white font-medium">
                            <CategoryIcon className="w-4 h-4 text-purple-600" />
                            {category.label}
                          </div>
                          <div className="pl-10 space-y-1">
                            {category.features.map((feature) => (
                              <Link
                                key={feature.slug}
                                to={`/features/${feature.slug}`}
                                className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                              >
                                {feature.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                    <Link
                      to="/features"
                      className="flex items-center gap-2 px-4 py-2 text-purple-600 dark:text-purple-400 font-medium"
                    >
                      View all features
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Other Links */}
                  <div className="border-t border-gray-100 dark:border-gray-800 pt-4 space-y-1">
                    <Link to="/pricing" className="block px-4 py-3 rounded-lg text-gray-900 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
                      Pricing
                    </Link>
                    <Link to="/docs" className="block px-4 py-3 rounded-lg text-gray-900 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
                      Docs
                    </Link>
                    <Link to="/blog" className="block px-4 py-3 rounded-lg text-gray-900 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
                      Blog
                    </Link>
                  </div>

                  {/* Auth Section */}
                  <div className="border-t border-gray-100 dark:border-gray-800 pt-4 mt-4 space-y-2">
                    {isAuthenticated ? (
                      <>
                        <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-900 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
                          <LayoutDashboard className="w-5 h-5" />
                          Dashboard
                        </Link>
                        <button 
                          onClick={handleLogout}
                          className="w-full px-4 py-3 rounded-lg text-gray-600 dark:text-gray-400 font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" className="block px-4 py-3 rounded-lg text-gray-900 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-gray-800 text-center">
                          Login
                        </Link>
                        <Link to="/signup" className="btn-primary w-full justify-center">
                          Get Started Free
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
