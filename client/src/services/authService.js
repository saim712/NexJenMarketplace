// src/services/authService.js
import api from './api';

export const authService = {
  // Login user
  login: async (credentials) => {
    try {
      console.log('authService login called with:', credentials); // Debug
      const response = await api.post('/auth/login', credentials);
      console.log('authService login response:', response.data); // Debug
      return response.data;
    } catch (error) {
      console.error('authService login error:', error.response?.data || error); // Debug
      throw error;
    }
  },

  // Register new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },

  // Change password
  changePassword: async (passwordData) => {
    return await api.put('/users/change-password', passwordData);
  },

  // Forgot password
  forgotPassword: async (email) => {
    return await api.post('/auth/forgot-password', { email });
  },

  // Reset password
  resetPassword: async (token, password) => {
    return await api.put(`/auth/reset-password/${token}`, { password });
  },

  // Verify email
  verifyEmail: async (token) => {
    return await api.get(`/auth/verify-email/${token}`);
  },
};