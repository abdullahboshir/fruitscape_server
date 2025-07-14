import { model, Schema, Types } from 'mongoose'
import { TCustomer } from './customers.interface'
import validator from 'validator'

const CustomerSchema = new Schema<TCustomer>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
      required: [true, 'User id is required'],
    },
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not a valid email type',
      },
    },
    phoneNumber: {
      type: String,
      required: false,
      sparse: true,
      unique: true,
      index: true,
      trim: true,
      validate: {
        validator(value) {
          const phoneRegex = /^01\d{9}$/
          return phoneRegex.test(value)
        },
        message:
          'Invalid phone number format. It must be 11 digits and start with 01.',
      },
    },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    profileImg: String,
    dateOfBirth: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

const Customer = model<TCustomer>('Customer', CustomerSchema)

export default Customer
