import express from 'express';
import bookRouter from './bookRoutes.js';
const router = express.Router();

router.use('/books', bookRouter);

export default router;
