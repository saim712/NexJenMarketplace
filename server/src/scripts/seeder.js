// backend/data/productsData.js

// backend/scripts/seedProducts.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
// import { productsData } from '../data/productsData.js';

dotenv.config();

 const productsData = [
  // ===== WOMEN'S PRODUCTS =====
  // Dresses
  {
    name: 'Floral Print Maxi Dress',
    brand: 'Zara',
    description: 'Beautiful floral print maxi dress perfect for summer days. Features a flowy silhouette, adjustable straps, and pockets.',
    category: 'women',
    subcategory: 'dresses',
    type: 'maxi-dress',
    price: 89.99,
    originalPrice: 129.99,
    images: [
      {
        public_id: 'women/dress1',
        url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1',
        isPrimary: true
      },
      {
        public_id: 'women/dress1-2',
        url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80',
        isPrimary: false
      }
    ],
    colors: [
      { name: 'Pink', code: '#FF69B4' },
      { name: 'White', code: '#FFFFFF' },
      { name: 'Black', code: '#000000' }
    ],
    sizes: [
      { size: 'XS', stock: 15 },
      { size: 'S', stock: 20 },
      { size: 'M', stock: 25 },
      { size: 'L', stock: 15 }
    ],
    stock: 75,
    rating: 4.7,
    numReviews: 128,
    isNew: true,
    isSale: false,
    isFeatured: true,
    tags: ['summer', 'floral', 'maxi', 'dress'],
    sku: 'WDR-001'
  },
  {
    name: 'Little Black Dress',
    brand: 'H&M',
    description: 'Classic little black dress for any occasion. Timeless design with a modern twist.',
    category: 'women',
    subcategory: 'dresses',
    type: 'cocktail-dress',
    price: 79.99,
    images: [
      {
        public_id: 'women/dress2',
        url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Black', code: '#000000' }
    ],
    sizes: [
      { size: 'XS', stock: 20 },
      { size: 'S', stock: 25 },
      { size: 'M', stock: 30 },
      { size: 'L', stock: 20 }
    ],
    stock: 95,
    rating: 4.8,
    numReviews: 256,
    isNew: false,
    isSale: false,
    isFeatured: true,
    tags: ['classic', 'evening', 'cocktail'],
    sku: 'WDR-002'
  },
  {
    name: 'Summer Sundress',
    brand: 'Forever 21',
    description: 'Light and breezy sundress perfect for warm weather. Features a playful pattern and comfortable fit.',
    category: 'women',
    subcategory: 'dresses',
    type: 'sundress',
    price: 49.99,
    originalPrice: 69.99,
    images: [
      {
        public_id: 'women/dress3',
        url: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Pink', code: '#FFC0CB' },
      { name: 'Blue', code: '#87CEEB' }
    ],
    sizes: [
      { size: 'XS', stock: 10 },
      { size: 'S', stock: 15 },
      { size: 'M', stock: 20 }
    ],
    stock: 45,
    rating: 4.5,
    numReviews: 89,
    isNew: true,
    isSale: true,
    isFeatured: false,
    tags: ['summer', 'casual', 'sundress'],
    sku: 'WDR-003'
  },
  {
    name: 'Elegant Evening Gown',
    brand: 'BCBG',
    description: 'Stunning evening gown for special occasions. Features intricate beading and a flowing train.',
    category: 'women',
    subcategory: 'dresses',
    type: 'evening-gown',
    price: 299.99,
    originalPrice: 399.99,
    images: [
      {
        public_id: 'women/dress4',
        url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Red', code: '#FF0000' },
      { name: 'Navy', code: '#000080' },
      { name: 'Black', code: '#000000' }
    ],
    sizes: [
      { size: 'S', stock: 8 },
      { size: 'M', stock: 10 },
      { size: 'L', stock: 8 }
    ],
    stock: 26,
    rating: 4.9,
    numReviews: 45,
    isNew: true,
    isSale: true,
    isFeatured: true,
    tags: ['evening', 'formal', 'gown'],
    sku: 'WDR-004'
  },

  // Tops
  {
    name: 'Cashmere Sweater',
    brand: 'J.Crew',
    description: 'Luxuriously soft cashmere sweater perfect for cooler weather. Classic fit with ribbed cuffs and hem.',
    category: 'women',
    subcategory: 'tops',
    type: 'sweater',
    price: 129.99,
    images: [
      {
        public_id: 'women/top1',
        url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Gray', code: '#808080' },
      { name: 'Brown', code: '#8B4513' },
      { name: 'Black', code: '#000000' }
    ],
    sizes: [
      { size: 'XS', stock: 15 },
      { size: 'S', stock: 20 },
      { size: 'M', stock: 25 },
      { size: 'L', stock: 15 }
    ],
    stock: 75,
    rating: 4.9,
    numReviews: 167,
    isNew: false,
    isSale: false,
    isFeatured: true,
    tags: ['winter', 'cashmere', 'sweater'],
    sku: 'WTP-001'
  },
  {
    name: 'Silk Blouse',
    brand: 'Equipment',
    description: 'Elegant silk blouse that transitions seamlessly from office to evening.',
    category: 'women',
    subcategory: 'tops',
    type: 'blouse',
    price: 89.99,
    images: [
      {
        public_id: 'women/top2',
        url: 'https://images.unsplash.com/photo-1551803091-e20673f15770',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'White', code: '#FFFFFF' },
      { name: 'Black', code: '#000000' },
      { name: 'Blush', code: '#FFE4E1' }
    ],
    sizes: [
      { size: 'XS', stock: 12 },
      { size: 'S', stock: 18 },
      { size: 'M', stock: 22 },
      { size: 'L', stock: 12 }
    ],
    stock: 64,
    rating: 4.6,
    numReviews: 98,
    isNew: true,
    isSale: false,
    isFeatured: false,
    tags: ['silk', 'blouse', 'office'],
    sku: 'WTP-002'
  },
  {
    name: 'Cotton T-Shirt',
    brand: 'Everlane',
    description: 'Premium quality cotton t-shirt. Soft, durable, and ethically made.',
    category: 'women',
    subcategory: 'tops',
    type: 't-shirt',
    price: 24.99,
    images: [
      {
        public_id: 'women/top3',
        url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'White', code: '#FFFFFF' },
      { name: 'Black', code: '#000000' },
      { name: 'Gray', code: '#808080' },
      { name: 'Navy', code: '#000080' }
    ],
    sizes: [
      { size: 'XS', stock: 30 },
      { size: 'S', stock: 40 },
      { size: 'M', stock: 45 },
      { size: 'L', stock: 35 },
      { size: 'XL', stock: 25 }
    ],
    stock: 175,
    rating: 4.7,
    numReviews: 423,
    isNew: false,
    isSale: false,
    isFeatured: false,
    tags: ['basics', 'cotton', 't-shirt'],
    sku: 'WTP-003'
  },

  // Bottoms
  {
    name: 'High-Waist Jeans',
    brand: "Levi's",
    description: 'Classic high-waist jeans with a modern fit. Perfect for everyday wear.',
    category: 'women',
    subcategory: 'bottoms',
    type: 'jeans',
    price: 79.99,
    images: [
      {
        public_id: 'women/bottom1',
        url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Blue', code: '#0000FF' },
      { name: 'Black', code: '#000000' },
      { name: 'Light Blue', code: '#ADD8E6' }
    ],
    sizes: [
      { size: '24', stock: 10 },
      { size: '25', stock: 15 },
      { size: '26', stock: 20 },
      { size: '27', stock: 20 },
      { size: '28', stock: 15 },
      { size: '29', stock: 10 }
    ],
    stock: 90,
    rating: 4.8,
    numReviews: 312,
    isNew: false,
    isSale: false,
    isFeatured: true,
    tags: ['jeans', 'denim', 'high-waist'],
    sku: 'WBT-001'
  },
  {
    name: 'Pleated Skirt',
    brand: 'Zara',
    description: 'Chic pleated skirt that adds movement and elegance to any outfit.',
    category: 'women',
    subcategory: 'bottoms',
    type: 'skirts',
    price: 59.99,
    images: [
      {
        public_id: 'women/bottom2',
        url: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Black', code: '#000000' },
      { name: 'Gray', code: '#808080' },
      { name: 'Navy', code: '#000080' }
    ],
    sizes: [
      { size: 'XS', stock: 12 },
      { size: 'S', stock: 18 },
      { size: 'M', stock: 20 },
      { size: 'L', stock: 12 }
    ],
    stock: 62,
    rating: 4.5,
    numReviews: 76,
    isNew: true,
    isSale: false,
    isFeatured: false,
    tags: ['skirt', 'pleated', 'office'],
    sku: 'WBT-002'
  },
  {
    name: 'Wide-Leg Pants',
    brand: 'Banana Republic',
    description: 'Sophisticated wide-leg pants that create a elegant silhouette.',
    category: 'women',
    subcategory: 'bottoms',
    type: 'pants',
    price: 89.99,
    images: [
      {
        public_id: 'women/bottom3',
        url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Black', code: '#000000' },
      { name: 'Beige', code: '#F5F5DC' },
      { name: 'Navy', code: '#000080' }
    ],
    sizes: [
      { size: '0', stock: 8 },
      { size: '2', stock: 12 },
      { size: '4', stock: 15 },
      { size: '6', stock: 12 },
      { size: '8', stock: 8 }
    ],
    stock: 55,
    rating: 4.7,
    numReviews: 89,
    isNew: true,
    isSale: false,
    isFeatured: true,
    tags: ['pants', 'wide-leg', 'office'],
    sku: 'WBT-003'
  },

  // Outerwear
  {
    name: 'Wool Winter Coat',
    brand: 'Banana Republic',
    description: 'Classic wool coat to keep you warm and stylish during winter.',
    category: 'women',
    subcategory: 'outerwear',
    type: 'coat',
    price: 249.99,
    images: [
      {
        public_id: 'women/outer1',
        url: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Brown', code: '#8B4513' },
      { name: 'Gray', code: '#808080' },
      { name: 'Black', code: '#000000' }
    ],
    sizes: [
      { size: 'XS', stock: 8 },
      { size: 'S', stock: 12 },
      { size: 'M', stock: 15 },
      { size: 'L', stock: 10 }
    ],
    stock: 45,
    rating: 4.9,
    numReviews: 87,
    isNew: true,
    isSale: false,
    isFeatured: true,
    tags: ['winter', 'coat', 'wool'],
    sku: 'WOT-001'
  },
  {
    name: 'Leather Jacket',
    brand: 'AllSaints',
    description: 'Edgy leather jacket that adds attitude to any outfit.',
    category: 'women',
    subcategory: 'outerwear',
    type: 'jacket',
    price: 299.99,
    images: [
      {
        public_id: 'women/outer2',
        url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Black', code: '#000000' }
    ],
    sizes: [
      { size: 'XS', stock: 6 },
      { size: 'S', stock: 10 },
      { size: 'M', stock: 12 },
      { size: 'L', stock: 8 }
    ],
    stock: 36,
    rating: 4.8,
    numReviews: 143,
    isNew: false,
    isSale: false,
    isFeatured: true,
    tags: ['leather', 'jacket', 'edgy'],
    sku: 'WOT-002'
  },
  {
    name: 'Denim Jacket',
    brand: "Levi's",
    description: 'Classic denim jacket that never goes out of style.',
    category: 'women',
    subcategory: 'outerwear',
    type: 'denim-jacket',
    price: 79.99,
    images: [
      {
        public_id: 'women/outer3',
        url: 'https://images.unsplash.com/photo-1556909211-36987daf7b4d',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Blue', code: '#0000FF' },
      { name: 'Light Blue', code: '#ADD8E6' }
    ],
    sizes: [
      { size: 'XS', stock: 12 },
      { size: 'S', stock: 18 },
      { size: 'M', stock: 22 },
      { size: 'L', stock: 15 },
      { size: 'XL', stock: 10 }
    ],
    stock: 77,
    rating: 4.7,
    numReviews: 234,
    isNew: false,
    isSale: true,
    isFeatured: false,
    tags: ['denim', 'jacket', 'casual'],
    sku: 'WOT-003'
  },

  // Shoes
  {
    name: 'Stiletto Heels',
    brand: 'Jimmy Choo',
    description: 'Elegant stiletto heels that make a statement.',
    category: 'women',
    subcategory: 'shoes',
    type: 'heels',
    price: 199.99,
    images: [
      {
        public_id: 'women/shoe1',
        url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Red', code: '#FF0000' },
      { name: 'Black', code: '#000000' },
      { name: 'Nude', code: '#F5DEB3' }
    ],
    sizes: [
      { size: '5', stock: 5 },
      { size: '6', stock: 8 },
      { size: '7', stock: 12 },
      { size: '8', stock: 10 },
      { size: '9', stock: 6 }
    ],
    stock: 41,
    rating: 4.9,
    numReviews: 67,
    isNew: true,
    isSale: false,
    isFeatured: true,
    tags: ['heels', 'stiletto', 'evening'],
    sku: 'WSH-001'
  },
  {
    name: 'Block Heels',
    brand: 'Steve Madden',
    description: 'Comfortable block heels perfect for all-day wear.',
    category: 'women',
    subcategory: 'shoes',
    type: 'heels',
    price: 89.99,
    images: [
      {
        public_id: 'women/shoe2',
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Black', code: '#000000' },
      { name: 'Brown', code: '#8B4513' },
      { name: 'Nude', code: '#F5DEB3' }
    ],
    sizes: [
      { size: '5', stock: 8 },
      { size: '6', stock: 12 },
      { size: '7', stock: 18 },
      { size: '8', stock: 15 },
      { size: '9', stock: 10 }
    ],
    stock: 63,
    rating: 4.6,
    numReviews: 234,
    isNew: false,
    isSale: false,
    isFeatured: false,
    tags: ['heels', 'block', 'comfort'],
    sku: 'WSH-002'
  },
  {
    name: 'Ballet Flats',
    brand: 'Tory Burch',
    description: 'Classic ballet flats with signature logo detail.',
    category: 'women',
    subcategory: 'shoes',
    type: 'flats',
    price: 129.99,
    images: [
      {
        public_id: 'women/shoe3',
        url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Black', code: '#000000' },
      { name: 'Pink', code: '#FFC0CB' },
      { name: 'Gold', code: '#FFD700' }
    ],
    sizes: [
      { size: '5', stock: 10 },
      { size: '6', stock: 15 },
      { size: '7', stock: 20 },
      { size: '8', stock: 18 },
      { size: '9', stock: 12 }
    ],
    stock: 75,
    rating: 4.7,
    numReviews: 156,
    isNew: true,
    isSale: false,
    isFeatured: true,
    tags: ['flats', 'ballet', 'comfort'],
    sku: 'WSH-003'
  },
  {
    name: 'Knee-High Boots',
    brand: 'Stuart Weitzman',
    description: 'Luxurious knee-high boots that elevate any outfit.',
    category: 'women',
    subcategory: 'shoes',
    type: 'boots',
    price: 399.99,
    images: [
      {
        public_id: 'women/shoe4',
        url: 'https://images.unsplash.com/photo-1608256246200-53e635b8859c',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Brown', code: '#8B4513' },
      { name: 'Black', code: '#000000' }
    ],
    sizes: [
      { size: '5', stock: 4 },
      { size: '6', stock: 6 },
      { size: '7', stock: 8 },
      { size: '8', stock: 7 },
      { size: '9', stock: 5 }
    ],
    stock: 30,
    rating: 4.9,
    numReviews: 45,
    isNew: true,
    isSale: false,
    isFeatured: true,
    tags: ['boots', 'knee-high', 'winter'],
    sku: 'WSH-004'
  },
  {
    name: 'Strappy Sandals',
    brand: 'Sam Edelman',
    description: 'Elegant strappy sandals perfect for summer events.',
    category: 'women',
    subcategory: 'shoes',
    type: 'sandals',
    price: 79.99,
    images: [
      {
        public_id: 'women/shoe5',
        url: 'https://images.unsplash.com/photo-1590673846749-0aec6816a6d9',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Gold', code: '#DAA520' },
      { name: 'Black', code: '#000000' },
      { name: 'Silver', code: '#C0C0C0' }
    ],
    sizes: [
      { size: '5', stock: 12 },
      { size: '6', stock: 18 },
      { size: '7', stock: 22 },
      { size: '8', stock: 20 },
      { size: '9', stock: 15 }
    ],
    stock: 87,
    rating: 4.6,
    numReviews: 189,
    isNew: false,
    isSale: true,
    isFeatured: false,
    tags: ['sandals', 'summer', 'strappy'],
    sku: 'WSH-005'
  },

  // Bags
  {
    name: 'Tote Bag',
    brand: 'Michael Kors',
    description: 'Spacious tote bag perfect for work or travel.',
    category: 'women',
    subcategory: 'accessories',
    type: 'bags',
    price: 149.99,
    images: [
      {
        public_id: 'women/bag1',
        url: 'https://images.unsplash.com/photo-1584917865442-89b86b0a0d1b',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Brown', code: '#8B4513' },
      { name: 'Black', code: '#000000' }
    ],
    sizes: [
      { size: 'One Size', stock: 50 }
    ],
    stock: 50,
    rating: 4.7,
    numReviews: 234,
    isNew: false,
    isSale: false,
    isFeatured: true,
    tags: ['bag', 'tote', 'work'],
    sku: 'WAC-001'
  },
  {
    name: 'Crossbody Bag',
    brand: 'Kate Spade',
    description: 'Chic crossbody bag for everyday use.',
    category: 'women',
    subcategory: 'accessories',
    type: 'bags',
    price: 199.99,
    originalPrice: 249.99,
    images: [
      {
        public_id: 'women/bag2',
        url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Pink', code: '#FF69B4' },
      { name: 'Black', code: '#000000' },
      { name: 'Navy', code: '#000080' }
    ],
    sizes: [
      { size: 'One Size', stock: 35 }
    ],
    stock: 35,
    rating: 4.8,
    numReviews: 167,
    isNew: true,
    isSale: true,
    isFeatured: true,
    tags: ['bag', 'crossbody', 'chic'],
    sku: 'WAC-002'
  },
  {
    name: 'Leather Satchel',
    brand: 'Coach',
    description: 'Classic leather satchel that never goes out of style.',
    category: 'women',
    subcategory: 'accessories',
    type: 'bags',
    price: 279.99,
    images: [
      {
        public_id: 'women/bag3',
        url: 'https://images.unsplash.com/photo-1591561954555-607968c989ab',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Brown', code: '#8B4513' },
      { name: 'Black', code: '#000000' },
      { name: 'Tan', code: '#D2B48C' }
    ],
    sizes: [
      { size: 'One Size', stock: 25 }
    ],
    stock: 25,
    rating: 4.9,
    numReviews: 98,
    isNew: true,
    isSale: false,
    isFeatured: true,
    tags: ['leather', 'satchel', 'classic'],
    sku: 'WAC-003'
  },

  // Jewelry
  {
    name: 'Gold Hoop Earrings',
    brand: 'Swarovski',
    description: 'Elegant gold hoop earrings with crystal accents.',
    category: 'women',
    subcategory: 'accessories',
    type: 'jewelry',
    price: 79.99,
    images: [
      {
        public_id: 'women/jewel1',
        url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Gold', code: '#FFD700' }
    ],
    sizes: [
      { size: 'One Size', stock: 60 }
    ],
    stock: 60,
    rating: 4.8,
    numReviews: 98,
    isNew: true,
    isSale: false,
    isFeatured: false,
    tags: ['earrings', 'gold', 'crystal'],
    sku: 'WAC-004'
  },
  {
    name: 'Pearl Necklace',
    brand: 'Mikimoto',
    description: 'Classic pearl necklace for timeless elegance.',
    category: 'women',
    subcategory: 'accessories',
    type: 'jewelry',
    price: 199.99,
    images: [
      {
        public_id: 'women/jewel2',
        url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'White', code: '#FFFFFF' }
    ],
    sizes: [
      { size: '16"', stock: 15 },
      { size: '18"', stock: 20 },
      { size: '20"', stock: 15 }
    ],
    stock: 50,
    rating: 4.9,
    numReviews: 67,
    isNew: true,
    isSale: false,
    isFeatured: true,
    tags: ['pearl', 'necklace', 'classic'],
    sku: 'WAC-005'
  },

  // ===== MEN'S PRODUCTS =====
  // Shirts
  {
    name: 'Oxford Button-Down Shirt',
    brand: 'Brooks Brothers',
    description: 'Classic Oxford shirt for a polished look.',
    category: 'men',
    subcategory: 'shirts',
    type: 'dress-shirt',
    price: 89.99,
    images: [
      {
        public_id: 'men/shirt1',
        url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'White', code: '#FFFFFF' },
      { name: 'Blue', code: '#0000FF' },
      { name: 'Pink', code: '#FFC0CB' }
    ],
    sizes: [
      { size: 'S', stock: 25 },
      { size: 'M', stock: 35 },
      { size: 'L', stock: 30 },
      { size: 'XL', stock: 20 },
      { size: 'XXL', stock: 15 }
    ],
    stock: 125,
    rating: 4.8,
    numReviews: 312,
    isNew: false,
    isSale: false,
    isFeatured: true,
    tags: ['shirt', 'oxford', 'formal'],
    sku: 'MSH-001'
  },
  {
    name: 'Casual Linen Shirt',
    brand: 'Banana Republic',
    description: 'Breathable linen shirt perfect for warm weather.',
    category: 'men',
    subcategory: 'shirts',
    type: 'casual-shirt',
    price: 69.99,
    images: [
      {
        public_id: 'men/shirt2',
        url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'White', code: '#FFFFFF' },
      { name: 'Blue', code: '#87CEEB' },
      { name: 'Beige', code: '#F5F5DC' }
    ],
    sizes: [
      { size: 'S', stock: 20 },
      { size: 'M', stock: 30 },
      { size: 'L', stock: 25 },
      { size: 'XL', stock: 15 }
    ],
    stock: 90,
    rating: 4.6,
    numReviews: 178,
    isNew: true,
    isSale: false,
    isFeatured: false,
    tags: ['linen', 'casual', 'summer'],
    sku: 'MSH-002'
  },
  {
    name: 'Flannel Shirt',
    brand: 'Pendleton',
    description: 'Warm flannel shirt for cooler days.',
    category: 'men',
    subcategory: 'shirts',
    type: 'casual-shirt',
    price: 79.99,
    images: [
      {
        public_id: 'men/shirt3',
        url: 'https://images.unsplash.com/photo-1603252109303-2751441dd157',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Red', code: '#FF0000' },
      { name: 'Blue', code: '#0000FF' },
      { name: 'Green', code: '#008000' }
    ],
    sizes: [
      { size: 'S', stock: 18 },
      { size: 'M', stock: 25 },
      { size: 'L', stock: 22 },
      { size: 'XL', stock: 15 },
      { size: 'XXL', stock: 10 }
    ],
    stock: 90,
    rating: 4.7,
    numReviews: 145,
    isNew: true,
    isSale: false,
    isFeatured: false,
    tags: ['flannel', 'winter', 'casual'],
    sku: 'MSH-003'
  },

  // Pants
  {
    name: 'Chino Pants',
    brand: 'Dockers',
    description: 'Classic chino pants for versatile styling.',
    category: 'men',
    subcategory: 'pants',
    type: 'chinos',
    price: 59.99,
    images: [
      {
        public_id: 'men/pant1',
        url: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Brown', code: '#8B4513' },
      { name: 'Gray', code: '#808080' },
      { name: 'Navy', code: '#000080' },
      { name: 'Black', code: '#000000' }
    ],
    sizes: [
      { size: '28', stock: 15 },
      { size: '30', stock: 25 },
      { size: '32', stock: 35 },
      { size: '34', stock: 25 },
      { size: '36', stock: 15 }
    ],
    stock: 115,
    rating: 4.7,
    numReviews: 456,
    isNew: false,
    isSale: false,
    isFeatured: true,
    tags: ['pants', 'chinos', 'casual'],
    sku: 'MPN-001'
  },
  {
    name: 'Cargo Pants',
    brand: 'Carhartt',
    description: 'Durable cargo pants with multiple pockets.',
    category: 'men',
    subcategory: 'pants',
    type: 'cargo',
    price: 69.99,
    images: [
      {
        public_id: 'men/pant2',
        url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Khaki', code: '#C3B091' },
      { name: 'Black', code: '#000000' },
      { name: 'Olive', code: '#808000' }
    ],
    sizes: [
      { size: '30', stock: 20 },
      { size: '32', stock: 30 },
      { size: '34', stock: 25 },
      { size: '36', stock: 15 },
      { size: '38', stock: 10 }
    ],
    stock: 100,
    rating: 4.6,
    numReviews: 234,
    isNew: true,
    isSale: false,
    isFeatured: false,
    tags: ['cargo', 'pants', 'utility'],
    sku: 'MPN-002'
  },

  // Jeans
  {
    name: 'Slim Fit Jeans',
    brand: "Levi's",
    description: 'Modern slim fit jeans for a sleek look.',
    category: 'men',
    subcategory: 'jeans',
    type: 'slim-jeans',
    price: 79.99,
    images: [
      {
        public_id: 'men/jean1',
        url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Blue', code: '#0000FF' },
      { name: 'Black', code: '#000000' }
    ],
    sizes: [
      { size: '28', stock: 20 },
      { size: '30', stock: 30 },
      { size: '32', stock: 40 },
      { size: '34', stock: 30 },
      { size: '36', stock: 20 }
    ],
    stock: 140,
    rating: 4.8,
    numReviews: 589,
    isNew: false,
    isSale: false,
    isFeatured: true,
    tags: ['jeans', 'slim', 'denim'],
    sku: 'MJN-001'
  },
  {
    name: 'Regular Fit Jeans',
    brand: 'Wrangler',
    description: 'Classic regular fit jeans for everyday comfort.',
    category: 'men',
    subcategory: 'jeans',
    type: 'regular-jeans',
    price: 69.99,
    images: [
      {
        public_id: 'men/jean2',
        url: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Blue', code: '#0000FF' },
      { name: 'Black', code: '#000000' }
    ],
    sizes: [
      { size: '28', stock: 15 },
      { size: '30', stock: 25 },
      { size: '32', stock: 35 },
      { size: '34', stock: 25 },
      { size: '36', stock: 15 },
      { size: '38', stock: 10 }
    ],
    stock: 125,
    rating: 4.7,
    numReviews: 234,
    isNew: false,
    isSale: true,
    isFeatured: false,
    tags: ['jeans', 'regular', 'denim'],
    sku: 'MJN-002'
  },
  {
    name: 'Distressed Jeans',
    brand: 'True Religion',
    description: 'Stylish distressed jeans with a lived-in look.',
    category: 'men',
    subcategory: 'jeans',
    type: 'distressed',
    price: 129.99,
    originalPrice: 179.99,
    images: [
      {
        public_id: 'men/jean3',
        url: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Blue', code: '#0000FF' }
    ],
    sizes: [
      { size: '28', stock: 10 },
      { size: '30', stock: 15 },
      { size: '32', stock: 20 },
      { size: '34', stock: 15 },
      { size: '36', stock: 10 }
    ],
    stock: 70,
    rating: 4.8,
    numReviews: 145,
    isNew: true,
    isSale: true,
    isFeatured: true,
    tags: ['jeans', 'distressed', 'stylish'],
    sku: 'MJN-003'
  },

  // Jackets
  {
    name: 'Denim Jacket',
    brand: "Levi's",
    description: 'Classic denim jacket that never goes out of style.',
    category: 'men',
    subcategory: 'jackets',
    type: 'denim-jacket',
    price: 89.99,
    images: [
      {
        public_id: 'men/jacket1',
        url: 'https://images.unsplash.com/photo-1556909211-36987daf7b4d',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Blue', code: '#0000FF' }
    ],
    sizes: [
      { size: 'S', stock: 15 },
      { size: 'M', stock: 25 },
      { size: 'L', stock: 22 },
      { size: 'XL', stock: 15 },
      { size: 'XXL', stock: 10 }
    ],
    stock: 87,
    rating: 4.8,
    numReviews: 267,
    isNew: false,
    isSale: false,
    isFeatured: true,
    tags: ['denim', 'jacket', 'classic'],
    sku: 'MJK-001'
  },
  {
    name: 'Leather Jacket',
    brand: 'Schott',
    description: 'Premium leather jacket for a timeless look.',
    category: 'men',
    subcategory: 'jackets',
    type: 'leather-jacket',
    price: 399.99,
    images: [
      {
        public_id: 'men/jacket2',
        url: 'https://images.unsplash.com/photo-1520975661595-6453be3f7070',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Black', code: '#000000' }
    ],
    sizes: [
      { size: 'S', stock: 8 },
      { size: 'M', stock: 12 },
      { size: 'L', stock: 10 },
      { size: 'XL', stock: 8 }
    ],
    stock: 38,
    rating: 4.9,
    numReviews: 89,
    isNew: true,
    isSale: false,
    isFeatured: true,
    tags: ['leather', 'jacket', 'premium'],
    sku: 'MJK-002'
  },
  {
    name: 'Bomber Jacket',
    brand: 'Alpha Industries',
    description: 'Classic bomber jacket for a casual look.',
    category: 'men',
    subcategory: 'jackets',
    type: 'bomber',
    price: 159.99,
    images: [
      {
        public_id: 'men/jacket3',
        url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Green', code: '#008000' },
      { name: 'Black', code: '#000000' },
      { name: 'Navy', code: '#000080' }
    ],
    sizes: [
      { size: 'S', stock: 12 },
      { size: 'M', stock: 18 },
      { size: 'L', stock: 15 },
      { size: 'XL', stock: 10 }
    ],
    stock: 55,
    rating: 4.7,
    numReviews: 156,
    isNew: true,
    isSale: false,
    isFeatured: false,
    tags: ['bomber', 'jacket', 'casual'],
    sku: 'MJK-003'
  },

  // Suits
  {
    name: 'Wool Suit',
    brand: 'Hugo Boss',
    description: 'Elegant wool suit for formal occasions.',
    category: 'men',
    subcategory: 'suits',
    type: 'formal-suit',
    price: 599.99,
    images: [
      {
        public_id: 'men/suit1',
        url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Black', code: '#000000' },
      { name: 'Gray', code: '#808080' },
      { name: 'Navy', code: '#000080' }
    ],
    sizes: [
      { size: '38', stock: 5 },
      { size: '40', stock: 8 },
      { size: '42', stock: 10 },
      { size: '44', stock: 7 }
    ],
    stock: 30,
    rating: 4.9,
    numReviews: 67,
    isNew: true,
    isSale: false,
    isFeatured: true,
    tags: ['suit', 'wool', 'formal'],
    sku: 'MSU-001'
  },
  {
    name: 'Tuxedo',
    brand: 'Calvin Klein',
    description: 'Classic tuxedo for black-tie events.',
    category: 'men',
    subcategory: 'suits',
    type: 'tuxedo',
    price: 499.99,
    originalPrice: 649.99,
    images: [
      {
        public_id: 'men/suit2',
        url: 'https://images.unsplash.com/photo-1598808503746-f34c53b9323e',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Black', code: '#000000' }
    ],
    sizes: [
      { size: '38', stock: 4 },
      { size: '40', stock: 6 },
      { size: '42', stock: 8 },
      { size: '44', stock: 5 }
    ],
    stock: 23,
    rating: 4.8,
    numReviews: 45,
    isNew: false,
    isSale: true,
    isFeatured: false,
    tags: ['tuxedo', 'formal', 'black-tie'],
    sku: 'MSU-002'
  },

  // Shoes
  {
    name: 'Oxford Dress Shoes',
    brand: 'Allen Edmonds',
    description: 'Handcrafted Oxford shoes for the discerning gentleman.',
    category: 'men',
    subcategory: 'shoes',
    type: 'dress-shoes',
    price: 249.99,
    images: [
      {
        public_id: 'men/shoe1',
        url: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Brown', code: '#8B4513' },
      { name: 'Black', code: '#000000' }
    ],
    sizes: [
      { size: '7', stock: 8 },
      { size: '8', stock: 12 },
      { size: '9', stock: 15 },
      { size: '10', stock: 12 },
      { size: '11', stock: 8 },
      { size: '12', stock: 5 }
    ],
    stock: 60,
    rating: 4.9,
    numReviews: 156,
    isNew: false,
    isSale: false,
    isFeatured: true,
    tags: ['oxford', 'dress shoes', 'formal'],
    sku: 'MSH-001'
  },
  {
    name: 'Running Sneakers',
    brand: 'Nike',
    description: 'High-performance running shoes for athletes.',
    category: 'men',
    subcategory: 'shoes',
    type: 'sneakers',
    price: 129.99,
    images: [
      {
        public_id: 'men/shoe2',
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Red', code: '#FF0000' },
      { name: 'Blue', code: '#0000FF' },
      { name: 'Black', code: '#000000' }
    ],
    sizes: [
      { size: '7', stock: 15 },
      { size: '8', stock: 20 },
      { size: '9', stock: 25 },
      { size: '10', stock: 22 },
      { size: '11', stock: 18 },
      { size: '12', stock: 12 }
    ],
    stock: 112,
    rating: 4.8,
    numReviews: 789,
    isNew: true,
    isSale: false,
    isFeatured: true,
    tags: ['sneakers', 'running', 'athletic'],
    sku: 'MSH-002'
  },
  {
    name: 'Chelsea Boots',
    brand: 'Clarks',
    description: 'Stylish Chelsea boots for casual and smart-casual looks.',
    category: 'men',
    subcategory: 'shoes',
    type: 'boots',
    price: 149.99,
    images: [
      {
        public_id: 'men/shoe3',
        url: 'https://images.unsplash.com/photo-1608256246200-53e635b8859c',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Brown', code: '#8B4513' },
      { name: 'Black', code: '#000000' }
    ],
    sizes: [
      { size: '7', stock: 10 },
      { size: '8', stock: 15 },
      { size: '9', stock: 18 },
      { size: '10', stock: 15 },
      { size: '11', stock: 10 },
      { size: '12', stock: 8 }
    ],
    stock: 76,
    rating: 4.7,
    numReviews: 234,
    isNew: false,
    isSale: true,
    isFeatured: false,
    tags: ['boots', 'chelsea', 'casual'],
    sku: 'MSH-003'
  },
  {
    name: 'Loafers',
    brand: 'Cole Haan',
    description: 'Classic loafers for casual sophistication.',
    category: 'men',
    subcategory: 'shoes',
    type: 'loafers',
    price: 119.99,
    images: [
      {
        public_id: 'men/shoe4',
        url: 'https://images.unsplash.com/photo-1539768942893-daf53e448371',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Brown', code: '#8B4513' },
      { name: 'Black', code: '#000000' },
      { name: 'Tan', code: '#D2B48C' }
    ],
    sizes: [
      { size: '7', stock: 12 },
      { size: '8', stock: 18 },
      { size: '9', stock: 22 },
      { size: '10', stock: 20 },
      { size: '11', stock: 15 },
      { size: '12', stock: 10 }
    ],
    stock: 97,
    rating: 4.7,
    numReviews: 189,
    isNew: true,
    isSale: false,
    isFeatured: false,
    tags: ['loafers', 'casual', 'comfort'],
    sku: 'MSH-004'
  },

  // Accessories
  {
    name: 'Automatic Watch',
    brand: 'Seiko',
    description: 'Precision automatic watch with elegant design.',
    category: 'men',
    subcategory: 'accessories',
    type: 'watches',
    price: 299.99,
    images: [
      {
        public_id: 'men/acc1',
        url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Black', code: '#000000' },
      { name: 'Silver', code: '#C0C0C0' },
      { name: 'Gold', code: '#FFD700' }
    ],
    sizes: [
      { size: 'One Size', stock: 30 }
    ],
    stock: 30,
    rating: 4.8,
    numReviews: 145,
    isNew: true,
    isSale: false,
    isFeatured: true,
    tags: ['watch', 'automatic', 'luxury'],
    sku: 'MAC-001'
  },
  {
    name: 'Leather Belt',
    brand: 'Coach',
    description: 'Genuine leather belt with classic buckle.',
    category: 'men',
    subcategory: 'accessories',
    type: 'belts',
    price: 79.99,
    images: [
      {
        public_id: 'men/acc2',
        url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Brown', code: '#8B4513' },
      { name: 'Black', code: '#000000' }
    ],
    sizes: [
      { size: '30', stock: 20 },
      { size: '32', stock: 25 },
      { size: '34', stock: 20 },
      { size: '36', stock: 15 },
      { size: '38', stock: 10 }
    ],
    stock: 90,
    rating: 4.7,
    numReviews: 189,
    isNew: false,
    isSale: false,
    isFeatured: true,
    tags: ['belt', 'leather', 'accessory'],
    sku: 'MAC-002'
  },
  {
    name: 'Leather Wallet',
    brand: 'Bellroy',
    description: 'Slim leather wallet with smart storage.',
    category: 'men',
    subcategory: 'accessories',
    type: 'wallets',
    price: 89.99,
    images: [
      {
        public_id: 'men/acc3',
        url: 'https://images.unsplash.com/photo-1627123424574-7247585940ea',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Brown', code: '#8B4513' },
      { name: 'Black', code: '#000000' },
      { name: 'Tan', code: '#D2B48C' }
    ],
    sizes: [
      { size: 'One Size', stock: 50 }
    ],
    stock: 50,
    rating: 4.8,
    numReviews: 234,
    isNew: true,
    isSale: false,
    isFeatured: false,
    tags: ['wallet', 'leather', 'accessory'],
    sku: 'MAC-003'
  },
  {
    name: 'Sunglasses',
    brand: 'Ray-Ban',
    description: 'Classic aviator sunglasses with UV protection.',
    category: 'men',
    subcategory: 'accessories',
    type: 'sunglasses',
    price: 159.99,
    originalPrice: 199.99,
    images: [
      {
        public_id: 'men/acc4',
        url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Gold/Green', code: '#FFD700' },
      { name: 'Black/Gray', code: '#000000' }
    ],
    sizes: [
      { size: 'One Size', stock: 35 }
    ],
    stock: 35,
    rating: 4.8,
    numReviews: 267,
    isNew: false,
    isSale: true,
    isFeatured: true,
    tags: ['sunglasses', 'aviator', 'accessory'],
    sku: 'MAC-004'
  },

  // ===== KIDS' PRODUCTS =====
  // Girls
  {
    name: 'Girls Party Dress',
    brand: 'Gymboree',
    description: 'Beautiful party dress for special occasions.',
    category: 'kids',
    subcategory: 'girls',
    type: 'dresses',
    price: 39.99,
    images: [
      {
        public_id: 'kids/girl1',
        url: 'https://images.unsplash.com/photo-1503919545889-a0f7c5c3e4b0',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Pink', code: '#FF69B4' },
      { name: 'White', code: '#FFFFFF' },
      { name: 'Purple', code: '#800080' }
    ],
    sizes: [
      { size: '2T', stock: 15 },
      { size: '3T', stock: 20 },
      { size: '4T', stock: 18 },
      { size: '5T', stock: 15 },
      { size: '6', stock: 12 }
    ],
    stock: 80,
    rating: 4.8,
    numReviews: 89,
    isNew: true,
    isSale: false,
    isFeatured: true,
    tags: ['girls', 'dress', 'party'],
    sku: 'KGD-001'
  },
  {
    name: 'Girls Jeans',
    brand: 'Old Navy',
    description: 'Comfortable jeans for everyday play.',
    category: 'kids',
    subcategory: 'girls',
    type: 'jeans',
    price: 24.99,
    images: [
      {
        public_id: 'kids/girl2',
        url: 'https://images.unsplash.com/photo-1519238427875-53cd699bdcf5',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Blue', code: '#0000FF' },
      { name: 'Pink', code: '#FFC0CB' }
    ],
    sizes: [
      { size: '2T', stock: 20 },
      { size: '3T', stock: 25 },
      { size: '4T', stock: 22 },
      { size: '5T', stock: 18 },
      { size: '6', stock: 15 }
    ],
    stock: 100,
    rating: 4.6,
    numReviews: 134,
    isNew: false,
    isSale: false,
    isFeatured: false,
    tags: ['girls', 'jeans', 'casual'],
    sku: 'KGD-002'
  },
  {
    name: 'Girls T-Shirt',
    brand: 'The Children\'s Place',
    description: 'Colorful t-shirt with fun prints.',
    category: 'kids',
    subcategory: 'girls',
    type: 'tops',
    price: 14.99,
    images: [
      {
        public_id: 'kids/girl3',
        url: 'https://images.unsplash.com/photo-1519238427875-53cd699bdcf5',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Pink', code: '#FF69B4' },
      { name: 'Purple', code: '#800080' },
      { name: 'Yellow', code: '#FFFF00' }
    ],
    sizes: [
      { size: '2T', stock: 30 },
      { size: '3T', stock: 35 },
      { size: '4T', stock: 30 },
      { size: '5T', stock: 25 },
      { size: '6', stock: 20 }
    ],
    stock: 140,
    rating: 4.7,
    numReviews: 98,
    isNew: true,
    isSale: false,
    isFeatured: false,
    tags: ['girls', 't-shirt', 'casual'],
    sku: 'KGD-003'
  },

  // Boys
  {
    name: 'Boys Shirt',
    brand: 'The Children\'s Place',
    description: 'Stylish button-down shirt for young gentlemen.',
    category: 'kids',
    subcategory: 'boys',
    type: 'shirts',
    price: 19.99,
    images: [
      {
        public_id: 'kids/boy1',
        url: 'https://images.unsplash.com/photo-1519238427875-53cd699bdcf5',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Blue', code: '#0000FF' },
      { name: 'Red', code: '#FF0000' },
      { name: 'White', code: '#FFFFFF' }
    ],
    sizes: [
      { size: '2T', stock: 18 },
      { size: '3T', stock: 22 },
      { size: '4T', stock: 20 },
      { size: '5T', stock: 16 },
      { size: '6', stock: 14 }
    ],
    stock: 90,
    rating: 4.7,
    numReviews: 78,
    isNew: true,
    isSale: false,
    isFeatured: true,
    tags: ['boys', 'shirt', 'formal'],
    sku: 'KBD-001'
  },
  {
    name: 'Boys Jeans',
    brand: 'Old Navy',
    description: 'Durable jeans for active boys.',
    category: 'kids',
    subcategory: 'boys',
    type: 'jeans',
    price: 24.99,
    images: [
      {
        public_id: 'kids/boy2',
        url: 'https://images.unsplash.com/photo-1519238427875-53cd699bdcf5',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Blue', code: '#0000FF' },
      { name: 'Black', code: '#000000' }
    ],
    sizes: [
      { size: '2T', stock: 20 },
      { size: '3T', stock: 25 },
      { size: '4T', stock: 22 },
      { size: '5T', stock: 18 },
      { size: '6', stock: 15 }
    ],
    stock: 100,
    rating: 4.7,
    numReviews: 89,
    isNew: false,
    isSale: true,
    isFeatured: false,
    tags: ['boys', 'jeans', 'casual'],
    sku: 'KBD-002'
  },
  {
    name: 'Boys Hoodie',
    brand: 'Gap Kids',
    description: 'Cozy hoodie for cool weather.',
    category: 'kids',
    subcategory: 'boys',
    type: 'hoodies',
    price: 29.99,
    images: [
      {
        public_id: 'kids/boy3',
        url: 'https://images.unsplash.com/photo-1519238427875-53cd699bdcf5',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Gray', code: '#808080' },
      { name: 'Blue', code: '#0000FF' },
      { name: 'Green', code: '#008000' }
    ],
    sizes: [
      { size: '2T', stock: 15 },
      { size: '3T', stock: 20 },
      { size: '4T', stock: 18 },
      { size: '5T', stock: 15 },
      { size: '6', stock: 12 }
    ],
    stock: 80,
    rating: 4.8,
    numReviews: 67,
    isNew: true,
    isSale: false,
    isFeatured: true,
    tags: ['boys', 'hoodie', 'winter'],
    sku: 'KBD-003'
  },

  // Baby
  {
    name: 'Baby Onesie Set',
    brand: 'Carter\'s',
    description: 'Soft cotton onesie set for newborns.',
    category: 'kids',
    subcategory: 'baby',
    type: 'onesies',
    price: 29.99,
    images: [
      {
        public_id: 'kids/baby1',
        url: 'https://images.unsplash.com/photo-1522771930-78848d9293e8',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Pink', code: '#FFC0CB' },
      { name: 'Blue', code: '#ADD8E6' },
      { name: 'Yellow', code: '#FFFF00' }
    ],
    sizes: [
      { size: '0-3M', stock: 25 },
      { size: '3-6M', stock: 30 },
      { size: '6-9M', stock: 25 },
      { size: '9-12M', stock: 20 }
    ],
    stock: 100,
    rating: 4.9,
    numReviews: 234,
    isNew: true,
    isSale: false,
    isFeatured: true,
    tags: ['baby', 'onesie', 'set'],
    sku: 'KBB-001'
  },
  {
    name: 'Baby Sleepwear',
    brand: 'Burt\'s Bees Baby',
    description: 'Organic cotton sleepwear for comfortable nights.',
    category: 'kids',
    subcategory: 'baby',
    type: 'sleepwear',
    price: 24.99,
    images: [
      {
        public_id: 'kids/baby2',
        url: 'https://images.unsplash.com/photo-1522771930-78848d9293e8',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'White', code: '#FFFFFF' },
      { name: 'Gray', code: '#808080' }
    ],
    sizes: [
      { size: '0-3M', stock: 20 },
      { size: '3-6M', stock: 25 },
      { size: '6-9M', stock: 20 },
      { size: '9-12M', stock: 15 }
    ],
    stock: 80,
    rating: 4.8,
    numReviews: 156,
    isNew: false,
    isSale: false,
    isFeatured: false,
    tags: ['baby', 'sleepwear', 'pajamas'],
    sku: 'KBB-002'
  },
  {
    name: 'Baby Shoes',
    brand: 'Stride Rite',
    description: 'Soft-soled shoes for first steps.',
    category: 'kids',
    subcategory: 'baby',
    type: 'shoes',
    price: 34.99,
    images: [
      {
        public_id: 'kids/baby3',
        url: 'https://images.unsplash.com/photo-1522771930-78848d9293e8',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'White', code: '#FFFFFF' },
      { name: 'Pink', code: '#FFC0CB' },
      { name: 'Blue', code: '#ADD8E6' }
    ],
    sizes: [
      { size: '0-3M', stock: 15 },
      { size: '3-6M', stock: 18 },
      { size: '6-9M', stock: 15 },
      { size: '9-12M', stock: 12 }
    ],
    stock: 60,
    rating: 4.7,
    numReviews: 89,
    isNew: true,
    isSale: true,
    isFeatured: false,
    tags: ['baby', 'shoes', 'first-steps'],
    sku: 'KBB-003'
  },

  // ===== ACCESSORIES (General) =====
  {
    name: 'Leather Backpack',
    brand: 'Herschel',
    description: 'Stylish leather backpack for everyday use.',
    category: 'accessories',
    subcategory: 'bags',
    type: 'backpack',
    price: 89.99,
    images: [
      {
        public_id: 'acc/bag1',
        url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Brown', code: '#8B4513' },
      { name: 'Black', code: '#000000' }
    ],
    sizes: [
      { size: 'One Size', stock: 40 }
    ],
    stock: 40,
    rating: 4.7,
    numReviews: 178,
    isNew: true,
    isSale: false,
    isFeatured: true,
    tags: ['backpack', 'leather', 'bags'],
    sku: 'GAC-001'
  },
  {
    name: 'Silk Scarf',
    brand: 'Hermès',
    description: 'Luxurious silk scarf with iconic print.',
    category: 'accessories',
    subcategory: 'scarves',
    type: 'scarf',
    price: 199.99,
    images: [
      {
        public_id: 'acc/scarf1',
        url: 'https://images.unsplash.com/photo-1584036773698-9fd9e5a5e6b7',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Orange', code: '#FFA500' },
      { name: 'Blue', code: '#0000FF' },
      { name: 'Red', code: '#FF0000' }
    ],
    sizes: [
      { size: 'One Size', stock: 20 }
    ],
    stock: 20,
    rating: 4.9,
    numReviews: 67,
    isNew: true,
    isSale: false,
    isFeatured: true,
    tags: ['scarf', 'silk', 'luxury'],
    sku: 'GAC-002'
  },

  // ===== FOOTWEAR (General) =====
  {
    name: 'Running Shoes',
    brand: 'Nike',
    description: 'High-performance running shoes for athletes.',
    category: 'footwear',
    subcategory: 'sports',
    type: 'running',
    price: 129.99,
    images: [
      {
        public_id: 'foot/shoe1',
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Red', code: '#FF0000' },
      { name: 'Blue', code: '#0000FF' },
      { name: 'Black', code: '#000000' }
    ],
    sizes: [
      { size: '7', stock: 15 },
      { size: '8', stock: 20 },
      { size: '9', stock: 25 },
      { size: '10', stock: 22 },
      { size: '11', stock: 18 },
      { size: '12', stock: 12 }
    ],
    stock: 112,
    rating: 4.8,
    numReviews: 456,
    isNew: true,
    isSale: false,
    isFeatured: true,
    tags: ['running', 'sports', 'shoes'],
    sku: 'FWT-001'
  },
  {
    name: 'Hiking Boots',
    brand: 'Merrell',
    description: 'Durable hiking boots for outdoor adventures.',
    category: 'footwear',
    subcategory: 'boots',
    type: 'hiking',
    price: 159.99,
    images: [
      {
        public_id: 'foot/shoe2',
        url: 'https://images.unsplash.com/photo-1608256246200-53e635b8859c',
        isPrimary: true
      }
    ],
    colors: [
      { name: 'Brown', code: '#8B4513' },
      { name: 'Black', code: '#000000' }
    ],
    sizes: [
      { size: '7', stock: 10 },
      { size: '8', stock: 15 },
      { size: '9', stock: 18 },
      { size: '10', stock: 15 },
      { size: '11', stock: 10 },
      { size: '12', stock: 8 }
    ],
    stock: 76,
    rating: 4.8,
    numReviews: 234,
    isNew: true,
    isSale: false,
    isFeatured: false,
    tags: ['hiking', 'boots', 'outdoor'],
    sku: 'FWT-002'
  }
];

const seedProducts = async () => {
console.log(".....................",process.env.MONGO_URI)
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('✅ Cleared existing products');

    // Insert new products
    const products = await Product.insertMany(productsData);
    console.log(`✅ Added ${products.length} products to database`);

    // Count products by category
    const womenCount = await Product.countDocuments({ category: 'women' });
    const menCount = await Product.countDocuments({ category: 'men' });
    const kidsCount = await Product.countDocuments({ category: 'kids' });
    const accessoriesCount = await Product.countDocuments({ category: 'accessories' });
    const footwearCount = await Product.countDocuments({ category: 'footwear' });
    const newArrivalsCount = await Product.countDocuments({ isNew: true });
    const saleCount = await Product.countDocuments({ isSale: true });
    const featuredCount = await Product.countDocuments({ isFeatured: true });

    console.log('\n📊 Product Statistics:');
    console.log(`Women: ${womenCount} products`);
    console.log(`Men: ${menCount} products`);
    console.log(`Kids: ${kidsCount} products`);
    console.log(`Accessories: ${accessoriesCount} products`);
    console.log(`Footwear: ${footwearCount} products`);
    console.log(`New Arrivals: ${newArrivalsCount} products`);
    console.log(`Sale Items: ${saleCount} products`);
    console.log(`Featured: ${featuredCount} products`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();