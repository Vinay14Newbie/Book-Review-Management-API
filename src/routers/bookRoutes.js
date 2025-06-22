import express from 'express';
import {
  addBook,
  addReview,
  getBooks,
  getReviews
} from '../controllers/bookController.js';
import { validate } from '../validators/zodValidator.js';
import { zodBookSchema } from '../validators/zodBookSchema.js';
import { zodReviewSchema } from '../validators/zodReviewSchema.js';

const router = express.Router();

router.post('/', validate(zodBookSchema), addBook);

router.get('/', getBooks);

router.post('/:id/reviews', validate(zodReviewSchema), addReview);

router.get('/:id/reviews', getReviews);

export default router;
