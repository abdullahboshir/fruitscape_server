import { NextFunction, Request, Response, Router } from 'express'
import { createCustomerController } from './users.controller'
import { createCustomerZodSchema } from '../Customers/customers.validation'
import { validateRequest } from '../../middlewares/validateRequest'
import { upload } from '../../utils/IMGUploader'

const router = Router()

router.post(
  '/create',
    upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  validateRequest(createCustomerZodSchema),
  createCustomerController
)

export const UserRoutes = router
