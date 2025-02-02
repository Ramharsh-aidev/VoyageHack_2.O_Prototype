import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Routes/Home';
import AiTripPlanner from './Routes/AITripPlanner';
import BudgetTrackerPage from './Routes/BudgetTracker';
import LocalInsights from './Routes/LocalInsights';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* <Route path="/blog" element={<BlogPage />} /> */}
          {/* <Route path="/privacy-policy" element={<PrivacyPolicyPage />} /> */}
          {/* <Route path="/terms-conditions" element={<TermsConditionsPage />} /> */}
          {/* <Route path="/about" element={<AboutPage />} /> */}
          <Route path="/ai-trip-planner" element={<AiTripPlanner />} />
          {/* <Route path="/booking-integration" element={<BookingIntegrationPage />} /> */}
          <Route path="/budget-tracker" element={<BudgetTrackerPage />} />
          <Route path="/local-insights" element={<LocalInsights />} />
          {/* <Route path="/marketplace" element={<MarketplacePage />} /> */}
          {/* <Route path="/company" element={<CompanyPage />} /> */}
          {/* <Route path="/login" element={<LoginPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
