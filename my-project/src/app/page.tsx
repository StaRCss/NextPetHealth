// src/app/page.tsx
import React from 'react';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';

// Export metadata for this page
export const metadata: Metadata = {
  title: "Track Your Pet's Health and Wellness",
  description: "Easily monitor your pet's health, diet, and activities all in one place. Track their wellness and ensure they stay happy and healthy.",
  keywords: "pet health, pet tracker, pet wellness, pet care, monitor pets",
  openGraph: {
    title: "Track Your Pet's Health and Wellness",
    description: "Monitor your pet's health, diet, and activities all in one place.",
    url: "https://yourwebsite.com", // Replace with your actual URL
  },
  robots: "index, follow",
};

// Dynamically import HeroSection for performance optimization
const HeroSection = dynamic(() => import('../components/landing/hero'), {
  ssr: true, // Ensures it is still server-side rendered for SEO
  loading: () => <div>Loading...</div>, // Optional: add a loading spinner for user experience
});

const Page: React.FC = () => {
  return (
    <div>
      <HeroSection />
    </div>
  );
};

export default Page;
