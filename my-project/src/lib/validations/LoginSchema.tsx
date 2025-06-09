import zod from "zod";

export const loginSchema = zod.object({
  email: zod .string()
    .email("Invalid email address")
    .min(1, "Email is required")
    .max(50, "Email should not exceed 50 characters")
    .trim(),
  password: zod .string()
    .min(8, "Password should be at least 8 characters long")
    .max(50, "Password should not exceed 50 characters")
    .trim()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Password must include uppercase, lowercase, number, and special character"
    ), 
});