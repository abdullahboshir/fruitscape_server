import { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import AppError from '../errors/AppError'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500
  let message = 'Something went wrong!'

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400
    message = Object.values(err.errors).map((e: any) => e.message).join(', ')
  }

  // Mongoose cast error (e.g. invalid ObjectId)
  else if (err.name === 'CastError') {
    statusCode = 400
    message = `Invalid ${err.path}: ${err.value}`
  }

  // Zod validation error
  else if (err instanceof ZodError) {
    statusCode = 400
    message = err.issues.map(issue => issue.message).join(', ')
  }

  // Custom AppError
  else if (err instanceof AppError) {
    statusCode = err.statusCode
    message = err.message
  }

  // Default error
  else if (err instanceof Error) {
    message = err.message
  }

  res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? err : undefined,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  })
}

export default globalErrorHandler
