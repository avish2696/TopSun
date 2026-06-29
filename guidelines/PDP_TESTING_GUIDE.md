# Product Detail Page — Testing & QA Guide

## 🧪 Testing Levels

### 1. Unit Testing
### 2. Component Testing  
### 3. Integration Testing
### 4. E2E Testing
### 5. Manual Testing

---

## 📋 Unit Tests

### Test Helper Functions

```typescript
// src/app/utils/__tests__/pdpHelpers.test.ts
import {
  calculateDiscount,
  isOnSale,
  formatINR,
  isValidSize,
  getStockStatusText,
  calculateAverageRating,
  getStarFillPercentage,
  formatRelativeDate,
  validateCartItem,
  generateProductSlug,
} from '../pdpHelpers';

describe('PDP Helper Functions', () => {
  describe('calculateDiscount', () => {
    it('should calculate correct discount percentage', () => {
      expect(calculateDiscount(1000, 500)).toBe(50);
      expect(calculateDiscount(1599, 599)).toBe(63);
      expect(calculateDiscount(100, 100)).toBe(0);
    });

    it('should handle edge cases', () => {
      expect(calculateDiscount(0, 0)).toBe(0);
      expect(calculateDiscount(100, 150)).toBe(0); // Sale price > original
    });
  });

  describe('isOnSale', () => {
    it('should return true when product is discounted', () => {
      expect(isOnSale(1000, 500)).toBe(true);
    });

    it('should return false when no discount', () => {
      expect(isOnSale(1000, 1000)).toBe(false);
      expect(isOnSale(500, 1000)).toBe(false);
    });
  });

  describe('formatINR', () => {
    it('should format currency correctly', () => {
      expect(formatINR(1000)).toBe('₹1,000');
      expect(formatINR(100000)).toBe('₹1,00,000');
      expect(formatINR(599)).toBe('₹599');
    });
  });

  describe('isValidSize', () => {
    const availableSizes = [6, 7, 8, 9, 10, 11];
    const outOfStockSizes = [5, 11];

    it('should validate size correctly', () => {
      expect(isValidSize(8, availableSizes, outOfStockSizes)).toBe(true);
      expect(isValidSize(10, availableSizes, outOfStockSizes)).toBe(true);
    });

    it('should reject out of stock sizes', () => {
      expect(isValidSize(11, availableSizes, outOfStockSizes)).toBe(false);
    });

    it('should reject unavailable sizes', () => {
      expect(isValidSize(5, availableSizes, outOfStockSizes)).toBe(false);
      expect(isValidSize(12, availableSizes, outOfStockSizes)).toBe(false);
    });

    it('should reject null/undefined', () => {
      expect(isValidSize(null, availableSizes, outOfStockSizes)).toBe(false);
    });
  });

  describe('getStockStatusText', () => {
    it('should return correct status messages', () => {
      expect(getStockStatusText(true, 0)).toBe('✓ In Stock');
      expect(getStockStatusText(false, 3)).toBe('✗ Out of Stock');
      expect(getStockStatusText(true, 2)).toBe('✓ In Stock (2 sizes unavailable)');
    });
  });

  describe('calculateAverageRating', () => {
    it('should calculate average rating correctly', () => {
      const reviews = [
        { rating: 5 },
        { rating: 4 },
        { rating: 5 },
        { rating: 4 },
      ];
      expect(calculateAverageRating(reviews)).toBe(4.5);
    });

    it('should handle empty reviews', () => {
      expect(calculateAverageRating([])).toBe(0);
    });

    it('should round to 1 decimal place', () => {
      const reviews = [
        { rating: 5 },
        { rating: 3 },
        { rating: 4 },
      ];
      expect(calculateAverageRating(reviews)).toBe(4);
    });
  });

  describe('validateCartItem', () => {
    it('should validate correct item', () => {
      const result = validateCartItem(1, 8, 2);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should catch missing product ID', () => {
      const result = validateCartItem(undefined, 8, 2);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Product ID is missing');
    });

    it('should catch missing size', () => {
      const result = validateCartItem(1, null, 2);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Size is not selected');
    });

    it('should catch invalid quantity', () => {
      const result = validateCartItem(1, 8, 0);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Quantity must be at least 1');
    });
  });

  describe('generateProductSlug', () => {
    it('should generate valid slugs', () => {
      expect(generateProductSlug('Apex — Desert Sand', 3)).toBe('apex-desert-sand-3');
      expect(generateProductSlug('Flex Run — Mint Blue', 1)).toBe('flex-run-mint-blue-1');
    });

    it('should handle special characters', () => {
      const slug = generateProductSlug('Product (2024) & Edition', 5);
      expect(slug).not.toContain('&');
      expect(slug).not.toContain('(');
      expect(slug).not.toContain(')');
    });
  });
});
```

