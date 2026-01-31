import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import FeaturePageTemplate from '../components/FeaturePageTemplate';
import { featuresData } from '../data/featuresData';

const FeaturePage = () => {
  const { slug } = useParams();
  const feature = featuresData[slug];

  if (!feature) {
    return <Navigate to="/features" replace />;
  }

  return <FeaturePageTemplate {...feature} />;
};

export default FeaturePage;
