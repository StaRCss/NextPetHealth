
'use client'; // Ensures the code runs on the client-side for Next.js

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import Autocomplete from "@mui/joy/Autocomplete";


const breedOptions = [
  "Labrador Retriever", "German Shepherd", "Golden Retriever", "French Bulldog", "Bulldog",
  "Poodle", "Beagle", "Rottweiler", "Yorkshire Terrier", "Dachshund",
  "Persian", "Maine Coon", "Siamese", "Bengal", "Sphynx"
];

const BreedInputField: React.FC = () => {
  const { control } = useFormContext();  // Use FormContext from React Hook Form

  return (
    <div className="flex flex-col items-center w-1/2 mt-4 mb-4 select-none">
      <label htmlFor="pet-breed" className="block text-sm font-medium text-gray-700 mb-2">
        Pet Breed
      </label>

      {/* Controller to wrap Autocomplete with React Hook Form */}
      <Controller
        name="breed"  // Field name for React Hook Form
        control={control}  // Control object to manage form state
        defaultValue=""  // Default value if no breed is selected
        render={({ field }) => (
          <Autocomplete
            {...field} 
            id= "pet-breed" // Spread React Hook Form field properties
            freeSolo  // Allow the user to type a custom breed
            options={breedOptions}  // Predefined breed options
            onChange={(_, value) => field.onChange(value)}  // Update form state on change
              placeholder="Breed"

            sx={{
              width: "100%",
              backgroundColor: "white",
    "--Input-radius": "16px",
    "--Input-gap": "0px",
    "--Input-minHeight": "42px",
     '--Input-focusedInset': 'var(--any, )',
    '--Input-focusedThickness':"2px",
    '--Input-focusedHighlight': 'rgba(13,110,253,.25)',
    '&::before': {
      transition: 'box-shadow .15s ease-in-out',
    },
    '&:focus-within': {
      borderColor: '#86b7fe',
    },
  }}

          />
        )}
      />
    </div>
  );
};

export default BreedInputField;
