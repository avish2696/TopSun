# Product Detail Page — Component Structure & Architecture

## Component Hierarchy

```
ProductDetailPage (Main Container)
│
├─ Main Content Grid (2 columns desktop, 1 mobile)
│  │
│  ├─ ImageGallery Component
│  │  ├─ Main Image Container (with hover zoom)
│  │  │  └─ Zoomed Image Display
│  │  ├─ Thumbnail Strip
│  │  │  └─ Thumbnail Buttons (5 items)
│  │  └─ Zoom Hint Overlay
│  │
│  └─ Info Panel (Right side)
│     │
│     ├─ Brand + Title Section
│     │  ├─ Brand/Category Tag
│     │  ├─ Product Title (H1)
│     │  └─ Color Label
│     │
│     ├─ Price Section
│     │  ├─ Current Price (Large)
│     │  ├─ Original Price (Strikethrough)
│     │  └─ Discount Badge
│     │
│     ├─ Rating Section
│     │  ├─ 5-Star Display
│     │  ├─ Rating Number
│     │  ├─ Review Count
│     │  └─ Link to Reviews (Scroll)
│     │
│     ├─ Size Selector
│     │  ├─ Label + Size Guide Link
│     │  ├─ Size Buttons Grid (6 items)
│     │  └─ Stock Status
│     │
│     ├─ Quantity + CTA Buttons
│     │  ├─ Quantity Selector
│     │  │  ├─ Minus Button
│     │  │  ├─ Quantity Input
│     │  │  └─ Plus Button
│     │  ├─ Add to Cart Button (Primary)
│     │  └─ Add to Wishlist Button (Icon)
│     │
│     └─ Trust Perks Grid (3 columns)
│        ├─ Free Shipping
│        ├─ Easy Returns
│        └─ Genuine Quality
│
├─ ProductDetailsSection (Expandable)
│  │
│  ├─ Description Accordion
│  │  ├─ Toggle Header
│  │  └─ Expandable Content
│  │     ├─ Product Description Text
│  │     ├─ Material Grid (2 cols)
│  │     │  ├─ Material Composition
│  │     │  └─ Fit Information
│  │     ├─ Care Instructions
│  │     └─ Features List (Checkmarks)
│
├─ ReviewsSection
│  │
│  ├─ Header + Write Review Button
│  │
│  ├─ Write Review Form (Collapsible)
│  │  ├─ Rating Selector
│  │  ├─ Title Input
│  │  ├─ Text Area
│  │  └─ Submit/Cancel Buttons
│  │
│  ├─ Rating Summary (2 columns desktop, 1 mobile)
│  │  ├─ Summary Box
│  │  │  ├─ Large Rating Number
│  │  │  ├─ 5-Star Display
│  │  │  └─ Review Count Text
│  │  └─ Rating Breakdown
│  │     ├─ 5-Star Row with Bar
│  │     ├─ 4-Star Row with Bar
│  │     ├─ 3-Star Row with Bar
│  │     ├─ 2-Star Row with Bar
│  │     └─ 1-Star Row with Bar
│  │
│  └─ Individual Reviews List
│     ├─ Review Card 1
│     │  ├─ Author Name + Verified Badge
│     │  ├─ Star Rating
│     │  ├─ Review Date
│     │  ├─ Review Title
│     │  ├─ Review Text
│     │  └─ Helpful Count Button
│     ├─ Review Card 2
│     ├─ Review Card 3
│     └─ ...more reviews
│
└─ YouMayAlsoLikeSection
   │
   ├─ Section Header
   │
   └─ Related Products Container
      ├─ Desktop Grid (5-6 columns)
      │  ├─ ProductCard 1
      │  ├─ ProductCard 2
      │  ├─ ProductCard 3
      │  ├─ ProductCard 4
      │  ├─ ProductCard 5
      │  └─ ProductCard 6
      │
      └─ Mobile Horizontal Scroll
         ├─ ProductCard (scrollable)
         └─ ...more cards
```

