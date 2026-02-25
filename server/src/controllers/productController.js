// src/controllers/productController.js
import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';
import { cloudinary } from '../config/cloudinary.js';

// @desc    Get all products with filtering, sorting, pagination
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const { 
    category, 
    subcategory, 
    type,
    minPrice, 
    maxPrice, 
    sizes, 
    colors,
    brand,
    rating,
    sort,
    page = 1,
    limit = 10
  } = req.query;

  // Build filter object
  const filter = {};

  if (category) filter.category = category;
  if (subcategory) filter.subcategory = subcategory;
  if (type) filter.type = type;
  if (brand) filter.brand = brand;
  if (rating) filter.rating = { $gte: Number(rating) };

  // Price range filter
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  // Size filter
  if (sizes) {
    const sizeArray = sizes.split(',');
    filter['sizes.size'] = { $in: sizeArray };
  }

  // Color filter
  if (colors) {
    const colorArray = colors.split(',');
    filter['colors.code'] = { $in: colorArray };
  }

  // Build sort object
  const sortOptions = {};
  if (sort) {
    switch (sort) {
      case 'price-low':
        sortOptions.price = 1;
        break;
      case 'price-high':
        sortOptions.price = -1;
        break;
      case 'newest':
        sortOptions.createdAt = -1;
        break;
      case 'rating':
        sortOptions.rating = -1;
        break;
      default:
        sortOptions.createdAt = -1;
    }
  }

  // Pagination
  const skip = (page - 1) * limit;

  // Execute query
  const products = await Product.find(filter)
    .sort(sortOptions)
    .limit(Number(limit))
    .skip(skip)
    .populate('reviews.user', 'name avatar');

  // Get total count for pagination
  const total = await Product.countDocuments(filter);

  res.json({
    success: true,
    products,
    pagination: {
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      itemsPerPage: Number(limit),
    },
  });
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate('reviews.user', 'name avatar');

  if (product) {
    res.json({
      success: true,
      product,
    });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create({
    ...req.body,
    sku: `PRD-${Date.now()}`,
  });

  res.status(201).json({
    success: true,
    product,
  });
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.json({
    success: true,
    product: updatedProduct,
  });
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Delete images from Cloudinary
  for (const image of product.images) {
    await cloudinary.uploader.destroy(image.public_id);
  }

  await product.deleteOne();

  res.json({
    success: true,
    message: 'Product deleted successfully',
  });
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Check if user already reviewed
  const alreadyReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    res.status(400);
    throw new Error('Product already reviewed');
  }

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  product.reviews.push(review);
  product.numReviews = product.reviews.length;

  // Calculate average rating
  product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

  await product.save();

  res.status(201).json({
    success: true,
    message: 'Review added successfully',
    review,
  });
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
    .sort({ rating: -1 })
    .limit(5);

  res.json({
    success: true,
    products,
  });
});

// @desc    Get new arrivals
// @route   GET /api/products/new-arrivals
// @access  Public
export const getNewArrivals = asyncHandler(async (req, res) => {
  const products = await Product.find({ isNew: true })
    .sort({ createdAt: -1 })
    .limit(10);

  res.json({
    success: true,
    products,
  });
});

// @desc    Get sale products
// @route   GET /api/products/sale
// @access  Public
export const getSaleProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isSale: true })
    .sort({ discount: -1 })
    .limit(10);

  res.json({
    success: true,
    products,
  });
});

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isFeatured: true })
    .limit(8);

  res.json({
    success: true,
    products,
  });
});

// @desc    Search products
// @route   GET /api/products/search
// @access  Public
export const searchProducts = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (!q) {
    res.status(400);
    throw new Error('Please provide search query');
  }

  const products = await Product.find({
    $text: { $search: q },
  })
    .limit(20);

  res.json({
    success: true,
    results: products.length,
    products,
  });
});

// @desc    Upload product images
// @route   POST /api/products/:id/images
// @access  Private/Admin
export const uploadProductImages = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const images = req.files.map(file => ({
    public_id: file.filename,
    url: file.path,
    isPrimary: product.images.length === 0, // First image is primary
  }));

  product.images.push(...images);
  await product.save();

  res.json({
    success: true,
    images: product.images,
  });
});

// @desc    Delete product image
// @route   DELETE /api/products/:id/images/:imageId
// @access  Private/Admin
export const deleteProductImage = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const image = product.images.id(req.params.imageId);

  if (!image) {
    res.status(404);
    throw new Error('Image not found');
  }

  // Delete from Cloudinary
  await cloudinary.uploader.destroy(image.public_id);

  // Remove from database
  image.deleteOne();
  await product.save();

  res.json({
    success: true,
    message: 'Image deleted successfully',
  });
});