import { z } from "zod";

export const registerSchema = z.object({
  phone: z
    .string()
    .min(5, "Phone must be at least 5 characters")
    .max(20, "Phone is too long"),

  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long")
    .optional(),
});