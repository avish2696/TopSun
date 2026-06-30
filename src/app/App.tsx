import Header from '@/app/components/Header';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, ArrowRight, Heart, Star, Instagram, Twitter, Youtube, X } from "lucide-react";
import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import { ResponsiveImage } from "@/app/components/ResponsiveImage";
import { useShopping, CartItem } from "@/app/context/ShoppingContext";
import HeroShoe3D from "@/app/components/HeroShoe3D";

// Import images
import TopsunLogoImg from "@/imports/TOPSUN png 1.png";
import Shoe1 from "@/imports/shoe1/1.png";
import Shoe2 from "@/imports/shoe2/1.png";
import Shoe3 from "@/imports/shoe3/1.png";
import Shoe4 from "@/imports/shoe4/1.png";
import Shoe5 from "@/imports/shoe5/1.png";
import Shoe6 from "@/imports/shoe6/1.png";
import Shoe7 from "@/imports/shoe7/1.jpeg";

const products = [
  {
    id: 1,
    name: "Flex Run — Mint Blue",
    category: "Running",
    price: 599,
    originalPrice: 1599,
    rating: 4.8,
    reviews: 214,
    tag: "Sale",
    image: Shoe1,
    alt: "TOPSUN Flex Run sneaker in mint and aqua blue colorway",
    colorLabel: "Mint / Aqua Blue",
    cardBg: "#e6f8f4",
  },
  {
    id: 2,
    name: "Apex — Cloud Grey",
    category: "Training",
    price: 599,
    originalPrice: 1599,
    rating: 4.7,
    reviews: 189,
    tag: "New",
    image: Shoe2,
    alt: "TOPSUN Apex sneaker in white and grey colorway",
    colorLabel: "White / Cloud Grey",
    cardBg: "#f0f0f2",
  },
  {
    id: 3,
    name: "Apex — Desert Sand",
    category: "Training",
    price: 599,
    originalPrice: 1599,
    rating: 4.9,
    reviews: 301,
    tag: "Bestseller",
    image: Shoe3,
    alt: "TOPSUN Apex sneaker in white, tan and black colorway",
    colorLabel: "White / Desert Sand",
    cardBg: "#f7f0e6",
  },
  {
    id: 4,
    name: "Apex — Midnight Teal",
    category: "Training",
    price: 599,
    originalPrice: 1599,
    rating: 4.6,
    reviews: 176,
    tag: "Sale",
    image: Shoe4,
    alt: "TOPSUN Apex sneaker in black, tan and teal colorway",
    colorLabel: "Black / Teal",
    cardBg: "#e8f0ee",
  },
  {
    id: 5,
    name: "Apex — Storm Orange",
    category: "Running",
    price: 599,
    originalPrice: 1599,
    rating: 4.8,
    reviews: 243,
    tag: "Sale",
    image: Shoe5,
    alt: "TOPSUN Apex sneaker in white, grey and orange colorway",
    colorLabel: "White / Storm Orange",
    cardBg: "#fff1ea",
  },
  {
    id: 6,
    name: "Apex — Amber Trail",
    category: "Running",
    price: 599,
    originalPrice: 1599,
    rating: 4.7,
    reviews: 158,
    tag: "Sale",
    image: Shoe6,
    alt: "TOPSUN Apex sneaker in white, orange and tan colorway",
    colorLabel: "White / Amber",
    cardBg: "#fef4e6",
  },
  {
    id: 7,
    name: "Apex — Premium Edition",
    category: "Training",
    price: 599,
    originalPrice: 1599,
    rating: 4.9,
    reviews: 267,
    tag: "New",
    image: Shoe7,
    alt: "TOPSUN Apex Premium Edition sneaker in black and white colorway",
    colorLabel: "Premium Black / White",
    cardBg: "#f5f5f5",
  },
];

const tagStyles: Record<string, string> = {
  Sale: "bg-[#ADD8E6] text-white",
  New: "bg-[#0c0c0c] text-white",
  Bestseller: "bg-[#f0ede8] text-[#0c0c0c]",
  Limited: "bg-[#3a2f2f] text-white",
};

const filters = ["All", "Running", "Training"];

