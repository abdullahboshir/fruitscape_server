import { z } from 'zod'
import { USER_ROLE_ARRAY, USER_STATUS_ARRAY } from './users.constant'


const phoneRegex = /^01\d{9}$/

export const createUserZodSchema = z.object({
  body: z.object({
    id: z
      .string({ required_error: 'User ID is required' })
      .min(3)
      .max(20),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password must be at least 8 characters long')
      .refine(
        (value) =>
          /[a-z]/.test(value) &&
          /[A-Z]/.test(value) &&
          /[0-9]/.test(value) &&
          /[^A-Za-z0-9]/.test(value),
        {
          message:
            'Password must contain uppercase, lowercase, number, and special character',
        }
      ),
    phoneNumber: z
      .string({ required_error: 'Phone number is required' })
      .regex(phoneRegex, {
        message: 'Phone number must start with 01 and be 11 digits',
      }),
    fullName: z
      .string({ required_error: 'Full name is required' })
      .min(1),
    needsPasswordChange: z.boolean().optional(),
    passwordChangedAt: z.string().datetime().optional(),
    role: z.enum([...USER_ROLE_ARRAY] as [string, ...string[]]).optional(),
    status: z.enum([...USER_STATUS_ARRAY] as [string, ...string[]]).optional(),
    profileImg: z.string().url('Must be a valid URL').optional(),
    isDeleted: z.boolean().optional(),
  }),
})
