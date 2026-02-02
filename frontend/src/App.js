import React, { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" aria-label="Loading"></div>
  </div>
);

// Critical path pages - load immediately
import HomePage from "./pages/HomePage";
import PricingPage from "./pages/PricingPage";

// Lazy load non-critical pages
const FeaturesHubPage = lazy(() => import("./pages/FeaturesHubPage"));
const FeaturePage = lazy(() => import("./pages/FeaturePage"));
const DocsPage = lazy(() => import("./pages/DocsPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ChangelogPage = lazy(() => import("./pages/ChangelogPage"));
const RoadmapPage = lazy(() => import("./pages/RoadmapPage"));
const ComparePage = lazy(() => import("./pages/ComparePage"));
const UseCasePage = lazy(() => import("./pages/UseCasePage"));

// Legal Pages - lazy loaded
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const CookiesPage = lazy(() => import("./pages/CookiesPage"));
const GDPRPage = lazy(() => import("./pages/GDPRPage"));

// Feature Request - lazy loaded
const RequestFeaturePage = lazy(() => import("./pages/RequestFeaturePage"));

// Auth Pages - lazy loaded
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const SignupPage = lazy(() => import("./pages/auth/SignupPage"));
const ForgotPasswordPage = lazy(() => import("./pages/auth/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/auth/ResetPasswordPage"));
const VerifyEmailPage = lazy(() => import("./pages/auth/VerifyEmailPage"));

// Dashboard Pages - lazy loaded
const DashboardLayout = lazy(() => import("./pages/dashboard/DashboardLayout"));
const DashboardOverview = lazy(() => import("./pages/dashboard/DashboardOverview"));
const LicensePage = lazy(() => import("./pages/dashboard/LicensePage"));
const UsagePage = lazy(() => import("./pages/dashboard/UsagePage"));
const SitesPage = lazy(() => import("./pages/dashboard/SitesPage"));
const BillingPage = lazy(() => import("./pages/dashboard/BillingPage"));
const SettingsPage = lazy(() => import("./pages/dashboard/SettingsPage"));

// Checkout Pages - lazy loaded
const CheckoutSuccessPage = lazy(() => import("./pages/checkout/CheckoutSuccessPage"));
const CheckoutCancelPage = lazy(() => import("./pages/checkout/CheckoutCancelPage"));
const CheckoutMockPage = lazy(() => import("./pages/checkout/CheckoutMockPage"));

// Admin Pages - lazy loaded
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminSubscriptions = lazy(() => import("./pages/admin/AdminSubscriptions"));
const AdminSites = lazy(() => import("./pages/admin/AdminSites"));
const AdminPlans = lazy(() => import("./pages/admin/AdminPlans"));
const AdminFeatures = lazy(() => import("./pages/admin/AdminFeatures"));
const AdminAbilities = lazy(() => import("./pages/admin/AdminAbilities"));
const AdminEmails = lazy(() => import("./pages/admin/AdminEmails"));

// Components - lazy load non-critical
const TrustNotifications = lazy(() => import("./components/TrustNotifications"));

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <TrustNotifications />
      <Routes>
        {/* Main Pages - Critical path */}
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        
        {/* Feature Pages */}
        <Route path="/features" element={<FeaturesHubPage />} />
        <Route path="/features/:slug" element={<FeaturePage />} />
        
        {/* Content Pages */}
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/changelog" element={<ChangelogPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        
        {/* Comparison Pages */}
        <Route path="/compare/:slug" element={<ComparePage />} />
        
        {/* Use Case Pages */}
        <Route path="/use-cases/:slug" element={<UseCasePage />} />
        
        {/* Legal Pages */}
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/cookies" element={<CookiesPage />} />
        <Route path="/gdpr" element={<GDPRPage />} />
        
        {/* Feature Request */}
        <Route path="/request-feature" element={<RequestFeaturePage />} />
        
        {/* Auth Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        
        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<DashboardOverview />} />
          <Route path="license" element={<LicensePage />} />
          <Route path="usage" element={<UsagePage />} />
          <Route path="sites" element={<SitesPage />} />
          <Route path="billing" element={<BillingPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        
        {/* Checkout Pages */}
        <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
        <Route path="/checkout/cancel" element={<CheckoutCancelPage />} />
        <Route path="/checkout/mock" element={<CheckoutMockPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="subscriptions" element={<AdminSubscriptions />} />
          <Route path="sites" element={<AdminSites />} />
          <Route path="plans" element={<AdminPlans />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="abilities" element={<AdminAbilities />} />
          <Route path="emails" element={<AdminEmails />} />
        </Route>
        
        {/* Fallback to home */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <div className="App">
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
