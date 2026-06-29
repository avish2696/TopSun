import { lazy, Suspense, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '@/app/App';
import { initializeDemoUsers } from '@/app/utils/demoCredentials';

// Lazy load route components
const ProductDetailPageRoute = lazy(() => import('@/app/pages/ProductDetailPage'));
const AboutUs = lazy(() => import('@/app/pages/AboutUs'));
const ContactUs = lazy(() => import('@/app/pages/ContactUs'));
const Shop = lazy(() => import('@/app/pages/Shop'));
const Cart = lazy(() => import('@/app/pages/Cart'));
const Checkout = lazy(() => import('@/app/pages/Checkout'));
const OrderConfirmation = lazy(() => import('@/app/pages/OrderConfirmation'));
const Orders = lazy(() => import('@/app/pages/Orders'));
const SignUp = lazy(() => import('@/app/pages/SignUp'));
const SignIn = lazy(() => import('@/app/pages/SignIn'));
const Profile = lazy(() => import('@/app/pages/Profile'));
const DemoCredentials = lazy(() => import('@/app/pages/DemoCredentials'));
const Careers = lazy(() => import('@/app/pages/Careers'));
const Press = lazy(() => import('@/app/pages/Press'));
const Sustainability = lazy(() => import('@/app/pages/Sustainability'));
const FAQ = lazy(() => import('@/app/pages/FAQ'));
const SizingGuide = lazy(() => import('@/app/pages/SizingGuide'));
const Returns = lazy(() => import('@/app/pages/Returns'));
const TrackOrder = lazy(() => import('@/app/pages/TrackOrder'));
const PrivacyPolicy = lazy(() => import('@/app/pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('@/app/pages/TermsOfService'));

// Initialize demo users on app start (development only)
if (import.meta.env.DEV) {
  initializeDemoUsers();
}

import Shoe1 from '@/imports/shoe1/1.png';
import Shoe1_2 from '@/imports/shoe1/2.png';
import Shoe1_3 from '@/imports/shoe1/3.png';
import Shoe1_4 from '@/imports/shoe1/4.png';
import Shoe1_5 from '@/imports/shoe1/5.png';

import Shoe2 from '@/imports/shoe2/1.png';
import Shoe2_2 from '@/imports/shoe2/2.png';
import Shoe2_3 from '@/imports/shoe2/3.png';
import Shoe2_4 from '@/imports/shoe2/4.png';
import Shoe2_5 from '@/imports/shoe2/5.png';

import Shoe3 from '@/imports/shoe3/1.png';
import Shoe3_2 from '@/imports/shoe3/2.png';
import Shoe3_3 from '@/imports/shoe3/3.png';
import Shoe3_4 from '@/imports/shoe3/4.png';
import Shoe3_5 from '@/imports/shoe3/5.png';

import Shoe4 from '@/imports/shoe4/1.png';
import Shoe4_2 from '@/imports/shoe4/2.png';
import Shoe4_3 from '@/imports/shoe4/3.png';
import Shoe4_4 from '@/imports/shoe4/4.png';
import Shoe4_5 from '@/imports/shoe4/5.png';

import Shoe5 from '@/imports/shoe5/1.png';
import Shoe5_2 from '@/imports/shoe5/2.png';
import Shoe5_3 from '@/imports/shoe5/3.png';
import Shoe5_4 from '@/imports/shoe5/4.png';
import Shoe5_5 from '@/imports/shoe5/5.png';

import Shoe6 from '@/imports/shoe6/1.png';
import Shoe6_2 from '@/imports/shoe6/2.png';
import Shoe6_3 from '@/imports/shoe6/3.png';
import Shoe6_4 from '@/imports/shoe6/4.png';
import Shoe6_5 from '@/imports/shoe6/5.png';

import Shoe7 from '@/imports/shoe7/1.jpeg';
import Shoe7_2 from '@/imports/shoe7/2.jpeg';
import Shoe7_3 from '@/imports/shoe7/3.jpeg';
import Shoe7_4 from '@/imports/shoe7/4.jpeg';
import Shoe7_5 from '@/imports/shoe7/5.jpeg';
import Shoe7_6 from '@/imports/shoe7/6.jpeg';

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <p className="text-sm text-gray-400">Loading...</p>
  </div>
);

/**
 * Product database with complete information
 */
export const PRODUCTS_DATABASE = [
  {
    id: 1,
    name: 'Flex Run — Mint Blue',
    brand: 'TOPSUN',
    category: 'Running',
    price: 599,
    originalPrice: 1599,
    rating: 4.8,
    reviews: 214,
    tag: 'Sale',
    colorLabel: 'Mint / Aqua Blue',
    cardBg: '#e6f8f4',
    image: Shoe1,
    mainImage: Shoe1,
    images: [Shoe1, Shoe1_2, Shoe1_3, Shoe1_4, Shoe1_5],
    description:
      'The TOPSUN Flex Run redefines performance for runners who demand excellence. Built with cutting-edge cushioning technology and a breathable mesh upper, these shoes deliver comfort mile after mile.',
    material: '100% Engineered Mesh Upper | EVA Cushioned Midsole | Non-Slip Rubber Outsole',
    fit: 'True to size. For wider feet, consider sizing up half a size.',
    care: 'Wipe clean with a damp cloth. Air dry at room temperature.',
    features: [
      'Engineered mesh for superior breathability',
      'Multi-density cushioned midsole',
      'Non-slip rubber sole for all terrains',
      'Reflective heel strip for visibility',
      'Lightweight design (260g per shoe)',
      'Carbon-infused forefoot for stability',
      'Removable cushioned insole',
      'Performance-tested by athletes',
    ],
    sizes: [7, 8, 9, 10],
    outOfStockSizes: [],
    inStock: true,
  },
  {
    id: 2,
    name: 'Apex — Cloud Grey',
    brand: 'TOPSUN',
    category: 'Training',
    price: 599,
    originalPrice: 1599,
    rating: 4.7,
    reviews: 189,
    tag: 'New',
    colorLabel: 'White / Cloud Grey',
    cardBg: '#f0f0f2',
    image: Shoe2,
    mainImage: Shoe2,
    images: [Shoe2, Shoe2_2, Shoe2_3, Shoe2_4, Shoe2_5],
    description:
      'The Apex — Cloud Grey, the ultimate training companion. This shoe combines elegance with performance, featuring a sleek cloud grey colorway that matches any gym aesthetic.',
    material: '100% Engineered Mesh Upper | EVA Cushioned Midsole | Non-Slip Rubber Outsole',
    fit: 'True to size. Spacious toebox for comfortable training sessions.',
    care: 'Machine wash on gentle cycle or hand wash with mild soap.',
    features: [
      'Premium mesh construction',
      'Enhanced lateral support',
      'Cushioned midsole for impact protection',
      'Breathable upper material',
      'Durable rubber outsole',
      'Flexible toe area',
      'Comfortable padded collar',
      'Versatile styling',
    ],
    sizes: [7, 8, 9, 10],
    outOfStockSizes: [],
    inStock: true,
  },
  {
    id: 3,
    name: 'Apex — Desert Sand',
    brand: 'TOPSUN',
    category: 'Training',
    price: 599,
    originalPrice: 1599,
    rating: 4.9,
    reviews: 301,
    tag: 'Bestseller',
    colorLabel: 'White / Desert Sand',
    cardBg: '#f7f0e6',
    image: Shoe3,
    mainImage: Shoe3,
    images: [Shoe3, Shoe3_2, Shoe3_3, Shoe3_4, Shoe3_5],
    description:
      'Our bestselling Apex in Desert Sand is the perfect balance of style and performance. With its warm, earthy tones and responsive cushioning, it\'s no wonder this is our most popular shoe.',
    material: '100% Engineered Mesh Upper | Multi-Density EVA Midsole | Premium Rubber Outsole',
    fit: 'True to size. Recommended for all foot types.',
    care: 'Gentle hand wash or wipe clean. Air dry completely.',
    features: [
      'Best-selling design',
      'Responsive cushioning system',
      'All-day comfort technology',
      'Moisture-wicking mesh',
      'Durable construction',
      'Stylish desert sand colorway',
      'Suitable for all activities',
      'Premium materials throughout',
    ],
    sizes: [7, 8, 9, 10],
    outOfStockSizes: [],
    inStock: true,
  },
  {
    id: 4,
    name: 'Apex — Midnight Teal',
    brand: 'TOPSUN',
    category: 'Training',
    price: 599,
    originalPrice: 1599,
    rating: 4.6,
    reviews: 176,
    tag: 'Sale',
    colorLabel: 'Black / Teal',
    cardBg: '#e8f0ee',
    image: Shoe4,
    mainImage: Shoe4,
    images: [Shoe4, Shoe4_2, Shoe4_3, Shoe4_4, Shoe4_5],
    description:
      'Bold and striking, the Apex in Midnight Teal makes a statement. This premium training shoe features advanced cushioning technology and a modern colorway that stands out from the crowd.',
    material: '100% Engineered Mesh Upper | EVA Midsole | Non-Slip Rubber Outsole',
    fit: 'True to size with a snug fit around the midfoot.',
    care: 'Hand wash recommended to maintain the vibrant teal color.',
    features: [
      'Bold midnight teal design',
      'Advanced cushioning',
      'Snug midfoot fit',
      'Breathable mesh upper',
      'Professional-grade sole',
      'Modern aesthetic',
      'Premium comfort',
      'Limited edition colorway',
    ],
    sizes: [7, 8, 9, 10],
    outOfStockSizes: [],
    inStock: true,
  },
  {
    id: 5,
    name: 'Apex — Storm Orange',
    brand: 'TOPSUN',
    category: 'Running',
    price: 599,
    originalPrice: 1599,
    rating: 4.8,
    reviews: 243,
    tag: 'Sale',
    colorLabel: 'White / Storm Orange',
    cardBg: '#fff1ea',
    image: Shoe5,
    mainImage: Shoe5,
    images: [Shoe5, Shoe5_2, Shoe5_3, Shoe5_4, Shoe5_5],
    description:
      'Energize your runs with the vibrant Storm Orange colorway. This high-energy shoe delivers the performance you need with the style you want. Perfect for runners who want to stand out.',
    material: '100% Engineered Mesh Upper | EVA Cushioned Midsole | Non-Slip Rubber Outsole',
    fit: 'True to size. Great for neutral and underpronators.',
    care: 'Wipe clean or gentle machine wash.',
    features: [
      'Vibrant storm orange color',
      'High-energy design',
      'Responsive cushioning',
      'Breathable upper',
      'Superior traction',
      'Lightweight build',
      'Eye-catching style',
      'Performance-tested',
    ],
    sizes: [7, 8, 9, 10],
    outOfStockSizes: [],
    inStock: true,
  },
  {
    id: 6,
    name: 'Apex — Amber Trail',
    brand: 'TOPSUN',
    category: 'Running',
    price: 599,
    originalPrice: 1599,
    rating: 4.7,
    reviews: 158,
    tag: 'Sale',
    colorLabel: 'White / Amber',
    cardBg: '#fef4e6',
    image: Shoe6,
    mainImage: Shoe6,
    images: [Shoe6, Shoe6_2, Shoe6_3, Shoe6_4, Shoe6_5],
    description:
      'Trail-ready and street-ready, the Apex in Amber combines the best of both worlds. The warm amber tone provides a sophisticated look while the advanced sole handles any terrain.',
    material: '100% Engineered Mesh Upper | EVA Midsole | Aggressive Tread Outsole',
    fit: 'True to size with reinforced ankle support.',
    care: 'Suitable for machine wash on gentle cycle.',
    features: [
      'Trail-inspired design',
      'Warm amber colorway',
      'Reinforced ankle support',
      'Aggressive tread pattern',
      'All-terrain capability',
      'Comfortable arch support',
      'Durable construction',
      'Versatile style',
    ],
    sizes: [7, 8, 9, 10],
    outOfStockSizes: [],
    inStock: true,
  },
  {
    id: 7,
    name: 'Apex — Premium Edition',
    brand: 'TOPSUN',
    category: 'Training',
    price: 599,
    originalPrice: 1599,
    rating: 4.9,
    reviews: 267,
    tag: 'New',
    colorLabel: 'Premium Black / White',
    cardBg: '#f5f5f5',
    image: Shoe7,
    mainImage: Shoe7,
    images: [Shoe7, Shoe7_2, Shoe7_3, Shoe7_4, Shoe7_5, Shoe7_6],
    description:
      'The ultimate premium training shoe. Engineered with state-of-the-art technology and premium materials, the Apex Premium Edition delivers uncompromising performance for serious athletes.',
    material: 'Premium Engineered Mesh + Leather Upper | Advanced EVA Midsole | High-Grip Rubber Outsole',
    fit: 'True to size. Premium padded collar for enhanced comfort.',
    care: 'Hand wash with premium shoe cleaner. Air dry at room temperature.',
    features: [
      'Premium leather and mesh blend',
      'Advanced cushioning system',
      'Enhanced ankle support',
      'Premium breathable materials',
      'High-grip outsole',
      'Reinforced stitching',
      'Pressure-mapping insole',
      'Professional-grade construction',
      'Limited edition release',
      'Certified by professional athletes',
    ],
    sizes: [7, 8, 9, 10],
    outOfStockSizes: [],
    inStock: true,
  },
];

/**
 * Get a single product by ID
 */
export function getProductById(id: number) {
  return PRODUCTS_DATABASE.find((product) => product.id === id);
}

/**
 * Get related products (same category, different product)
 */
export function getRelatedProducts(currentProductId: number, limit: number = 6) {
  const current = getProductById(currentProductId);
  if (!current) return [];

  return PRODUCTS_DATABASE.filter(
    (p) => p.category === current.category && p.id !== currentProductId
  ).slice(0, limit);
}

/**
 * Router configuration
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/signup',
    element: <Suspense fallback={<LoadingFallback />}><SignUp /></Suspense>,
  },
  {
    path: '/signin',
    element: <Suspense fallback={<LoadingFallback />}><SignIn /></Suspense>,
  },
  {
    path: '/profile',
    element: <Suspense fallback={<LoadingFallback />}><Profile /></Suspense>,
  },
  {
    path: '/shop',
    element: <Suspense fallback={<LoadingFallback />}><Shop /></Suspense>,
  },
  {
    path: '/cart',
    element: <Suspense fallback={<LoadingFallback />}><Cart /></Suspense>,
  },
  {
    path: '/checkout',
    element: <Suspense fallback={<LoadingFallback />}><Checkout /></Suspense>,
  },
  {
    path: '/order-confirmation/:orderId',
    element: <Suspense fallback={<LoadingFallback />}><OrderConfirmation /></Suspense>,
  },
  {
    path: '/orders',
    element: <Suspense fallback={<LoadingFallback />}><Orders /></Suspense>,
  },
  {
    path: '/about',
    element: <Suspense fallback={<LoadingFallback />}><AboutUs /></Suspense>,
  },
  {
    path: '/contact',
    element: <Suspense fallback={<LoadingFallback />}><ContactUs /></Suspense>,
  },
  {
    path: '/demo-credentials',
    element: <Suspense fallback={<LoadingFallback />}><DemoCredentials /></Suspense>,
  },
  {
    path: '/product/:productId',
    element: <Suspense fallback={<LoadingFallback />}><ProductDetailPageRoute /></Suspense>,
    errorElement: <div>Product not found</div>,
  },
  {
    path: '/careers',
    element: <Suspense fallback={<LoadingFallback />}><Careers /></Suspense>,
  },
  {
    path: '/press',
    element: <Suspense fallback={<LoadingFallback />}><Press /></Suspense>,
  },
  {
    path: '/sustainability',
    element: <Suspense fallback={<LoadingFallback />}><Sustainability /></Suspense>,
  },
  {
    path: '/faq',
    element: <Suspense fallback={<LoadingFallback />}><FAQ /></Suspense>,
  },
  {
    path: '/sizing-guide',
    element: <Suspense fallback={<LoadingFallback />}><SizingGuide /></Suspense>,
  },
  {
    path: '/returns',
    element: <Suspense fallback={<LoadingFallback />}><Returns /></Suspense>,
  },
  {
    path: '/track-order',
    element: <Suspense fallback={<LoadingFallback />}><TrackOrder /></Suspense>,
  },
  {
    path: '/privacy-policy',
    element: <Suspense fallback={<LoadingFallback />}><PrivacyPolicy /></Suspense>,
  },
  {
    path: '/terms-of-service',
    element: <Suspense fallback={<LoadingFallback />}><TermsOfService /></Suspense>,
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}

