import { useState, useEffect } from "react";
import { ShoppingBag, Search, Menu, X, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import TopsunLogoImg from "@/imports/TOPSUN png 1.png";
import { useAuth } from "@/app/context/AuthContext";
import { useShopping } from "@/app/context/ShoppingContext";
import { toast } from "sonner";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onMobileMenuToggle: (open: boolean) => void;
  mobileMenuOpen: boolean;
}

const navItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Orders", href: "/orders" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Logo Component with animation
const TopsunLogo = () => (
  <motion.img
    src={TopsunLogoImg}
    alt="Topsun Logo"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay: 0.1 }}
    className="h-10 w-auto object-contain cursor-pointer"
    whileHover={{ scale: 1.08 }}
  />
);

export default function Header({
  cartCount,
  onCartClick,
  onMobileMenuToggle,
  mobileMenuOpen,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, logout } = useAuth();
  const { clearCart } = useShopping();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    clearCart();
    setShowProfileMenu(false);
    toast.success("Logged out successfully!");
    navigate("/", { replace: true });
  };

  const handleProfileClick = () => {
    if (!user) {
      navigate("/signin");
    } else {
      setShowProfileMenu(!showProfileMenu);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-white border-b border-border"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <motion.div className="flex-shrink-0">
          <Link to="/">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <TopsunLogo />
            </motion.div>
          </Link>
        </motion.div>

        {/* Center: Desktop Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden lg:flex items-center gap-10"
        >
          {navItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 + index * 0.08 }}
              whileHover="hover"
              className="relative group"
            >
              <Link
                to={item.href}
                className="text-sm font-medium tracking-wide text-foreground relative group"
              >
                <motion.span
                  className="relative inline-block"
                  variants={{
                    hover: {
                      color: "#ADD8E6",
                    },
                  }}
                >
                  {item.label}
                </motion.span>

                {/* Animated underline */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#ADD8E6] to-[#87CEEB] origin-left"
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileHover={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />

                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg bg-[#ADD8E6]/5 -z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* Right: Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-4 lg:gap-6"
        >
          {/* Search Button */}
          <motion.button
            className="hidden lg:flex items-center justify-center text-foreground hover:text-[#ADD8E6] transition-colors"
            whileHover={{ scale: 1.15, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Search"
          >
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
              <Search size={18} strokeWidth={1.5} />
            </motion.div>
          </motion.button>

          {/* Shopping Cart Button */}
          <motion.button
            className="relative text-foreground hover:text-[#ADD8E6] transition-colors flex items-center justify-center"
            onClick={onCartClick}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Shopping bag"
          >
            <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 200 }}>
              <ShoppingBag size={18} strokeWidth={1.5} />
            </motion.div>
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0, opacity: 0, y: -5 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="absolute -top-3 -right-3 bg-gradient-to-br from-[#ADD8E6] to-[#87CEEB] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-lg"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Profile Button */}
          <div className="relative">
            <motion.button
              onClick={handleProfileClick}
              className={`flex items-center justify-center w-9 h-9 rounded-full transition-all ${
                user
                  ? "bg-gradient-to-br from-[#ADD8E6] to-[#87CEEB] text-white"
                  : "text-foreground hover:text-[#ADD8E6]"
              }`}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              title={user ? `${user.fullName}` : "Sign In"}
            >
              <User size={18} strokeWidth={1.5} />
            </motion.button>

            {/* Profile Dropdown Menu */}
            {user && (
              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50"
                  >
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
                      <p className="text-sm font-semibold text-gray-900">{user.fullName}</p>
                      <p className="text-xs text-gray-600">{user.phone}</p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link to="/profile">
                        <motion.button
                          className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-blue-50 transition-colors flex items-center gap-2"
                          whileHover={{ x: 4 }}
                        >
                          <User size={14} />
                          My Profile
                        </motion.button>
                      </Link>

                      <motion.button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 border-t border-gray-200"
                        whileHover={{ x: 4 }}
                      >
                        <LogOut size={14} />
                        Logout
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            className="lg:hidden flex items-center justify-center"
            onClick={() => onMobileMenuToggle(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="lg:hidden bg-white border-t border-border overflow-hidden"
          >
            <div className="px-4 sm:px-6 py-6 flex flex-col gap-0">
              {navItems.map((item, index) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => onMobileMenuToggle(false)}
                >
                  <motion.div
                    initial={{ opacity: 0, x: -30, y: -10 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ delay: index * 0.08, duration: 0.3 }}
                    whileHover={{ x: 10, color: "#ADD8E6" }}
                    className="text-sm font-medium tracking-wide py-4 hover:text-[#ADD8E6] transition-colors border-b border-border last:border-b-0 flex items-center group"
                  >
                    <motion.span
                      className="inline-block mr-3 text-[#ADD8E6]"
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      →
                    </motion.span>
                    {item.label}
                  </motion.div>
                </Link>
              ))}

              {/* Mobile User Menu */}
              {user && (
                <>
                  <div className="border-t border-b border-border py-4 mt-4 mb-4">
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                      Logged in as
                    </p>
                    <p className="font-medium text-gray-900">{user.fullName}</p>
                  </div>

                  <Link to="/profile" onClick={() => onMobileMenuToggle(false)}>
                    <motion.div
                      className="text-sm font-medium tracking-wide py-3 text-foreground hover:text-[#ADD8E6] transition-colors flex items-center gap-2"
                      whileHover={{ x: 10 }}
                    >
                      <User size={16} />
                      My Profile
                    </motion.div>
                  </Link>

                  <motion.button
                    onClick={() => {
                      handleLogout();
                      onMobileMenuToggle(false);
                    }}
                    className="w-full text-left text-sm font-medium tracking-wide py-3 text-red-600 hover:text-red-700 transition-colors flex items-center gap-2 border-t border-border"
                    whileHover={{ x: 10 }}
                  >
                    <LogOut size={16} />
                    Logout
                  </motion.button>
                </>
              )}

              {/* Search button for mobile */}
              <motion.button
                className="flex items-center justify-center gap-3 mt-6 py-4 bg-gradient-to-r from-[#ADD8E6] to-[#87CEEB] text-white text-xs font-medium tracking-widest uppercase hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.08 + 0.1 }}
                whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(196, 81, 10, 0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                <Search size={14} strokeWidth={2} />
                Search
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
