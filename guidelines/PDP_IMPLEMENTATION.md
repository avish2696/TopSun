# Product Detail Page (PDP) — Implementation Guide

## Overview

A fully responsive, production-ready Product Detail Page component for the TOPSUN e-commerce shoe store. The page is built with React, TypeScript, Tailwind CSS, and Framer Motion for smooth animations and interactions.

**Location:** `src/app/components/ProductDetailPage.tsx`
**Demo Page:** `src/app/pages/ProductPage.tsx`

---

## Features Included

### 1. **Image Gallery**
- **Main Image with Hover Zoom**: Hover over the main product image to zoom in up to 1.5x scale
- **5 Thumbnail Images**: Below or beside the main image (responsive layout)
- **Click-to-Swap**: Clicking a thumbnail swaps the main image
- **Hover Indication**: Thumbnails show hover state and active border highlighting
- **Touch-Friendly**: Full support for touch/swipe on mobile

### 2. **Product Information Panel** (Right side on desktop, below gallery on mobile)
- **Product Name & Brand**: Large, serif headline with category tag
- **Price Display**:
  - Current price in large, bold text (accent color)
  - Original/strikethrough price
  - Discount badge showing percentage off (e.g., "65% OFF")
- **Star Rating**: 5-star visual rating with count
- **Review Link**: Clickable to scroll down to reviews section
- **Color Label**: Current selected color variant

### 3. **Size Selector**
- **Size Buttons**: Horizontal row of UK size buttons (6–11)
- **Active State**: Selected size highlighted with accent color and white text
- **Out of Stock**: Greyed out, disabled buttons for unavailable sizes
- **Size Guide Link**: Opens/links to size conversion guide
- **Stock Status**: Shows "In Stock" or "Out of Stock" indicator

### 4. **Quantity Selector + CTA Buttons**
- **Quantity Input**: − | Input Field | + controls (min 1)
- **Add to Cart Button**: 
  - Full-width primary CTA
  - Gradient accent color (`#c4510a` to `#ff6b35`)
  - Requires size selection (alerts if not selected)
  - Hover animation and shadow effect
- **Add to Wishlist Button**: 
  - Secondary icon button (Heart icon)
  - Toggles filled/hollow state
  - Smooth hover scaling

### 5. **Shipping & Trust Perks**
- **3-Column Info Section**:
  - Free Shipping info
  - Easy Returns (30-day policy)
  - Genuine Quality / Authenticity badge
- Each with icon, title, and description

### 6. **Product Description Section** (Expandable/Collapsible)
- **Description Text**: Full product narrative
- **Material Composition**: Detailed fabric/component breakdown
- **Fit Information**: Sizing guidance and fit details
- **Care Instructions**: Cleaning and maintenance tips
- **Key Features**: Bullet list of 6–8 main selling points with checkmarks
- **Animation**: Smooth expand/collapse with height transition

### 7. **Reviews Section**
- **Overall Rating Summary**:
  - Large rating number (e.g., "4.9")
  - 5-star visual
  - Review count
- **Rating Breakdown**:
  - Visual bars showing distribution (5★, 4★, 3★, etc.)
  - Percentage for each tier
  - Animated bar fill on scroll
- **Individual Review Cards**:
  - Reviewer name & "Verified Purchase" badge (if applicable)
  - Star rating for each review
  - Review date
  - Review title & text
  - "Helpful" count button
- **Write a Review Button**: Opens collapsible form for user submissions

### 8. **"You May Also Like" Section**
- **Related Products Grid**:
  - Desktop: 5–6 columns
  - Mobile: Horizontal scrollable carousel (snap scrolling)
- **Product Cards** with:
  - Product image
  - Name
  - Star rating + review count
  - Price + original price + discount badge
  - Wishlist heart button (hover reveal)
  - "Add to Bag" quick-add button (hover slide-up)

---

## Design System & Tokens

### Colors
- **Primary Accent**: `#c4510a` (rust/orange)
- **Secondary Accent**: `#ff6b35` (bright orange)
- **Gradient**: `from-[#c4510a] to-[#ff6b35]`
- **Dark**: `#0c0c0c` (near black)
- **Borders**: `border-border` (light gray)
- **Text Muted**: `text-muted-foreground` (medium gray)

### Typography
- **Serif Headings**: `Playfair Display` (h1, h2, product names)
- **Body/UI**: `DM Sans` (default sans-serif)
- **Font Sizes**: Responsive with `clamp()` for fluid scaling

### Spacing
- Desktop padding: `px-8 lg:px-16 xl:px-24`
- Section py: `py-8 md:py-16`, `py-24` for major sections
- Component gap: `gap-4`, `gap-6`, `gap-8`

### Animations (Framer Motion)
- **Page Load**: Staggered fade-in + slide-up (0.5s duration)
- **Hover Effects**: Scale transformations, color transitions
- **Interactive**: Spring physics for buttons and toggles
- **Image Zoom**: Spring animation (stiffness: 300, damping: 30)
- **Collapse/Expand**: Smooth height transition (0.3s)

---

## Component Usage

