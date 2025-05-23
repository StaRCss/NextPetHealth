// src/components/landing/hero.tsx
import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  return (
    <section
      className=" min-h-screen bg-pink-200 "
      role="banner"
    >
      <div className="flex flex-col h-screen lg:flex-row">


      <div className="flex flex-col w-full h-full md:h-2/3 lg:h-full lg:w-1/2 text-gray-800 items-center justify-center">
        <h1
          className=" text-4xl md:text-6xl font-semibold text-center text-gray-800"
          aria-label="Track Your Pets Health and Wellness"
        >
          Track Your Pets Health and Wellness
        </h1>
        <p
          className="text-lg sm:text-xl mb-6 text-center text-zinc-800"
          aria-label="Monitor your pets health, diet, and activities all in one place."
        >
          Easily monitor your pets health, diet, and activities all in one place.
        </p>
        <Link
  href="/signup"
  className="btn-donate inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-blue-600 text-white text-base font-semibold shadow-md hover:bg-blue-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
  aria-label="Get started with tracking your pet's health"
>
  <span>Get Started</span>
  <ChevronRight className="w-5 h-5" />
</Link>

      </div>
          <Image
            src="/heropets.jpg"
            alt="Cat and Dog"
            width={800}
            height={800}
            className="h-fit w-fit m-auto lg:h-full lg:w-1/2 object-cover object-center"
          />
      </div>
    </section>
  );
};

export default HeroSection;