---

## Sub-Component Breakdown

### ImageGallery Component

**Props:**
```typescript
interface ImageGalleryProps {
  images: string[];
  mainImage: string;
  onMainImageChange: (image: string) => void;
  hoveredImage: number | null;
  onHoveredImageChange: (index: number | null) => void;
  productName: string;
}
```

**State:**
```typescript
const [scale, setScale] = useState(1);
const [position, setPosition] = useState({ x: 0, y: 0 });
```

**Behavior:**
- Hover over main image → calculate zoom position
- Click thumbnail → update main image
- Hover thumbnail → show border highlight
- Leave image → reset zoom (scale = 1)

### ProductDetailsSection Component

**Props:**
```typescript
interface ProductDetailsSectionProps {
  product: any;
  expandedSection: 'description' | 'reviews' | null;
  onExpandedSectionChange: (section: 'description' | 'reviews' | null) => void;
}
```

**Behavior:**
- Click accordion header → toggle content
- Smooth height animation on expand/collapse
- Only one section can be open at a time

### ReviewsSection Component

**Props:**
```typescript
interface ReviewsSectionProps {
  product: any;
}
```

**Internal State:**
- `writeReviewOpen: boolean` - controls form visibility
- Uses forwardRef for scrolling to section

**Sub-elements:**
- Rating breakdown with animated bars
- Individual review cards with staggered animations
- Review form with validation

### ProductCard Component

**Props:**
```typescript
interface ProductCardProps {
  product: any;
  isWishlisted: boolean;
  onWishlistToggle: () => void;
  index: number;
}
```

**Features:**
- Hover animation on image
- Quick "Add to Bag" button slides up on hover
- Wishlist toggle with filled/hollow state
- Rating and discount display

---

## State Management

### Top-Level Component State

```typescript
// Image gallery
const [mainImage, setMainImage] = useState(product.mainImage);
const [hoveredImage, setHoveredImage] = useState<number | null>(null);

// Size & quantity
const [selectedSize, setSelectedSize] = useState<number | string | null>(null);
const [quantity, setQuantity] = useState(1);

// Wishlist
const [isWishlisted, setIsWishlisted] = useState(false);

// Expandable sections
const [expandedSection, setExpandedSection] = useState<'description' | 'reviews' | null>(null);

// Related products
const [wishlist, setWishlist] = useState<number[]>([]);
```

### Related Products Section State

```typescript
// In YouMayAlsoLikeSection
const [wishlist, setWishlist] = useState<number[]>([]);
const scrollContainerRef = useRef<HTMLDivElement>(null);
```

---

## Event Handlers

```typescript
// Gallery
const handleAddToCart = () => {
  if (!selectedSize) {
    alert('Please select a size');
    return;
  }
  onAddToCart?.(selectedSize, quantity);
};

// Wishlist
const toggleWishlist = () => {
  setIsWishlisted(!isWishlisted);
  onAddToWishlist?.();
};

// Reviews
const scrollToReviews = () => {
  reviewsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
};

// Section expansion
const toggleSection = (section: 'description' | 'reviews') => {
  onExpandedSectionChange(expandedSection === section ? null : section);
};
```

---

## Animation Library Integration

### Framer Motion Usage

```typescript
import { motion, AnimatePresence } from 'motion/react';

// Layout animations
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.1 }}
>

// Hover interactions
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>

// Conditional rendering with exit animation
<AnimatePresence>
  {expandedSection === 'description' && (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: 'auto' }}
      exit={{ height: 0 }}
    >
      {/* Content */}
    </motion.div>
  )}
</AnimatePresence>
```

---

## Styling Approach

### Tailwind CSS Classes Used

**Grid & Layout:**
```
grid-cols-1, lg:grid-cols-2          // Two-column on desktop
grid-cols-4, sm:grid-cols-6          // Size buttons
grid-cols-2, md:grid-cols-3, lg:grid-cols-5  // Related products
flex, flex-col, gap-4 / gap-6 / gap-8        // Flexbox layouts
```

