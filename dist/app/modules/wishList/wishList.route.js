"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validaterequest_1 = __importDefault(require("../../middlewares/validaterequest"));
const wishList_controller_1 = require("./wishList.controller");
const wishList_validation_1 = require("./wishList.validation");
const router = express_1.default.Router();
router.post('/', (0, validaterequest_1.default)(wishList_validation_1.WishListValidation.wishListZonSchema), (0, auth_1.default)(), wishList_controller_1.WishListController.addToWishList);
router.get('/', (0, auth_1.default)(), wishList_controller_1.WishListController.getAllWishList);
exports.WishListRoutes = router;
