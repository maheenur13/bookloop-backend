import { Model, Types } from 'mongoose';
import { IBook } from '../books/book.interface';
import { IUser } from '../user/user.interface';

export type IWishList = {
  user: Types.ObjectId | IUser;
  books: Types.ObjectId[] | IBook[];
};

export type IWishListModel = Model<IWishList, Record<string, unknown>>;
