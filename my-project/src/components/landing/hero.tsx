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
      <div className="flex flex-col h-screen lg:flex-row ">

      <div className="flex flex-col gap-6 w-full h-full md:h-2/3 lg:h-full lg:w-1/2 text-gray-800 items-center mt-20 md:mt-40 ">
      <h1
      className="text-5xl md:text-6xl font-semibold text-center text-gray-800"
      aria-label="Track Your Pets Health and Wellness">
       Track<br/>Your Pets<br />
       Health &<br />
       Wellness
      </h1>
        <p
          className="text-lg sm:text-xl mb-6 text-center text-zinc-800"
          aria-label="Monitor your pets health, diet, and activities all in one place."
        >
          Furrbit is the all-in-one health tracker that<br/> grows with your pet,<br/> giving you clear insights,<br/> smart reminders, and peace of mind<br/> every step of the way.
        </p>
        <GetStarted/>

      </div>
      <Image
        src="/petpet.png"
        alt="Cat and Dog"
        width={500}
        height={500}
        className=" md:w-80 md:h-80 m-auto object-cover object-center "/>

      </div>
    </section>
  );
};

export default HeroSection;