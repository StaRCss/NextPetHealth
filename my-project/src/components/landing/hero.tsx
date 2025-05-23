// src/components/landing/hero.tsx
import React from 'react';
import Link from 'next/link';

const HeroSection: React.FC = () => {
  return (
    <section
      className=" min-h-screen bg-gradient-to-b from-purple-200 to-purple-100 "
      role="banner"
    >
      <div className="flex flex-col h-screen lg:flex-row">


      <div className="flex flex-col w-full h-full md:h-2/3 lg:h-full lg:w-1/2 text-gray-800 items-center justify-center">
        <h1
          className=" text-4xl md:text-6xl font-bold text-center"
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
          href="/signup"
          className="bg-blue-700 text-white py-3 px-6 rounded-md hover:bg-blue-800 transition transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-75"
          aria-label="Get started with tracking your pet's health"
         >
         <span className="block text-center">Get Started</span>
        </Link>
      </div>
        <div className="m-auto"> 
          <h1>Happy Pets</h1>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
