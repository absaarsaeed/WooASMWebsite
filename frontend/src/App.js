import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./context/ThemeContext";

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

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <div className="App">
          <BrowserRouter>
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
              
              {/* Fallback to home */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
