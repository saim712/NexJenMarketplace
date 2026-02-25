// // src/components/products/ProductCard.jsx
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { HeartIcon, ShoppingBagIcon, EyeIcon } from '@heroicons/react/24/outline';
// import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
// import toast from 'react-hot-toast';

// export const ProductCard = ({ product }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [isLiked, setIsLiked] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [showQuickView, setShowQuickView] = useState(false);
//   const [isAddingToCart, setIsAddingToCart] = useState(false);

//   // Check if product is in wishlist on mount
//   useEffect(() => {
//     const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
//     setIsLiked(wishlist.some(item => item.id === product.id));
//   }, [product.id]);

//   const discount = product.originalPrice 
//     ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
//     : 0;

//   const handleAddToCart = () => {
//     setIsAddingToCart(true);
    
//     // Get existing cart
//     const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
//     // Check if product already in cart
//     const existingItem = cart.find(item => item.id === product.id);
    
//     if (existingItem) {
//       existingItem.quantity += 1;
//       toast.success(`Added another ${product.name} to cart!`);
//     } else {
//       cart.push({
//         id: product.id,
//         name: product.name,
//         price: product.price,
//         image: product.images[0],
//         quantity: 1,
//         brand: product.brand
//       });
//       toast.success(`${product.name} added to cart!`);
//     }
    
//     // Save to localStorage
//     localStorage.setItem('cart', JSON.stringify(cart));
    
//     // Update cart count (you'll need to dispatch an event or use context)
//     window.dispatchEvent(new Event('cartUpdated'));
    
//     setTimeout(() => setIsAddingToCart(false), 500);
//   };

//   const handleToggleWishlist = () => {
//     const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
//     if (isLiked) {
//       // Remove from wishlist
//       const updatedWishlist = wishlist.filter(item => item.id !== product.id);
//       localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
//       setIsLiked(false);
//       toast.success('Removed from wishlist');
//     } else {
//       // Add to wishlist
//       wishlist.push({
//         id: product.id,
//         name: product.name,
//         price: product.price,
//         image: product.images[0],
//         brand: product.brand
//       });
//       localStorage.setItem('wishlist', JSON.stringify(wishlist));
//       setIsLiked(true);
//       toast.success('Added to wishlist!');
//     }
    
//     window.dispatchEvent(new Event('wishlistUpdated'));
//   };

//   return (
//     <>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         whileHover={{ y: -5 }}
//         onHoverStart={() => setIsHovered(true)}
//         onHoverEnd={() => setIsHovered(false)}
//         className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
//       >
//         {/* Badges */}
//         <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
//           {product.isNew && (
//             <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
//               NEW
//             </span>
//           )}
//           {product.isSale && (
//             <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
//               SALE {discount}% OFF
//             </span>
//           )}
//         </div>

//         {/* Wishlist Button */}
//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={handleToggleWishlist}
//           className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white"
//         >
//           <AnimatePresence mode="wait">
//             {isLiked ? (
//               <motion.div
//                 key="solid"
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 exit={{ scale: 0 }}
//               >
//                 <HeartIconSolid className="h-5 w-5 text-red-500" />
//               </motion.div>
//             ) : (
//               <motion.div
//                 key="outline"
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 exit={{ scale: 0 }}
//               >
//                 <HeartIcon className="h-5 w-5 text-gray-700" />
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.button>

//         {/* Image Container */}
//         <Link to={`/product/${product.id}`}>
//           <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
//             <motion.img
//               initial={{ scale: 1 }}
//               animate={{ scale: isHovered ? 1.05 : 1 }}
//               transition={{ duration: 0.4 }}
//               src={product.images[selectedImage]}
//               alt={product.name}
//               className="w-full h-full object-cover"
//             />

