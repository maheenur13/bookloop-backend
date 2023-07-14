import { Types } from 'mongoose';
import { IWishList } from '../user/user.interface';
import { UserModel } from '../user/user.model';

const getAllWishList = async (id: string): Promise<IWishList[]> => {
  return (await UserModel.findById(id).populate('wishList'))?.wishList || [];
};

const addToWishList = async (
  userId: Types.ObjectId,
  bookId: string,
  isWishList: boolean
): Promise<IWishList[]> => {
  const query = isWishList
    ? {
        $push: { wishList: bookId },
      }
    : {
        $pull: { wishList: bookId },
      };

  const result = await UserModel.findByIdAndUpdate(userId, query, {
    new: true,
  }).populate('wishList');

  return result?.wishList || [];
};

export const WishListService = {
  addToWishList,
  getAllWishList,
};
