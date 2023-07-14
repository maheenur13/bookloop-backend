/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IBook } from '../books/book.interface';

export type IWishList = Types.ObjectId | IBook;

export type IUser = {
  _id?: Types.ObjectId;
  email: string;
  password: string;
  wishList?: IWishList[];
};

type IUserModelStaticType = {
  isUserExistById(
    id: Types.ObjectId
  ): Promise<Pick<IUser, 'password' | 'email' | '_id'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};

export type IUserModel = IUserModelStaticType &
  Model<IUser, Record<string, unknown>>;
