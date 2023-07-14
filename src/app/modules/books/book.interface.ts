import { Model } from 'mongoose';

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
};

export type IBookFilters = {
  searchTerm?: string;
  genre?: string;
  publicationDate?: Date;
};

export type IBookModel = Model<IBook, Record<string, unknown>>;
