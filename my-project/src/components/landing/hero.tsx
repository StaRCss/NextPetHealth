// src/components/landing/hero.tsx
import React from 'react';
import Image from 'next/image';
import GetStarted from './getstarted';

const HeroSection: React.FC = () => {
  return (
    <section
      className=" min-h-screen "
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
        <GetStarted/>

      </div>
      <Image
        src="/petpet.png"
        alt="Cat and Dog"
        width={500}
        height={500}
        className=" w-80 h-80 md:h-auto md:w-auto m-auto object-cover object-center "/>

      </div>
    </section>
  );
};

export default HeroSection;