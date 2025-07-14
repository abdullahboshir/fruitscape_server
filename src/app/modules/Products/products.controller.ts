import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { addProductService } from "./products.service";

export const createCustomerController = catchAsync(async (req, res) => {
  const data = await addProductService(req?.body)

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: 'Account has been Created Successfully',
    data,
  })
})