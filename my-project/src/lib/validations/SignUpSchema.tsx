import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .max(50, { message: "Name should not exceed 50 characters" })
      .trim(),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .max(50, { message: "Email should not exceed 50 characters" })
      .email({ message: "Invalid email address" })
      .trim(),
    password: z
      .string()
      .min(8, { message: "Password should be at least 8 characters" })
      .max(50, { message: "Password should not exceed 50 characters" })
      .trim(),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm Password should be at least 8 characters" })
      .max(50, { message: "Confirm Password should not exceed 50 characters" })
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });