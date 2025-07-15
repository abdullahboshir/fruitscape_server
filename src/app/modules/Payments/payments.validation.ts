import { z } from 'zod';
import { objectIdZodSchema } from '../../shared/validation/objectIdZodSchema';


// Sub-schemas
const paymentDetailsSchema = z.object({
  cardLast4: z.string().length(4).optional(),
  cardBrand: z.string().optional(),
  paypalEmail: z.string().email().optional(),
  bankName: z.string().optional(),
  walletProvider: z.string().optional()
}).superRefine((data, ctx) => {
  // Validate payment method-specific fields
  if (data.cardLast4 && !data.cardBrand) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Card brand is required when cardLast4 is provided"
    });
  }
});

const refundSchema = z.object({
  amount: z.number().positive(),
  reason: z.string().optional(),
  processedAt: z.date().optional()
});

// Main schemas
export const createPaymentSchema = z.object({
  order: objectIdZodSchema,
  customer: objectIdZodSchema,
  method: z.enum(['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'cash_on_delivery', 'mobile_wallet']),
  amount: z.number().positive(),
  currency: z.string().length(3).default('USD'),
  paymentDetails: paymentDetailsSchema.optional(),
  ipAddress: z.string().ip().optional()
});

export const updatePaymentStatusSchema = z.object({
  status: z.enum(['processing', 'completed', 'failed', 'refunded', 'partially_refunded']),
  transactionId: z.string().optional(),
  gatewayResponse: z.any().optional()
});

export const processRefundSchema = z.object({
  amount: z.number().positive(),
  reason: z.string().min(1).max(200).optional()
});

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
export type UpdatePaymentStatusInput = z.infer<typeof updatePaymentStatusSchema>;
export type ProcessRefundInput = z.infer<typeof processRefundSchema>;