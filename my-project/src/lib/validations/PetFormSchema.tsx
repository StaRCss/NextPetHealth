import { z } from "zod";

export const petFormSchema = z.object({
  petType: z.string().min(1, "Pet Type is required"),
  name: z
    .string()
    .min(2, "Name should be at least 2 characters long")
    .regex(/^[A-Za-z\s]+$/, "Name should only contain letters and spaces"),
  breed: z.string().min(1, "Breed is required"),
  gender: z.string().nonempty("Gender is required"),
  birthday: z.string().nullable(),
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