---

## 🧩 Component Tests

### Test Hook: usePDP

```typescript
// src/app/hooks/__tests__/usePDP.test.ts
import { renderHook, act } from '@testing-library/react';
import { usePDP } from '../usePDP';

describe('usePDP Hook', () => {
  it('should initialize with correct defaults', () => {
    const { result } = renderHook(() => usePDP());
    
    expect(result.current.selectedSize).toBeNull();
    expect(result.current.quantity).toBe(1);
    expect(result.current.isWishlisted).toBe(false);
    expect(result.current.canAddToCart).toBe(false);
  });

  it('should update selected size', () => {
    const { result } = renderHook(() => usePDP());
    
    act(() => {
      result.current.setSelectedSize(8);
    });
    
    expect(result.current.selectedSize).toBe(8);
    expect(result.current.canAddToCart).toBe(true);
  });

  it('should increment/decrement quantity', () => {
    const { result } = renderHook(() => usePDP());
    
    act(() => {
      result.current.incrementQuantity();
    });
    expect(result.current.quantity).toBe(2);
    
    act(() => {
      result.current.decrementQuantity();
    });
    expect(result.current.quantity).toBe(1);
    
    // Should not go below 1
    act(() => {
      result.current.decrementQuantity();
    });
    expect(result.current.quantity).toBe(1);
  });

  it('should toggle wishlist', () => {
    const { result } = renderHook(() => usePDP());
    
    expect(result.current.isWishlisted).toBe(false);
    
    act(() => {
      result.current.toggleWishlist();
    });
    expect(result.current.isWishlisted).toBe(true);
    
    act(() => {
      result.current.toggleWishlist();
    });
    expect(result.current.isWishlisted).toBe(false);
  });

  it('should call onAddToCart callback', () => {
    const mockOnAddToCart = jest.fn();
    const { result } = renderHook(() => usePDP({ onAddToCart: mockOnAddToCart }));
    
    act(() => {
      result.current.setSelectedSize(8);
      result.current.handleAddToCart();
    });
    
    expect(mockOnAddToCart).toHaveBeenCalledWith(8, 1);
  });

  it('should not call onAddToCart without size', () => {
    const mockOnAddToCart = jest.fn();
    const { result } = renderHook(() => usePDP({ onAddToCart: mockOnAddToCart }));
    
    act(() => {
      result.current.handleAddToCart();
    });
    
    expect(mockOnAddToCart).not.toHaveBeenCalled();
  });

  it('should reset all state', () => {
    const { result } = renderHook(() => usePDP());
    
    act(() => {
      result.current.setSelectedSize(8);
      result.current.setQuantity(3);
      result.current.toggleWishlist();
    });
    
    expect(result.current.selectedSize).toBe(8);
    expect(result.current.quantity).toBe(3);
    expect(result.current.isWishlisted).toBe(true);
    
    act(() => {
      result.current.resetSelection();
    });
    
    expect(result.current.selectedSize).toBeNull();
    expect(result.current.quantity).toBe(1);
    expect(result.current.isWishlisted).toBe(false);
  });
});
```

---

## 🧪 Integration Tests

### Test ProductDetailPage Component

