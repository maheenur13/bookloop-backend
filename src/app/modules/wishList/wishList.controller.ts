import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IWishList } from '../user/user.interface';
import { WishListService } from './wishList.service';

const getAllWishList = catchAsync(async (req: Request, res: Response) => {
  const result = await WishListService.getAllWishList(req.user.id);

  sendResponse<IWishList[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wish List retrieved successfully!',
    data: result,
  });
});

const addToWishList = catchAsync(async (req: Request, res: Response) => {
  const { bookId, isWishList } = req.body;

  const result = await WishListService.addToWishList(
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

export const WishListController = {
  getAllWishList,
  addToWishList,
};
