// src/app/components/HeroSection.tsx
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const HeroSection: React.FC = () => {
  return (
    <>
      <Head>
        <title>Track Your Pets Health and Wellness</title>
        <meta
          name="description"
          content="Easily monitor your pet's health, diet, and activities all in one place. Track their wellness and ensure they stay happy and healthy."
        />
        <meta name="keywords" content="pet health, pet tracker, pet wellness, pet care, monitor pets" />
        <meta name="author" content="Your Name or Company" />
        <meta property="og:title" content="Track Your Pet's Health and Wellness" />
        <meta property="og:description" content="Monitor your pet's health, diet, and activities all in one place." />
        <meta property="og:image" content="/path-to-your-image.jpg" /> {/* Replace with a valid image URL */}
        <meta property="og:url" content="https://yourwebsite.com" /> {/* Replace with your actual URL */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
      </Head>
      <section
        className="relative w-full h-screen mt-20 flex flex-col justify-center items-center "
        role="banner"
      >
        <div className="absolute inset-0 bg-transparent bg-opacity-50 flex flex-col justify-center items-center text-gray-800 px-6 sm:px-12 md:px-16">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-center"
            aria-label="Track Your Pet's Health and Wellness"
          >
            Track Your Pets Health and Wellness
          </h1>
          <p
            className="text-lg sm:text-xl mb-6 text-center"
            aria-label="Monitor your pet's health, diet, and activities all in one place."
          >
            Easily monitor your pets health, diet, and activities all in one place.
          </p>
          <Link
            href="/Login"
            className="bg-blue-700 text-white py-3 px-6 rounded-md hover:bg-blue-800 transition transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-75"
            aria-label="Get started with tracking your pet's health"
          >
            <span className="block text-center">Get Started</span>
          </Link>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
