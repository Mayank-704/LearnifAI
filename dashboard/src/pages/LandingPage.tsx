import React from 'react';
import HomePage from '../components/HomePage';
import FeatureSection from '../components/LandingFeatures/FeatureSection';
import QueryHistory from '../components/LandingQueryHistory/QueryHistorySection';
import StartUsingSection from "../components/StartUsingSection";


const LandingPage: React.FC = () => {
  return (
    <div>
      

      <HomePage />

      <FeatureSection />

      <QueryHistory />

      <StartUsingSection />

    </div>
  );
};

export default LandingPage;