**Colors & Backgrounds:**
```
bg-white                             // Main background
bg-gray-50, bg-gray-100             // Light backgrounds
bg-[#c4510a], bg-[#ff6b35]          // Accent colors
text-[#c4510a]                      // Accent text
border-border, border-[#c4510a]     // Borders
```

**Typography:**
```
text-xs, text-sm, text-base, text-lg, text-3xl, text-4xl
font-semibold, font-bold, font-medium
tracking-wide, tracking-widest, uppercase
```

**Spacing:**
```
px-4, px-6, px-8            // Horizontal padding
py-3, py-4, py-5, py-8      // Vertical padding
gap-2, gap-3, gap-4, gap-6  // Component gaps
mb-4, mt-6, pb-8, pt-4      // Margin/padding utilities
```

**Responsive:**
```
hidden md:block              // Hide on mobile
grid md:grid-cols-2         // 2 cols on desktop
flex-col lg:flex-row        // Stack on mobile, row on desktop
w-full sm:w-auto           // Full width on mobile, auto on desktop
```

---

## Key Data Flows

### Add to Cart Flow

```
User clicks "Add to Cart"
  ↓
Check if size is selected (alert if not)
  ↓
Call onAddToCart(selectedSize, quantity)
  ↓
Parent component handles API call
  ↓
UI updates (cart count, toast notification)
```

### Wishlist Toggle Flow

```
User clicks heart icon
  ↓
Toggle isWishlisted state
  ↓
Update heart appearance (filled/hollow)
  ↓
Call onAddToWishlist()
  ↓
Parent component handles API call
```

### Section Expansion Flow

```
User clicks accordion header
  ↓
Toggle expandedSection state
  ↓
Framer Motion animates height
  ↓
Content fades in/out
```

### Image Gallery Flow

```
User hovers over main image
  ↓
Calculate mouse position
  ↓
Update scale & origin position
  ↓
Zoom image to 1.5x scale

User moves mouse away
  ↓
Reset scale to 1
  ↓
Reset position to center (50%, 50%)

User clicks thumbnail
  ↓
Update mainImage state
  ↓
Image swap with animation
```

---

## Performance Considerations

### Optimization Techniques

1. **Image Lazy Loading**: Thumbnails/related products load on demand
2. **Memoization**: ProductCard uses React.memo to prevent re-renders
3. **Ref-based Scrolling**: Uses useRef for smooth scroll-to-reviews
4. **CSS Transitions**: GPU-accelerated transforms for smooth animations
5. **Conditional Rendering**: AnimatePresence only renders open accordions

### Bundle Size Impact

- ProductDetailPage.tsx: ~15KB (unminified)
- Framer Motion: Already in dependencies (11.14 KB)
- Lucide Icons: Tree-shakeable, only imports used icons

---

## Accessibility Features

### ARIA Labels

```typescript
<button aria-label="Add to wishlist" />
<button aria-label="Increase quantity" />
<button aria-label="Toggle menu" />
```

### Semantic HTML

```
<h1>Product Title</h1>
<h2>Section Title</h2>
<button>Interactive Element</button>
<img alt="Product description" />
```

### Keyboard Navigation

- All buttons are tab-accessible
- Enter/Space to activate buttons
- Tab order follows visual order
- Focus indicators visible on interactive elements

### Color Contrast

- Text meets WCAG AA (4.5:1 minimum)
- Icons have sufficient color contrast
- No information conveyed by color alone

---

## Responsive Breakpoints

```
xs:  0px    (Mobile)
sm:  640px  (Tablet)
md:  768px  (Tablet landscape)
lg:  1024px (Desktop)
xl:  1280px (Wide desktop)
```

---

## Browser Compatibility

- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

**Last Updated:** June 2024 | Version 1.0.0
