import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Pages
import HomePage from "./pages/HomePage";
import FeaturesPage from "./pages/FeaturesPage";
import FeatureDetailPage from "./pages/FeatureDetailPage";
import PricingPage from "./pages/PricingPage";
import DocsPage from "./pages/DocsPage";
import BlogPage from "./pages/BlogPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ChangelogPage from "./pages/ChangelogPage";
import RoadmapPage from "./pages/RoadmapPage";

// Legal Pages
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import CookiesPage from "./pages/CookiesPage";
import GDPRPage from "./pages/GDPRPage";

// Feature Request
import RequestFeaturePage from "./pages/RequestFeaturePage";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";

// Dashboard Pages
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import LicensePage from "./pages/dashboard/LicensePage";
import UsagePage from "./pages/dashboard/UsagePage";
import SitesPage from "./pages/dashboard/SitesPage";
import BillingPage from "./pages/dashboard/BillingPage";
import SettingsPage from "./pages/dashboard/SettingsPage";

// Checkout Pages
import CheckoutSuccessPage from "./pages/checkout/CheckoutSuccessPage";
import CheckoutCancelPage from "./pages/checkout/CheckoutCancelPage";
import CheckoutMockPage from "./pages/checkout/CheckoutMockPage";

// Admin Pages
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSubscriptions from "./pages/admin/AdminSubscriptions";
import AdminSites from "./pages/admin/AdminSites";
import AdminPlans from "./pages/admin/AdminPlans";
import AdminFeatures from "./pages/admin/AdminFeatures";
import AdminAbilities from "./pages/admin/AdminAbilities";

// Components
import TrustNotifications from "./components/TrustNotifications";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function AppRoutes() {
  return (
    <>
      <TrustNotifications />
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/features/:featureId" element={<FeatureDetailPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/changelog" element={<ChangelogPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        
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
        </Route>
        
        {/* Fallback to home */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
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
