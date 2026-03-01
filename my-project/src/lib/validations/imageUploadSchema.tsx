import { z } from "zod";

// ✅ petId validation: must be a UUID and no <script> tags
export const petIdSchema = z.string()
  z.uuid({ message: "Invalid pet ID format" })
  .refine((id) => !/<script>/i.test(id), {
    message: "Pet ID contains forbidden characters",
  });

// ✅ Full schema for image upload
export const imageUploadSchema = z.object({
  petId: petIdSchema,
  image: z
    .instanceof(File)
    .refine((file) => file.type.startsWith("image/"), {
      message: "Only image files are allowed",
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Image must be less than 5MB",
    }),
});

export type ImageUploadSchemaType = z.infer<typeof imageUploadSchema>;
