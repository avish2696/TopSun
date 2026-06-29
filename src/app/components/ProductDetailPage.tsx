'use client';

import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Truck, RefreshCw, Check, ChevronDown, ArrowLeft, Zap, Shield, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveImage } from './ResponsiveImage';

interface ProductDetailPageProps {
  product?: any;
  onAddToCart?: (size: number | string, quantity: number) => void;
  onAddToWishlist?: () => void;
  relatedProducts?: any[];
}

const sampleProduct = {
  id: 1,
  name: 'Apex Desert Sand',
  brand: 'TOPSUN',
  price: 599,
  originalPrice: 1599,
  rating: 4.9,
  reviews: 301,
  colorLabel: 'White / Desert Sand',
  mainImage: '/images/shoe-main.png',
  images: ['/images/shoe-1.png', '/images/shoe-2.png', '/images/shoe-3.png', '/images/shoe-4.png', '/images/shoe-5.png'],
  category: 'Training',
  description: 'Experience the pinnacle of modern athletic footwear. Meticulously crafted for the performance-driven individual, these sneakers seamlessly blend cutting-edge engineering with timeless style.',
  material: '100% Engineered Mesh Upper | EVA Midsole | Rubber Outsole',
  fit: 'True to size',
  features: ['Engineered Mesh', 'Multi-density EVA', 'Non-slip Sole', 'Padded Collar', 'Reflective Strip', 'Carbon Forefoot'],
  sizes: [7, 8, 9, 10],
  inStock: true,
};

const sampleReviews = [
  { id: 1, author: 'Priya S.', rating: 5, text: 'Best shoes ever! Amazing comfort and quality.', date: '2 weeks ago' },
  { id: 2, author: 'Rajesh K.', rating: 4, text: 'Great value for money. Very comfortable.', date: '1 month ago' },
  { id: 3, author: 'Aisha P.', rating: 5, text: 'Perfect! Wore them for a week straight.', date: '1 month ago' },
];

