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
exports.WishListService = void 0;
const wishList_model_1 = require("./wishList.model");
const getAllWishList = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield wishList_model_1.WishListModel.findOne({ user: user })
        .populate('user')
        .populate(['books']);
});
const addToWishList = (user, book) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const isExist = yield wishList_model_1.WishListModel.findOne({
        user: user,
    });
    if (isExist) {
        if (!((_a = isExist.books) === null || _a === void 0 ? void 0 : _a.find((itm) => itm.toString() === book))) {
            yield wishList_model_1.WishListModel.findOneAndUpdate({ user: user }, { $push: { books: book } });
        }
        else {
            const newBooks = [...isExist.books].filter(item => item.toString() !== book);
            yield wishList_model_1.WishListModel.findOneAndUpdate({ user: user }, { $set: { books: newBooks } });
        }
    }
    else {
        yield wishList_model_1.WishListModel.create({ user: user, books: [book] });
    }
    return yield wishList_model_1.WishListModel.findOne({ user: user })
        .populate('user')
        .populate(['books']);
    // return result?.wishList || [];
});
exports.WishListService = {
    addToWishList,
    getAllWishList,
};
