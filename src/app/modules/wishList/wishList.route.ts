import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validaterequest';
import { WishListController } from './wishList.controller';
import { WishListValidation } from './wishList.validation';

const router = express.Router();

router.post(
  '/wish-list',
  validateRequest(WishListValidation.wishListZonSchema),
  auth(),
  WishListController.addToWishList
);
router.get('/wish-list', auth(), WishListController.getAllWishList);

export const WishListRoutes = router;
