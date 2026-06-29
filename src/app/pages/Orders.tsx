import Header from '@/app/components/Header';
import { motion } from 'motion/react';
import { Package, Truck, CheckCircle, Calendar, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useShopping } from '@/app/context/ShoppingContext';
import { useAuth } from '@/app/context/AuthContext';

export default function Orders() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { orders, getCartItemCount } = useShopping();
  const { user } = useAuth();

  // Filter orders by current user's userId
  const userOrders = user ? orders.filter(order => order.userId === user.id) : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Package size={20} className="text-blue-600" />;
      case 'shipped':
        return <Truck size={20} className="text-purple-600" />;
      case 'delivered':
        return <CheckCircle size={20} className="text-green-600" />;
      default:
        return <Package size={20} className="text-gray-600" />;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (userOrders.length === 0) {
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h1
                className="text-[clamp(2rem,4vw,3.5rem)] leading-tight font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                No Orders Yet
              </h1>
              <p className="text-gray-600 mb-8">
                You haven't placed any orders yet. Start shopping to see your orders here!
              </p>

              <Link
                to="/shop"
                className="inline-block px-8 py-4 bg-gradient-to-r from-[#ADD8E6] to-[#87CEEB] text-white font-semibold rounded hover:shadow-lg transition-shadow"
              >
                Start Shopping
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="text-[clamp(2rem,4vw,3.5rem)] leading-tight font-bold mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              My Orders
            </h1>
            <p className="text-gray-600">{userOrders.length} order(s) in your account</p>
          </motion.div>
        </div>
      </section>

      {/* Orders List */}
      <section className="py-16 px-6">
        <div className="max-w-[1200px] mx-auto space-y-6">
          {userOrders.map((order, index) => {
            const orderDate = new Date(order.orderDate);
            const deliveryDate = new Date(order.estimatedDeliveryDate);
            const formattedOrderDate = orderDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            });
            const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            });

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-mono font-bold text-lg">{order.id}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Ordered Date</p>
                    <p className="font-semibold">{formattedOrderDate}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="font-bold text-[#ADD8E6] text-lg">₹{order.totalAmount}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    {getStatusIcon(order.orderStatus)}
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <p className="font-semibold capitalize">{order.orderStatus}</p>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="p-6">
                  {/* Items */}
                  <div className="mb-6 pb-6 border-b border-border">
                    <h3 className="font-semibold mb-4">Items</h3>
                    <div className="space-y-3">
                      {order.items.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: itemIndex * 0.05 }}
                          className="flex justify-between items-start"
                        >
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">
                              {item.colorLabel} • Size UK {item.size} • Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="font-semibold">₹{item.price * item.quantity}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="mb-6 pb-6 border-b border-border">
                    <h3 className="font-semibold mb-4">Estimated Delivery</h3>
                    <div className="flex items-start gap-3">
                      <Calendar size={20} className="text-[#ADD8E6] mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{formattedDeliveryDate}</p>
                        <p className="text-sm text-gray-600">
                          {order.orderStatus === 'delivered'
                            ? 'Delivered'
                            : order.orderStatus === 'shipped'
                              ? 'On the way'
                              : 'Expected soon'}
                        </p>
                        {order.trackingNumber && (
                          <p className="text-sm text-gray-600 mt-1">
                            Tracking: <span className="font-mono">{order.trackingNumber}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="mb-6 pb-6 border-b border-border">
                    <h3 className="font-semibold mb-4">Shipping Address</h3>
                    <p className="font-medium">{order.shippingAddress.fullName}</p>
                    <p className="text-sm text-gray-600">{order.shippingAddress.addressLine1}</p>
                    {order.shippingAddress.addressLine2 && (
                      <p className="text-sm text-gray-600">{order.shippingAddress.addressLine2}</p>
                    )}
                    <p className="text-sm text-gray-600">
                      {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                      {order.shippingAddress.postalCode}
                    </p>
                  </div>

                  {/* Payment Status */}
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Payment Status</p>
                      <span
                        className={`px-4 py-2 text-sm font-semibold rounded capitalize ${getPaymentStatusColor(
                          order.paymentStatus
                        )}`}
                      >
                        {order.paymentStatus}
                      </span>
                    </div>

                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 text-[#ADD8E6] font-semibold hover:text-[#87CEEB] transition-colors flex items-center gap-2"
                    >
                      View Details <ArrowRight size={16} />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0c0c0c] text-white py-16 px-6 mt-16">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-xs text-gray-400">© 2024 TOPSUN Performance Sneakers. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

import React from 'react';

