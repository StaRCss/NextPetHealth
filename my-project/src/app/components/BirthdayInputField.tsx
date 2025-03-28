"use client";

import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { PetFormValues } from "../Pets/Add/page"; // Adjust path if needed

const BirthdayInputField: React.FC = () => {
  const { control } = useFormContext<PetFormValues>();

  if (!control) return null; // Prevents crashes if useFormContext isn't available

  return (
    <div className="flex flex-col items-center w-1/2 mt-4 mb-4 select-none">
      {/* ✅ Fix: Ensure label has a matching "htmlFor" */}
      <label htmlFor="pet-birthday" className="block text-sm font-medium text-gray-700 mb-2">
        Pet Birthday
      </label>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name="birthday"
          control={control}
          render={({ field: { value, onChange } }) => (
            <MobileDatePicker
              value={value ? dayjs(value) : null}
              onChange={(date: Dayjs | null) => onChange(date ? date.toDate() : null)}
              slotProps={{
                textField: {
                  id: "pet-birthday",
                  sx: {
                    width: "100%",
                    height: "42px",
                    minHeight: "42px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "16px",
                      border: "1px solid #d1d5db",
                      backgroundColor: "white",
                      overflow: "hidden",
                      transition: "none",
                      "&:hover": { borderColor: "#d1d5db" },
                      "&.Mui-focused": { borderColor: "#3b82f6", boxShadow: "none" },
                    },
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  },
                },
              }}
            />
          )}
        />
      </LocalizationProvider>
    </div>
  );
};

export default BirthdayInputField;
