import { z } from "zod";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore);

interface PetFormFields {
  name: string;
  breed?: string | null;
  gender?: string | null;
  birthday: string;
  role: "add" | "edit";
}

export const petFormSchema = z.object({

  name: z
    .string()
    .min(2, "Name should be at least 2 characters long")
    .max(30, "Name should not exceed 30 characters")  // corrected max to 30 (was 50 in message)
    .trim()
    .regex(/^[A-Za-z\s]+$/, "Name should only contain letters and spaces"),

  breed: z
    .string()
    .optional()
    .nullable()
    .refine(
      (val) => !val || (val.length >= 2 && val.length <= 40),
      { error: "Breed must be between 2 and 40 characters if provided" }
    )
    .transform((val) => val?.trim() || null)
    .refine(
      (val) => !val || /^[A-Za-z\s]*$/.test(val),
      { error: "Breed should only contain letters and spaces" }
    ),

  gender: z
    .string()
    .nullable()
    .optional()
    .transform((val) => val?.trim() || null) // convert empty or spaces to null
    .refine(
      (val) => !val || ['male', 'female'].includes(val),
      { error: "Gender must be 'male' or 'female' if provided" }
    ),

  birthday: z
    .string()
    .min(1, "Birthday must be provided")
    .refine(
      (val) => dayjs(val).isSameOrBefore(dayjs(), 'day'),
      { error: "Birthday can't be in the future" }
    ),

  role: z.enum(["add", "edit"]),

});

export type PetFormSchema = z.infer<typeof petFormSchema>;
