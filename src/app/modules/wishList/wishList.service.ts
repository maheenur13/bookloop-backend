/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document } from 'mongoose';
import { IWishList } from './wishList.interface';
import { WishListModel } from './wishList.model';

type IWishListType = {
  user: string; // Assuming user is of type string
  books: string[]; // Assuming books are represented as an array of strings
} & Document;

const getAllWishList = async (user: string): Promise<IWishList | null> => {
  return await WishListModel.findOne({ user: user })
    .populate('user')
    .populate(['books']);
};

const addToWishList = async (
  user: string,
  book: string
): Promise<IWishList | null> => {
  const isExist: IWishListType | null = await WishListModel.findOne({
    user: user,
  });

  if (isExist) {
    if (!isExist.books?.find((itm: any) => itm.toString() === book)) {
      await WishListModel.findOneAndUpdate(
        { user: user },
        { $push: { books: book } }
      );
    } else {
      const newBooks = [...isExist.books].filter(
        item => item.toString() !== book
      );
      await WishListModel.findOneAndUpdate(
        { user: user },
        { $set: { books: newBooks } }
      );
    }
  } else {
    await WishListModel.create({ user: user, books: [book] });
  }

  return await WishListModel.findOne({ user: user })
    .populate('user')
    .populate(['books']);

  // return result?.wishList || [];
};

export const WishListService = {
  addToWishList,
  getAllWishList,
};
