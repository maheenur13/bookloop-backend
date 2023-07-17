import { z } from 'zod';

const wishListZonSchema = z.object({
  body: z.object({
    book: z.string({ required_error: 'id is required' }),
  }),
});

export const WishListValidation = {
  wishListZonSchema,
};
