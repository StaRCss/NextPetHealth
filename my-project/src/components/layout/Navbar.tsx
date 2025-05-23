'use client';
import React from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import petsIcon from '/public/petz.webp';
import nutritionIcon from '/public/nutr.webp';
import reportsIcon from '/public/rep.webp';
import calendarIcon from '/public/calendar.webp';
import AddPetButton from '../pets/AddPetButton';

// Reusable NavItem component to reduce repetition
const NavItem: React.FC<{ href: string; icon: StaticImageData; alt: string; }> = ({ href, icon, alt }) => {
  return (
    <Link href={href} className="inline-flex flex-col items-center justify-center bg-transparent aria-labe={alt}">
      <Image
        src={icon}
        alt={alt}
        width={48} // Equivalent to Tailwind's w-12
        height={48} // Equivalent to Tailwind's w-12
        className="w-10 h-10 md:w-14 md:h-14 object-contain hover:scale-125 transition-transform duration-200 will-change-transform"
          style={{ backfaceVisibility: 'hidden' }}
      />
      <span className="sr-only">{alt}</span>
    </Link>
  );
};

const MobileMenu: React.FC = () => {

  return (
        <div className="fixed z-50 w-full px-[15px] sm:w-full md:w-full lg:w-full xl:w-full max-w-full h-16 md:h-20 border-black -translate-x-1/2 bg-blue-400 left-1/2 dark:bg-gray-500 backdrop-blue-md dark:border-black bottom-0 md:top-0  bg-opacity-90">

      <div className="grid grid-cols-5 h-full max-w-screen-md mx-auto items-center justify-items-center gap-3 px-4 mb-6">
        <NavItem href="/dashboard/pets" icon={petsIcon} alt="Go to My Pets Page" />
        <NavItem href="/dashboard/Nutrition" icon={nutritionIcon} alt="Go to Nutrition" />
        <AddPetButton />
        <NavItem href="/dashboard/Health" icon={reportsIcon} alt="Go to Health Records" />
        <NavItem href="/dashboard/Calendar" icon={calendarIcon} alt="Go to Calendar" />
      </div>
    </div>
  );
};

export default MobileMenu;
