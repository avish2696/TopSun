# Product Detail Page — Design Tokens & Visual Reference

## Color Palette

```
Primary Accent:     #c4510a (Rust Orange)
Secondary Accent:   #ff6b35 (Bright Orange)
Gradient:           linear-gradient(to right, #c4510a, #ff6b35)
Dark Background:    #0c0c0c
White Background:   #ffffff
Border Color:       #e5e7eb (light gray)
Text Primary:       #0c0c0c
Text Secondary:     #666666 (muted foreground)
Success/Stock:      #16a34a (green)
Background Light:   #f5f5f5
```

## Typography Scale

```
Serif Font (Headings):      'Playfair Display', serif
Body Font:                  'DM Sans', sans-serif

H1 (Product Title):         clamp(2rem, 5vw, 3.5rem) | font-bold | line-height: 1.1
H2 (Section Titles):        2rem | font-bold | line-height: 1.2
H3 (Subsection):            1.25rem | font-semibold | line-height: 1.3
Body:                       1rem | font-normal | line-height: 1.6
Small Text:                 0.875rem | font-normal | line-height: 1.5
Tiny/Labels:                0.75rem | font-medium | tracking-wide | uppercase
```

## Spacing System

All spacing uses a consistent 4px base unit (Tailwind default):

```
xs:     4px  (p-1)
sm:     8px  (p-2)
md:     16px (p-4)
lg:     24px (p-6)
xl:     32px (p-8)
2xl:    48px (p-12)
3xl:    64px (p-16)
4xl:    96px (p-24)

Sections:   py-8 (mobile), py-16 (tablet), py-24 (desktop)
Grid Gap:   gap-4 (tight), gap-6 (standard), gap-8 (spacious)
```

## Component Specifications

### Image Gallery

**Main Image Container:**
- Background: `#f5f5f5` (light gray)
- Aspect Ratio: `1:1` (square)
- Hover: Scale 1.5x on mouse move
- Zoom Transition: Spring physics (stiffness: 300, damping: 30)

**Thumbnail Strip:**
- Height: `80px` × `80px` (20 units)
- Border: `2px` solid `#e5e7eb`
- Active Border: `2px` solid `#c4510a`
- Gap: `8px` (2)
- Padding: `8px` (2) on outer container

### Size Selector

**Size Buttons:**
```
Layout:     grid-cols-4 (mobile), grid-cols-6 (tablet+)
Padding:    py-3, text-sm font-medium
Border:     2px solid
Border Color (idle):    #e5e7eb
Border Color (hover):   #c4510a
Border Color (active):  #c4510a

Idle State:        bg-white, text-foreground, border-border
Hover State:       border-[#c4510a]
Active State:      bg-[#c4510a], text-white, border-[#c4510a]
Disabled State:    bg-gray-100, text-muted-foreground, opacity-50, cursor-not-allowed
```

### Price Display

```
Price Font:         'Playfair Display', serif
Price Size:         3rem (mobile), 4rem (desktop)
Price Color:        #c4510a
Original Price:     text-muted-foreground, line-through

Discount Badge:
  Background:       #c4510a
  Text Color:       white
  Padding:          px-2.5 py-1
  Font Size:        xs (12px)
  Font Weight:      bold
  Example:          "65% OFF"
```

### Buttons

**Add to Cart Button:**
```
Background:         linear-gradient(to right, #c4510a, #ff6b35)
Text Color:         white
Padding:            py-3 (12px) full width
Font:               text-sm, font-medium, tracking-widest, uppercase
Hover Shadow:       shadow-lg
Hover Scale:        1.02x
Active Scale:       0.98x
Disabled Opacity:   50%
Icon:               ShoppingBag (16px) before text
```

**Wishlist Button:**
```
Width/Height:       56px (14 units)
Border:             2px solid #e5e7eb
Hover Border:       #c4510a
Background (hover): rgba(196, 81, 10, 0.05)
Icon:               Heart (18px)
Icon Color:         #0c0c0c (or #c4510a when active)
Icon Fill:          yes (active), no (inactive)
Hover Scale:        1.1x
Active Scale:       0.9x
```

**Section Accordion Toggle:**
```
Width:              full (100%)
Padding:            px-6 py-5
Background (hover): #f5f5f5
Chevron Icon:       ChevronDown (20px), rotates 180° when open
Transition:         300ms ease
```

### Star Ratings

```
Icon Size:          small: 10px, medium: 14px, large: 16px
Active Star Color:  #c4510a (filled)
Inactive Color:     #e5e7eb (outline)
Gap Between Stars:  4px (1)
Rating Number:      font-medium, text-sm
Review Count:       text-muted-foreground, text-sm
```

### Rating Breakdown Bars

```
Container Height:   8px (2)
Bar Background:     #e5e7eb
Bar Fill:           linear-gradient(to right, #c4510a, #ff6b35)
Animation:          width grows from 0 to target % on scroll into view
Duration:           600ms
Delay:              staggered by index × 100ms
```

### Review Cards

