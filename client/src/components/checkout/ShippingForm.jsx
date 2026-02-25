// frontend/src/components/checkout/ShippingForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';
import toast from 'react-hot-toast';

export const ShippingForm = ({ onSubmit, loading: externalLoading }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    country: 'USA',
    zipCode: '',
    phone: user?.phone || '',
  });
  const [saveAddress, setSaveAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    
    // Phone validation (simple)
    const phoneRegex = /^\+?[\d\s\-()]{7,20}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    // ZIP code validation (simple for USA)
    if (formData.country === 'USA') {
      const zipRegex = /^\d{5}(-\d{4})?$/;
      if (formData.zipCode && !zipRegex.test(formData.zipCode)) {
        newErrors.zipCode = 'Please enter a valid ZIP code';
      }
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fix the errors in the form');
      return;
    }

    try {
      setLoading(true);
      
      // Save address to user account if checkbox is checked
      if (saveAddress) {
        await userService.addAddress(formData);
        toast.success('Address saved to your account');
      }
      
      // Pass shipping data to parent component
      onSubmit(formData);
      
    } catch (error) {
      console.error('Shipping form error:', error);
      toast.error(error.response?.data?.message || 'Failed to process shipping information');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Address</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Street Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Street Address *
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.address ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="123 Main St, Apt 4B"
            disabled={loading || externalLoading}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-500">{errors.address}</p>
          )}
        </div>

        {/* City and State */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.city ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="New York"
              disabled={loading || externalLoading}
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-500">{errors.city}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State *
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.state ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="NY"
              disabled={loading || externalLoading}
            />
            {errors.state && (
              <p className="mt-1 text-sm text-red-500">{errors.state}</p>
            )}
          </div>
        </div>

        {/* ZIP Code and Country */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ZIP Code *
            </label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.zipCode ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="10001"
              disabled={loading || externalLoading}
            />
            {errors.zipCode && (
              <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              disabled={loading || externalLoading}
            >
              <option value="USA">United States</option>
              <option value="Canada">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Japan">Japan</option>
            </select>
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.phone ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="+1 234 567 8900"
            disabled={loading || externalLoading}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            For delivery questions and updates
          </p>
        </div>

        {/* Save Address Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="saveAddress"
            checked={saveAddress}
            onChange={(e) => setSaveAddress(e.target.checked)}
            className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
            disabled={loading || externalLoading}
          />
          <label htmlFor="saveAddress" className="ml-2 text-sm text-gray-600">
            Save this address to my account for future orders
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || externalLoading}
          className="w-full bg-primary-600 text-white py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
        >
          {loading || externalLoading ? 'Processing...' : 'Continue to Payment'}
        </button>
      </form>

      {/* Help Text */}
      <p className="text-xs text-gray-400 text-center mt-4">
        We'll use this information to ship your order and provide tracking updates
      </p>
    </motion.div>
  );
};