// // frontend/src/components/checkout/StripePayment.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import api from '../../services/api';
// import { useCart } from '../../context/CartContext';
// import toast from 'react-hot-toast';

// // Load Stripe
// const stripe = window.Stripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// export const StripePayment = ({ orderId, amount, onSuccess }) => {
//   const navigate = useNavigate();
//   const { clearCart } = useCart();
//   const [loading, setLoading] = useState(false);
//   const [cardElement, setCardElement] = useState(null);

//   useEffect(() => {
//     // Create card element
//     if (stripe) {
//       const elements = stripe.elements();
//       const card = elements.create('card', {
//         style: {
//           base: {
//             fontSize: '16px',
//             color: '#424770',
//             '::placeholder': {
//               color: '#aab7c4',
//             },
//           },
//         },
//       });
//       card.mount('#card-element');
//       setCardElement(card);
//     }

//     return () => {
//       if (cardElement) {
//         cardElement.unmount();
//       }
//     };
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Create payment intent on backend
//       const { data } = await api.post('/payments/create-payment-intent', {
//         orderId,
//       });

//       // Confirm the payment
//       const { error, paymentIntent } = await stripe.confirmCardPayment(
//         data.clientSecret,
//         {
//           payment_method: {
//             card: cardElement,
//           },
//         }
//       );

//       if (error) {
//         toast.error(error.message);
//         setLoading(false);
//         return;
//       }

//       if (paymentIntent.status === 'succeeded') {
//         // Confirm payment on backend
//         await api.post('/payments/confirm', {
//           paymentIntentId: paymentIntent.id,
//           orderId,
//         });

//         // Clear cart
//         await clearCart();
        
//         toast.success('Payment successful!');
        
//         // Call onSuccess callback if provided, otherwise navigate directly
//         if (onSuccess) {
//           onSuccess(orderId);
//         } else {
//           navigate(`/order-confirmation/${orderId}`);
//         }
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Payment failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-white rounded-2xl p-6 shadow-sm"
//     >
//       <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Details</h2>
      
//       <form onSubmit={handleSubmit}>
//         <div className="mb-6">
//           <div
//             id="card-element"
//             className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
//           ></div>
//           <p className="text-xs text-gray-500 mt-2">
//             Test cards: 4242 4242 4242 4242 (any future date, any CVC)
//           </p>
//         </div>

//         <div className="border-t pt-4">
//           <div className="flex justify-between mb-4">
//             <span className="font-semibold">Total Amount:</span>
//             <span className="text-xl font-bold text-primary-600">
//               ${amount?.toFixed(2)}
//             </span>
//           </div>

//           <button
//             type="submit"
//             disabled={loading || !cardElement}
//             className="w-full bg-primary-600 text-white py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? 'Processing...' : `Pay $${amount?.toFixed(2)}`}
//           </button>
          
//           <p className="text-xs text-gray-500 text-center mt-3">
//             Your payment is secure and encrypted
//           </p>
//         </div>
//       </form>
//     </motion.div>
//   );
// };














// frontend/src/components/checkout/StripePayment.jsx (alternative version)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../services/api';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

// Load Stripe
const stripe = window.Stripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const StripePayment = ({ orderId, amount, onSuccess }) => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [cardElement, setCardElement] = useState(null);

  useEffect(() => {
    // Create card element
    if (stripe) {
      const elements = stripe.elements();
      const card = elements.create('card', {
        style: {
          base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
              color: '#aab7c4',
            },
          },
        },
      });
      card.mount('#card-element');
      setCardElement(card);
    }

    return () => {
      if (cardElement) {
        cardElement.unmount();
      }
    };
  }, []);

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      // Confirm payment on backend
      await api.post('/payments/confirm', {
        paymentIntentId: paymentIntent.id,
        orderId,
      });

      // Clear cart
      await clearCart();
      
      toast.success('Payment successful!');
      
      // Call onSuccess callback if provided, otherwise navigate directly
      if (onSuccess) {
        onSuccess(orderId);
      } else {
        navigate(`/order-confirmation/${orderId}`);
      }
    } catch (error) {
      toast.error('Payment confirmed but failed to update order');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create payment intent on backend
      const { data } = await api.post('/payments/create-payment-intent', {
        orderId,
      });

      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        await handlePaymentSuccess(paymentIntent);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Payment failed');
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
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Details</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <div
            id="card-element"
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
          ></div>
          <p className="text-xs text-gray-500 mt-2">
            Test cards: 4242 4242 4242 4242 (any future date, any CVC)
          </p>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Total Amount:</span>
            <span className="text-xl font-bold text-primary-600">
              ${amount?.toFixed(2)}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading || !cardElement}
            className="w-full bg-primary-600 text-white py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : `Pay $${amount?.toFixed(2)}`}
          </button>
          
          <p className="text-xs text-gray-500 text-center mt-3">
            Your payment is secure and encrypted
          </p>
        </div>
      </form>
    </motion.div>
  );
};