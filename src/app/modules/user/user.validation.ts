import { z } from 'zod';

const wishListZonSchema = z.object({
  body: z.object({
    bookId: z.string({ required_error: 'id is required' }),
    isWishList: z.boolean({ required_error: 'isWishList is required' }),
  }),
});

export const UserValidation = {
  wishListZonSchema,
};
