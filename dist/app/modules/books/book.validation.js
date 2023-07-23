"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
const addBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'title is required!' }),
        author: zod_1.z.string({ required_error: 'author is required!' }),
        genre: zod_1.z.string({ required_error: 'genre is required!' }),
        publicationDate: zod_1.z.string({
            required_error: 'publicationDate is required!',
        }),
    }),
});
const addReviewZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        reviews: zod_1.z.object({
            review: zod_1.z.string({ required_error: 'review is required' }),
        }),
    }),
});
const updateBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        author: zod_1.z.string().optional(),
        publicationDate: zod_1.z.string().optional(),
        genre: zod_1.z.string().optional(),
    }),
});
exports.BookValidation = {
    addBookZodSchema,
    updateBookZodSchema,
    addReviewZodSchema,
};