```
Card Padding:       none (no card container, just border-bottom)
Card Border:        border-b border-border
Author Name:        font-semibold, text-sm
Verified Badge:     bg-green-100, text-green-700, text-xs, px-2 py-0.5, rounded-full
Date:               text-xs, text-muted-foreground
Review Title:       font-semibold, text-sm
Review Text:        text-sm, text-muted-foreground, line-height: 1.6
Helpful Button:     text-xs, text-muted-foreground, hover:text-foreground
```

### Perks Section

```
Layout:             grid-cols-1 (mobile), sm:grid-cols-3 (tablet+)
Gap:                gap-4
Icon Color:         #c4510a
Icon Size:          20px
Label Font:         text-xs, font-semibold, tracking-wide
Description Font:   text-xs, text-muted-foreground
```

### Product Feature List

```
Bullet Style:       ✓ (checkmark)
Bullet Color:       #c4510a, font-bold
Gap to Text:        12px (3)
Text Font:          text-sm, text-muted-foreground
Line Height:        1.6 (relaxed)
Item Spacing:       8px (2) between items
```

## Animation Library (Framer Motion)

### Standard Entrance Animation
```typescript
// Fade in + slide up
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, delay: staggerDelay }}
```

### Image Zoom Hover
```typescript
// Smooth scale on mouse move with spring physics
animate={{ scale }}
transition={{ type: 'spring', stiffness: 300, damping: 30 }}
```

### Button Interactions
```typescript
// Hover scale + tap feedback
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
transition={{ type: 'spring', stiffness: 200 }}
```

### Accordion Open/Close
```typescript
// Height collapse/expand
initial={{ height: 0, opacity: 0 }}
animate={{ height: 'auto', opacity: 1 }}
exit={{ height: 0, opacity: 0 }}
transition={{ duration: 0.3 }}
```

### Staggered List Entrance
```typescript
// Items fade in with increasing delay
initial={{ opacity: 0, x: -20 }}
whileInView={{ opacity: 1, x: 0 }}
transition={{ delay: index * 0.05, duration: 0.3 }}
```

### Progress Bar Fill
```typescript
// Animated bar width from 0 to target on scroll
initial={{ width: 0 }}
whileInView={{ width: `${percentage}%` }}
transition={{ duration: 0.6, delay: staggerDelay }}
```

## Responsive Breakpoints

```
Mobile (xs):    0px     → full single-column layout
Tablet (sm):    640px   → 2-column on gallery, 2 cols products
Tablet (md):    768px   → improved spacing
Desktop (lg):   1024px  → 2-col main layout, 3 cols products
Large (xl):     1280px  → 5-6 cols products, max-width 1400px
```

## Border & Shadow Styles

```
Borders:
  Light Border:       border-2 border-border (#e5e7eb)
  Active Border:      border-2 border-[#c4510a]
  Top Border:         border-t border-border

Shadows:
  Hover Shadow:       shadow-lg (0 10px 15px -3px rgba(0,0,0,0.1))
  Card Shadow:        shadow-md
  Focus Shadow:       outline-none with border highlight

Border Radius:
  Buttons:            rounded-lg (8px)
  Badges:             rounded-full (9999px for pill shape)
  Cards:              no radius (clean edges)
```

## Gradient Definitions

```
Accent Gradient:        linear-gradient(90deg, #c4510a 0%, #ff6b35 100%)
Subtle Gradient:        linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)
Dark Gradient:          linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%)
```

## Code Example: Implementing Custom Colors

If you want to change the accent color throughout the PDP:

```tsx
// 1. Update Tailwind config or create a custom class
// 2. Replace all instances of:
//    from-[#c4510a] to-[#ff6b35] 
//    text-[#c4510a]
//    border-[#c4510a]
//    bg-[#c4510a]

// With your brand colors, e.g., blue:
//    from-blue-600 to-blue-400
//    text-blue-600
//    border-blue-600
//    bg-blue-600
```

---

## Quick Reference: Component States

| Component | State | Visual Change |
|-----------|-------|----------------|
| Size Button | Idle | Border gray, text dark |
| Size Button | Hover | Border accent |
| Size Button | Active | Accent BG, white text |
| Size Button | Disabled | Gray BG, no cursor, opacity 50% |
| Add to Cart | Idle | Gradient background |
| Add to Cart | Hover | Scale 1.02, shadow |
| Add to Cart | Active | Scale 0.98 |
| Wishlist | Unfilled | Hollow heart |
| Wishlist | Filled | Solid heart, accent color |
| Star | Filled | Accent color & fill |
| Star | Empty | Gray outline |
| Accordion | Closed | ChevronDown icon, hidden content |
| Accordion | Open | ChevronDown rotated 180°, visible content |
| Link | Idle | Accent text color |
| Link | Hover | Lighter shade |

---

## Accessibility Tokens

```
Focus Indicators:   2px solid #c4510a outline offset 2px
High Contrast:      All text passes WCAG AA (4.5:1+ ratio)
Font Sizes:         Minimum 12px (labels), 16px (body text)
Touch Targets:      Minimum 44px × 44px for interactive elements
Motion:             Respects prefers-reduced-motion (can be added)
```

---

**Version:** 1.0.0 | **Last Updated:** June 2024
