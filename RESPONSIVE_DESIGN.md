# Responsive Design Refactor - Zen Garden

## Summary of Changes

All components have been refactored for mobile-first responsive design with proper breakpoints.

---

## 1. **MainLayout.jsx** - Responsive Layout

### Desktop (md and up)
- ✅ Vertical typography on left side: "禅庭園" + "ZEN GARDEN"
- ✅ Vertical typography on right side: "墨絵"
- ✅ Hanko stamp (16x16) at top-right corner
- ✅ Corner accent lines on all corners
- ✅ Top and bottom gold border lines

### Mobile
- ✅ Removed desktop vertical typography (hidden with `md:hidden`)
- ✅ Added sticky mobile header with horizontal "墨庭" title
- ✅ Shrunk Hanko stamp to 10x10 (mobile size)
- ✅ Removed corner accents on mobile
- ✅ Removed top/bottom border lines on mobile

### Tailwind Classes Used
```
hidden md:fixed md:left-4 md:top-1/2  // Desktop only, hidden on mobile
md:hidden sticky top-0                 // Mobile header, hidden on desktop
w-16 h-16 (md:hidden) → w-10 h-10     // Hanko responsive sizing
```

---

## 2. **WashiDock.jsx** - Floating Action Dock (Responsive)

### Desktop
- ✅ Centered at bottom with `max-w-md` (fixed width: 384px)
- ✅ Padding: `py-4 px-6` (larger touch targets)
- ✅ Shows full button labels: "保存", "出力", "設定", "消去"
- ✅ Regular icon size: 20px

### Mobile
- ✅ Full-width with `w-full` and `px-4` margins
- ✅ Padding: `py-3 px-4` (compact)
- ✅ Hidden button labels on mobile (text-xs with responsive display)
- ✅ Smaller icon size: 20px (same, but labels hidden)
- ✅ Still maintains `pb-4 md:pb-6` for proper spacing

### Key Features
- Floating design with rounded-full
- Gold border and washi paper background (#f2f0e9)
- Backdrop blur for depth
- Responsive gap spacing: `gap-4` → `md:gap-4`
- Divider line between settings and clear buttons

---

## 3. **ZenCanvas.jsx** - Responsive Canvas & Controls

### Canvas Container
```
w-full max-w-4xl           // Full width on mobile, max 64rem on desktop
md:gap-8                   // Larger gaps on desktop
p-4 md:p-8                 // Responsive padding
pb-32 md:pb-24             // Dock spacing adjustment
```

### Color Palette
```
gap-3 md:gap-4             // Responsive button spacing
w-8 md:w-10 h-8 md:h-10    // Responsive color button size
flex-wrap justify-center    // Wraps on smaller screens
```

### Brush Size Slider
```
w-full max-w-xs md:w-64    // Full width on mobile, fixed on desktop
px-4 md:px-0               // Responsive padding
```

### Settings Panel
```
w-full max-w-xs md:w-64    // Full width mobile, fixed width desktop
p-4 md:p-6                 // Responsive padding
mx-4 md:mx-0               // Responsive margin
```

---

## 4. **useDraw.js** - Responsive Canvas Sizing

### Dynamic Canvas Sizing
```javascript
const setup = (p5, canvasParentRef) => {
  const container = canvasParentRef;
  const width = container.offsetWidth;           // 100% of parent
  const height = Math.min(
    container.offsetWidth * 0.75,                // 75% aspect ratio
    window.innerHeight * 0.7                     // Max 70% viewport height
  );
  // Creates responsive canvas that fills container
};
```

### Window Resize Handling
```javascript
const windowResized = (p5) => {
  // Recalculates canvas dimensions on orientation change
  // Redraws all paths at new dimensions
  // Regenerates paper grain for new canvas size
  // Only resizes if dimensions actually changed
};
```

### In ZenCanvas Component
```jsx
<Sketch
  setup={setup}
  draw={draw}
  windowResized={windowResized}    // ← NEW: Handles resize events
  mousePressed={mousePressed}
  mouseDragged={mouseDragged}
  mouseReleased={mouseReleased}
/>
```

---

## 5. **Gallery.jsx** - Responsive Grid & Header

### Gallery Header
```
py-8 md:py-12              // Responsive padding
px-4 md:px-6               // Responsive padding
flex-col md:flex-row       // Stack on mobile, row on desktop
gap-4                      // Spacing between elements
```

### Gallery Grid
```
flex flex-wrap justify-center gap-6 md:gap-8 py-12 px-4
```

### Back Button
```
text-sm md:text-base       // Responsive text size
py-2 md:py-3 px-4 md:px-6  // Responsive padding
<ArrowLeft size={16} className="md:w-5 md:h-5" />  // Responsive icon

// Mobile: Shows "戻る" (go back)
// Desktop: Shows "Back to Canvas" with full English text
```

---

## 6. **Responsive Breakpoints Used**

| Breakpoint | Tailwind Class | Width | Usage |
|-----------|--------|-------|-------|
| Mobile | *default* | < 768px | Phone/tablet portrait |
| Tablet | sm: | ≥ 640px | Large phones |
| Desktop | md: | ≥ 768px | Tablets/laptops |
| Large | lg: | ≥ 1024px | Large screens |

---

## 7. **p5.js Canvas Behavior**

### Mobile Portrait (< 640px)
- Canvas width = 100% of container
- Canvas height = 75% of width (or 70% viewport height, whichever is smaller)
- Dock at bottom with `w-[90%]` centering
- Touch-friendly spacing

### Tablet/Desktop (≥ 768px)
- Canvas width = 100%, max-width = 64rem (1024px)
- Canvas height = 75% of width
- Dock at bottom-center with `max-w-md`
- Full labels visible on buttons

### Orientation Change
- `windowResized()` triggers automatically
- Canvas redraws all paths at new dimensions
- Paper grain regenerated for new size
- Maintains drawing integrity during rotation

---

## 8. **Touch & Click Targets**

### Mobile Optimization
- Buttons: Min 44px x 44px (standard touch target)
- Icon-only buttons: 40px (compact)
- Sliders: Full width for easy dragging
- Colors: 32x32px buttons (mobile) vs 40x40px (desktop)

### Desktop Optimization
- Full button labels visible
- Larger click areas
- Better keyboard navigation support

---

## Testing Checklist

- [ ] Mobile portrait (360px, 414px widths)
- [ ] Tablet portrait/landscape (768px, 1024px)
- [ ] Desktop (1440px and up)
- [ ] Orientation changes (portrait ↔ landscape)
- [ ] Canvas resizes correctly
- [ ] Dock positioning stays fixed at bottom
- [ ] All controls remain accessible
- [ ] Text doesn't overflow
- [ ] Touch targets are adequate size

---

## Key Responsive Classes

```
// Display toggles
hidden md:block          // Hidden on mobile, visible on desktop
md:hidden                // Hidden on desktop, visible on mobile

// Sizing
w-8 md:w-10             // 32px → 40px
h-8 md:h-10             // 32px → 40px
text-sm md:text-base    // Responsive text size

// Spacing
p-4 md:p-8              // Responsive padding
gap-3 md:gap-4          // Responsive gap

// Layout
flex-col md:flex-row    // Stack on mobile, row on desktop
w-full md:w-64          // Full width mobile, fixed width desktop
```
