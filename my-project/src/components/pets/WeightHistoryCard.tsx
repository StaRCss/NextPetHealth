"use client";

import { useState } from "react";
import { Calendar, SquarePen, Trash2 } from "lucide-react";

type WeightHistoryCardProps = {
  logId: string;
  date: Date;
  weight: number;
  unit: string;
  notes?: string | null;
};

export default function WeightHistoryCard({
  logId,
  date,
  weight,
  unit,
  notes,
}: WeightHistoryCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Current displayed values
  const [currentWeight, setCurrentWeight] = useState(weight);
  const [currentNotes, setCurrentNotes] = useState(notes || "");

  // Temporary edit values
  const [editWeight, setEditWeight] = useState(weight);
  const [editNotes, setEditNotes] = useState(notes || "");

  const handleSave = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(`/api/weight-log/${logId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weight: editWeight, notes: editNotes, logId }),
      });

      if (!res.ok) {
        throw new Error("Failed to update weight log");
      }

      // Optimistic update
      setCurrentWeight(editWeight);
      setCurrentNotes(editNotes);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong while saving.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditWeight(currentWeight);
    setEditNotes(currentNotes);
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

          <div className="text-xl font-bold text-purple-500">
            {currentWeight} {unit}
          </div>
          <p className="px-4 py-1 bg-purple-100 text-md text-gray-500 italic min-h-[1.5rem] break-words whitespace-normal">
            {currentNotes || "\u00A0"}
          </p>
        </>
      ) : (
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
              value={editWeight}
              onChange={(e) => setEditWeight(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 mt-1"
              disabled={isLoading}
            />
          </label>

          <label className="flex flex-col text-sm">
            Notes:
            <textarea
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 mt-1"
              disabled={isLoading}
            />
          </label>

          <div className="flex gap-2">
            <button
              className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
            <button
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
