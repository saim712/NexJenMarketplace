// src/components/products/ProductListing.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { productService } from '../../services/productService';
import { FunnelIcon } from '@heroicons/react/24/outline';

export const ProductListing = ({ category: propCategory, featured }) => {
  const { category, subcategory, gender, type } = useParams();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 500,
    sizes: [],
    colors: [],
    sort: 'popular',
    page: 1,
    limit: 12,
  });

  // Get page title based on route
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (featured) return 'Featured Products';
    if (path === '/new-arrivals') return 'New Arrivals';
    if (path === '/sale') return 'Sale Items';
    if (path === '/collections') return 'Collections';
    
    if (category === 'women') return "Women's Collection";
    if (category === 'men') return "Men's Collection";
    if (category === 'kids') return "Kids' Collection";
    if (category === 'accessories') return 'Accessories';
    if (category === 'footwear') return 'Footwear';
    
    // Handle subcategories
    if (subcategory) {
      const formattedSub = subcategory.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      
      if (category === 'women') return `Women's ${formattedSub}`;
      if (category === 'men') return `Men's ${formattedSub}`;
      if (category === 'kids') {
        if (gender) {
          return `${gender.charAt(0).toUpperCase() + gender.slice(1)}'s ${formattedSub}`;
        }
        return `Kids' ${formattedSub}`;
      }
      return formattedSub;
    }
    
    return 'All Products';
  };

  // Load products based on route
  useEffect(() => {
    loadProducts();
  }, [location.pathname, filters.page, filters.sort]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const path = location.pathname;
      const params = {
        page: filters.page,
        limit: filters.limit,
        sort: filters.sort,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
      };

      // Handle special routes
      if (path === '/new-arrivals') {
        console.log('Loading new arrivals...');
        const data = await productService.getNewArrivals();
        setProducts(data.products || []);
        setLoading(false);
        return;
      }
      
      if (path === '/sale') {
        console.log('Loading sale items...');
        const data = await productService.getSaleProducts();
        setProducts(data.products || []);
        setLoading(false);
        return;
      }
      
      if (featured) {
        console.log('Loading featured products...');
        const data = await productService.getFeaturedProducts();
        setProducts(data.products || []);
        setLoading(false);
        return;
      }

      // Handle category routes
      if (category) {
        params.category = category;
      }
      if (propCategory) {
        params.category = propCategory;
      }
      if (subcategory) {
        params.subcategory = subcategory;
      }
      if (type) {
        params.type = type;
      }
      if (gender) {
        params.gender = gender;
      }

      console.log('Loading products with params:', params);
      const data = await productService.getProducts(params);
      
      setProducts(data.products || []);
      setPagination(data.pagination || {
        currentPage: 1,
        totalPages: 1,
        totalItems: data.products?.length || 0,
      });
      
    } catch (err) {
      console.error('Failed to load products:', err);
      setError(err.message || 'Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setFilters({ ...filters, page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (e) => {
    setFilters({ ...filters, sort: e.target.value, page: 1 });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-8 bg-gray-200 rounded w-64 mb-8 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
                <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Products</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={loadProducts}
            className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-display font-bold text-gray-900">
            {getPageTitle()}
          </h1>
          <p className="text-gray-600 mt-2">
            {products.length} {products.length === 1 ? 'product' : 'products'} found
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar - You can add this later */}
          
          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Toolbar */}
            <div className="bg-white rounded-2xl p-4 mb-6 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button className="lg:hidden flex items-center space-x-2 px-4 py-2 border rounded-lg">
                  <FunnelIcon className="h-5 w-5" />
                  <span>Filters</span>
                </button>
              </div>

              <select
                value={filters.sort}
                onChange={handleSortChange}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {/* Products */}
            {products.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl">
                <p className="text-gray-500 text-lg">No products found in this category.</p>
                <p className="text-gray-400 mt-2">Try checking other categories or check back later.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <nav className="flex space-x-2">
                      <button
                        onClick={() => handlePageChange(filters.page - 1)}
                        disabled={filters.page === 1}
                        className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
                      >
                        Previous
                      </button>
                      {[...Array(pagination.totalPages)].map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => handlePageChange(i + 1)}
                          className={`w-10 h-10 rounded-lg ${
                            filters.page === i + 1
                              ? 'bg-primary-600 text-white'
                              : 'border hover:bg-gray-50'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => handlePageChange(filters.page + 1)}
                        disabled={filters.page === pagination.totalPages}
                        className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};