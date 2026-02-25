// // src/components/user/Wishlist.jsx
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useAuth } from '../../context/AuthContext';
// import { useCart } from '../../context/CartContext';
// import { wishlistService } from '../../services/wishlistService';
// import { HeartIcon, ShoppingBagIcon, TrashIcon } from '@heroicons/react/24/outline';
// import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
// import toast from 'react-hot-toast';

// export const Wishlist = () => {
//   const { isAuthenticated } = useAuth();
//   const { addToCart } = useCart();
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (isAuthenticated) {
//       loadWishlist();
//     }
//   }, [isAuthenticated]);

//   const loadWishlist = async () => {
//     try {
//       setLoading(true);
//       const response = await wishlistService.getWishlist();
//       setWishlist(response.wishlist || []);
//     } catch (error) {
//       console.error('Failed to load wishlist:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRemoveFromWishlist = async (productId) => {
//     try {
//       await wishlistService.removeFromWishlist(productId);
//       setWishlist(wishlist.filter(item => item._id !== productId));
//       toast.success('Removed from wishlist');
//     } catch (error) {
//       toast.error('Failed to remove from wishlist');
//     }
//   };

//   const handleAddToCart = async (product) => {
//     try {
//       await addToCart(product._id, 1);
//       toast.success('Added to cart!');
//     } catch (error) {
//       toast.error('Failed to add to cart');
//     }
//   };

//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <HeartIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login to View Wishlist</h2>
//           <p className="text-gray-600 mb-8">You need to be logged in to access your wishlist.</p>
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
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {[...Array(4)].map((_, i) => (
//                 <div key={i} className="bg-white rounded-2xl p-4">
//                   <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
//                   <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//                   <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (wishlist.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <HeartIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h2>
//           <p className="text-gray-600 mb-8">Save items you love to your wishlist and they'll appear here.</p>
//           <Link
//             to="/products"
//             className="inline-block bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700"
//           >
//             Browse Products
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">My Wishlist</h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {wishlist.map((product) => (
//             <motion.div
//               key={product._id}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
//             >
//               <Link to={`/product/${product._id}`}>
//                 <div className="relative aspect-square overflow-hidden bg-gray-100">
//                   <img
//                     src={product.images[0]?.url || product.images[0]}
//                     alt={product.name}
//                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//                   />
//                 </div>
//               </Link>

//               <div className="p-4">
//                 <Link to={`/product/${product._id}`}>
//                   <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
//                   <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
//                     {product.name}
//                   </h3>
//                 </Link>

//                 <div className="flex items-center justify-between mt-4">
//                   <span className="font-bold text-primary-600">
//                     ${product.price.toFixed(2)}
//                   </span>
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => handleAddToCart(product)}
//                       className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
//                     >
//                       <ShoppingBagIcon className="h-5 w-5" />
//                     </button>
//                     <button
//                       onClick={() => handleRemoveFromWishlist(product._id)}
//                       className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
//                     >
//                       <TrashIcon className="h-5 w-5" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
























// src/components/user/Wishlist.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { wishlistService } from '../../services/wishlistService';
import { HeartIcon, ShoppingBagIcon, TrashIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';

export const Wishlist = () => {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);


  
  useEffect(() => {
    if (isAuthenticated) {
      loadWishlist();
    }
  }, [isAuthenticated]);

  const loadWishlist = async () => {
    try {
      setLoading(true);
      const response = await wishlistService.getWishlist();
      setWishlist(response.wishlist || []);
    } catch (error) {
      console.error('Failed to load wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await wishlistService.removeFromWishlist(productId);
      setWishlist(wishlist.filter(item => item._id !== productId));
      toast.success('Removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove from wishlist');
    }
  };

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product._id, 1);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <HeartIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login to View Wishlist</h2>
          <p className="text-gray-600 mb-8">You need to be logged in to access your wishlist.</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-4">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <HeartIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h2>
          <p className="text-gray-600 mb-8">Save items you love to your wishlist and they'll appear here.</p>
          <Link
            to="/products"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">My Wishlist</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
            >
              <Link to={`/product/${product._id}`}>
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={product.images?.[0]?.url || product.images?.[0] || ''}
                    alt={product.name || 'Product'}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>

              <div className="p-4">
                <Link to={`/product/${product._id}`}>
                  {product.brand && (
                    <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                  )}
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name || 'Product'}
                  </h3>
                </Link>

                <div className="flex items-center justify-between mt-4">
                  <span className="font-bold text-primary-600">
                    ${product.price?.toFixed(2) || '0.00'}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      <ShoppingBagIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleRemoveFromWishlist(product._id)}
                      className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};