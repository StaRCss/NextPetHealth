import React from "react";
import { useFormContext } from "react-hook-form";
import { PetFormValues } from "../components/AddPetForm";

const NameInputField = () => {
  const { register } = useFormContext<PetFormValues>(); 

  return (
    <div className="flex flex-col items-center w-full ml-0 mt-4 mb-4 select-none">
      <label htmlFor="pet-name" className="block text-sm font-medium text-center text-gray-700 mb-2 select-none">
        Pet Name
      </label>
      
      <input
        {...register("name")} // 
        id="pet-name"
        type="text"
        placeholder="Tata"
        aria-label="Pet Name"
        className="w-full px-4 py-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default NameInputField;
