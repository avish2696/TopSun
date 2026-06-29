import Header from '@/app/components/Header';
import { motion } from 'motion/react';
import { Heart, Zap, Leaf, Target, Users, Award } from 'lucide-react';
import { useState } from 'react';
import { ResponsiveImage } from '@/app/components/ResponsiveImage';
import Shoe1 from '@/imports/shoe1/1.png';
import Shoe2 from '@/imports/shoe2/1.png';
import Shoe3 from '@/imports/shoe3/1.png';
import Shoe4 from '@/imports/shoe4/1.png';
import Shoe5 from '@/imports/shoe5/1.png';
import Shoe6 from '@/imports/shoe6/1.png';

export default function AboutUs() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount] = useState(0);

  // Scroll to top on mount
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      icon: Zap,
      label: 'Performance First',
      description: 'Built for athletes who demand excellence. Every shoe is tested, refined, and perfected.',
    },
    {
      icon: Heart,
      label: 'Real Craftsmanship',
      description: 'Designed in-house, produced with precision. No shortcuts, no compromises on quality.',
    },
    {
      icon: Target,
      label: 'Accessible Excellence',
      description: 'Premium performance at fair prices. Great shoes shouldn\'t cost a fortune.',
    },
    {
      icon: Leaf,
      label: 'Responsibility',
      description: 'Sourcing sustainable materials and ethical manufacturing practices wherever possible.',
    },
  ];

  const team = [
    {
      name: 'Dinesh',
      role: 'Director & CEO',
      expertise: 'Leadership, Vision & Strategy',
      description: 'Leading TOPSUN with a clear vision to revolutionize performance footwear. Dinesh drives innovation, quality, and excellence across all operations.',
    },
  ];

  const milestones = [
    { number: '2020', label: 'Founded', description: 'TOPSUN launched with our first collection' },
    { number: '50K+', label: 'Happy Customers', description: 'Athletes and everyday runners worldwide' },
    { number: '6', label: 'Collections', description: 'Constantly evolving, never stagnant' },
    { number: '4', label: 'Countries', description: 'Shipping to India, US, UK, and beyond' },
  ];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <Header
        cartCount={cartCount}
        onCartClick={() => console.log('Cart opened')}
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
              Our Story
            </p>
            <h1
              className="text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] font-black mb-8 tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Built for Runners.
              <br />
              <motion.span
                className="bg-gradient-to-r from-[#ADD8E6] to-[#87CEEB] bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Designed for Life.
              </motion.span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
              We started TOPSUN because we couldn't find performance shoes that didn't sacrifice style or sustainability. 
              Four years later, we're still obsessed with the same mission: building the fastest, most durable, 
              most beautiful running shoes possible — at a price that doesn't hurt.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
                How It Started
              </p>
              <h2
                className="text-[clamp(2rem,4vw,3.5rem)] leading-tight font-bold mb-8"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                A Shoe That Actually Works
              </h2>
              <div className="space-y-5 text-gray-700 leading-relaxed">
                <p>
                  Our founder Arjun spent 12 years designing shoes for major brands—and watched them repeatedly choose cheap 
                  materials and shortcuts over athlete comfort. He'd run marathons testing prototypes, only to return them 
                  broken after 500km. That frustration became TOPSUN.
                </p>
                <p>
                  In 2020, we launched with a radical idea: what if we just... made them right? Better materials. Real testing. 
                  Direct pricing so athletes get premium shoes without premium markups. We built TOPSUN for the runner who'd 
                  rather invest in one pair of honest shoes than five pairs of hype.
                </p>
                <p>
                  Four years, 50,000+ customers, and thousands of 5-star reviews later, we're still operating the same way. 
                  No celebrities. No venture capital pressure. Just relentless focus on making the best performance shoe we can.
                </p>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-[#f7f0e6] to-[#f0f0f2] p-8"
            >
              <ResponsiveImage
                src={Shoe3}
                alt="TOPSUN Apex Desert Sand - our bestselling shoe"
                loading="lazy"
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 rounded-lg border-2 border-[#ADD8E6]/20" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
              What Drives Us
            </p>
            <h2
              className="text-[clamp(2rem,4vw,3.5rem)] leading-tight font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our Values
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white p-8 border border-border hover:border-[#ADD8E6]/30 transition-all duration-300 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, color: '#ADD8E6' }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="text-[#0c0c0c] mb-6 w-fit"
                  >
                    <Icon size={32} />
                  </motion.div>
                  <h3
                    className="text-lg font-bold mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {value.label}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
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
              By The Numbers
            </p>
            <h2
              className="text-[clamp(2rem,4vw,3.5rem)] leading-tight font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our Journey So Far
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div
                  className="text-5xl lg:text-6xl font-black text-[#ADD8E6] mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {milestone.number}
                </div>
                <p className="text-lg font-semibold mb-2">{milestone.label}</p>
                <p className="text-sm text-gray-600">{milestone.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-Width Image Break */}
      <section className="py-12 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-[1400px] mx-auto rounded-lg overflow-hidden aspect-video bg-gradient-to-br from-[#fff1ea] to-[#f0f0f2] p-12 flex items-center justify-center"
        >
          <ResponsiveImage
            src={Shoe5}
            alt="TOPSUN performance shoes lifestyle"
            loading="lazy"
            className="w-full h-full object-contain"
          />
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Meet The Team
            </p>
            <h2
              className="text-[clamp(2rem,4vw,3.5rem)] leading-tight font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The People Behind TOPSUN
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Meet Dinesh, the visionary leader driving TOPSUN's mission to create premium performance shoes for every runner.
            </p>
          </motion.div>

          <div className="flex justify-center">
            <div className="w-full max-w-sm">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow"
                >
                  {/* Avatar placeholder with initials */}
                  <div className="aspect-square bg-gradient-to-br from-[#ADD8E6] to-[#87CEEB] flex items-center justify-center text-white text-4xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>

                  <div className="p-6">
                    <h3
                      className="text-lg font-bold mb-1"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {member.name}
                    </h3>
                    <p className="text-xs tracking-widest uppercase text-[#ADD8E6] font-semibold mb-3">
                      {member.role}
                    </p>
                    <p className="text-xs text-gray-600 mb-3 font-medium">
                      {member.expertise}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Another Image Break */}
      <section className="py-12 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-[1400px] mx-auto rounded-lg overflow-hidden aspect-video bg-gradient-to-br from-[#e6f8f4] to-[#f0ede8] p-12 flex items-center justify-center"
        >
          <ResponsiveImage
            src={Shoe1}
            alt="TOPSUN Flex Run Mint Blue"
            loading="lazy"
            className="w-full h-full object-contain"
          />
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-[#0c0c0c] to-[#1a1a1a] text-white">
        <div className="max-w-[800px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-[clamp(2rem,4vw,3.5rem)] leading-tight font-bold mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Ready to Run Better?
            </h2>
            <p className="text-lg text-gray-300 mb-10 leading-relaxed">
              Experience the TOPSUN difference. Every pair is built with the same obsessive attention to detail 
              that goes into our entire brand. Start your journey today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="/shop"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-[#ADD8E6] to-[#87CEEB] text-white font-semibold tracking-wider uppercase rounded-lg hover:shadow-xl transition-shadow"
              >
                Shop Now
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-white text-white font-semibold tracking-wider uppercase rounded-lg hover:bg-white hover:text-[#0c0c0c] transition-colors"
              >
                Get In Touch
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0c0c0c] text-white py-16 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-semibold text-sm tracking-wide mb-4">Shop</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><a href="/" className="hover:text-white transition-colors">All Products</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Running</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Training</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm tracking-wide mb-4">Company</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm tracking-wide mb-4">Support</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><a href="/" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Shipping</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Returns</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm tracking-wide mb-4">Legal</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><a href="/" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-xs text-gray-400">
              © 2024 TOPSUN Performance Sneakers. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import React from 'react';