```typescript
// src/app/components/__tests__/ProductDetailPage.integration.test.ts
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductDetailPage from '../ProductDetailPage';

const mockProduct = {
  id: 1,
  name: 'Test Product',
  brand: 'TOPSUN',
  price: 599,
  originalPrice: 1599,
  rating: 4.9,
  reviews: 301,
  colorLabel: 'White / Black',
  mainImage: 'test-image.jpg',
  images: ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg'],
  category: 'Training',
  description: 'Test description',
  material: 'Mesh upper',
  fit: 'True to size',
  care: 'Wipe clean',
  features: ['Feature 1', 'Feature 2'],
  sizes: [6, 7, 8, 9, 10, 11],
  outOfStockSizes: [],
  inStock: true,
};

describe('ProductDetailPage Component', () => {
  it('should render product information', () => {
    render(<ProductDetailPage product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('TOPSUN · Training')).toBeInTheDocument();
    expect(screen.getByText('White / Black')).toBeInTheDocument();
  });

  it('should display price correctly', () => {
    render(<ProductDetailPage product={mockProduct} />);
    
    expect(screen.getByText('₹599')).toBeInTheDocument();
    expect(screen.getByText('₹1599')).toBeInTheDocument();
    expect(screen.getByText('63% OFF')).toBeInTheDocument();
  });

  it('should display rating and reviews', () => {
    render(<ProductDetailPage product={mockProduct} />);
    
    expect(screen.getByText('4.9')).toBeInTheDocument();
    expect(screen.getByText('(301 reviews)')).toBeInTheDocument();
  });

  it('should handle size selection', async () => {
    const user = userEvent.setup();
    render(<ProductDetailPage product={mockProduct} />);
    
    const sizeButton = screen.getByRole('button', { name: /8/i });
    await user.click(sizeButton);
    
    // Check if button is highlighted
    expect(sizeButton).toHaveClass('bg-[#c4510a]', 'text-white');
  });

  it('should require size selection for add to cart', async () => {
    const user = userEvent.setup();
    const mockOnAddToCart = jest.fn();
    
    render(
      <ProductDetailPage
        product={mockProduct}
        onAddToCart={mockOnAddToCart}
      />
    );
    
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    await user.click(addToCartButton);
    
    // Should show alert and not call callback
    expect(mockOnAddToCart).not.toHaveBeenCalled();
  });

  it('should add to cart with size and quantity', async () => {
    const user = userEvent.setup();
    const mockOnAddToCart = jest.fn();
    
    render(
      <ProductDetailPage
        product={mockProduct}
        onAddToCart={mockOnAddToCart}
      />
    );
    
    // Select size
    const sizeButton = screen.getByRole('button', { name: /8/i });
    await user.click(sizeButton);
    
    // Increase quantity
    const incrementButton = screen.getByRole('button', { name: /increase quantity/i });
    await user.click(incrementButton);
    
    // Add to cart
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    await user.click(addToCartButton);
    
    expect(mockOnAddToCart).toHaveBeenCalledWith(8, 2);
  });

  it('should toggle wishlist', async () => {
    const user = userEvent.setup();
    const mockOnAddToWishlist = jest.fn();
    
    render(
      <ProductDetailPage
        product={mockProduct}
        onAddToWishlist={mockOnAddToWishlist}
      />
    );
    
    const wishlistButton = screen.getByRole('button', { name: /add to wishlist/i });
    await user.click(wishlistButton);
    
    expect(mockOnAddToWishlist).toHaveBeenCalled();
  });

  it('should expand/collapse description', async () => {
    const user = userEvent.setup();
    render(<ProductDetailPage product={mockProduct} />);
    
    const descriptionHeader = screen.getByRole('button', { name: /description/i });
    await user.click(descriptionHeader);
    
    // Description should be visible
    await waitFor(() => {
      expect(screen.getByText('Test description')).toBeVisible();
    });
    
    // Click to collapse
    await user.click(descriptionHeader);
    
    // Description should be hidden
    await waitFor(() => {
      expect(screen.queryByText('Test description')).not.toBeVisible();
    });
  });

  it('should disable out of stock sizes', () => {
    const productWithOutOfStock = {
      ...mockProduct,
      outOfStockSizes: [6, 11],
    };
    
    render(<ProductDetailPage product={productWithOutOfStock} />);
    
    const size6 = screen.getByRole('button', { name: /^6$/ });
    const size8 = screen.getByRole('button', { name: /^8$/ });
    
    expect(size6).toBeDisabled();
    expect(size8).not.toBeDisabled();
  });

  it('should display stock status', () => {
    render(<ProductDetailPage product={mockProduct} />);
    
    expect(screen.getByText('✓ In Stock')).toBeInTheDocument();
  });
});
```

