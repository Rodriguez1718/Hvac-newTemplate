# 🚀 Quick Performance Fix

## The Problem
Your site scores **73/100** because of a **3 MB PNG image** (`aircon.png`)

## The Solution (5 minutes)

### Step 1: Optimize the Image
**Choose ONE method:**

#### Method A: Use Built-in Tool (Easiest) ⭐
```bash
npm run dev
```
Then open: **http://localhost:4321/image-optimizer.html**
- Upload `public/images/aircon.png`
- Set: WebP, 80% quality, 800px width
- Download as `aircon.webp`
- Save to `public/images/`

#### Method B: Use Squoosh.app
1. Go to https://squoosh.app/
2. Upload `public/images/aircon.png`
3. Choose: WebP, 80% quality, resize to 800x800
4. Download and save as `public/images/aircon.webp`

### Step 2: Update References
```bash
npm run update-images
```

### Step 3: Test
```bash
npm run build
npm run preview
```

### Step 4: Deploy
```bash
git add .
git commit -m "Optimize aircon.png - reduce from 3MB to ~300KB"
git push
```

## Expected Result
- **Performance Score:** 73 → **90+** ✨
- **Image Size:** 3,015 KB → **~300 KB** (90% reduction)
- **Load Time:** Slow → **Fast** (3-5x improvement)

## Verify
After deploying, test at: https://pagespeed.web.dev/

---

**That's it!** This one change will dramatically improve your performance score.

For more optimizations, see `PERFORMANCE_IMPROVEMENTS_SUMMARY.md`
