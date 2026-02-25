// src/services/cartService.js
import api from './api';

export const cartService = {
  // Get user cart
  getCart: async () => {
    const response = await api.get('/cart');
    return response.data;
  },

  // Add item to cart
  addToCart: async (itemData) => {
    const response = await api.post('/cart', itemData);
    return response.data;
  },

  // Update cart item quantity
  updateCartItem: async (itemId, quantity) => {
    const response = await api.put(`/cart/${itemId}`, { quantity });
    return response.data;
  },

  // Remove item from cart
  removeFromCart: async (itemId) => {
    const response = await api.delete(`/cart/${itemId}`);
    return response.data;
  },

  // Clear cart
  clearCart: async () => {
    const response = await api.delete('/cart');
    return response.data;
  },

  // Apply coupon
  applyCoupon: async (code) => {
    const response = await api.post('/cart/coupon', { code });
    return response.data;
  },

  // Remove coupon
  removeCoupon: async () => {
    const response = await api.delete('/cart/coupon');
    return response.data;
  },
};