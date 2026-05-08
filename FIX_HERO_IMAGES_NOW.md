# Fix Hero Images - Step by Step

## The Problem

Your `index.json` references these images:
```json
"images": [
  "/images/hero-slide-1.webp",
  "/images/hero-slide-2.webp",
  "/images/hero-slide-3.webp"
]
```

**But these files don't exist in `public/images/` yet!**

So the HeroSection component falls back to the default external URLs:
- `https://www.superiorcomforthvac.com/...` (1,471 KB) ❌
- `https://ultimateheatingandair.com/...` (602 KB) ❌
- Plus Unsplash/Pexels images

## The Solution (3 Steps - 10 minutes)

### Step 1: Download the External Images

Open these URLs in your browser and save them:

**Image 1:**
```
https://www.superiorcomforthvac.com/wp-content/uploads/2024/05/ac-repair-brownstown-mi.jpg
```
- Right-click → Save Image As
- Save anywhere temporarily (like Downloads folder)

**Image 2:**
```
https://healthinnovation-kss.com/wp-content/uploads/2025/09/WorkWell-images-1200-x-627-px.webp
```
- Right-click → Save Image As
- Save temporarily

**Image 3:**
```
https://ultimateheatingandair.com/wp-content/uploads/2024/06/10-Most-Common-HVAC-Problems.jpg
```
- Right-click → Save Image As
- Save temporarily

### Step 2: Optimize to WebP

```bash
# Start your dev server
npm run dev
```

Then open in browser:
```
http://localhost:4321/image-optimizer.html
```

**For each of the 3 images:**

1. Click "Click to upload" or drag the image
2. Set these options:
   - **Format**: WebP
   - **Quality**: 75%
   - **Max Width**: 1920px
3. Click "Download Optimized Image"
4. Save with these exact names:
   - First image → `hero-slide-1.webp`
   - Second image → `hero-slide-2.webp`
   - Third image → `hero-slide-3.webp`

### Step 3: Move to public/images/

Move the 3 optimized WebP files to:
```
public/images/hero-slide-1.webp
public/images/hero-slide-2.webp
public/images/hero-slide-3.webp
```

**On Windows:**
```powershell
# From your Downloads folder (or wherever you saved them)
Move-Item hero-slide-1.webp C:\Users\rodriguez\TemplateHvac\public\images\
Move-Item hero-slide-2.webp C:\Users\rodriguez\TemplateHvac\public\images\
Move-Item hero-slide-3.webp C:\Users\rodriguez\TemplateHvac\public\images\
```

**Or just drag and drop** the 3 files into the `public/images/` folder in VS Code.

### Step 4: Verify

```bash
# Rebuild
npm run build

# Preview
npm run preview
```

Open http://localhost:4321 and check:
1. Hero slider should show your images
2. No console errors
3. Images load fast

### Step 5: Test Performance

1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run Performance audit
4. **Score should jump from 73 to 85-90!** 🎉

## Expected Results

### Before:
- 3 external images: **2,073 KB total**
- Performance score: **73**
- Slow loading

### After:
- 3 local WebP images: **~350 KB total**
- Performance score: **85-90**
- Fast loading
- **Savings: 1,723 KB (83% reduction!)**

## Troubleshooting

### "Images still not showing"
- Check file names are exactly: `hero-slide-1.webp`, `hero-slide-2.webp`, `hero-slide-3.webp`
- Check they're in `public/images/` not `public/` or `src/images/`
- Clear browser cache (Ctrl+Shift+R)
- Restart dev server

### "Performance still low"
- Make sure you optimized to WebP at 75% quality
- Check file sizes are around 100-150 KB each
- Run `npm run build` before testing
- Test in incognito mode

### "Can't download external images"
- Some sites block right-click - use browser's download feature
- Or use browser DevTools → Network tab → find image → right-click → Open in new tab
- Or use a download manager

## Quick Commands

```bash
# Check if files exist
ls public/images/hero-slide-*.webp

# Start dev server
npm run dev

# Build and test
npm run build
npm run preview

# Open optimizer
# http://localhost:4321/image-optimizer.html
```

## What's Next?

After fixing these 3 hero images, you can optionally optimize:
- Portfolio images (8 images)
- Location page images
- Service page images

But **these 3 hero images are the most critical** - they'll give you the biggest performance boost!

---

**Need help?** The images are being loaded in:
- Component: `src/components/sections/HeroSection.astro`
- Config: `src/content/pages/index.json`
- Location: Should be in `public/images/`
