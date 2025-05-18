import { z } from "zod";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore);


interface PetFormSchema {
  petType: string;
  name: string;
  breed: string;
  gender: string;
  birthday?: string;
  imageFile?: File | null;
}

export const petFormSchema: z.ZodObject<z.ZodRawShape, "strip", z.ZodTypeAny, PetFormSchema> = z.object({
  petType: z.string().min(1, "Pet Type is required"),
  name: z
    .string()
    .min(2, "Name should be at least 2 characters long")
    .regex(/^[A-Za-z\s]+$/, "Name should only contain letters and spaces"),
  breed: z.string().min(1, "Breed is required"),
  gender: z.string().nonempty("Gender is required"),
  birthday: z
    .string()
    .optional()
    .refine(
      (val) => !val || dayjs(val).isSameOrBefore(dayjs(), 'day'),
      "Birthday can't be in the future"
    ),
  imageFile: z
    .any()
    .refine(
      (file) => !file || file instanceof File,
      "Invalid file" // allow empty / no file initially
    )
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
