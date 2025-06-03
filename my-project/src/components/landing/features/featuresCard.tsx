// FeatureCard.tsx
import React from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  aria: string; 
}

const FeaturesCard: React.FC<FeatureCardProps> = ({ title, description, icon ,aria}) => {
  return (
    <article className="flex flex-col hover:shadow-lg transition duration-300 p-4 rounded-lg">
  <span
    role="img"
    aria-label={aria} 
    className="text-4xl mb-4"
  >
    {icon}
  </span>
  <h3 className="text-xl font-semibold mb-2">{title}</h3>
  <p className="text-gray-600">{description}</p>
</article>

  );
};

export default FeaturesCard;
