'use client';

import React, { useState } from "react";

const BirthDateInputField: React.FC = () => {
  const [birthDate, setBirthDate] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

    // Format the date in DD/MM/YYYY format dynamically
    if (value.length <= 2) {
      value = value.replace(/(\d{2})(\d{1,})/, "$1/$2");
    } else if (value.length <= 4) {
      value = value.replace(/(\d{2})(\d{2})(\d{1,})/, "$1/$2/$3");
    } else {
      value = value.substring(0, 8); // Keep only 8 characters (DD/MM/YYYY)
    }

    setBirthDate(value); // Update the state with the formatted value
  };

  return (
    <div className="flex flex-col w-1/2 items-center mt-4 mb-4 select-none">
      <label
        htmlFor="pet-birthdate"
        className="block text-sm font-medium text-center text-gray-700 mb-2 select-none"
      >
        Pet's Birth Date
      </label>
      <input
        id="pet-birthdate"
        type="text"
        value={birthDate}
        placeholder="DD/MM/YYYY"
        maxLength={10} // Limit to 10 characters (DD/MM/YYYY)
        className="w-full py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
        onChange={handleChange}
      />
    </div>
  );
};

export default BirthDateInputField;
