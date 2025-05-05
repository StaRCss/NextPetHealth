"use client";

import React from "react";

interface WeightInputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const WeightInputField: React.FC<WeightInputFieldProps> = ({ value, onChange }) => {
  const [isKg, setIsKg] = React.useState(true); // Toggle for kg/lb

  // Handle weight change
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^\d*\.?\d*$/.test(newValue)) {
      onChange(e); // This will update React Hook Form's state
    }
  };

  // Toggle between kg and lb
  const toggleUnit = () => {
    setIsKg(!isKg);
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
          value={value}
          onChange={handleWeightChange}
          placeholder="Weight"
          className="w-full px-4 py-2 border-none rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-600 "
        />
        <button
          type="button"
          onClick={toggleUnit}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          {isKg ? "kg" : "lb"}
        </button>
      </div>
    </div>
  );
};

export default WeightInputField;
