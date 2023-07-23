"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListValidation = void 0;
const zod_1 = require("zod");
const wishListZonSchema = zod_1.z.object({
    body: zod_1.z.object({
        book: zod_1.z.string({ required_error: 'id is required' }),
    }),
});
exports.WishListValidation = {
    wishListZonSchema,
};
