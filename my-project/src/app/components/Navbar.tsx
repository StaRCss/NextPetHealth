'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import homeIcon from '/public/home.png';
import petsIcon from '/public/petz.png';
import nutritionIcon from '/public/nutr.png';
import reportsIcon from '/public/rep.png';
import calendarIcon from '/public/calendar.png';
import settingsIcon from '/public/settings.png';

const MobileMenu: React.FC = () => {

  return (
<div className="fixed z-50 w-full px-[15px] sm:w-full md:w-full lg:w-full xl:w-full max-w-full h-16 border-black -translate-x-1/2 bg-gray-400 backdrop-blur-md left-1/2 dark:bg-pink-200 backdrop-blue-md dark:border-black bottom-0 md:top-2">

      <div className="grid h-full max-w-lg grid-cols-6 mx-auto gap-x-8 ">

     {/* Home Nav Page */}
     <Link href="/" 
        className="inline-flex flex-col items-center justify-center bg-transparent">
        <Image   src={homeIcon} 
         alt="Go to Home Page" 
            width={48} // Equivalent to Tailwind's w-12
           height={48} // Equivalent to Tailwind's w-12
        className="sm:w-16 sm:h-16 md:w-18 md:h-18 object-contain hover:scale-125 transition-transform duration-200" />
        <span className="sr-only">Home</span>
     </Link>  
        {/* Pets Nav Page */}
        <Link href="/Pets"
          className="inline-flex flex-col items-center justify-center bg-transparent ">
          <Image src={petsIcon}
          alt="Go to My Pets Page" 
          width={48} // Equivalent to Tailwind's w-12
           height={48} // Equivalent to Tailwind's w-12
          className="sm:w-16 sm:h-16 md:w-18 md:h-18 object-contain hover:scale-125 transition-transform duration-200" />
          <span className="sr-only">Pets</span>
        </Link>
        {/* Nutrition Nav Page*/}
          <Link href="/Nutrition" 
            className="inline-flex flex-col items-center justify-center  bg-transparent ">
          <Image src={nutritionIcon} alt="Go to My Pets Nutrition" 
          width={48} // Equivalent to Tailwind's w-12
           height={48} // Equivalent to Tailwind's w-12
          className="sm:w-16 sm:h-16 md:w-18 md:h-18 object-contain hover:scale-125 transition-transform duration-200" />
            <span className="sr-only">Nutrition</span>
          </Link>
        {/* Health Nav Page */}
        <Link href="/Health"
          className="inline-flex flex-col items-center justify-center bg-transparent">
          <Image src={reportsIcon} alt="Go to Health Records"
           width={48} // Equivalent to Tailwind's w-12
           height={48} // Equivalent to Tailwind's w-12
          className="sm:w-16 sm:h-16 md:w-18 md:h-18 object-contain hover:scale-125 transition-transform duration-200" />
          <span className="sr-only">Health</span>
        </Link>
        {/* Calendar Nav Page */}
        <Link href="/Calendar"
          className="inline-flex flex-col items-center justify-center bg-transparent">
          <Image src={calendarIcon} alt="Go to Calendar"
          width={48} // Equivalent to Tailwind's w-12
           height={48} // Equivalent to Tailwind's w-12
          className="sm:w-16 sm:h-16 md:w-18 md:h-18 object-contain hover:scale-125 transition-transform duration-200" />
          <span className="sr-only"> Calendar </span>
        </Link>
         {/* Settings Nav Page */}
        <Link href="/SettingsPage"
          className="inline-flex flex-col items-center justify-center bg-transparent">
          <Image src={settingsIcon} alt="Go to Settings"
           width={48} // Equivalent to Tailwind's w-12
           height={48} // Equivalent to Tailwind's w-12
          className="sm:w-16 sm:h-16 md:w-18 md:h-18 object-contain hover:scale-125 transition-transform duration-200" />
          <span className="sr-only"> Calendar </span>
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
