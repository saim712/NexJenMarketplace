// // src/components/products/ProductDetails.jsx
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useParams, Link } from 'react-router-dom';
// import { 
//   HeartIcon, 
//   ShoppingBagIcon,
//   TruckIcon,
//   ShieldCheckIcon,
//   ArrowPathIcon,
//   StarIcon
// } from '@heroicons/react/24/outline';
// import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
// import { ProductCard } from './ProductCard';
// import toast from 'react-hot-toast';

// // Sample product data
// const productData = {
//   id: '1',
//   name: 'Oversized Cotton Blend Sweater',
//   brand: 'Essential',
//   description: 'Stay cozy and stylish with our oversized cotton blend sweater. Perfect for layering, this piece features a relaxed fit and soft texture.',
//   details: [
//     '60% Cotton, 40% Acrylic blend',
//     'Oversized fit',
//     'Ribbed hem and cuffs',
//     'Machine wash cold',
//     'Imported'
//   ],
//   price: 89.99,
//   originalPrice: 129.99,
//   images: [
//     'https://images.unsplash.com/photo-1576566588028-4147f3842f27',
//     'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80',
//     'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80',
//     'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80',
//   ],
//   colors: [
//     { name: 'Black', code: '#000000' },
//     { name: 'White', code: '#FFFFFF' },
//     { name: 'Gray', code: '#808080' },
//   ],
//   sizes: ['XS', 'S', 'M', 'L', 'XL'],
//   rating: 4.5,
//   reviews: 128,
//   inStock: true,
//   sku: 'SW-2024-001'
// };

// const relatedProducts = [
//   {
//     id: '2',
//     name: 'Slim Fit Denim Jeans',
//     brand: 'Denim Co',
//     price: 119.99,
//     images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246'],
//     rating: 4.8,
//     reviews: 256,
//   },
//   {
//     id: '3',
//     name: 'Leather Crossbody Bag',
//     brand: 'Luxe',
//     price: 199.99,
//     images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa'],
//     rating: 4.9,
//     reviews: 89,
//   }
// ];

// export const ProductDetails = () => {
//   const { id } = useParams();
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [isLiked, setIsLiked] = useState(false);
//   const [activeTab, setActiveTab] = useState('description');
//   const [isAddingToCart, setIsAddingToCart] = useState(false);

//   useEffect(() => {
//     // Check if product is in wishlist
//     const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
//     setIsLiked(wishlist.some(item => item.id === id));
//   }, [id]);

//   const discount = productData.originalPrice 
//     ? Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100)
//     : 0;

//   const handleAddToCart = () => {
//     if (!selectedSize) {
//       toast.error('Please select a size');
//       return;
//     }

//     if (!selectedColor) {
//       toast.error('Please select a color');
//       return;
//     }

//     setIsAddingToCart(true);

//     const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
//     const existingItem = cart.find(item => 
//       item.id === productData.id && 
//       item.size === selectedSize && 
//       item.color === selectedColor.name
//     );
    
//     if (existingItem) {
//       existingItem.quantity += quantity;
//       toast.success('Cart updated!');
//     } else {
//       cart.push({
//         id: productData.id,
//         name: productData.name,
//         price: productData.price,
//         image: productData.images[0],
//         quantity: quantity,
//         size: selectedSize,
//         color: selectedColor.name,
//         brand: productData.brand
//       });
//       toast.success('Added to cart!');
//     }
    
//     localStorage.setItem('cart', JSON.stringify(cart));
//     window.dispatchEvent(new Event('cartUpdated'));
    
//     setTimeout(() => setIsAddingToCart(false), 500);
//   };

//   const handleToggleWishlist = () => {
//     const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
//     if (isLiked) {
//       const updatedWishlist = wishlist.filter(item => item.id !== productData.id);
//       localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
//       setIsLiked(false);
//       toast.success('Removed from wishlist');
//     } else {
//       wishlist.push({
//         id: productData.id,
//         name: productData.name,
//         price: productData.price,
//         image: productData.images[0],
//         brand: productData.brand
//       });
//       localStorage.setItem('wishlist', JSON.stringify(wishlist));
//       setIsLiked(true);
//       toast.success('Added to wishlist!');
//     }
    
