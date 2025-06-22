import express from 'express';
import { addBook, getBooks } from '../controllers/bookController.js';
import { validate } from '../validators/zodValidator.js';
import { zodBookSchema } from '../validators/zodBookSchema.js';

const router = express.Router();

router.post('/', validate(zodBookSchema), addBook);

router.get('/', getBooks);

export default router;
