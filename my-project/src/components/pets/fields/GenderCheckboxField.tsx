"use client";

import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { PetFormValues } from "../AddPetForm";

const GenderField: React.FC = () => {
  const { control } = useFormContext<PetFormValues>();

  if (!control) return null; // Prevents errors if control is undefined

  return (
    <div className="flex flex-col items-center w-full max-w-full mt-0 mb-4 select-none">
      {/* ✅ Proper label for the group */}
      <label
        htmlFor="gender-male"
        className="block text-sm font-medium text-gray-700 mb-4 text-center"
      >
        Gender
      </label>

      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <div className="flex items-center justify-center space-x-4 sm:space-x-8">
            {/* ✅ Male Radio with proper label */}
            <label htmlFor="gender-male" className="flex items-center space-x-2">
              <input
                {...field}
                id="gender-male" // ✅ Correctly associates with label
                type="radio"
                value="male"
                checked={field.value === "male"}
                onChange={field.onChange}
                className="form-radio h-6 w-6 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-700">Male</span>
            </label>

            {/* ✅ Female Radio with proper label */}
            <label htmlFor="gender-female" className="flex items-center space-x-2">
              <input
                {...field}
                id="gender-female" // ✅ Correctly associates with label
                type="radio"
                value="female"
                checked={field.value === "female"}
                onChange={field.onChange}
                className="form-radio h-6 w-6 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-700">Female</span>
            </label>
          </div>
        )}
      />
    </div>
  );
};

export default GenderField;
