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
      <div className="flex flex-col gap-10 md:h-screen lg:flex-row lg:gap-0">

      <div className="flex flex-col gap-6 w-full md:h-2/3 lg:h-full lg:w-1/2 text-gray-800 items-center pt-10 md-pt-20 lg:pt-40 ">
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

      <div className="flex w-full h-[50dvh] md:h-2/3 lg:h-full lg:w-1/2 items-center justify-center">

      <Image
        src="/petpet.png"
        alt="Cat and Dog"
        width={200}
        height={200}
        className=" w-fit h-fit md:w-40 md:h-40 lg:h-96 lg:w-96 m-auto object-cover object-center "/></div>

      </div>
    </section>
  );
};

export default HeroSection;