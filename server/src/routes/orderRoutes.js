// src/routes/orderRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createOrder,
  getMyOrders,
  getOrderById,
} from '../controllers/orderController.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Create new order
router.post('/', createOrder);

// Get logged in user's orders
router.get('/my-orders', getMyOrders);

// Get single order by ID
router.get('/:id', getOrderById);

export default router;