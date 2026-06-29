import Header from '@/app/components/Header';
import { motion } from 'motion/react';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ResponsiveImage } from '@/app/components/ResponsiveImage';
import { useShopping } from '@/app/context/ShoppingContext';

export default function Cart() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart, removeFromCart, updateCartItem, getCartTotal, getCartItemCount } = useShopping();
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <Header
          cartCount={getCartItemCount()}
          onCartClick={() => {}}
          onMobileMenuToggle={setMobileMenuOpen}
          mobileMenuOpen={mobileMenuOpen}
        />

        <section className="pt-32 pb-32 px-6">
          <div className="max-w-[600px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h1
                className="text-[clamp(2rem,4vw,3.5rem)] leading-tight font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Your Cart is Empty
              </h1>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any shoes yet. Start exploring our collection!
              </p>

              <Link
                to="/shop"
                className="inline-block px-8 py-4 bg-gradient-to-r from-[#ADD8E6] to-[#87CEEB] text-white font-semibold tracking-wider uppercase hover:shadow-lg transition-shadow"
              >
                Continue Shopping
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Header
        cartCount={getCartItemCount()}
        onCartClick={() => {}}
        onMobileMenuToggle={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
      />

      {/* Page Header */}
      <section className="pt-24 pb-12 px-6 border-b border-border">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="text-[clamp(2rem,4vw,3.5rem)] leading-tight font-bold mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Your Cart
            </h1>
            <p className="text-gray-600">{cart.length} item(s) in your bag</p>
          </motion.div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1fr_320px] gap-6 sm:gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="space-y-4 sm:space-y-6">
            {cart.map((item, index) => (
              <motion.div
                key={`${item.id}-${item.size}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex gap-3 sm:gap-6 pb-4 sm:pb-6 border-b border-border"
              >
                {/* Product Image */}
                <div className="w-20 sm:w-24 h-20 sm:h-24 bg-gray-100 flex-shrink-0 rounded">
                  <ResponsiveImage
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-contain p-2"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-grow min-w-0">
                  <Link
                    to={`/product/${item.id}`}
                    className="text-sm sm:text-base font-semibold hover:text-[#ADD8E6] transition-colors line-clamp-2"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs text-gray-600 mt-1">{item.colorLabel}</p>
                  <p className="text-xs sm:text-sm font-medium text-gray-700 mt-1">Size: UK {item.size}</p>

                  {/* Price */}
                  <p className="text-base sm:text-lg font-bold text-[#ADD8E6] mt-2">₹{item.price}</p>
                </div>

                {/* Quantity & Actions */}
                <div className="flex flex-col items-end justify-between gap-3">
                  {/* Quantity Control */}
                  <div className="flex items-center border border-border rounded">
                    <button
                      onClick={() => updateCartItem(item.id, item.size, item.quantity - 1)}
                      className="p-1.5 sm:p-2 hover:bg-gray-100 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-3 sm:px-4 py-1 sm:py-2 font-medium text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateCartItem(item.id, item.size, item.quantity + 1)}
                      className="p-1.5 sm:p-2 hover:bg-gray-100 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Item Total & Remove */}
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-2">
                      ₹{item.price * item.quantity}
                    </p>
                    <motion.button
                      onClick={() => removeFromCart(item.id, item.size)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-red-600 hover:text-red-700 transition-colors flex items-center gap-1"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 p-6 sm:p-8 rounded-lg h-fit sticky top-16 sm:top-20"
          >
            <h3
              className="text-xl sm:text-2xl font-bold mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Order Summary
            </h3>

            <div className="space-y-3 sm:space-y-4 mb-6 pb-6 border-b border-border">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-700">Subtotal</span>
                <span className="font-semibold">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-700">Shipping</span>
                <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : ''}`}>
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>
            </div>

            <div className="flex justify-between mb-6 sm:mb-8">
              <span className="text-base sm:text-lg font-bold">Total</span>
              <span
                className="text-xl sm:text-2xl font-bold text-[#ADD8E6]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                ₹{total}
              </span>
            </div>

            <motion.button
              onClick={() => navigate('/checkout')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-[#ADD8E6] to-[#87CEEB] text-white py-3 sm:py-4 font-semibold tracking-wider uppercase hover:shadow-lg transition-shadow flex items-center justify-center gap-2 mb-3 sm:mb-4 text-sm sm:text-base"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </motion.button>

            <Link
              to="/shop"
              className="block text-center text-xs sm:text-sm text-[#ADD8E6] hover:text-[#87CEEB] transition-colors py-2"
            >
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0c0c0c] text-white py-16 px-6 mt-16">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-xs text-gray-400">© 2024 TOPSUN Performance Sneakers. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

import React from 'react';

