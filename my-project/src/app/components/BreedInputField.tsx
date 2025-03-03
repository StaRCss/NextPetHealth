"use client";

import React, { useState } from "react";

const BreedInputField: React.FC = () => {
  const [breed, setBreed] = useState("");
  const breedOptions = ["Labrador", "European Shorthaired", "German Shepherd", "Persian", "Maine Coon", "Bengal"]; // Example options

  const handleBreedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBreed(e.target.value);
  };

  return (
    <div className="flex flex-col items-start w-full ml-4 mt-4 mb-4 select-none">
      <label htmlFor="pet-breed" className="block text-sm font-medium text-gray-700 mb-2">
        Pet Breed
      </label>
      <select
        id="pet-breed"
        value={breed}
        onChange={handleBreedChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="" disabled>Select breed</option>
        {breedOptions.map((breedOption, index) => (
          <option key={index} value={breedOption}>
            {breedOption}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BreedInputField;
