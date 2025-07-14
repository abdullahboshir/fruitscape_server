import catchAsync  from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import status from 'http-status'
import { createCategoryService } from './categories.service'



export const createCategoryController = catchAsync(async (req, res) => {
  const data = await createCategoryService(req.body)

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: ' Category has been Created Successfully',
    data,
  })
})
