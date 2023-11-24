import { IUsers } from './users.interface';
import { UserM } from './users.model';

// create user
const createUserService = async (userData: IUsers) => {
  const result = await UserM.create(userData);
  return result;
};

// get users
const getUserService = async () => {
  const result = await UserM.find({}).select(
    'userId username fullName age email address -_id',
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
const updateUserService = async (id: number, body) => {
  const result = await UserM.updateOne({ userId: id }, { $set: body });
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

const addProductInOrderService = async (id: number, body) => {
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
  const result = await UserM.find({ userId: id }).select('orders');
  return result;
};

const getUsersOrdersTotalPrice = async (id: number) => {
  // const result = await UserM.aggregate([
  //   { $match: { userId: id } },
  //   {$unwind:"$orders"},
  //   { $group: { _id: null, totalPrice: { $sum: "$orders.price" } } },
  //   {$unwind:"$totalPrice"},
  //   {
  //     $project:{ totalPrice:1, _id:-1 }
  //   }
  // ]);

  const result = await UserM.findOne({ userId: id })
  let totalPrice = 0
  if(result){
   result.orders.forEach(order=>{
   totalPrice = totalPrice + order.price
   })
  }
  return totalPrice
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
