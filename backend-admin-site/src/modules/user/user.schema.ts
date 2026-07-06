import { z } from "zod";

export const createUserSchema = z.object({
  userId: z.string().min(1),
  email: z.string().email().transform((value) => value.trim().toLowerCase()),
  username: z.string().trim().min(3).max(30).optional(),
  displayName: z.string().trim().min(1).max(100).optional(),
  phone: z.string().trim().min(3).max(30).optional(),
  avatarUrl: z.string().trim().url().optional(),
  bio: z.string().trim().max(300).optional(),
  isPublicProfile: z.boolean().optional(),
});

export const updateUserProfileSchema = z.object({
  username: z.string().trim().min(3).max(30).optional().nullable(),
  displayName: z.string().trim().min(1).max(100).optional(),
  phone: z.string().trim().min(3).max(30).optional().nullable(),
  avatarUrl: z.string().trim().url().optional().nullable(),
  bio: z.string().trim().max(300).optional().nullable(),
  isPublicProfile: z.boolean().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserProfileInput = z.infer<typeof updateUserProfileSchema>;