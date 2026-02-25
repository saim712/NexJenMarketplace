// src/services/productService.js
import api from './api';

export const productService = {
  // Get all products with filters
  getProducts: async (params = {}) => {
    try {
      const response = await api.get('/products', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get single product
  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Search products
  searchProducts: async (query) => {
    try {
      const response = await api.get('/products/search', { params: { q: query } });
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },

  // Get new arrivals
  getNewArrivals: async () => {
    try {
      const response = await api.get('/products/new-arrivals');
      return response.data;
    } catch (error) {
      console.error('Error fetching new arrivals:', error);
      throw error;
    }
  },

  // Get sale products
  getSaleProducts: async () => {
    try {
      const response = await api.get('/products/sale');
      return response.data;
    } catch (error) {
      console.error('Error fetching sale products:', error);
      throw error;
    }
  },

  // Get featured products
  getFeaturedProducts: async () => {
    try {
      const response = await api.get('/products/featured');
      return response.data;
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
  },

  // Get top rated products
  getTopProducts: async () => {
    try {
      const response = await api.get('/products/top');
      return response.data;
    } catch (error) {
      console.error('Error fetching top products:', error);
      throw error;
    }
  },

  // Create product review
  createReview: async (productId, reviewData) => {
    try {
      const response = await api.post(`/products/${productId}/reviews`, reviewData);
      return response.data;
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  },
};






// frontend/src/services/orderService.js
// import api from './api';

// export const orderService = {
//   // Create new order
//   createOrder: async (orderData) => {
//     const response = await api.post('/orders', orderData);
//     return response.data;
//   },

//   // Get user orders
//   getMyOrders: async (params = {}) => {
//     const response = await api.get('/orders/my-orders', { params });
//     return response.data;
//   },

//   // Get order by ID
//   getOrderById: async (id) => {
//     const response = await api.get(`/orders/${id}`);
//     return response.data;
//   },

//   // Cancel order
//   cancelOrder: async (id, reason) => {
//     const response = await api.put(`/orders/${id}`, { reason });
//     return response.data;
//   },
// };