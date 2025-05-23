// FeatureCard.tsx
import React from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeaturesCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className=" rounded-xl shadow-md flex flex-col hover:shadow-lg transition duration-300">
      <div className="flex flex-col items-center justify-start gap-4 h-10 w-10" />
      <h3 className="text-4xl" >{icon}</h3> 
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeaturesCard;
