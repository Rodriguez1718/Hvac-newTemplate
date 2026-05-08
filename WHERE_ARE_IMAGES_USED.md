# Where Are Images Being Used?

## 🎯 Hero Images (ALREADY OPTIMIZED ✅)

### Location: Homepage Hero Section

**Component**: `src/components/sections/HeroSection.astro`  
**Data**: `src/content/pages/index.json`

```
┌─────────────────────────────────────────────────────────┐
│                    HOMEPAGE HERO                        │
│                                                         │
│  [Slide 1] ← /images/hero-slide-1.webp (83.59 KB) ✅  │
│  [Slide 2] ← /images/hero-slide-2.webp (79 KB) ✅     │
│  [Slide 3] ← /images/hero-slide-3.webp (27.39 KB) ✅  │
│                                                         │
│  Status: OPTIMIZED & LOCAL                             │
│  Problem: Testing OLD deployment                       │
│  Solution: Deploy NOW!                                 │
└─────────────────────────────────────────────────────────┘
```

**JSON Configuration** (index.json):
```json
{
  "component": "HeroSection",
  "props": {
    "images": [
      "/images/hero-slide-1.webp",  ← LOCAL ✅
      "/images/hero-slide-2.webp",  ← LOCAL ✅
      "/images/hero-slide-3.webp"   ← LOCAL ✅
    ]
  }
}
```

---

## 🚨 External Images (NEED OPTIMIZATION)

### 1. Homepage - ContentSection

**Component**: `src/components/sections/ContentSection.astro`  
**Data**: `src/content/pages/index.json`

```
┌─────────────────────────────────────────────────────────┐
│              HOMEPAGE CONTENT SECTION                   │
│                                                         │
│  [Image] ← johnh967.sg-host.com/Quality-HVAC.webp ❌  │
│            (External, ~200 KB)                         │
│                                                         │
│  Should be: /images/quality-hvac-service.webp          │
└─────────────────────────────────────────────────────────┘
```

**Current JSON**:
```json
{
  "component": "ContentSection",
  "props": {
    "images": [
      "https://johnh967.sg-host.com/.../Quality-HVAC-Service.webp"  ← EXTERNAL ❌
    ]
  }
}
```

**Should be**:
```json
{
  "component": "ContentSection",
  "props": {
    "images": [
      "/images/quality-hvac-service.webp"  ← LOCAL ✅
    ]
  }
}
```

---

### 2. Homepage - PortfolioSection

**Component**: `src/components/sections/PortfolioSection.astro`  
**Data**: `src/content/pages/index.json`

```
┌─────────────────────────────────────────────────────────┐
│              HOMEPAGE PORTFOLIO SECTION                 │
│                                                         │
│  [Grid of 8 images]                                    │
│   1. johnh967.sg-host.com/HVAC-Repair-Banner.webp ❌  │
│   2. johnh967.sg-host.com/Quality-HVAC.webp ❌        │
│   3. johnh967.sg-host.com/AC-Repair.webp ❌           │
│   4. johnh967.sg-host.com/Professional-247.webp ❌    │
│   5-8. Instagram feed images ❌                        │
│                                                         │
│  Total: ~1.2 MB external images                        │
└─────────────────────────────────────────────────────────┘
```

**Current JSON**:
```json
{
  "component": "PortfolioSection",
  "props": {
    "images": [
      "https://johnh967.sg-host.com/.../HVAC-Repair-Banner.webp",  ← EXTERNAL ❌
      "https://johnh967.sg-host.com/.../Quality-HVAC-Service.webp",  ← EXTERNAL ❌
      "https://johnh967.sg-host.com/.../AC-Repair-Services.webp",  ← EXTERNAL ❌
      "https://johnh967.sg-host.com/.../Professional-24_7.webp",  ← EXTERNAL ❌
      "https://johnh967.sg-host.com/.../instagram-1.webp",  ← EXTERNAL ❌
      "https://johnh967.sg-host.com/.../instagram-2.webp",  ← EXTERNAL ❌
      "https://johnh967.sg-host.com/.../instagram-3.webp",  ← EXTERNAL ❌
      "https://johnh967.sg-host.com/.../instagram-4.webp"   ← EXTERNAL ❌
    ]
  }
}
```

