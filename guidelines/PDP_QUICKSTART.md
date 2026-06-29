# Product Detail Page — Quick Start Guide

## What You Got

A complete, production-ready Product Detail Page (PDP) component for the TOPSUN e-commerce shoe store, featuring:

- ✅ Image gallery with hover-zoom
- ✅ Size selector with stock management
- ✅ Quantity controls + Add to Cart/Wishlist
- ✅ Expandable product details section
- ✅ Full reviews section with ratings breakdown
- ✅ "You May Also Like" carousel
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Smooth animations with Framer Motion
- ✅ Brand-consistent design (matches your existing site)

---

## 📁 Files Created

```
src/app/components/
├── ProductDetailPage.tsx          ← Main PDP component

src/app/pages/
├── ProductPage.tsx                ← Demo/integration page

guidelines/
├── PDP_IMPLEMENTATION.md          ← Full documentation
├── PDP_DESIGN_TOKENS.md           ← Design system reference
├── PDP_INTEGRATION_EXAMPLES.md    ← Real-world examples
└── PDP_QUICKSTART.md              ← This file
```

---

## 🚀 Quick Start

### 1. Import the Component

```tsx
import ProductDetailPage from '@/app/components/ProductDetailPage';
```

### 2. Prepare Your Product Data

```tsx
const product = {
  id: 1,
  name: 'Apex — Desert Sand',
  brand: 'TOPSUN',
  price: 599,
  originalPrice: 1599,
  rating: 4.9,
  reviews: 301,
  colorLabel: 'White / Desert Sand',
  mainImage: 'image-url.jpg',
  images: ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg'],
  category: 'Training',
  description: 'Product description...',
  material: 'Engineered Mesh Upper | EVA Midsole | Rubber Outsole',
  fit: 'True to size...',
  care: 'Wipe clean...',
  features: [
    'Feature 1',
    'Feature 2',
    // ... up to 8 features
  ],
  sizes: [6, 7, 8, 9, 10, 11],
  outOfStockSizes: [],
  inStock: true,
};
```

### 3. Use the Component

```tsx
import { useState } from 'react';
import ProductDetailPage from '@/app/components/ProductDetailPage';

export default function MyProductPage() {
  const handleAddToCart = (size, quantity) => {
    console.log(`Add ${quantity} × size ${size} to cart`);
    // Send to backend
  };

  const handleAddToWishlist = () => {
    console.log('Added to wishlist');
    // Update wishlist
  };

  return (
    <ProductDetailPage
      product={product}
      onAddToCart={handleAddToCart}
      onAddToWishlist={handleAddToWishlist}
    />
  );
}
```

---

## 🎨 Customization

### Change Brand Colors

Find and replace in `ProductDetailPage.tsx`:
- `#c4510a` → your primary accent color
- `#ff6b35` → your secondary accent color

### Add/Remove Features

Edit the product data's `features` array:
```tsx
features: [
  'Your feature 1',
  'Your feature 2',
  // Add up to 8 features
]
```

### Modify Size Range

```tsx
sizes: [5, 6, 7, 8, 9, 10, 11, 12],  // Your size range
outOfStockSizes: [5, 11],             // Out of stock sizes
```

### Change Related Products

In `YouMayAlsoLikeSection()`, update `sampleRelatedProducts` array or fetch from API.

---

## 📱 Responsive Behavior

| Screen | Layout | Behavior |
|--------|--------|----------|
| Mobile (< 768px) | Single column | Gallery above info; horizontal scroll related products |
| Tablet (768–1024px) | Two column | Gallery left, info right |
| Desktop (> 1024px) | Two column | Full width gallery left, sticky info panel right |

---

## 🔗 Integration Paths

### With React Router
See `PDP_INTEGRATION_EXAMPLES.md` → Example 1

### With State Management (Zustand)
See `PDP_INTEGRATION_EXAMPLES.md` → Example 2

### With Backend API
See `PDP_INTEGRATION_EXAMPLES.md` → Example 4

### With Analytics
See `PDP_INTEGRATION_EXAMPLES.md` → Example 6

---

## 🎯 Key Features Explained

### Image Gallery
- **Hover Effect**: Move mouse over main image to zoom (1.5x)
- **Thumbnails**: Click any thumbnail to swap main image
- **Touch**: Tap thumbnails on mobile (no gestures needed)

### Size Selection
- **Click to Select**: Highlight your size
- **Stock Aware**: Out-of-stock sizes are greyed out
- **Size Guide**: Helpful link for conversion reference

