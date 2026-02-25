// src/components/home/HeroSection.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';


// const heroImages = [
//   {
//     url: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=1600&q=80',
//     title: 'The Modern Gentleman',
//     subtitle: 'Tailored suits and premium office wear',
//     cta: 'Shop Formal',
//   },
//   {
//     url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1600&q=80',
//     title: 'Urban Streetwear',
//     subtitle: 'Limited edition hoodies and street culture essentials',
//     cta: 'View Drop',
//   },
//   {
//     url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&q=80',
//     title: 'Premium Footwear',
//     subtitle: 'From classic leather boots to high-performance sneakers',
//     cta: 'Explore Shoes',
//   },
// ];

const heroImages = [
  {
    url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&q=80',
    title: 'The Modern Gentleman',
    subtitle: 'Tailored suits and premium office wear',
    cta: 'Shop Formal',
  },
  {
    url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1600&q=80',
    title: 'Urban Streetwear',
    subtitle: 'Limited edition hoodies and street culture essentials',
    cta: 'View Drop',
  },
  {
    url: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1600&q=80',
    title: 'Premium Footwear',
    subtitle: 'From classic leather boots to high-performance sneakers',
    cta: 'Explore Shoes',
  },
];

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen max-h-[800px] overflow-hidden">
      {/* Slides */}
      {heroImages.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: currentSlide === index ? 1 : 0,
            scale: currentSlide === index ? 1 : 1.1
          }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src={image.url}
            alt={image.title}
            className="w-full h-full object-cover"
          />
          
          {/* Content */}
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center text-white px-4"
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-display font-bold mb-4"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {image.title}
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-8 text-gray-200"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {image.subtitle}
              </motion.p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="group bg-white text-gray-900 px-8 py-4 rounded-full font-semibold flex items-center space-x-2 mx-auto hover:bg-primary-600 hover:text-white transition-all"
              >
                <span>{image.cta}</span>
                <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      ))}

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              currentSlide === index 
                ? 'w-8 bg-white' 
                : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};