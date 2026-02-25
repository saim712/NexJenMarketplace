// src/services/wishlistService.js
import api from './api';

export const wishlistService = {
  // Get wishlist
  getWishlist: async () => {
    const response = await api.get('/users/wishlist');
    return response.data;
  },

  // Add to wishlist
  addToWishlist: async (productId) => {
    const response = await api.post(`/users/wishlist/${productId}`);
    return response.data;
  },

  // Remove from wishlist
  removeFromWishlist: async (productId) => {
    const response = await api.delete(`/users/wishlist/${productId}`);
    return response.data;
  },
};