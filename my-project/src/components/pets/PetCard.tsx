"use client"; // This is a client component in Next.js
import React, { useState } from "react";
import Image from "next/image"; // Assuming you're using Next.js

type PetData = {
  name: string;
  age: number;
  breed: string;
  weight?: string;
  color?: string;
};

const petActions = [
  { label: "Edit", action: "Edit details for" },
  { label: "Export Data", action: "Export data for" },
  { label: "Delete", action: "Delete" },
];

export function PetCard({ name, age, breed, weight }: PetData) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsDropdownOpen((prevState) => !prevState);

  return (
    <div className="flex flex-col items-center bg-slate-100 rounded-lg shadow-md m-4 dark:bg-gray-500 dark:border-gray-700">
        
          {/* Button to toggle dropdown */}
        <div className="flex flex-col w-full items-center bg-fuchsia-200 rounded-lg pt-8">
          <Image
            alt={`Picture of ${name}`}
            height="96"
            src="/tata.webp" // Replace with actual image URL
            width="96"
            className="mb-3 p-1 w-24 h-24 rounded-full bg-cyan-500 shadow-lg object-cover sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-38 lg:h-38"
          />
          <h5 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-900">{name}</h5></div>
          <div className="grid grid-cols-3 gap-10 m-8 items-center text-sm text-gray-500 dark:text-gray-400">
            <p><strong>Age:</strong> {age}</p>
            <p><strong>Breed:</strong> {breed}</p>
            {weight && <p><strong>Weight:</strong> {weight}</p>}
          </div>
        
    
    </div>
  );
}

export default PetCard;