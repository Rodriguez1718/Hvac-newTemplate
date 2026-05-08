# Performance Optimization Guide

## Current Issues (Score: 73)

### 1. **Large Unoptimized Images** (Critical)
- `aircon.png`: 3,015 KB (3 MB!) - Used as background in 4 components
- External images from `superiorcomforthvac.com`: 1,471 KB
- External images from `ultimateheatingandair.com`: 602 KB

### 2. **Image Format Issues**
- Using PNG instead of WebP/AVIF
- Images not properly sized for display dimensions
- No responsive image srcsets

### 3. **External Resource Loading**
- Loading images from external domains (slow, unreliable)
- Multiple font weights loaded synchronously

## Implemented Optimizations

### ✅ Build Configuration
- Enabled esbuild minification for CSS and JS
- Configured asset file naming for better caching
- Added manual chunk splitting for better code splitting
- Set `inlineStylesheets: 'auto'` for optimal CSS delivery
- Enabled experimental features: `clientPrerender`, `directRenderScript`

### ✅ Font Loading
- Consolidated font loading into single request
- Added `font-display: swap` for faster text rendering
- Removed unnecessary DNS prefetch hints
- Used preload with async loading pattern

### ✅ Image Loading Strategy
- First hero slide: `loading="eager"` + `fetchpriority="high"`
- Other slides: `loading="lazy"` + `fetchpriority="low"`
- Proper width/height attributes (1920x1080)
- Async decoding for all images

## Required Manual Steps

### 1. Optimize aircon.png (CRITICAL - Will save ~2.7 MB)

**Option A: Use Online Tool**
1. Go to https://squoosh.app/
2. Upload `public/images/aircon.png`
3. Settings:
   - Format: WebP
   - Quality: 75-80
   - Resize: 800x800 (it's used as background at 65% size)
4. Download and save as `public/images/aircon.webp`

**Option B: Use ImageMagick (if installed)**
```bash
magick public/images/aircon.png -resize 800x800 -quality 80 public/images/aircon.webp
```

**Option C: Use Sharp (Node.js)**
```bash
npm install -g sharp-cli
sharp -i public/images/aircon.png -o public/images/aircon.webp --webp-quality 80 resize 800 800
```

### 2. Download and Optimize External Images

The performance report shows images from:
- `superiorcomforthvac.com/wp-content/uploads/2024/05/ac-repair-brownstown-mi.jpg` (1,471 KB)
- `ultimateheatingandair.com/wp-content/uploads/2024/06/10-Most-Common-HVAC-Problems.jpg` (602 KB)

**Steps:**
1. Download these images
2. Optimize them using Squoosh or ImageMagick
3. Save to `public/images/` folder
4. Update references in your JSON content files

### 3. Update Image References

After creating `aircon.webp`, update these files:
- `src/components/sections/ServiceCardsGridSection.astro`
- `src/components/sections/ServicesSection.astro`
- `src/components/ui/PopupModal.astro`
- `src/components/Footer.astro`

Change:
```css
background-image: url('/images/aircon.png');
```

To:
```css
background-image: url('/images/aircon.webp');
```

### 4. Add Fallback Support

For better browser compatibility, use CSS with fallback:
```css
.bg-element {
  background-image: url('/images/aircon.png'); /* Fallback */
  background-image: url('/images/aircon.webp'); /* Modern browsers */
}
```

## Expected Performance Improvements

After implementing all optimizations:

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Total Image Size | ~5.1 MB | ~500 KB | **90% reduction** |
| LCP (Largest Contentful Paint) | High | Low | **Significant** |
| Performance Score | 73 | 90+ | **+17 points** |
| First Load | Slow | Fast | **3-5x faster** |

## Additional Recommendations

### 1. Implement Responsive Images
```html
<img 
  srcset="
    /images/hero-small.webp 640w,
    /images/hero-medium.webp 1024w,
    /images/hero-large.webp 1920w
  "
  sizes="100vw"
  src="/images/hero-large.webp"
  alt="HVAC Service"
/>
```

### 2. Use CDN for Images
Consider using a CDN like:
- Cloudflare Images
- Cloudinary
- imgix
- Vercel Image Optimization (built-in)

### 3. Lazy Load Below-the-Fold Content
Already implemented for hero slides 2-3, but ensure all below-the-fold images use `loading="lazy"`

### 4. Preload Critical Images
Add to `<head>` in BaseLayout.astro:
```html
<link rel="preload" as="image" href="/images/hero-first.webp" fetchpriority="high" />
```

### 5. Enable Compression
Ensure your hosting (Vercel) has Brotli/Gzip compression enabled (usually automatic)

## Testing Performance

After optimizations, test with:
1. **Lighthouse** (Chrome DevTools)
2. **PageSpeed Insights**: https://pagespeed.web.dev/
3. **WebPageTest**: https://www.webpagetest.org/
4. **GTmetrix**: https://gtmetrix.com/

## Monitoring

Set up performance monitoring:
- Vercel Analytics (already enabled)
- Google Analytics Core Web Vitals
- Real User Monitoring (RUM)
