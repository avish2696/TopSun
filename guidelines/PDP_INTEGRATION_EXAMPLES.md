# Product Detail Page — Integration Examples

This guide shows how to integrate the PDP component with real data, routing, and backend services.

---

## Example 1: Basic Integration with React Router

### Setup with React Router v7

```tsx
// src/app/routes/product.tsx
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import Header from '@/app/components/Header';
import ProductDetailPage from '@/app/components/ProductDetailPage';
import { Product } from '@/types/product';

export default function ProductRoute() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchProduct();
  }, [productId]);

  const handleAddToCart = async (size: number | string, quantity: number) => {
    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, size, quantity }),
      });
      
      if (response.ok) {
        setCartCount((prev) => prev + quantity);
        // Show toast notification
        console.log(`✓ Added ${quantity} pairs to cart`);
      }
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  const handleAddToWishlist = async () => {
    try {
      await fetch('/api/wishlist/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      console.log('✓ Added to wishlist');
    } catch (err) {
      console.error('Failed to add to wishlist:', err);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-600">{error}</div>;
  if (!product) return <div className="flex items-center justify-center min-h-screen">Product not found</div>;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Header
        cartCount={cartCount}
        onCartClick={() => console.log('Cart opened')}
        onMobileMenuToggle={() => {}}
        mobileMenuOpen={false}
      />
      <div className="pt-16">
        <ProductDetailPage
          product={product}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
        />
      </div>
    </div>
  );
}
```

### Router Configuration

```tsx
// src/app/routes.tsx
import { createBrowserRouter } from 'react-router-dom';
import ProductRoute from './routes/product';
import App from './App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/product/:productId',
    element: <ProductRoute />,
  },
  // ... other routes
]);
```

---

## Example 2: Using with a State Management Library (Zustand)

### Store Definition

```tsx
// src/store/cartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  productId: number;
  size: number | string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (productId: number, size: number | string, quantity: number) => void;
  removeItem: (productId: number) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (productId, size, quantity) =>
        set((state) => ({
          items: [...state.items, { productId, size, quantity }],
        })),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),
    }),
    { name: 'cart-store' }
  )
);

// Wishlist store
export const useWishlistStore = create<{ items: number[]; toggle: (id: number) => void }>()(
  persist(
    (set) => ({
      items: [],
      toggle: (id) =>
        set((state) => ({
          items: state.items.includes(id)
            ? state.items.filter((item) => item !== id)
            : [...state.items, id],
        })),
    }),
    { name: 'wishlist-store' }
  )
);
```

### Component Usage

```tsx
// src/pages/ProductPage.tsx
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import ProductDetailPage from '@/app/components/ProductDetailPage';
import { useCartStore, useWishlistStore } from '@/store/cartStore';
import { Product } from '@/types/product';

export default function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const addToCart = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.items);
  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const wishlist = useWishlistStore((state) => state.items);

  useEffect(() => {
    // Fetch product
    fetch(`/api/products/${productId}`)
      .then((res) => res.json())
      .then(setProduct);
  }, [productId]);

  if (!product) return null;

  return (
    <ProductDetailPage
      product={product}
      onAddToCart={(size, quantity) => {
        addToCart(product.id, size, quantity);
        // Show toast: "Added to cart!"
      }}
      onAddToWishlist={() => {
        toggleWishlist(product.id);
      }}
    />
  );
}
```

---

## Example 3: Fetching Related Products Dynamically

### Enhanced Component with Related Products

```tsx
// src/pages/ProductPage.tsx
import { useEffect, useState } from 'react';
import ProductDetailPage from '@/app/components/ProductDetailPage';
import { Product } from '@/types/product';

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch main product
      const productRes = await fetch(`/api/products/${productId}`);
      const productData = await productRes.json();
      setProduct(productData);

      // Fetch related products (same category, different variants)
      const relatedRes = await fetch(
        `/api/products/related?category=${productData.category}&exclude=${productData.id}`
      );
      const relatedData = await relatedRes.json();
      setRelatedProducts(relatedData.slice(0, 6));
    };

    fetchData();
  }, [productId]);

  if (!product) return null;

  return (
    <ProductDetailPage
      product={product}
      relatedProducts={relatedProducts}
      onAddToCart={handleAddToCart}
      onAddToWishlist={handleAddToWishlist}
    />
  );
}
```

---

## Example 4: Backend API Integration

### Express.js API Endpoints

