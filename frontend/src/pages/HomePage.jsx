import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';
import HeroSection from '../components/home/HeroSection';
import ProblemSection from '../components/home/ProblemSection';
import UseCasesSection from '../components/home/UseCasesSection';
import PowerFeaturesSection from '../components/home/PowerFeaturesSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import CostSavingsSection from '../components/home/CostSavingsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import IntegrationsSection from '../components/home/IntegrationsSection';
import FAQSection from '../components/home/FAQSection';
import CTASection from '../components/home/CTASection';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="AI Store Manager for WooCommerce - Manage Your Store by Just Asking"
        description="WooASM is the most powerful AI assistant for WooCommerce. Update prices, create coupons, manage inventory, and automate customer support — all by just asking. Save 35+ hours per week."
        keywords="WooCommerce AI, store manager, AI assistant, ecommerce automation, inventory management, customer chatbot, update prices, create coupons, competitor tracking, AI content"
        url="https://wooasm.ai"
        image="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=630&fit=crop"
      />
      <Header />
      <main>
        {/* Hero - First Impression */}
        <HeroSection />
        
        {/* The Problem We Solve */}
        <ProblemSection />
        
        {/* Use Cases - Show What You Can Do By Asking */}
        <UseCasesSection />
        
        {/* Power Features - Mind-Boggling Features */}
        <PowerFeaturesSection />
        
        {/* How It Works - Simple Steps */}
        <HowItWorksSection />
        
        {/* Cost Savings - ROI */}
        <CostSavingsSection />
        
        {/* Testimonials - Social Proof */}
        <TestimonialsSection />
        
        {/* Integrations */}
        <IntegrationsSection />
        
        {/* FAQ Section */}
        <FAQSection />
        
        {/* Final CTA */}
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
