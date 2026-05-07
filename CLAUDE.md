# HVAC Template 3 — Claude Instructions

## Project Overview
Astro-based HVAC dealer website template. Pages are JSON-driven: each page file in `src/content/pages/` defines a `sections` array of `{ component, props }` objects rendered by `SectionRenderer.astro`.

**Stack:** Astro · Tailwind CSS v4 · TypeScript · Bun

---

## Design Rules (apply to every component and change)

- **Clean design** — no visual clutter, generous whitespace, purposeful use of color
- **Clean spacing** — consistent vertical rhythm; use the section padding pattern `py-16 md:py-24`, card padding `2rem–3rem`
- **Responsive** — mobile-first; every component must look correct at 320px, 768px, and 1280px+; use `flex-wrap`, `clamp()`, and breakpoint overrides
- **All text/elements must be visible** — never rely on low opacity alone for important content; check that text is legible over every background it appears on
- **No color contrast issues** — white text on `var(--brand-primary)` ✓; muted text uses `rgba(255,255,255,0.55)` minimum on dark backgrounds; light-mode text uses the brand-primary color on off-white backgrounds
- **Consistent design language** — match the style of existing sections: sharp corners (no border-radius unless explicitly needed), `var(--brand-highlight)` accent bars/dots, uppercase tracking labels, Inter font, `data-animate` scroll animations

---

## Brand Color System

Colors are set in `src/config/site.ts` and injected as CSS variables via `ThemeProvider.astro`.

| Variable | Role |
|---|---|
| `var(--brand-primary)` | Dark bg, heading text (`#050315` default) |
| `var(--brand-secondary)` | Buttons, accents |
| `var(--brand-tertiary)` | Subtle muted backgrounds |
| `var(--brand-quaternary)` | Page background (near-white) |
| `var(--brand-highlight)` | Warm yellow pops — accent bars, icon colors, CTA buttons |

Never hardcode hex values in components. Always use these CSS variables so the template recolors correctly per client.

---

## Component Conventions

### File location
`src/components/sections/MySection.astro`

### Registration
Add import + key to `src/components/SectionRenderer.astro` — both the import line and the `componentMap` object.

### Props pattern
- Define a typed `interface Props` at the top of the frontmatter
- Provide sensible defaults for every optional prop
- Run user-facing strings through `getLocationText()` from `@/config/site` to support `{city}`, `{state}`, `{business}`, `{fullName}` tokens

### Animation
Use `data-animate="fade-up"` (or `zoom-in`, `fade-left`, `fade-right`, `fade-scale`) on the main wrapper. Use `data-animate-stagger` on list containers for cascading children. These are wired up in `global.css` via IntersectionObserver — no JS needed in the component.

### Scroll animation values available
`fade-up` · `fade-down` · `fade-left` · `fade-right` · `zoom-in` · `fade-scale`

### Styling
- Write scoped `<style>` blocks inside `.astro` files (not Tailwind utility soup)
- Use Tailwind utilities only for layout helpers: `container`, `mx-auto`, `px-*`, `py-*`, `flex`, `grid`, `hidden`, `md:*`
- Keep component CSS class names prefixed (e.g. `.ct-*`, `.ic-*`) to avoid collisions

---

## Adding a New Section (checklist)

1. Create `src/components/sections/MySectionName.astro`
2. Add `import MySectionName from "@/components/sections/MySectionName.astro"` to `SectionRenderer.astro`
3. Add `MySectionName` to the `componentMap` object in `SectionRenderer.astro`
4. Use it in any page JSON: `{ "component": "MySectionName", "props": { ... } }`

---

## Page JSON Structure

```json
{
  "title": "Page Title",
  "description": "Meta description",
  "sections": [
    { "component": "ComponentName", "props": { } }
  ]
}
```

Pages live in `src/content/pages/`. The filename becomes the route (e.g. `commercial.json` → `/commercial`).

---

## Available Section Components

| Component | Purpose |
|---|---|
| `HeroSection` | Full-width homepage hero |
| `HeroPage` | Inner-page hero with background image |
| `ContentSection` | Image + text, features list, CTA |
| `ContentSectionAlt` | Alt layout image + feature cards |
| `CTAStrip` | Compact CTA bar with phone + trust badges |
| `SignupBannerSection` | Centered dark signup/contact banner |
| `FAQSection` | Accordion FAQ |
| `ServicesSection` | Interactive service category grid (React) |
| `ServiceCardsGridSection` | Static service card grid |
| `ReviewsSection` | Customer reviews |
| `TestimonialsSection` | Testimonial cards |
| `TrustBadges` | Scrolling logo carousel |
| `PromoTilesSection` | 3-up promo cards (maintenance/financing/emergency) |
| `MaintenancePlanSection` | Maintenance plan pricing |
| `FinancingSection` | Financing overview |
| `FinancingIntroSection` | Financing intro block |
| `FinancingPlansSection` | Plan cards / service links |
| `PricingPlansSection` | Pricing tiers |
| `CouponsSection` | Coupon cards |
| `ImageCardsSection` | Image card grid |
| `PortfolioSection` | Portfolio/gallery |
| `ExpertServicesSection` | Expert services highlight |
| `ServiceAreaSection` | Service area list + CTA |
| `ContactFormSection` | Contact form |
| `InfoCalloutSection` | Centered tip/notice banner with icon |
| `JobOpeningsSection` | Job listings |
| `CareersCTASection` | Careers CTA |
| `PlaceholderContentSection` | Dev placeholder |