---

## 🎯 Manual Testing Checklist

### Visual & Layout Tests

- [ ] **Desktop (1440px)**
  - [ ] Gallery is on left, info panel on right
  - [ ] Main image is square aspect ratio
  - [ ] Thumbnails are in a horizontal row below main image
  - [ ] All text is clearly readable
  - [ ] Buttons are properly sized

- [ ] **Tablet (768px)**
  - [ ] Gallery and info panel are in 2-column layout
  - [ ] Spacing is proportional
  - [ ] Text doesn't overflow

- [ ] **Mobile (375px)**
  - [ ] Gallery stacks above info panel (1 column)
  - [ ] Main image fills viewport width
  - [ ] Thumbnails scroll horizontally
  - [ ] Size buttons are tap-friendly (44px+ height)
  - [ ] Related products scroll horizontally

### Interaction Tests

**Image Gallery:**
- [ ] Hover over main image → zooms to 1.5x
- [ ] Zoom follows mouse position (origin moves)
- [ ] Move mouse away → resets zoom
- [ ] Click thumbnail → main image swaps
- [ ] Hover thumbnail → border highlights
- [ ] Mobile: Tap thumbnail → image swaps

**Size Selection:**
- [ ] Click size button → button highlights (accent color + white text)
- [ ] Click selected size again → deselects (or stays selected based on design)
- [ ] Out of stock size → greyed out, not clickable
- [ ] Hover size button → border highlights
- [ ] Touch size button on mobile → activates

**Quantity Controls:**
- [ ] Click + button → quantity increases
- [ ] Click − button → quantity decreases
- [ ] Quantity never goes below 1
- [ ] Type directly into input → updates quantity
- [ ] Invalid input (letters, negative) → rejected or ignored

**Add to Cart:**
- [ ] Without size selected → shows alert "Please select a size"
- [ ] With size selected → calls onAddToCart callback
- [ ] Button hover → scale 1.02x, shadow
- [ ] Button tap → scale 0.98x (feedback)
- [ ] Disabled state → cursor not-allowed

**Wishlist:**
- [ ] Click heart → fills with accent color
- [ ] Click filled heart → hollows out
- [ ] Hover → scale 1.1x
- [ ] Mobile: Tap → toggles state

**Expandable Sections:**
- [ ] Click "Description" header → content slides down
- [ ] Content is visible/readable
- [ ] Click again → content slides up (hidden)
- [ ] Chevron rotates 180° on toggle
- [ ] Smooth animation (not instant)

**Reviews Section:**
- [ ] Click rating number → scrolls to reviews section
- [ ] Rating bars animate on scroll into view
- [ ] Bars fill from 0 to target percentage
- [ ] Each review card displays: name, date, rating, text
- [ ] Verified badge shows for verified purchases
- [ ] "Write a Review" button → form appears
- [ ] Form has rating selector, title input, text area

**Related Products:**
- [ ] Desktop: Shows 5-6 products in grid
- [ ] Mobile: Horizontal scroll carousel
- [ ] Hover product → image scales up
- [ ] Hover product → "Add to Bag" button slides up
- [ ] Click heart on product → wishlist toggles
- [ ] Scroll performance is smooth

### Responsive Tests

- [ ] Test at **320px** (iPhone SE)
- [ ] Test at **375px** (iPhone 12)
- [ ] Test at **414px** (iPhone 12 Pro Max)
- [ ] Test at **768px** (iPad)
- [ ] Test at **1024px** (iPad Pro)
- [ ] Test at **1440px** (Desktop)
- [ ] Test at **1920px** (Large desktop)
- [ ] Resize browser window → layout adapts smoothly
- [ ] No horizontal scrolling on any device