```typescript
// backend/routes/products.ts
import express from 'express';

const router = express.Router();

// GET /api/products/:id
router.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const product = await Product.findById(id).populate('reviews');
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Format product data for frontend
    res.json({
      id: product._id,
      name: product.name,
      brand: product.brand,
      price: product.salePrice,
      originalPrice: product.originalPrice,
      rating: product.averageRating,
      reviews: product.reviewCount,
      colorLabel: product.selectedColor,
      mainImage: product.images[0],
      images: product.images,
      category: product.category,
      description: product.description,
      material: product.material,
      fit: product.fitGuide,
      care: product.careInstructions,
      features: product.features,
      sizes: product.availableSizes,
      outOfStockSizes: product.outOfStockSizes,
      inStock: product.stock > 0,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST /api/cart/add
router.post('/cart/add', async (req, res) => {
  const { productId, size, quantity } = req.body;
  const userId = req.user.id; // From auth middleware

  try {
    const cartItem = await Cart.create({
      userId,
      productId,
      size,
      quantity,
    });

    res.json({ success: true, item: cartItem });
  } catch (error) {
    res.status(400).json({ error: 'Failed to add to cart' });
  }
});

// POST /api/wishlist/add
router.post('/wishlist/add', async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    const wishlistItem = await Wishlist.findOneAndUpdate(
      { userId, productId },
      { $set: { userId, productId } },
      { upsert: true, new: true }
    );

    res.json({ success: true, item: wishlistItem });
  } catch (error) {
    res.status(400).json({ error: 'Failed to add to wishlist' });
  }
});

// GET /api/products/related
router.get('/products/related', async (req, res) => {
  const { category, exclude } = req.query;

  try {
    const relatedProducts = await Product.find({
      category,
      _id: { $ne: exclude },
    })
      .limit(6)
      .select('name price salePrice images rating reviews');

    res.json(relatedProducts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch related products' });
  }
});

export default router;
```

---

## Example 5: Handling Product Variants (Colors, Materials)

### Extended Product Type

```tsx
// src/types/product.ts
export interface ProductVariant {
  id: string;
  color: string;
  material: string;
  price: number;
  originalPrice: number;
  images: string[];
  stock: number;
}

export interface Product {
  id: number;
  name: string; // e.g., "Apex"
  brand: string;
  basePrice: number;
  baseOriginalPrice: number;
  rating: number;
  reviews: number;
  category: string;
  description: string;
  material: string;
  fit: string;
  care: string;
  features: string[];
  sizes: (number | string)[];
  // Variants
  variants: ProductVariant[]; // e.g., [{ color: "Desert Sand", ... }, { color: "Cloud Grey", ... }]
  selectedVariant: ProductVariant;
}
```

### Component with Variant Selector

```tsx
import { useState } from 'react';
import ProductDetailPage from '@/app/components/ProductDetailPage';
import { Product, ProductVariant } from '@/types/product';

interface ProductPageProps {
  product: Product;
}

export default function ProductPage({ product: initialProduct }: ProductPageProps) {
  const [selectedVariant, setSelectedVariant] = useState(initialProduct.selectedVariant);
  const [product, setProduct] = useState(initialProduct);

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    // Update product with selected variant data
    setProduct({
      ...product,
      mainImage: variant.images[0],
      images: variant.images,
      colorLabel: variant.color,
      price: variant.price,
      originalPrice: variant.originalPrice,
    });
  };

  return (
    <div>
      {/* Color/Variant Selector */}
      <div className="max-w-[1400px] mx-auto px-8 py-8 flex gap-4 border-b border-border">
        <span className="font-semibold text-sm">Choose a Variant:</span>
        {product.variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => handleVariantChange(variant)}
            className={`px-4 py-2 border-2 transition-all ${
              selectedVariant.id === variant.id
                ? 'border-[#c4510a] bg-[#c4510a] text-white'
                : 'border-border'
            }`}
          >
            {variant.color} — ₹{variant.price}
          </button>
        ))}
      </div>

      {/* PDP Component */}
      <ProductDetailPage product={product} />
    </div>
  );
}
```

---

## Example 6: Analytics Integration

### Tracking Events

```tsx
// src/utils/analytics.ts
export const trackProductView = (productId: number, productName: string) => {
  if (window.gtag) {
    window.gtag('event', 'view_item', {
      items: [
        {
          item_id: productId,
          item_name: productName,
        },
      ],
    });
  }
};

export const trackAddToCart = (productId: number, size: number | string, quantity: number, price: number) => {
  if (window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: 'INR',
      value: price * quantity,
      items: [
        {
          item_id: productId,
          quantity,
          price,
        },
      ],
    });
  }
};

export const trackAddToWishlist = (productId: number) => {
  if (window.gtag) {
    window.gtag('event', 'add_to_wishlist', {
      items: [
        {
          item_id: productId,
        },
      ],
    });
  }
};
```

