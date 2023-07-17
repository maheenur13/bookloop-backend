import { Schema, Types, model } from 'mongoose';
import { IWishList, IWishListModel } from './wishList.interface';

const wishListSchema = new Schema<IWishList, IWishListModel>(
  {
    book: [
      {
        type: Types.ObjectId,
        ref: 'Book',
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

export const WishListModel = model<IWishList, IWishListModel>(
  'WishList',
  wishListSchema
);
