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
    await WishListModel.findOneAndUpdate(
      { user: user },
      { $push: { book: book } }
    );
  } else {
    await WishListModel.create({ user: user, book: [book] });
  }

  return await WishListModel.findOne({ user: user })
    .populate('user')
    .populate('book');

  // return result?.wishList || [];
};

export const WishListService = {
  addToWishList,
  getAllWishList,
};
