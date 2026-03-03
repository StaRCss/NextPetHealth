'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AddPetButton from '../pets/AddPetButton';
import { signOut } from 'next-auth/react';

type NavItemProps = {
  href?: string;
  src?: string; // string path for /public
  alt?: string;
  component?: React.ReactNode;
};

// Reusable NavItem
const NavItem: React.FC<NavItemProps> = ({ component }) => {
  if (!component) return null;
  return <>{component}</>;
};

// Navigation items
const navItems: NavItemProps[] = [
  {
    href: '/dashboard/pets',
    src: '/petz.webp',
    alt: 'Go to My Pets Page',
    component: (
      <Link
        href="/dashboard/pets"
        className="flex flex-col items-center justify-center"
        aria-label="Go to My Pets Page"
      >
        <Image
          src="/petz.webp"
          alt="Go to My Pets Page"
          width={48}
          height={48}
          unoptimized
          className="w-10 h-10 md:w-14 md:h-14 object-contain hover:scale-125 transition-transform duration-200"
        />
      </Link>
    ),
  },
  { component: <AddPetButton /> },
  {
    component: (
      <button
        onClick={() => signOut({ callbackUrl: '/login' })}
        className="flex flex-col items-center justify-center"
        aria-label="Sign Out"
      >
        <Image
          src="/settings.webp"
          alt="Sign Out"
          width={48}
          height={48}
          unoptimized
          className="w-10 h-10 md:w-14 md:h-14 object-contain hover:scale-125 transition-transform duration-200"
        />
      </button>
    ),
  },
];

const MobileMenu: React.FC = () => {
  const numberOfItems = navItems.length;

  return (
    <nav className="fixed z-50 w-full left-1/2 -translate-x-1/2 bottom-0 md:top-0 bg-blue-400 dark:bg-gray-700 bg-opacity-90 backdrop-blur-sm h-16 md:h-20 px-4">
      <div
        className="grid h-full max-w-screen-md mx-auto items-center justify-items-center gap-3"
        style={{ gridTemplateColumns: `repeat(${numberOfItems}, minmax(0, 1fr))` }}
      >
        {navItems.map((item, index) => (
          <NavItem key={index} component={item.component} />
        ))}
      </div>
    </nav>
  );
};

export default MobileMenu;