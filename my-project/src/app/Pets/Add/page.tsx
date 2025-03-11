'use client'; // Ensures the code runs on the client-side for Next.js
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import PetTypeSelector from "@/app/components/PetTypeSelector";
import UploadImageField from "@/app/components/UploadImageField";
import NameInputField from "@/app/components/NameInputField";
import GenderCheckboxField from "@/app/components/GenderCheckboxField";
import BreedInputField from "@/app/components/BreedInputField";
import BirthdayInputField from "@/app/components/BirthdayInputField";
import SubmitButton from "@/app/components/SubmitButton";
import { IoArrowBackCircleOutline } from "react-icons/io5";

// Define the types for the form values
export type PetFormValues = {
  petType: string;
  name: string;
  gender: string;
  breed: string;
  birthday: Date | null;
  image: File | null;
};

export default function AddPetForm() {
  // Initialize the Next.js router to handle navigation
  const router = useRouter();

  // Initialize React Hook Form with default values for all form fields
  const methods = useForm<PetFormValues>({
    defaultValues: {
      petType: "", // Initially no pet type selected
      name: "",
      gender: "",
      breed: "",
      birthday: null,
      image: null,
    },
  });

  // Destructure required methods from the useForm hook
  const { handleSubmit } = methods;

  // Handle form submission and log the form data
  const onSubmit = (data: PetFormValues) => {
    console.log("Submitted Data:", data); // Log the form data
    router.push("/Pets"); // Redirect to the Pets page after successful submission
  };

  // Handle the cancel button click event and navigate back to the Pets page
  const handleCancel = () => {
    router.replace("/Pets"); // Replace the current page in the history stack to prevent back navigation
  };

  return (
    <div className="flex justify-center items-center min-h-screen overflow-auto">
      {/* Main form container */}
      <div className="bg-slate-50 flex flex-col xs:w-full xs:h-screen max-w-screen-md p-6 rounded-lg shadow-lg md:w-2/3 lg:w-1/2 md:mx-auto">
        
        {/* Header and Cancel button */}
        <div className="flex flex-row justify-between">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl text-gray-700 font-bold">Add a new pet</h2>
            <h3 className="text-gray-700">Everything about your buddy!</h3>
          </div>
          
          {/* Cancel button */}
          <button
            onClick={handleCancel} // Use router.replace to go back
            className="bg-transparent w-6 h-6 text-gray-500 rounded-2xl shadow-md hover:bg-slate-700 hover:text-white transition-all top-6 right-4"
          >
            <IoArrowBackCircleOutline className="w-6 h-6" />
          </button>
        </div>

        {/* Wrap the form with FormProvider to share the form state */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">            
            {/* Pet Type Selector */}
              <PetTypeSelector />           
            {/* Fields for uploading image and entering name & gender */}
            <div className="flex flex-row items-center border-b border-gray-300 gap-4 pb-4">
              <UploadImageField/> {/* Image upload field */}
              <div className="flex flex-col items-center w-1/2">
                <NameInputField/> {/* Name input field */}
                <GenderCheckboxField/> {/* Gender checkbox */}
              </div>
            </div>
            {/* Fields for birthday and breed */}
            <div className="flex flex-row items-evenly border-b border-gray-300 gap-4 pb-4">
              <BirthdayInputField/>{/* Birthday input field */}
              <BreedInputField /> {/* Breed input field */}
            </div>

            {/* Submit button */}
            <div className="flex justify-center items-center m-4">
              <SubmitButton /> {/* Submit button */}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
