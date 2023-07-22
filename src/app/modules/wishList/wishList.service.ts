import { IWishList } from './wishList.interface';
import { WishListModel } from './wishList.model';

const getAllWishList = async (user: string): Promise<IWishList | null> => {
  return await WishListModel.findOne({ user: user })
    .populate('user')
    .populate('book');
};

const addToWishList = async (
  user: string,
  book: string
): Promise<IWishList | null> => {
  const isExist = await WishListModel.findOne({ user: user });

  if (isExist) {
    if (!isExist.books.find(itm => itm.toString() === book)) {
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
