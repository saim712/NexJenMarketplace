// src/components/checkout/OrderSummary.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export const OrderSummary = ({ cart }) => {
  // Calculate totals safely
  const subtotal = cart?.items?.reduce((sum, item) => {
    const price = item.price || item.product?.price || 0;
    const quantity = item.quantity || 1;
    return sum + (price * quantity);
  }, 0) || 0;
  
  const discount = cart?.discount || 0;
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <p className="text-gray-500 text-center">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

      {/* Items */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {cart.items.map((item) => {
          // Safely access product data
          const product = item.product || {};
          const productId = product._id || item.productId;
          const productName = product.name || item.name || 'Product';
          const productImage = product.images?.[0]?.url || product.images?.[0] || item.image || '';
          const itemPrice = item.price || product.price || 0;
          
          return (
            <div key={item._id} className="flex gap-3">
              {productImage ? (
                <img
                  src={productImage}
                  alt={productName}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-gray-400">No image</span>
                </div>
              )}
              <div className="flex-1">
                <Link to={`/product/${productId}`}>
                  <h3 className="font-medium text-gray-900 hover:text-primary-600">
                    {productName}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity} {item.size && `| Size: ${item.size}`} {item.color && `| Color: ${item.color}`}
                </p>
                <p className="text-sm font-semibold text-primary-600">
                  ${(itemPrice * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 pt-4 border-t">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-lg pt-3 border-t">
          <span>Total</span>
          <span className="text-primary-600">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};