### Product Details
- **Expandable**: Click "Description" to reveal/hide details
- **Smooth Animation**: 300ms ease transition
- **Organized**: Material, fit, care, and features sections

### Reviews
- **Rating Summary**: Average star + percentage breakdown
- **Individual Reviews**: Reviewer name, verified badge, date, helpful count
- **Write Review**: Form opens on click (you can customize backend)

### Related Products
- **Desktop**: 5-column grid
- **Mobile**: Horizontal scrollable carousel (snap scroll)
- **Quick Add**: Hover to reveal "Add to Bag" button

---

## 🧪 Testing

### Browser Test
```bash
npm run dev
# Navigate to the demo ProductPage to see it in action
```

### Manual Checklist
- [ ] Zoom image on hover (desktop)
- [ ] Thumbnail click swaps image
- [ ] Size button selection works
- [ ] Out-of-stock sizes are disabled
- [ ] Add to Cart requires size selection
- [ ] Quantity +/− buttons work
- [ ] Wishlist heart toggles
- [ ] Description expands/collapses
- [ ] Reviews scroll is visible
- [ ] Related products scroll on mobile
- [ ] All animations are smooth

---

## 🔧 Required Dependencies

All already in your `package.json`:
- React 18.3+
- Framer Motion 12.23+
- Lucide React 0.487+
- Tailwind CSS 4.1+
- TypeScript 5+

---

## 📊 Component Props

```typescript
interface ProductDetailPageProps {
  product: Product;                                    // ✓ Required
  onAddToCart?: (size: number | string, quantity: number) => void;
  onAddToWishlist?: () => void;
  relatedProducts?: Product[];
}
```

---

## 🎬 Animation Details

| Element | Animation | Trigger |
|---------|-----------|---------|
| Page Load | Fade in + slide up | On mount |
| Image Zoom | Scale on cursor movement | Mouse hover |
| Size Buttons | Scale + highlight | Click/hover |
| Add to Cart | Scale + shadow | Hover/tap |
| Description | Height collapse/expand | Click toggle |
| Review Bars | Width fill | Scroll into view |
| Related Products | Fade in + slide | Scroll into view |

All animations use Framer Motion with optimized performance for smooth 60fps.

---

## 🚨 Troubleshooting

### Images Not Showing?
- Check image URLs are correct
- Verify CORS headers if using external URLs
- Use `ImageWithFallback` component (already imported)

### Styles Not Applied?
- Ensure Tailwind CSS is running (`npm run dev`)
- Check color values match your design tokens
- Verify border/spacing Tailwind classes exist

### Animations Stuttering?
- Close DevTools (impacts performance)
- Reduce other animations on the page
- Check CPU/GPU in browser performance tool

### Responsive Issues?
- Test with actual device or DevTools
- Check viewport meta tag in HTML
- Verify Tailwind breakpoints: sm, md, lg, xl

---

## 📖 Full Documentation

For detailed information:
- **Implementation Details** → `PDP_IMPLEMENTATION.md`
- **Design Tokens & Colors** → `PDP_DESIGN_TOKENS.md`
- **Integration Examples** → `PDP_INTEGRATION_EXAMPLES.md`

---

## 💡 Pro Tips

1. **Load Real Images**: Replace image URLs with your actual product photos
2. **Connect Backend**: Wire up `onAddToCart` and `onAddToWishlist` to your API
3. **Fetch Related Products**: Dynamically load related products from database
4. **Optimize Images**: Use compressed, WebP format for faster loading
5. **Add Analytics**: Track user interactions (zoom, add to cart, wishlist)
6. **Test Mobile**: Always test on real devices, not just DevTools

---

## 🎓 Next Steps

1. **Replace sample data** with real product information from your database
2. **Connect to cart system** via the `onAddToCart` callback
3. **Integrate wishlist** via the `onAddToWishlist` callback
4. **Add related products** by fetching from your API
5. **Customize colors** to match your brand (if different from current theme)
6. **Deploy and monitor** user interactions and conversion metrics

---

## 📞 Support

- Check `PDP_IMPLEMENTATION.md` for detailed explanations
- Review `PDP_INTEGRATION_EXAMPLES.md` for real-world patterns
- Test the demo `ProductPage.tsx` to see component in action

---

**Built with ❤️ for TOPSUN e-commerce**

Version 1.0.0 | June 2024
