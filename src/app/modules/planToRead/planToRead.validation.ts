import { z } from 'zod';

const planToReadZonSchema = z.object({
  body: z.object({
    book: z.string({ required_error: 'book id is required' }),
    status: z.enum(['in-complete', 'complete']).optional(),
  }),
});
const updateReadingStatusZonSchema = z.object({
  body: z.object({
    book: z.string().optional(),
    status: z.enum(['in-complete', 'complete'], {
      required_error: 'status is required',
    }),
  }),
});

export const PlanToReadValidation = {
  planToReadZonSchema,
  updateReadingStatusZonSchema,
};
