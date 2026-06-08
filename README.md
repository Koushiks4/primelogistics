# Prime Logistic Services - Landing Page

A modern, interactive landing page for Prime Logistic Services featuring 3D globe visualization, animated particles, and elegant typography.

## Features

- **3D Interactive Globe**: Built with Three.js and React Three Fiber, showcasing global logistics connections
- **Particle Animation**: Canvas-based particle field creating a dynamic background
- **Smooth Animations**: Framer Motion animations for logo entrance, tagline letter-by-letter reveal, and content transitions
- **Responsive Design**: Fully responsive layout optimized for mobile (375px), tablet (768px), and desktop (1440px+)
- **Contact Integration**: One-click email copy and phone calling functionality
- **SEO Optimized**: Comprehensive metadata, Open Graph tags, and sitemap

## Tech Stack

- **Framework**: Next.js 16.2.7 with Turbopack
- **React**: 19.2.4
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS 4
- **TypeScript**: Full type safety
- **Deployment Ready**: Static export compatible

## Getting Started

### Prerequisites

- Node.js 20+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd landing-page
```

2. Install dependencies
```bash
npm install
```

3. (Optional) Configure environment variables
```bash
cp .env.local.example .env.local
# Edit .env.local and add your Google Analytics ID
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Production Build

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm run start
```

### Type Checking and Linting

Run TypeScript type checking:

```bash
npx tsc --noEmit
```

Run ESLint:

```bash
npm run lint
```

## Project Structure

```
.
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ContactInfo.tsx      # Contact information with copy/call
│   ├── Globe3D.tsx          # 3D globe visualization
│   ├── HeroSection.tsx      # Main hero section with animations
│   └── ParticleField.tsx    # Particle background animation
├── lib/                     # Utilities and constants
│   └── constants.ts         # Brand colors, messaging, cities
├── public/                  # Static assets
│   ├── logos/               # Logo files
│   └── logo.png            # Main logo (symlink)
└── README.md
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms

This is a static Next.js site that can be deployed to:
- Netlify
- AWS S3 + CloudFront
- GitHub Pages
- Any static hosting service

Build the static export:

```bash
npm run build
```

The output will be in the `.next` directory.

## Customization

### Brand Colors

Edit `lib/constants.ts`:

```typescript
export const BRAND_COLORS = {
  red: '#E30613',
  white: '#FFFFFF',
  // ...
};
```

### Content

Update messaging in `lib/constants.ts`:

```typescript
export const MESSAGING = {
  tagline: 'Your Tagline',
  headline: 'Your Headline',
  // ...
};
```

### Cities/Connections

Modify the globe connections in `lib/constants.ts`:

```typescript
export const CITIES = [
  { name: 'City', lat: 0, lon: 0 },
  // ...
];
```

## Performance

- Lazy loading of 3D components
- Optimized images with Next.js Image
- Tree-shaking with Turbopack
- Static generation for fast load times

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Copyright 2025 Prime Logistic Services. All rights reserved.

## Support

For support, email: primelogisticservices@gmail.com
