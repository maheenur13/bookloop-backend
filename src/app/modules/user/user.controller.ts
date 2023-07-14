import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser, IWishList } from './user.interface';
import { UserService } from './user.service';

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getSingleUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully!',
    data: result,
  });
});

const addToWishList = catchAsync(async (req: Request, res: Response) => {
  const { bookId, isWishList } = req.body;

  const result = await UserService.addToWishList(
    req.user.id,
    bookId,
    isWishList
  );

  sendResponse<IWishList[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message:
      isWishList === true ? 'Added To Wish List' : 'Remove from Wish List',
    data: result,
  });
});

export const UserController = {
  getSingleUser,
  addToWishList,
};
