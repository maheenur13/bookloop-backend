import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { UserModel } from './user.model';

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const isExist = await UserModel.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No user exists!');
  }
  return await UserModel.findById(id);
};

export const UserService = {
  getSingleUser,
};
