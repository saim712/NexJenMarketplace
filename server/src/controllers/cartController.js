// src/controllers/cartController.js
import asyncHandler from 'express-async-handler';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import Coupon from '../models/Coupon.js';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id })
    .populate({
      path: 'items.product',
      select: 'name brand price images stock',
    });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [],
      totalPrice: 0,
      totalItems: 0,
    });
  }

  res.json({
    success: true,
    cart,
  });
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1, size, color } = req.body;

  // Validate product
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Check stock
  if (product.stock < quantity) {
    res.status(400);
    throw new Error('Insufficient stock');
  }

  // Get price based on size if applicable
  let price = product.price;
  if (size && product.sizes) {
    const sizeOption = product.sizes.find(s => s.size === size);
    if (sizeOption && sizeOption.price) {
      price = sizeOption.price;
    }
  }

  // Find or create cart
  let cart = await Cart.findOne({ user: req.user._id });
  
  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [],
    });
  }

  // Check if item already exists in cart
  const existingItemIndex = cart.items.findIndex(
    item => 
      item.product.toString() === productId && 
      item.size === size && 
      item.color === color
  );

  if (existingItemIndex > -1) {
    // Update existing item quantity
    cart.items[existingItemIndex].quantity += quantity;
    
    // Check stock again
    if (product.stock < cart.items[existingItemIndex].quantity) {
      res.status(400);
      throw new Error('Insufficient stock');
    }
  } else {
    // Add new item
    cart.items.push({
      product: productId,
      quantity,
      size,
      color,
      price,
    });
  }

  await cart.save();

  // Populate product details
  await cart.populate({
    path: 'items.product',
    select: 'name brand price images stock',
  });

  res.status(201).json({
    success: true,
    cart,
  });
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/:itemId
// @access  Private
export const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;

  if (quantity < 1) {
    res.status(400);
    throw new Error('Quantity must be at least 1');
  }

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  const item = cart.items.id(req.params.itemId);
  
  if (!item) {
    res.status(404);
    throw new Error('Item not found in cart');
  }

  // Check stock
  const product = await Product.findById(item.product);
  if (product.stock < quantity) {
    res.status(400);
    throw new Error('Insufficient stock');
  }

  item.quantity = quantity;
  await cart.save();

  await cart.populate({
    path: 'items.product',
    select: 'name brand price images stock',
  });

  res.json({
    success: true,
    cart,
  });
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private
export const removeFromCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  cart.items = cart.items.filter(
    item => item._id.toString() !== req.params.itemId
  );

  await cart.save();

  await cart.populate({
    path: 'items.product',
    select: 'name brand price images stock',
  });

  res.json({
    success: true,
    cart,
  });
});

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    cart.items = [];
    cart.couponCode = undefined;
    cart.discount = 0;
    await cart.save();
  }

  res.json({
    success: true,
    message: 'Cart cleared successfully',
  });
});

// @desc    Apply coupon
// @route   POST /api/cart/coupon
// @access  Private
export const applyCoupon = asyncHandler(async (req, res) => {
  const { code } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  // Find valid coupon
  const coupon = await Coupon.findOne({
    code: code.toUpperCase(),
    isActive: true,
    startDate: { $lte: new Date() },
    endDate: { $gte: new Date() },
  });

  if (!coupon) {
    res.status(400);
    throw new Error('Invalid or expired coupon');
  }

  // Check minimum purchase
  if (cart.totalPrice < coupon.minPurchase) {
    res.status(400);
    throw new Error(`Minimum purchase of $${coupon.minPurchase} required`);
  }

  // Calculate discount
  let discount = 0;
  if (coupon.discountType === 'percentage') {
    discount = (cart.totalPrice * coupon.discountValue) / 100;
    if (coupon.maxDiscount && discount > coupon.maxDiscount) {
      discount = coupon.maxDiscount;
    }
  } else {
    discount = coupon.discountValue;
  }

  cart.couponCode = code.toUpperCase();
  cart.discount = discount;
  await cart.save();

  res.json({
    success: true,
    cart,
    discount,
  });
});

// @desc    Remove coupon
// @route   DELETE /api/cart/coupon
// @access  Private
export const removeCoupon = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  cart.couponCode = undefined;
  cart.discount = 0;
  await cart.save();

  res.json({
    success: true,
    message: 'Coupon removed successfully',
  });
});