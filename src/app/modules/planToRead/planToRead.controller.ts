import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IReadingPlans } from '../user/user.interface';
import { PlanToReadService } from './planToRead.service';

const getAllPlanToReading = catchAsync(async (req: Request, res: Response) => {
  const result = await PlanToReadService.getAllPlanToReading(req.user.id);

  sendResponse<IReadingPlans[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All reading plan retrieved successfully!',
    data: result,
  });
});

const addPlanToReading = catchAsync(async (req: Request, res: Response) => {
  const { book, status } = req.body;

  const result = await PlanToReadService.addPlanToReading(
    req.user.id,
    book,
    status
  );

  sendResponse<IReadingPlans[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Added To Plan List',
    data: result,
  });
});
const updateReadingStatus = catchAsync(async (req: Request, res: Response) => {
  const { status } = req.body;
  const { id } = req.params;

  const result = await PlanToReadService.updateReadingStatus(
    req.user.id,
    id,
    status
  );

  sendResponse<IReadingPlans[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Updated reading status',
    data: result,
  });
});

export const PlanToReadController = {
  addPlanToReading,
  getAllPlanToReading,
  updateReadingStatus,
};
