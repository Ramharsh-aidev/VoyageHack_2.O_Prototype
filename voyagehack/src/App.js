import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Routes/Home';

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
          {/* <Route path="/ai-trip-planner" element={<AiTripPlannerPage />} /> */}
          {/* <Route path="/ai-destination-suggestions" element={<AiDestinationSuggestionsPage />} /> */}
          {/* <Route path="/booking-integration" element={<BookingIntegrationPage />} /> */}
          {/* <Route path="/budget-tracker" element={<BudgetTrackerPage />} /> */}
          {/* <Route path="/local-insights-features" element={<LocalInsightsFeaturesPage />} /> */}
          {/* <Route path="/marketplace" element={<MarketplacePage />} /> */}
          {/* <Route path="/company" element={<CompanyPage />} /> */}
          {/* <Route path="/login" element={<LoginPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
