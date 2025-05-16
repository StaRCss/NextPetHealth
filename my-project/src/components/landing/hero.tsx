// src/components/landing/hero.tsx
import React from 'react';
import Link from 'next/link';

const HeroSection: React.FC = () => {
  return (
    <section
      className="relative w-full min-h-screen flex flex-col justify-start items-start bg-gradient-to-b from-purple-200 to-purple-100 bg-cover bg-center"
      role="banner"
    >
      <div className="absolute inset-0 bg-transparent bg-opacity-50 flex flex-col justify-start items-center text-gray-800 px-6 sm:px-12 md:px-16 mt-40">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-center"
          aria-label="Track Your Pets Health and Wellness"
        >
          Track Your Pets Health and Wellness
        </h1>
        <p
          className="text-lg sm:text-xl mb-6 text-center"
          aria-label="Monitor your pets health, diet, and activities all in one place."
        >
          Easily monitor your pets health, diet, and activities all in one place.
        </p>
        <Link
          href="/login"
          className="bg-blue-700 text-white py-3 px-6 rounded-md hover:bg-blue-800 transition transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-75"
          aria-label="Get started with tracking your pet's health"
        >
          <span className="block text-center">Get Started</span>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
