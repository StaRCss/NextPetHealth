
"use client";

import React from "react";
import { Controller } from "react-hook-form";

interface GenderFieldProps {
  control: any; // React Hook Form control
  errors?: any; // To display validation errors
}

const GenderField: React.FC<GenderFieldProps> = ({ control, errors }) => {
  return (
    <div className="flex flex-col items-center w-full max-w-full mt-0 mb-4 select-none">
      <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
        Gender
      </label>
      <Controller
        name="gender" // This must match the form field name
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div className="flex items-center justify-center space-x-4 sm:space-x-8">
            {/* Male Radio */}
            <label className="flex items-center space-x-2">
              <input
                {...field}
                type="radio"
                value="male"
                checked={field.value === "male"} // Ensure correct selection
                onChange={() => field.onChange("male")}
                className="form-radio h-6 w-6 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-700">Male</span>
            </label>
            {/* Female Radio */}
            <label className="flex items-center space-x-2">
              <input
                {...field}
                type="radio"
                value="female"
                checked={field.value === "female"} // Ensure correct selection
                onChange={() => field.onChange("female")}
                className="form-radio h-6 w-6 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-700">Female</span>
            </label>
          </div>
        )}
      />
      {/* Show validation error message */}
      {errors?.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
    </div>
  );
};

export default GenderField;
