"use client";

import React, { useState, useRef } from "react";

const WeightInputField: React.FC = () => {
  const [weight, setWeight] = useState<number | string>(""); // Handle the input
  const [isKg, setIsKg] = useState(true); // Toggle for kg/lb
  const inputRef = useRef<HTMLInputElement | null>(null); // Reference for the input field

  // Handle input change
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numeric input
    if (/^\d*\.?\d*$/.test(value)) {
      setWeight(value);
    }
  };

  // Toggle between kg and lb
  const toggleUnit = () => {
    setIsKg(!isKg);
    // Automatically convert weight if it's a valid number
    if (weight !== "") {
      const convertedWeight = isKg ? (Number(weight) * 2.20462).toFixed(2) : (Number(weight) / 2.20462).toFixed(2);
      setWeight(convertedWeight);
    }
  };

  // Scroll into view when the input is focused
  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="flex flex-col items-start w-full ml-4 mt-4 mb-4 select-none">
      <label htmlFor="pet-weight" className="block text-sm font-medium text-gray-700 mb-2">
        Pet Weight
      </label>
    <div className="flex items-center w-full border border-gray-300 rounded-lg">
  <input
    id="pet-weight"
    type="text"
    value={weight}
    onChange={handleWeightChange}
    onFocus={handleFocus} // Scroll to view when focused
    placeholder="Weight"
    ref={inputRef} // Assign the ref to the input
    className="w-full px-4 py-2 border-none rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  />
  <button
    onClick={toggleUnit}
    className="px-4 py-2 bg-blue-500 text-white rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    {isKg ? "kg" : "lb"}
  </button>
</div>

    </div>
  );
};

export default WeightInputField;
