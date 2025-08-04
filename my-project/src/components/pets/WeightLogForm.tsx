'use client';

import { Save, Scale } from "lucide-react";
import React, { useEffect, useRef, useState } from 'react';

type WeightLogFormProps = {
  weight: number | null;
  isOpen: boolean;
  onClose: () => void;
  name: string;
};

export default function WeightLogForm({
  weight,
  isOpen,
  onClose,
  name,
}: WeightLogFormProps) {
  const [unit, setUnit] = useState<'kg' | 'lb'>('kg');
  const formRef = useRef<HTMLDivElement | null>(null);

  // Scroll to form when opened
  useEffect(() => {
    if (isOpen && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={formRef}
      className="w-full max-w-md mx-auto bg-white border border-purple-200 rounded-2xl shadow-xl p-6 transition-all"
    >
      <form>
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
                defaultValue={weight ?? ''}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter weight"
              />
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as 'kg' | 'lb')}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="kg">kg</option>
                <option value="lb">lb</option>
              </select>
            </div>
          </div>

          {/* Date Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="date" className="text-sm font-medium text-gray-700">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              id="date"
              type="date"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-2">
            <label htmlFor="notes" className="text-sm font-medium text-gray-700">
              Notes (optional)
            </label>
            <textarea
              id="notes"
              rows={3}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Add any notes or observations"
            ></textarea>
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
