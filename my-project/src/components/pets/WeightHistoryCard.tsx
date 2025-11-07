"use client";

import { useState } from "react";
import { Calendar, SquarePen, Trash2, CheckCircle } from "lucide-react";
import FormSubmitButton from "./FormSubmitButton";
import dayjs from "dayjs";

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
  const [isDeleting, setIsDeleting] = useState(false);

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
 
    const formattedDate = dayjs(date).format("MMM DD, YYYY h:mm A");


  return (
    <div className="flex flex-col gap-2 w-full bg-cardBg-light dark:bg-cardBg-dark border border-purple-200 rounded-2xl shadow-md p-4 md:p-6 transition-shadow hover:shadow-lg">
      {!isEditing ? (
        <>
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-stone-300">
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span className="font-semibold">
                {formattedDate}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="text-violet-500 dark:text-violet-300 hover:underline"
                onClick={() => setIsEditing(true)}
              >
                <SquarePen size={25} />
              </button>
              <button 
              className="text-red-600 dark:text-rose-600 text-lg hover:underline"
              onClick= {() => setIsDeleting(true)}
              >
                <Trash2 size={25} />
              </button>
            </div>
          </div>

          <div className="text-xl font-bold text-purple-500 dark:text-purple-300">
            {currentWeight} {unit}
          </div>
          <p className="px-4 py-1 bg-cardBg-light dark:bg-zinc-900 text-md text-gray-500 dark:text-text-dark italic min-h-[1.5rem] break-words whitespace-normal">
            {currentNotes || "\u00A0"}
          </p>
        </>
      ) : (
        <div className="flex flex-col gap-2">
          <span className="flex items-center gap-2 text-sm text-gray-500 dark:text-text-dark font-semibold">
            <Calendar size={14} />
            {new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }).format(new Date(date))}
          </span>

          <label className="flex flex-col text-sm dark:text-text-dark">
            Weight ({unit}):
            <input
              type="number"
              value={editWeight}
              onChange={(e) => setEditWeight(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 mt-1 dark:bg-cardBg-dark"
              disabled={isLoading}
            />
          </label>

          <label className="flex flex-col text-sm dark:text-text-dark">
            Notes:
            <textarea
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 mt-1 dark:bg-cardBg-dark"
              disabled={isLoading}
            />
          </label>

          <div className="flex gap-2">
            <FormSubmitButton
              submitting={isLoading}
              label="Save"
              icon={<CheckCircle size={16} />}
              onClick={handleSave}
            />
            <button
              className="px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400 disabled:opacity-50"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {isDeleting && (
        <div className="flex flex-col gap-4">
          <p className="text-red-600 font-semibold">Are you sure you want to delete this weight log?</p>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50" 
              onClick={async () => {
                setIsLoading(true);
                try {
                  const res = await fetch(`/api/weight-log/${logId}`, {
                    method: "DELETE",
                  });

                  if (!res.ok) {
                    throw new Error("Failed to delete weight log");
                  } else {
                    // Optionally, you can add a callback to remove the card from the UI
                    window.location.reload();
                  }   
                } catch (err) {
                  console.error(err);
                  alert("Something went wrong while deleting.");
                } finally {
                  setIsLoading(false);
                  setIsDeleting(false);
                }
              }}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </button>
            <button
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50" 
              onClick={() => setIsDeleting(false)}
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
