import Header from '@/app/components/Header';
import { motion } from 'motion/react';
import { CheckCircle, Clock, Package } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Returns() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount] = useState(0);
  const navigate = useNavigate();

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
            Returns & Refunds
          </motion.h1>
          <p className="text-lg text-gray-300">Easy 30-day returns. No questions asked.</p>
        </div>
      </section>

      {/* Policy */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold mb-8">Return Policy</h2>
            
            <div className="space-y-8">
              {[
                {
                  icon: Clock,
                  title: '30-Day Return Window',
                  desc: 'Return any item within 30 days of purchase for a full refund.',
                },
                {
                  icon: Package,
                  title: 'Condition Requirements',
                  desc: 'Shoes must be unworn, in original packaging, with all tags attached.',
                },
                {
                  icon: CheckCircle,
                  title: 'Free Returns',
                  desc: 'Free return shipping for all returns within India.',
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6"
                  >
                    <Icon className="text-[#ADD8E6] flex-shrink-0" size={32} />
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-700">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-12 bg-gray-50 p-8 rounded-lg">
              <h3 className="font-bold text-lg mb-4">How to Return</h3>
              <ol className="space-y-3 list-decimal list-inside">
                <li className="text-gray-700">Contact our support team at returns@topsun.com</li>
                <li className="text-gray-700">Receive a prepaid return label</li>
                <li className="text-gray-700">Pack the shoes in original packaging</li>
                <li className="text-gray-700">Drop off at any courier partner</li>
                <li className="text-gray-700">Receive refund within 5-7 business days</li>
              </ol>
            </div>

            <div className="mt-8 bg-red-50 p-8 rounded-lg">
              <h3 className="font-bold text-lg mb-4">Items Not Eligible for Return</h3>
              <ul className="space-y-2">
                <li className="text-gray-700">• Shoes that have been worn or used</li>
                <li className="text-gray-700">• Items without original tags</li>
                <li className="text-gray-700">• Damaged packaging</li>
                <li className="text-gray-700">• Items purchased over 30 days ago</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-r from-[#0c0c0c] to-[#1a1a1a] text-white text-center">
        <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          Need Help?
        </h2>
        <p className="text-lg text-gray-300 mb-8">Contact our support team.</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/contact')}
          className="px-8 py-4 bg-[#ADD8E6] text-white font-bold rounded-lg"
        >
          Contact Support
        </motion.button>
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
