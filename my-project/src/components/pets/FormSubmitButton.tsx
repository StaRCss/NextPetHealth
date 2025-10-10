"use client";

import { Loader2, Save } from "lucide-react";
import React from "react";

type FormSubmitButtonProps = {
  label?: string;
  submitting?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function FormSubmitButton({
  label = "Save",
  submitting = false,
  disabled = false,
  icon = <Save size={18} />,
  className = "",
    onClick,
}: FormSubmitButtonProps) {
  return (
    <button
        onClick={onClick}
      type="submit"
      disabled={submitting || disabled}
      className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-md font-semibold text-sm transition-all duration-300 shadow-md
        text-white dark:text-[#6e3465]
        bg-gradient-to-r from-purple-500 to-indigo-500
        hover:from-indigo-500 hover:to-purple-500
        disabled:cursor-not-allowed disabled:opacity-70
        dark:bg-gradient-to-r dark:from-[#fc67fa] dark:to-[#f4c4f3]
        dark:hover:from-[#54e65b] dark:hover:to-[#07ebb2]
        focus:outline-none focus:ring-2 focus:ring-purple-300 dark:focus:ring-[#fc67fa]
        ${className}`}
    >
      {submitting ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          <span>Saving...</span>
        </>
      ) : (
        <>
          {icon}
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
