import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/pagination.helpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { bookSearchableFields } from './book.constants';
import { IBook, IBookFilters } from './book.interface';
import { BookModel } from './book.model';

const addBook = async (bookData: IBook): Promise<IBook | null> => {
  return await BookModel.create(bookData);
};

const getAllBook = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook[] | null>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        let newData = {};
        newData = {
          [field]: value,
        };
        return newData;
      }),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await BookModel.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .lean();
  const total = await BookModel.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBook = async (id: string): Promise<IBook | null> => {
  const isExist = await BookModel.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book do not exist!');
  }
  return await BookModel.findById(id);
};

const deleteBook = async (id: string): Promise<IBook | null> => {
  const isExist = await BookModel.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book do not exist!');
  }
  return await BookModel.findByIdAndDelete(id);
};

const updateBook = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const isExist = await BookModel.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book do not exist!');
  }

  const updatedBookData: Partial<IBook> = { ...payload };

  const result = await BookModel.findByIdAndUpdate(id, updatedBookData, {
    new: true,
  });
  return result;
};

export const BookService = {
  addBook,
  getAllBook,
  getSingleBook,
  deleteBook,
  updateBook,
};
