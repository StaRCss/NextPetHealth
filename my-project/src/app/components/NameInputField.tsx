"use client";

import React from "react";

const NameInputField: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full ml-0 mt-4 mb-4 select-none">
      <label htmlFor="pet-name" className="block text-sm font-medium text-center text-gray-700 mb-2 select-none">
        Pet Name
      </label>
      <input
        id="pet-name"
        type="text"
        placeholder="Peachie"
        className="w-full py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center "
      />
    </div>
  );
};

export default NameInputField;
