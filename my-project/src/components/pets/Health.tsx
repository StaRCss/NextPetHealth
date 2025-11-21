"use client";

import React, { useState } from "react";
import { CirclePlus, ScanHeart } from "lucide-react";
import WeightLogForm from "./WeightLogForm";

// Type for a weight log
type WeightLog = {
  weight: number;
  unit: "kg" | "lb";
  date: Date;
};

type HealthProps = {
  id: string;
  name: string;
  weightLogs?: WeightLog[];
};

export default function Health({ id, name, weightLogs = [] }: HealthProps) {
  const [isWeightLogOpen, setIsWeightLogOpen] = useState(false);

  // Compute latest weight dynamically
  const latestLog = [...weightLogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];

  // Function to submit new weight log
  async function handleWeightLogSubmit(newLog: { weight: number; unit: "kg" | "lb"; date: Date }) {
    try {
      const res = await fetch("/api/weight-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLog),
      });
      if (!res.ok) {
        console.error("Failed to create weight log");
        return;
      }
      const createdLog = await res.json();
      console.log("Created log:", createdLog);

      // Close form modal
      setIsWeightLogOpen(false);

      // Optional: trigger re-fetch or state update if using SWR later
    } catch (err) {
      console.error("Error creating weight log:", err);
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full bg-cardBg-light dark:bg-cardBg-dark p-4 rounded-2xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 text-purple-600">
          <div className="w-9 h-9 rounded-full bg-yellow-100 flex items-center justify-center">
            <ScanHeart className="w-5 h-5" />
          </div>
          <h2 className="text-lg md:text-2xl font-semibold text-purple-700 dark:text-[#f4c4f3]">
            Health Overview
          </h2>
        </div>
        <button onClick={() => setIsWeightLogOpen(true)}
          className="btn-circle">
          <CirclePlus className="w-5 h-5" />
        </button>
      </div>

      {/* Current Weight */}
      <div className="flex justify-center py-2">
        {latestLog ? (
          <div className="text-green-600 font-semibold">
            Current Weight: {latestLog.weight} {latestLog.unit} ⚖️
          </div>
        ) : (
          <p className="text-gray-500 dark:text-text-dark italic">
            No weight data yet. Let’s keep track to stay healthy! 🐕
          </p>
        )}
      </div>

      {/* Weight Log Form */}
      <WeightLogForm
        id={id}
        name={name}
        isOpen={isWeightLogOpen}
        onClose={() => setIsWeightLogOpen(false)}
        onSubmit={handleWeightLogSubmit}
        weight={latestLog?.weight ?? null}
      />
    </div>
  );
}
