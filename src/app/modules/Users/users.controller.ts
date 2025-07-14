import { Request, Response } from 'express'
import { createCustomerService } from './users.service'
import catchAsync  from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import status from 'http-status'

export const createCustomerController = catchAsync(async (req, res) => {
  const {customerData, password} = req.body;
  const data = await createCustomerService(customerData, password, req?.file)

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: 'Account has been Created Successfully',
    data,
  })
})
