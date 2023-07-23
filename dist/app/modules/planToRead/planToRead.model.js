"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanToReadModel = void 0;
const mongoose_1 = require("mongoose");
const planToReadSchema = new mongoose_1.Schema({
    books: [
        {
            book: {
                type: mongoose_1.Types.ObjectId,
                ref: 'Book',
            },
            status: {
                type: String,
                enum: ['complete', 'in-complete'],
            },
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
exports.PlanToReadModel = (0, mongoose_1.model)('ReadingPlan', planToReadSchema);
