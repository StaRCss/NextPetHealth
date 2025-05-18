import { z } from "zod";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore);


interface PetFormSchema {
  petType: string;
  name: string;
  breed?: string | null;
  gender?: string | null;
  birthday?: string;
  imageFile?: File | null ;
}

export const petFormSchema: z.ZodObject<z.ZodRawShape, "strip", z.ZodTypeAny, PetFormSchema> = z.object({
  petType: z.string().min(1, "Pet Type is required"),
  name: z
    .string()
    .min(2, "Name should be at least 2 characters long")
    .max(30, "Name should not exceed 50 characters")
    .trim()
    .regex(/^[A-Za-z\s]+$/, "Name should only contain letters and spaces"),

 breed: z
  .string()
  .optional()
  .refine(
    (val) => {
      if (!val || val.trim() === "") return true; // allow empty or undefined
      const trimmed = val.trim();
      return trimmed.length >= 2 && trimmed.length <= 40;
    },
    {
      message: "Breed must be between 2 and 40 characters if provided",
    }
  )
  .transform((val) => val?.trim() || null)
  .refine(
    (val) => !val || /^[A-Za-z\s]*$/.test(val),
    "Breed should only contain letters and spaces"
  ),

gender: z
  .string()
  .optional()
  .transform((val) => val?.trim() || null) // convert empty or spaces to null
  .refine(
    (val) => !val || ['male', 'female'].includes(val),
    { message: "Gender must be 'male' or 'female' if provided" }
  ),

  
  
  birthday: z
    .string()
    .optional()
    .refine(
      (val) => !val || dayjs(val).isSameOrBefore(dayjs(), 'day'),
      "Birthday can't be in the future"
    ),
  imageFile: z
     .any()
     .nullable()
    .refine((file) => !file || file instanceof File, "Invalid file type")
    .refine(
      (file) => !file || file.size > 0,
      "Image file is required"
    )
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      "Max image size is 5MB"
    )
    .refine(
      (file) => !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Invalid file type"
    )
    .optional(),
});
