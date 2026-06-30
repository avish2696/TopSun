import Header from '@/app/components/Header';
import { motion } from 'motion/react';
import { Heart, Star } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ResponsiveImage } from '@/app/components/ResponsiveImage';
import { useShopping, CartItem } from '@/app/context/ShoppingContext';
import { PRODUCTS_DATABASE } from '@/app/routes/Routes';
import Shoe1 from '@/imports/shoe1/1.png';
import Shoe2 from '@/imports/shoe2/1.png';
import Shoe3 from '@/imports/shoe3/1.png';
import Shoe4 from '@/imports/shoe4/1.png';
import Shoe5 from '@/imports/shoe5/1.png';
import Shoe6 from '@/imports/shoe6/1.png';
import Shoe7 from '@/imports/shoe7/1.jpeg';

const shoeImages: Record<number, string> = {
  1: Shoe1,
  2: Shoe2,
  3: Shoe3,
  4: Shoe4,
  5: Shoe5,
  6: Shoe6,
  7: Shoe7,
};

const tagStyles: Record<string, string> = {
  Sale: 'bg-[#ADD8E6] text-white',
  New: 'bg-[#0c0c0c] text-white',
  Bestseller: 'bg-[#f0ede8] text-[#0c0c0c]',
  Limited: 'bg-[#3a2f2f] text-white',
};

export default function Shop() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { addToCart, getCartItemCount } = useShopping();
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleWishlist = (id: number) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (product: any) => {
    // Default to size 9, quantity 1
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: shoeImages[product.id],
      size: 9,
      quantity: 1,
      colorLabel: product.colorLabel,
    };
    addToCart(cartItem);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const sortedProducts = [...PRODUCTS_DATABASE].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <Header
        cartCount={getCartItemCount()}
        onCartClick={() => navigate('/cart')}
        onMobileMenuToggle={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
      />

      {/* Page Header */}
      <section className="pt-24 pb-12 px-6 bg-gradient-to-b from-[#0c0c0c] to-[#1a1a1a] text-white">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] font-black mb-4 tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Shop All Styles
            </h1>
            <p className="text-lg text-gray-300">
              {PRODUCTS_DATABASE.length} products available
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Sort */}
      <section className="py-8 px-6 border-b border-border">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm text-muted-foreground">Showing {sortedProducts.length} products</p>
          </div>

          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-border text-sm focus:outline-none focus:border-[#ADD8E6]"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 sm:py-16 px-3 sm:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-1 sm:gap-2 md:gap-3 bg-border">
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group bg-white relative flex flex-col cursor-pointer h-full"
              >
                {/* Image Container */}
                <Link to={`/product/${product.id}`} className="no-underline">
                  <div
                    className="relative overflow-hidden aspect-square flex items-center justify-center px-2 sm:px-4 py-3 sm:py-6"
                    style={{ backgroundColor: product.cardBg }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <ResponsiveImage
                        src={shoeImages[product.id]}
                        alt={product.name}
                        loading="lazy"
                        sizes="(max-width: 640px) 48vw, (max-width: 1024px) 33vw, 25vw"
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </motion.div>

                    {/* Tag */}
                    {product.tag && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className={`absolute top-2 sm:top-4 left-2 sm:left-4 text-[9px] sm:text-[11px] font-medium tracking-widest uppercase px-2 sm:px-2.5 py-1 sm:py-1.5 ${
                          tagStyles[product.tag]
                        }`}
                      >
                        {product.tag}
                      </motion.span>
                    )}

                    {/* Wishlist Button */}
                    <motion.button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(product.id);
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-10 sm:h-10 bg-white flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"
                      aria-label="Add to wishlist"
                    >
                      <Heart
                        size={14}
                        className={
                          wishlist.includes(product.id)
                            ? 'fill-[#ADD8E6] text-[#ADD8E6]'
                            : 'text-foreground'
                        }
                      />
                    </motion.button>

                    {/* Quick Add Cart Button */}
                    <motion.button
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product);
                      }}
                      whileHover={{ y: -50 }}
                      whileTap={{ scale: 0.95 }}
                      className={`absolute bottom-0 left-0 right-0 text-white text-[10px] sm:text-xs tracking-[0.15em] uppercase py-2 sm:py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 font-semibold ${
                        addedToCart === product.id
                          ? 'bg-green-600'
                          : 'bg-[#0c0c0c] hover:bg-[#ADD8E6]'
                      }`}
                    >
                      {addedToCart === product.id ? '✓ Added' : 'Add to Cart'}
                    </motion.button>
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-2 sm:p-4 flex flex-col gap-2 flex-grow">
                  <p className="text-[9px] sm:text-[10px] tracking-widest uppercase text-muted-foreground font-medium">
                    TOPSUN · {product.category}
                  </p>
                  <h3 className="text-xs sm:text-sm font-semibold leading-snug">{product.name}</h3>
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground">{product.colorLabel}</p>

                  {/* Stars */}
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div key={i} whileHover={{ scale: 1.2 }} transition={{ type: 'spring' }}>
                        <Star
                          size={11}
                          className={
                            i < Math.floor(product.rating)
                              ? 'fill-[#ADD8E6] text-[#ADD8E6]'
                              : 'text-border fill-border'
                          }
                        />
                      </motion.div>
                    ))}
                    <span className="text-[9px] sm:text-[10px] text-muted-foreground ml-1 font-medium">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border">
                    <span className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                      ₹{product.price}
                    </span>
                    <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice}</span>
                    <span className="ml-auto text-[10px] bg-[#ADD8E6] text-white px-2 py-0.5 tracking-wide">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </div>

                  {/* View Details Link */}
                  <Link
                    to={`/product/${product.id}`}
                    className="text-xs text-[#ADD8E6] font-medium mt-3 hover:text-[#87CEEB] transition-colors"
                  >
                    View Details →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0c0c0c] text-white py-16 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-semibold text-sm tracking-wide mb-4">Shop</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><Link to="/" className="hover:text-white transition-colors">All Products</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Running</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Training</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm tracking-wide mb-4">Company</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm tracking-wide mb-4">Support</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><a href="/" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Shipping</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm tracking-wide mb-4">Legal</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><a href="/" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-xs text-gray-400">© 2024 TOPSUN Performance Sneakers. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import React from 'react';

