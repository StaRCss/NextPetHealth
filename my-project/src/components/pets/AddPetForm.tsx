"use client";

import { useForm, FormProvider, Form } from "react-hook-form";
import React from "react";
import NameInputField from "@/components/pets/fields/NameInputField";
import GenderCheckboxField from "@/components/pets/fields/GenderCheckboxField";
import BreedInputField from "@/components/pets/fields/BreedInputField";
import BirthdayInputField from "@/components/pets/fields/BirthdayInputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { petFormSchema } from "@/lib/validations/PetFormSchema";
import { CheckCircle } from "lucide-react";
import FormSubmitButton from "./FormSubmitButton";

export type PetFormValues = {
  name: string;
  gender?: string | null;
  breed?: string | null;
  birthday: string;
};

type AddPetFormProps = {
  onSuccess?: (petName:string) => void;
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
          onSuccess(data.name); // Pass the pet name to the onSuccess callback
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
          <FormSubmitButton
            submitting={formState.isSubmitting}
            label="Add Pet"
            icon={<CheckCircle size={16} />}
          />
          
        </div>
      </form>
    </FormProvider>
  );
};

export default AddPetForm;
