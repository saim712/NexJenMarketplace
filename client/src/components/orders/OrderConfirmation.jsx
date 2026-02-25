// frontend/src/components/orders/OrderConfirmation.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { orderService } from '../../services/orderService';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export const OrderConfirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderService.getOrderById(id);
      setOrder(response.order);
    } catch (error) {
      console.error('Failed to load order:', error);
      setError(error.response?.data?.message || 'Failed to load order');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="bg-white rounded-2xl p-8">
              <div className="h-20 w-20 bg-gray-200 rounded-full mx-auto mb-6"></div>
              <div className="h-6 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Order</h2>
            <p className="text-gray-600 mb-6">{error || 'Order not found'}</p>
            <Link
              to="/account"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700"
            >
              Go to My Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-12 text-center">
            <CheckCircleIcon className="h-20 w-20 text-white mx-auto mb-4" />
            <h1 className="text-3xl font-display font-bold text-white mb-2">
              Thank You for Your Order!
            </h1>
            <p className="text-green-100 text-lg">
              Your order has been confirmed and will be shipped soon.
            </p>
          </div>

          {/* Order Details */}
          <div className="p-8">
            {/* Order Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500 mb-1">Order Number</p>
                <p className="font-mono font-semibold text-gray-900">#{order._id.slice(-8)}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500 mb-1">Order Date</p>
                <p className="font-semibold text-gray-900">{formatDate(order.createdAt)}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500 mb-1">Order Status</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.orderStatus)}`}>
                  {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                </span>
              </div>
            </div>

            {/* Payment Status */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Status</h2>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <p className="font-medium text-gray-900 mt-1">
                      {order.paymentMethod === 'stripe' ? 'Credit / Debit Card' : order.paymentMethod}
                    </p>
                  </div>
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </span>
                  </div>
                </div>
                {order.paymentResult?.id && (
                  <p className="text-xs text-gray-400 mt-2">
                    Transaction ID: {order.paymentResult.id}
                  </p>
                )}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h2>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-800 font-medium">{order.shippingAddress.address}</p>
                <p className="text-gray-600">
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p className="text-gray-600">{order.shippingAddress.country}</p>
                <p className="text-gray-600 mt-2">Phone: {order.shippingAddress.phone}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex gap-4 bg-gray-50 rounded-xl p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <Link to={`/product/${item.product}`} className="hover:text-primary-600">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">
                        Quantity: {item.quantity} | Price: ${item.price}
                      </p>
                      {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                      {item.color && <p className="text-sm text-gray-500">Color: {item.color}</p>}
                      <p className="text-sm font-semibold text-primary-600 mt-2">
                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${order.itemsPrice?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{order.shippingPrice === 0 ? 'Free' : `$${order.shippingPrice?.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${order.taxPrice?.toFixed(2)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${order.discount?.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span className="text-primary-600">${order.totalPrice?.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t">
              <Link
                to="/account"
                className="flex-1 bg-primary-600 text-white py-3 rounded-xl font-semibold text-center hover:bg-primary-700 transition-colors"
              >
                View All Orders
              </Link>
              <Link
                to="/products"
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold text-center hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Email Confirmation Note */}
            <p className="text-sm text-gray-500 text-center mt-6">
              A confirmation email has been sent to your email address.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};