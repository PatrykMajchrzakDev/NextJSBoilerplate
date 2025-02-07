import { passwordSchema } from "@/common/validation/auth";
import { z } from "zod";

// Zod LOGIN form validation schema
export const loginFormSchema = z.object({
  email: z.string().trim().email().min(1, {
    message: "Email is required",
  }),
  password: passwordSchema,
});

// Zod REGISTER form validation schema
export const registerFormSchema = z
  .object({
    name: z.string().trim().min(3, {
      message: "Name is required with minimum length of 3",
    }),
    email: z.string().trim().email().min(1, {
      message: "Email is required",
    }),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });
