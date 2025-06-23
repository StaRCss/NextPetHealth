"use client";

import { useForm, FormProvider } from "react-hook-form";
import React from "react";
import NameInputField from "@/components/pets/fields/NameInputField";
import GenderCheckboxField from "@/components/pets/fields/GenderCheckboxField";
import BreedInputField from "@/components/pets/fields/BreedInputField";
import BirthdayInputField from "@/components/pets/fields/BirthdayInputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { petFormSchema } from "@/lib/validations/PetFormSchema";

export type PetFormValues = {
  name: string;
  gender?: string | null;
  breed?: string | null;
  birthday: string;
};

type AddPetFormProps = {
  onSuccess?: () => void;
};

const AddPetForm: React.FC<AddPetFormProps> = ({ onSuccess }) => {
  const methods = useForm<PetFormValues>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      name: "",
      gender: "",
      breed: "",
      birthday: "",
    },
    mode: "onSubmit", // 👈 this shows validation errors on submit
  });

  const { handleSubmit, formState } = methods;

  const onSubmit = async (data: PetFormValues) => {

    console.log("Form submitted with data:", data);   

    try {
      const response = await fetch("/api/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // Optionally handle response here
      if (response.ok) {
        console.log("Pet added successfully");
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col items-center border-t border-b border-gray-300 gap-4 pb-4">
          <NameInputField />
          <GenderCheckboxField />
          <BreedInputField />
          <BirthdayInputField />
        </div>
        <div className="flex justify-center items-center m-auto">
          <button 
          disabled={ formState.isSubmitting}
          type="submit"
          aria-disabled={formState.isSubmitting}
          aria-busy={formState.isSubmitting}
          className="text-white w-1/2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
         >
          {formState.isSubmitting ? "Adding Cat..." : "Add Cat"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddPetForm;
