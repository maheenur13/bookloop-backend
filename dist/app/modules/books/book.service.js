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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const pagination_helpers_1 = require("../../../helpers/pagination.helpers");
const book_constants_1 = require("./book.constants");
const book_model_1 = require("./book.model");
const addBook = (userId, bookData) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield book_model_1.BookModel.findOne({ title: bookData.title });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Book already exists with this title');
    }
    bookData.publicationYear = new Date().getFullYear();
    return (yield book_model_1.BookModel.create(Object.assign(Object.assign({}, bookData), { uploadedBy: userId }))).populate('uploadedBy');
});
const getAllBook = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = pagination_helpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm === null || searchTerm === void 0 ? void 0 : searchTerm.length) {
        andConditions.push({
            $or: book_constants_1.bookSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => {
                let newData = {};
                newData = {
                    [field]: value,
                };
                return newData;
            }),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield book_model_1.BookModel.find(whereConditions)
        .populate('uploadedBy')
        .populate({
        path: 'reviews',
        populate: [
            {
                path: 'user',
            },
        ],
    })
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .lean();
    const total = yield book_model_1.BookModel.countDocuments(whereConditions).lean();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield book_model_1.BookModel.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Book do not exist!');
    }
    return yield book_model_1.BookModel.findById(id)
        .populate('uploadedBy')
        .populate({
        path: 'reviews',
        populate: [
            {
                path: 'user',
            },
        ],
    });
});
const deleteBook = (userId, id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const isExist = yield book_model_1.BookModel.findById(id).populate('uploadedBy');
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Book do not exist!');
    }
    if (((_a = isExist.uploadedBy) === null || _a === void 0 ? void 0 : _a._id) != userId) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You do not have permission to delete this!');
    }
    return yield book_model_1.BookModel.findByIdAndDelete(id)
        .populate('uploadedBy')
        .populate({
        path: 'reviews',
        populate: [
            {
                path: 'user',
            },
        ],
    });
});
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield book_model_1.BookModel.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Book do not exist!');
    }
    const updatedBookData = Object.assign({}, payload);
    const result = yield book_model_1.BookModel.findByIdAndUpdate(id, updatedBookData, {
        new: true,
    })
        .populate('uploadedBy')
        .populate({
        path: 'reviews',
        populate: [
            {
                path: 'user',
            },
        ],
    });
    return result;
});
const addReview = (userId, bookId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield book_model_1.BookModel.findById(bookId);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Book do not exist!');
    }
    const updatedBookData = Object.assign({}, payload);
    updatedBookData.user = userId;
    const result = yield book_model_1.BookModel.findByIdAndUpdate(bookId, {
        $push: {
            reviews: updatedBookData,
        },
    }, {
        new: true,
    })
        .populate('uploadedBy')
        .populate({
        path: 'reviews',
        populate: [
            {
                path: 'user',
            },
        ],
    });
    return result;
});
exports.BookService = {
    addBook,
    getAllBook,
    getSingleBook,
    deleteBook,
    updateBook,
    addReview,
};
