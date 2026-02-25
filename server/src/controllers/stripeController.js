// backend/src/controllers/stripeController.js
import Stripe from 'stripe';
import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';

// Initialize Stripe with just the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create payment intent
// @route   POST /api/payments/create-payment-intent
// @access  Private
export const createPaymentIntent = asyncHandler(async (req, res) => {
  const { orderId } = req.body;

  // Get order details
  const order = await Order.findById(orderId);
  
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Check if order belongs to user
  if (order.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized');
  }

  // Create payment intent with just the amount
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(order.totalPrice * 100), // Convert to cents
    currency: 'usd',
    metadata: {
      orderId: order._id.toString(),
      userId: req.user._id.toString(),
    },
  });

  res.json({
    success: true,
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  });
});

// @desc    Confirm payment and update order
// @route   POST /api/payments/confirm
// @access  Private
export const confirmPayment = asyncHandler(async (req, res) => {
  const { paymentIntentId, orderId } = req.body;

  // Retrieve payment intent from Stripe
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  if (paymentIntent.status === 'succeeded') {
    // Update order status
    const order = await Order.findById(orderId);
    
    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }

    order.paymentStatus = 'completed';
    order.paymentResult = {
      id: paymentIntent.id,
      status: paymentIntent.status,
      update_time: new Date().toISOString(),
    };

    await order.save();

    res.json({
      success: true,
      message: 'Payment confirmed successfully',
      order,
    });
  } else {
    res.status(400);
    throw new Error('Payment not successful');
  }
});