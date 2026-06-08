'use client';

import Image from 'next/image';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import BackgroundAnimations from '@/components/BackgroundAnimations';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-brand-pure-black overflow-x-hidden flex flex-col">
      {/* Full Screen Background Image */}
      <div className="fixed inset-0 w-full h-full z-0">
        <Image
          src="/logoimage.png"
          alt="Prime Logistic Services Background"
          fill
          sizes="100vw"
          className="object-cover animate-subtle-zoom"
          priority
          quality={100}
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-brand-pure-black/70" />

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 via-transparent to-brand-red/10 animate-gradient-shift" />
      </div>

      {/* Background Animations */}
      <BackgroundAnimations />

      {/* Header */}
      <div className="relative z-10">
        <Header />
      </div>

      {/* Main Content Container */}
      <section className="relative flex-1 w-full pt-24 pb-8 flex items-center z-10">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          {/* Left-aligned Content */}
          <div className="flex items-center">
            <div className="relative z-10 max-w-2xl">
              <HeroSection />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
