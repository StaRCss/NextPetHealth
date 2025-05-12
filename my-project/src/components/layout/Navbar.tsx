'use client';
import React from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import homeIcon from '/public/home.png';
import petsIcon from '/public/petz.webp';
import nutritionIcon from '/public/nutr.webp';
import reportsIcon from '/public/rep.webp';
import calendarIcon from '/public/calendar.webp';

// Reusable NavItem component to reduce repetition
const NavItem: React.FC<{ href: string; icon: StaticImageData; alt: string; }> = ({ href, icon, alt }) => {
  return (
    <Link href={href} className="inline-flex flex-col items-center justify-center bg-transparent">
      <Image
        src={icon}
        alt={alt}
        width={48} // Equivalent to Tailwind's w-12
        height={48} // Equivalent to Tailwind's w-12
        className="sm:w-16 sm:h-16 md:w-18 md:h-18 object-contain hover:scale-125 transition-transform duration-200 will-change-transform"
          style={{ backfaceVisibility: 'hidden' }}
      />
      <span className="sr-only">{alt}</span>
    </Link>
  );
};

const MobileMenu: React.FC = () => {
  return (
    <div className="fixed z-50 w-full px-[15px] sm:w-full md:w-full lg:w-full xl:w-full max-w-full h-16 border-black -translate-x-1/2 bg-blue-500 left-1/2 dark:bg-gray-500 backdrop-blue-md dark:border-black bottom-0 md:top-2">
      <div className="grid h-full max-w-lg grid-cols-6 mx-auto gap-x-8">
        {/* Home Nav Page */}
        <NavItem href="/" icon={homeIcon} alt="Go to Home Page" />
        
        {/* Pets Nav Page */}
        <NavItem href="/Pets" icon={petsIcon} alt="Go to My Pets Page" />

        {/* Nutrition Nav Page */}
        <NavItem href="/Nutrition" icon={nutritionIcon} alt="Go to My Pets Nutrition" />

        {/* Health Nav Page */}
        <NavItem href="/Health" icon={reportsIcon} alt="Go to Health Records" />

        {/* Calendar Nav Page */}
        <NavItem href="/Calendar" icon={calendarIcon} alt="Go to Calendar" />
      </div>
    </div>
  );
};

export default MobileMenu;
