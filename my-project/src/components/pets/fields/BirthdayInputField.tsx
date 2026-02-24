"use client";

import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { format } from "date-fns";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";

import { PetFormValues } from "../AddPetForm";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const BirthdayInputField: React.FC = () => {
  const { control, formState, watch } = useFormContext<PetFormValues>();
  const { errors, touchedFields, dirtyFields } = formState;

  const birthday = watch("birthday");
  const defaultBirthday = dayjs().format("YYYY-MM-DD");

  const hasError = !!errors.birthday;
  const hasTouched = touchedFields.birthday || dirtyFields.birthday;
  const isValidValue = birthday && birthday !== defaultBirthday;

  const borderColor = hasError
    ? "border-red-500"
    : hasTouched && isValidValue
    ? "border-green-500"
    : "border-gray-300";

  return (
    <div className="flex flex-col items-center w-[80%] md:w-[70%] lg:w-[60%] mt-4 mb-4 select-none">
      <label
        htmlFor="birthday"
        className="block text-sm font-medium text-center text-text-light dark:text-text-dark mb-2"
      >
        Pet Birthday
      </label>

      <Controller
        name="birthday"
        control={control}
        defaultValue={defaultBirthday}
        render={({ field }) => {
          const selectedDate = field.value
            ? dayjs(field.value).toDate()
            : undefined;

          return (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="birthday"
                  variant="outline"
                  role="textbox"
                  aria-invalid={hasError}
                  aria-describedby={hasError ? "birthday-error" : undefined}
                  className={cn(
                    "w-full justify-start text-left font-normal h-[42px] rounded-xl border-2 dark:bg-zinc-800 text-white",
                    borderColor,
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    format(selectedDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    const formatted = date
                      ? dayjs(date).format("YYYY-MM-DD")
                      : "";
                    field.onChange(formatted);
                  }}
                  disabled={(date) => date > new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          );
        }}
      />

      {hasError && (
        <p
          id="birthday-error"
          role="alert"
          className="mt-2 text-sm text-red-600"
          aria-live="assertive"
        >
          {errors.birthday?.message}
        </p>
      )}
    </div>
  );
};

export default BirthdayInputField;