export default function ProductDetailPage({ product = sampleProduct, onAddToCart, onAddToWishlist, relatedProducts = [] }: ProductDetailPageProps) {
  const [selectedSize, setSelectedSize] = useState<number | string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const navigate = useNavigate();

  // Use product images if available, otherwise fall back to sample
  const productImages = product?.images && product.images.length > 0 
    ? product.images 
    : (product?.image 
      ? [product.image] 
      : sampleProduct.images);

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    onAddToCart?.(selectedSize, quantity);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Always visible on mobile */}
      <motion.div 
        initial={{ y: 0 }} 
        animate={{ y: 0 }} 
        className="sticky top-0 left-0 right-0 z-50 bg-white border-b border-gray-100"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft size={24} className="text-gray-700" />
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsWishlisted(!isWishlisted)} className="p-2 hover:bg-gray-100 rounded-lg">
            <Heart size={24} className={isWishlisted ? 'fill-[#ADD8E6] text-[#ADD8E6]' : 'text-gray-700'} />
          </motion.button>
        </div>
      </motion.div>

      {/* Image Carousel with Swipe Support */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
        <div className="relative w-full bg-gradient-to-b from-gray-50 to-white aspect-square overflow-hidden"
          onTouchStart={(e) => {
            const touch = e.touches[0];
            setTouchStart(touch.clientX);
          }}
          onTouchMove={(e) => {
            if (!touchStart) return;
            const touch = e.touches[0];
            const diff = touchStart - touch.clientX;
            if (Math.abs(diff) > 50) {
              if (diff > 0 && currentImageIdx < productImages.length - 1) {
                setCurrentImageIdx(currentImageIdx + 1);
                setTouchStart(null);
              } else if (diff < 0 && currentImageIdx > 0) {
                setCurrentImageIdx(currentImageIdx - 1);
                setTouchStart(null);
              }
            }
          }}
          onTouchEnd={() => setTouchStart(null)}
        >
          {/* Main Image */}
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIdx}
              src={productImages[currentImageIdx]}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-contain p-6"
              alt={product.name}
            />
          </AnimatePresence>

          {/* Discount Badge */}
          {discount > 0 && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-4 left-4 bg-[#ADD8E6] text-white px-3 py-1 rounded-full text-xs font-bold">
              {discount}% OFF
            </motion.div>
          )}

          {/* Arrow Navigation */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {productImages.map((_, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.1 }}
                onClick={() => setCurrentImageIdx(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentImageIdx ? 'bg-[#ADD8E6] w-6' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnails */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex gap-2 px-4 py-2 overflow-x-auto md:justify-center">
          {productImages.map((img, idx) => (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentImageIdx(idx)}
              className={`w-14 h-14 flex-shrink-0 rounded-lg border-2 overflow-hidden transition-all ${
                idx === currentImageIdx ? 'border-[#ADD8E6] shadow-lg' : 'border-gray-200'
              }`}
            >
              <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain" />
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Product Info */}
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="px-4 md:max-w-2xl md:mx-auto py-4 space-y-4">
        {/* Brand & Name */}
        <div>
          <p className="text-xs font-bold tracking-widest text-[#ADD8E6] uppercase mb-1">{product.brand} • {product.category}</p>
          <h1 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            {product.name}
          </h1>
          <p className="text-xs text-gray-600 mt-1">{product.colorLabel}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'fill-[#ADD8E6] text-[#ADD8E6]' : 'text-gray-300'} />
            ))}
          </div>
          <span className="text-xs font-bold text-gray-700">{product.rating}</span>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="pb-3 border-b border-gray-200">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-4xl font-black text-[#ADD8E6]" style={{ fontFamily: "'Playfair Display', serif" }}>
              ₹{product.price}
            </span>
            {discount > 0 && <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>}
          </div>
          <p className="text-xs text-green-600 font-semibold">✓ In Stock</p>
        </div>

        {/* Size Selection */}
        <div>
          <label className="block text-xs font-bold mb-2 uppercase tracking-widest">Size (UK)</label>
          <div className="grid grid-cols-4 gap-2">
            {product.sizes.map((size) => (
              <motion.button
                key={size}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedSize(size)}
                className={`py-3 rounded-lg text-sm font-bold transition-all ${
                  selectedSize === size ? 'bg-[#ADD8E6] text-white shadow-lg' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {size}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase">Qty:</span>
          <div className="flex items-center bg-gray-100 rounded-lg">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-gray-200">
              −
            </motion.button>
            <span className="w-8 text-center font-bold">{quantity}</span>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-gray-200">
              +
            </motion.button>
          </div>
        </div>

        {/* Add to Cart */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-[#ADD8E6] to-[#87CEEB] text-white py-4 rounded-xl font-bold tracking-wide text-sm flex items-center justify-center gap-2 shadow-lg"
        >
          <ShoppingBag size={18} />
          Add to Bag
        </motion.button>

        {/* Quick Info */}
        <div className="space-y-2">
          {[
            { icon: Truck, text: 'Free Shipping Over ₹500' },
            { icon: RefreshCw, text: '30-Day Returns' },
            { icon: Shield, text: '100% Genuine' },
          ].map(({ icon: Icon, text }, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
              <div className="w-6 h-6 rounded-full bg-[#ADD8E6]/10 flex items-center justify-center text-[#ADD8E6]">
                <Icon size={12} />
              </div>
              {text}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-4 border-t border-gray-200">
        <div className="flex border-b border-gray-200 px-4 md:max-w-2xl md:mx-auto">
          {['details', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === tab ? 'text-[#ADD8E6] border-b-2 border-[#ADD8E6]' : 'text-gray-600'
              }`}
            >
              {tab === 'details' ? 'Details' : 'Reviews'}
            </button>
          ))}
        </div>

        <div className="px-4 md:max-w-2xl md:mx-auto py-6 md:py-8">
          <AnimatePresence mode="wait">
            {activeTab === 'details' && (
              <motion.div key="details" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold mb-2">About Product</h3>
                  <p className="text-xs leading-relaxed text-gray-700">{product.description}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div>
                    <h4 className="text-xs font-bold text-gray-700 mb-1 uppercase">Material</h4>
                    <p className="text-xs text-gray-600">{product.material}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-700 mb-1 uppercase">Fit</h4>
                    <p className="text-xs text-gray-600">{product.fit}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold mb-3">Features</h3>
                  <div className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                        <Check size={14} className="text-[#ADD8E6] flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div key="reviews" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
                {sampleReviews.map((review) => (
                  <motion.div key={review.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-xs font-bold">{review.author}</p>
                        <p className="text-xs text-gray-500">{review.date}</p>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className={i < review.rating ? 'fill-[#ADD8E6] text-[#ADD8E6]' : 'text-gray-300'} />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-700">{review.text}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="h-6" />
    </div>
  );
}
