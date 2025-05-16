'use client';
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { PiCatDuotone, PiDogDuotone, PiRabbitDuotone } from "react-icons/pi";

// Define pet options in an array to avoid repetition
const petOptions = [
  { id: "cat", label: "Cat", icon: PiCatDuotone },
  { id: "dog", label: "Dog", icon: PiDogDuotone },
  { id: "other", label: "Other", icon: PiRabbitDuotone },
];

const PetTypeSelector: React.FC = () => {
  const {
    control,
    formState: { errors }, // Access errors from react-hook-form
  } = useFormContext();

  return (
    <fieldset className="flex flex-col items-start w-full mt-6 ml-6">
      <legend className="block text-sm font-medium text-gray-700 mb-4 ml-16">
        Select Pet Type
      </legend>

      <Controller
        name="petType"
        control={control}
        render={({ field }) => (
          <div
            role="radiogroup"
            aria-labelledby="pet-type-label"
            className="flex flex-row space-x-4"
          >
            {petOptions.map(({ id, label, icon: Icon }) => (
              <label
                key={id}
                htmlFor={id}
                className={`cursor-pointer flex flex-col items-center justify-center h-20 w-16 border border-gray-300 rounded-[20px] mb-4 
                ${
                  field.value === id
                    ? "bg-green-400 text-white"
                    : "bg-white text-gray-700"
                } focus-within:ring-2 focus-within:ring-blue-500`}
              >
                <input
                  id={id}
                  type="radio"
                  name={field.name}
                  value={id}
                  checked={field.value === id}
                  onChange={() => field.onChange(id)}
                  className="sr-only" // Screen-reader-only class to hide visually but keep accessible
                  aria-checked={field.value === id}
                  role="radio"
                  tabIndex={0} // Make it focusable
                />
                <Icon
                  className={`h-14 w-16 ${
                    field.value === id ? "text-white" : "text-pink-300"
                  }`}
                />
                <span className="select-none">{label}</span>
              </label>
            ))}
          </div>
        )}
      />

      {/* Display error message below the field */}
      {errors.petType && (
        <p className="text-red-500 text-sm mt-2">{errors.petType?.message?.toString()}</p>
      )}
    </fieldset>
  );
};

export default PetTypeSelector;
