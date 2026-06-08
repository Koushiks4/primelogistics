# Prime Logistic Services - Coming Soon Page Design

**Date:** 2026-06-06  
**Project:** Prime Logistic Services Landing Page  
**Phase:** Coming Soon Page (Foundation)

## Overview

Build an immersive, premium coming soon page for Prime Logistic Services, a B2B global logistics company. The page establishes brand presence with theatrical animations while setting the foundation for a full-featured landing page (services, about, tracking) to be built later.

## Brand Positioning

- **Target Audience:** B2B clients, global enterprises
- **Tone:** Premium and luxurious with dynamic, modern aesthetic
- **Tagline:** "BEYOND INTELLIGENCE"
- **Brand Colors:** Red (#E31E24) and black from logo
- **Key Message:** Dependability and excellence in global logistics

## Requirements

### Must Have
- Full viewport immersive experience
- 3D rotating globe with connection lines
- Animated particle field background
- Theatrical entrance animation sequence (3-4 seconds)
- Logo, tagline, headline, description
- Contact information: email and phone (placeholders)
- Responsive design (desktop, tablet, mobile)
- SEO meta tags, sitemap, robots.txt
- Vercel deployment-ready
- Future-proof architecture for additional pages

### Nice to Have
- Analytics placeholder for tracking ID
- Click-to-copy email functionality
- Mouse parallax effect on globe (desktop only)
- Performance monitoring setup

### Out of Scope
- Email signup form (intentionally omitted - visitors should wait)
- Backend integration
- CMS integration
- Multi-language support
- Cookie consent

## Technical Architecture

### Tech Stack

**Core:**
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS

**Animation & Visual:**
- Framer Motion (page transitions, kinetic typography, particles)
- Three.js + React Three Fiber (3D globe)
- React Three Drei (3D helpers)

**Rationale:** App Router provides modern Next.js architecture that extends cleanly to full landing page. Framer Motion offers production-ready animations with excellent performance. Three.js delivers true 3D globe for immersive experience.

### Project Structure

```
landing-page/
├── app/
│   ├── layout.tsx          # Root layout, metadata, fonts
│   ├── page.tsx            # Coming soon page
│   ├── globals.css         # Tailwind + custom styles
│   ├── robots.txt          # SEO - allow all
│   └── sitemap.xml         # Single homepage entry
├── components/
│   ├── Globe3D.tsx         # Three.js globe (client)
│   ├── ParticleField.tsx   # Particle system (client)
│   ├── HeroSection.tsx     # Main content (client)
│   └── ContactInfo.tsx     # Email/phone (client)
├── lib/
│   └── constants.ts        # Colors, contact, messaging
├── public/
│   └── logos/              # Logo assets (existing)
├── package.json
├── next.config.js          # Image optimization, output config
├── tailwind.config.js
└── tsconfig.json
```

**Architecture Principles:**
- Server Components for static content by default
- Client Components (`'use client'`) only where interactivity needed
- Modular component design for future page additions
- Centralized constants for easy updates
- Code-splitting for animation libraries

## Visual Design

### Color Palette

**Primary:**
- Brand Red: `#E31E24` (from logo)
- Deep Black: `#0a0a0a` (background)
- Pure Black: `#000000` (gradients)

**Accents:**
- Charcoal: `#1a1a1a`, `#2a2a2a` (depth, layering)
- White: `#ffffff` (primary text)
- Light Gray: `#e5e5e5` (secondary text)
- Red Glow: Subtle halos on interactive elements

**Rationale:** Monochrome premium palette with strategic red accents creates sophisticated, elegant feel that complements logo while maintaining modern luxury positioning.

### Layout Structure

**Layer Stack:**

1. **Background Layer:** Animated particle field
   - 100-300 particles (adaptive to device)
   - Mostly white/gray, occasional red streaks
   - Gentle floating motion with random drift

2. **Mid Layer:** 3D Globe
   - Positioned left or center
   - Wireframe sphere with continent outlines
   - Connection lines between major cities (NY, London, Dubai, Singapore, Tokyo, Sydney)
   - Slow rotation (15-20s full cycle)
   - Pulsing red glow on connection lines

3. **Foreground Content** (vertically centered):
   - Logo (with entrance animation)
   - "BEYOND INTELLIGENCE" tagline
   - "Coming Soon" headline
   - Description paragraph
   - Contact info (email, phone)

4. **Footer:** Copyright notice

### Responsive Behavior

**Desktop (≥1024px):**
- Globe positioned left, content right OR globe as background with content overlay
- Full particle field
- Mouse parallax on globe

**Tablet (768px-1023px):**
- Globe smaller, content center-stacked
- Reduced particle count
- No parallax

**Mobile (<768px):**
- Globe as subtle background element
- Content takes primary focus
- Minimal particles (50-100)
- Typography scales down
- Vertical stacking

## Animation & Interaction Design

### Page Load Sequence (3-4 seconds)

**Timeline:**

| Time | Element | Animation |
|------|---------|-----------|
| 0-0.5s | Particle field | Fade in |
| 0.5-1.5s | Globe | Vertices appear → connections light up |
| 1.5-2s | Logo | Scale in + rotation ease |
| 2-2.5s | Tagline | Letter stagger (left to right) |
| 2.5-3s | Headline | Dramatic scale + fade |
| 3-3.5s | Description | Type effect or fade + upward motion |
| 3.5-4s | Contact info | Subtle entrance |

**Implementation:**
- Framer Motion orchestrates sequence using `staggerChildren`
- Each element has `variants` defining entrance states
- Uses spring physics for natural easing
- Respects `prefers-reduced-motion`

### Continuous Animations

**Globe:**
- 15-20 second rotation cycle
- Connection lines pulse every 2-3 seconds
- Mouse parallax (desktop): subtle tilt following cursor

**Particles:**
- Gentle float with random drift
- Occasional red particle streaks
- Ambient movement, not distracting

**Logo:**
- Subtle breathing glow effect (very gentle)

### Interactive States

**Contact Email/Phone:**
- Hover: Red glow, slight scale (1.05x)
- Click email: Copy to clipboard (optional feature)
- Click phone: `tel:` link for mobile calling

**Globe (desktop):**
- Mouse move: Parallax tilt effect
- Smooth follow, damped motion

**Logo:**
- Hover: Glow intensity increase (subtle)

### Performance Optimization

**Target:** 60fps on modern devices, graceful degradation on older hardware

**Strategies:**
- Globe: Optimized low-poly geometry, target 60fps, reduce on detection of lag
- Particles: Adaptive count based on device capability detection
- Animations: Use `transform` and `opacity` (GPU-accelerated)
- Three.js: Code-split, lazy load after initial paint
- Preload: Logo, fonts loaded immediately
- Framer Motion: `layoutId` and `AnimatePresence` for efficient updates

## Content & Messaging

### Primary Content

**Headline:**
```
Coming Soon
```

**Tagline:**
```
BEYOND INTELLIGENCE
```

**Description:**
```
Dependable global logistics solutions for businesses that demand excellence. 
Prime Logistic Services is preparing to revolutionize B2B delivery across the globe.
```

**Contact Information:**
```
For inquiries, reach us at:

Email: info@primelogisticservices.com
Phone: +1 (XXX) XXX-XXXX
```

**Footer:**
```
© 2026 Prime Logistic Services. All rights reserved.
```

### SEO Configuration

**Title Tag:**
```
Prime Logistic Services - Coming Soon | Global B2B Logistics
```

**Meta Description:**
```
Premium B2B logistics solutions coming soon. Dependable global delivery services 
for businesses that demand excellence.
```

**Keywords:**
```
B2B logistics, global delivery, business shipping, logistics services, 
international freight, supply chain solutions
```

**Open Graph Tags:**
- og:title - Same as title tag
- og:description - Same as meta description
- og:image - Logo PNG (1200x630 optimized for social)
- og:type - website
- og:url - Production domain URL

**Twitter Card:**
- twitter:card - summary_large_image
- twitter:title, description, image - Match OG tags

## Component Specifications

### Globe3D Component

**Purpose:** 3D rotating globe with connection lines

**Props:**
- `autoRotate?: boolean` (default: true)
- `enableParallax?: boolean` (default: true on desktop)
- `rotationSpeed?: number` (default: 0.005)

**Implementation Details:**
- Three.js Scene with PerspectiveCamera
- Wireframe sphere geometry (low poly)
- Continent outlines as LineSegments
- Connection lines between cities: NY ↔ London, Dubai ↔ Singapore, etc.
- Pulsing animation on lines (opacity + glow)
- Mouse position tracking for parallax
- Auto-rotation on Y axis

**Performance:**
- Target 60fps
- Reduce geometry detail if FPS drops below 30
- Disable parallax on mobile

### ParticleField Component

**Purpose:** Animated background particle system

**Props:**
- `particleCount?: number` (default: adaptive)
- `speed?: number` (default: 0.3)

**Implementation Details:**
- Canvas-based rendering OR Framer Motion individual particles
- Random initial positions
- Gentle float animation with Perlin noise for natural movement
- 90% white/gray particles, 10% red accents
- Occasional fast-moving streaks

**Performance:**
- Adaptive count: 300 desktop, 150 tablet, 75 mobile
- Use `requestAnimationFrame` for smooth updates
- Offscreen particles culled

### HeroSection Component

**Purpose:** Main content orchestration and entrance animation

**Props:**
- None (self-contained)

**Implementation Details:**
- Framer Motion parent with `staggerChildren`
- Individual Motion components for logo, tagline, headline, description
- Variants define entrance/exit states
- Responsive typography: `clamp()` for fluid scaling

### ContactInfo Component

**Purpose:** Email and phone display with interactions

**Props:**
- `email: string`
- `phone: string`

**Implementation Details:**
- Framer Motion hover animations
- Email: Click-to-copy (navigator.clipboard API)
- Phone: `tel:` link
- Red glow on hover
- Accessible (keyboard navigation, ARIA labels)

## Configuration Files

### Constants (lib/constants.ts)

```typescript
export const BRAND_COLORS = {
  red: '#E31E24',
  black: '#0a0a0a',
  pureBlack: '#000000',
  charcoal: '#1a1a1a',
  charcoalLight: '#2a2a2a',
  white: '#ffffff',
  gray: '#e5e5e5',
} as const;

export const CONTACT = {
  email: 'info@primelogisticservices.com',
  phone: '+1 (XXX) XXX-XXXX',
} as const;

export const MESSAGING = {
  headline: 'Coming Soon',
  tagline: 'BEYOND INTELLIGENCE',
  description: 'Dependable global logistics solutions for businesses that demand excellence. Prime Logistic Services is preparing to revolutionize B2B delivery across the globe.',
  contactLabel: 'For inquiries, reach us at:',
  copyright: '© 2026 Prime Logistic Services. All rights reserved.',
} as const;

export const CITIES = [
  { name: 'New York', lat: 40.7128, lng: -74.0060 },
  { name: 'London', lat: 51.5074, lng: -0.1278 },
  { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093 },
] as const;

export const CONNECTIONS = [
  ['New York', 'London'],
  ['London', 'Dubai'],
  ['Dubai', 'Singapore'],
  ['Singapore', 'Tokyo'],
  ['Tokyo', 'Sydney'],
] as const;
```

### Next.js Config

**Image Optimization:**
- Optimize logo assets
- Configure domains for future CDN

**Output:**
- Static export NOT used (for future dynamic features)
- Standard production build

### Tailwind Config

**Custom Colors:**
- Extend with brand colors from constants
- Custom red glow utilities

**Custom Animations:**
- `float` keyframe for particles
- `pulse-glow` for connection lines
- `breathe` for logo glow

## Deployment Configuration

### Vercel Setup

**Build Command:** `npm run build` or `pnpm build`

**Output Directory:** `.next`

**Environment Variables:**
- `NEXT_PUBLIC_GA_ID` (optional, for Google Analytics)

**Performance Targets:**
- First Contentful Paint: <1.5s
- Time to Interactive: <3.5s
- Lighthouse Score: >90 (Performance, Accessibility, SEO)

### Files

**robots.txt:**
```
User-agent: *
Allow: /
```

**sitemap.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://primelogisticservices.com</loc>
    <lastmod>2026-06-06</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

### Analytics Placeholder

**Google Analytics:**
```tsx
// app/layout.tsx
{process.env.NEXT_PUBLIC_GA_ID && (
  <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
    <Script id="google-analytics">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
      `}
    </Script>
  </>
)}
```

## Future Extensibility

### Planned Pages (Not in Scope)

This architecture anticipates:

1. **/services** - Service offerings, pricing
2. **/about** - Company story, team
3. **/tracking** - Shipment tracking interface
4. **/contact** - Full contact form

**Design Considerations:**
- Shared layout with navigation (add when building additional pages)
- Reusable components (Globe3D can appear on other pages)
- Consistent animation patterns (establish library of transitions)
- Unified design system (colors, typography, spacing from constants)

### Component Reusability

**For Future Pages:**
- Extract navigation component when needed
- Create shared layout wrapper
- Build animation preset library
- Establish form component patterns

## Success Criteria

**Functional:**
- ✅ Page loads and displays all content
- ✅ Animations play smoothly on modern browsers
- ✅ Contact info is readable and interactive
- ✅ Responsive on all breakpoints
- ✅ Deploys successfully to Vercel

**Performance:**
- ✅ 60fps animations on desktop
- ✅ <3s initial load on good connection
- ✅ Graceful degradation on older devices
- ✅ Lighthouse scores >90

**Visual:**
- ✅ Premium, luxurious aesthetic
- ✅ Immersive theatrical experience
- ✅ Logo theme consistency (red/black)
- ✅ Professional polish

**Technical:**
- ✅ TypeScript with no errors
- ✅ SEO tags implemented
- ✅ Clean console (no errors/warnings)
- ✅ Accessible (keyboard nav, screen readers)

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Three.js bundle size slows initial load | Medium | Code-split, lazy load after paint |
| Animations janky on low-end devices | Medium | Adaptive quality, reduce particle count |
| Browser compatibility issues | Low | Use stable Three.js/Framer versions, test modern browsers |
| Logo assets wrong format/quality | Low | Optimize during implementation, use Next.js Image |

## Open Questions

- None (all requirements clarified during brainstorming)

## Dependencies

**Core:**
- `next@^14.0.0`
- `react@^18.0.0`
- `react-dom@^18.0.0`
- `typescript@^5.0.0`

**Styling:**
- `tailwindcss@^3.4.0`
- `autoprefixer`
- `postcss`

**Animation:**
- `framer-motion@^11.0.0`
- `three@^0.160.0`
- `@react-three/fiber@^8.15.0`
- `@react-three/drei@^9.95.0`

**Dev:**
- `@types/node`
- `@types/react`
- `@types/react-dom`
- `@types/three`

## Timeline Estimate

**Implementation:** 1-2 days for full build
**Testing & Polish:** 0.5 days
**Total:** ~2-3 days

---

**Next Steps:**
1. Write implementation plan
2. Initialize Next.js project
3. Build components incrementally
4. Test and optimize
5. Deploy to Vercel
