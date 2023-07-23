"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListModel = void 0;
const mongoose_1 = require("mongoose");
const wishListSchema = new mongoose_1.Schema({
    books: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: 'Book',
        },
    ],
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.WishListModel = (0, mongoose_1.model)('WishList', wishListSchema);
