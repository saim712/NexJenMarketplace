// src/models/Cart.js
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity cannot be less than 1'],
        default: 1,
      },
      size: String,
      color: String,
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
  totalItems: {
    type: Number,
    default: 0,
  },
  couponCode: String,
  discount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Calculate totals before saving
cartSchema.pre('save', async function(next) {
  let total = 0;
  let items = 0;
  
  for (const item of this.items) {
    total += item.price * item.quantity;
    items += item.quantity;
  }
  
  this.totalPrice = total;
  this.totalItems = items;
  next();
});

export default mongoose.model('Cart', cartSchema);