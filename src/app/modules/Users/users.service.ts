import { startSession } from 'mongoose'
import { TCustomer } from '../Customers/customers.interface'
import Customer from '../Customers/customers.model'
import { TUser } from './users.interface'
import User from './users.model'
import { genereteCustomerId } from './users.utils'
import config from '../../config'
import { USER_ROLE } from './users.constant'
import { sendImageToCloudinary } from '../../utils/IMGUploader'
import AppError from '../../errors/AppError'

export const createCustomerService = async (
  customerData: TCustomer,
  password: string,
  file: Express.Multer.File | undefined,
) => {
  const userData: Partial<TUser> = {}

  const session = await startSession()
  try {
    const isUserExists = await User.findOne({ email: customerData.email })
    
    if (isUserExists) {
       new AppError(200, 'The User already has registered!')
    }

    
    session.startTransaction()
    const id = await genereteCustomerId(customerData?.name)
    console.log('is not BBBBBBBBBBBBBBBB', id)

    if (file) {
      const imgName = `${customerData.name.firstName}${id}`
      const imgPath = file?.path
      const { secure_url } = (await sendImageToCloudinary(
        imgName,
        imgPath,
      )) as any
      customerData.profileImg = secure_url
      userData.profileImg = secure_url
    }

    customerData.id = id

       // create User
    userData.id = id
    userData.password = password || config.default_pass as string
    userData.role = USER_ROLE?.customer
    userData.email = customerData?.email
    userData.phoneNumber = customerData?.phoneNumber
    const { firstName, lastName } = customerData?.name
    userData.fullName = firstName + ' ' + lastName

    const newUser = await User.create([userData], { session })


    if (!newUser.length) {
      throw new Error('Failed to create user!')
    }


        // create cusotmer
    customerData.id = newUser[0].id
    customerData.user = newUser[0]._id

    const newCustomer = await Customer.create([customerData], { session })


    if (!newCustomer || !newCustomer.length) {
      throw new Error('Failed to create Customer!')
    }


    await session.commitTransaction()
    await session.endSession()
    return newCustomer;
  } catch (error: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(error.message)
  }

}
