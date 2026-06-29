'use client';

import React, { useState, useRef } from 'react';
import { Heart, Star, ShoppingBag, Truck, RefreshCw, Check, ChevronDown, ArrowLeft, Zap, Shield, User, Calendar, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveImage } from './ResponsiveImage';
import ImageLightbox from './ImageLightbox';

interface ProductDetailPageProps {
  product?: {
    id: number;
    name: string;
    brand: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviews: number;
    colorLabel: string;
    images: string[];
    mainImage: string;
    category: string;
    description: string;
    material: string;
    fit: string;
    care: string;
    features: string[];
    sizes: (number | string)[];
    outOfStockSizes: (number | string)[];
    inStock: boolean;
  };
  onAddToCart?: (size: number | string, quantity: number) => void;
  onAddToWishlist?: () => void;
  relatedProducts?: any[];
}

const sampleProduct = {
  id: 1,
  name: 'Apex — Desert Sand',
  brand: 'TOPSUN',
  price: 599,
  originalPrice: 1599,
  rating: 4.9,
  reviews: 301,
  colorLabel: 'White / Desert Sand',
  mainImage: '/images/shoe-main.png',
  images: [
    '/images/shoe-1.png',
    '/images/shoe-2.png',
    '/images/shoe-3.png',
    '/images/shoe-4.png',
    '/images/shoe-5.png',
  ],
  category: 'Training',
  description:
    'Experience the pinnacle of modern athletic footwear with the TOPSUN Apex — Desert Sand edition. Meticulously crafted for the performance-driven individual, these sneakers seamlessly blend cutting-edge engineering with timeless style. Each element, from the breathable engineered mesh upper to the precision-engineered EVA midsole, has been designed to elevate your performance whether on the track, in the gym, or navigating the urban landscape.',
  material: '100% Engineered Mesh Upper | Cushioned EVA Midsole | Non-Slip Rubber Outsole',
  fit: 'True to size. For a wider fit, consider sizing up half a size.',
  care: 'Wipe clean with a damp cloth. Air dry at room temperature. Avoid direct sunlight.',
  features: [
    'Engineered Mesh Upper',
    'Multi-density EVA Midsole',
    'Non-slip Rubber Outsole',
    'Reflective Heel Strip',
    'Padded Collar',
    'Carbon-infused Forefoot',
  ],
  sizes: [7, 8, 9, 10],
  outOfStockSizes: [],
  inStock: true,
};

// Sample reviews
const sampleReviews = [
  {
    id: 1,
    author: 'Priya Sharma',
    rating: 5,
    date: '2 weeks ago',
    title: 'Best running shoes!',
    text: 'Absolutely love these. The cushioning is amazing and they fit perfectly.',
    helpful: 142,
  },
  {
    id: 2,
    author: 'Rajesh Kumar',
    rating: 4,
    date: '1 month ago',
    title: 'Great quality',
    text: 'For the price, these are unbeatable. Very comfortable for daily wear.',
    helpful: 89,
  },
  {
    id: 3,
    author: 'Aisha Patel',
    rating: 5,
    date: '1 month ago',
    title: 'Perfect shoes',
    text: 'Wore these for a week straight and my feet have never been happier!',
    helpful: 156,
  },
];

