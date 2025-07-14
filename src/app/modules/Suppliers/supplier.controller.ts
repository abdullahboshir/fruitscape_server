import catchAsync  from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import status from 'http-status'
import { createSupplierService } from './supplier.service'

export const createSupplierController = catchAsync(async (req, res) => {
  const data = await createSupplierService(req.body)

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: 'Supplier has been Created Successfully',
    data,
  })
})
