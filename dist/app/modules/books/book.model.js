"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Types.ObjectId,
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
                type: mongoose_1.Types.ObjectId,
                ref: 'User',
            },
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.BookModel = (0, mongoose_1.model)('Book', bookSchema);
