'use client';
import React from "react";
import { ScanHeart, Scale } from "lucide-react";
import { useState } from "react";
import WeightLogForm from "./WeightLogForm";

type HealthProps = {
  weight: number | null;
  name: string; // Optional name for the pet, if needed
};

export default function Health  ({weight, name} : HealthProps ) {

    const [isWeightLogOpen, setIsWeightLogOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 w-full bg-white border border-purple-200 rounded-2xl shadow-md p-4 md:p-6 transition-shadow hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-purple-600">
          <div className="w-9 h-9 rounded-full bg-yellow-100 flex items-center justify-center">
            <ScanHeart className="w-5 h-5" />
          </div>
          <h2 className="text-lg md:text-2xl font-semibold text-purple-700">Health Overview</h2>
        </div>

        <button 
        onClick={() => setIsWeightLogOpen(true)}
        className="flex items-center gap-2 text-xs font-medium text-purple-600 border border-purple-300 px-3 py-1.5 rounded-md bg-white hover:bg-purple-50 transition-colors shadow-sm">
          <Scale className="w-4 h-4" />
          Log Weight
        </button>
      </div>

      {/* Content */}
      <div className="px-1 py-2">
        {weight != null ? (
          <div className="flex flex-col items-start gap-2 text-green-600 font-semibold bg-green-50 px-4 py-2 rounded-lg w-fit shadow-sm">
             <span className="font-medium text-lg text-purple-500">Current Weight</span>
             {weight} kg ⚖️ 
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">
              No weight data yet. Let’s keep track to stay healthy! 🐕
          </p>
        )}
      </div>
        {/* Actions */}
        <WeightLogForm
          weight={weight ?? null}
          isOpen={isWeightLogOpen}
          onClose={() => setIsWeightLogOpen(false)}
          name={name}
        />
    </div>
  );
};