**Should be**:
```json
{
  "component": "PortfolioSection",
  "props": {
    "images": [
      "/images/portfolio-hvac-repair.webp",  ← LOCAL ✅
      "/images/quality-hvac-service.webp",  ← LOCAL ✅
      "/images/ac-repair-services.webp",  ← LOCAL ✅
      "/images/professional-247-repairs.webp",  ← LOCAL ✅
      "/images/instagram-1.webp",  ← LOCAL ✅
      "/images/instagram-2.webp",  ← LOCAL ✅
      "/images/instagram-3.webp",  ← LOCAL ✅
      "/images/instagram-4.webp"   ← LOCAL ✅
    ]
  }
}
```

---

### 3. Commercial Page

**Component**: Various sections  
**Data**: `src/content/pages/commercial.json`

```
┌─────────────────────────────────────────────────────────┐
│                  COMMERCIAL PAGE                        │
│                                                         │
│  Hero Background: Commercial-Banner.webp ❌            │
│  ContentSection: Commercial-HVAC-Installation.webp ❌  │
│  ContentSectionAlt: Commercial-HVAC-Maintenance.webp ❌│
│  PromoTiles (4 images):                                │
│    - Commercial-HVAC-Repair.webp ❌                    │
│    - Commercial-HVAC-Warranty.webp ❌                  │
│    - Expert-Commercial-Maintenance.webp ❌             │
│    - Commercial-Banner.webp ❌                         │
│                                                         │
│  Total: 6 external images                              │
└─────────────────────────────────────────────────────────┘
```

---

### 4. Emergency Page

**Component**: Various sections  
**Data**: `src/content/pages/emergency.json`

```
┌─────────────────────────────────────────────────────────┐
│                  EMERGENCY PAGE                         │
│                                                         │
│  Hero Background: Emergency-HVAC-Banner.webp ❌        │
│  ContentSection: Reliable-Emergency-Services.webp ❌   │
│  ContentSectionAlt: 24_7-Emergency-Repairs.webp ❌     │
│  PromoTiles (3 images):                                │
│    - Heating-Cooling-Emergency.webp ❌                 │
│    - Reliable-Emergency-Services.webp ❌               │
│    - 24_7-Emergency-Repairs.webp ❌                    │
│                                                         │
│  Total: 4 external images                              │
└─────────────────────────────────────────────────────────┘
```

---

### 5. Air Conditioning Page

**Component**: Various sections  
**Data**: `src/content/pages/air-conditioning.json`

```
┌─────────────────────────────────────────────────────────┐
│              AIR CONDITIONING PAGE                      │
│                                                         │
│  ContentSection: Quality-HVAC-Service.webp ❌          │
│  ContentSectionAlt: Instagram feed image ❌            │
│  PromoTiles (4 images):                                │
│    - AC Service image (aonecoolingsolution.in) ❌      │
│    - AC-Repair-Services.webp ❌                        │
│    - Instagram feed image ❌                           │
│    - Thermostat repair (askmoss.com) ❌                │
│                                                         │
│  Total: 4 external images                              │
└─────────────────────────────────────────────────────────┘
```

---

### 6. Other Pages

**About Page** (`about.json`):
- 2 external images in PromoTiles section

**Service Areas Page** (`service-areas.json`):
- 2 external images in PromoTiles section

**Financing Page** (`financing.json`):
- 1 external image in PromoTiles section

---

## 📊 Complete Image Inventory

### ✅ Optimized (Local)
```
public/images/
├── hero-slide-1.webp (83.59 KB) ✅
├── hero-slide-2.webp (79 KB) ✅
├── hero-slide-3.webp (27.39 KB) ✅
├── bg2.jpg (existing)
├── aircon.webp (needs optimization)
└── ... (other existing images)
```

