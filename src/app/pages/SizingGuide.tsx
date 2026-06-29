import Header from '@/app/components/Header';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SizingGuide() {
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
            Sizing Guide
          </motion.h1>
          <p className="text-lg text-gray-300">Find your perfect TOPSUN fit.</p>
        </div>
      </section>

      {/* Sizing Chart */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold mb-8">How to Measure Your Feet</h2>
            <div className="bg-gray-50 p-8 rounded-lg mb-12">
              <ol className="space-y-4 list-decimal list-inside">
                <li className="text-lg text-gray-700">Wear socks you normally wear with shoes</li>
                <li className="text-lg text-gray-700">Stand on a piece of paper on a hard floor</li>
                <li className="text-lg text-gray-700">Mark the heel and furthest toe</li>
                <li className="text-lg text-gray-700">Measure the distance in centimeters</li>
                <li className="text-lg text-gray-700">Check the chart below to find your size</li>
              </ol>
            </div>

            <h2 className="text-3xl font-bold mb-8">Size Conversion Chart</h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200">
                <thead>
                  <tr className="bg-[#ADD8E6]/10">
                    <th className="border border-gray-200 p-4 text-left">UK Size</th>
                    <th className="border border-gray-200 p-4 text-left">US Size</th>
                    <th className="border border-gray-200 p-4 text-left">EU Size</th>
                    <th className="border border-gray-200 p-4 text-left">Foot Length (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { uk: 7, us: 8, eu: 41, cm: 25.5 },
                    { uk: 8, us: 9, eu: 42, cm: 26.5 },
                    { uk: 9, us: 10, eu: 43, cm: 27.5 },
                    { uk: 10, us: 11, eu: 44, cm: 28.5 },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-200 p-4">{row.uk}</td>
                      <td className="border border-gray-200 p-4">{row.us}</td>
                      <td className="border border-gray-200 p-4">{row.eu}</td>
                      <td className="border border-gray-200 p-4">{row.cm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-12 bg-blue-50 p-8 rounded-lg">
              <h3 className="font-bold text-lg mb-4">💡 Pro Tip</h3>
              <p className="text-gray-700">
                Most people find TOPSUN shoes true to size. If you have wider feet, consider sizing up by half a size for extra comfort.
              </p>
            </div>
          </motion.div>
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
