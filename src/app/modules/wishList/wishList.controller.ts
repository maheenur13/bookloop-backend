import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IWishList } from './wishList.interface';
import { WishListService } from './wishList.service';

const getAllWishList = catchAsync(async (req: Request, res: Response) => {
  const result = await WishListService.getAllWishList(req.user.id);

  sendResponse<IWishList>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wish List retrieved successfully!',
    data: result,
  });
});

const addToWishList = catchAsync(async (req: Request, res: Response) => {
  const { book } = req.body;
  const { id } = req.user;

  const result = await WishListService.addToWishList(id, book);

  sendResponse<IWishList>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Added To Wish List',
    data: result,
  });
});

export const WishListController = {
  getAllWishList,
  addToWishList,
};
