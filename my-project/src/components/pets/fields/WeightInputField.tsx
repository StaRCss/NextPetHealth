"use client";

import React from "react";
import { useController, Control } from "react-hook-form";

interface WeightInputFieldProps {
  name: string;
  control: Control<any>;
}

const WeightInputField: React.FC<WeightInputFieldProps> = ({ name, control }) => {
  const {
    field: { value, onChange, ref },
  } = useController({
    name,
    control,
  });

  const [isKg, setIsKg] = React.useState(true);

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (/^\d*\.?\d*$/.test(inputValue)) {
      onChange(inputValue);
    }
  };

  const toggleUnit = () => {
    setIsKg((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-start w-fit my-4 mx-4 select-none">
      <label htmlFor="pet-weight" className="block text-sm font-medium text-gray-700 mb-2">
        Pet Weight
      </label>
      <div className="flex items-center w-full border border-gray-300 rounded-lg overflow-hidden">
        <input
          id="pet-weight"
          ref={ref}
          type="text"
          value={value ?? ""}
          onChange={handleWeightChange}
          placeholder="Weight"
          className="w-full px-4 py-2 border-none focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <button
          type="button"
          onClick={toggleUnit}
          className="px-4 py-2 bg-purple-500 text-white font-medium focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          {isKg ? "kg" : "lb"}
        </button>
      </div>
    </div>
  );
};

export default WeightInputField;
