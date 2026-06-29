import Header from '@/app/components/Header';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PrivacyPolicy() {
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

      <section className="max-w-4xl mx-auto px-6 py-24">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-8"
        >
          Privacy Policy
        </motion.h1>

        <div className="prose max-w-none">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                We collect information you provide directly, such as when you make a purchase, create an account, or contact our support team. This includes your name, email address, shipping address, and payment information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use your information to process orders, send you updates about your purchase, and improve our services. We do not share your personal information with third parties without your consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement industry-standard security measures to protect your data. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Cookies</h2>
              <p className="text-gray-700 mb-4">
                We use cookies to enhance your browsing experience and track website analytics. You can disable cookies in your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
              <p className="text-gray-700 mb-4">
                You have the right to access, update, or delete your personal information. Contact us at privacy@topsun.com for any requests.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Contact Us</h2>
              <p className="text-gray-700">
                If you have questions about this privacy policy, please contact us at privacy@topsun.com
              </p>
            </section>

            <p className="text-sm text-gray-500 mt-8">Last updated: 2025</p>
          </motion.div>
        </div>
      </section>

      <footer className="bg-[#0c0c0c] text-white/70 py-8 px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-xs">© 2025 TOPSUN Performance Sneakers. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

import React from 'react';
