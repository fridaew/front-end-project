import express from 'express';
import * as bookableModel from '../models/bookableModel';
import { requiresAuth } from '../middleware/auth';

const router = express.Router();

// Reviews routes
router.post('/reviews', bookableModel.createReview);
router.get('/reviews', bookableModel.getReviews);

// Bookables routes
router.post('/', bookableModel.createBookable);
router.get('/', bookableModel.getAllBookables);
router.get('/:id', bookableModel.getBookableById);

// Packages routes
router.post('/packages', bookableModel.createPackages);
router.get('/packages/:packageType', bookableModel.getBookablesByPackageType);

export default router;