### 🚨 Need to Download & Optimize
```
External Images (19 total):

johnh967.sg-host.com (15 images):
├── Quality-HVAC-Service.webp
├── HVAC-Repair-Banner.webp
├── AC-Repair-Services.webp
├── Professional-24_7-Heating-and-Cooling-Repairs.webp
├── Instagram feed images (4 images)
├── Commercial-Banner.webp
├── Commercial-HVAC-Installation-Service.webp
├── Commercial-HVAC-Maintenance-Service.webp
├── Commercial-HVAC-Repair-Services.webp
├── Commercial-HVAC-Warranty-Service.webp
├── Expert-Commercial-HVAC-Maintenance.webp
├── Reliable-Emergency-Services.webp
├── 24_7-Emergency-Repair-Services.webp
├── Heating-and-Cooling-Emergency-Repair-Services.webp
└── Emergency-HVAC-Service-Banner.webp

Other sources (4 images):
├── unsplash.com/heating-services (1 image)
├── classicheatandair.com/indoor-air-quality (1 image)
├── aonecoolingsolution.in/ac-service (1 image)
└── askmoss.com/thermostat-repair (1 image)
```

---

## 🎯 Impact by Page

### Homepage (index.json)
- **Current**: 3 local hero images ✅ + 9 external images ❌
- **After optimization**: 12 local images ✅
- **Performance gain**: +15-18 points

### Commercial Page (commercial.json)
- **Current**: 6 external images ❌
- **After optimization**: 6 local images ✅
- **Performance gain**: +2-3 points

### Emergency Page (emergency.json)
- **Current**: 4 external images ❌
- **After optimization**: 4 local images ✅
- **Performance gain**: +1-2 points

### Air Conditioning Page (air-conditioning.json)
- **Current**: 4 external images ❌
- **After optimization**: 4 local images ✅
- **Performance gain**: +1-2 points

### Other Pages
- **Current**: 5 external images ❌
- **After optimization**: 5 local images ✅
- **Performance gain**: +1 point

---

## 🚀 Action Plan

### Phase 1: Deploy Current Build (5 min)
```bash
npm run build && git push
```
**Result**: Hero images optimized → Score: 85-88

### Phase 2: Homepage Images (45 min)
Download & optimize 9 homepage images
**Result**: Homepage fully optimized → Score: 88-90

### Phase 3: All Pages (1 hour)
Download & optimize remaining 10 images
**Result**: All pages optimized → Score: 90-95

---

## 🔍 How to Check

### Verify Images Are Loading Locally

**Chrome DevTools → Network Tab:**

```
✅ GOOD (Local):
/images/hero-slide-1.webp          83.59 KB
/images/hero-slide-2.webp          79 KB
/images/hero-slide-3.webp          27.39 KB
/images/quality-hvac-service.webp  ~80 KB
/images/portfolio-hvac-repair.webp ~100 KB

❌ BAD (External):
johnh967.sg-host.com/.../Quality-HVAC.webp  ~200 KB
johnh967.sg-host.com/.../HVAC-Repair.webp   ~300 KB
ultimateheatingandair.com/.../HVAC.jpg      602 KB
```

### Verify Performance Score

**Chrome DevTools → Lighthouse:**

```
✅ GOOD:
Performance: 90+
LCP: < 2.5s
Total Image Size: < 500 KB

❌ BAD:
Performance: 73
LCP: > 4s
Total Image Size: > 2 MB
```

---

## 📚 Reference

- **Complete image list**: `IMAGES_DOWNLOAD_GUIDE.md`
- **Step-by-step checklist**: `QUICK_FIX_CHECKLIST.md`
- **Automation script**: `scripts/update-all-images.mjs`
- **Performance summary**: `PERFORMANCE_SOLUTION_SUMMARY.md`

---

## 💡 Key Takeaway

**The hero images ARE optimized and working correctly in the code.**

**The problem is you're testing an OLD deployment.**

**Solution: Deploy NOW, then test the NEW deployment URL!**

```bash
npm run build
git push
# Wait for deployment
# Test NEW URL
# Score should be 85-88 immediately!
```
