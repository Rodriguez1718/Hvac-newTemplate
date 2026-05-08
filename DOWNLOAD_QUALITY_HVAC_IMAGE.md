# Download Quality HVAC Service Image

## Current Status

✅ **ContentSection.astro is now fixed** - It will use images from JSON  
🚨 **Image file doesn't exist yet** - You need to download it

## The Image You Need

**Current in index.json:**
```json
"images": ["/images/quality-hvac-service.webp"]
```

**Problem:** This file doesn't exist in `public/images/` yet!

**Original URL:** 
```
https://johnh967.sg-host.com/wp-content/uploads/2024/11/Quality-HVAC-Service.webp
```

## Quick Fix (5 minutes)

### Step 1: Download the Image

1. Open this URL in your browser:
   ```
   https://johnh967.sg-host.com/wp-content/uploads/2024/11/Quality-HVAC-Service.webp
   ```

2. Right-click → Save Image As...

3. Save it temporarily (e.g., Downloads folder)

### Step 2: Optimize the Image

```bash
# Start dev server
npm run dev

# Open image optimizer in browser
# http://localhost:4321/image-optimizer.html
```

1. **Upload** the downloaded image
2. **Settings**:
   - Format: **WebP**
   - Quality: **75%**
   - Max Width: **800px** (it's a content image, not a hero)
3. **Download** the optimized version
4. **Rename** to `quality-hvac-service.webp`

### Step 3: Save to Project

Move the optimized file to:
```
public/images/quality-hvac-service.webp
```

### Step 4: Test

```bash
# Build
npm run build

# Preview
npm run preview

# Open http://localhost:4321
# The ContentSection should now show the image!
```

## What This Image Is Used For

This image appears in **multiple pages**:

1. **Homepage** (`index.json`) - ContentSection
2. **Air Conditioning page** (`air-conditioning.json`) - ContentSection
3. **About page** (`about.json`) - PromoTiles
4. **Service Areas page** (`service-areas.json`) - PromoTiles
5. **Financing page** (`financing.json`) - PromoTiles

**Impact:** Optimizing this ONE image improves 5 pages! 🎉

## Expected Results

**Before:**
- External image: ~200 KB
- Slow loading from johnh967.sg-host.com
- Performance impact on 5 pages

**After:**
- Local image: ~60-80 KB (75% reduction)
- Fast loading from your server
- Performance boost on 5 pages

## Alternative: Use Existing Image

If you can't download the external image right now, you can temporarily use an existing image:

```json
"images": ["/images/hvac-man.png"]
```

Or:

```json
"images": ["/images/team.png"]
```

These files already exist in your `public/images/` folder.

## Next Steps

After fixing this image:

1. ✅ ContentSection will work
2. ✅ Homepage will load faster
3. 🚨 Still need to optimize Portfolio images (8 images)
4. 🚨 Still need to optimize other page images

See `IMAGES_DOWNLOAD_GUIDE.md` for the complete list.

---

**Quick Command:**

```bash
# After saving the optimized image to public/images/
npm run build
npm run preview
# Check http://localhost:4321 - ContentSection should show the image!
```
