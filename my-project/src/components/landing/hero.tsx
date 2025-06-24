// src/components/landing/hero.tsx

import React from 'react';
import Image from 'next/image';
import GetStarted from './getstarted';

// HeroSection component is the landing banner with main heading, subheading, CTA, and hero image
const HeroSection: React.FC = () => {
  return (
    // Semantic landmark for screen readers and assistive tech
    <section
      id="hero"
      className="min-h-screen"
      role="banner"
      aria-labelledby="hero-heading"
    >
      {/* Layout: Stack vertically on small screens, side-by-side on large */}
      <div className="flex flex-col gap-10 md:h-screen lg:flex-row lg:gap-0">

        {/* Left side: heading, paragraph, and CTA */}
        <div className="flex flex-col gap-6 w-full md:h-2/3 lg:h-full lg:w-1/2 text-gray-800 items-center pt-10 md:pt-20 lg:pt-40">
          
          {/* Main page headline */}
          <h1 className="text-5xl md:text-6xl font-semibold text-center text-gray-800">
            Track<br />Your Cats<br />
            Nutrition &<br />
            Wellness
          </h1>

          {/* Supporting tagline text */}
          <p className="text-lg sm:text-xl mb-6 text-center text-zinc-800">
            Furrbit is the all-in-one health tracker that<br />grows with your cat,<br />
            giving you clear nutrition insights,<br />smart reminders, and peace of mind<br />
            every step of the way.
          </p>

          {/* CTA Button */}
          <GetStarted />

        </div>

        {/* Right side: Hero illustration image */}
        <div className="flex w-full h-[50dvh] md:h-2/3 lg:h-full lg:w-1/2 items-center justify-center">
          <Image
            src="/petpet.png"
            alt="Cat and Dog"
            width={200}
            height={200}
            className="w-fit h-fit md:w-40 md:h-40 lg:h-96 lg:w-96 m-auto object-cover object-center"
          />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
