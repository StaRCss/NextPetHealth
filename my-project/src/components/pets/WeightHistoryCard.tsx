"use client";

import React, { useState } from "react";
import { Calendar, SquarePen, Trash2 } from "lucide-react";

type WeightHistoryCardProps = {
  date: Date;
  weight: number;
  unit: string;
  notes?: string | null;
};

export default function WeightHistoryCard({ date, weight, unit, notes }: WeightHistoryCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newWeight, setNewWeight] = useState(weight);
  const [newNotes, setNewNotes] = useState(notes || "");

  const handleSave = () => {
    // Here you would call an API to save changes
    console.log("Saving", { newWeight, newNotes });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewWeight(weight);
    setNewNotes(notes || "");
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-2 w-full bg-white border border-purple-200 rounded-2xl shadow-md p-4 md:p-6 transition-shadow hover:shadow-lg">
      {!isEditing ? (
        <>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span className="font-semibold">
                {new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }).format(new Date(date))}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="text-purple-600 hover:underline"
                onClick={() => setIsEditing(true)}
              >
                <SquarePen size={20} />
              </button>
              <button className="text-red-600 hover:underline">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
                     <div className="text-xl font-bold text-purple-500">{weight} {unit}</div>

          <p className="px-4 py-1 bg-purple-100 text-md text-gray-500 italic min-h-[1.5rem] break-words whitespace-normal">
            {notes || "\u00A0"}
          </p>

        </>
      ) : (
        <>
          {/* Edit form */}
          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-2 text-sm text-gray-500 font-semibold">
             <Calendar size={14} />
              {new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }).format(new Date(date))}
            </span>
            <label className="flex flex-col text-sm">
              Weight ({unit}):
              <input
                type="number"
                value={newWeight}
                onChange={(e) => setNewWeight(Number(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 mt-1"
              />
            </label>

            <label className="flex flex-col text-sm">
              Notes:
              <textarea
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 mt-1"
              />
            </label>

            <div className="flex gap-2">
              <button
                className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
