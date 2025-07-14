import catchAsync  from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import status from 'http-status'
import { createSubCategoryService } from './subCategory.service'


export const createSubCategoryController = catchAsync(async (req, res) => {
  const data = await createSubCategoryService(req.body)

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: 'Sub Category has been Created Successfully',
    data,
  })
})