### Basic Import
```tsx
import ProductDetailPage from '@/app/components/ProductDetailPage';

export default function Page() {
  return (
    <ProductDetailPage 
      product={productData}
      onAddToCart={(size, quantity) => console.log(size, quantity)}
      onAddToWishlist={() => console.log('Wishlisted')}
    />
  );
}
```

### Product Data Structure
```typescript
interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  colorLabel: string;
  mainImage: string;
  images: string[];  // Array of 4-5 images
  category: string;
  description: string;
  material: string;
  fit: string;
  care: string;
  features: string[];  // 6-8 features
  sizes: (number | string)[];  // e.g., [6, 7, 8, 9, 10, 11]
  outOfStockSizes: (number | string)[];
  inStock: boolean;
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `product` | `Product` | Sample product | The product to display |
| `onAddToCart` | `(size, quantity) => void` | Optional | Callback when user adds to cart |
| `onAddToWishlist` | `() => void` | Optional | Callback when user toggles wishlist |
| `relatedProducts` | `Product[]` | Built-in sample | Related products to show in "You May Also Like" |

---

## Responsive Behavior

### Desktop (1024px+)
- Two-column layout: Gallery (left) + Info (right)
- 5-column product grid in "You May Also Like"
- Full navigation visible in header

### Tablet (768px–1023px)
- Two-column layout maintained
- 3-column product grid
- Mobile menu available

### Mobile (< 768px)
- Single column: Gallery stacked above info
- Thumbnails scroll horizontally
- "You May Also Like" horizontal scroll carousel
- Full mobile menu with hamburger toggle
- Tap-friendly size buttons (larger hit targets)

---

## Customization Guide

### Change Accent Colors
Edit the Tailwind classes throughout the component:
```tsx
// Change from #c4510a to your brand color
className="bg-[#c4510a]"  // Replace with your hex
className="text-[#c4510a]"
className="border-[#c4510a]"
```

### Modify Size Range
In the sample product, update the `sizes` array:
```tsx
sizes: [5, 6, 7, 8, 9, 10, 11, 12],  // Add/remove sizes as needed
outOfStockSizes: [5, 11],  // Mark which are out of stock
```

### Add More Product Features
Expand the `features` array in the product data:
```tsx
features: [
  'Feature 1',
  'Feature 2',
  // ... add more
]
```

### Customize Shipping Info
Edit the perks section (line ~340):
```tsx
{
  icon: Truck,
  label: 'Your Custom Label',
  desc: 'Your custom description'
}
```

### Change Related Products Count
In `YouMayAlsoLikeSection()`, modify the grid/scroll slice:
```tsx
{sampleRelatedProducts.slice(0, 4).map(...)}  // Show only 4
```

---

## Performance Tips

1. **Image Optimization**: Use optimized/compressed images for `mainImage` and `images` array
2. **Lazy Loading**: Images load on demand in the "You May Also Like" section
3. **Code Splitting**: Component is modular; can be lazy-loaded with React.lazy()
4. **Animation Optimization**: Framer Motion uses GPU acceleration for smooth 60fps animations

---

## Accessibility Features

- **Semantic HTML**: Proper heading hierarchy (h1, h2, h3)
- **ARIA Labels**: Buttons have `aria-label` attributes
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Color Contrast**: Text meets WCAG AA standards
- **Focus Indicators**: Visible focus states on interactive elements
- **Star Ratings**: Semantic star display with alt text

---

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## Dependencies

- **React 18.3+**
- **Framer Motion 12.23+** (animations)
- **Lucide React 0.487+** (icons)
- **Tailwind CSS 4.1+** (styling)
- **TypeScript 5+** (type safety)

All dependencies are already in your `package.json`.

---

## Testing the Component

### Demo Page
Run the included demo page at `src/app/pages/ProductPage.tsx`:

```bash
# From project root
npm install  # if not already done
npm run dev  # starts dev server

# Navigate to see the ProductPage component demo
```

### Manual Testing Checklist
- [ ] Image gallery zoom works on hover
- [ ] Thumbnails swap main image on click
- [ ] Size selector buttons toggle (active state)
- [ ] Out of stock sizes are disabled
- [ ] Quantity increment/decrement works
- [ ] Add to Cart requires size selection
- [ ] Wishlist heart toggles filled/hollow
- [ ] Description section expands/collapses smoothly
- [ ] Reviews section loads and bar animations work
- [ ] Related products scroll on mobile
- [ ] Page is responsive at 320px, 768px, 1024px, 1440px
- [ ] All links are keyboard accessible (Tab key)

---

## Future Enhancements

- [ ] Real product image carousel with swipe gestures
- [ ] Dynamic variant selector (color, material)
- [ ] Real review submission with form validation
- [ ] Size chart modal with detailed measurements
- [ ] Similar products fetched from database
- [ ] Stock indicators with countdown timers
- [ ] Social sharing buttons
- [ ] Product video/3D model viewer
- [ ] Internationalization (multiple currencies/languages)
- [ ] Analytics integration (view tracking, add-to-cart events)

---

## Support & Issues

For issues or questions:
1. Check the component props are correct
2. Ensure all Tailwind classes are available
3. Verify images are loading (check browser console for 404s)
4. Test in different browsers to isolate issues

---

**Last Updated:** June 2024
**Version:** 1.0.0
