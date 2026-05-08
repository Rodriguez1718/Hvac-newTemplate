# HVAC Template - High Performance Astro Site

A modern, high-performance HVAC business website built with Astro, React, and Tailwind CSS.

## 🚀 Performance Optimizations

**Current Status:** Desktop score improved from 73 to 90+ (after image optimization)

### Quick Performance Fix
See **[QUICK_PERFORMANCE_FIX.md](QUICK_PERFORMANCE_FIX.md)** for a 5-minute guide to optimize the main performance bottleneck.

### Detailed Guides
- **[PERFORMANCE_IMPROVEMENTS_SUMMARY.md](PERFORMANCE_IMPROVEMENTS_SUMMARY.md)** - Complete optimization summary
- **[PERFORMANCE_OPTIMIZATION.md](PERFORMANCE_OPTIMIZATION.md)** - In-depth optimization guide

### Built-in Tools
- **Image Optimizer**: http://localhost:4321/image-optimizer.html (when dev server is running)
- **Performance Analysis**: `npm run perf:analyze`
- **Auto Image Updates**: `npm run update-images`

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun install`             | Installs dependencies                            |
| `bun dev`                 | Starts local dev server at `localhost:4321`      |
| `bun build`               | Build your production site to `./dist/`          |
| `bun preview`             | Preview your build locally, before deploying     |
| `npm run update-images`   | Update image references (PNG → WebP)             |
| `npm run perf:analyze`    | Build and analyze performance                    |
| `bun astro ...`           | Run CLI commands like `astro add`, `astro check` |

## 🚀 Project Structure

```text
/
├── public/
│   ├── images/              # Static images
│   └── image-optimizer.html # Built-in image optimization tool
├── src/
│   ├── components/          # Astro & React components
│   │   ├── sections/        # Page sections
│   │   └── ui/              # UI components
│   ├── content/             # Content collections (JSON)
│   │   └── pages/           # Page content
│   ├── layouts/             # Layout components
│   ├── pages/               # File-based routing
│   ├── config/              # Site configuration
│   └── styles/              # Global styles
├── scripts/                 # Build & utility scripts
└── package.json
```

## 📊 Performance Features

- ✅ Optimized image loading (lazy loading, fetchpriority)
- ✅ Code splitting (React vendor, icons, UI components)
- ✅ Font loading optimization (preload + async)
- ✅ CSS minification and code splitting
- ✅ Asset organization for better caching
- ✅ Compressed HTML output
- ✅ Sitemap generation
- ✅ Vercel Analytics integration

## 🎯 Content Management

Content is managed through JSON files in `src/content/pages/`. Each page can define:
- SEO metadata (title, description, keywords)
- Dynamic sections with props
- Draft status and indexing preferences

Example:
```json
{
  "title": "HVAC Services",
  "description": "Professional HVAC services",
  "sections": [
    {
      "component": "HeroSection",
      "props": { "variant": "slider" }
    }
  ]
}
```

## 🔧 Configuration

- **Site Config**: `src/config/site.ts` - Business info, contact details, locations
- **Navigation**: `src/config/navigation.ts` - Menu structure
- **Astro Config**: `astro.config.mjs` - Build settings, integrations
- **Tailwind**: `src/styles/global.css` - Design system

## 📱 Features

- Responsive design (mobile-first)
- Dynamic hero slider
- Service cards and sections
- Contact forms
- FAQ sections
- Testimonials
- Location-based content
- SEO optimized
- Accessibility compliant

## 🌐 Deployment

Optimized for Vercel deployment with:
- Static site generation (SSG)
- Automatic sitemap
- Web analytics
- Edge network delivery

## 👀 Want to learn more?

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com)
- [React Documentation](https://react.dev)
