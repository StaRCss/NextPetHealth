'use client';
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import React from "react";
import UploadImageField from '@/app/components/UploadImageField';
import NameInputField from '@/app/components/NameInputField';
import GenderCheckboxField from '@/app/components/GenderCheckboxField';
import PetTypeSelector from '@/app/components/PetTypeSelector';
import BreedInputField from '@/app/components/BreedInputField';
import BirthdayInputField from '@/app/components/BirthdayInputField';
import SubmitButton from '@/app/components/SubmitButton';
import { zodResolver } from "@hookform/resolvers/zod";
import { petFormSchema } from "@/lib/validations/PetFormSchema"; // Import your Zod schema

export type PetFormValues = {
  petType: string;
  name: string;
  gender: string;
  breed: string;
  birthday: string | null;
  image?: File;
};

const AddPetForm = ({ action }: { action: (formData: FormData) => Promise<void> }) => {
  console.log("RENDER");
  
  const methods = useForm<PetFormValues>({
    resolver: zodResolver(petFormSchema), // Apply Zod validation schema
    defaultValues: {
      petType: "",
      name: "",
      gender: "",
      breed: "",
      birthday: null,
      image: undefined,
    },
  });

  const { handleSubmit, formState: { errors } } = methods;

  // Custom action to submit the form data
  const onSubmit: SubmitHandler<PetFormValues> = async (data) => {
    console.log("Form Data:", data); // Log the form data

    const formData = new FormData();
    formData.append("petType", data.petType);
    formData.append("name", data.name);
    formData.append("gender", data.gender);
    formData.append("breed", data.breed);
    formData.append("birthday", data.birthday || "");
    if (data.image) {
      formData.append("image", data.image);
    }

    await action(formData); // Send data to the server
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <PetTypeSelector />
        <div className="flex flex-row items-center border-b border-gray-300 gap-4 pb-4">
          <UploadImageField />
          <div className="flex flex-col items-center w-1/2">
            <NameInputField />
            <GenderCheckboxField />
          </div>
        </div>
        <div className="flex flex-row items-evenly border-b border-gray-300 gap-4 pb-4">
          <BirthdayInputField />
          <BreedInputField />
        </div>

        {/* Display errors from validation */}
        {errors.petType && <p className="text-red-500 text-sm">{errors.petType.message}</p>}
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        {errors.breed && <p className="text-red-500 text-sm">{errors.breed.message}</p>}
        {errors.birthday && <p className="text-red-500 text-sm">{errors.birthday.message}</p>}

        <div className="flex justify-center items-center m-4">
          <SubmitButton />
        </div>
      </form>
    </FormProvider>
  );
};

export default AddPetForm;



















