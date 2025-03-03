import { PiCatDuotone } from "react-icons/pi";
import PetTypeSelector from "@/app/components/PetTypeSelector";
import UploadImageField from "@/app/components/UploadImageField";
import NameInputField from "@/app/components/NameInputField";
import GenderCheckboxField from "@/app/components/GenderCheckboxField";
import WeightInputField from "@/app/components/WeightInputField";
import BreedInputField from "@/app/components/BreedInputField";

export default function AddPetForm() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-slate-50 w-full max-w-screen-lg md:w-2/3 lg:w-2/3 p-8 rounded-lg shadow-lg">
      <div className="flex-col items-center justify-start">
         <h2 className="text-3xl text-gray-700 font-bold">Add a new pet</h2>
         <h3 className=" text-gray-700 ">Everything about your buddy!</h3>
      </div>
      <PetTypeSelector/>
     
<div className="flex flex-row border-b border-gray-300 gap-6 pb-4">
  {/* Left: Upload Image Field */}
  <div className="flex-grow flex-shrink  flex justify-center ">
    <UploadImageField />
  </div>

  {/* Right: Input Fields */}
  <div className="flex-grow flex-shrink flex flex-col items-center">
    <NameInputField />
    <GenderCheckboxField />
  </div>
</div>

<div className="flex flex-row border-b border-gray-300 gap-4 pb-4">
  <WeightInputField/>
  <BreedInputField/>
  </div>
        
      
        {/* Form content will go here */}
      </div>
    </div>
  );
}