//             {/* Hover Images Thumbnails */}
//             <AnimatePresence>
//               {isHovered && product.images?.length > 1 && (
//                 <motion.div
//                   initial={{ y: 20, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   exit={{ y: 20, opacity: 0 }}
//                   className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2"
//                 >
//                   {product.images.slice(0, 3).map((image, index) => (
//                     <motion.button
//                       key={index}
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={(e) => {
//                         e.preventDefault();
//                         setSelectedImage(index);
//                       }}
//                       className={`w-12 h-12 rounded-lg overflow-hidden border-2 ${
//                         selectedImage === index 
//                           ? 'border-primary-600' 
//                           : 'border-white'
//                       }`}
//                     >
//                       <img src={image} alt="" className="w-full h-full object-cover" />
//                     </motion.button>
//                   ))}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </Link>

//         {/* Product Info */}
//         <div className="p-4">
//           <Link to={`/product/${product.id}`}>
//             <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
//             <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
//               {product.name}
//             </h3>
//           </Link>
          
//           {/* Rating */}
//           <div className="flex items-center mb-2">
//             <div className="flex text-yellow-400">
//               {[...Array(5)].map((_, i) => (
//                 <svg
//                   key={i}
//                   className={`h-4 w-4 ${
//                     i < Math.floor(product.rating) 
//                       ? 'text-yellow-400' 
//                       : 'text-gray-300'
//                   }`}
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//               ))}
//             </div>
//             <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
//           </div>

//           {/* Price */}
//           <div className="flex items-center space-x-2 mb-3">
//             <span className="text-xl font-bold text-gray-900">
//               ${product.price.toFixed(2)}
//             </span>
//             {product.originalPrice && (
//               <>
//                 <span className="text-sm text-gray-400 line-through">
//                   ${product.originalPrice.toFixed(2)}
//                 </span>
//                 <span className="text-sm font-semibold text-green-600">
//                   Save {discount}%
//                 </span>
//               </>
//             )}
//           </div>

//           {/* Add to Cart Button */}
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={handleAddToCart}
//             disabled={isAddingToCart}
//             className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-colors ${
//               isAddingToCart 
//                 ? 'bg-green-600 text-white' 
//                 : 'bg-gray-900 text-white hover:bg-primary-600'
//             }`}
//           >
//             <ShoppingBagIcon className="h-5 w-5" />
//             <span>{isAddingToCart ? 'Added!' : 'Add to Cart'}</span>
//           </motion.button>
//         </div>
//       </motion.div>

//       {/* Quick View Modal */}
//       <AnimatePresence>
//         {showQuickView && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setShowQuickView(false)}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               onClick={(e) => e.stopPropagation()}
//               className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//             >
//               <div className="p-6">
//                 <div className="flex justify-between items-start mb-4">
//                   <h2 className="text-2xl font-bold">Quick View</h2>
//                   <button onClick={() => setShowQuickView(false)}>
//                     <XMarkIcon className="h-6 w-6" />
//                   </button>
//                 </div>
//                 <div className="grid grid-cols-2 gap-6">
//                   <img 
//                     src={product.images[0]} 
//                     alt={product.name} 
//                     className="w-full rounded-lg"
//                   />
//                   <div>
//                     <p className="text-gray-500">{product.brand}</p>
//                     <h3 className="text-xl font-bold mb-2">{product.name}</h3>
//                     <p className="text-2xl font-bold text-primary-600 mb-4">
//                       ${product.price}
//                     </p>
//                     <button
//                       onClick={handleAddToCart}
//                       className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700"
//                     >
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };



















// src/components/products/ProductCard.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { wishlistService } from '../../services/wishlistService';
import toast from 'react-hot-toast';

export const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  // src/components/products/ProductCard.jsx
// Add this helper function inside your component, before the return statement

const getProductImage = (product) => {
  if (!product) return null;
  
  // Try different possible image locations
  const image = product.images?.[0]?.url || 
                product.images?.[0] || 
                product.image ||
                null;
                
  return image;
};

// Then update your img tag:
<img
  src={getProductImage(product) || 'https://via.placeholder.com/300x400?text=No+Image'}
  alt={product.name || 'Product'}
  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
  onError={(e) => {
    e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
  }}
/>

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      setLoading(true);
      await addToCart(product._id, 1);
    } catch (error) {
      // Error handled in context
    } finally {
      setLoading(false);
    }
  };

  const handleToggleWishlist = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to wishlist');
      return;
    }

    try {
      setLoading(true);
      if (isLiked) {
        await wishlistService.removeFromWishlist(product._id);
        setIsLiked(false);
        toast.success('Removed from wishlist');
      } else {
        await wishlistService.addToWishlist(product._id);
        setIsLiked(true);
        toast.success('Added to wishlist');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update wishlist');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            NEW
          </span>
        )}
        {product.isSale && (
          <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            SALE {discount}% OFF
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleToggleWishlist}
        disabled={loading}
        className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white disabled:opacity-50"
      >
        {isLiked ? (
          <HeartIconSolid className="h-5 w-5 text-red-500" />
        ) : (
          <HeartIcon className="h-5 w-5 text-gray-700" />
        )}
      </button>

      {/* Image */}
      <Link to={`/product/${product._id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          <img
            src={product.images[0]?.url || product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.numReviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
              <span className="text-sm font-semibold text-green-600">
                Save {discount}%
              </span>
            </>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-primary-600 transition-colors disabled:opacity-50"
        >
          <ShoppingBagIcon className="h-5 w-5" />
          <span>{loading ? 'Adding...' : 'Add to Cart'}</span>
        </button>
      </div>
    </motion.div>
  );
};