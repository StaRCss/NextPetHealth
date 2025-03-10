"use client";

import React from "react";
import { Controller } from "react-hook-form";

interface NameInputFieldProps {
  control: any; // React Hook Form control
  errors?: any; // To display validation errors
}

const NameInputField: React.FC<NameInputFieldProps> = ({ control, errors }) => {
  return (
    <div className="flex flex-col items-center w-full ml-0 mt-4 mb-4 select-none">
      <label htmlFor="pet-name" className="block text-sm font-medium text-center text-gray-700 mb-2 select-none">
        Pet Name
      </label>
      
      <Controller
        name="name" // Matches the form field name
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input
            {...field}
            id="pet-name"
            type="text"
            placeholder="Tata"
            className={`w-full py-2 border ${
              errors?.name ? "border-red-500" : "border-gray-300"
            } rounded-2xl shadow-sm focus:outline-none focus:ring-2 ${
              errors?.name ? "focus:ring-red-500 focus:border-red-500" : "focus:ring-blue-500 focus:border-blue-500"
            } text-center`}
          />
        )}
      />
      
      {/* Display validation errors */}
      {errors?.name && (
        <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
      )}
    </div>
  );
};

export default NameInputField;

