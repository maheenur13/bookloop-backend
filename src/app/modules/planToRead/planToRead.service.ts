import { Types } from 'mongoose';
import { IReadingPlans } from './planToRead.interface';
import { PlanToReadModel } from './planToRead.model';

const getAllPlanToReading = async (
  user: string
): Promise<IReadingPlans | null> => {
  return await PlanToReadModel.findOne({ user: user })
    .populate('user')
    .populate({
      path: 'books',
      populate: [
        {
          path: 'book',
        },
      ],
    });
};

const addPlanToReading = async (
  user: Types.ObjectId,
  book: string,
  status: 'in-complete' | 'complete' = 'in-complete'
): Promise<IReadingPlans | null> => {
  const isExist = await PlanToReadModel.findOne({ user: user });

  if (isExist) {
    await PlanToReadModel.findOneAndUpdate(
      { user: user },
      {
        $push: {
          books: {
            book: book,
            status: status,
          },
        },
      }
    );
  } else {
    await PlanToReadModel.create({
      user: user,
      books: [
        {
          book: book,
          status: status,
        },
      ],
    });
  }
  return await PlanToReadModel.findOne({ user: user })
    .populate('user')
    .populate({
      path: 'books',
      populate: [
        {
          path: 'book',
        },
      ],
    });
};
const updateReadingStatus = async (
  user: Types.ObjectId,
  book: string,
  status: 'in-complete' | 'complete'
): Promise<IReadingPlans | null> => {
  const query = {
    $set: { 'books.status': status },
  };

  const result = await PlanToReadModel.findOneAndUpdate(
    { user: user, 'books.book': book },
    query,
    {
      new: true,
    }
  )
    .populate('user')
    .populate({
      path: 'books',
      populate: [
        {
          path: 'book',
        },
      ],
    });

  return result;
};

export const PlanToReadService = {
  addPlanToReading,
  getAllPlanToReading,
  updateReadingStatus,
};
