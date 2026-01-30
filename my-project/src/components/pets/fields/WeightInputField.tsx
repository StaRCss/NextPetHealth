"use client";

import React from "react";
import {
  useController,
  Control,
  FieldValues,
  Path,
} from "react-hook-form";

interface WeightInputFieldProps<T extends FieldValues> {
  name: Path<T>;          // ✅ correct type
  control: Control<T>;
}

function WeightInputField<T extends FieldValues>({
  name,
  control,
}: WeightInputFieldProps<T>) {
  const {
    field: { value, onChange, ref },
  } = useController({
    name,      // ✅ no cast needed
    control,
  });

  const [isKg, setIsKg] = React.useState(true);

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (/^\d*\.?\d*$/.test(inputValue)) {
      onChange(inputValue);
    }
  };

  return (
    <div className="flex flex-col items-start w-fit my-4 mx-4 select-none">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Pet Weight
      </label>

      <div className="flex items-center w-full border border-gray-300 rounded-lg overflow-hidden">
        <input
          ref={ref}
          type="text"
          value={value ?? ""}
          onChange={handleWeightChange}
          placeholder="Weight"
          className="w-full px-4 py-2 border-none focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        <button
          type="button"
          onClick={() => setIsKg((p) => !p)}
          className="px-4 py-2 bg-purple-500 text-white font-medium"
        >
          {isKg ? "kg" : "lb"}
        </button>
      </div>
    </div>
  );
}

export default WeightInputField;
