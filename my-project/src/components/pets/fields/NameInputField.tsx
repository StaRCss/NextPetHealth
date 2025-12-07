import React from "react";
import { useFormContext } from "react-hook-form";
import { PetFormValues } from "../AddPetForm";
import { useWatch } from "react-hook-form";


const NameInputField : React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<PetFormValues>();

  const nameValue = useWatch({name: "name"}); // Watch the value of the "name" field

  return (
    <div className="flex flex-col items-center w-[80%] md:w-[70%] lg:w-[60%] ml-0 mt-4 mb-4 select-none">
      <label
        htmlFor="pet-name"
        className="block text-sm font-medium text-gray-700 dark:text-text-dark mb-2 select-none"
      >
        Pet Name *
      </label>

      <input
        {...register("name")}
        id="pet-name"
        type="text"
        placeholder="Tata"
        aria-invalid={!!errors.name}
        aria-describedby="name-error"
        className={`w-full
           dark:bg-zinc-700   
            dark:text-white 
              dark:placeholder-white
   px-4 py-2 border rounded-2xl focus:outline-none ${

            nameValue?.trim()
      ? errors.name
        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500"
        : "border-green-500 focus:border-green-500 border-2 focus:ring-2 focus:ring-green-500"
      : errors.name
      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500"
      : "border-gray-300 focus:ring-2 focus:ring-blue-500"

        }
        `}
      />

      {errors.name && (
        <p id="name-error" className="mt-2 text-sm text-red-600">
          {errors.name.message}
        </p>
      )}
    </div>
  )}


export default NameInputField;