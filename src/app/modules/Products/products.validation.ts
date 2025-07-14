import { z } from 'zod'

export const productZodSchema = z.object({
  suppliers: z.array(z.string().regex(/^[a-f\d]{24}$/i), {
    required_error: 'Suppliers are required',
  }),

  name: z.string().min(1, 'Product name is required'),
  sku: z.string().min(1, 'SKU is required'),
  category: z.string().min(1, 'Category is required'),

  subcategories: z
    .array(z.string().regex(/^[a-f\d]{24}$/i))
    .optional()
    .default([]),

  price: z.number().nonnegative('Price must be a positive number'),
  unit: z.enum(['kg', 'gram', 'piece', 'dozen']),
  stock: z.number().int().nonnegative(),
  origin: z.string().min(1, 'Origin is required'),

  description: z.string().optional(),
  image: z
    .array(z.string().url('Each image must be a valid URL'))
    .min(1, 'At least one image is required'),

  isAvailable: z.boolean().optional().default(true),
  discount: z.number().min(0).max(100).optional().default(0),
  tags: z.array(z.string()).optional().default([]),
  ratings: z.number().min(0).max(5).optional().default(0),
  reviewsCount: z.number().int().optional().default(0),
  isOrganic: z.boolean().optional().default(false),
  deliveryTime: z.string().optional(),
})
