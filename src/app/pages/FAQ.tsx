import Header from '@/app/components/Header';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FAQ() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount] = useState(0);
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<number | null>(0);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      q: 'What is the sizing like?',
      a: 'TOPSUN shoes are true to size. If you normally wear size 9, order size 9. For wider feet, we recommend sizing up by half a size.',
    },
    {
      q: 'How long does shipping take?',
      a: 'Standard shipping takes 5-7 business days within India. International orders take 10-15 business days.',
    },
    {
      q: 'What is your return policy?',
      a: 'We offer 30-day returns for unused shoes in original packaging. Return shipping is free within India.',
    },
    {
      q: 'Are TOPSUN shoes good for running?',
      a: 'Yes! Our shoes are designed for performance across multiple activities including running, training, and daily wear.',
    },
    {
      q: 'How should I care for my TOPSUN shoes?',
      a: 'Wipe clean with a damp cloth and air dry. Avoid machine washing unless specified. Store in a cool, dry place.',
    },
    {
      q: 'Do you offer bulk orders?',
      a: 'Yes! For bulk orders of 10+ pairs, please contact us at bulk@topsun.com for special pricing.',
    },
    {
      q: 'Are your shoes vegan?',
      a: 'Most of our shoes are vegan-friendly, using engineered mesh and synthetic materials. Check product details for specific information.',
    },
    {
      q: 'Can I track my order?',
      a: 'Yes, you will receive a tracking link via email once your order ships.',
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
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Frequently Asked
              <br />
              Questions
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl">Find answers to common questions about TOPSUN products and services.</p>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <motion.button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-bold text-left text-gray-900">{faq.q}</h3>
                  <motion.div
                    animate={{ rotate: expanded === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={20} className="text-[#ADD8E6]" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {expanded === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden bg-gray-50"
                    >
                      <p className="px-6 py-4 text-gray-700 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 px-6 bg-gradient-to-r from-[#0c0c0c] to-[#1a1a1a] text-white text-center">
        <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          Still have questions?
        </h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          Our customer support team is here to help. Get in touch and we'll respond within 24 hours.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/contact')}
          className="px-8 py-4 bg-[#ADD8E6] text-white font-bold rounded-lg"
        >
          Contact Us
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
