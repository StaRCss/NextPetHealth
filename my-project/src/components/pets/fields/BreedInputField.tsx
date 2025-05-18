'use client';
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

      <Controller
        name="breed"  
        control={control}  
        defaultValue=""  
        render={({ field }) => (
          <Autocomplete
            {...field}
            id="pet-breed"
            freeSolo  
            options={breedOptions}  
            value={field.value}  // Ensure value is bound correctly
            onChange={(_, value) => field.onChange(value)}  // Update form state
            onInputChange={(_, value) => field.onChange(value)} // Capture user-typed input
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
              '&::before': { transition: 'box-shadow .15s ease-in-out' },
              '&:focus-within': { borderColor: '#86b7fe' },
            }}
          />
        )}
      />
    </div>
  )}

export default BreedInputField;
