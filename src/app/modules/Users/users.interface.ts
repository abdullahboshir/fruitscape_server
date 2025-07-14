import { Model, Types } from 'mongoose'
import { USER_ROLE, USER_STATUS } from './users.constant'

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE]
export type TUserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS]

export type TUser = {
  _id?: Types.ObjectId;
  id: string
  email: string
  phoneNumber?: string
  password: string
  fullName: string
  needsPasswordChange: boolean
  passwordChangedAt: Date
  role: TUserRole
  status: TUserStatus
  profileImg?: string
  isDeleted: boolean
}


export interface UserStatic extends Model<TUser> {
isUserExists(email: string): Promise<TUser>
isPasswordMatched(plainText: string): Promise<boolean>
  // isPasswordMatched(plainPass: string, hashedPass: string): Promise<boolean>


  isJWTIssuedBeforePasswordChanged(
    passwordChangedAtTime: Date,
    jwtIssuedTime: number,
  ): boolean

}
