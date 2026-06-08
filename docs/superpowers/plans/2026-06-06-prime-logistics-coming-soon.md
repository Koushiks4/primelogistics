# Prime Logistic Services Coming Soon Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an immersive, premium coming soon page for Prime Logistic Services with 3D globe, particle animations, and theatrical entrance sequences.

**Architecture:** Next.js 14+ App Router with TypeScript and Tailwind CSS. Client components for Three.js globe and Framer Motion animations. Server components for static content. Modular design supporting future page additions.

**Tech Stack:** Next.js 14+, TypeScript, Tailwind CSS, Framer Motion, Three.js, React Three Fiber

---

## File Structure Overview

**Configuration & Setup:**
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `next.config.ts` - Next.js configuration with image optimization
- `tailwind.config.ts` - Tailwind with custom colors and animations
- `postcss.config.mjs` - PostCSS configuration

**App Directory:**
- `app/layout.tsx` - Root layout with metadata, fonts, analytics placeholder
- `app/page.tsx` - Coming soon page (server component orchestrating client components)
- `app/globals.css` - Tailwind imports and custom styles

**Components:**
- `components/Globe3D.tsx` - Three.js rotating globe with connection lines (client)
- `components/ParticleField.tsx` - Animated particle background (client)
- `components/HeroSection.tsx` - Main content with entrance animations (client)
- `components/ContactInfo.tsx` - Email/phone with hover states (client)

**Library:**
- `lib/constants.ts` - Brand colors, messaging, contact info, city coordinates

**Public Assets:**
- `public/robots.txt` - SEO configuration
- `app/sitemap.ts` - Dynamic sitemap generation
- `public/logos/` - Existing logo assets

---

## Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `.gitignore`

- [ ] **Step 1: Initialize Next.js with TypeScript and Tailwind**

