import { model, Schema } from 'mongoose'
import { TUser, UserStatic } from './users.interface'
import validator from 'validator'
import bcrypt from 'bcrypt'
import { USER_ROLE_ARRAY, USER_STATUS_ARRAY } from './users.constant'
import config from '../../config'

const UserSchema = new Schema<TUser, UserStatic>(
  {
    id: {
      type: String,
      requered: true,
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
    password: {
      type: String,
      validate: {
        validator: (value: string) =>
          validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          }),
        message: 'Password {VALUE} is not strong enough',
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
    fullName: { type: String, required: true },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: USER_ROLE_ARRAY,
      default: 'visitor',
    },
    status: {
      type: String,
      enum: USER_STATUS_ARRAY,
      default: 'active',
      set: (value: string) => value.toLowerCase(),
    },
    profileImg: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcrypt_salt_rounds),
    )
  }
  next()
});


UserSchema.static('isUserExists', async function isUserExists(email:string) {
  return this.findOne({email})
})


UserSchema.methods.isPasswordMatched = ( async function isPasswordMatched(plainText: string) {
  return bcrypt.compare(plainText, this.password);
})



UserSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedAtTime: Date,
  jwtIssuedTime: number,
) {
  const passwordChangedTime = new Date(passwordChangedAtTime).getTime() / 1000
  return passwordChangedTime > jwtIssuedTime
}



const User = model<TUser, UserStatic>('User', UserSchema)

export default User
