'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  // Pages where navbar/mobile menu should be hidden
  const hideNavbar =
    pathname === '/dashboard/pets/Add' ||
    /^\/dashboard\/pets\/[^/]+\/weight-history$/.test(pathname) ||
    /^\/dashboard\/pets\/[^/]+\/pet-settings$/.test(pathname) ||
    /^\/dashboard\/pets\/[^/]+$/.test(pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main>{children}</main>
    </>
  );
};

export default ClientLayout;
