// FeatureCard.tsx
import React from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeaturesCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className=" flex flex-col hover:shadow-lg transition duration-300 ">
      <h3 className="text-4xl p-4" >{icon}</h3> 
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeaturesCard;
