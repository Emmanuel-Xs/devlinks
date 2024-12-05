import { z } from "zod";

const email = z.string().trim().min(2, "min char is 2").email();

const password = z
  .string()
  .trim()
  .min(8, "min char is 8")
  .max(255, "max char is 255");

const signupSchema = z
  .object({
    email,
    password,
    confirmPassword: password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const loginSchema = z.object({
  email,
  password,
});

const verifyEmailSchema = z.object({
  code: z.string().min(8, "Your one-time password must be 6 characters."),
});

export { signupSchema, loginSchema, verifyEmailSchema };
