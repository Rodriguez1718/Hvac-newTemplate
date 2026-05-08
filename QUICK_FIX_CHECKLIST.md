# Quick Fix Checklist - Performance Optimization

## ✅ What's Already Done

- [x] Hero images optimized (hero-slide-1.webp, hero-slide-2.webp, hero-slide-3.webp)
- [x] Code optimizations (forced reflow fix, image loading strategies)
- [x] Build configuration optimized
- [x] Font loading optimized
- [x] index.json updated to use local hero images

## 🚨 IMMEDIATE ACTION REQUIRED

### Step 1: Deploy Current Build (5 minutes)

**You're testing an OLD deployment!** The code is correct, but you need to deploy:

```bash
# Build
npm run build

# Deploy to Vercel
git add .
git commit -m "fix: use local optimized hero images"
git push

# Wait for deployment to complete
# Test the NEW deployment URL (not the old one!)
```

**Expected Result**: Performance score should jump from 73 to ~85-88 just from hero images!

### Step 2: Download External Images (30-60 minutes)

Open `IMAGES_DOWNLOAD_GUIDE.md` for the complete list. Priority images:

**High Priority (Homepage - index.json):**
1. Quality-HVAC-Service.webp
2. Portfolio images (8 images)

**Medium Priority (Other pages):**
3. Commercial page images (6 images)
4. Emergency page images (4 images)
5. Air conditioning page images (4 images)

**Download Method:**
- Right-click → Save Image As
- Or use browser DevTools → Network tab → Download

### Step 3: Optimize Images (30 minutes)

```bash
# Start dev server
npm run dev

# Open optimizer
# http://localhost:4321/image-optimizer.html
```

**For each image:**
1. Upload
2. Format: WebP
3. Quality: 75%
4. Max Width: 1920px (banners) or 800px (others)
5. Download
6. Save to `public/images/` with descriptive name

### Step 4: Update JSON Files (5 minutes)

**Option A: Automatic (Recommended)**
```bash
node scripts/update-all-images.mjs
```

**Option B: Manual**
Edit each JSON file and replace external URLs with `/images/filename.webp`

### Step 5: Final Deploy (5 minutes)

```bash
# Build
npm run build

# Test locally
npm run preview

# Deploy
git add .
git commit -m "feat: optimize all external images to local WebP"
git push
```

## 📊 Expected Results

### Current State (OLD deployment):
- Performance Score: **73**
- External Images: **~2 MB**
- LCP: **Slow**

### After Step 1 (Hero images only):
- Performance Score: **85-88** ⬆️ +12-15 points
- Hero Images: **~190 KB** (local)
- LCP: **Improved**

### After Step 5 (All images):
- Performance Score: **90-95** ⬆️ +17-22 points
- All Images: **~400 KB** (local)
- LCP: **Fast** ⚡

## 🎯 Quick Wins

### Win #1: Deploy Now (5 min, +12 points)
Just deploy what you have. Hero images are already optimized!

### Win #2: Homepage Only (45 min, +15 points)
Download and optimize just the homepage images (index.json):
- 1 ContentSection image
- 8 Portfolio images

### Win #3: Full Optimization (2 hours, +20 points)
Download and optimize all 19 external images

## 🔍 How to Test

### Test NEW Deployment (Not Old!)

1. **Deploy to Vercel**
   ```bash
   git push
   ```

2. **Wait for deployment** (check Vercel dashboard)

3. **Get NEW deployment URL** (e.g., `your-site-abc123.vercel.app`)

4. **Test in Chrome DevTools**
   - Open NEW URL in Incognito mode
   - F12 → Lighthouse
   - Run Performance audit
   - Check Network tab for image sizes

5. **Verify local images are loading**
   - Network tab should show `/images/hero-slide-*.webp`
   - NOT external URLs

## 🐛 Troubleshooting

### "Still seeing external images"
- Clear browser cache (Ctrl+Shift+Delete)
- Test in Incognito mode
- Make sure you're testing the NEW deployment URL
- Check Network tab to see actual URLs being loaded

### "Performance score still low"
- Verify you're testing the NEW deployment
- Check if external images are still loading (Network tab)
- Make sure all images are optimized (WebP, 75% quality)
- Test on production URL (not localhost)

### "Images not found (404)"
- Verify images are in `public/images/` folder
- Check JSON files use `/images/` prefix (not `/public/images/`)
- Rebuild: `npm run build`

## 📁 Files to Check

- ✅ `src/content/pages/index.json` - Hero images already updated
- 🚨 `src/content/pages/index.json` - Portfolio section needs update
- 🚨 `src/content/pages/commercial.json` - 6 external images
- 🚨 `src/content/pages/emergency.json` - 4 external images
- 🚨 `src/content/pages/air-conditioning.json` - 4 external images
- 🚨 `src/content/pages/about.json` - 2 external images
- 🚨 `src/content/pages/service-areas.json` - 2 external images
- 🚨 `src/content/pages/financing.json` - 1 external image

## 🎉 Success Criteria

- [ ] Performance score 90+
- [ ] All images loading from `/images/` (not external URLs)
- [ ] LCP < 2.5s
- [ ] Total image size < 500 KB
- [ ] No external image requests in Network tab

## 📚 Reference Documents

- `IMAGES_DOWNLOAD_GUIDE.md` - Complete image list with URLs
- `EXTERNAL_IMAGES_SOLUTION.md` - Detailed explanation
- `PERFORMANCE_IMPROVEMENTS_SUMMARY.md` - All optimizations done
- `scripts/update-all-images.mjs` - Automation script

---

## 🚀 START HERE

**Right now, do this:**

```bash
# 1. Deploy current build
npm run build
git add .
git commit -m "fix: use local optimized hero images"
git push

# 2. Wait for deployment

# 3. Test NEW deployment URL

# 4. Check performance score (should be ~85-88)

# 5. If good, continue with remaining images
# 6. If still low, verify you're testing the NEW deployment
```

**Expected time to 90+ score**: 2-3 hours total
**Expected time to 85+ score**: 5 minutes (just deploy!)
