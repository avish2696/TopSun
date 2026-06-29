import Header from '@/app/components/Header';
import { motion } from 'motion/react';
import { Search, Package, Truck, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TrackOrder() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount] = useState(0);
  const navigate = useNavigate();
  const [trackingId, setTrackingId] = useState('');

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Header
        cartCount={cartCount}
        onCartClick={() => navigate('/cart')}
        onMobileMenuToggle={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
      />

      {/* Hero */}
      <section className="pt-24 pb-20 px-6 bg-gradient-to-b from-[#0c0c0c] to-[#1a1a1a] text-white">
        <div className="max-w-[1400px] mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(2.5rem,6vw,5rem)] font-black mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Track Your Order
          </motion.h1>
          <p className="text-lg text-gray-300">Enter your tracking number to see the status of your TOPSUN order.</p>
        </div>
      </section>

      {/* Tracking Form */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border-2 border-gray-200 p-8 rounded-lg"
          >
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter your tracking number..."
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ADD8E6]"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-[#ADD8E6] text-white font-bold rounded-lg flex items-center gap-2"
              >
                <Search size={20} />
                Track
              </motion.button>
            </div>
          </motion.div>

          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold mb-8 text-center">Shipping Status</h2>
            <div className="space-y-6">
              {[
                { icon: CheckCircle, status: 'Order Confirmed', time: '2 days ago' },
                { icon: Package, status: 'Shipped', time: '1 day ago' },
                { icon: Truck, status: 'In Transit', time: 'Today' },
              ].map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 items-start pb-6 border-l-2 border-[#ADD8E6] pl-6 relative"
                  >
                    <div className="absolute -left-3 top-2 bg-[#ADD8E6] p-2 rounded-full text-white">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{step.status}</h3>
                      <p className="text-gray-600">{step.time}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Info */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg"
            >
              <h3 className="font-bold text-lg mb-4">🚚 Shipping Info</h3>
              <p className="text-gray-700">Standard delivery takes 5-7 business days within India. International orders take 10-15 business days.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-lg"
            >
              <h3 className="font-bold text-lg mb-4">📍 Tracking Number</h3>
              <p className="text-gray-700">You'll receive your tracking number via email as soon as your order ships. You can track it here anytime.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0c0c0c] text-white/70 py-8 px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-xs">© 2025 TOPSUN Performance Sneakers. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

import React from 'react';
