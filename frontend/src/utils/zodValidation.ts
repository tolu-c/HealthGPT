import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .email("Must be a valid email")
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be 6 characters long" }),
});

export const questionSchema = z.object({
  prompt: z.string().min(1, { message: "Prompt can not be empty" }),
});

export const emailSchema = z.object({
  email: z
    .string()
    .email("Email must be valid")
    .min(1, { message: "Email is required" }),
});

export const otpSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be 6 values" }),
});

export const changePasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
