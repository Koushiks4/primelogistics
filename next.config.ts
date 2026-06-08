import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Enable strict mode for better development experience
  reactStrictMode: true,
};

export default nextConfig;
