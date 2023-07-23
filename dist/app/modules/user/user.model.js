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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../../config"));
const userSchema = new mongoose_1.Schema({
    email: {
        unique: true,
        required: true,
        type: String,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
userSchema.statics.isPasswordMatched = function (givenPassword, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(givenPassword, savedPassword);
    });
};
userSchema.statics.isUserExistById = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.UserModel.findOne({ _id: id }, { email: 1, password: 1, _id: 1 });
    });
};
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        //hashing user password
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bcrypt_salt_round));
        next();
    });
});
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
