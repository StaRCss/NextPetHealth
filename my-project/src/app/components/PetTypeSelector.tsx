'use client';
import React from "react";
import { ControllerRenderProps } from "react-hook-form";
import { PiCatDuotone, PiDogDuotone, PiRabbitDuotone } from "react-icons/pi";

// Define pet options in an array to avoid repetition
const petOptions = [
  { id: "cat", label: "Cat", icon: PiCatDuotone },
  { id: "dog", label: "Dog", icon: PiDogDuotone },
  { id: "other", label: "Other", icon: PiRabbitDuotone },
];

// 🌟 Now PetTypeSelector receives `field` props from React Hook Form
const PetTypeSelector: React.FC<ControllerRenderProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-row border-b border-gray-300 items-center justify-start mt-4 space-x-4">
      {petOptions.map(({ id, label, icon: Icon }) => (
        <label
          key={id}
          htmlFor={id}
          className={`cursor-pointer flex flex-col items-center justify-center h-20 w-16 border border-gray-300 rounded-[20px] mb-4 
          ${value === id ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
        >
          <input
            id={id}
            type="radio"
            name="petType"
            value={id}
            className="hidden"
            checked={value === id}
            onChange={() => onChange(id)}
          />
          <Icon className="h-14 w-16 text-pink-300" />
          <h3 className="select-none">{label}</h3>
        </label>
      ))}
    </div>
  );
};

export default PetTypeSelector;