//     window.dispatchEvent(new Event('wishlistUpdated'));
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Breadcrumb */}
//         <nav className="text-sm text-gray-500 mb-8">
//           <ol className="flex items-center space-x-2">
//             <li><Link to="/" className="hover:text-primary-600">Home</Link></li>
//             <li><span className="mx-2">/</span></li>
//             <li><Link to="/women" className="hover:text-primary-600">Women</Link></li>
//             <li><span className="mx-2">/</span></li>
//             <li className="text-gray-900">{productData.name}</li>
//           </ol>
//         </nav>

//         {/* Product Main */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Image Gallery */}
//           <div>
//             <div className="relative">
//               {/* Main Image */}
//               <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
//                 <img
//                   src={productData.images[selectedImage]}
//                   alt={productData.name}
//                   className="w-full h-full object-cover"
//                 />

//                 {/* Sale Badge */}
//                 {productData.originalPrice && (
//                   <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold">
//                     {discount}% OFF
//                   </div>
//                 )}
//               </div>

//               {/* Thumbnails */}
//               <div className="grid grid-cols-4 gap-4 mt-4">
//                 {productData.images.map((image, index) => (
//                   <motion.button
//                     key={index}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => setSelectedImage(index)}
//                     className={`aspect-square rounded-lg overflow-hidden border-2 ${
//                       selectedImage === index ? 'border-primary-600' : 'border-transparent'
//                     }`}
//                   >
//                     <img src={image} alt={`${productData.name} ${index + 1}`} className="w-full h-full object-cover" />
//                   </motion.button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Product Info */}
//           <div>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//             >
//               {/* Brand */}
//               <p className="text-primary-600 font-semibold mb-2">{productData.brand}</p>

//               {/* Title */}
//               <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">
//                 {productData.name}
//               </h1>

//               {/* Rating */}
//               <div className="flex items-center mb-4">
//                 <div className="flex text-yellow-400">
//                   {[...Array(5)].map((_, i) => (
//                     <StarIcon
//                       key={i}
//                       className={`h-5 w-5 ${
//                         i < Math.floor(productData.rating) ? 'fill-current' : 'stroke-current fill-none'
//                       }`}
//                     />
//                   ))}
//                 </div>
//                 <span className="text-gray-600 ml-2">
//                   {productData.rating} ({productData.reviews} reviews)
//                 </span>
//               </div>

//               {/* Price */}
//               <div className="mb-6">
//                 <div className="flex items-center space-x-4">
//                   <span className="text-3xl font-bold text-gray-900">
//                     ${productData.price}
//                   </span>
//                   {productData.originalPrice && (
//                     <>
//                       <span className="text-xl text-gray-400 line-through">
//                         ${productData.originalPrice}
//                       </span>
//                       <span className="text-green-600 font-semibold">
//                         Save {discount}%
//                       </span>
//                     </>
//                   )}
//                 </div>
//                 <p className="text-sm text-gray-500 mt-1">Free shipping on orders over $50</p>
//               </div>

//               {/* Color Selection */}
//               <div className="mb-6">
//                 <h3 className="font-semibold text-gray-900 mb-3">
//                   Color: <span className="font-normal">{selectedColor?.name || 'Select'}</span>
//                 </h3>
//                 <div className="flex space-x-3">
//                   {productData.colors.map((color) => (
//                     <motion.button
//                       key={color.name}
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => setSelectedColor(color)}
//                       className={`w-12 h-12 rounded-full border-2 ${
//                         selectedColor?.name === color.name
//                           ? 'border-primary-600 ring-2 ring-primary-200'
//                           : 'border-gray-200'
//                       }`}
//                       style={{ backgroundColor: color.code }}
//                       title={color.name}
//                     />
//                   ))}
//                 </div>
//               </div>

