import { z } from "zod";

export const weightLogSchema = z.object({

  petId: z.uuid("Invalid pet ID format"),

  weight: z
    .number()
    .positive("Weight must be a positive number")
    .max(1000, "Weight must not exceed 1000 kg"),

  unit: z.enum(["kg", "lb"], {
    message: "Invalid unit. Use 'kg' or 'lb'."
  }),

date: z.coerce.date().refine(
  (date) => !isNaN(date.getTime()),
  { message: "Invalid date format" }
).refine(
  (date) => date <= new Date(),
  { message: "Date cannot be in the future" }
),


  notes: z
    .string()
    .max(200, "Notes should not exceed 200 characters")
    .trim()
    .optional()
    .transform((val) => (val === "" ? undefined : val))
    .nullable()
    .default(null),
});

export type WeightLogInput = z.infer<typeof weightLogSchema>;
export type WeightLog = WeightLogInput & {
  id: string; // Unique ID for each weight log
  createdAt: Date; // When the log was created
  updatedAt?: Date; // Optional: when the log was last updated
};
