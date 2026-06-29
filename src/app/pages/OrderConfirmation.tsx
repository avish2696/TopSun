import Header from '@/app/components/Header';
import { motion } from 'motion/react';
import { CheckCircle, Package, Truck, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useShopping, Order } from '@/app/context/ShoppingContext';

export default function OrderConfirmation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getCartItemCount, orders } = useShopping();
  const { orderId } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <Header
          cartCount={getCartItemCount()}
          onCartClick={() => {}}
          onMobileMenuToggle={setMobileMenuOpen}
          mobileMenuOpen={mobileMenuOpen}
        />

        <section className="pt-32 pb-32 px-6">
          <div className="max-w-[600px] mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
            <p className="text-gray-600 mb-8">The order you're looking for doesn't exist.</p>
            <Link
              to="/"
              className="inline-block px-8 py-4 bg-[#ADD8E6] text-white font-semibold rounded hover:bg-[#87CEEB]"
            >
              Go Home
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const deliveryDate = new Date(order.estimatedDeliveryDate);
  const formattedDate = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Header
        cartCount={getCartItemCount()}
        onCartClick={() => {}}
        onMobileMenuToggle={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
      />

      {/* Success Message */}
      <section className="pt-24 pb-12 px-6 text-center bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-[800px] mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="mb-6"
          >
            <CheckCircle size={80} className="text-green-600 mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1
              className="text-[clamp(2rem,4vw,3.5rem)] leading-tight font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Order Confirmed!
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Thank you for your order. We're getting it ready to ship!
            </p>
            <p className="text-gray-500">Order ID: {order.id}</p>
          </motion.div>
        </div>
      </section>

      {/* Order Details */}
      <section className="py-16 px-6">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1fr_400px] gap-16">
          {/* Main Content */}
          <div className="space-y-12">
            {/* Delivery Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-2xl font-bold mb-8"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Estimated Delivery
              </h2>

              <div className="space-y-4">
                {/* Processing */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0 }}
                  className="flex gap-4 p-6 bg-blue-50 border-l-4 border-blue-500 rounded"
                >
                  <Package size={24} className="text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-blue-900">Processing</p>
                    <p className="text-sm text-blue-700">Your order is being prepared</p>
                  </div>
                </motion.div>

                {/* Shipped */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="flex gap-4 p-6 bg-purple-50 border-l-4 border-purple-500 rounded"
                >
                  <Truck size={24} className="text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-purple-900">Out for Delivery</p>
                    <p className="text-sm text-purple-700">Expected soon</p>
                  </div>
                </motion.div>

                {/* Delivered */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex gap-4 p-6 bg-green-50 border-l-4 border-green-500 rounded"
                >
                  <CheckCircle size={24} className="text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-green-900">Delivered</p>
                    <p className="text-sm text-green-700">by {formattedDate}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Items Ordered */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-2xl font-bold mb-8"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Items Ordered
              </h2>

              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 p-6 bg-gray-50 rounded border border-border"
                  >
                    <div className="w-16 h-16 bg-white border border-border rounded flex items-center justify-center flex-shrink-0">
                      {/* Placeholder - can add image */}
                      <div className="text-center">
                        <Package size={24} className="text-gray-400 mx-auto" />
                      </div>
                    </div>

                    <div className="flex-grow">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.colorLabel}</p>
                      <p className="text-sm text-gray-600">Size: UK {item.size} × Qty: {item.quantity}</p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-lg">₹{item.price * item.quantity}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Shipping Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-2xl font-bold mb-8"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Shipping To
              </h2>

              <div className="p-6 bg-gray-50 rounded border border-border">
                <div className="flex gap-4 mb-4">
                  <MapPin size={24} className="text-[#ADD8E6] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-lg">{order.shippingAddress.fullName}</p>
                    <p className="text-gray-600 mt-2">{order.shippingAddress.addressLine1}</p>
                    {order.shippingAddress.addressLine2 && (
                      <p className="text-gray-600">{order.shippingAddress.addressLine2}</p>
                    )}
                    <p className="text-gray-600">
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                    </p>
                    <p className="text-gray-600">{order.shippingAddress.country}</p>
                    <p className="text-gray-600 mt-2">Phone: {order.shippingAddress.phone}</p>
                    <p className="text-gray-600">Email: {order.shippingAddress.email}</p>
                  </div>
                </div>

                {order.trackingNumber && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm text-gray-600 mb-1">Tracking Number</p>
                    <p className="font-mono font-bold text-lg">{order.trackingNumber}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-fit sticky top-24"
          >
            <div className="bg-gray-50 p-8 rounded-lg border border-border">
              <h3
                className="text-xl font-bold mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Order Summary
              </h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">
                    ₹{order.items.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
              </div>

              <div className="flex justify-between mb-8">
                <span className="font-bold">Total</span>
                <span className="text-2xl font-bold text-[#ADD8E6]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  ₹{order.totalAmount}
                </span>
              </div>

              {/* Status Badges */}
              <div className="space-y-3">
                <div className="p-3 bg-green-100 text-green-700 text-center rounded font-semibold text-sm">
                  ✓ Payment {order.paymentStatus}
                </div>
                <div className="p-3 bg-blue-100 text-blue-700 text-center rounded font-semibold text-sm">
                  📦 {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <Link
                  to="/orders"
                  className="block text-center px-6 py-3 bg-[#ADD8E6] text-white font-semibold rounded hover:bg-[#87CEEB] transition-colors"
                >
                  View All Orders
                </Link>
                <Link
                  to="/shop"
                  className="block text-center px-6 py-3 border-2 border-[#ADD8E6] text-[#ADD8E6] font-semibold rounded hover:bg-[#ADD8E6] hover:text-white transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

import React from 'react';

