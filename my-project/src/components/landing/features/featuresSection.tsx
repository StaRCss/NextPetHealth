// FeaturesSection.tsx
import React from 'react';
import FeatureCard from './featuresCard';
import { features } from './featuresData';

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="  min-h-screen bg-gradient-to-b from-cyan-100 to-transparent flex flex-col py-10" aria-labelledby="features-heading">
      <div className="flex flex-col ">
      <div className=" text-center p-10 ">
        <h2 id="features-heading" className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-wider">
        Less Clutter, More Care
</h2>
        <p className=" text-gray-600 text-xl font-semibold">No guidebook for pets? No problem—theres an app.

</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 w-5/6 md:w-4/5 lg:w-1/2 gap-8 h-fit mx-auto lg:mx-40 ">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>


      </div>
    </section>
  );
};

export default FeaturesSection;
