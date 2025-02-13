import { z } from "zod";

// Zod validator for password
export const passwordSchema = z
  .string()
  .trim()
  .min(8, "Password should have at least 8 characters")
  .max(60, "Password should not be longer than 60 characters")
  .refine(
    (val) => /[a-z]/.test(val ?? ""),
    "Password should include lowercase letters"
  )
  .refine(
    (val) => /[A-Z]/.test(val ?? ""),
    "Password should include uppercase letters"
  )
  .refine((val) => /[0-9]/.test(val ?? ""), "Password should include numbers");

// Zod validator for username
export const userNameSchema = z
  .string()
  .trim()
  .min(3, "Minimum length of 3")
  .max(30, "Maximum length of 30");

// Zod validator for email
export const emailSchema = z.string().trim().email().min(1, {
  message: "Email is required",
});
