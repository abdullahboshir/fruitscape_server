import { z } from 'zod'


const phoneRegex = /^01\d{9}$/

export const createCustomerZodSchema = z.object({
  body: z.object({
    createdBy: z.string({ required_error: 'createdBy is required' }),
    user: z.string({ required_error: 'user is required' }),
    id: z
      .string({ required_error: 'Customer ID is required' })
      .min(3)
      .max(20),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    phoneNumber: z
      .string()
      .regex(phoneRegex, {
        message: 'Phone number must be 11 digits and start with 01',
      }),
    name: z.object({
      firstName: z
        .string({ required_error: 'First name is required' })
        .min(1, 'First name cannot be empty'),
      lastName: z
        .string({ required_error: 'Last name is required' })
        .min(1, 'Last name cannot be empty'),
    }),
    profileImg: z
      .string()
      .url('Profile image must be a valid URL')
      .optional(),
    dateOfBirth: z
      .string()
      .datetime({ message: 'Invalid date format (use ISO format)' })
      .optional(),
  }),
})
