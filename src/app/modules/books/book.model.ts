import { Schema, Types, model } from 'mongoose';
import { IBook, IBookModel } from './book.interface';

const bookSchema = new Schema<IBook, IBookModel>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: Date,
      required: true,
    },
    uploadedBy: {
      type: Types.ObjectId,
      ref: 'User',
    },
    publicationYear: {
      type: Number,
      required: true,
    },
    reviews: [
      {
        review: {
          type: String,
          required: true,
        },
        user: {
          type: Types.ObjectId,
          ref: 'User',
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const BookModel = model<IBook, IBookModel>('Book', bookSchema);
