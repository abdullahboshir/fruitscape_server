import { z } from 'zod';
import { objectIdZodSchema } from '../../shared/validation/objectIdZodSchema';


// Sub-schemas
const orderItemSchema = z.object({
  product: objectIdZodSchema,
  quantity: z.number().int().positive(),
  unitPrice: z.number().positive()
});

const deliveryAddressSchema = z.object({
  street: z.string().min(1).max(100),
  city: z.string().min(1).max(50),
  postalCode: z.string().min(1).max(20),
  country: z.string().min(1).max(50)
});

const paymentInfoSchema = z.object({
  method: z.enum(['credit_card', 'paypal', 'cash_on_delivery']),
  status: z.enum(['pending', 'completed', 'failed', 'refunded']).optional(),
  transactionId: z.string().optional()
});

// Main schema
export const createOrderZodSchema = z.object({
  customer: objectIdZodSchema,
  items: z.array(orderItemSchema).nonempty(),
  deliveryAddress: deliveryAddressSchema,
  payment: paymentInfoSchema,
  discount: z.number().min(0).optional(),
  deliveryFee: z.number().min(0).optional(),
  notes: z.string().optional()
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(['processing', 'shipped', 'delivered', 'cancelled'])
});

export type CreateOrderInput = z.infer<typeof createOrderZodSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;