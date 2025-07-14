import status from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { loginService } from './auth.service'

export const loginController = catchAsync(async (req, res) => {
  const { email, password } = req.body
  const data = await loginService(email, password)

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: 'Account has been Created Successfully',
    data,
  })
})
