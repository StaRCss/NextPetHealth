'use client';
import React from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import petsIcon from '/public/petz.webp';
import settingsIcon from '/public/settings.webp';
import AddPetButton from '../pets/AddPetButton';

// Reusable NavItem component
const NavItem: React.FC<{ href: string; icon: StaticImageData; alt: string; }> = ({ href, icon, alt }) => (
  <Link
    href={href}
    className="inline-flex flex-col items-center justify-center bg-transparent"
    aria-label={alt}
  >
    <Image
      src={icon}
      alt={alt}
      width={48}
      height={48}
      className="w-10 h-10 md:w-14 md:h-14 object-contain hover:scale-125 transition-transform duration-200 will-change-transform"
      style={{ backfaceVisibility: 'hidden' }}
    />
    <span className="sr-only">{alt}</span>
  </Link>
);

// Define your nav items in an array
const navItems = [
  { href: '/dashboard/pets', icon: petsIcon, alt: 'Go to My Pets Page' },
  
  { component: <AddPetButton /> }, // special item
  
  { href: '/signout', icon: settingsIcon, alt: 'Go to Settings' },
];

const MobileMenu: React.FC = () => {
  const numberOfItems = navItems.length;

  return (
    <div className="fixed z-50 w-full px-[15px] max-w-full h-16 md:h-20 border-black -translate-x-1/2 bg-blue-400 left-1/2 dark:bg-gray-700 backdrop-blue-md dark:border-black bottom-0 md:top-0 bg-opacity-90">
      <div
        className={`grid h-full max-w-screen-md mx-auto items-center justify-items-center gap-3 px-4 mb-6`}
        style={{ gridTemplateColumns: `repeat(${numberOfItems}, minmax(0, 1fr))` }}
      >
        {navItems.map((item, index) =>
          item.component ? (
            <React.Fragment key={index}>{item.component}</React.Fragment>
          ) : (
            <NavItem key={index} href={item.href!} icon={item.icon!} alt={item.alt!} />
          )
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
