// src/context/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { cartService } from '../services/cartService';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const { isAuthenticated } = useAuth();

  // Load cart when user authenticates
  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      setCart(null);
      setItemCount(0);
      setTotalPrice(0);
    }
  }, [isAuthenticated]);

  const loadCart = async () => {
    try {
      setLoading(true);
      const response = await cartService.getCart();
      setCart(response.cart);
      setItemCount(response.cart.totalItems || 0);
      setTotalPrice(response.cart.totalPrice || 0);
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1, size, color) => {
    try {
      setLoading(true);
      const response = await cartService.addToCart({ productId, quantity, size, color });
      setCart(response.cart);
      setItemCount(response.cart.totalItems);
      setTotalPrice(response.cart.totalPrice);
      toast.success('Added to cart!');
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      setLoading(true);
      const response = await cartService.updateCartItem(itemId, quantity);
      setCart(response.cart);
      setItemCount(response.cart.totalItems);
      setTotalPrice(response.cart.totalPrice);
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update cart');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      setLoading(true);
      const response = await cartService.removeFromCart(itemId);
      setCart(response.cart);
      setItemCount(response.cart.totalItems);
      setTotalPrice(response.cart.totalPrice);
      toast.success('Item removed from cart');
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to remove item');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      await cartService.clearCart();
      setCart(null);
      setItemCount(0);
      setTotalPrice(0);
      toast.success('Cart cleared');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to clear cart');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const applyCoupon = async (code) => {
    try {
      const response = await cartService.applyCoupon(code);
      setCart(response.cart);
      setTotalPrice(response.cart.totalPrice);
      toast.success('Coupon applied!');
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid coupon');
      throw error;
    }
  };

  const removeCoupon = async () => {
    try {
      const response = await cartService.removeCoupon();
      setCart(response.cart);
      setTotalPrice(response.cart.totalPrice);
      toast.success('Coupon removed');
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to remove coupon');
      throw error;
    }
  };

  const value = {
    cart,
    loading,
    itemCount,
    totalPrice,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
    loadCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};