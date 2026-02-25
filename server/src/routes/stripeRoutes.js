// backend/src/routes/stripeRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createPaymentIntent,
  confirmPayment,
} from '../controllers/stripeController.js';

const router = express.Router();

// Protected routes
router.post('/create-payment-intent', protect, createPaymentIntent);
router.post('/confirm', protect, confirmPayment);

export default router;