// src/components/layout/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShoppingBagIcon, 
  HeartIcon, 
  UserIcon, 
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon 
} from '@heroicons/react/24/outline';

// Mega menu data
// In Navbar.jsx, update the megaMenuData to include proper category structure
const megaMenuData = {
  'New Arrivals': {
    columns: [
      {
        title: 'Women',
        category: 'women',
        items: [
          { name: 'New Dresses', href: '/women/new-dresses', filter: 'dresses' },
          { name: 'New Tops', href: '/women/new-tops', filter: 'tops' },
          { name: 'New Bottoms', href: '/women/new-bottoms', filter: 'bottoms' },
        ]
      },
      {
        title: 'Men',
        category: 'men',
        items: [
          { name: 'New Shirts', href: '/men/new-shirts', filter: 'shirts' },
          { name: 'New Pants', href: '/men/new-pants', filter: 'pants' },
          { name: 'New Jackets', href: '/men/new-jackets', filter: 'jackets' },
        ]
      }
    ]
  },
  'Women': {
    columns: [
      {
        title: 'Clothing',
        category: 'women',
        items: [
          { name: 'Dresses', href: '/women/dresses', filter: 'dresses' },
          { name: 'Tops', href: '/women/tops', filter: 'tops' },
          { name: 'Bottoms', href: '/women/bottoms', filter: 'bottoms' },
          { name: 'Outerwear', href: '/women/outerwear', filter: 'outerwear' },
        ]
      },
      {
        title: 'Shoes',
        category: 'women',
        items: [
          { name: 'Heels', href: '/women/heels', filter: 'heels' },
          { name: 'Flats', href: '/women/flats', filter: 'flats' },
          { name: 'Boots', href: '/women/boots', filter: 'boots' },
          { name: 'Sandals', href: '/women/sandals', filter: 'sandals' },
        ]
      },
      {
        title: 'Accessories',
        category: 'women',
        items: [
          { name: 'Bags', href: '/women/bags', filter: 'bags' },
          { name: 'Jewelry', href: '/women/jewelry', filter: 'jewelry' },
          { name: 'Watches', href: '/women/watches', filter: 'watches' },
          { name: 'Hats', href: '/women/hats', filter: 'hats' },
        ]
      }
    ]
  },
  'Men': {
    columns: [
      {
        title: 'Clothing',
        category: 'men',
        items: [
          { name: 'Shirts', href: '/men/shirts', filter: 'shirts' },
          { name: 'Pants', href: '/men/pants', filter: 'pants' },
          { name: 'Jeans', href: '/men/jeans', filter: 'jeans' },
          { name: 'Jackets', href: '/men/jackets', filter: 'jackets' },
          { name: 'Suits', href: '/men/suits', filter: 'suits' },
        ]
      },
      {
        title: 'Shoes',
        category: 'men',
        items: [
          { name: 'Dress Shoes', href: '/men/dress-shoes', filter: 'dress-shoes' },
          { name: 'Sneakers', href: '/men/sneakers', filter: 'sneakers' },
          { name: 'Boots', href: '/men/boots', filter: 'boots' },
          { name: 'Loafers', href: '/men/loafers', filter: 'loafers' },
        ]
      },
      {
        title: 'Accessories',
        category: 'men',
        items: [
          { name: 'Watches', href: '/men/watches', filter: 'watches' },
          { name: 'Belts', href: '/men/belts', filter: 'belts' },
          { name: 'Wallets', href: '/men/wallets', filter: 'wallets' },
          { name: 'Bags', href: '/men/bags', filter: 'bags' },
        ]
      }
    ]
  },
  'Kids': {
    columns: [
      {
        title: 'Girls',
        category: 'kids',
        items: [
          { name: 'Dresses', href: '/kids/girls/dresses', filter: 'girls-dresses' },
          { name: 'Tops', href: '/kids/girls/tops', filter: 'girls-tops' },
          { name: 'Bottoms', href: '/kids/girls/bottoms', filter: 'girls-bottoms' },
          { name: 'Shoes', href: '/kids/girls/shoes', filter: 'girls-shoes' },
        ]
      },
      {
        title: 'Boys',
        category: 'kids',
        items: [
          { name: 'Shirts', href: '/kids/boys/shirts', filter: 'boys-shirts' },
          { name: 'Pants', href: '/kids/boys/pants', filter: 'boys-pants' },
          { name: 'Jeans', href: '/kids/boys/jeans', filter: 'boys-jeans' },
          { name: 'Shoes', href: '/kids/boys/shoes', filter: 'boys-shoes' },
        ]
      },
      {
        title: 'Baby',
        category: 'kids',
        items: [
          { name: 'Onesies', href: '/kids/baby/onesies', filter: 'baby-onesies' },
          { name: 'Sleepwear', href: '/kids/baby/sleepwear', filter: 'baby-sleepwear' },
          { name: 'Sets', href: '/kids/baby/sets', filter: 'baby-sets' },
          { name: 'Shoes', href: '/kids/baby/shoes', filter: 'baby-shoes' },
        ]
      }
    ]
  }
};

