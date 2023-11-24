import { IUsers } from './users.interface';
import { UserM } from './users.model';

// create user
const createUserService = async (userData: IUsers) => {
  const result = await UserM.create(userData);
  if (result) {
    return await UserM.findOne({ userId: userData.userId }).select(
      '-password -orders',
    );
  } else return null;
};

// get users
const getUserService = async () => {
  const result = await UserM.find({}).select(
    'userId username fullName age email address  -_id',
  );
  return result;
};

// get single user
const getSingleUserService = async (id: number) => {
  const result = await UserM.findOne({ userId: id }).select(
    '-_id  -password -orders',
  );
  return result;
};

// update user
const updateUserService = async (id: number, updateData: object) => {
  const result = await UserM.updateOne({ userId: id }, { $set: updateData });
  if (result.modifiedCount) {
    const data = await UserM.findOne({ userId: id }).select(
      '-_id  -password -orders',
    );
    return data;
  } else return null;
};

// delete user
const deleteUserService = async (id: number) => {
  const exist = await UserM.isExistingUser(id);
  if (!exist) {
    throw new Error('User not found');
  }
  const result = await UserM.deleteOne({ userId: id });
  return result;
};

// Bonus Part
// Add product in order

const addProductInOrderService = async (id: number, body: object) => {
  const exist = await UserM.isExistingUser(id);
  if (!exist) {
    throw new Error('User not found');
  }
  const result = await UserM.findOneAndUpdate(
    { userId: id },
    { $push: { orders: body } },
    { new: true },
  );
  return result;
};

// get users orders

const getUsersOrders = async (id: number) => {
  const result = await UserM.findOne({ userId: id }).select('orders');
  return result;
};

// get orders total price
const getUsersOrdersTotalPrice = async (id: number) => {
  const result = await UserM.findOne({ userId: id });
  let totalPrice = 0;
  if (result && result.orders) {
    result.orders.forEach((order) => {
      totalPrice = totalPrice + order.price;
    });
  }
  return Math.ceil(totalPrice);
};

export const usersServices = {
  createUserService,
  getUserService,
  getSingleUserService,
  updateUserService,
  deleteUserService,
  addProductInOrderService,
  getUsersOrders,
  getUsersOrdersTotalPrice,
};
