// petFormSchema.ts
import { z } from "zod";

export const petFormSchema = z.object({
  petType: z.string().min(1, "Pet Type is required"),
  name: z.string().min(2, "Name should be at least 2 characters long"),
  breed: z.string().min(1, "Breed is required"),
    gender: z.string().nonempty("Gender is required"),
  birthday: z.string().nullable(),
  image: z.instanceof(File).optional(),
});