Run:
```bash
cd /Users/koushiks/Dev/side-projects/appsnxt/primelogistics/landing-page
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

When prompted:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- `src/` directory: No
- App Router: Yes
- Import alias: Yes (@/*)

Expected: Project initialized with base Next.js structure

- [ ] **Step 2: Install animation and 3D dependencies**

Run:
```bash
npm install framer-motion three @react-three/fiber @react-three/drei
npm install -D @types/three
```

Expected: Dependencies added to package.json

- [ ] **Step 3: Verify installation**

Run:
```bash
npm run dev
```

Expected: Dev server starts on http://localhost:3000 with default Next.js page

- [ ] **Step 4: Stop dev server and commit**

```bash
# Stop server with Ctrl+C
git init
git add .
git commit -m "chore: initialize Next.js project with TypeScript and Tailwind"
```

---

## Task 2: Configure Tailwind and Next.js

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `next.config.ts`

- [ ] **Step 1: Configure Tailwind with custom theme**

Replace content of `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#E31E24',
          black: '#0a0a0a',
          'pure-black': '#000000',
          charcoal: '#1a1a1a',
          'charcoal-light': '#2a2a2a',
          white: '#ffffff',
          gray: '#e5e5e5',
        },
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        breathe: {
          '0%, 100%': { filter: 'drop-shadow(0 0 8px rgba(227, 30, 36, 0.3))' },
          '50%': { filter: 'drop-shadow(0 0 16px rgba(227, 30, 36, 0.6))' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        breathe: 'breathe 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 2: Configure Next.js**

Replace content of `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Enable strict mode for better development experience
  reactStrictMode: true,
};

export default nextConfig;
```

- [ ] **Step 3: Verify configuration**

Run:
```bash
npm run build
```

Expected: Build completes successfully with no errors

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts next.config.ts
git commit -m "config: add custom Tailwind theme and Next.js configuration"
```

---

## Task 3: Create Constants Library

**Files:**
- Create: `lib/constants.ts`

- [ ] **Step 1: Create constants file**

Create `lib/constants.ts`:

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

export const ANIMATION_DELAYS = {
  particles: 0,
  globe: 500,
  logo: 1500,
  tagline: 2000,
  headline: 2500,
  description: 3000,
  contact: 3500,
} as const;
```

- [ ] **Step 2: Verify TypeScript compilation**

Run:
```bash
npx tsc --noEmit
```

Expected: No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add lib/constants.ts
git commit -m "feat: add constants for brand colors, messaging, and cities"
```

---

## Task 4: Create ParticleField Component

**Files:**
- Create: `components/ParticleField.tsx`

- [ ] **Step 1: Create ParticleField component**

Create `components/ParticleField.tsx`:

```typescript
'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

interface ParticleFieldProps {
  particleCount?: number;
}

export default function ParticleField({ particleCount = 200 }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Adaptive particle count based on screen size
    const getAdaptiveCount = () => {
      const width = window.innerWidth;
      if (width < 768) return Math.min(particleCount, 75);
      if (width < 1024) return Math.min(particleCount, 150);
      return particleCount;
    };

    // Initialize particles
    const initParticles = () => {
      const count = getAdaptiveCount();
      particlesRef.current = Array.from({ length: count }, () => {
        const isRed = Math.random() < 0.1; // 10% red particles
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 2 + 1,
          color: isRed ? '#E31E24' : '#ffffff',
          alpha: Math.random() * 0.5 + 0.3,
        };
      });
    };
    initParticles();

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
```

- [ ] **Step 2: Verify TypeScript compilation**

Run:
```bash
npx tsc --noEmit
```

Expected: No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add components/ParticleField.tsx
git commit -m "feat: add ParticleField component with canvas animation"
```

---

## Task 5: Create Globe3D Component

**Files:**
- Create: `components/Globe3D.tsx`

- [ ] **Step 1: Create Globe3D component**

Create `components/Globe3D.tsx`:

```typescript
'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { CITIES, CONNECTIONS } from '@/lib/constants';

function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return new THREE.Vector3(x, y, z);
}

function GlobeScene() {
  const globeRef = useRef<THREE.Mesh>(null);
  const linesRef = useRef<THREE.Group>(null);

  // Create globe wireframe
  const globeGeometry = useMemo(() => {
    return new THREE.SphereGeometry(5, 32, 32);
  }, []);

  const globeMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: 0x1a1a1a,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
  }, []);

  // Create connection lines
  const connectionLines = useMemo(() => {
    const cityMap = new Map(CITIES.map(city => [city.name, city]));
    const lines: THREE.Line[] = [];

    CONNECTIONS.forEach(([city1Name, city2Name]) => {
      const city1 = cityMap.get(city1Name);
      const city2 = cityMap.get(city2Name);
      
      if (!city1 || !city2) return;

      const start = latLngToVector3(city1.lat, city1.lng, 5.1);
      const end = latLngToVector3(city2.lat, city2.lng, 5.1);

      // Create curved line using quadratic bezier
      const midPoint = new THREE.Vector3()
        .addVectors(start, end)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(6); // Arc height

      const curve = new THREE.QuadraticBezierCurve3(start, midPoint, end);
      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      
      const material = new THREE.LineBasicMaterial({
        color: 0xE31E24,
        transparent: true,
        opacity: 0.6,
      });

      const line = new THREE.Line(geometry, material);
      lines.push(line);
    });

    return lines;
  }, []);

  // Create city markers
  const cityMarkers = useMemo(() => {
    return CITIES.map(city => {
      const position = latLngToVector3(city.lat, city.lng, 5.1);
      return (
        <mesh key={city.name} position={position}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color={0xE31E24} />
        </mesh>
      );
    });
  }, []);

  // Animation
  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y += 0.002;
    }

    // Pulse effect on lines
    const time = state.clock.getElapsedTime();
    connectionLines.forEach((line, index) => {
      const material = line.material as THREE.LineBasicMaterial;
      material.opacity = 0.4 + Math.sin(time * 2 + index) * 0.3;
    });
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Globe */}
      <mesh ref={globeRef} geometry={globeGeometry} material={globeMaterial} />
      
      {/* Connection lines and markers */}
      <group ref={linesRef}>
        {connectionLines.map((line, index) => (
          <primitive key={index} object={line} />
        ))}
        {cityMarkers}
      </group>
    </>
  );
}

interface Globe3DProps {
  className?: string;
}

export default function Globe3D({ className = '' }: Globe3DProps) {
  return (
    <div className={`${className} w-full h-full`}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
      >
        <GlobeScene />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compilation**

Run:
```bash
npx tsc --noEmit
```

Expected: No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add components/Globe3D.tsx
git commit -m "feat: add Globe3D component with Three.js"
```

---

## Task 6: Create ContactInfo Component

**Files:**
- Create: `components/ContactInfo.tsx`

- [ ] **Step 1: Create ContactInfo component**

Create `components/ContactInfo.tsx`:

```typescript
'use client';

import { motion } from 'framer-motion';
import { CONTACT, MESSAGING } from '@/lib/constants';
import { useState } from 'react';

export default function ContactInfo() {
  const [copied, setCopied] = useState(false);

  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 3.5 }}
      className="space-y-4"
    >
      <p className="text-brand-gray text-sm md:text-base font-light tracking-wide">
        {MESSAGING.contactLabel}
      </p>
      
      <div className="space-y-3">
        {/* Email */}
        <motion.button
          onClick={handleEmailClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="block text-brand-white hover:text-brand-red transition-colors duration-300 group relative"
          aria-label={`Email: ${CONTACT.email}`}
        >
          <span className="text-lg md:text-xl font-medium group-hover:drop-shadow-[0_0_8px_rgba(227,30,36,0.6)] transition-all">
            {CONTACT.email}
          </span>
          {copied && (
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-brand-red text-white text-xs px-2 py-1 rounded">
              Copied!
            </span>
          )}
        </motion.button>

        {/* Phone */}
        <motion.a
          href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="block text-brand-white hover:text-brand-red transition-colors duration-300 group"
          aria-label={`Phone: ${CONTACT.phone}`}
        >
          <span className="text-lg md:text-xl font-medium group-hover:drop-shadow-[0_0_8px_rgba(227,30,36,0.6)] transition-all">
            {CONTACT.phone}
          </span>
        </motion.a>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compilation**

Run:
```bash
npx tsc --noEmit
```

Expected: No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add components/ContactInfo.tsx
git commit -m "feat: add ContactInfo component with copy-to-clipboard"
```

---

## Task 7: Create HeroSection Component

**Files:**
- Create: `components/HeroSection.tsx`

- [ ] **Step 1: Create HeroSection component**

Create `components/HeroSection.tsx`:

```typescript
'use client';

import { motion } from 'framer-motion';
import { MESSAGING } from '@/lib/constants';
import ContactInfo from './ContactInfo';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 1.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
};

const logoVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 1,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
};

const taglineVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const headlineVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
};

export default function HeroSection() {
  const taglineLetters = MESSAGING.tagline.split('');

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 md:px-12 text-center"
    >
      {/* Logo */}
      <motion.div variants={logoVariants} className="mb-8 md:mb-12">
        <Image
          src="/logos/logo 1@4x.png"
          alt="Prime Logistic Services"
          width={600}
          height={200}
          priority
          className="w-full max-w-md md:max-w-2xl h-auto animate-breathe"
        />
      </motion.div>

      {/* Tagline with letter animation */}
      <motion.div
        variants={taglineVariants}
        className="mb-6 md:mb-8 flex flex-wrap justify-center gap-1"
      >
        {taglineLetters.map((letter, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            className="text-brand-gray text-sm md:text-lg font-bold tracking-[0.3em] italic"
          >
            {letter === ' ' ? ' ' : letter}
          </motion.span>
        ))}
      </motion.div>

      {/* Headline */}
      <motion.h1
        variants={headlineVariants}
        className="text-5xl md:text-7xl lg:text-8xl font-bold text-brand-white mb-8 md:mb-12 tracking-tight"
      >
        {MESSAGING.headline}
      </motion.h1>

      {/* Description */}
      <motion.p
        variants={itemVariants}
        className="text-brand-gray text-base md:text-xl lg:text-2xl max-w-3xl mb-12 md:mb-16 leading-relaxed font-light"
      >
        {MESSAGING.description}
      </motion.p>

      {/* Contact Info */}
      <ContactInfo />
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compilation**

Run:
```bash
npx tsc --noEmit
```

Expected: No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add components/HeroSection.tsx
git commit -m "feat: add HeroSection with animated logo and typography"
```

---

## Task 8: Create Global Styles

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Update global styles**

Replace content of `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-brand-black text-brand-white antialiased;
    font-feature-settings: "rlig" 1, "calt" 1;
  }

  html {
    scroll-behavior: smooth;
  }

  /* Disable animations for users who prefer reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #0a0a0a;
}

::-webkit-scrollbar-thumb {
  background: #1a1a1a;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #E31E24;
}
```

- [ ] **Step 2: Verify build**

Run:
```bash
npm run build
```

Expected: Build succeeds with no errors

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "style: add global styles with brand colors and scrollbar"
```

---

## Task 9: Create Root Layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update root layout with metadata**

Replace content of `app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Prime Logistic Services - Coming Soon | Global B2B Logistics",
  description: "Premium B2B logistics solutions coming soon. Dependable global delivery services for businesses that demand excellence.",
  keywords: ["B2B logistics", "global delivery", "business shipping", "logistics services", "international freight", "supply chain solutions"],
  authors: [{ name: "Prime Logistic Services" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://primelogisticservices.com",
    title: "Prime Logistic Services - Coming Soon | Global B2B Logistics",
    description: "Premium B2B logistics solutions coming soon. Dependable global delivery services for businesses that demand excellence.",
    siteName: "Prime Logistic Services",
    images: [
      {
        url: "/logos/logo 1@4x.png",
        width: 1200,
        height: 630,
        alt: "Prime Logistic Services Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prime Logistic Services - Coming Soon | Global B2B Logistics",
    description: "Premium B2B logistics solutions coming soon. Dependable global delivery services for businesses that demand excellence.",
    images: ["/logos/logo 1@4x.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify TypeScript compilation**

Run:
```bash
npx tsc --noEmit
```

Expected: No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add root layout with SEO metadata and analytics placeholder"
```

---

## Task 10: Create Main Page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Update main page to orchestrate components**

Replace content of `app/page.tsx`:

```typescript
import dynamic from 'next/dynamic';
import ParticleField from '@/components/ParticleField';
import HeroSection from '@/components/HeroSection';
import { MESSAGING } from '@/lib/constants';

// Dynamically import Globe3D to reduce initial bundle
const Globe3D = dynamic(() => import('@/components/Globe3D'), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-brand-pure-black via-brand-black to-brand-charcoal overflow-hidden">
      {/* Background Layer: Particles */}
      <ParticleField particleCount={200} />

      {/* Mid Layer: Globe */}
      <div className="fixed inset-0 z-0 flex items-center justify-center opacity-40 md:opacity-60">
        <div className="w-full h-full max-w-4xl">
          <Globe3D />
        </div>
      </div>

      {/* Foreground: Content */}
      <HeroSection />

      {/* Footer */}
      <footer className="relative z-10 pb-8 text-center">
        <p className="text-brand-gray text-xs md:text-sm">
          {MESSAGING.copyright}
        </p>
      </footer>
    </main>
  );
}
```

- [ ] **Step 2: Verify TypeScript compilation**

Run:
```bash
npx tsc --noEmit
```

Expected: No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: create main page with layered particle, globe, and hero"
```

---

## Task 11: Create SEO Files

**Files:**
- Create: `public/robots.txt`
- Create: `app/sitemap.ts`

- [ ] **Step 1: Create robots.txt**

Create `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://primelogisticservices.com/sitemap.xml
```

- [ ] **Step 2: Create dynamic sitemap**

Create `app/sitemap.ts`:

```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://primelogisticservices.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
```

- [ ] **Step 3: Verify sitemap generation**

Run:
```bash
npm run build
```

Expected: Build succeeds, sitemap.xml generated in `.next`

- [ ] **Step 4: Commit**

```bash
git add public/robots.txt app/sitemap.ts
git commit -m "feat: add robots.txt and dynamic sitemap"
```

---

## Task 12: Optimize Logo Assets

**Files:**
- Verify: `public/logos/`

- [ ] **Step 1: Check logo files exist**

Run:
```bash
ls -la public/logos/
```

Expected: See `logo 1@4x.png` and `logo 2@4x.png`

- [ ] **Step 2: Create optimized versions if needed**

If logos are very large (>500KB), consider optimizing:

```bash
# This is optional - Next.js Image component will optimize automatically
# Only run if you want to manually optimize
# brew install imagemagick (if not installed)
# cd public/logos
# convert "logo 1@4x.png" -quality 85 -resize 2000x "logo-1-optimized.png"
```

For this project, we'll rely on Next.js automatic optimization.

- [ ] **Step 3: Verify images load in dev**

Run:
```bash
npm run dev
```

Visit http://localhost:3000 and verify logo appears

Expected: Logo displays without errors

- [ ] **Step 4: No commit needed (assets already exist)**

---

## Task 13: Test and Polish

**Files:**
- Test all components and interactions

- [ ] **Step 1: Run dev server and test functionality**

Run:
```bash
npm run dev
```

Open http://localhost:3000 and verify:
- ✅ Particle field animates smoothly
- ✅ Globe rotates with connection lines pulsing
- ✅ Logo entrance animation plays
- ✅ Tagline letters stagger in
- ✅ Headline scales in dramatically
- ✅ Description fades in
- ✅ Contact info appears last
- ✅ Email click copies to clipboard (check browser console)
- ✅ Phone link works (tel: link)
- ✅ Hover effects on contact info work

- [ ] **Step 2: Test responsive design**

In browser DevTools, test breakpoints:
- Mobile (375px): Content readable, globe subtle, reduced particles
- Tablet (768px): Balanced layout
- Desktop (1440px): Full experience

Expected: Responsive design works across all sizes

- [ ] **Step 3: Test performance**

In DevTools Lighthouse, run audit:

Expected scores:
- Performance: >85
- Accessibility: >90
- Best Practices: >90
- SEO: 100

- [ ] **Step 4: Check for console errors**

Inspect browser console while page loads

Expected: No errors or warnings

- [ ] **Step 5: Test accessibility**

- Tab through interactive elements (email, phone)
- Verify focus states visible
- Test with screen reader (optional)

Expected: Keyboard navigation works, focus indicators visible

---

## Task 14: Production Build and Optimization

**Files:**
- Verify production build

- [ ] **Step 1: Create production build**

Run:
```bash
npm run build
```

Expected: Build completes successfully with bundle analysis output

- [ ] **Step 2: Test production build locally**

Run:
```bash
npm run start
```

Visit http://localhost:3000

Expected: Production build runs correctly, animations smooth

- [ ] **Step 3: Check bundle sizes**

Review build output for bundle sizes:
- Page size should be <500KB (First Load JS)
- Three.js and Framer Motion should be code-split

Expected: Reasonable bundle sizes with code splitting

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "test: verify production build and performance"
```

---

## Task 15: Prepare for Vercel Deployment

**Files:**
- Create: `.env.local.example`
- Create: `README.md`

- [ ] **Step 1: Create environment variable example**

Create `.env.local.example`:

```env
# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

- [ ] **Step 2: Create README**

Create `README.md`:

```markdown
# Prime Logistic Services - Coming Soon Page

Premium coming soon page for Prime Logistic Services with 3D globe, particle animations, and theatrical entrance sequences.

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js & React Three Fiber

## Getting Started

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Run development server:
\`\`\`bash
npm run dev
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create `.env.local` for optional configuration:

\`\`\`env
NEXT_PUBLIC_GA_ID=your-google-analytics-id
\`\`\`

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Configure domain
4. Deploy

Build command: \`npm run build\`  
Output directory: \`.next\`

## Project Structure

\`\`\`
├── app/              # Next.js app directory
├── components/       # React components
├── lib/             # Constants and utilities
├── public/          # Static assets
└── docs/            # Documentation
\`\`\`

## Performance

- First Contentful Paint: <1.5s
- Lighthouse Score: >90
- Responsive design (mobile, tablet, desktop)
- Graceful degradation for low-end devices

## Future Extensions

This foundation supports adding:
- /services page
- /about page
- /tracking page
- Full contact form

## License

© 2026 Prime Logistic Services. All rights reserved.
```

- [ ] **Step 3: Verify files**

Run:
```bash
cat .env.local.example README.md
```

Expected: Files created with correct content

- [ ] **Step 4: Commit**

```bash
git add .env.local.example README.md
git commit -m "docs: add environment example and README"
```

---

## Task 16: Final Verification

**Files:**
- Verify all files and functionality

- [ ] **Step 1: Run full TypeScript check**

Run:
```bash
npx tsc --noEmit
```

Expected: No TypeScript errors

- [ ] **Step 2: Run ESLint**

Run:
```bash
npm run lint
```

Expected: No linting errors (or only minor warnings)

- [ ] **Step 3: Verify all components exist**

Run:
```bash
ls -R app components lib public
```

Expected: All files from plan exist

- [ ] **Step 4: Final production build**

Run:
```bash
npm run build
npm run start
```

Test full user journey:
1. Page loads with particles
2. Globe appears and rotates
3. Logo animates in
4. Tagline letters stagger
5. Headline scales in
6. Description fades in
7. Contact info appears
8. Email click copies
9. Phone link works
10. Responsive on mobile

Expected: All functionality works perfectly

- [ ] **Step 5: Create final commit**

```bash
git add .
git commit -m "feat: complete Prime Logistic Services coming soon page"
```

---

## Deployment Instructions

### Deploy to Vercel

1. **Push to GitHub:**
```bash
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Import in Vercel:**
- Visit [vercel.com](https://vercel.com)
- Click "Import Project"
- Select your GitHub repository
- Vercel auto-detects Next.js settings

3. **Configure Domain:**
- In Vercel project settings, add custom domain
- Point DNS to Vercel (they provide instructions)

4. **Optional - Add Analytics:**
- In Vercel project settings, add environment variable:
  - Key: `NEXT_PUBLIC_GA_ID`
  - Value: Your Google Analytics ID

5. **Deploy:**
- Vercel deploys automatically on git push
- View deployment at provided URL

### Post-Deployment Checklist

- [ ] Verify site loads at production URL
- [ ] Test on mobile device
- [ ] Check SEO meta tags with view-source
- [ ] Verify sitemap at `/sitemap.xml`
- [ ] Test robots.txt at `/robots.txt`
- [ ] Submit sitemap to Google Search Console (optional)

---

## Success Criteria

✅ All components render without errors  
✅ Animations play smoothly (60fps target)  
✅ Responsive design works on all breakpoints  
✅ SEO meta tags implemented correctly  
✅ Production build succeeds  
✅ Lighthouse scores >90  
✅ No TypeScript or linting errors  
✅ Deployed to Vercel successfully  

---

## Estimated Timeline

- Tasks 1-3 (Setup): 30 minutes
- Tasks 4-7 (Components): 2-3 hours
- Tasks 8-11 (Integration): 1-2 hours
- Tasks 12-16 (Testing & Polish): 1-2 hours

**Total: 5-8 hours of focused development**
