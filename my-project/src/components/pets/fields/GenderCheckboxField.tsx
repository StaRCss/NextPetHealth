"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { PetFormValues } from "../AddPetForm";

const GenderField: React.FC = () => {
  const {
    register,
  } = useFormContext<PetFormValues>();


  return (
    <fieldset className="flex flex-col items-center w-full max-w-full mt-0 mb-4 select-none">
      <legend className="block text-sm font-medium text-gray-700 dark:text-text-dark mb-4 text-center">
        Gender
      </legend>

      <div className="flex items-center justify-center space-x-4 sm:space-x-8">
        {/* Male */}
        <label htmlFor="gender-male" className="flex items-center space-x-2">
          <input
            {...register("gender")}
            id="gender-male"
            type="radio"
            value="male"
            className="form-radio h-6 w-6 text-green-500 rounded focus:ring-2 focus:ring-green-500 dark:bg-zinc-700"
          />
          <span className="text-text-light dark:text-text-dark">Male</span>
        </label>

        {/* Female */}
        <label htmlFor="gender-female" className="flex items-center space-x-2">
          <input
            {...register("gender")}
            id="gender-female"
            type="radio"
            value="female"
            className="form-radio h-6 w-6 text-green-500 rounded focus:ring-2 focus:ring-green-500 dark:bg-zinc-700"
          />
          <span className="text-text-light dark:text-text-dark">Female</span>
        </label>
      </div>
    </fieldset>
  );
};

export default GenderField;