// Animated Hero Heading Component
function AnimatedHeroHeading() {
  const headings = [
    "Apex Performance",
    "Step Into Excellence",
    "Built for Champions",
    "Engineered to Dominate",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % headings.length);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(interval);
  }, [headings.length]);

  return (
    <div className="relative h-full flex items-center justify-start md:justify-start">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.8 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-full"
        >
          <motion.span
            initial={{ backgroundPosition: "0% center" }}
            animate={{ backgroundPosition: "100% center" }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
            className="inline-block bg-gradient-to-r from-white via-[#ADD8E6] to-white bg-[length:200%_auto] text-transparent bg-clip-text"
          >
            {headings[currentIndex]}
          </motion.span>
        </motion.div>
      </AnimatePresence>

      {/* Progress indicator dots */}
      <div className="absolute bottom-0 left-0 flex gap-1.5 mt-3">
        {headings.map((_, idx) => (
          <motion.div
            key={idx}
            animate={{
              scaleX: idx === currentIndex ? 1 : 0.5,
              opacity: idx === currentIndex ? 1 : 0.4,
            }}
            transition={{ duration: 0.3 }}
            className="h-0.5 w-2 bg-[#ADD8E6] rounded-full origin-left"
          />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [cartNotif, setCartNotif] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [heroShoeIndex, setHeroShoeIndex] = useState(0);
  const navigate = useNavigate();
  const { addToCart: addToCartContext, getCartItemCount } = useShopping();

  const filtered =
    activeFilter === "All" ? products : products.filter((p) => p.category === activeFilter);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  const addToCart = (product: (typeof products)[0]) => {
    setCartCount((c) => c + 1);
    setCartItems((prev) => [...prev, product]);
    setCartNotif(true);
    setTimeout(() => setCartNotif(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Toast */}
      {cartNotif && (
        <motion.div
          initial={{ opacity: 0, x: 100, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed top-6 right-6 z-50 bg-[#0c0c0c] text-white text-sm px-5 py-3 shadow-lg flex items-center gap-3"
        >
          <ShoppingBag size={14} />
          Added to bag
        </motion.div>
      )}

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 bg-black/40"
              onClick={() => setCartOpen(false)}
            />
            <motion.div
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full sm:w-80 max-w-xs bg-white h-full flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-border">
                <h3 className="font-semibold tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Your Bag ({cartCount})
                </h3>
                <motion.button
                  onClick={() => setCartOpen(false)}
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={18} />
                </motion.button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
                {cartItems.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center mt-10">Your bag is empty.</p>
                ) : (
                  cartItems.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex gap-4 py-3 border-b border-border"
                    >
                      <div className="w-16 h-16 bg-[#f5f4f1] flex-shrink-0 overflow-hidden">
                        <ResponsiveImage src={item.image} alt={item.alt} className="w-full h-full object-contain" loading="lazy" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium leading-snug truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.colorLabel}</p>
                        <p className="text-sm font-semibold mt-1">₹{item.price}</p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
              {cartItems.length > 0 && (
                <div className="px-6 pb-8 pt-4 border-t border-border">
                  <div className="flex justify-between text-sm mb-4">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">₹{cartItems.reduce((acc, i) => acc + i.price, 0)}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#0c0c0c] text-white py-4 text-xs tracking-widest uppercase hover:bg-[#ADD8E6] transition-colors duration-300"
                  >
                    Checkout
                  </motion.button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

{/* NAVBAR */}
      <Header
        cartCount={getCartItemCount()}
        onCartClick={() => navigate('/cart')}
        onMobileMenuToggle={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
      />

      {/* HERO */}
      <section className="pt-12 pb-12 md:pt-0 md:pb-0 md:min-h-screen overflow-hidden relative bg-gradient-to-br from-[#0c0c0c] via-[#1a1a1a] to-[#0c0c0c]">
        
        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-5 md:opacity-10">
          <span 
            className="text-[8rem] md:text-[15rem] font-black text-white select-none tracking-tighter whitespace-nowrap"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            TOPSUN
          </span>
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col md:grid md:grid-cols-[1fr_1fr] h-auto md:min-h-screen items-center">
          
          {/* Left Text - Mobile Top, Desktop Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="px-6 md:px-16 py-4 md:py-0 text-center md:text-left order-2 md:order-1"
          >
            <motion.div className="text-[9px] tracking-[0.3em] uppercase text-[#ADD8E6] mb-2 inline-block md:block">
              New Collection 2026
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-2xl md:text-5xl font-black text-white mb-3 leading-tight min-h-[60px] md:min-h-[80px]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <AnimatedHeroHeading />
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xs md:text-sm text-gray-300 max-w-sm mx-auto md:mx-0 leading-relaxed mb-6"
            >
              Engineered precision meets timeless style. Built for champions, crafted for you.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 0.3 }}
              onClick={() => navigate('/shop')}
              className="px-8 py-3 bg-gradient-to-r from-[#ADD8E6] to-[#87CEEB] text-white font-bold text-xs tracking-widest uppercase rounded-lg hover:shadow-lg transition-all"
            >
              Shop Now
            </motion.button>
          </motion.div>

          {/* 3D Model - Mobile Full, Desktop Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-auto flex items-center justify-center order-1 md:order-2 py-4 md:py-0"
          >
            <div className="w-full max-w-xs md:max-w-none md:w-96 h-80 md:h-[600px] relative">
              <HeroShoe3D />
            </div>
          </motion.div>
        </div>
      </section>


      {/* SCROLLING PRODUCT GALLERY */}
      <section className="bg-[#050505] py-6 border-t border-white/5 overflow-hidden">
        <div className="px-6 md:px-12 mb-8 max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-3">002 — Biomaterial Fabric Library</p>
            </div>
            <span className="text-[9px] tracking-[0.2em] uppercase text-gray-500 hidden sm:block">Tactile Calibration: Active</span>
          </div>
        </div>

        <div className="relative w-full flex overflow-hidden group">
          <motion.div
            className="flex gap-2 sm:gap-4 px-4 whitespace-nowrap w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 35,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {[...products, ...products, ...products, ...products].map((p, i) => (
              <Link
                key={`${p.id}-${i}`}
                to={`/product/${p.id}`}
                className="no-underline"
              >
                <div 
                  className="relative w-[360px] h-[200px] shrink-0 bg-gradient-to-br from-[#2a2a2a] to-[#111111] overflow-hidden group/card cursor-pointer"
                >
                  {/* Dark gradient overlay for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                  
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="absolute inset-0 w-full h-full p-2 scale-110 object-contain object-center opacity-80 group-hover/card:opacity-100 group-hover/card:scale-125 transition-all duration-700 grayscale group-hover/card:grayscale-0" 
                  />
                  
                  <div className="absolute bottom-4 left-4 z-20">
                    <p className="text-[9px] tracking-[0.2em] uppercase text-gray-300 border border-white/20 bg-black/20 backdrop-blur-sm px-3 py-1.5 inline-block">
                      {p.name.split('—')[0].trim()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SALE BANNER */}
      <div className="bg-[#ADD8E6] text-white py-3 overflow-hidden">
        <motion.div 
          className="flex gap-12 whitespace-nowrap w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
          {Array(16)
            .fill(null)
            .map((_, i) => (
              <span key={i} className="text-xs tracking-[0.25em] uppercase flex items-center gap-6 px-4">
                <span>Free Shipping</span>
                <span className="opacity-40">·</span>
                <span>Genuine TOPSUN</span>
                <span className="opacity-40">·</span>
              </span>
            ))}
        </motion.div>
      </div>

      {/* PRODUCTS */}
      <section id="products" className="py-12 px-6 max-w-[1400px] mx-auto">
        <div className="mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
            All Styles
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className="text-[clamp(2rem,4vw,3.5rem)] leading-tight font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Shop the Collection
            </h2>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-1.5 text-xs tracking-wide uppercase border transition-colors duration-200 ${
                    activeFilter === f
                      ? "bg-[#0c0c0c] text-white border-[#0c0c0c]"
                      : "bg-transparent text-foreground border-border hover:border-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-2 md:gap-3 bg-border">
          {filtered.map((product, index) => (
            <Link key={product.id} to={`/product/${product.id}`} className="no-underline">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group bg-white relative flex flex-col cursor-pointer h-full"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-square flex items-center justify-center px-3 sm:px-6 py-4 sm:py-8" style={{ backgroundColor: product.cardBg }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <ResponsiveImage
                    src={product.image}
                    alt={product.alt}
                    loading="lazy"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </motion.div>
                {product.tag && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className={`absolute top-4 left-4 text-[10px] font-medium tracking-widest uppercase px-2.5 py-1 ${tagStyles[product.tag]}`}
                  >
                    {product.tag}
                  </motion.span>
                )}
                <motion.button
                  onClick={() => toggleWishlist(product.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 w-8 h-8 bg-white flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  aria-label="Add to wishlist"
                >
                  <Heart
                    size={14}
                    className={
                      wishlist.includes(product.id)
                        ? "fill-[#ADD8E6] text-[#ADD8E6]"
                        : "text-foreground"
                    }
                  />
                </motion.button>
                {/* Quick add */}
                <motion.button
                  onClick={() => addToCart(product)}
                  whileHover={{ y: -50 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute bottom-0 left-0 right-0 bg-[#0c0c0c] text-white text-xs tracking-[0.15em] uppercase py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                >
                  Add to Bag
                </motion.button>
              </div>

              {/* Info */}
              <div className="p-2 sm:p-5 flex flex-col gap-1.5">
                <p className="text-[10px] tracking-widest uppercase text-muted-foreground">
                  TOPSUN · {product.category}
                </p>
                <h3 className="text-sm font-semibold leading-snug">{product.name}</h3>
                <p className="text-[11px] text-muted-foreground">{product.colorLabel}</p>

                {/* Stars */}
                <div className="flex items-center gap-1 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring" }}
                    >
                      <Star
                        size={10}
                        className={
                          i < Math.floor(product.rating)
                            ? "fill-[#ADD8E6] text-[#ADD8E6]"
                            : "text-border fill-border"
                        }
                      />
                    </motion.div>
                  ))}
                  <span className="text-[10px] text-muted-foreground ml-1">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border">
                  <span
                    className="text-lg font-bold"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    ₹{product.price}
                  </span>
                  <span className="text-xs text-muted-foreground line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="ml-auto text-[10px] bg-[#ADD8E6] text-white px-2 py-0.5 tracking-wide">
                    65% OFF
                  </span>
                </div>
              </div>
            </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* BRAND STATEMENT */}
      <section className="bg-[#0c0c0c] text-white py-16 px-6">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1fr_1fr] gap-16 items-center">
          <div>
            <p className="text-xs tracking-[0.35em] uppercase text-[#ADD8E6] mb-8">
              Built Different
            </p>
            <blockquote
              className="text-[clamp(2rem,4.5vw,4rem)] leading-[1.1] font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              &ldquo;Performance
              <br />
              that earns its
              <br />
              place.&rdquo;
            </blockquote>
          </div>
          <div className="flex flex-col gap-8">
            {[
              {
                title: "Engineered Cushioning",
                body: "Our proprietary foam midsole absorbs impact across long distances — your knees thank you at kilometre 10.",
              },
              {
                title: "Breathable Mesh Upper",
                body: "Lightweight knit ventilation keeps feet cool through sprints, intervals, and everything in between.",
              },
              {
                title: "Non-Slip Rubber Sole",
                body: "Multidirectional grip pattern handles wet tracks and hard courts with equal confidence.",
              },
            ].map(({ title, body }) => (
              <div key={title} className="flex gap-6 group">
                <div className="w-px bg-[#ADD8E6] self-stretch flex-shrink-0 group-hover:bg-white transition-colors" />
                <div>
                  <h4
                    className="text-base font-semibold mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {title}
                  </h4>
                  <p className="text-sm text-white/60 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALL 7 — Colorway Picker Showcase */}
      <section className="py-12 px-6 max-w-[1400px] mx-auto">
        <div className="mb-12 text-center">
          <p className="text-xs tracking-[0.35em] uppercase text-muted-foreground mb-3">
            7 Colorways
          </p>
          <h2
            className="text-[clamp(2rem,4vw,3.5rem)] font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Pick Your Pair
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto leading-relaxed">
            Same iconic TOPSUN silhouette. Seven distinct identities. All ₹599 — while stock lasts.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-1 sm:gap-2 md:gap-3">
          {products.map((p) => (
            <button
              key={p.id}
              onClick={() => addToCart(p)}
              className="group p-4 flex flex-col items-center gap-3 transition-colors duration-200 relative"
              style={{ backgroundColor: p.cardBg }}
            >
              <ResponsiveImage
                src={p.image}
                alt={p.alt}
                loading="lazy"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="w-full aspect-square object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <p className="text-[10px] text-center text-muted-foreground tracking-wide leading-tight">
                {p.colorLabel}
              </p>
              <span className="text-xs font-bold">₹{p.price}</span>
              <span className="absolute bottom-0 left-0 right-0 bg-[#ADD8E6] text-white text-[9px] tracking-widest uppercase py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Add to Bag
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-[#f5f4f1] py-12 px-6">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs tracking-[0.35em] uppercase text-[#ADD8E6] mb-4">Stay in the Loop</p>
          <h2
            className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Early access to drops
            <br />& exclusive deals.
          </h2>
          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            Join 38,000+ members. No spam — only what matters.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 sm:gap-0 border border-border bg-white"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 sm:px-5 py-3 sm:py-4 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="bg-[#0c0c0c] text-white px-4 sm:px-6 py-3 sm:py-4 text-xs tracking-widest uppercase hover:bg-[#ADD8E6] transition-colors duration-300 whitespace-nowrap w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0c0c0c] text-white/70 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* Brand Column */}
            <div className="col-span-2 sm:col-span-1">
              <p
                className="text-xl sm:text-2xl font-black tracking-[0.2em] text-white mb-3 sm:mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                TOPSUN
              </p>
              <p className="text-xs sm:text-sm leading-relaxed max-w-xs mb-4 sm:mb-6">
                Performance footwear for those who move with intention. Genuine quality. Unbeatable price.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3 sm:gap-4">
                <a
                  href="https://www.instagram.com/top_sunshoes7?igsh=MXNnc3Q1NGFiam0wMw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 border border-white/20 flex items-center justify-center hover:border-[#ADD8E6] hover:text-[#ADD8E6] hover:bg-[#ADD8E6]/10 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram size={14} />
                </a>
                <a
                  href="https://www.facebook.com/share/16mU9mdDvs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 border border-white/20 flex items-center justify-center hover:border-[#ADD8E6] hover:text-[#ADD8E6] hover:bg-[#ADD8E6]/10 transition-all"
                  aria-label="Facebook"
                >
                  <X size={14} />
                </a>
                <a
                  href="https://wa.me/917485006659"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 border border-white/20 flex items-center justify-center hover:border-[#25D366] hover:text-[#25D366] hover:bg-[#25D366]/10 transition-all"
                  aria-label="WhatsApp"
                >
                  <Youtube size={14} />
                </a>
              </div>
            </div>

            {/* Shop Column */}
            <div>
              <p className="text-white text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-5 font-semibold">Shop</p>
              <ul className="flex flex-col gap-2 sm:gap-3">
                {[
                  { label: "All Products", href: "/shop" },
                  { label: "Running", href: "/shop" },
                  { label: "Training", href: "/shop" },
                  { label: "Sale", href: "/shop" },
                ].map((l) => (
                  <li key={l.label}>
                    <Link to={l.href} className="text-xs sm:text-sm hover:text-[#ADD8E6] transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <p className="text-white text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-5 font-semibold">Company</p>
              <ul className="flex flex-col gap-2 sm:gap-3">
                {[
                  { label: "About", href: "/about" },
                  { label: "Careers", href: "/careers" },
                  { label: "Press", href: "/press" },
                  { label: "Sustainability", href: "/sustainability" },
                ].map((l) => (
                  <li key={l.label}>
                    <Link to={l.href} className="text-xs sm:text-sm hover:text-[#ADD8E6] transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <p className="text-white text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-5 font-semibold">Support</p>
              <ul className="flex flex-col gap-2 sm:gap-3">
                {[
                  { label: "FAQ", href: "/faq" },
                  { label: "Sizing Guide", href: "/sizing-guide" },
                  { label: "Returns", href: "/returns" },
                  { label: "Track Order", href: "/track-order" },
                ].map((l) => (
                  <li key={l.label}>
                    <Link to={l.href} className="text-xs sm:text-sm hover:text-[#ADD8E6] transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <p className="text-white text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-5 font-semibold">Contact</p>
              <ul className="flex flex-col gap-2 sm:gap-3">
                <li>
                  <a href="mailto:topsunshoes7@gmail.com" className="text-xs sm:text-sm hover:text-[#ADD8E6] transition-colors">
                    topsunshoes7@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+917485006659" className="text-xs sm:text-sm hover:text-[#ADD8E6] transition-colors">
                    +91 7485006659
                  </a>
                </li>
                <li className="pt-2">
                  <a 
                    href="https://wa.me/917485006659"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-[#25D366] hover:text-[#20BA5A] transition-colors font-semibold"
                  >
                    Message on WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-white/10 pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs sm:text-sm">
              <p className="order-2 sm:order-1">© 2025 TOPSUN Performance Sneakers. All rights reserved.</p>
              <div className="flex flex-wrap gap-3 sm:gap-6 order-1 sm:order-2">
                <Link to="/privacy-policy" className="hover:text-[#ADD8E6] transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms-of-service" className="hover:text-[#ADD8E6] transition-colors">
                  Terms of Service
                </Link>
                <a href="#" className="hover:text-[#ADD8E6] transition-colors">
                  Cookie Settings
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

