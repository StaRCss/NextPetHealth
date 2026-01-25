"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isAddPetPage = pathname === "/dashboard/pets/Add";
  const isWeightHistoryPage = /^\/dashboard\/pets\/[^/]+\/weight-history$/.test(pathname); // matches /dashboard/pets/{id}/weight-history
  const isPetSettingsPage = /^\/dashboard\/pets\/[^/]+\/pet-settings$/.test(pathname); // matches /dashboard/pets/{id}/pet-settings
  const isPetProfilePage = /^\/dashboard\/pets\/[^/]+$/.test(pathname); // matches /dashboard/pets/{id}
  

  return (
    <>
      {!isAddPetPage && !isWeightHistoryPage && !isPetSettingsPage && !isPetProfilePage && <Navbar />}
      {children}
    </>
  );
};

export default ClientLayout;
