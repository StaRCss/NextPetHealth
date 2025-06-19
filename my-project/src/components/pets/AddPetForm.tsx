'use client';
import { useForm, FormProvider } from "react-hook-form";
import React from "react";
import NameInputField from '@/components/pets/fields/NameInputField';
import GenderCheckboxField from '@/components/pets/fields/GenderCheckboxField';
import BreedInputField from '@/components/pets/fields/BreedInputField';
import BirthdayInputField from '@/components/pets/fields/BirthdayInputField';
import SubmitButton from '@/components/pets/fields/SubmitButton';
import { zodResolver } from "@hookform/resolvers/zod";
import { petFormSchema } from "@/lib/validations/PetFormSchema"; // Import your Zod schema

export type PetFormValues = {
  name: string;
  gender?: string | null;
  breed?: string | null;
  birthday?: string;
};

const AddPetForm = ({ action }: { action: (formData: FormData) => Promise<void> }) => {
  console.log("RENDER");
  
  const methods = useForm<PetFormValues>({
    resolver: zodResolver(petFormSchema), // Apply Zod validation schema
    defaultValues: {
      name: "",
      gender: "",
      breed: "",
      birthday: "",
    },
  });

  const { handleSubmit } = methods;

  // Custom action to submit the form data
  interface OnSubmitProps {
    name: string;
    gender?: string | null;
    breed?: string | null;
    birthday?: string;
    
  }

  const onSubmit = async (data: OnSubmitProps): Promise<void> => {
    console.log("Form Data:", data); // Log the form data

    const formData: FormData = new FormData();
    formData.append("name", data.name);
    if (data.gender?.trim()) {
      formData.append("gender", data.gender.trim());
    }
    // Default to empty string if null
    if (data.breed?.trim()) {
      formData.append("breed", data.breed.trim());
    }

    if (data.birthday?.trim()) {
      formData.append("birthday", data.birthday.trim()); // Assuming 'YYYY-MM-DD' format
    }
    console.log("FormData:", formData); // Log the FormData object

    await action(formData); // Send data to the server
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        <div className="flex flex-col items-center border-t border-b border-gray-300 gap-4 pb-4">
            <NameInputField />
            <GenderCheckboxField />
          <BreedInputField />
          <BirthdayInputField/>
        </div>
        
        <div className="flex justify-center items-center m-auto">
          <SubmitButton />
        </div>
      </form>
    </FormProvider>
  );
};

export default AddPetForm;



















