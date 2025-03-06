
'use client';
import { useRouter } from "next/navigation";

import { PiCatDuotone } from "react-icons/pi";
import PetTypeSelector from "@/app/components/PetTypeSelector";
import UploadImageField from "@/app/components/UploadImageField";
import NameInputField from "@/app/components/NameInputField";
import GenderCheckboxField from "@/app/components/GenderCheckboxField";
import WeightInputField from "@/app/components/WeightInputField";
import BreedInputField from "@/app/components/BreedInputField";
import BirthdayInputField from "@/app/components/BirthdayInputField";
import SubmitButton from "@/app/components/SubmitButton";

export default function AddPetForm() {
  const router = useRouter();
  
  // Handler for the cancel button to replace the current page in the history stack
  const handleCancel = () => {
    router.replace("/Pets"); // This prevents the user from going back to the form page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center md:h-2/3 lg:h-2/3 md:mt-12 lg:mt-12">
      <div className="bg-slate-50 flex flex-col w-full h-full max-w-screen-lg md:w-2/3 lg:w-2/3 p-6 rounded-lg shadow-lg">

      <div className="flex flex-row justify-between ">
        <div className="flex-col items-center justify-center">
          <h2 className="text-3xl text-gray-700 font-bold ">Add a new pet</h2>
          <h3 className="text-gray-700 ">Everything about your buddy!</h3>
        </div>
                 {/* Cancel button */}
        <button
          onClick={handleCancel} // Use router.replace here
          className=" bg-transparent w-6 h-6 text-gray-500 rounded-lg shadow-md hover:bg-slate-900 hover:text-white transition-all top-6 right-4"
        >
          x
        </button>
</div>
        {/* Pet Type Selector */}
        <PetTypeSelector />

        <div className="flex flex-row border-b border-gray-300 gap-4 pb-4">
          {/* Left: Upload Image Field */}
          <div className="flex-grow flex-shrink flex justify-center">
            <UploadImageField />
          </div>

          {/* Right: Input Fields Name & Gender */}
          <div className="flex-grow flex-shrink flex flex-col items-center">
            <NameInputField />
            <GenderCheckboxField />
          </div>
        </div>

        <div className="flex flex-row border-b border-gray-300 gap-4 pb-4">
          <WeightInputField />
          <BreedInputField />
        </div>

        {/* Form content will go here */}
<div className="flex flex-col justify-start items-start border-b border-gray-300 pb-4">
        <BirthdayInputField />
        </div>
        <div className="flex justify-center items-center m-4 ">

        <SubmitButton /></div>
      </div>
    </div>
  );
}
