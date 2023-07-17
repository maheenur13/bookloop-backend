import { Model, Types } from 'mongoose';
import { IBook } from '../books/book.interface';
import { IUser } from '../user/user.interface';

export type IPlan = {
  book: Types.ObjectId | IBook;
  status: 'complete' | 'in-complete';
};

export type IReadingPlans = {
  user: Types.ObjectId | IUser;
  books: IPlan[];
};

export type IRedingPlanModel = Model<IReadingPlans, Record<string, unknown>>;
