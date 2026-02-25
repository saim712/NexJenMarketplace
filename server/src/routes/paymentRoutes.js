// src/routes/paymentRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createPaymentIntent,
  confirmPayment,
  getPaymentMethods,
  setupIntent,
} from '../controllers/paymentController.js';

const router = express.Router();

router.use(protect);

router.post('/create-payment-intent', createPaymentIntent);
router.post('/confirm-payment', confirmPayment);
router.get('/payment-methods', getPaymentMethods);
router.post('/setup-intent', setupIntent);

export default router;