import { z } from 'zod';

const addBookZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'title is required!' }),
    author: z.string({ required_error: 'author is required!' }),
    genre: z.string({ required_error: 'genre is required!' }),
    publicationDate: z.string({
      required_error: 'publicationDate is required!',
    }),
  }),
});

const updateBookZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    publicationDate: z.string().optional(),
    genre: z.string().optional(),
  }),
});

export const BookValidation = {
  addBookZodSchema,
  updateBookZodSchema,
};
