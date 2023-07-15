import { Types } from 'mongoose';
import { IReadingPlans } from '../user/user.interface';
import { UserModel } from '../user/user.model';

const getAllPlanToReading = async (id: string): Promise<IReadingPlans[]> => {
  return (
    (
      await UserModel.findById(id).populate({
        path: 'readingPlans',
        populate: [{ path: 'book' }],
      })
    )?.readingPlans || []
  );
};

const addPlanToReading = async (
  userId: Types.ObjectId,
  book: string,
  status: 'in-complete' | 'complete' = 'in-complete'
): Promise<IReadingPlans[]> => {
  const query = {
    $push: { readingPlans: { book, status } },
  };

  const result = await UserModel.findByIdAndUpdate(userId, query, {
    new: true,
  }).populate({
    path: 'readingPlans',
    populate: [{ path: 'book' }],
  });

  return result?.readingPlans || [];
};
const updateReadingStatus = async (
  userId: Types.ObjectId,
  book: string,
  status: 'in-complete' | 'complete'
): Promise<IReadingPlans[]> => {
  const query = {
    $set: { 'readingPlans.$.status': status },
  };

  const result = await UserModel.findOneAndUpdate(userId, query, {
    new: true,
  }).populate({
    path: 'readingPlans',
    populate: [{ path: 'book' }],
  });

  return result?.readingPlans || [];
};

export const PlanToReadService = {
  addPlanToReading,
  getAllPlanToReading,
  updateReadingStatus,
};
