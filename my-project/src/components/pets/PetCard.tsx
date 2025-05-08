"use client";
import React from "react";
import { Card, Dropdown } from "flowbite-react";
import Image from "next/image";

type PetData = {
  name: string;
  age: number;
  breed: string;
  weight?: string; // Example of additional data
  color?: string; // Example of additional data
};

export function PetCard({ name, age, breed, weight }: PetData) {
  return (
    <div className="flex flex-col items-center">
      <Card className="w-5/6 m-6 md:w-1/2 lg:w-1/3">
        <div className="flex justify-end px-2">
          <Dropdown inline 
          label={<span className="sr-only">Actions for this pet</span>}
          aria-label={`Actions for ${name}`}>
            <Dropdown.Item>
              <a
                href="#"
                className="block px-4 py-2 text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                aria-label={`Edit details for ${name}`}
              >
                Edit
              </a>
            </Dropdown.Item>
            <Dropdown.Item>
              <a
                href="#"
                className="block px-4 py-2 text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                aria-label={`Export data for ${name}`}
              >
                Export Data
              </a>
            </Dropdown.Item>
            <Dropdown.Item>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                aria-label={`Delete ${name}`}
              >
                Delete
              </a>
            </Dropdown.Item>
          </Dropdown>
        </div>
        <div className="flex flex-col items-center">
          <Image
            alt={`Picture of ${name}`}
            height="96"
            src="/tata.jpg"
            width="96"
            className="mb-3 p-1 w-24 h-24 rounded-full bg-cyan-500 shadow-lg object-cover sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-38 lg:h-38"
          />
          <h5 className="mb-1 text-xl font-bold text-gray-900 dark:text-gray-900">{name}</h5>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
            <p>
              <strong>Age:</strong> {age}
            </p>
            <p>
              <strong>Breed:</strong> {breed}
            </p>
            {weight && (
              <p>
                <strong>Weight:</strong> {weight}
              </p>
            )}
            
          </div>
        </div>
      </Card>
    </div>
  );
}

export default PetCard;
