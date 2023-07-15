import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validaterequest';
import { PlanToReadController } from './planToRead.controller';
import { PlanToReadValidation } from './planToRead.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(PlanToReadValidation.planToReadZonSchema),
  auth(),
  PlanToReadController.addPlanToReading
);
router.get('/', auth(), PlanToReadController.getAllPlanToReading);

router.patch(
  '/:id',
  validateRequest(PlanToReadValidation.updateReadingStatusZonSchema),
  auth(),
  PlanToReadController.updateReadingStatus
);

export const PlanTOReadRoutes = router;