### Using Analytics in Component

```tsx
import { useEffect } from 'react';
import ProductDetailPage from '@/app/components/ProductDetailPage';
import { trackProductView, trackAddToCart, trackAddToWishlist } from '@/utils/analytics';

export default function ProductPage({ product }) {
  useEffect(() => {
    // Track page view
    trackProductView(product.id, product.name);
  }, [product.id, product.name]);

  return (
    <ProductDetailPage
      product={product}
      onAddToCart={(size, quantity) => {
        trackAddToCart(product.id, size, quantity, product.price);
        // ... rest of logic
      }}
      onAddToWishlist={() => {
        trackAddToWishlist(product.id);
        // ... rest of logic
      }}
    />
  );
}
```

---

## Example 7: Form Validation & Review Submission

### Custom Hook for Review Submission

```tsx
// src/hooks/useReviewSubmission.ts
import { useState } from 'react';

export interface ReviewFormData {
  rating: number;
  title: string;
  text: string;
  authorName?: string;
}

export function useReviewSubmission() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = async (productId: number, formData: ReviewFormData) => {
    if (formData.rating === 0) {
      setError('Please select a rating');
      return false;
    }
    if (!formData.title.trim()) {
      setError('Please enter a review title');
      return false;
    }
    if (!formData.text.trim()) {
      setError('Please enter a review');
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit review');

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit review');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error, success };
}
```

---

## Example 8: Responsive Image Optimization

### Image Optimization Strategy

```tsx
// src/utils/imageOptimization.ts
export function getOptimizedImageUrl(url: string, width: number): string {
  // Using a service like Cloudinary or imgix
  const params = new URLSearchParams({
    w: width.toString(),
    q: '85', // quality
    f: 'auto', // auto format (webp, etc.)
  });

  return `${url}?${params.toString()}`;
}

// In component:
<img 
  src={getOptimizedImageUrl(mainImage, 800)}
  srcSet={`
    ${getOptimizedImageUrl(mainImage, 400)} 400w,
    ${getOptimizedImageUrl(mainImage, 600)} 600w,
    ${getOptimizedImageUrl(mainImage, 800)} 800w
  `}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
  alt={productName}
/>
```

---

## Example 9: SEO Meta Tags

### Next.js Metadata (if using Next.js)

```tsx
// src/app/product/[id]/page.tsx
import { Metadata } from 'next';
import ProductPage from '@/pages/ProductPage';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await fetch(`${process.env.API_URL}/products/${params.id}`).then((res) =>
    res.json()
  );

  return {
    title: `${product.name} | TOPSUN`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.mainImage],
      url: `/product/${product.id}`,
    },
  };
}

export default function Page({ params }: Props) {
  return <ProductPage productId={params.id} />;
}
```

---

## Example 10: Mobile-First Checklist

### Responsive Testing Checklist

```tsx
// src/components/__tests__/ProductDetailPage.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductDetailPage from '@/app/components/ProductDetailPage';

describe('ProductDetailPage - Mobile Responsiveness', () => {
  const mockProduct = { /* ... */ };

  it('should stack layout on mobile (< 768px)', () => {
    // Set viewport to mobile
    window.innerWidth = 375;
    render(<ProductDetailPage product={mockProduct} />);
    
    // Gallery should be above info
    const gallery = screen.getByAltText(mockProduct.name);
    const sizeSelector = screen.getByText('Select Size');
    
    expect(gallery).toBeInTheDocument();
    expect(sizeSelector).toBeInTheDocument();
  });

  it('should allow size selection on mobile', async () => {
    window.innerWidth = 375;
    const user = userEvent.setup();
    render(<ProductDetailPage product={mockProduct} />);
    
    const sizeButton = screen.getByRole('button', { name: /8/i });
    await user.click(sizeButton);
    
    expect(sizeButton).toHaveClass('bg-[#c4510a]');
  });

  it('should display scrollable product carousel on mobile', () => {
    window.innerWidth = 375;
    render(<ProductDetailPage product={mockProduct} relatedProducts={[...]} />);
    
    // Related products should be in a scrollable container
    const carousel = screen.getByRole('region', { hidden: true });
    expect(carousel).toHaveClass('overflow-x-auto');
  });
});
```

---

**These examples provide a complete integration pattern. Adjust based on your specific backend, routing setup, and state management solution.**
