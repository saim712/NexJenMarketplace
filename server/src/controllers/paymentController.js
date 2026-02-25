// src/controllers/paymentController.js
import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import Order from '../models/Order.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create payment intent
// @route   POST /api/payments/create-payment-intent
// @access  Private
export const createPaymentIntent = asyncHandler(async (req, res) => {
  const { orderId } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Create payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(order.totalPrice * 100), // Convert to cents
    currency: 'usd',
    metadata: {
      orderId: order._id.toString(),
      userId: req.user._id.toString(),
    },
    receipt_email: req.user.email,
  });

  res.json({
    success: true,
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  });
});

// @desc    Confirm payment
// @route   POST /api/payments/confirm-payment
// @access  Private
export const confirmPayment = asyncHandler(async (req, res) => {
  const { paymentIntentId, orderId } = req.body;

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  if (paymentIntent.status === 'succeeded') {
    const order = await Order.findById(orderId);
    
    order.paymentStatus = 'completed';
    order.paymentResult = {
      id: paymentIntent.id,
      status: paymentIntent.status,
      update_time: new Date().toISOString(),
      email_address: req.user.email,
    };

    await order.save();

    res.json({
      success: true,
      message: 'Payment confirmed successfully',
    });
  } else {
    res.status(400);
    throw new Error('Payment not successful');
  }
});

// @desc    Get user's payment methods
// @route   GET /api/payments/payment-methods
// @access  Private
export const getPaymentMethods = asyncHandler(async (req, res) => {
  // This would require storing Stripe customer IDs
  // For now, return empty array
  res.json({
    success: true,
    paymentMethods: [],
  });
});

// @desc    Create setup intent for saving payment methods
// @route   POST /api/payments/setup-intent
// @access  Private
export const setupIntent = asyncHandler(async (req, res) => {
  const setupIntent = await stripe.setupIntents.create();

  res.json({
    success: true,
    clientSecret: setupIntent.client_secret,
  });
});




// In src/controllers/paymentController.js - Update createPaymentIntent

// @desc    Create payment intent
// @route   POST /api/payments/create-payment-intent
// @access  Private
// export const createPaymentIntent = asyncHandler(async (req, res) => {
//   const { orderId } = req.body;

//   const order = await Order.findById(orderId);

//   if (!order) {
//     res.status(404);
//     throw new Error('Order not found');
//   }

//   // For development without Stripe, return mock response
//   if (process.env.NODE_ENV === 'development' && !process.env.STRIPE_SECRET_KEY) {
//     return res.json({
//       success: true,
//       clientSecret: 'mock_client_secret_for_development',
//       paymentIntentId: 'mock_payment_intent_id',
//       message: 'Development mode - mock payment intent created',
//     });
//   }

//   // Real Stripe integration
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(order.totalPrice * 100),
//       currency: 'usd',
//       metadata: {
//         orderId: order._id.toString(),
//         userId: req.user._id.toString(),
//       },
//       receipt_email: req.user.email,
//     });

//     res.json({
//       success: true,
//       clientSecret: paymentIntent.client_secret,
//       paymentIntentId: paymentIntent.id,
//     });
//   } catch (error) {
//     res.status(500);
//     throw new Error(`Stripe error: ${error.message}`);
//   }
// });