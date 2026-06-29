import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  size: number | string;
  quantity: number;
  colorLabel: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  userId?: string;
  orderDate: Date;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  totalAmount: number;
  paymentStatus: 'completed' | 'pending' | 'failed';
  orderStatus: 'processing' | 'shipped' | 'delivered';
  estimatedDeliveryDate: Date;
  trackingNumber?: string;
}

interface ShoppingContextType {
  cart: CartItem[];
  orders: Order[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, size: number | string) => void;
  updateCartItem: (id: number, size: number | string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  createOrder: (order: Order) => void;
  getCartItemCount: () => number;
  clearAllData: () => void;
}

const ShoppingContext = createContext<ShoppingContextType | undefined>(undefined);

export function ShoppingProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      // Check if item with same id and size exists
      const existingItem = prevCart.find(
        cartItem => cartItem.id === item.id && cartItem.size === item.size
      );

      if (existingItem) {
        // Update quantity if exists
        return prevCart.map(cartItem =>
          cartItem.id === item.id && cartItem.size === item.size
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }

      return [...prevCart, item];
    });
  };

  const removeFromCart = (id: number, size: number | string) => {
    setCart(prevCart =>
      prevCart.filter(item => !(item.id === id && item.size === size))
    );
  };

  const updateCartItem = (id: number, size: number | string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const createOrder = (order: Order) => {
    setOrders(prevOrders => [order, ...prevOrders]);
    clearCart();
  };

  const clearAllData = () => {
    clearCart();
    setOrders([]);
  };

  return (
    <ShoppingContext.Provider
      value={{
        cart,
        orders,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        getCartTotal,
        createOrder,
        getCartItemCount,
        clearAllData,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
}

export function useShopping() {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error('useShopping must be used within ShoppingProvider');
  }
  return context;
}

