// src/components/home/CategoryShowcase.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

// const categories = [
//   {
//     name: "Women's Fashion",
//     image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc',
//     itemCount: 1245,
//     color: 'from-pink-500 to-rose-500',
//   },
//   {
//     name: "Men's Collection",
//     image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
//     itemCount: 987,
//     color: 'from-blue-500 to-cyan-500',
//   },
//   {
//     name: 'Accessories',
//     image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49',
//     itemCount: 756,
//     color: 'from-purple-500 to-indigo-500',
//   },
//   {
//     name: 'Footwear',
//     image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
//     itemCount: 543,
//     color: 'from-amber-500 to-orange-500',
//   },
// ];

const categories = [
  {
    name: "Premium Menswear",
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    itemCount: 1245,
    color: 'from-slate-700 to-slate-900', // Classic dark professional tones
  },
  {
    name: "Tech & Gadgets",
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80',
    itemCount: 987,
    color: 'from-blue-600 to-indigo-700',
  },
  {
    name: 'Luxury Watches',
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=800&q=80',
    itemCount: 756,
    color: 'from-gray-600 to-gray-800',
  },
  {
    name: 'Footwear',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80',
    itemCount: 543,
    color: 'from-orange-600 to-red-700',
  },
];
export const CategoryShowcase = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4"
          >
            Shop by Category
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Explore our curated collections for every style and occasion
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity`} />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-white/90 mb-4">
                  {category.itemCount} items
                </p>
                <motion.button
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center text-white font-semibold group"
                >
                  <span>Shop Now</span>
                  <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:ml-3 transition-all" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};