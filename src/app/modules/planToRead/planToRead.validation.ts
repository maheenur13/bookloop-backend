import { z } from 'zod';

const planToReadZonSchema = z.object({
  body: z.object({
    book: z.string({ required_error: 'book id is required' }),
    status: z.enum(['pending', 'complete']).optional(),
  }),
});
const updateReadingStatusZonSchema = z.object({
  body: z.object({
    status: z.enum(['pending', 'complete'], {
      required_error: 'status is required',
    }),
  }),
});

export const PlanToReadValidation = {
  planToReadZonSchema,
  updateReadingStatusZonSchema,
};
