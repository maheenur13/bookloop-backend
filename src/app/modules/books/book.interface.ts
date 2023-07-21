import { Model, Types } from 'mongoose';
import { IUser } from './../user/user.interface';

export type IReview = {
  review: string;
  user: Types.ObjectId | IUser;
};

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
  publicationYear: number;
  reviews?: IReview[];
  uploadedBy?: Types.ObjectId | IUser;
};

export type IBookFilters = {
  searchTerm?: string;
  genre?: string;
  publicationDate?: Date;
};

export type IBookModel = Model<IBook, Record<string, unknown>>;
