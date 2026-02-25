// src/controllers/userController.js
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import { cloudinary } from '../config/cloudinary.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');

  // Get user stats
  const orderCount = await Order.countDocuments({ user: user._id });
  const totalSpent = await Order.aggregate([
    { $match: { user: user._id, paymentStatus: 'completed' } },
    { $group: { _id: null, total: { $sum: '$totalPrice' } } },
  ]);

  res.json({
    success: true,
    user,
    stats: {
      orderCount,
      totalSpent: totalSpent[0]?.total || 0,
      memberSince: user.createdAt,
    },
  });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.phone = req.body.phone || user.phone;

  // Check if email is being changed
  if (req.body.email && req.body.email !== user.email) {
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      res.status(400);
      throw new Error('Email already exists');
    }
    user.emailVerified = false;
  }

  // Handle avatar upload
  if (req.body.avatar) {
    if (user.avatar && user.avatar !== 'default-avatar.jpg') {
      // Delete old avatar from Cloudinary
      const publicId = user.avatar.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }
    user.avatar = req.body.avatar;
  }

  const updatedUser = await user.save();

  res.json({
    success: true,
    user: {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      avatar: updatedUser.avatar,
      phone: updatedUser.phone,
      addresses: updatedUser.addresses,
      emailVerified: updatedUser.emailVerified,
    },
  });
});

// @desc    Delete user account
// @route   DELETE /api/users/profile
// @access  Private
export const deleteUserAccount = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Delete user avatar from Cloudinary
  if (user.avatar && user.avatar !== 'default-avatar.jpg') {
    const publicId = user.avatar.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(publicId);
  }

  await user.deleteOne();

  res.json({
    success: true,
    message: 'Account deleted successfully',
  });
});

// @desc    Change password
// @route   PUT /api/users/change-password
// @access  Private
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select('+password');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Check current password
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    res.status(401);
    throw new Error('Current password is incorrect');
  }

  user.password = newPassword;
  await user.save();

  res.json({
    success: true,
    message: 'Password changed successfully',
  });
});

// @desc    Add address
// @route   POST /api/users/addresses
// @access  Private
export const addAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const newAddress = {
    ...req.body,
    isDefault: user.addresses.length === 0, // First address is default
  };

  user.addresses.push(newAddress);
  await user.save();

  res.status(201).json({
    success: true,
    address: user.addresses[user.addresses.length - 1],
  });
});

// @desc    Update address
// @route   PUT /api/users/addresses/:addressId
// @access  Private
export const updateAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const address = user.addresses.id(req.params.addressId);

  if (!address) {
    res.status(404);
    throw new Error('Address not found');
  }

  Object.assign(address, req.body);
  await user.save();

  res.json({
    success: true,
    address,
  });
});

// @desc    Delete address
// @route   DELETE /api/users/addresses/:addressId
// @access  Private
export const deleteAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const address = user.addresses.id(req.params.addressId);

  if (!address) {
    res.status(404);
    throw new Error('Address not found');
  }

  // If deleting default address, set another as default
  if (address.isDefault && user.addresses.length > 1) {
    const remainingAddresses = user.addresses.filter(
      addr => addr._id.toString() !== req.params.addressId
    );
    remainingAddresses[0].isDefault = true;
  }

  address.deleteOne();
  await user.save();

  res.json({
    success: true,
    message: 'Address deleted successfully',
  });
});

// @desc    Set default address
// @route   PUT /api/users/addresses/:addressId/default
// @access  Private
export const setDefaultAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Remove default from all addresses
  user.addresses.forEach(addr => {
    addr.isDefault = false;
  });

  // Set new default
  const address = user.addresses.id(req.params.addressId);
  if (!address) {
    res.status(404);
    throw new Error('Address not found');
  }

  address.isDefault = true;
  await user.save();

  res.json({
    success: true,
    address,
  });
});

// @desc    Get wishlist
// @route   GET /api/users/wishlist
// @access  Private
export const getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate({
      path: 'wishlist',
      select: 'name brand price images rating stock isNew isSale',
    });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json({
    success: true,
    wishlist: user.wishlist || [],
  });
});

// @desc    Add to wishlist
// @route   POST /api/users/wishlist/:productId
// @access  Private
export const addToWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const product = await Product.findById(req.params.productId);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Initialize wishlist if it doesn't exist
  if (!user.wishlist) {
    user.wishlist = [];
  }

  if (user.wishlist.includes(product._id)) {
    res.status(400);
    throw new Error('Product already in wishlist');
  }

  user.wishlist.push(product._id);
  await user.save();

  res.json({
    success: true,
    message: 'Product added to wishlist',
    wishlist: user.wishlist,
  });
});

// @desc    Remove from wishlist
// @route   DELETE /api/users/wishlist/:productId
// @access  Private
export const removeFromWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user.wishlist) {
    user.wishlist = [];
  }

  user.wishlist = user.wishlist.filter(
    id => id.toString() !== req.params.productId
  );

  await user.save();

  res.json({
    success: true,
    message: 'Product removed from wishlist',
    wishlist: user.wishlist,
  });
});

// @desc    Get all users (admin)
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const users = await User.find({})
    .select('-password')
    .limit(Number(limit))
    .skip((page - 1) * limit);

  const total = await User.countDocuments();

  res.json({
    success: true,
    users,
    pagination: {
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    },
  });
});

// @desc    Get user by ID (admin)
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json({
    success: true,
    user,
  });
});

// @desc    Update user (admin)
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.role = req.body.role || user.role;
  user.phone = req.body.phone || user.phone;

  const updatedUser = await user.save();

  res.json({
    success: true,
    user: {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      phone: updatedUser.phone,
    },
  });
});

// @desc    Delete user (admin)
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (user.role === 'admin') {
    res.status(400);
    throw new Error('Cannot delete admin user');
  }

  await user.deleteOne();

  res.json({
    success: true,
    message: 'User deleted successfully',
  });
});