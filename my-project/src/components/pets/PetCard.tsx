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
    <div className="flex flex-col items-center  bg-slate-100 rounded-lg shadow-md p-4 m-4 dark:bg-gray-500 dark:border-gray-700">
      <div className="w-5/6 m-6 md:w-1/2 lg:w-1/3">
        <div className="relative">
          {/* Button to toggle dropdown */}
          <button
            onClick={toggleDropdown}
            className="absolute top-0 right-0 px-4 py-2 text-white bg-blue-500 rounded-full focus:outline-none"
          >
            {/* Dropdown button content */}
            <span className="sr-only">Actions for {name}</span> •••
          </button>

          {/* Dropdown menu (conditionally rendered) */}
          {isDropdownOpen && (
            <div className="absolute top-10 right-0 w-48 bg-white shadow-lg rounded-md">
              <ul className="divide-y divide-gray-200">
                {petActions.map((action, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className={`block px-4 py-2 text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
                        action.label === "Delete" ? "text-red-600" : ""
                      }`}
                      aria-label={`${action.action} ${name}`}
                    >
                      {action.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center">
          <Image
            alt={`Picture of ${name}`}
            height="96"
            src="/tata.webp" // Replace with actual image URL
            width="96"
            className="mb-3 p-1 w-24 h-24 rounded-full bg-cyan-500 shadow-lg object-cover sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-38 lg:h-38"
          />
          <h5 className="mb-1 text-xl font-bold text-gray-900 dark:text-gray-900">{name}</h5>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
            <p><strong>Age:</strong> {age}</p>
            <p><strong>Breed:</strong> {breed}</p>
            {weight && <p><strong>Weight:</strong> {weight}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetCard;