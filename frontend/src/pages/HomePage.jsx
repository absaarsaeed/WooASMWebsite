import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
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
