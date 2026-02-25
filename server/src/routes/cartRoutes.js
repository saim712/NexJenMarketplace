// src/routes/cartRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  applyCoupon,
  removeCoupon,
} from '../controllers/cartController.js';

const router = express.Router();

router.use(protect); // All cart routes are protected

router.route('/')
  .get(getCart)
  .post(addToCart)
  .delete(clearCart);

router.route('/:itemId')
  .put(updateCartItem)
  .delete(removeFromCart);

router.post('/coupon', applyCoupon);
router.delete('/coupon', removeCoupon);

export default router;