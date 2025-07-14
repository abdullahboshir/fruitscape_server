import status from "http-status"
import AppError from "../../errors/AppError"
import User from "../Users/users.model"
import { USER_STATUS } from "../Users/users.constant"
import config from "../../config"
import { createToken } from "./auth.utils"

export const loginService = async (email: string, pass: string) => {

    console.log('emaillllllllllll', email, pass)
      const isUserExists = await User.isUserExists(email)

  if (!isUserExists) {
    throw new AppError(status.NOT_FOUND, 'User is not found')
  }

  const isDeleted = isUserExists.isDeleted

  if (isDeleted) {
    throw new AppError(status.FORBIDDEN, 'this User is deleted')
  }

  const userStatus = isUserExists.status

  if (userStatus === USER_STATUS.blocked) {
    throw new AppError(status.FORBIDDEN, 'this User is blocked')
  }



  if (
    !(await isUserExists.isPasswordMatched(pass))
  ) {
    throw new AppError(status.FORBIDDEN, 'password deos not matched')
  }


  const jwtPayload: any = {
    userId: isUserExists?._id,
    email: isUserExists?.email,
    role: isUserExists.role,
    id: isUserExists?.id,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expired_in as string,
  )

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expired_in as string,
  )



  return {
    accessToken,
    refreshToken,
    needsPasswordChange: isUserExists?.needsPasswordChange,
    user: isUserExists
  }


    
}