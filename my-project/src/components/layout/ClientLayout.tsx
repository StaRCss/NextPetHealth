"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar"; // Import the Navbar normally

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <>
      {/* Hide Navbar on Add Pet page */}
      {pathname !== "/dashboard/pets/Add"  && <Navbar />}
      
      {children}
    </>
  );
};

export default ClientLayout;
