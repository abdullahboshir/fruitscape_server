import { z } from 'zod';

export const supplierZodSchema = z.object({
  name: z.string().min(1, 'Supplier name is required'),
  code: z
    .string()
    .min(1, 'Supplier code is required')
    .regex(/^[A-Z0-9\-]+$/, 'Supplier code must be uppercase alphanumeric with optional hyphens'),
  contactPerson: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Invalid email address').optional(),
  address: z.string().optional(),
  country: z.string().optional(),
  isActive: z.boolean().optional().default(true),
});
