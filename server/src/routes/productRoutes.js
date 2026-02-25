// src/routes/productRoutes.js
import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinary.js';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
  getNewArrivals,
  getSaleProducts,
  getFeaturedProducts,
  searchProducts,
  uploadProductImages,
  deleteProductImage,
} from '../controllers/productController.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/search', searchProducts);
router.get('/top', getTopProducts);
router.get('/new-arrivals', getNewArrivals);
router.get('/sale', getSaleProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProductById);

// Protected routes (Admin only)
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

// Image upload routes
router.post(
  '/:id/images',
  protect,
  admin,
  upload.array('images', 10),
  uploadProductImages
);
router.delete('/:id/images/:imageId', protect, admin, deleteProductImage);

// Review routes
router.post('/:id/reviews', protect, createProductReview);

export default router;