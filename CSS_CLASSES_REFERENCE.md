# 🎨 Qodha Maps - CSS Classes & Utilities Reference

## Quick Navigation
- [Color Classes](#color-classes)
- [Spacing Classes](#spacing-classes)
- [Typography Classes](#typography-classes)
- [Component Classes](#component-classes)
- [State Classes](#state-classes)
- [Responsive Classes](#responsive-classes)
- [Animation Classes](#animation-classes)

---

## Color Classes

### Primary Colors (Emerald - Brand)
```html
<!-- Text Colors -->
<span class="text-emerald-600">Primary text</span>
<span class="text-emerald-700">Darker text</span>
<span class="text-emerald-500">Medium text</span>

<!-- Background Colors -->
<div class="bg-emerald-50">Light background</div>
<div class="bg-emerald-100">Lighter background</div>
<div class="bg-emerald-600">Dark background</div>

<!-- Border Colors -->
<div class="border border-emerald-200">Light border</div>
<div class="border border-emerald-500">Medium border</div>
```

### Secondary Colors (Sky Blue - Info)
```html
<span class="text-blue-600">Info text</span>
<div class="bg-blue-50">Light blue background</div>
<button class="bg-blue-500 hover:bg-blue-600">Blue button</button>
```

### Status Colors
```html
<!-- Active/Success -->
<span class="text-green-600 bg-green-50 badge-active">Buka</span>

<!-- Closed/Inactive -->
<span class="text-red-600 bg-red-50 badge-closed">Tutup</span>

<!-- Neutral/Info -->
<span class="text-gray-600 bg-gray-100">Info</span>
```

### Gray Scale
```html
<!-- Backgrounds -->
<div class="bg-gray-50">Lightest (Off-white)</div>
<div class="bg-gray-100">Light gray</div>
<div class="bg-gray-200">Medium light</div>

<!-- Text -->
<span class="text-gray-500">Medium gray text</span>
<span class="text-gray-700">Dark text</span>
<span class="text-gray-800">Darker text</span>
<span class="text-gray-900">Darkest text</span>

<!-- Borders -->
<div class="border border-gray-200">Light border</div>
<div class="border border-gray-300">Medium border</div>
```

---

## Spacing Classes

### Padding
```html
<!-- p-X applies padding to all sides -->
<div class="p-2">8px padding</div>
<div class="p-3">12px padding</div>
<div class="p-4">16px padding</div>
<div class="p-6">24px padding</div>

<!-- Directional padding -->
<div class="px-4 py-2">Horizontal 16px, Vertical 8px</div>
<div class="pt-4">Padding top only</div>
<div class="pb-3">Padding bottom only</div>
```

### Margin
```html
<!-- m-X applies margin to all sides -->
<div class="m-4">16px margin</div>

<!-- Directional margin -->
<div class="mb-3">Margin bottom 12px</div>
<div class="mt-2">Margin top 8px</div>
<div class="mx-auto">Center horizontally</div>
```

### Gap (For Flex/Grid)
```html
<!-- Space between flex items -->
<div class="flex gap-2">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Space between grid items -->
<div class="grid gap-4 grid-cols-3">
  <div>Item</div>
</div>
```

---

## Typography Classes

### Font Family
```html
<!-- Inter (Body text) - Default -->
<p>Normal paragraph</p>

<!-- Plus Jakarta Sans (Headlines) -->
<h1 class="font-bold">Big heading</h1>
<h2 class="font-bold text-lg">Medium heading</h2>
```

### Font Size & Weight
```html
<!-- Size -->
<span class="text-xs">10px - Extra small</span>
<span class="text-sm">14px - Small</span>
<span class="text-base">16px - Base</span>
<span class="text-lg">18px - Large</span>
<span class="text-xl">20px - Extra large</span>

<!-- Weight -->
<span class="font-normal">400 - Regular</span>
<span class="font-semibold">600 - Semibold</span>
<span class="font-bold">700 - Bold</span>
<span class="font-extrabold">800 - Extra bold</span>
```

### Line Height & Letter Spacing
```html
<!-- Line height -->
<p class="leading-tight">Tight line height</p>
<p class="leading-relaxed">Relaxed line height</p>

<!-- Letter spacing -->
<p class="tracking-wide">Wide letter spacing</p>
<p class="tracking-widest">Extra wide letter spacing</p>
```

### Text Alignment
```html
<p class="text-left">Left aligned</p>
<p class="text-center">Center aligned</p>
<p class="text-right">Right aligned</p>
```

### Text Transform
```html
<p class="uppercase">ALL CAPS</p>
<p class="lowercase">all lowercase</p>
<p class="capitalize">Capitalize First Letter</p>
```

---

## Component Classes

### Buttons
```html
<!-- Primary Button -->
<button class="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 
               text-white rounded-lg font-semibold text-sm 
               transition-all active:scale-95">
  Button Text
</button>

<!-- Secondary Button -->
<button class="px-3 py-2.5 bg-emerald-50 text-emerald-700 
               border border-emerald-100 rounded-lg font-semibold">
  Secondary Button
</button>

<!-- Icon Button -->
<button class="p-3 rounded-lg bg-white border hover:bg-gray-50">
  <i class="fa-solid fa-bars"></i>
</button>
```

### Cards
```html
<!-- Basic Card -->
<div class="bg-white border border-gray-200 rounded-xl p-4 card-hover">
  <h3 class="font-bold text-gray-800">Card Title</h3>
  <p class="text-sm text-gray-500 mt-1">Card description</p>
</div>

<!-- Card with Icon -->
<div class="group bg-white border border-gray-200 rounded-xl p-4">
  <div class="w-12 h-12 bg-emerald-100 text-emerald-600 
              rounded-lg flex items-center justify-center">
    <i class="fa-solid fa-store"></i>
  </div>
  <h4 class="font-semibold text-gray-800 mt-2">Title</h4>
</div>

<!-- Stat Card -->
<div class="stat-card">
  <div class="stat-value">42</div>
  <div class="stat-label">Statistic Label</div>
</div>
```

### Badges
```html
<!-- Active Status -->
<span class="text-[11px] font-semibold badge-active px-2 py-1 rounded-md 
             flex items-center gap-1">
  <i class="fa-solid fa-circle text-[4px]"></i>
  Buka
</span>

<!-- Closed Status -->
<span class="text-[11px] font-semibold badge-closed px-2 py-1 rounded-md">
  Tutup
</span>

<!-- Generic Badge -->
<span class="text-[10px] bg-gray-100 text-gray-600 px-2.5 py-1 
             rounded-md font-semibold border border-gray-200">
  Label
</span>
```

### Inputs
```html
<!-- Search Input -->
<div class="relative group">
  <input type="text" 
         class="w-full pl-11 pr-4 py-3 bg-gray-50 
                border border-gray-200 rounded-lg text-sm 
                focus:outline-none focus:ring-2 focus:ring-emerald-500">
  <i class="fa-solid fa-magnifying-glass 
            absolute left-4 top-3.5 text-gray-400"></i>
</div>
```

---

## State Classes

### Hover States
```html
<div class="hover:bg-gray-50">Hover me</div>
<div class="hover:shadow-lg">Hover for shadow</div>
<div class="hover:border-emerald-200">Hover border change</div>
<div class="group-hover:text-emerald-700">Changes on parent hover</div>
```

### Focus States
```html
<input class="focus:outline-none focus:ring-2 focus:ring-emerald-500">
<button class="focus:outline-none focus:ring-4 focus:ring-emerald-300">
  Focused Button
</button>
```

### Active/Pressed States
```html
<button class="active:scale-95">Click me</button>
<button class="active:opacity-75">Click me</button>
```

### Disabled States
```html
<button disabled class="opacity-50 cursor-not-allowed">
  Disabled Button
</button>
```

### Custom Active States
```html
<!-- For filter tabs, sidebar items -->
<div class="ring-2 ring-emerald-400 bg-emerald-50">
  Active state
</div>
```

---

## Responsive Classes

### Breakpoints
```
Default:      < 768px (Mobile)
md:           ≥ 768px (Tablet/Desktop)
lg:           ≥ 1024px (Large Desktop)
```

### Examples
```html
<!-- Hide on mobile, show on desktop -->
<nav class="hidden md:block">Desktop Navigation</nav>

<!-- Show on mobile, hide on desktop -->
<button class="md:hidden">Mobile Menu</button>

<!-- Different padding on mobile/desktop -->
<div class="p-4 md:p-6">Responsive padding</div>

<!-- Different grid columns -->
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  <div>Item</div>
</div>

<!-- Toggle sidebar width -->
<aside class="w-full md:w-[420px]">Sidebar</aside>

<!-- Different display on mobile/desktop -->
<div class="absolute md:relative">Responsive position</div>
```

---

## Animation Classes

### Built-in Animations
```html
<!-- Loading spinner -->
<div class="loader"></div>

<!-- Pulse effect -->
<div class="bg-gray-200 h-4 rounded animate-pulse"></div>

<!-- Bounce effect -->
<div class="animate-bounce">Bouncing element</div>

<!-- Spin effect -->
<div class="animate-spin">
  <i class="fa-solid fa-spinner"></i>
</div>
```

### Custom Animations
```css
/* In your CSS */
.card-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

/* Usage */
<div class="card-hover">Hover for animation</div>
```

### Transform Animations
```html
<!-- Scale -->
<div class="hover:scale-110 transition-transform">Hover to scale</div>

<!-- Translate -->
<div class="hover:-translate-y-1 transition-transform">Hover to move up</div>

<!-- Rotate -->
<div class="hover:rotate-45 transition-transform">Hover to rotate</div>

<!-- Opacity -->
<div class="hover:opacity-75 transition-opacity">Hover to fade</div>
```

---

## Advanced Classes

### Flexbox
```html
<!-- Flex container -->
<div class="flex gap-2">
  <!-- Items stack horizontally -->
</div>

<!-- Align items -->
<div class="flex items-center gap-2">
  <i class="fa-solid fa-map"></i>
  <span>Centered vertically</span>
</div>

<!-- Justify content -->
<div class="flex justify-between">
  <span>Left</span>
  <span>Right</span>
</div>

<!-- Column direction -->
<div class="flex flex-col gap-3">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Grid
```html
<!-- 3-column grid -->
<div class="grid grid-cols-3 gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>

<!-- Responsive columns -->
<div class="grid grid-cols-2 md:grid-cols-3 gap-3">
  <div>Item</div>
</div>
```

### Position
```html
<!-- Absolute positioning -->
<div class="absolute top-4 right-4">
  Top-right corner
</div>

<!-- Sticky positioning -->
<div class="sticky top-0 bg-white">
  Stays at top when scrolling
</div>

<!-- Fixed positioning -->
<div class="fixed bottom-0 left-0 right-0">
  Fixed bottom bar
</div>
```

### Shadows
```html
<div class="shadow-sm">Small shadow</div>
<div class="shadow-md">Medium shadow</div>
<div class="shadow-lg">Large shadow</div>
<div class="shadow-2xl">Extra large shadow</div>
```

### Borders & Radius
```html
<!-- Border -->
<div class="border border-gray-200">Default border</div>
<div class="border-2 border-emerald-500">Thicker border</div>

<!-- Border radius -->
<div class="rounded-lg">8px radius</div>
<div class="rounded-xl">12px radius</div>
<div class="rounded-2xl">16px radius</div>
<div class="rounded-full">Circle</div>
```

### Width & Height
```html
<!-- Fixed sizes -->
<div class="w-10 h-10">40x40px square</div>
<div class="w-12 h-12">48x48px square</div>

<!-- Responsive sizes -->
<aside class="w-full md:w-[420px]">
  Full width on mobile, 420px on desktop
</aside>

<!-- Min/Max sizes -->
<div class="max-w-md">Max width 448px</div>
<div class="min-h-40">Min height 160px</div>
```

---

## Pro Tips

### 1. **Combine Classes for Efficiency**
```html
<!-- Instead of multiple elements -->
<div class="flex items-center justify-between p-4 bg-white 
            rounded-xl border border-gray-200 shadow-md">
  <!-- All styling in one line -->
</div>
```

### 2. **Use CSS Variables for Custom Colors**
```css
:root {
  --color-primary: #10b981;
}

/* Then use in Tailwind -->
/* For custom properties not in Tailwind -->
```

### 3. **Create Utility Classes for Reuse**
```css
/* In your <style> tag */
.card-default {
  @apply bg-white border border-gray-200 rounded-xl p-4;
}

/* Usage */
<div class="card-default">Content</div>
```

### 4. **Responsive Mobile-First**
```html
<!-- Default is mobile, override for desktop -->
<div class="w-full md:w-[420px]">
  <!-- Full width on mobile, 420px on desktop -->
</div>
```

### 5. **Use Group Hover for Parent Effects**
```html
<div class="group hover:bg-gray-50">
  <h3 class="group-hover:text-emerald-700">
    Changes color when parent hovered
  </h3>
</div>
```

---

## 🎨 Color Swatches

### Emerald (Primary)
```
#d1fae5 ████ Emerald-100 (Light)
#a7f3d0 ████ Emerald-200 (Lighter)
#6ee7b7 ████ Emerald-300 (Medium Light)
#10b981 ████ Emerald-600 (Brand Primary)
#059669 ████ Emerald-700 (Dark)
```

### Sky Blue (Secondary)
```
#e0f2fe ████ Sky-100 (Light)
#0ea5e9 ████ Sky-500 (Main)
#0284c7 ████ Sky-700 (Dark)
```

### Status
```
#10b981 ████ Green (Active)
#dc2626 ████ Red (Closed)
#6b7280 ████ Gray (Neutral)
```

---

**Quick Reference Guide v1.0**  
**For Qodha Maps Design System**  
**Last Updated: January 3, 2026**
