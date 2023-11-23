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
