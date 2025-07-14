import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createProductService } from "./products.service";


export const createProductController = catchAsync(async (req, res) => {
  const data = await createProductService(req?.body)

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: 'Product has been Created Successfully',
    data,
  })
})