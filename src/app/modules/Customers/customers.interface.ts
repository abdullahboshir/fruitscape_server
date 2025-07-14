import { Types } from "mongoose"

type TName = {
  firstName: string
  lastName: string
}

export type TCustomer = {
  user: Types.ObjectId
  id: string
  email: string
  phoneNumber?: string
  name: TName
  dateOfBirth?: Date
  profileImg?: string 
  createdAt: Date
}
