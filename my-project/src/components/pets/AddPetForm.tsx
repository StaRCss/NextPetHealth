"use client";

import { useForm, FormProvider } from "react-hook-form";
import React from "react";
import NameInputField from "@/components/pets/fields/NameInputField";
import GenderCheckboxField from "@/components/pets/fields/GenderCheckboxField";
import BreedInputField from "@/components/pets/fields/BreedInputField";
import BirthdayInputField from "@/components/pets/fields/BirthdayInputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { petFormSchema } from "@/lib/validations/PetFormSchema";
import { CheckCircle } from "lucide-react";
import FormSubmitButton from "./FormSubmitButton";
import {  useRouter } from "next/navigation";

export type PetFormValues = {
  id?: string;
  name: string;
  gender?: string | null;
  breed?: string | null;
  birthday: string;
  role: "add" | "edit";
};

type AddPetFormProps = {
  pet?: PetFormValues;
  onSuccess?: (petName: string) => void;
};

export default function AddPetForm({ pet, onSuccess }: AddPetFormProps) {
  const router = useRouter();
  const methods = useForm<PetFormValues>({
    resolver: zodResolver(petFormSchema),
    defaultValues: pet
      ? {
          name: pet.name,
          gender: pet.gender,
          breed: pet.breed,
          birthday: pet.birthday,
          role: pet.role,
        }
      : 
      {
          name: "",
          gender: null,
          breed: null,
          birthday: "",
          role: "add",
      },
    mode: "onSubmit",
  });

  console.log("Form initialized with role:", methods.getValues("role"));
  console.log("Form initialized with pet:", pet);

  const { handleSubmit, formState } = methods;

  const onSubmit = async (data: PetFormValues) => {
    console.log("Submitting:", data);

    // EDIT
    if (pet) {
      try {
        const response = await fetch(`/api/pets/${pet.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          onSuccess?.(data.name);
          console.log("Pet updated successfully", data );
          // Optionally, refresh the page or redirect
          router.push(`/dashboard/pets/${pet.id}`);
          router.refresh();       
        }
      } catch (err) {
        console.error("Update failed:", err);
      }

      return; // ❗ STOP RIGHT HERE so add logic does NOT run
    }

    // ADD
    try {
      const response = await fetch("/api/pets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        onSuccess?.(data.name);
      }
    } catch (err) {
      console.error("Add failed:", err);
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

        <div className="flex justify-center">
          <FormSubmitButton
            submitting={formState.isSubmitting}
            label={pet ? "Update" : "Add"}
            icon={<CheckCircle size={16} />}
          />
        </div>
      </form>
    </FormProvider>
  );
}