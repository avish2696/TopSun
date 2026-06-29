import Header from '@/app/components/Header';
import { motion } from 'motion/react';
import { Leaf, Droplet, Recycle, Target } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sustainability() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount] = useState(0);
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const initiatives = [
    {
      icon: Leaf,
      title: 'Sustainable Materials',
      desc: 'Using organic and recycled materials in 80% of our products.',
    },
    {
      icon: Droplet,
      title: 'Water Conservation',
      desc: 'Reduced water usage by 60% in manufacturing processes.',
    },
    {
      icon: Recycle,
      title: 'Circular Economy',
      desc: 'Recycling program for worn-out shoes to reduce waste.',
    },
    {
      icon: Target,
      title: 'Carbon Neutral',
      desc: 'Committed to carbon neutrality by 2030.',
    },
  ];

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
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-xs tracking-[0.3em] uppercase text-[#ADD8E6] mb-6">Our Mission</p>
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
              Sustainable
              <br />
              <span className="bg-gradient-to-r from-[#ADD8E6] to-[#87CEEB] bg-clip-text text-transparent">
                Performance
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl">
              We believe performance and sustainability go hand in hand. Every TOPSUN shoe is crafted with environmental responsibility.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {initiatives.map((init, i) => {
              const Icon = init.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 rounded-lg text-center"
                >
                  <Icon className="mx-auto mb-4 text-[#ADD8E6]" size={40} />
                  <h3 className="font-bold text-lg mb-2">{init.title}</h3>
                  <p className="text-sm text-gray-600">{init.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our Impact
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Since 2020, TOPSUN has been committed to reducing our environmental footprint. We partner with suppliers who share our values and invest in cutting-edge sustainable manufacturing processes.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our goal is simple: create world-class performance footwear without compromising the planet for future generations.
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
