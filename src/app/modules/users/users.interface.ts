import { Model } from 'mongoose';

// user's full name interface
export interface IFullName {
  firstName: string;
  lastName: string;
}

// user's address interface
export interface IAddress {
  street: string;
  city: string;
  country: string;
}

// orders interface
export interface IOrders {
  productName: string;
  price: number;
  quantity: number;
}

// users interface
export interface IUsers {
  userId: number;
  username: string;
  password: string;
  fullName: IFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: IAddress;
  orders: IOrders[];
}

export interface UsersModel extends Model<IUsers> {
  isExistingUser(userId: number): Promise<IUsers> | null;
}
