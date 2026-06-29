import Header from '@/app/components/Header';
import { motion } from 'motion/react';
import { Calendar, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Press() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount] = useState(0);
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pressReleases = [
    {
      date: 'June 2026',
      title: 'TOPSUN Launches New Collection with Revolutionary Cushioning',
      excerpt: 'Introducing advanced multi-density EVA technology for unprecedented comfort.',
      category: 'Product Launch',
    },
    {
      date: 'May 2026',
      title: 'TOPSUN Expands to 4 New Markets Globally',
      excerpt: 'Performance footwear brand reaches athletes across 15 countries.',
      category: 'Expansion',
    },
    {
      date: 'April 2026',
      title: 'TOPSUN Achieves Carbon Neutral Manufacturing',
      excerpt: 'Milestone commitment to sustainable and ethical production practices.',
      category: 'Sustainability',
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
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(2.5rem,6vw,5rem)] font-black mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Press & News
          </motion.h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Latest updates from TOPSUN Performance Sneakers. Get in touch with our press team.
          </p>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {pressReleases.map((release, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-l-4 border-[#ADD8E6] pl-6 pb-8"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={16} className="text-[#ADD8E6]" />
                  <span className="text-sm text-gray-600">{release.date}</span>
                  <span className="text-xs bg-[#ADD8E6]/10 text-[#ADD8E6] px-2 py-1 rounded">
                    {release.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3">{release.title}</h3>
                <p className="text-gray-700 mb-4">{release.excerpt}</p>
                <motion.button
                  whileHover={{ x: 5 }}
                  className="text-[#ADD8E6] font-semibold text-sm"
                >
                  Read More →
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Contact */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Press Inquiries</h2>
          <p className="text-lg text-gray-700 mb-8">
            For media inquiries, interviews, or high-resolution images, please contact:
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block bg-white p-8 border border-gray-200 rounded-lg"
          >
            <p className="text-xl font-bold mb-2">press@topsun.com</p>
            <p className="text-gray-600">Available Monday to Friday, 9 AM - 6 PM IST</p>
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
