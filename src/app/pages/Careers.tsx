import Header from '@/app/components/Header';
import { motion } from 'motion/react';
import { Briefcase, Users, Target, Heart } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Careers() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount] = useState(0);
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openings = [
    {
      title: 'Product Designer',
      department: 'Design',
      location: 'India',
      type: 'Full-time',
      description: 'Join our design team to create the next generation of performance footwear.',
    },
    {
      title: 'Operations Manager',
      department: 'Operations',
      location: 'India',
      type: 'Full-time',
      description: 'Lead our operations team to scale TOPSUN globally.',
    },
    {
      title: 'Marketing Specialist',
      department: 'Marketing',
      location: 'Remote',
      type: 'Full-time',
      description: 'Build brand awareness and drive customer acquisition for TOPSUN.',
    },
    {
      title: 'Customer Support Specialist',
      department: 'Support',
      location: 'Remote',
      type: 'Full-time',
      description: 'Provide exceptional support to our growing customer base.',
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

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6 bg-gradient-to-b from-[#0c0c0c] to-[#1a1a1a] text-white min-h-[60vh] flex items-center">
        <div className="max-w-[1400px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-[#ADD8E6] mb-6 font-semibold">
              Join the Team
            </p>
            <h1
              className="text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] font-black mb-8 tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Build the Future
              <br />
              <motion.span
                className="bg-gradient-to-r from-[#ADD8E6] to-[#87CEEB] bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                of Performance
              </motion.span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
              We're looking for passionate individuals to join our mission of creating exceptional performance footwear.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: 'Passion', desc: 'We care deeply about what we do' },
              { icon: Target, title: 'Excellence', desc: 'We pursue perfection in every detail' },
              { icon: Users, title: 'Collaboration', desc: 'We achieve more together' },
              { icon: Briefcase, title: 'Growth', desc: 'We invest in your development' },
            ].map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 rounded-lg text-center"
                >
                  <Icon className="mx-auto mb-4 text-[#ADD8E6]" size={32} />
                  <h3 className="font-bold mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Open Positions
            </p>
            <h2
              className="text-[clamp(2rem,4vw,3.5rem)] leading-tight font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Now Hiring
            </h2>
          </motion.div>

          <div className="space-y-6">
            {openings.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-gray-200 p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start md:items-center mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.department}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-[#ADD8E6] text-white rounded-lg text-sm font-bold"
                  >
                    Apply
                  </motion.button>
                </div>
                <div className="flex gap-4 text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1">📍 {job.location}</span>
                  <span>•</span>
                  <span>{job.type}</span>
                </div>
                <p>{job.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-r from-[#0c0c0c] to-[#1a1a1a] text-white">
        <div className="max-w-[800px] mx-auto text-center">
          <h2
            className="text-[clamp(2rem,4vw,3.5rem)] leading-tight font-bold mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ready to Join?
          </h2>
          <p className="text-lg text-gray-300 mb-10">
            Send us your resume and tell us why you'd be a great fit for TOPSUN.
          </p>
          <motion.a
            href="mailto:careers@topsun.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#ADD8E6] to-[#87CEEB] text-white font-bold rounded-lg"
          >
            careers@topsun.com
          </motion.a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0c0c0c] text-white/70 py-8 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-xs">© 2025 TOPSUN Performance Sneakers. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import React from 'react';
