import { Schema, Types, model } from 'mongoose';
import { IReadingPlans, IRedingPlanModel } from './planToRead.interface';

const planToReadSchema = new Schema<IReadingPlans, IRedingPlanModel>(
  {
    books: [
      {
        book: {
          type: Types.ObjectId,
          ref: 'Book',
        },
        status: {
          type: String,
          enum: ['complete', 'in-complete'],
        },
      },
    ],
    user: {
      type: Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const PlanToReadModel = model<IReadingPlans, IRedingPlanModel>(
  'ReadingPlan',
  planToReadSchema
);
