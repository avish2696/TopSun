import Header from '@/app/components/Header';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShopping, ShippingAddress } from '@/app/context/ShoppingContext';
import { useAuth } from '@/app/context/AuthContext';
import { ProtectedRoute } from '@/app/components/auth/ProtectedRoute';
import { PIN_CODE_DATABASE } from '@/app/utils/pinCodeDatabase';

interface FormErrors {
  fullName?: string;
  phone?: string;
  addressLine1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

function CheckoutContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart, getCartTotal, getCartItemCount } = useShopping();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');

  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: '',
    email: '', // kept for ShippingAddress compatibility but not used
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => {
      let finalValue = value;

      // For phone, only allow numbers and max 10 digits
      if (name === 'phone') {
        finalValue = value.replace(/[^0-9]/g, '').slice(0, 10);
      }

      const updated = { ...prev, [name]: finalValue };

      // Auto-fill city and state when postal code is entered
      if (name === 'postalCode' && value in PIN_CODE_DATABASE) {
        const { city, state } = PIN_CODE_DATABASE[value];
        updated.city = city;
        updated.state = state;
      }

      return updated;
    });
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Add +91 prefix to phone if not already present
      setFormData(prev => ({
        ...prev,
        phone: prev.phone.startsWith('+91') ? prev.phone : `+91${prev.phone}`
      }));
      setStep('payment');
    }
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Header
        cartCount={getCartItemCount()}
        onCartClick={() => {}}
        onMobileMenuToggle={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
      />

      {/* Page Header */}
      <section className="pt-24 pb-12 px-6 border-b border-border">
        <div className="max-w-[1400px] mx-auto">
          <h1
            className="text-[clamp(2rem,4vw,3.5rem)] leading-tight font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Checkout
          </h1>
        </div>
      </section>

      {/* Checkout Steps Indicator */}
      <section className="py-8 px-6 bg-gray-50 border-b border-border">
        <div className="max-w-[1400px] mx-auto flex items-center justify-center gap-8">
          {/* Step 1: Shipping */}
          <motion.div
            className={`flex items-center gap-3 ${step === 'shipping' ? 'opacity-100' : 'opacity-50'}`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                step === 'shipping' ? 'bg-[#ADD8E6]' : 'bg-gray-400'
              }`}
            >
              1
            </div>
            <span className="font-semibold">Shipping</span>
          </motion.div>

          {/* Arrow */}
          <ArrowRight size={24} className="text-gray-400" />

          {/* Step 2: Payment */}
          <motion.div
            className={`flex items-center gap-3 ${step === 'payment' ? 'opacity-100' : 'opacity-50'}`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                step === 'payment' ? 'bg-[#ADD8E6]' : 'bg-gray-400'
              }`}
            >
              2
            </div>
            <span className="font-semibold">Payment</span>
          </motion.div>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1fr_350px] gap-8 lg:gap-16">
          {/* Main Form */}
          <AnimatePresence mode="wait">
            {step === 'shipping' ? (
              <motion.div
                key="shipping"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="bg-white">
                  <h2
                    className="text-2xl font-bold mb-8"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Shipping Address
                  </h2>

                  <form onSubmit={handleShippingSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className={`w-full px-4 py-3 border-2 transition-all focus:outline-none ${
                          errors.fullName
                            ? 'border-red-500 bg-red-50/50'
                            : 'border-border focus:border-[#ADD8E6]'
                        }`}
                      />
                      <AnimatePresence>
                        {errors.fullName && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2 text-red-600 text-xs mt-2"
                          >
                            <AlertCircle size={14} />
                            {errors.fullName}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">Phone Number</label>
                      <div className="relative">
                        <span className="absolute left-4 top-3 text-gray-700 font-medium">+91</span>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder=" 95XXXXXX99"
                          maxLength="10"
                          className={`w-full px-4 py-3 pl-12 border-2 transition-all focus:outline-none ${
                            errors.phone
                              ? 'border-red-500 bg-red-50/50'
                              : 'border-border focus:border-[#ADD8E6]'
                          }`}
                        />
                      </div>
                      <AnimatePresence>
                        {errors.phone && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2 text-red-600 text-xs mt-2"
                          >
                            <AlertCircle size={14} />
                            {errors.phone}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Address Line 1 */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">Address</label>
                      <input
                        type="text"
                        name="addressLine1"
                        value={formData.addressLine1}
                        onChange={handleInputChange}
                        placeholder="Street address"
                        className={`w-full px-4 py-3 border-2 transition-all focus:outline-none ${
                          errors.addressLine1
                            ? 'border-red-500 bg-red-50/50'
                            : 'border-border focus:border-[#ADD8E6]'
                        }`}
                      />
                      <AnimatePresence>
                        {errors.addressLine1 && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2 text-red-600 text-xs mt-2"
                          >
                            <AlertCircle size={14} />
                            {errors.addressLine1}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Address Line 2 */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">Apartment/Suite (Optional)</label>
                      <input
                        type="text"
                        name="addressLine2"
                        value={formData.addressLine2}
                        onChange={handleInputChange}
                        placeholder="Apartment, suite, etc."
                        className="w-full px-4 py-3 border-2 border-border focus:border-[#ADD8E6] focus:outline-none transition-all"
                      />
                    </div>

                    {/* City & State */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="City"
                          className={`w-full px-4 py-3 border-2 transition-all focus:outline-none ${
                            errors.city
                              ? 'border-red-500 bg-red-50/50'
                              : 'border-border focus:border-[#ADD8E6]'
                          }`}
                        />
                        <AnimatePresence>
                          {errors.city && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-2 text-red-600 text-xs mt-2"
                            >
                              <AlertCircle size={14} />
                              {errors.city}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">State</label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="State"
                          className={`w-full px-4 py-3 border-2 transition-all focus:outline-none ${
                            errors.state
                              ? 'border-red-500 bg-red-50/50'
                              : 'border-border focus:border-[#ADD8E6]'
                          }`}
                        />
                        <AnimatePresence>
                          {errors.state && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-2 text-red-600 text-xs mt-2"
                            >
                              <AlertCircle size={14} />
                              {errors.state}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Postal Code */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="400001"
                        className={`w-full px-4 py-3 border-2 transition-all focus:outline-none ${
                          errors.postalCode
                            ? 'border-red-500 bg-red-50/50'
                            : 'border-border focus:border-[#ADD8E6]'
                        }`}
                      />
                      <AnimatePresence>
                        {errors.postalCode && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2 text-red-600 text-xs mt-2"
                          >
                            <AlertCircle size={14} />
                            {errors.postalCode}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-[#ADD8E6] to-[#87CEEB] text-white py-4 font-semibold tracking-wider uppercase hover:shadow-lg transition-shadow flex items-center justify-center gap-2 mt-8"
                    >
                      Continue to Payment <ArrowRight size={18} />
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="payment"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <PaymentForm
                  address={formData}
                  onBack={() => setStep('shipping')}
                  total={total}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Order Summary Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-fit sticky top-24"
          >
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3
                className="text-xl font-bold mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Order Summary
              </h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-border max-h-64 overflow-y-auto">
                {cart.map(item => (
                  <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-semibold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : ''}`}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span
                  className="text-2xl font-bold text-[#ADD8E6]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  ₹{total}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Payment Form Component
function PaymentForm({
  address,
  onBack,
  total,
}: {
  address: ShippingAddress;
  onBack: () => void;
  total: number;
}) {
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const { createOrder, cart, getCartTotal } = useShopping();
  const navigate = useNavigate();

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create order
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

    const order = {
      id: `ORD-${Date.now()}`,
      orderDate: new Date(),
      items: cart,
      shippingAddress: address,
      totalAmount: total,
      paymentStatus: 'completed' as const,
      orderStatus: 'processing' as const,
      estimatedDeliveryDate: estimatedDelivery,
      trackingNumber: `TRACK${Math.random().toString().slice(2, 11)}`,
    };

    createOrder(order);
    setIsProcessing(false);
    navigate(`/order-confirmation/${order.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white">
        <h2
          className="text-2xl font-bold mb-8"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Payment Details
        </h2>

        <form onSubmit={handlePaymentSubmit} className="space-y-6">
          {/* Card Number */}
          <div>
            <label className="block text-sm font-semibold mb-2">Card Number</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              onChange={(e) => {
                let value = e.target.value.replace(/\s/g, '');
                if (value.length > 0) {
                  value = value.match(/.{1,4}/g)?.join(' ') || value;
                }
                setCardData(prev => ({ ...prev, cardNumber: value }));
              }}
              className="w-full px-4 py-3 border-2 border-border focus:border-[#ADD8E6] focus:outline-none transition-all"
              required
            />
          </div>

          {/* Card Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">Cardholder Name</label>
            <input
              type="text"
              placeholder="Name on card"
              value={cardData.cardName}
              onChange={(e) =>
                setCardData(prev => ({ ...prev, cardName: e.target.value }))
              }
              className="w-full px-4 py-3 border-2 border-border focus:border-[#ADD8E6] focus:outline-none transition-all"
              required
            />
          </div>

          {/* Expiry & CVV */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                maxLength={5}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, '');
                  if (value.length >= 2) {
                    value = value.slice(0, 2) + '/' + value.slice(2, 4);
                  }
                  setCardData(prev => ({ ...prev, expiryDate: value }));
                }}
                className="w-full px-4 py-3 border-2 border-border focus:border-[#ADD8E6] focus:outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">CVV</label>
              <input
                type="text"
                placeholder="123"
                maxLength={3}
                onChange={(e) =>
                  setCardData(prev => ({ ...prev, cvv: e.target.value }))
                }
                className="w-full px-4 py-3 border-2 border-border focus:border-[#ADD8E6] focus:outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <motion.button
              type="button"
              onClick={onBack}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 border-2 border-[#ADD8E6] text-[#ADD8E6] py-4 font-semibold tracking-wider uppercase hover:bg-[#ADD8E6]/5 transition-colors"
            >
              Back
            </motion.button>

            <motion.button
              type="submit"
              disabled={isProcessing}
              whileHover={!isProcessing ? { scale: 1.02 } : {}}
              whileTap={!isProcessing ? { scale: 0.98 } : {}}
              className="flex-1 bg-gradient-to-r from-[#ADD8E6] to-[#87CEEB] text-white py-4 font-semibold tracking-wider uppercase hover:shadow-lg transition-shadow disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  Processing...
                </>
              ) : (
                <>
                  Complete Order <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

import React from 'react';



// Export wrapped with ProtectedRoute
export default function Checkout() {
  return (
    <ProtectedRoute>
      <CheckoutContent />
    </ProtectedRoute>
  );
}