### Performance Tests

- [ ] Page loads in < 3 seconds
- [ ] No layout shift/jank during animations
- [ ] Smooth 60fps animations
- [ ] Images load properly (check DevTools)
- [ ] No console errors or warnings
- [ ] Framer Motion animations are smooth

### Accessibility Tests

- [ ] **Keyboard Navigation**:
  - [ ] Tab through all interactive elements
  - [ ] Tab order is logical
  - [ ] Focus indicator visible on all buttons
  - [ ] Can submit "Add to Cart" with Enter key
  - [ ] Can toggle wishlist with Space key

- [ ] **Screen Reader (NVDA/JAWS)**:
  - [ ] All buttons have accessible labels
  - [ ] Images have alt text
  - [ ] Headings are announced
  - [ ] Form inputs are labeled

- [ ] **Color Contrast**:
  - [ ] Text vs background meets WCAG AA (4.5:1)
  - [ ] Interactive elements are distinguishable
  - [ ] No information conveyed by color alone

- [ ] **Zoom & Text Scaling**:
  - [ ] Page readable at 200% zoom
  - [ ] Text doesn't overflow at larger font sizes

### Browser Compatibility

- [ ] **Chrome/Edge** (latest)
- [ ] **Firefox** (latest)
- [ ] **Safari** (latest)
- [ ] **Chrome Mobile** (latest)
- [ ] **Safari iOS** (latest)

### Data & Edge Cases

- [ ] **Product with no reviews**: Graceful fallback
- [ ] **Product with all sizes out of stock**: Add to cart disabled
- [ ] **Product with no sale price**: Shows full price (no strikethrough)
- [ ] **Very long product name**: Wraps properly, doesn't overflow
- [ ] **Very long description**: Expandable section works
- [ ] **Missing images**: Placeholder/fallback shows
- [ ] **All sizes selected, then unselected**: State updates correctly

### Mobile-Specific Tests

- [ ] Tap targets are 44x44px minimum
- [ ] Zoom/pinch works for main image
- [ ] Scroll performance is smooth
- [ ] No iOS/Android specific bugs
- [ ] Orientation change (portrait ↔ landscape) works
- [ ] Keyboard doesn't hide important content

---

## 🔄 Regression Testing

After any change, verify:

```bash
# Run all tests
npm test

# Run specific test file
npm test ProductDetailPage.test.ts

# Run tests in watch mode during development
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

### Key Areas to Re-test:
1. Size selection & cart flow
2. Image zoom interaction
3. Wishlist toggle
4. Responsive layouts
5. Animation smoothness

---

## 📊 Test Coverage Goals

| Area | Target |
|------|--------|
| Components | 80%+ |
| Utilities | 90%+ |
| Hooks | 85%+ |
| Overall | 85%+ |

---

## 🐛 Bug Report Template

```
Title: [Component] - [Issue]

Environment:
- Browser: Chrome 120 / Safari 17 / Firefox 121
- Device: Desktop / Tablet / Mobile
- Screen Size: 1440px / 768px / 375px

Steps to Reproduce:
1. [Step 1]
2. [Step 2]
3. [Step 3]

Expected Behavior:
[What should happen]

Actual Behavior:
[What actually happens]

Screenshots/Video:
[Attach if possible]

Console Errors:
[Any errors in DevTools]
```

---

## ✅ Sign-Off Checklist

Before deploying to production:

- [ ] All manual tests passed
- [ ] All unit/integration tests passing
- [ ] No console errors/warnings
- [ ] Responsive design tested (3+ breakpoints)
- [ ] Performance acceptable (< 3s load time)
- [ ] Accessibility verified (keyboard, screen reader)
- [ ] Cross-browser tested (Chrome, Firefox, Safari)
- [ ] Mobile tested (iOS and Android)
- [ ] Analytics events firing correctly
- [ ] Error tracking (Sentry) configured
- [ ] Product data loads correctly
- [ ] Cart integration verified
- [ ] Wishlist integration verified
- [ ] SEO meta tags correct

---

**Testing Version:** 1.0.0 | June 2024
