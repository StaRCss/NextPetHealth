"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isAddPetPage = pathname === "/dashboard/pets/Add";
  const isWeightHistoryPage = /^\/dashboard\/pets\/[^/]+\/weight-history$/.test(pathname);
  const isPetSettingsPage = /^\/dashboard\/pets\/[^/]+\/pet-settings$/.test(pathname);
  // Matches /dashboard/pets/{id}/weight-history

  return (
    <>
      {!isAddPetPage && !isWeightHistoryPage && !isPetSettingsPage && <Navbar />}
      {children}
    </>
  );
};

export default ClientLayout;
