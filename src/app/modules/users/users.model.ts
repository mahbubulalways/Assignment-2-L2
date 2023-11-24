import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  IAddress,
  IFullName,
  IOrders,
  IUsers,
  UsersModel,
} from './users.interface';
import config from '../../config';

const userFullNameSchema = new Schema<IFullName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
  },
  lastName: {
    type: String,
    required: [true, ' Last name is required'],
  },
});

const userAddressSchema = new Schema<IAddress>({
  city: {
    type: String,
    required: [true, 'city name is required'],
  },
  country: {
    type: String,
    required: [true, 'Country name is required'],
  },
  street: {
    type: String,
    required: [true, 'Street name is required'],
  },
});

const orderSchema = new Schema<IOrders>({
  productName: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  },
});

const usersSchema = new Schema<IUsers, UsersModel>({
  userId: {
    type: Number,
    unique: true,
    required: [true, 'User id is required'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'User name is required'],
  },
  password: {
    type: String,
    required: [true, 'Password  is required'],
  },
  fullName: {
    type: userFullNameSchema,
    required: [true, 'Full name is required'],
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  isActive: {
    type: Boolean,
  },
  hobbies: {
    type: [String],
  },
  address: {
    type: userAddressSchema,
    required: [true, 'Address is required'],
  },
  orders: {
    type: [orderSchema],
  },
});

usersSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.BCRYPT_SALT));
  next();
});

// usersSchema.post('save',async function () {
//  this.password=""
// })

usersSchema.statics.isExistingUser = async function (userId: number) {
  const isExist = await UserM.findOne({ userId: userId });
  return isExist;
};

export const UserM = model<IUsers, UsersModel>('User', usersSchema);
