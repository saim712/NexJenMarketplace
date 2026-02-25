// src/models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters'],
  },
  brand: {
    type: String,
    required: [true, 'Please provide brand name'],
  },
  description: {
    type: String,
    required: [true, 'Please provide product description'],
    maxlength: [2000, 'Description cannot exceed 2000 characters'],
  },
  category: {
    type: String,
    required: [true, 'Please select category'],
    enum: ['women', 'men', 'kids', 'accessories', 'footwear'],
  },
  subcategory: {
    type: String,
    required: [true, 'Please select subcategory'],
  },
  type: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, 'Please provide price'],
    min: [0, 'Price cannot be negative'],
  },
  originalPrice: {
    type: Number,
    min: [0, 'Price cannot be negative'],
  },
  images: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
      isPrimary: { type: Boolean, default: false },
    },
  ],
  colors: [
    {
      name: { type: String, required: true },
      code: { type: String, required: true },
      images: [{ type: String }],
    },
  ],
  sizes: [
    {
      size: { type: String, required: true },
      stock: { type: Number, required: true, default: 0 },
      price: { type: Number },
    },
  ],
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'Stock cannot be negative'],
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be below 0'],
    max: [5, 'Rating cannot exceed 5'],
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      name: { type: String, required: true },
      rating: { type: Number, required: true, min: 1, max: 5 },
      comment: { type: String, required: true },
      images: [{ type: String }],
      createdAt: { type: Date, default: Date.now },
    },
  ],
  isNew: {
    type: Boolean,
    default: false,
  },
  isSale: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  tags: [String],
  sku: {
    type: String,
    unique: true,
    required: true,
  },
  specifications: {
    type: Map,
    of: String,
  },
}, {
  timestamps: true,
});

// Index for search
productSchema.index({ name: 'text', description: 'text', brand: 'text' });

export default mongoose.model('Product', productSchema);