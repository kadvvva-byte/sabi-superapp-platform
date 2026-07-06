import { z } from "zod";

export const loginSchema = z.object({
  phone: z
    .string()
    .min(5, "Phone must be at least 5 characters")
    .max(20, "Phone is too long"),
});