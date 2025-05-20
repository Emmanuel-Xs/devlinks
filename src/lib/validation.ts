import { z } from "zod";

const email = z.string().trim().min(2, "min char is 2").email().toLowerCase();

const password = z
  .string()
  .trim()
  .min(8, "min char is 8")
  .max(255, "max char is 255");

export const signupSchema = z
  .object({
    email,
    password,
    confirmPassword: password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email,
  password,
});

export const verifyEmailSchema = z.object({
  code: z.string().min(8, "Your OTP must be 8 chars."),
});

export const verifyPasswordResetEmailSchema = z.object({
  code: z.string().min(8, "Your OTP must be 8 chars."),
});

export const passwordForgetSchema = z.object({
  email,
});

export const passwordResetSchema = z
  .object({
    password,
    confirmPassword: password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const profileSchema = z.object({
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  email: z.string().email(),
  croppedAvatar: z.instanceof(File).nullable(),
});

export const usernameSchema = z.object({
  usernames: z
    .array(
      z.object({
        username: z.string().min(1, "can't be empty"),
      })
    )
    .max(4, "usernames cannot be more than four")
    .refine((data) => data[0]?.username.trim() !== "", {
      message: "Default username is required",
      path: ["usernames", 0, "username"],
    }),
});

export const changePasswordSchema = z
  .object({
    oldPassword: password,
    newPassword: password,
    confirmPassword: password,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
