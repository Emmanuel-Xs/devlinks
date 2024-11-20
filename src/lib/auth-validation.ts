import { z } from "zod";

const email = z.string().trim().min(2, "min char is 2").email();

const password = z.string().trim().min(8, "min char is 8");

const signupSchema = z
  .object({
    email,
    password,
    confirmPassword: password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const loginSchema = z.object({
  email,
  password,
});

export { signupSchema, loginSchema };