//               {/* Size Selection */}
//               <div className="mb-6">
//                 <div className="flex items-center justify-between mb-3">
//                   <h3 className="font-semibold text-gray-900">
//                     Size: <span className="font-normal">{selectedSize || 'Select'}</span>
//                   </h3>
//                   <button className="text-primary-600 text-sm hover:underline">
//                     Size Guide
//                   </button>
//                 </div>
//                 <div className="flex flex-wrap gap-3">
//                   {productData.sizes.map((size) => (
//                     <motion.button
//                       key={size}
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => setSelectedSize(size)}
//                       className={`min-w-[60px] px-4 py-3 rounded-lg border font-medium transition-all ${
//                         selectedSize === size
//                           ? 'bg-primary-600 text-white border-primary-600'
//                           : 'border-gray-200 text-gray-700 hover:border-primary-600'
//                       }`}
//                     >
//                       {size}
//                     </motion.button>
//                   ))}
//                 </div>
//               </div>

//               {/* Quantity */}
//               <div className="mb-8">
//                 <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
//                 <div className="flex items-center space-x-3">
//                   <button
//                     onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
//                     className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
//                   >
//                     -
//                   </button>
//                   <span className="w-16 text-center font-semibold">{quantity}</span>
//                   <button
//                     onClick={() => setQuantity(prev => prev + 1)}
//                     className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex space-x-4 mb-8">
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={handleAddToCart}
//                   disabled={isAddingToCart}
//                   className={`flex-1 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-colors ${
//                     isAddingToCart
//                       ? 'bg-green-600 text-white'
//                       : 'bg-primary-600 text-white hover:bg-primary-700'
//                   }`}
//                 >
//                   <ShoppingBagIcon className="h-5 w-5" />
//                   <span>{isAddingToCart ? 'Added!' : 'Add to Cart'}</span>
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={handleToggleWishlist}
//                   className="w-14 h-14 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50"
//                 >
//                   {isLiked ? (
//                     <HeartIconSolid className="h-6 w-6 text-red-500" />
//                   ) : (
//                     <HeartIcon className="h-6 w-6" />
//                   )}
//                 </motion.button>
//               </div>

//               {/* Shipping Info */}
//               <div className="border-t border-gray-200 pt-6">
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                   <div className="flex items-center space-x-3">
//                     <TruckIcon className="h-5 w-5 text-gray-400" />
//                     <div>
//                       <p className="font-semibold text-gray-900">Free Shipping</p>
//                       <p className="text-sm text-gray-500">On orders $50+</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <ShieldCheckIcon className="h-5 w-5 text-gray-400" />
//                     <div>
//                       <p className="font-semibold text-gray-900">Secure Payment</p>
//                       <p className="text-sm text-gray-500">100% secure</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <ArrowPathIcon className="h-5 w-5 text-gray-400" />
//                     <div>
//                       <p className="font-semibold text-gray-900">Easy Returns</p>
//                       <p className="text-sm text-gray-500">30 days return</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>

//         {/* Tabs Section */}
//         <div className="mt-16">
//           <div className="border-b border-gray-200">
//             <nav className="flex space-x-8">
//               {['description', 'details', 'reviews'].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`py-4 px-1 border-b-2 font-medium capitalize ${
//                     activeTab === tab
//                       ? 'border-primary-600 text-primary-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700'
//                   }`}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </nav>
//           </div>

//           <div className="py-6">
//             {activeTab === 'description' && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="prose max-w-none"
//               >
//                 <p className="text-gray-600">{productData.description}</p>
//               </motion.div>
//             )}

//             {activeTab === 'details' && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//               >
//                 <ul className="list-disc pl-5 space-y-2">
//                   {productData.details.map((detail, index) => (
//                     <li key={index} className="text-gray-600">{detail}</li>
//                   ))}
//                 </ul>
//                 <p className="text-sm text-gray-500 mt-4">SKU: {productData.sku}</p>
//               </motion.div>
//             )}

//             {activeTab === 'reviews' && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//               >
//                 <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
//               </motion.div>
//             )}
//           </div>
//         </div>

//         {/* Related Products */}
//         <div className="mt-16">
//           <h2 className="text-2xl font-display font-bold text-gray-900 mb-8">You May Also Like</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {relatedProducts.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };




















