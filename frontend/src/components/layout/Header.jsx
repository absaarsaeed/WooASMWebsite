import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Sun, Moon, Zap, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { features } from '../../data/mock';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFeatureDropdownOpen, setIsFeatureDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  const closeMenus = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsFeatureDropdownOpen(false);
    setIsUserDropdownOpen(false);
  }, []);
  
  useLayoutEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;
      closeMenus();
    }
  }, [location.pathname, closeMenus]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const categories = [
    { id: 'core', label: 'Core Intelligence' },
    { id: 'customer', label: 'Customer Experience' },
    { id: 'operations', label: 'Operations' },
    { id: 'growth', label: 'Growth & Marketing' },
    { id: 'content', label: 'Content & Analytics' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/95 backdrop-blur-xl shadow-lg shadow-purple-900/10 border-b border-white/5'
          : 'bg-slate-950/80 backdrop-blur-md'
      }`}
    >
      {/* Subtle gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      
      <div className="container-wide">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-shadow">
              <Zap className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <span className="text-lg lg:text-xl font-bold text-white">WooASM</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Features Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsFeatureDropdownOpen(true)}
              onMouseLeave={() => setIsFeatureDropdownOpen(false)}
            >
              <button className="text-gray-300 hover:text-white font-medium transition-colors flex items-center gap-1">
                Features
                <ChevronDown className={`w-4 h-4 transition-transform ${isFeatureDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isFeatureDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                  >
                    <div className="w-[700px] bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-purple-900/20 border border-white/10 p-6">
                      <div className="grid grid-cols-2 gap-6">
                        {categories.map(category => (
                          <div key={category.id}>
                            <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-3">
                              {category.label}
                            </h4>
                            <div className="space-y-1">
                              {features
                                .filter(f => f.category === category.id)
                                .slice(0, 4)
                                .map(feature => (
                                  <Link
                                    key={feature.id}
                                    to={`/features/${feature.id}`}
                                    className="block px-3 py-2 rounded-lg hover:bg-purple-500/10 transition-colors"
                                  >
                                    <span className="text-white font-medium text-sm">
                                      {feature.title}
                                    </span>
                                  </Link>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 pt-4 border-t border-white/10">
                        <Link
                          to="/features"
                          className="text-purple-400 font-medium hover:text-purple-300 transition-colors"
                        >
                          View all 16 features →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/pricing" className="text-gray-300 hover:text-white font-medium transition-colors">Pricing</Link>
            <Link to="/docs" className="text-gray-300 hover:text-white font-medium transition-colors">Docs</Link>
            <Link to="/blog" className="text-gray-300 hover:text-white font-medium transition-colors">Blog</Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-gray-300 hover:text-white" />
              ) : (
                <Moon className="w-5 h-5 text-gray-300 hover:text-white" />
              )}
            </button>

            {/* Authenticated User Menu */}
            {isAuthenticated ? (
              <div 
                className="relative hidden sm:block"
                onMouseEnter={() => setIsUserDropdownOpen(true)}
                onMouseLeave={() => setIsUserDropdownOpen(false)}
              >
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-gray-200 font-medium hidden md:block">
                    {user?.name?.split(' ')[0]}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isUserDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 pt-2"
                    >
                      <div className="w-48 bg-slate-900/95 backdrop-blur-xl rounded-xl shadow-lg border border-white/10 py-2">
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-white"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </Link>
                        <Link
                          to="/dashboard/settings"
                          className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-white"
                        >
                          <User className="w-4 h-4" />
                          Account
                        </Link>
                        <hr className="my-2 border-white/10" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-white w-full"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                {/* Login Link */}
                <Link to="/login" className="hidden sm:block text-gray-300 font-medium hover:text-white transition-colors">
                  Login
                </Link>
                {/* CTA Button */}
                <Link to="/signup" className="hidden sm:flex px-4 lg:px-5 py-2 lg:py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 text-sm lg:text-base">
                  Get Started Free
                </Link>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
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
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden absolute top-full left-0 right-0 z-50 bg-slate-950/98 backdrop-blur-xl border-t border-white/10 shadow-xl"
              >
                <div className="container-wide py-4 space-y-2">
                  <Link
                    to="/features"
                    className="block px-4 py-3 rounded-lg text-white font-medium hover:bg-white/10"
                  >
                    Features
                  </Link>
                  <Link
                    to="/pricing"
                    className="block px-4 py-3 rounded-lg text-white font-medium hover:bg-white/10"
                  >
                    Pricing
                  </Link>
                  <Link
                    to="/docs"
                    className="block px-4 py-3 rounded-lg text-white font-medium hover:bg-white/10"
                  >
                    Docs
                  </Link>
                  <Link
                    to="/blog"
                    className="block px-4 py-3 rounded-lg text-white font-medium hover:bg-white/10"
                  >
                    Blog
                  </Link>
                  <div className="pt-4 space-y-2">
                    {isAuthenticated ? (
                      <>
                        <Link to="/dashboard" className="block w-full text-center px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl">
                          Dashboard
                        </Link>
                        <button 
                          onClick={handleLogout}
                          className="w-full px-4 py-3 rounded-lg text-gray-400 font-medium hover:bg-white/10 hover:text-white"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" className="block px-4 py-3 rounded-lg text-white font-medium hover:bg-white/10 text-center">
                          Login
                        </Link>
                        <Link to="/signup" className="block w-full text-center px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl">
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
