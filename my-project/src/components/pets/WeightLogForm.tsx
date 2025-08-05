'use client';

import { Save, Scale } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { weightLogSchema, WeightLogInput } from "@/lib/validations/WeightLogSchema";
import { get } from "http";

type WeightLogFormProps = {
  weight: number | null;
  isOpen: boolean;
  onClose: () => void;
  name: string;
  onSubmit: (data: WeightLogInput) => void; // pass a submit handler
};

export default function WeightLogForm({
  weight,
  isOpen,
  onClose,
  name,
  onSubmit,
}: WeightLogFormProps) {
  const [unit, setUnit] = useState<"kg" | "lb">("kg");
  const formRef = useRef<HTMLDivElement | null>(null);

  // Initialize react-hook-form with Zod schema resolver
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<WeightLogInput>({
    resolver: zodResolver(weightLogSchema),
    defaultValues: {
      weight: weight ?? undefined,
      unit: "kg",
      date: getCurrentDate(),
      notes: "",
    },
  });

  // Scroll to form when opened
  useEffect(() => {
    if (isOpen && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Sync unit with react-hook-form value on change
  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUnit(e.target.value as "kg" | "lb");
    setValue("unit", e.target.value as "kg" | "lb");
  };

  return (
    <div
      ref={formRef}
      className="w-full max-w-md mx-auto bg-white border border-purple-200 rounded-2xl shadow-xl p-6 transition-all"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          {/* Title */}
          <h2 className="flex flex-row gap-2 justify-center text-center text-lg font-semibold text-purple-600">
            <Scale />
            Log Weight for {name}
          </h2>

          {/* Weight Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="weight" className="text-sm font-medium text-gray-700">
              New Weight <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2 items-center">
              <input
                id="weight"
                type="number"
                step="any"
                {...register("weight", { valueAsNumber: true })}
                className={`flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.weight ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"
                }`}
                placeholder="Enter weight"
              />
              <select
                {...register("unit")}
                value={unit}
                onChange={handleUnitChange}
                className={`px-3 py-2 border rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 ${
                  errors.unit ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"
                }`}
              >
                <option value="kg">kg</option>
                <option value="lb">lb</option>
              </select>
            </div>
            {errors.weight && (
              <p className="text-red-500 text-xs mt-1">{errors.weight.message}</p>
            )}
            {errors.unit && (
              <p className="text-red-500 text-xs mt-1">{errors.unit.message}</p>
            )}
          </div>

          {/* Date Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="date" className="text-sm font-medium text-gray-700">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              id="date"
              type="date"
              {...register("date")}
              className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.date ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
            )}
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-2">
            <label htmlFor="notes" className="text-sm font-medium text-gray-700">
              Notes (optional)
            </label>
            <textarea
              id="notes"
              rows={3}
              {...register("notes")}
              className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.notes ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"
              }`}
              placeholder="Add any notes or observations"
            ></textarea>
            {errors.notes && (
              <p className="text-red-500 text-xs mt-1">{errors.notes.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-2 pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white font-medium rounded-md shadow hover:bg-purple-600 transition-colors"
            >
              <Save size={18} />
              Save Weight
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-purple-500 border border-purple-300 font-medium rounded-md hover:bg-purple-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function getCurrentDate(): Date | undefined {
  const today = new Date();
  return isNaN(today.getTime()) ? undefined : today;
  
}

