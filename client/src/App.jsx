
// // src/App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import { AuthProvider } from './context/AuthContext';
// import { CartProvider } from './context/CartContext';
// import { ProtectedRoute } from './components/auth/ProtectedRoute'; // Add this import
// import { Navbar } from './components/layout/Navbar';
// import { Footer } from './components/layout/Footer';
// import { HeroSection } from './components/home/HeroSection';
// import { CategoryShowcase } from './components/home/CategoryShowcase';
// import { ProductListing } from './components/products/ProductListing';
// import { ProductDetails } from './components/products/ProductDetails';
// import { Login } from './components/auth/Login';
// import { Register } from './components/auth/Register';
// import { Wishlist } from './components/user/Wishlist';
// import { Cart } from './components/cart/Cart';
// import { Account } from './components/user/Account';
// import { Checkout } from './components/checkout/Checkout';
// // import { Checkout } from './components/checkout/Checkout';

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <CartProvider>
//           <div className="min-h-screen bg-white">
//             <Toaster 
//               position="top-right"
//               toastOptions={{
//                 duration: 3000,
//                 style: {
//                   background: '#363636',
//                   color: '#fff',
//                 },
//               }}
//             />
            
//             <Navbar />
            
//             <main>
//               <Routes>
//                 <Route path="/" element={
//                   <>
//                     <HeroSection />
//                     <CategoryShowcase />
//                     <ProductListing featured />
//                   </>
//                 } />
                
//                 <Route path="/products" element={<ProductListing />} />
//                 <Route path="/product/:id" element={<ProductDetails />} />
//                 <Route path="/category/:category" element={<ProductListing />} />
//                 <Route path="/new-arrivals" element={<ProductListing />} />
//                 <Route path="/sale" element={<ProductListing />} />
//                 <Route path="/collections" element={<ProductListing />} />
                
//                 <Route path="/women" element={<ProductListing category="women" />} />
//                 <Route path="/women/:subcategory" element={<ProductListing category="women" />} />
//                 <Route path="/women/:subcategory/:type" element={<ProductListing category="women" />} />
                
//                 <Route path="/men" element={<ProductListing category="men" />} />
//                 <Route path="/men/:subcategory" element={<ProductListing category="men" />} />
//                 <Route path="/men/:subcategory/:type" element={<ProductListing category="men" />} />
                
//                 <Route path="/kids" element={<ProductListing category="kids" />} />
//                 <Route path="/kids/:gender" element={<ProductListing category="kids" />} />
//                 <Route path="/kids/:gender/:type" element={<ProductListing category="kids" />} />
                
//                 <Route path="/accessories" element={<ProductListing category="accessories" />} />
//                 <Route path="/accessories/:subcategory" element={<ProductListing category="accessories" />} />
                
//                 <Route path="/footwear" element={<ProductListing category="footwear" />} />
//                 <Route path="/footwear/:subcategory" element={<ProductListing category="footwear" />} />
                
//                 {/* Public Auth Routes */}
//                 <Route path="/account/login" element={<Login />} />
//                 <Route path="/account/register" element={<Register />} />
                
//                 {/* Protected Routes - Require Authentication */}
//                 <Route path="/account" element={
//                   <ProtectedRoute>
//                     <Account />
//                   </ProtectedRoute>
//                 } />
                
//                 <Route path="/wishlist" element={
//                   <ProtectedRoute>
//                     <Wishlist />
//                   </ProtectedRoute>
//                 } />
                
//                 <Route path="/cart" element={
//                   <ProtectedRoute>
//                     <Cart />
//                   </ProtectedRoute>
//                 } />
                
//                 {/* <Route path="/checkout" element={
//                   <ProtectedRoute>
//                     <Checkout />
//                   </ProtectedRoute>
//                 } /> */}
                
//                 {/* 404 - Keep this LAST */}
//                 <Route path="*" element={
//                   <div className="min-h-screen bg-gray-50 py-20">
//                     <div className="max-w-7xl mx-auto px-4 text-center">
//                       <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">404</h1>
//                       <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
//                       <a href="/" className="inline-block bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700">
//                         Go Home
//                       </a>
//                     </div>
//                   </div>
//                 } />
//               </Routes>
//             </main>
            
//             <Footer />
//           </div>
//         </CartProvider>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;

























// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { CategoryShowcase } from './components/home/CategoryShowcase';
import { ProductListing } from './components/products/ProductListing';
import { ProductDetails } from './components/products/ProductDetails';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Wishlist } from './components/user/Wishlist';
import { Cart } from './components/cart/Cart';
import { Account } from './components/user/Account';
import { Checkout } from './components/checkout/Checkout';
import { OrderConfirmation } from './components/orders/OrderConfirmation';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-white">
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
            
            <Navbar />
            
            <main>
              <Routes>
                <Route path="/" element={
                  <>
                    <HeroSection />
                    <CategoryShowcase />
                    <ProductListing featured />
                  </>
                } />
                
                <Route path="/products" element={<ProductListing />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/category/:category" element={<ProductListing />} />
                <Route path="/new-arrivals" element={<ProductListing />} />
                <Route path="/sale" element={<ProductListing />} />
                <Route path="/collections" element={<ProductListing />} />
                
                <Route path="/women" element={<ProductListing category="women" />} />
                <Route path="/women/:subcategory" element={<ProductListing category="women" />} />
                <Route path="/women/:subcategory/:type" element={<ProductListing category="women" />} />
                
                <Route path="/men" element={<ProductListing category="men" />} />
                <Route path="/men/:subcategory" element={<ProductListing category="men" />} />
                <Route path="/men/:subcategory/:type" element={<ProductListing category="men" />} />
                
                <Route path="/kids" element={<ProductListing category="kids" />} />
                <Route path="/kids/:gender" element={<ProductListing category="kids" />} />
                <Route path="/kids/:gender/:type" element={<ProductListing category="kids" />} />
                
                <Route path="/accessories" element={<ProductListing category="accessories" />} />
                <Route path="/accessories/:subcategory" element={<ProductListing category="accessories" />} />
                
                <Route path="/footwear" element={<ProductListing category="footwear" />} />
                <Route path="/footwear/:subcategory" element={<ProductListing category="footwear" />} />
                
                {/* Public Auth Routes */}
                <Route path="/account/login" element={<Login />} />
                <Route path="/account/register" element={<Register />} />
                
                {/* Protected Routes - Require Authentication */}
                <Route path="/account" element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                } />
                
                <Route path="/wishlist" element={
                  <ProtectedRoute>
                    <Wishlist />
                  </ProtectedRoute>
                } />
                
                <Route path="/cart" element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                } />
                
                {/* NEW: Checkout Route */}
                <Route path="/checkout" element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } />
                
                {/* NEW: Order Confirmation Route */}
                <Route path="/order-confirmation/:id" element={
                  <ProtectedRoute>
                    <OrderConfirmation />
                  </ProtectedRoute>
                } />
                
                {/* 404 - Keep this LAST */}
                <Route path="*" element={
                  <div className="min-h-screen bg-gray-50 py-20">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                      <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">404</h1>
                      <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
                      <a href="/" className="inline-block bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700">
                        Go Home
                      </a>
                    </div>
                  </div>
                } />
              </Routes>
            </main>
            
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;