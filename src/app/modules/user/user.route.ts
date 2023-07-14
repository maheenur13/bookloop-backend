import express from 'express';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/:id', auth(), UserController.getSingleUser);

export const UserRoutes = router;
