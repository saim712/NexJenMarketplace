// // frontend/src/components/checkout/Checkout.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useCart } from '../../context/CartContext';
// import { useAuth } from '../../context/AuthContext';
// import { orderService } from '../../services/orderService';
// import { StripePayment } from './StripePayment';
// import { ShippingForm } from './ShippingForm';
// // import { OrderSummary } from './OrderSummary';
// import { CheckIcon } from '@heroicons/react/24/outline';

// const steps = ['Shipping', 'Payment'];

// export const Checkout = () => {
//   const navigate = useNavigate();
//   const { cart, totalPrice } = useCart();
//   const { isAuthenticated } = useAuth();
  
//   const [currentStep, setCurrentStep] = useState(0);
//   const [shippingAddress, setShippingAddress] = useState(null);
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate('/account/login');
//     }
    
//     if (!cart || cart.items.length === 0) {
//       navigate('/cart');
//     }
//   }, [isAuthenticated, cart, navigate]);

//   const handleShippingSubmit = async (address) => {
//     try {
//       setLoading(true);
//       setShippingAddress(address);
      
//       // Calculate prices
//       const subtotal = totalPrice;
//       const shipping = subtotal > 100 ? 0 : 10;
//       const tax = subtotal * 0.08;
//       const total = subtotal + shipping + tax;

//       // Create order
//       const orderData = {
//         orderItems: cart.items.map(item => ({
//           product: item.product._id,
//           name: item.product.name,
//           quantity: item.quantity,
//           price: item.price,
//           size: item.size,
//           color: item.color,
//           image: item.product.images[0]?.url || item.product.images[0],
//         })),
//         shippingAddress: address,
//         paymentMethod: 'stripe',
//         itemsPrice: subtotal,
//         shippingPrice: shipping,
//         taxPrice: tax,
//         totalPrice: total,
//       };

//       const response = await orderService.createOrder(orderData);
//       setOrder(response.order);
//       setCurrentStep(1);
//     } catch (error) {
//       console.error('Failed to create order:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePaymentSuccess = (orderId) => {
//     // Navigate to confirmation page
//     navigate(`/order-confirmation/${orderId}`);
//   };

//   if (!cart || cart.items.length === 0) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">Checkout</h1>

//         {/* Progress Steps */}
//         <div className="mb-12">
//           <div className="flex justify-between items-center max-w-md mx-auto">
//             {steps.map((step, index) => (
//               <div key={step} className="flex items-center">
//                 <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                   index <= currentStep
//                     ? 'bg-primary-600 text-white'
//                     : 'bg-gray-200 text-gray-600'
//                 }`}>
//                   {index < currentStep ? (
//                     <CheckIcon className="h-5 w-5" />
//                   ) : (
//                     index + 1
//                   )}
//                 </div>
//                 <span className={`ml-2 font-medium ${
//                   index <= currentStep ? 'text-gray-900' : 'text-gray-500'
//                 }`}>
//                   {step}
//                 </span>
//                 {index < steps.length - 1 && (
//                   <div className={`w-24 h-0.5 mx-4 ${
//                     index < currentStep ? 'bg-primary-600' : 'bg-gray-200'
//                   }`} />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2">
//             {currentStep === 0 && (
//               <ShippingForm onSubmit={handleShippingSubmit} loading={loading} />
//             )}

//             {currentStep === 1 && order && (
//               <StripePayment
//                 orderId={order._id}
//                 amount={order.totalPrice}
//                 onSuccess={handlePaymentSuccess}
//               />
//             )}
//           </div>

//           {/* Order Summary Sidebar */}
//           <div className="lg:col-span-1">
//             {/* <OrderSummary cart={cart} /> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

















// src/components/checkout/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { orderService } from '../../services/orderService';
import { StripePayment } from './StripePayment';
import { ShippingForm } from './ShippingForm';
import { OrderSummary } from './OrderSummary';
import { CheckIcon } from '@heroicons/react/24/outline';

const steps = ['Shipping', 'Payment'];

export const Checkout = () => {
  const navigate = useNavigate();
  const { cart, totalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/account/login');
    }
    
    if (!cart || !cart.items || cart.items.length === 0) {
      navigate('/cart');
    }
  }, [isAuthenticated, cart, navigate]);

// src/components/checkout/Checkout.jsx - Update handleShippingSubmit

const handleShippingSubmit = async (address) => {
  try {
    setLoading(true);
    setShippingAddress(address);
    
    // Calculate prices
    const subtotal = cart.items.reduce((sum, item) => {
      const price = item.price || item.product?.price || 0;
      const quantity = item.quantity || 1;
      return sum + (price * quantity);
    }, 0);
    
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    // Format order items - SIMPLIFIED
    const orderItems = cart.items.map(item => {
      const product = item.product || {};
      
      return {
        product: product._id || item.productId || 'temp-id', // Use a temp ID if missing
        name: product.name || item.name || 'Product',
        quantity: item.quantity || 1,
        price: item.price || product.price || 0,
        size: item.size || null,
        color: item.color || null,
        image: product.images?.[0]?.url || product.images?.[0] || item.image || '',
      };
    });

    const orderData = {
      orderItems,
      shippingAddress: address,
      paymentMethod: 'stripe',
      itemsPrice: subtotal,
      shippingPrice: shipping,
      taxPrice: tax,
      totalPrice: total,
    };

    console.log('Creating order:', orderData);
    
    const response = await orderService.createOrder(orderData);
    console.log('Order created:', response);
    
    setOrder(response.order);
    setCurrentStep(1);
  } catch (error) {
    console.error('Order creation failed:', error);
    alert('Failed to create order. Please try again.');
  } finally {
    setLoading(false);
  }
};
  const handlePaymentSuccess = (orderId) => {
    navigate(`/order-confirmation/${orderId}`);
  };

  // Show loading state
  if (!cart || !cart.items) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  // Redirect if cart is empty
  if (cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-between items-center max-w-md mx-auto">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStep
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {index < currentStep ? (
                    <CheckIcon className="h-5 w-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className={`ml-2 font-medium ${
                  index <= currentStep ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-24 h-0.5 mx-4 ${
                    index < currentStep ? 'bg-primary-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 0 && (
              <ShippingForm onSubmit={handleShippingSubmit} loading={loading} />
            )}

            {currentStep === 1 && order && (
              <StripePayment
                orderId={order._id}
                amount={order.totalPrice}
                onSuccess={handlePaymentSuccess}
              />
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <OrderSummary cart={cart} />
          </div>
        </div>
      </div>
    </div>
  );
};