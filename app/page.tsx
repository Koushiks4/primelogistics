'use client';

import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import MetricsSection from '@/components/MetricsSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import AbilitiesSection from '@/components/AbilitiesSection';
import FranchiseSection from '@/components/FranchiseSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-brand-pure-black overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <MetricsSection />
      <AboutSection />
      <ServicesSection />
      <AbilitiesSection />
      <FranchiseSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
