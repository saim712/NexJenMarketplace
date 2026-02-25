// // src/components/cart/Cart.jsx
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useCart } from '../../context/CartContext';
// import { useAuth } from '../../context/AuthContext';
// import { TrashIcon, ArrowLeftIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

// export const Cart = () => {
//   const navigate = useNavigate();
//   const { cart, loading, updateQuantity, removeFromCart, applyCoupon, removeCoupon } = useCart();
//   const { isAuthenticated } = useAuth();
//   const [couponCode, setCouponCode] = useState('');
//   const [applyingCoupon, setApplyingCoupon] = useState(false);

//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <ShoppingBagIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login to View Cart</h2>
//           <p className="text-gray-600 mb-8">You need to be logged in to access your shopping cart.</p>
//           <Link
//             to="/account/login"
//             className="inline-block bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700"
//           >
//             Login
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="animate-pulse">
//             <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
//             <div className="space-y-4">
//               {[...Array(3)].map((_, i) => (
//                 <div key={i} className="bg-white rounded-2xl p-6">
//                   <div className="flex gap-6">
//                     <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
//                     <div className="flex-1">
//                       <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//                       <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!cart || cart.items.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <ShoppingBagIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
//           <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
//           <Link
//             to="/products"
//             className="inline-block bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700"
//           >
//             Continue Shopping
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const handleApplyCoupon = async () => {
//     if (!couponCode.trim()) return;
//     setApplyingCoupon(true);
//     try {
//       await applyCoupon(couponCode);
//       setCouponCode('');
//     } finally {
//       setApplyingCoupon(false);
//     }
//   };

//   const subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   const discount = cart.discount || 0;
//   const shipping = subtotal > 100 ? 0 : 10;
//   const tax = (subtotal - discount) * 0.08;
//   const total = subtotal - discount + shipping + tax;

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">Shopping Cart</h1>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Cart Items */}
//           <div className="lg:col-span-2 space-y-4">
//             {cart.items.map((item) => (
//               <motion.div
//                 key={item._id}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
//               >
//                 <div className="flex gap-6">
//                   {/* Product Image */}
//                   <Link to={`/product/${item.product._id}`}>
//                     <img
//                       src={item.product.images[0]?.url || item.product.images[0]}
//                       alt={item.product.name}
//                       className="w-24 h-24 object-cover rounded-lg"
//                     />
//                   </Link>

//                   {/* Product Details */}
//                   <div className="flex-1">
//                     <div className="flex justify-between">
//                       <div>
//                         <Link to={`/product/${item.product._id}`}>
//                           <h3 className="font-semibold text-gray-900 hover:text-primary-600">
//                             {item.product.name}
//                           </h3>
//                         </Link>
//                         <p className="text-sm text-gray-500 mt-1">{item.product.brand}</p>
//                         {item.size && (
//                           <p className="text-sm text-gray-600">Size: {item.size}</p>
//                         )}
//                         {item.color && (
//                           <p className="text-sm text-gray-600">Color: {item.color}</p>
//                         )}
//                       </div>
//                       <button
//                         onClick={() => removeFromCart(item._id)}
//                         className="text-gray-400 hover:text-red-500 transition-colors"
//                       >
//                         <TrashIcon className="h-5 w-5" />
//                       </button>
//                     </div>

//                     <div className="flex items-center justify-between mt-4">
//                       <div className="flex items-center border rounded-lg">
//                         <button
//                           onClick={() => updateQuantity(item._id, item.quantity - 1)}
//                           className="w-8 h-8 flex items-center justify-center hover:bg-gray-50"
//                         >
//                           -
//                         </button>
//                         <span className="w-8 text-center">{item.quantity}</span>
//                         <button
//                           onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                           className="w-8 h-8 flex items-center justify-center hover:bg-gray-50"
//                         >
//                           +
//                         </button>
//                       </div>
//                       <p className="font-bold text-primary-600">
//                         ${(item.price * item.quantity).toFixed(2)}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}

//             <div className="flex justify-between items-center pt-4">
//               <Link
//                 to="/products"
//                 className="flex items-center text-primary-600 hover:text-primary-700"
//               >
//                 <ArrowLeftIcon className="h-4 w-4 mr-2" />
//                 Continue Shopping
//               </Link>
//             </div>
//           </div>

//           {/* Order Summary */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

//               {/* Coupon Code */}
//               <div className="mb-6">
//                 <div className="flex gap-2">
//                   <input
//                     type="text"
//                     value={couponCode}
//                     onChange={(e) => setCouponCode(e.target.value)}
//                     placeholder="Coupon code"
//                     className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
//                   />
//                   <button
//                     onClick={handleApplyCoupon}
//                     disabled={applyingCoupon || !couponCode.trim()}
//                     className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
//                   >
//                     {applyingCoupon ? 'Applying...' : 'Apply'}
//                   </button>
//                 </div>
//                 {cart.couponCode && (
//                   <div className="mt-2 flex items-center justify-between text-sm">
//                     <span className="text-green-600">Coupon applied: {cart.couponCode}</span>
//                     <button
//                       onClick={removeCoupon}
//                       className="text-red-500 hover:text-red-600"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* Price Breakdown */}
//               <div className="space-y-3 mb-6">
//                 <div className="flex justify-between text-gray-600">
//                   <span>Subtotal</span>
//                   <span>${subtotal.toFixed(2)}</span>
//                 </div>
//                 {discount > 0 && (
//                   <div className="flex justify-between text-green-600">
//                     <span>Discount</span>
//                     <span>-${discount.toFixed(2)}</span>
//                   </div>
//                 )}
//                 <div className="flex justify-between text-gray-600">
//                   <span>Shipping</span>
//                   <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
//                 </div>
//                 <div className="flex justify-between text-gray-600">
//                   <span>Tax (8%)</span>
//                   <span>${tax.toFixed(2)}</span>
//                 </div>
//                 <div className="border-t pt-3">
//                   <div className="flex justify-between font-bold text-lg">
//                     <span>Total</span>
//                     <span className="text-primary-600">${total.toFixed(2)}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Checkout Button */}
//               <Link
//                 to="/checkout"
//                 className="block w-full bg-primary-600 text-white py-4 rounded-xl font-semibold text-center hover:bg-primary-700 transition-colors"
//               >
//                 Proceed to Checkout
//               </Link>

//               <p className="text-xs text-gray-500 text-center mt-3">
//                 Free shipping on orders over $100
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
























// src/components/cart/Cart.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { TrashIcon, ArrowLeftIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

export const Cart = () => {
  const navigate = useNavigate();
  const { cart, loading, updateQuantity, removeFromCart, applyCoupon, removeCoupon } = useCart();
  const { isAuthenticated } = useAuth();
  const [couponCode, setCouponCode] = useState('');
  const [applyingCoupon, setApplyingCoupon] = useState(false);

  

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShoppingBagIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login to View Cart</h2>
          <p className="text-gray-600 mb-8">You need to be logged in to access your shopping cart.</p>
          <Link
            to="/account/login"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6">
                  <div className="flex gap-6">
                    <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Check if cart exists and has items
  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShoppingBagIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link
            to="/products"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Calculate totals safely
  const subtotal = cart.items.reduce((sum, item) => {
    const price = item.price || item.product?.price || 0;
    const quantity = item.quantity || 1;
    return sum + (price * quantity);
  }, 0);
  
  const discount = cart.discount || 0;
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setApplyingCoupon(true);
    try {
      await applyCoupon(couponCode);
      setCouponCode('');
    } catch (error) {
      console.error('Failed to apply coupon:', error);
    } finally {
      setApplyingCoupon(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => {
              // Safely access product data
              const product = item.product || {};
              const productId = product._id || item.productId;
              const productName = product.name || item.name || 'Product';
              const productBrand = product.brand || item.brand || '';
              const productImage = product.images?.[0]?.url || product.images?.[0] || item.image || '';
              const itemPrice = item.price || product.price || 0;
              
              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <Link to={`/product/${productId}`}>
                      <img
                        src={productImage}
                        alt={productName}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <Link to={`/product/${productId}`}>
                            <h3 className="font-semibold text-gray-900 hover:text-primary-600">
                              {productName}
                            </h3>
                          </Link>
                          {productBrand && (
                            <p className="text-sm text-gray-500 mt-1">{productBrand}</p>
                          )}
                          {item.size && (
                            <p className="text-sm text-gray-600">Size: {item.size}</p>
                          )}
                          {item.color && (
                            <p className="text-sm text-gray-600">Color: {item.color}</p>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-bold text-primary-600">
                          ${(itemPrice * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            <div className="flex justify-between items-center pt-4">
              <Link
                to="/products"
                className="flex items-center text-primary-600 hover:text-primary-700"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

              {/* Coupon Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon code"
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={applyingCoupon || !couponCode.trim()}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
                  >
                    {applyingCoupon ? 'Applying...' : 'Apply'}
                  </button>
                </div>
                {cart.couponCode && (
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-green-600">Coupon applied: {cart.couponCode}</span>
                    <button
                      onClick={removeCoupon}
                      className="text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-primary-600 text-white py-4 rounded-xl font-semibold text-center hover:bg-primary-700 transition-colors"
              >
                Proceed to Checkout
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                Free shipping on orders over $100
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};