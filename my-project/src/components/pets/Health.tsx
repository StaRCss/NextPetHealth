'use client';
import React, { useState, useEffect } from "react";
import { ScanHeart, CirclePlus } from "lucide-react";
import WeightLogForm from "./WeightLogForm";
import { WeightLogInput } from "@/lib/validations/WeightLogSchema";


type WeightLog = {
  weight: number;
  unit: "kg" | "lb";
  date: Date; 
};

type HealthProps = {
  id: string;
  weight: number | null;
  name: string;
  unit?: string;
  weightLogs?: WeightLog[];
};


export default function Health({ weight, name, id, weightLogs }: HealthProps) {
  const [isWeightLogOpen, setIsWeightLogOpen] = useState(false);
  const [currentWeight, setCurrentWeight] = useState<number | null>(weight);
  const [latestWeightDate, setLatestWeightDate] = useState<Date | null>(null);

  // Initialize from weightLogs if provided
  useEffect(() => {
    if (weightLogs && weightLogs.length > 0) {
      const sortedLogs = [...weightLogs].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setCurrentWeight(sortedLogs[0].weight);
      setLatestWeightDate(new Date(sortedLogs[0].date));
    } else if (weight != null) {
      // Fallback if no logs but initial weight exists
      setCurrentWeight(weight);
      setLatestWeightDate(new Date());
    }
  }, [weightLogs, weight]);

  // Submit handler
  async function handleWeightLogSubmit(data: WeightLogInput) {
    try {
      const response = await fetch("/api/weight-log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error creating weight log:", errorData);
        return;
      }

      const createdLog = await response.json();
      console.log("Weight log created:", createdLog);

      // Close the form
      setIsWeightLogOpen(false);

      // Compare new date to latest
      const newLogDate = new Date(createdLog.date);
      if (!latestWeightDate || newLogDate > latestWeightDate) {
        setCurrentWeight(createdLog.weight);
        setLatestWeightDate(newLogDate);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full bg-cardBg-light dark:bg-cardBg-dark border-purple-200 rounded-2xl shadow-md p-4 md:p-6 transition-shadow hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-purple-600">
          <div className="w-9 h-9 rounded-full bg-yellow-100 flex items-center justify-center">
            <ScanHeart className="w-5 h-5" />
          </div>
          <h2 className="text-lg md:text-2xl font-semibold text-purple-700 dark:text-[#f4c4f3] ">
            Health Overview
          </h2>
        </div>

        <button
          onClick={() => setIsWeightLogOpen(true)}
          className=" btn-circle"
        >
          <CirclePlus className="w-5 h-5 " />
          
        </button>
      </div>

      {/* Content */}
      <div className="flex justify-center py-2">
        {currentWeight != null ? (
          <div className="flex flex-row text-lg items-start gap-2 text-green-600 dark:text-lime-500 font-semibold px-6 py-4 rounded-lg w-full shadow-sm">
            <span className="font-medium text-xl text-purple-500 dark:text-[#F5B7DE] ">Current Weight :</span>
            {currentWeight} kg ⚖️
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-text-dark italic">
            No weight data yet. Let’s keep track to stay healthy! 🐕
          </p>
        )}
      </div>

      {/* Weight Log Form */}
      <WeightLogForm
        id={id}
        weight={currentWeight ?? null}
        isOpen={isWeightLogOpen}
        onClose={() => setIsWeightLogOpen(false)}
        name={name}
        onSubmit={handleWeightLogSubmit}
      />
    </div>
  );
}


