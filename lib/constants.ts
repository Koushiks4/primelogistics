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
  description: 'Tech-driven team to fuel the difference in logistics. We built technology to make a meaningful difference for your business and your people. We can\'t wait to innovate with you.',
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
