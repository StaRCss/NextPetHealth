"use client"; // Ensures the code runs on the client-side for Next.js

import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs, { Dayjs } from "dayjs";

// Define props interface for the component
interface BirthdayInputFieldProps {
  value: Date | null; // Current value of the date
  onChange: (date: Date | null) => void; // Function to update the date
}

const BirthdayInputField: React.FC<BirthdayInputFieldProps> = ({ value, onChange }) => {
  // Handles the date change and passes the updated date back to the parent component
  const handleDateChange = (date: Dayjs | null) => {
    onChange(date ? date.toDate() : null);
  };

  return (
    <div className="flex flex-col items-center w-1/2 mt-4 mb-4 select-none">
      {/* Custom Label - Styled Like Other Fields */}
      <label htmlFor="pet-birthday" className="block text-sm font-medium text-gray-700 mb-2">
        Pet Birthday
      </label>

      {/* LocalizationProvider ensures proper date formatting for different locales */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
          // Set the value of the date picker, converting from Date to Dayjs for internal state
          value={value ? dayjs(value) : null}
          // Handle the date change
          onChange={handleDateChange}
          // Set default value for the picker (can be removed if not needed)
          defaultValue={dayjs("2025-02-02")}
          
          // Customize the styling of the TextField inside MobileDatePicker
          slotProps={{
            textField: {
              sx: {
                width: "100%", // Full width
                height: "42px", // Fixed height for uniformity
                minHeight: "42px", // Prevent resizing issues
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px", // Rounded corners
                  border: "1px solid #d1d5db", // Tailwind gray-300 for border color
                  backgroundColor: "white", // Ensures no unwanted background color
                  overflow: "hidden", // Prevents border clipping
                  transition: "none", // Stops unwanted animations during state changes
                  "&:hover": {
                    borderColor: "#d1d5db", // Border color on hover remains consistent
                  },
                  "&.Mui-focused": {
                    borderColor: "#3b82f6", // Tailwind blue-500 for focused border color
                    boxShadow: "none", // Removes default focus glow
                  },
                },
                // Remove the default MUI outline (notched outline) to improve aesthetics
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              },
            },
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default BirthdayInputField;