// src/components/products/ProductDetails.jsx
import React, { useState, useEffect, useCallback } from 'react'; // Add useCallback
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { 
  HeartIcon, 
  ShoppingBagIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { ProductCard } from './ProductCard';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext'; // Add this import
import { wishlistService } from '../../services/wishlistService'; // Add this import

// Sample product data (temporary until connected to API)
const productData = {
  id: '1',
  name: 'Oversized Cotton Blend Sweater',
  brand: 'Essential',
  description: 'Stay cozy and stylish with our oversized cotton blend sweater. Perfect for layering, this piece features a relaxed fit and soft texture.',
  details: [
    '60% Cotton, 40% Acrylic blend',
    'Oversized fit',
    'Ribbed hem and cuffs',
    'Machine wash cold',
    'Imported'
  ],
  price: 89.99,
  originalPrice: 129.99,
  images: [
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80',
  ],
  colors: [
    { name: 'Black', code: '#000000' },
    { name: 'White', code: '#FFFFFF' },
    { name: 'Gray', code: '#808080' },
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  rating: 4.5,
  reviews: 128,
  inStock: true,
  sku: 'SW-2024-001'
};

const relatedProducts = [
  {
    id: '2',
    name: 'Slim Fit Denim Jeans',
    brand: 'Denim Co',
    price: 119.99,
    images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246'],
    rating: 4.8,
    reviews: 256,
  },
  {
    id: '3',
    name: 'Leather Crossbody Bag',
    brand: 'Luxe',
    price: 199.99,
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa'],
    rating: 4.9,
    reviews: 89,
  }
];

export const ProductDetails = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fix 1: Use useCallback to memoize the function
  const checkWishlistStatus = useCallback(async () => {
    if (!isAuthenticated) return;
    
    try {
      setLoading(true);
      const response = await wishlistService.getWishlist();
      const isInWishlist = response.wishlist?.some(item => item._id === id) || false;
      setIsLiked(isInWishlist);
    } catch (error) {
      console.error('Error checking wishlist:', error);
    } finally {
      setLoading(false);
    }
  }, [id, isAuthenticated]);

  // Fix 2: Move localStorage check to a separate function
  const checkWishlistLocal = useCallback(() => {
    try {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      // Use productData.id for now, but in real app use id from params
      setIsLiked(wishlist.some(item => item.id === productData.id));
    } catch (error) {
      console.error('Error checking wishlist:', error);
    }
  }, []);

  // Fix 3: Use the appropriate check based on whether you're using API or localStorage
  useEffect(() => {
    // Option A: If using API (recommended for real app)
    // checkWishlistStatus();
    
    // Option B: If using localStorage (for now, while developing)
    checkWishlistLocal();
    
    // Cleanup function if needed
    return () => {
      // Any cleanup code
    };
  }, [checkWishlistLocal]); // Add dependency

  const discount = productData.originalPrice 
    ? Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }

    setIsAddingToCart(true);

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const existingItem = cart.find(item => 
      item.id === productData.id && 
      item.size === selectedSize && 
      item.color === selectedColor.name
    );
    
    if (existingItem) {
      existingItem.quantity += quantity;
      toast.success('Cart updated!');
    } else {
      cart.push({
        id: productData.id,
        name: productData.name,
        price: productData.price,
        image: productData.images[0],
        quantity: quantity,
        size: selectedSize,
        color: selectedColor.name,
        brand: productData.brand
      });
      toast.success('Added to cart!');
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    
    setTimeout(() => setIsAddingToCart(false), 500);
  };
// src/components/products/ProductDetails.jsx
// Add this helper function inside your component

const getProductImage = (product) => {
  if (!product) return null;
  
  const image = product.images?.[selectedImage]?.url || 
                product.images?.[selectedImage] || 
                product.image ||
                null;
                
  return image;
};

// Update main image:
<img
  src={getProductImage(productData) || 'https://via.placeholder.com/800x800?text=No+Image'}
  alt={productData.name}
  className="w-full h-full object-cover"
  onError={(e) => {
    e.target.src = 'https://via.placeholder.com/800x800?text=No+Image';
  }}
/>

// Update thumbnail images:
{productData.images.map((image, index) => (
  <img
    src={image?.url || image || 'https://via.placeholder.com/100x100?text=No+Image'}
    alt={`${productData.name} ${index + 1}`}
    className="w-full h-full object-cover"
    onError={(e) => {
      e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
    }}
  />
))}
  const handleToggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (isLiked) {
      const updatedWishlist = wishlist.filter(item => item.id !== productData.id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setIsLiked(false);
      toast.success('Removed from wishlist');
    } else {
      wishlist.push({
        id: productData.id,
        name: productData.name,
        price: productData.price,
        image: productData.images[0],
        brand: productData.brand
      });
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setIsLiked(true);
      toast.success('Added to wishlist!');
    }
    
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <ol className="flex items-center space-x-2">
            <li><Link to="/" className="hover:text-primary-600">Home</Link></li>
            <li><span className="mx-2">/</span></li>
            <li><Link to="/women" className="hover:text-primary-600">Women</Link></li>
            <li><span className="mx-2">/</span></li>
            <li className="text-gray-900">{productData.name}</li>
          </ol>
        </nav>

        {/* Product Main */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="relative">
              {/* Main Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={productData.images[selectedImage]}
                  alt={productData.name}
                  className="w-full h-full object-cover"
                />

                {/* Sale Badge */}
                {productData.originalPrice && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold">
                    {discount}% OFF
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-4 mt-4">
                {productData.images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-primary-600' : 'border-transparent'
                    }`}
                  >
                    <img src={image} alt={`${productData.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Brand */}
              <p className="text-primary-600 font-semibold mb-2">{productData.brand}</p>

              {/* Title */}
              <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">
                {productData.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(productData.rating) ? 'fill-current' : 'stroke-current fill-none'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 ml-2">
                  {productData.rating} ({productData.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-gray-900">
                    ${productData.price}
                  </span>
                  {productData.originalPrice && (
                    <>
                      <span className="text-xl text-gray-400 line-through">
                        ${productData.originalPrice}
                      </span>
                      <span className="text-green-600 font-semibold">
                        Save {discount}%
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">Free shipping on orders over $50</p>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Color: <span className="font-normal">{selectedColor?.name || 'Select'}</span>
                </h3>
                <div className="flex space-x-3">
                  {productData.colors.map((color) => (
                    <motion.button
                      key={color.name}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded-full border-2 ${
                        selectedColor?.name === color.name
                          ? 'border-primary-600 ring-2 ring-primary-200'
                          : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: color.code }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">
                    Size: <span className="font-normal">{selectedSize || 'Select'}</span>
                  </h3>
                  <button className="text-primary-600 text-sm hover:underline">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {productData.sizes.map((size) => (
                    <motion.button
                      key={size}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[60px] px-4 py-3 rounded-lg border font-medium transition-all ${
                        selectedSize === size
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'border-gray-200 text-gray-700 hover:border-primary-600'
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="w-16 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className={`flex-1 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-colors ${
                    isAddingToCart
                      ? 'bg-green-600 text-white'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  <ShoppingBagIcon className="h-5 w-5" />
                  <span>{isAddingToCart ? 'Added!' : 'Add to Cart'}</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleToggleWishlist}
                  disabled={loading}
                  className="w-14 h-14 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                >
                  {isLiked ? (
                    <HeartIconSolid className="h-6 w-6 text-red-500" />
                  ) : (
                    <HeartIcon className="h-6 w-6" />
                  )}
                </motion.button>
              </div>

              {/* Shipping Info */}
              <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3">
                    <TruckIcon className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-semibold text-gray-900">Free Shipping</p>
                      <p className="text-sm text-gray-500">On orders $50+</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ShieldCheckIcon className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-semibold text-gray-900">Secure Payment</p>
                      <p className="text-sm text-gray-500">100% secure</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ArrowPathIcon className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-semibold text-gray-900">Easy Returns</p>
                      <p className="text-sm text-gray-500">30 days return</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {['description', 'details', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium capitalize ${
                    activeTab === tab
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-6">
            {activeTab === 'description' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="prose max-w-none"
              >
                <p className="text-gray-600">{productData.description}</p>
              </motion.div>
            )}

            {activeTab === 'details' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <ul className="list-disc pl-5 space-y-2">
                  {productData.details.map((detail, index) => (
                    <li key={index} className="text-gray-600">{detail}</li>
                  ))}
                </ul>
                <p className="text-sm text-gray-500 mt-4">SKU: {productData.sku}</p>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};