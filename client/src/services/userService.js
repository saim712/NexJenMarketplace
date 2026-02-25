// src/services/userService.js
import api from './api';

export const userService = {
  // Get user profile
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  // Update profile
  updateProfile: async (userData) => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },

  // Add address
  addAddress: async (addressData) => {
    const response = await api.post('/users/addresses', addressData);
    return response.data;
  },

  // Update address
  updateAddress: async (addressId, addressData) => {
    const response = await api.put(`/users/addresses/${addressId}`, addressData);
    return response.data;
  },

  // Delete address
  deleteAddress: async (addressId) => {
    const response = await api.delete(`/users/addresses/${addressId}`);
    return response.data;
  },

  // Set default address
  setDefaultAddress: async (addressId) => {
    const response = await api.put(`/users/addresses/${addressId}/default`);
    return response.data;
  },
};