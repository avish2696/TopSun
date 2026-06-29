import Header from '@/app/components/Header';
import ProductDetailPageComponent from '@/app/components/ProductDetailPage';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, getRelatedProducts } from '@/app/routes/Routes';
import { useShopping, CartItem } from '@/app/context/ShoppingContext';
import Shoe1 from '@/imports/shoe1/1.png';
import Shoe2 from '@/imports/shoe2/1.png';
import Shoe3 from '@/imports/shoe3/1.png';
import Shoe4 from '@/imports/shoe4/1.png';
import Shoe5 from '@/imports/shoe5/1.png';
import Shoe6 from '@/imports/shoe6/1.png';
import Shoe7 from '@/imports/shoe7/1.jpeg';
import { useEffect } from 'react';

const shoeImages: Record<number, string> = {
  1: Shoe1,
  2: Shoe2,
  3: Shoe3,
  4: Shoe4,
  5: Shoe5,
  6: Shoe6,
  7: Shoe7,
};

/**
 * Product Detail Page with routing
 * This component is used when accessed via /product/:productId
 */
export default function ProductDetailPageRoute() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { addToCart, getCartItemCount } = useShopping();

  // Get product from database
  const product = productId ? getProductById(parseInt(productId)) : null;

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <Header
          cartCount={getCartItemCount()}
          onCartClick={() => navigate('/cart')}
          onMobileMenuToggle={setMobileMenuOpen}
          mobileMenuOpen={mobileMenuOpen}
        />
        <div className="text-center mt-20">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">Sorry, the product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-[#ADD8E6] text-white px-6 py-2 rounded-lg hover:bg-[#87CEEB]"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = (size: number | string, quantity: number) => {
    // Create cart item and add to shopping context
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: shoeImages[product.id],
      size: size,
      quantity: quantity,
      colorLabel: product.colorLabel,
    };
    addToCart(cartItem);
    alert(`${quantity} pair(s) added to cart!`);
  };

  const handleAddToWishlist = () => {
    console.log('Added to wishlist');
    alert('Added to wishlist!');
  };

  // Get related products
  const relatedProducts = getRelatedProducts(product.id);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Header
        cartCount={getCartItemCount()}
        onCartClick={() => navigate('/cart')}
        onMobileMenuToggle={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
      />

      {/* Add top padding to account for fixed header */}
      <div className="pt-16">
        <ProductDetailPageComponent
          product={product}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          relatedProducts={relatedProducts}
        />
      </div>

      {/* Footer */}
      <footer className="bg-[#0c0c0c] text-white py-16 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-semibold text-sm tracking-wide mb-4">Shop</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>
                  <a href="/" className="hover:text-white transition-colors">
                    All Products
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-white transition-colors">
                    Running Shoes
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-white transition-colors">
                    Training Shoes
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-white transition-colors">
                    Sale
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm tracking-wide mb-4">Company</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>
                  <a href="/" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-white transition-colors">
                    Press
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm tracking-wide mb-4">Support</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>
                  <a href="/" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-white transition-colors">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-white transition-colors">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-white transition-colors">
                    Track Order
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm tracking-wide mb-4">Legal</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>
                  <a href="/" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-white transition-colors">
                    Cookies
                  </a>
                </li>
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