export default function ProductDetailPage({
  product = sampleProduct,
  onAddToCart,
  onAddToWishlist,
}: ProductDetailPageProps) {
  const [selectedSize, setSelectedSize] = useState<number | string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product.mainImage || product.images[0]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [expandedReview, setExpandedReview] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [product.id]);

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const isOnSale = discount > 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    onAddToCart?.(selectedSize, quantity);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    onAddToWishlist?.();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 md:hidden"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-700" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleWishlist}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Heart 
              size={24} 
              className={isWishlisted ? 'fill-[#ADD8E6] text-[#ADD8E6]' : 'text-gray-700'} 
            />
          </motion.button>
        </div>
      </motion.div>

      {/* Image Gallery - Full screen on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-16 md:pt-0"
      >
        <div className="w-full bg-gray-50 aspect-square relative overflow-hidden md:rounded-2xl md:max-w-2xl md:mx-auto">
          <motion.img
            key={mainImage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-contain p-4"
          />
          
          {/* Badge */}
          {isOnSale && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="absolute top-4 left-4 bg-[#ADD8E6] text-white px-3 py-1 rounded-full text-xs font-bold"
            >
              {discount}% OFF
            </motion.div>
          )}

          {/* Wishlist Button */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={toggleWishlist}
            className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all hidden md:flex"
          >
            <Heart 
              size={20} 
              className={isWishlisted ? 'fill-[#ADD8E6] text-[#ADD8E6]' : 'text-gray-700'} 
            />
          </motion.button>
        </div>

        {/* Image Thumbnails */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2 px-4 py-4 overflow-x-auto md:justify-center md:px-0 md:mt-4"
        >
          {product.images.map((image, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMainImage(image)}
              className={`w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                mainImage === image 
                  ? 'border-[#ADD8E6] shadow-lg' 
                  : 'border-gray-200 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={image} alt={`View ${idx + 1}`} className="w-full h-full object-contain" />
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="px-4 md:px-0 md:max-w-2xl md:mx-auto py-6 md:py-8"
      >
        {/* Brand & Category */}
        <div className="mb-3">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#ADD8E6] mb-1">
            {product.brand} • {product.category}
          </p>
          <p className="text-xs text-gray-600">{product.colorLabel}</p>
        </div>

        {/* Product Name */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl md:text-3xl font-bold mb-4 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {product.name}
        </motion.h1>

        {/* Rating */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="flex items-center gap-2 mb-6 pb-6 border-b border-gray-200"
        >
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.floor(product.rating) 
                  ? 'fill-[#ADD8E6] text-[#ADD8E6]' 
                  : 'text-gray-300 fill-gray-300'}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
          <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
        </motion.div>

        {/* Price Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6 pb-6 border-b border-gray-200"
        >
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-4xl md:text-5xl font-black text-[#ADD8E6]" style={{ fontFamily: "'Playfair Display', serif" }}>
              ₹{product.price}
            </span>
            {isOnSale && (
              <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
            )}
          </div>
          <p className="text-xs text-gray-600">
            {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
          </p>
        </motion.div>

        {/* Size Selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold">Size (UK)</label>
            <button className="text-xs font-medium text-[#ADD8E6] hover:underline">
              Size Guide
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.sizes.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <motion.button
                  key={size}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 rounded-lg text-sm font-bold tracking-wider transition-all ${
                    isSelected
                      ? 'bg-[#ADD8E6] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {size}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Quantity */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="text-sm font-semibold">Qty:</span>
          <div className="flex items-center bg-gray-100 rounded-lg">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              −
            </motion.button>
            <span className="w-10 text-center font-semibold text-sm">{quantity}</span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              +
            </motion.button>
          </div>
        </motion.div>

        {/* Add to Cart Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full bg-gradient-to-r from-[#ADD8E6] to-[#87CEEB] text-white py-4 rounded-xl font-bold tracking-wide text-sm flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
        >
          <ShoppingBag size={18} />
          Add to Bag
        </motion.button>

        {/* Quick Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 space-y-3"
        >
          {[
            { icon: Truck, text: 'Free Shipping on Orders Over ₹500' },
            { icon: RefreshCw, text: '30-Day Easy Returns' },
            { icon: Shield, text: '100% Genuine & Authentic' },
          ].map(({ icon: Icon, text }, idx) => (
            <div key={idx} className="flex items-center gap-3 text-xs text-gray-600">
              <div className="w-8 h-8 rounded-full bg-[#ADD8E6]/10 flex items-center justify-center text-[#ADD8E6]">
                <Icon size={14} />
              </div>
              {text}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Description & Reviews Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.5 }}
        className="mt-8 border-t border-gray-200"
      >
        {/* Tab Buttons */}
        <div className="flex border-b border-gray-200 px-4 md:px-0 md:max-w-2xl md:mx-auto">
          {['description', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`flex-1 py-4 text-sm font-semibold tracking-wide transition-all capitalize ${
                activeTab === tab
                  ? 'text-[#ADD8E6] border-b-2 border-[#ADD8E6]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="px-4 md:px-0 md:max-w-2xl md:mx-auto py-8">
          <AnimatePresence mode="wait">
            {activeTab === 'description' && (
              <motion.div
                key="description"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-gray-700 mb-2">About This Product</h3>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {product.description}
                    </p>
                  </div>

                  {/* Specs */}
                  <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-gray-700 mb-1 uppercase tracking-widest">Material</h4>
                      <p className="text-sm text-gray-600">{product.material}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-700 mb-1 uppercase tracking-widest">Fit</h4>
                      <p className="text-sm text-gray-600">{product.fit}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-700 mb-1 uppercase tracking-widest">Care</h4>
                      <p className="text-sm text-gray-600">{product.care}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-700 mb-3">Key Features</h3>
                    <div className="space-y-2">
                      {product.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <Check size={16} className="text-[#ADD8E6] flex-shrink-0" />
                          {feature}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {sampleReviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all"
                  >
                    {/* Review Header */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#ADD8E6] text-white flex items-center justify-center">
                          <User size={14} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-800">{review.author}</p>
                          <p className="text-xs text-gray-500">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={i < review.rating 
                              ? 'fill-[#ADD8E6] text-[#ADD8E6]' 
                              : 'text-gray-300 fill-gray-300'}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Review Title */}
                    <p className="text-sm font-semibold text-gray-800 mb-2">{review.title}</p>

                    {/* Review Text */}
                    <p className="text-sm text-gray-600 mb-3">{review.text}</p>

                    {/* Helpful Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#ADD8E6] transition-colors"
                    >
                      <ThumbsUp size={14} />
                      Helpful ({review.helpful})
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Footer Spacing */}
      <div className="h-8" />
    </div>
  );
}
