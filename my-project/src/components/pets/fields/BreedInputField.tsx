import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { PetFormValues } from "../AddPetForm";

const BreedInputField: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<PetFormValues>();

  const breedValue = useWatch({ name: "breed" });

  return (
    <div className="flex flex-col items-center w-[80%] md:w-[70%] lg:w-[60%] ml-0 mt-4 mb-4 select-none">
      <label
        htmlFor="pet-breed"
        className="block text-sm font-medium text-center text-gray-700 mb-2 select-none"
      >
        Pet Breed
      </label>

      <input
        {...register("breed")}
        id="pet-breed"
        type="text"
        placeholder="European Shorthair Orange Tabby"
        aria-invalid={!!errors.breed}
        aria-describedby="breed-error"
        className={`w-full px-4 py-2 border rounded-2xl focus:outline-none ${
          breedValue?.trim()
            ? errors.breed
              ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500"
              : "border-green-500 focus:border-green-500 border-2 focus:ring-2 focus:ring-green-500"
            : errors.breed
            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500"
            : "border-gray-300 focus:ring-2 focus:ring-blue-500"
        }`}
      />

      {errors.breed && (
        <p id="breed-error" className="mt-2 text-sm text-red-600">
          {errors.breed.message}
        </p>
      )}
    </div>
  );
};

export default BreedInputField;
