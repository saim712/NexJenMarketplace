// src/components/cart/CartDrawer.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  XMarkIcon,
  ShoppingBagIcon,
  TrashIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

// Sample cart items
const sampleCartItems = [
  {
    id: '1',
    name: 'Oversized Cotton Blend Sweater',
    brand: 'Essential',
    price: 89.99,
    quantity: 2,
    size: 'M',
    color: 'Black',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27',
    maxQuantity: 5
  },
  {
    id: '2',
    name: 'Slim Fit Denim Jeans',
    brand: 'Denim Co',
    price: 119.99,
    quantity: 1,
    size: '32',
    color: 'Blue',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246',
    maxQuantity: 3
  },
  {
    id: '3',
    name: 'Leather Crossbody Bag',
    brand: 'Luxe',
    price: 199.99,
    quantity: 1,
    size: 'One Size',
    color: 'Brown',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa',
    maxQuantity: 2
  }
];

export const CartDrawer = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState(sampleCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.min(Math.max(1, newQuantity), item.maxQuantity) }
          : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      // Apply 10% discount
      setPromoError('');
      alert('Promo code applied!');
    } else {
      setPromoError('Invalid promo code');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center space-x-2">
                <ShoppingBagIcon className="h-6 w-6 text-primary-600" />
                <h2 className="text-xl font-display font-bold">Your Cart</h2>
                <span className="bg-primary-100 text-primary-600 px-2 py-1 rounded-full text-sm">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBagIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <Link
                    to="/products"
                    onClick={onClose}
                    className="inline-block bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4"
                    >
                      {/* Product Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <p className="text-sm text-gray-500">{item.brand}</p>
                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-600">
                              Size: {item.size} | Color: {item.color}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-bold text-primary-600">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <div className="flex items-center border rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-50"
                            >
                              -
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-50"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t p-6">
                {/* Promo Code */}
                <div className="mb-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code"
                      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-red-500 text-sm mt-1">{promoError}</p>
                  )}
                </div>

                {/* Summary */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span className="text-primary-600">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="block w-full bg-primary-600 text-white py-4 rounded-xl font-semibold text-center hover:bg-primary-700 transition-colors"
                >
                  Proceed to Checkout
                </Link>
                <p className="text-xs text-gray-500 text-center mt-3">
                  Free shipping on orders over $100
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};