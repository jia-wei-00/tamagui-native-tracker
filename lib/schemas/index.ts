import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().nonempty({ message: "Email is required" }).email({ message: "Invalid email address" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one symbol" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export const createPostSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;