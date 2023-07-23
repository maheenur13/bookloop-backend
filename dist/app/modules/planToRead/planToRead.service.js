"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanToReadService = void 0;
const planToRead_model_1 = require("./planToRead.model");
const getAllPlanToReading = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield planToRead_model_1.PlanToReadModel.findOne({ user: user })
        .populate('user')
        .populate({
        path: 'books',
        populate: [
            {
                path: 'book',
            },
        ],
    });
});
const addPlanToReading = (user, book, status = 'in-complete') => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield planToRead_model_1.PlanToReadModel.findOne({ user: user });
    if (isExist) {
        yield planToRead_model_1.PlanToReadModel.findOneAndUpdate({ user: user }, {
            $push: {
                books: {
                    book: book,
                    status: status,
                },
            },
        });
    }
    else {
        yield planToRead_model_1.PlanToReadModel.create({
            user: user,
            books: [
                {
                    book: book,
                    status: status,
                },
            ],
        });
    }
    return yield planToRead_model_1.PlanToReadModel.findOne({ user: user })
        .populate('user')
        .populate({
        path: 'books',
        populate: [
            {
                path: 'book',
            },
        ],
    });
});
const updateReadingStatus = (user, book, status) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        $set: { 'books.$.status': status },
    };
    const result = yield planToRead_model_1.PlanToReadModel.findOneAndUpdate({ user: user, 'books.book': book }, query, {
        new: true,
    })
        .populate('user')
        .populate({
        path: 'books',
        populate: [
            {
                path: 'book',
            },
        ],
    });
    return result;
});
exports.PlanToReadService = {
    addPlanToReading,
    getAllPlanToReading,
    updateReadingStatus,
};