const navItems = [
  { name: 'New Arrivals', href: '/new-arrivals', hasMegaMenu: true },
  { name: 'Women', href: '/women', hasMegaMenu: true },
  { name: 'Men', href: '/men', hasMegaMenu: true },
  { name: 'Kids', href: '/kids', hasMegaMenu: true },
  { name: 'Sale', href: '/sale' },
  { name: 'Collections', href: '/collections' },
];

export const Navbar = ({ cartCount = 0, wishlistCount = 0 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
//   const [cartCount, setCartCount] = useState(0);
//   const [wishlistCount, setWishlistCount] = useState(0);
  
  const megaMenuRef = useRef(null);
  const timeoutRef = useRef(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 0);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

  // Load counts from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    
    if (savedCart) {
      const cart = JSON.parse(savedCart);
    //   setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
    }
    
    if (savedWishlist) {
      const wishlist = JSON.parse(savedWishlist);
    //   setWishlistCount(wishlist.length);
    }
  }, []);

  // Handle mouse enter with delay
  const handleMouseEnter = (menuName) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(menuName);
    }, 100);
  };

  // Handle mouse leave with delay
  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 200);
  };

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
        setActiveMegaMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 text-center text-sm font-medium">
        <p className="animate-pulse">✨ Free Shipping on Orders Over $50 | Use Code: WELCOME10 for 10% Off ✨</p>
      </div>

      {/* Main Navigation */}
      <nav 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg"
              />
              <span className="text-2xl font-display font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                NexGenMarketPlace
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div 
              ref={megaMenuRef}
              className="hidden lg:flex items-center space-x-8"
            >
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.hasMegaMenu && handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={item.href}
                    className="text-gray-700 hover:text-primary-600 font-medium transition-colors py-2 inline-flex items-center"
                  >
                    {item.name}
                    {item.hasMegaMenu && (
                      <motion.span
                        animate={{ rotate: activeMegaMenu === item.name ? 180 : 0 }}
                        className="ml-1 text-xs text-primary-500"
                      >
                        ▼
                      </motion.span>
                    )}
                  </Link>

                  {/* Mega Menu */}
                  <AnimatePresence>
                    {item.hasMegaMenu && activeMegaMenu === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 w-96 bg-white shadow-xl rounded-b-2xl p-6"
                      >
                        <div className="grid grid-cols-2 gap-6">
                          {megaMenuData[item.name]?.columns.map((column, idx) => (
                            <div key={idx}>
                              <h3 className="font-semibold text-gray-900 border-b pb-2 mb-2">
                                {column.title}
                              </h3>
                              <ul className="space-y-1">
                                {column.items.map((subItem, subIdx) => (
                                  <li key={subIdx}>
                                    <Link
                                      to={subItem.href}
                                      className="text-gray-600 hover:text-primary-600 text-sm block py-1"
                                      onClick={() => setActiveMegaMenu(null)}
                                    >
                                      {subItem.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:block relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              {/* Wishlist */}
              <Link to="/wishlist">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 hover:bg-gray-100 rounded-full relative"
                >
                  <HeartIcon className="h-6 w-6 text-gray-700" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </motion.button>
              </Link>

              {/* Cart */}
              <Link to="/cart">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 hover:bg-gray-100 rounded-full relative"
                >
                  <ShoppingBagIcon className="h-6 w-6 text-gray-700" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </motion.button>
              </Link>

              {/* Profile */}
              <Link to="/account">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 hover:bg-gray-100 rounded-full hidden md:block"
                >
                  <UserIcon className="h-6 w-6 text-gray-700" />
                </motion.button>
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <div key={item.name}>
                    <Link
                      to={item.href}
                      className="block text-gray-700 hover:text-primary-600 font-medium py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {/* Mobile submenu */}
                    {item.hasMegaMenu && megaMenuData[item.name] && (
                      <div className="pl-4 mt-2 space-y-3">
                        {megaMenuData[item.name].columns.map((column, idx) => (
                          <div key={idx}>
                            <h4 className="text-sm font-semibold text-gray-500 mb-1">
                              {column.title}
                            </h4>
                            {column.items.map((subItem, subIdx) => (
                              <Link
                                key={subIdx}
                                to={subItem.href}
                                className="block text-sm text-gray-600 hover:text-primary-600 py-1 pl-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};