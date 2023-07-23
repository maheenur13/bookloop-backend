"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const book_route_1 = require("../modules/books/book.route");
const planToRead_route_1 = require("../modules/planToRead/planToRead.route");
const user_route_1 = require("../modules/user/user.route");
const wishList_route_1 = require("../modules/wishList/wishList.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/books',
        route: book_route_1.BookRoutes,
    },
    {
        path: '/wish-list',
        route: wishList_route_1.WishListRoutes,
    },
    {
        path: '/reading-plan',
        route: planToRead_route_1.PlanTOReadRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
