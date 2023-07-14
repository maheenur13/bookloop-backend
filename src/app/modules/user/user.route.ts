import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validaterequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.get('/:id', auth(), UserController.getSingleUser);

router.post(
  '/wish-list',
  validateRequest(UserValidation.wishListZonSchema),
  auth(),
  UserController.addToWishList
);

export const UserRoutes = router;
