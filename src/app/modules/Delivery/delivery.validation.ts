import { z } from 'zod';
import { objectIdZodSchema } from '../../shared/validation/objectIdZodSchema';


// Sub-schemas
const deliveryAddressSchema = z.object({
  street: z.string().min(1).max(100),
  city: z.string().min(1).max(50),
  postalCode: z.string().min(1).max(20),
  country: z.string().min(1).max(50),
  coordinates: z.tuple([z.number(), z.number()]).optional()
});

const deliveryProofSchema = z.object({
  image: z.string().url().optional(),
  signature: z.string().optional(),
  notes: z.string().optional()
});

// Main schemas
export const createDeliverySchema = z.object({
  order: objectIdZodSchema,
  courier: objectIdZodSchema.optional(),
  trackingNumber: z.string().optional(),
  estimatedDelivery: z.date().optional(),
  deliveryAddress: deliveryAddressSchema,
  deliveryFee: z.number().min(0),
  distance: z.number().min(0).optional(),
  timeToDelivery: z.number().min(0).optional()
});

export const updateDeliveryStatusSchema = z.object({
  status: z.enum(['dispatched', 'in_transit', 'out_for_delivery', 'delivered', 'failed']),
  actualDelivery: z.date().optional(),
  deliveryProof: deliveryProofSchema.optional(),
  failureReason: z.enum(['unavailable', 'wrong_address', 'rejected', 'damaged', 'other']).optional()
});

export type CreateDeliveryInput = z.infer<typeof createDeliverySchema>;
export type UpdateDeliveryStatusInput = z.infer<typeof updateDeliveryStatusSchema>;