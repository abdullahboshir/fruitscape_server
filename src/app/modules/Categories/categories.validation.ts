import { z } from 'zod';

export const categoryZodSchema = z.object({
  name: z.string().trim().min(1).max(50),
  description: z.string().trim().max(200).optional(),
  image: z.string().url().optional(),
  isActive: z.boolean().default(true),
});

export const categoryUpdateSchema = categoryZodSchema.partial();