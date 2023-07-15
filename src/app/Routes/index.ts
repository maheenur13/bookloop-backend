import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BookRoutes } from '../modules/books/book.route';
import { PlanTOReadRoutes } from '../modules/planToRead/planToRead.route';
import { UserRoutes } from '../modules/user/user.route';
import { WishListRoutes } from '../modules/wishList/wishList.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/wish-list',
    route: WishListRoutes,
  },
  {
    path: '/reading-plan',
    route: PlanTOReadRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
