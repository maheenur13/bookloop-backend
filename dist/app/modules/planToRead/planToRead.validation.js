"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanToReadValidation = void 0;
const zod_1 = require("zod");
const planToReadZonSchema = zod_1.z.object({
    body: zod_1.z.object({
        book: zod_1.z.string({ required_error: 'book id is required' }),
        status: zod_1.z.enum(['in-complete', 'complete']).optional(),
    }),
});
const updateReadingStatusZonSchema = zod_1.z.object({
    body: zod_1.z.object({
        book: zod_1.z.string().optional(),
        status: zod_1.z.enum(['in-complete', 'complete'], {
            required_error: 'status is required',
        }),
    }),
});
exports.PlanToReadValidation = {
    planToReadZonSchema,
    updateReadingStatusZonSchema,
};
