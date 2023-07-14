import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validaterequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';

const router = express.Router();

router.get('/', BookController.getAllBooks);

router.post(
  '/',
  validateRequest(BookValidation.addBookZodSchema),
  auth(),
  BookController.addBook
);

router.patch(
  '/:id',
  validateRequest(BookValidation.updateBookZodSchema),
  auth(),
  BookController.updateBook
);
router.get('/:id', auth(), BookController.getSingleBook);
router.delete('/:id', auth(), BookController.deleteBook);

export const BookRoutes = router;
