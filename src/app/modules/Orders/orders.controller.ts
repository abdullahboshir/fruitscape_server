import catchAsync  from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import status from 'http-status'
import { createOrderService } from './orders.service'



export const createOrderController = catchAsync(async (req, res) => {
  const data = await createOrderService(req.body)

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: 'Your Order has been Created Successfully',
    data,
  })
})
