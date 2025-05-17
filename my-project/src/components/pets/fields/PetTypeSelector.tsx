'use client';
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

const petOptions = [
  { id: "cat", label: "Cat", emoji: "🐱" },
  { id: "dog", label: "Dog", emoji: "🐶" },
  { id: "other", label: "Other", emoji: "🐰" },
];

const PetTypeSelector: React.FC = () => {
  const {
    control,
    formState: { errors },
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
            {petOptions.map(({ id, label, emoji }) => (
              <label
                key={id}
                htmlFor={id}
                className={`cursor-pointer flex flex-col items-center justify-center h-20 w-16 border border-gray-300 rounded-[20px] mb-4 transition-all
                  ${field.value === id ? "bg-green-400 text-white" : "bg-white text-gray-700"}
                  focus-within:ring-2 focus-within:ring-blue-500`}
              >
                <input
                  id={id}
                  type="radio"
                  name={field.name}
                  value={id}
                  checked={field.value === id}
                  onChange={() => field.onChange(id)}
                  className="sr-only"
                  aria-checked={field.value === id}
                  role="radio"
                  tabIndex={0}
                />
                <span
                  className={`text-4xl mb-1 transition-transform ${
                    field.value === id ? "text-white rotate-[10deg]" : "text-pink-400"
                  }`}
                >
                  {emoji}
                </span>
                <span className="select-none text-sm">{label}</span>
              </label>
            ))}
          </div>
        )}
      />

      {errors.petType && (
        <p className="text-red-500 text-sm mt-2">{errors.petType?.message?.toString()}</p>
      )}
    </fieldset>
  );
};

export default PetTypeSelector;
