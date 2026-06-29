import Header from '@/app/components/Header';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TermsOfService() {
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
          Terms of Service
        </motion.h1>

        <div className="prose max-w-none">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 mb-4">
                By using the TOPSUN website and purchasing our products, you agree to comply with these Terms of Service. If you do not agree, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Product Information</h2>
              <p className="text-gray-700 mb-4">
                All product descriptions, prices, and availability are subject to change without notice. We reserve the right to correct any errors or omissions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Ordering and Payment</h2>
              <p className="text-gray-700 mb-4">
                All orders are subject to acceptance and verification. We reserve the right to refuse or cancel any order.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Shipping and Delivery</h2>
              <p className="text-gray-700 mb-4">
                Delivery times are estimates and not guaranteed. We are not liable for delays caused by shipping carriers or other factors beyond our control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Returns and Refunds</h2>
              <p className="text-gray-700 mb-4">
                Please refer to our Returns Policy for information about returning products.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                TOPSUN is not liable for any indirect, incidental, special, or consequential damages arising from your use of our products or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Changes to Terms</h2>
              <p className="text-gray-700">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting.
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
