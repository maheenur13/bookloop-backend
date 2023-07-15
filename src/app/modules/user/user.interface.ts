/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IBook } from '../books/book.interface';

export type IWishList = Types.ObjectId | IBook;

export type IReadingPlans = {
  book: Types.ObjectId | IBook;
  status: 'in-complete' | 'complete';
};

export type IUser = {
  _id?: Types.ObjectId;
  email: string;
  password: string;
  wishList?: IWishList[];
  readingPlans?: IReadingPlans[];
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
