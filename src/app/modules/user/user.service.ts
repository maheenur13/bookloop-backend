import httpStatus from 'http-status';
import { Types } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { IUser, IWishList } from './user.interface';
import { UserModel } from './user.model';

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const isExist = await UserModel.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No user exists!');
  }
  return await UserModel.findById(id);
};

const addToWishList = async (
  userId: Types.ObjectId,
  bookId: string,
  isWishList: boolean
): Promise<IWishList[]> => {
  const query = isWishList
    ? {
        $push: { wishList: { bookId } },
      }
    : {
        $pull: { wishList: { bookId } },
      };

  const result = await UserModel.findByIdAndUpdate(userId, query, {
    new: true,
  });

  return result?.wishList || [];
};

export const UserService = {
  getSingleUser,
  addToWishList,
};
