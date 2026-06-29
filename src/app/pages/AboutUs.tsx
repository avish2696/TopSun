import Header from '@/app/components/Header';
import { motion } from 'motion/react';
import { Heart, Zap, Leaf, Target, Users, Award, Instagram, Facebook, MessageCircle } from 'lucide-react';
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

      {/* Floating Social Media Buttons */}
      <div className="fixed right-6 bottom-6 flex flex-col gap-4 z-40">
        {/* WhatsApp Button */}
        <motion.a
          href="https://wa.me/917485006659"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center hover:shadow-2xl transition-shadow group"
          aria-label="WhatsApp"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.935 1.215 9.865 9.865 0 00-3.339 2.864 9.865 9.865 0 001.523 14.947 9.865 9.865 0 008.293 1.215 9.865 9.865 0 006.097-9.55 9.865 9.865 0 00-7.635-10.691z"/>
          </svg>
        </motion.a>

        {/* Instagram Button */}
        <motion.a
          href="https://www.instagram.com/top_sunshoes7?igsh=MXNnc3Q1NGFiam0wMw=="
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 bg-gradient-to-br from-[#f09433] to-[#e6683c] rounded-full flex items-center justify-center hover:shadow-2xl transition-shadow"
          aria-label="Instagram"
        >
          <Instagram size={24} className="text-white" />
        </motion.a>

        {/* Facebook Button */}
        <motion.a
          href="https://www.facebook.com/share/16mU9mdDvs/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 bg-[#1877F2] rounded-full flex items-center justify-center hover:shadow-2xl transition-shadow"
          aria-label="Facebook"
        >
          <Facebook size={24} className="text-white" />
        </motion.a>
      </div>

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

      {/* Company Information Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Corporate Information
            </p>
            <h2
              className="text-[clamp(2rem,4vw,3.5rem)] leading-tight font-bold mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Part of the Intella Grow Family
            </h2>
            <div className="bg-white rounded-lg p-8 border border-border hover:border-[#ADD8E6]/30 transition-all duration-300">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                TOPSUN is proudly operated under <span className="font-semibold text-[#ADD8E6]">Intella Grow Private Limited</span>, 
                a company dedicated to innovation, quality, and excellence in the performance footwear industry.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Our parent company provides the strategic vision, operational excellence, and resources that enable TOPSUN 
                to focus on what we do best: creating premium, performance-driven shoes that athletes and runners can trust. 
                Together, we're committed to pushing boundaries and redefining what's possible in athletic footwear.
              </p>
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-700">Company:</span> Intella Grow Private Limited
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  <span className="font-semibold text-gray-700">Brand:</span> TOPSUN Performance Sneakers
                </p>
              </div>
            </div>
          </motion.div>
        </div>
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
              <h4 className="font-semibold text-sm tracking-wide mb-4">Contact & Follow</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>Email: topsunshoes7@gmail.com</li>
                <li>Phone: +91 7485006659</li>
                <li className="mt-4">
                  <a 
                    href="https://wa.me/917485006659" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] text-white px-3 py-1.5 rounded hover:bg-[#20BA5A] transition-colors font-semibold text-xs mb-2"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.935 1.215 9.865 9.865 0 00-3.339 2.864 9.865 9.865 0 001.523 14.947 9.865 9.865 0 008.293 1.215 9.865 9.865 0 006.097-9.55 9.865 9.865 0 00-7.635-10.691z"/>
                    </svg>
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="py-8 border-t border-gray-800">
            <div className="text-center mb-6">
              <p className="text-xs tracking-widest uppercase text-gray-400 font-semibold mb-4">Follow Us On Social</p>
              <div className="flex justify-center gap-4">
                <motion.a
                  href="https://www.instagram.com/top_sunshoes7?igsh=MXNnc3Q1NGFiam0wMw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-gradient-to-br from-[#f09433] to-[#e6683c] rounded-lg flex items-center justify-center hover:shadow-lg transition-shadow"
                  aria-label="Instagram"
                >
                  <Instagram size={20} className="text-white" />
                </motion.a>
                <motion.a
                  href="https://www.facebook.com/share/16mU9mdDvs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-[#1877F2] rounded-lg flex items-center justify-center hover:shadow-lg transition-shadow"
                  aria-label="Facebook"
                >
                  <Facebook size={20} className="text-white" />
                </motion.a>
              </div>
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

