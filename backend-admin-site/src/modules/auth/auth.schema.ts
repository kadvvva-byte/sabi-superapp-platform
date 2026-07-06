import { z } from "zod";

function normalizePhone(value: string): string {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  const hasPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");

  return hasPlus ? `+${digits}` : digits;
}

export const registerUserSchema = z.object({
  email: z.string().email().transform((value) => value.trim().toLowerCase()),
  password: z.string().min(8).max(128),
  displayName: z.string().trim().min(1).max(100).optional(),
  username: z.string().trim().min(3).max(30).optional(),
});

export const loginUserSchema = z.object({
  email: z.string().email().transform((value) => value.trim().toLowerCase()),
  password: z.string().min(8).max(128),
});

export const requestOtpSchema = z.object({
  phone: z
    .string()
    .transform((value) => normalizePhone(value))
    .refine((value) => value.length >= 7, "A valid phone number is required."),
});

export const verifyOtpSchema = z.object({
  phone: z
    .string()
    .transform((value) => normalizePhone(value))
    .refine((value) => value.length >= 7, "A valid phone number is required."),
  code: z
    .string()
    .transform((value) => value.trim().replace(/\D/g, ""))
    .refine((value) => /^\d{6}$/.test(value), "A valid 6-digit code is required."),
});


export const firebaseIdTokenVerifySchema = z.object({
  idToken: z
    .string()
    .trim()
    .min(20, "Firebase ID token is required."),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type RequestOtpInput = z.infer<typeof requestOtpSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
export type FirebaseIdTokenVerifyInput = z.infer<typeof firebaseIdTokenVerifySchema>;