import httpStatus from 'http-status';
import { SortOrder, Types } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/pagination.helpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { bookSearchableFields } from './book.constants';
import { IBook, IBookFilters, IReview } from './book.interface';
import { BookModel } from './book.model';

const addBook = async (
  userId: Types.ObjectId,
  bookData: IBook
): Promise<IBook | null> => {
  const isExist = await BookModel.findOne({ title: bookData.title });
  if (isExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Book already exists with this title'
    );
  }

  bookData.publicationYear = new Date().getFullYear();

  return (await BookModel.create({ ...bookData, uploadedBy: userId })).populate(
    'uploadedBy'
  );
};

const getAllBook = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook[] | null>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm?.length) {
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
    .populate('uploadedBy')
    .populate({
      path: 'reviews',
      populate: [
        {
          path: 'user',
        },
      ],
    })
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .lean();
  const total = await BookModel.countDocuments(whereConditions).lean();
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
  return await BookModel.findById(id)
    .populate('uploadedBy')
    .populate({
      path: 'reviews',
      populate: [
        {
          path: 'user',
        },
      ],
    });
};

const deleteBook = async (
  userId: Types.ObjectId,
  id: string
): Promise<IBook | null> => {
  const isExist = await BookModel.findById(id).populate('uploadedBy');
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book do not exist!');
  }

  if (isExist.uploadedBy?._id != userId) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'You do not have permission to delete this!'
    );
  }
  return await BookModel.findByIdAndDelete(id)
    .populate('uploadedBy')
    .populate({
      path: 'reviews',
      populate: [
        {
          path: 'user',
        },
      ],
    });
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
  })
    .populate('uploadedBy')
    .populate({
      path: 'reviews',
      populate: [
        {
          path: 'user',
        },
      ],
    });
  return result;
};

const addReview = async (
  userId: Types.ObjectId,
  bookId: string,
  payload: Partial<IReview>
): Promise<IBook | null> => {
  const isExist = await BookModel.findById(bookId);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book do not exist!');
  }

  const updatedBookData: Partial<IReview> = { ...payload };
  updatedBookData.user = userId;

  const result = await BookModel.findByIdAndUpdate(
    bookId,
    {
      $push: {
        reviews: updatedBookData,
      },
    },
    {
      new: true,
    }
  )
    .populate('uploadedBy')
    .populate({
      path: 'reviews',
      populate: [
        {
          path: 'user',
        },
      ],
    });
  return result;
};

export const BookService = {
  addBook,
  getAllBook,
  getSingleBook,
  deleteBook,
  updateBook,
  addReview,
};
