import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';
import HeroSection from '../components/home/HeroSection';
import ProblemSection from '../components/home/ProblemSection';
import FeaturesSection from '../components/home/FeaturesSection';
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
        title="AI Store Manager for WooCommerce"
        description="The most powerful AI assistant for WooCommerce. Get instant insights, automate inventory, create content, and boost sales — all by just asking. Save 35+ hours per week."
        keywords="WooCommerce AI, store manager, AI assistant, ecommerce automation, inventory management, customer chatbot"
        url="https://wooasm.ai"
        image="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=630&fit=crop"
      />
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CostSavingsSection />
        <TestimonialsSection />
        <IntegrationsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
