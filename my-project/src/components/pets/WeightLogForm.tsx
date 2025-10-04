'use client';

import React, { useEffect, useRef, useState } from "react";
import { Save, Scale } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { weightLogSchema } from "@/lib/validations/WeightLogSchema";

// ✅ Form raw input type (date as string)
type WeightLogFormValues = z.input<typeof weightLogSchema>;
// ✅ Parsed output type (date as Date)
type WeightLogParsed = z.infer<typeof weightLogSchema>;

type WeightLogFormProps = {
  id: string;                       // Pet ID
  weight: number | null;            // last known weight
  isOpen: boolean;
  onClose: () => void;
  name: string;
  onSubmit: (data: WeightLogParsed) => Promise<void>;
};

export default function WeightLogForm({
  id,
  weight,
  isOpen,
  onClose,
  name,
  onSubmit,
}: WeightLogFormProps) {

  const [unit] = useState<"kg" | "lb">("kg");
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement | null>(null);

  // ✅ use input type for form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WeightLogFormValues>({
    resolver: zodResolver(weightLogSchema),
    defaultValues: {
      petId: id,
      weight: weight ?? undefined,
      unit: unit,
      // default value must be a string for <input type="date">
      date: new Date().toISOString().slice(0, 10),
      notes: "",
    },
  });

  useEffect(() => {
    if (isOpen && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={formRef}
      className="w-full max-w-md mx-auto bg-white dark:bg-zinc-900 border border-purple-200 rounded-2xl shadow-xl p-6 transition-all"
    >
      <form
        onSubmit={handleSubmit(async (data) => {
          // ✅ data.date is already a Date thanks to zodResolver
          if (submitting) return;
          setSubmitting(true);
          try {
            await onSubmit(data as WeightLogParsed);
            reset(); // clear the form after submit
          } finally {
            setSubmitting(false);
          }
        })}
      >
        <div className="flex flex-col gap-6">
          {/* Title */}
          <h2 className="flex flex-row gap-2 justify-center text-center text-lg font-semibold text-purple-600 dark:text-purple-300">
            <Scale />
            Log Weight for {name}
          </h2>

          {/* Weight Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="weight" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              New Weight <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4 items-center">
              <input
                id="weight"
                type="number"
                step="any"
                {...register("weight", { valueAsNumber: true })}
                className={`flex-1 dark:bg-zinc-700 dark:text-text-dark px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.weight
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-purple-500 dark:border-gray-600"
                }`}
                placeholder="Enter weight"
              />
              <input
                {...register("unit")}
                value={unit}
                readOnly
                className="px-0 py-0 bg-transparent border-none text-gray-700 dark:text-gray-300 pointer-events-none select-none w-auto"
              />
            </div>
            {errors.weight && (
              <p className="text-red-500 text-xs mt-1">{errors.weight.message}</p>
            )}
          </div>

          {/* Date Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="date" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              id="date"
              type="date"
              {...register("date")}
              className={`px-4 py-2 dark:bg-zinc-700 dark:text-text-dark border rounded-md focus:outline-none focus:ring-2 ${
                errors.date
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-purple-500 dark:border-gray-600"
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
            )}
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-2">
            <label htmlFor="notes" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Notes (optional)
            </label>
            <textarea
              id="notes"
              rows={3}
              {...register("notes")}
              className={`px-4 py-2 border dark:bg-zinc-700 dark:text-text-dark rounded-md focus:outline-none focus:ring-2 ${
                errors.notes
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-purple-500 dark:border-gray-600"
              }`}
              placeholder="Add any notes or observations"
            />
            {errors.notes && (
              <p className="text-red-500 text-xs mt-1">{errors.notes.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-2 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className={`flex items-center gap-2 px-4 py-2 font-medium rounded-md shadow transition-colors ${
                submitting
                  ? "bg-purple-300 cursor-not-allowed text-white"
                  : "bg-purple-500 hover:bg-purple-600 text-white"
              }`}
            >
              <Save size={18} />
              {submitting ? "Saving..." : "Save Weight"}
            </button>
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              
              disabled={submitting}
              className="px-4 py-2 text-purple-500 dark:text-purple-300 border border-purple-300 font-medium rounded-md hover:bg-purple-50 dark:hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
