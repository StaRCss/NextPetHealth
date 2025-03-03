'use client';
import React, { useState } from "react";
import { PiCatDuotone, PiDogDuotone, PiRabbitDuotone } from "react-icons/pi";

const PetTypeSelector: React.FC = () => {
  const [selectedPet, setSelectedPet] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPet(e.target.value);
  };

  return (
    <div className="flex flex-row border-b border-gray-300 items-center justify-start mt-4 space-x-4">
      {/* Cat Option */}
      <label
        htmlFor="cat"
        className={`cursor-pointer flex flex-col items-center justify-center h-20 w-16 border border-gray-300 rounded-[20px] mb-4 ${
          selectedPet === "cat" ? "bg-blue-500 text-white" : "bg-white text-gray-700"
        }`}
      >
        <input
          id="cat"
          type="radio"
          name="petType"
          value="cat"
          className="hidden"
          checked={selectedPet === "cat"}
          onChange={handleChange}
        />
        <PiCatDuotone className={`h-14 w-16 ${selectedPet === "cat" ? "text-pink-300" : "text-pink-300"}`} />
        <h3 className="select-none">Cat</h3>
      </label>

      {/* Dog Option */}
      <label
        htmlFor="dog"
        className={`cursor-pointer flex flex-col items-center justify-center h-20 w-16 border border-gray-300 rounded-[20px] mb-4 ${
          selectedPet === "dog" ? "bg-blue-500 text-white" : "bg-white text-gray-700"
        }`}
      >
        <input
          id="dog"
          type="radio"
          name="petType"
          value="dog"
          className="hidden"
          checked={selectedPet === "dog"}
          onChange={handleChange}
        />
        <PiDogDuotone className={`h-14 w-16 ${selectedPet === "dog" ? "text-pink-300" : "text-pink-300"}`} />
        <h3 className="select-none">Dog</h3>
      </label>

      {/* Other Option */}
      <label
        htmlFor="other"
        className={`cursor-pointer flex flex-col items-center justify-center h-20 w-16 border border-gray-300 rounded-[20px] mb-4 ${
          selectedPet === "other" ? "bg-blue-500 text-white" : "bg-white text-gray-700"
        }`}
      >
        <input
          id="other"
          type="radio"
          name="petType"
          value="other"
          className="hidden"
          checked={selectedPet === "other"}
          onChange={handleChange}
        />
        <PiRabbitDuotone className={`h-14 w-16 ${selectedPet === "other" ? "text-pink-300" : "text-pink-300"}`} />
        <h3 className="select-none">Other</h3>
      </label>
    </div>
  );
};

export default PetTypeSelector;
