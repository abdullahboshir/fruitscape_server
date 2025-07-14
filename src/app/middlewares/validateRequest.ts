import { AnyZodObject } from 'zod'
import catchAsync from '../utils/catchAsync'

export const validateRequest = (zodSchema: AnyZodObject) => {
  return catchAsync(async (req, res, next) => {
    await zodSchema.safeParseAsync({ body: req.body, cookies: req.cookies })
    next()
  })
} 
  