import Header from '@/app/components/Header';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Instagram, Twitter, Youtube, ChevronDown, Check, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  topic: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  topic?: string;
  message?: string;
}

export default function ContactUs() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount] = useState(0);
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    topic: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FAQ state
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  // Scroll to top on mount
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const topics = [
    'General Question',
    'Order Issue',
    'Shipping & Delivery',
    'Returns & Exchanges',
    'Sizing Help',
    'Product Information',
    'Other',
  ];

  const faqs = [
    {
      question: 'How long does shipping take?',
      answer: 'We ship within 2–3 business days. Standard delivery takes 5–7 days, and express shipping (if available in your area) takes 2–3 days. You\'ll receive a tracking link via email once your order ships.',
    },
    {
      question: 'What\'s your return policy?',
      answer: 'We offer a 30-day return policy. If your shoes don\'t fit or aren\'t what you expected, return them within 30 days of purchase for a full refund. Shoes must be unworn and in original packaging. Returns are free.',
    },
    {
      question: 'How do I find my size?',
      answer: 'Our shoes run true to size. We recommend referring to our size guide on the product page for detailed measurements. If you\'re between sizes, we suggest going up half a size for a more comfortable fit, especially for wider feet.',
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes! We currently ship to India, USA, UK, Canada, and Australia. Shipping costs and times vary by location. You\'ll see shipping options at checkout based on your address.',
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@topsun.in',
      subtext: 'We reply within 24 hours',
      href: 'mailto:contact@topsun.in',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 XXXXX XXXXX',
      subtext: 'Available 9 AM – 6 PM IST',
      href: 'tel:+919876543210',
    },
    {
      icon: Clock,
      label: 'Business Hours',
      value: '9 AM – 6 PM IST',
      subtext: 'Monday – Friday',
      href: null,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Raniganj, West Bengal',
      subtext: 'Headquarters & Support Hub',
      href: null,
    },
  ];

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/topsun' },
    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/topsun' },
    { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/topsun' },
  ];

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.topic) {
      newErrors.topic = 'Please select a topic';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setSubmitted(true);
    setIsSubmitting(false);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', topic: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <Header
        cartCount={cartCount}
        onCartClick={() => console.log('Cart opened')}
        onMobileMenuToggle={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
      />

      {/* Page Header */}
      <section className="pt-24 pb-16 px-6 bg-gradient-to-b from-[#0c0c0c] to-[#1a1a1a] text-white">
        <div className="max-w-[1400px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] font-black mb-4 tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Get in Touch
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Questions? We usually reply within 24 hours. Reach out and let's chat.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="py-12 px-6 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                        className="w-16 h-16 bg-gradient-to-br from-[#ADD8E6] to-[#87CEEB] rounded-full flex items-center justify-center mx-auto mb-6"
                      >
                        <Check size={32} className="text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Message Sent!
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Thanks for reaching out. We'll get back to you soon.
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSubmitted(false)}
                        className="text-sm font-medium text-[#ADD8E6] hover:text-[#87CEEB] transition-colors"
                      >
                        Send Another Message →
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      {/* Name Field */}
                      <div>
                        <label className="block text-sm font-semibold mb-2">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your name"
                          className={`w-full px-4 py-3 border-2 transition-all focus:outline-none ${
                            errors.name
                              ? 'border-red-500 bg-red-50/50 focus:border-red-600'
                              : 'border-border focus:border-[#ADD8E6]'
                          }`}
                        />
                        <AnimatePresence>
                          {errors.name && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="flex items-center gap-2 text-red-600 text-xs mt-2"
                            >
                              <AlertCircle size={14} />
                              {errors.name}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Email Field */}
                      <div>
                        <label className="block text-sm font-semibold mb-2">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          className={`w-full px-4 py-3 border-2 transition-all focus:outline-none ${
                            errors.email
                              ? 'border-red-500 bg-red-50/50 focus:border-red-600'
                              : 'border-border focus:border-[#ADD8E6]'
                          }`}
                        />
                        <AnimatePresence>
                          {errors.email && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="flex items-center gap-2 text-red-600 text-xs mt-2"
                            >
                              <AlertCircle size={14} />
                              {errors.email}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Topic Dropdown */}
                      <div>
                        <label className="block text-sm font-semibold mb-2">Topic</label>
                        <div className="relative">
                          <select
                            name="topic"
                            value={formData.topic}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border-2 transition-all focus:outline-none appearance-none cursor-pointer ${
                              errors.topic
                                ? 'border-red-500 bg-red-50/50 focus:border-red-600'
                                : 'border-border focus:border-[#ADD8E6]'
                            }`}
                          >
                            <option value="">Select a topic...</option>
                            {topics.map(topic => (
                              <option key={topic} value={topic}>
                                {topic}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            size={18}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                          />
                        </div>
                        <AnimatePresence>
                          {errors.topic && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="flex items-center gap-2 text-red-600 text-xs mt-2"
                            >
                              <AlertCircle size={14} />
                              {errors.topic}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Message Field */}
                      <div>
                        <label className="block text-sm font-semibold mb-2">Message</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us what's on your mind..."
                          rows={5}
                          className={`w-full px-4 py-3 border-2 transition-all focus:outline-none resize-none ${
                            errors.message
                              ? 'border-red-500 bg-red-50/50 focus:border-red-600'
                              : 'border-border focus:border-[#ADD8E6]'
                          }`}
                        />
                        <AnimatePresence>
                          {errors.message && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="flex items-center gap-2 text-red-600 text-xs mt-2"
                            >
                              <AlertCircle size={14} />
                              {errors.message}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                        className="w-full bg-gradient-to-r from-[#ADD8E6] to-[#87CEEB] text-white py-4 font-semibold tracking-wider uppercase hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                            />
                            Sending...
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Contact Details Panel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Contact Info Cards */}
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group"
                  >
                    <motion.a
                      href={info.href || '#'}
                      className={`flex gap-4 p-6 bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg ${
                        !info.href ? 'cursor-default' : 'cursor-pointer'
                      }`}
                      whileHover={info.href ? { x: 8 } : {}}
                    >
                      <motion.div
                        whileHover={info.href ? { scale: 1.2 } : {}}
                        className="text-[#ADD8E6] flex-shrink-0 mt-1"
                      >
                        <Icon size={24} />
                      </motion.div>
                      <div>
                        <p className="text-xs tracking-widest uppercase text-muted-foreground font-semibold mb-1">
                          {info.label}
                        </p>
                        <p className="text-lg font-semibold text-foreground">{info.value}</p>
                        <p className="text-sm text-gray-600 mt-1">{info.subtext}</p>
                      </div>
                    </motion.a>
                  </motion.div>
                );
              })}

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <p className="text-xs tracking-widest uppercase text-muted-foreground font-semibold mb-4">
                  Follow Us
                </p>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, color: '#ADD8E6' }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 border-2 border-border hover:border-[#ADD8E6] flex items-center justify-center transition-colors text-foreground hover:text-[#ADD8E6]"
                        aria-label={social.label}
                      >
                        <Icon size={20} />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-[900px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 font-semibold">
              Common Questions
            </p>
            <h2
              className="text-[clamp(2rem,4vw,3.5rem)] leading-tight font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mt-4">
              Can't find what you're looking for? Reach out using the form above.
            </p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <motion.button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full bg-white border-2 border-border hover:border-[#ADD8E6]/30 transition-all p-6 text-left flex items-center justify-between group"
                  whileHover={{ x: 4 }}
                >
                  <span className="text-lg font-semibold group-hover:text-[#ADD8E6] transition-colors">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: expandedFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-[#ADD8E6] flex-shrink-0"
                  >
                    <ChevronDown size={24} />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {expandedFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gray-50 border-2 border-t-0 border-border overflow-hidden"
                    >
                      <p className="p-6 text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section (Optional - Placeholder) */}
      <section className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 font-semibold">
              Visit Us
            </p>
            <h2
              className="text-[clamp(2rem,4vw,3.5rem)] leading-tight font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our Location
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full h-96 bg-gradient-to-br from-[#f0f0f2] to-[#e6f8f4] rounded-lg border-2 border-border flex items-center justify-center"
          >
            <div className="text-center px-6">
              <MapPin size={48} className="text-[#ADD8E6] mx-auto mb-4" />
              <p className="text-lg font-semibold mb-4">TOPSUN Headquarters</p>
              <p className="text-gray-600 leading-relaxed mb-6">
                A/90 NSB Road<br />
                Raniganj, Searsole Rajbari<br />
                Paschim Bardhaman - 713358<br />
                West Bengal, India
              </p>
              <motion.a
                href="https://maps.google.com/?q=Raniganj+Searsole+Rajbari+West+Bengal"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-6 py-2 bg-[#ADD8E6] text-white text-sm font-medium rounded hover:bg-[#87CEEB] transition-colors"
              >
                View on Google Maps
              </motion.a>
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
              Let's Build Something Great Together
            </h2>
            <p className="text-lg text-gray-300 mb-10">
              Whether it's feedback, collaboration, or just a question about your shoes, we're here for it.
            </p>

            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#ADD8E6] to-[#87CEEB] text-white font-semibold tracking-wider uppercase rounded-lg hover:shadow-xl transition-shadow"
            >
              Start a Conversation
            </motion.a>
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

