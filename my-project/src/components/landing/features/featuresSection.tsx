// FeaturesSection.tsx
import React from 'react';
import FeatureCard from './featuresCard';
import { features } from './featuresData';

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 px-6 bg-transparent" aria-labelledby="features-heading">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 id="features-heading" className="text-3xl font-bold">
          Why Choose Our App?
        </h2>
        <p className="mt-2 text-gray-600">Everything you need to keep your pets healthy and happy</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
