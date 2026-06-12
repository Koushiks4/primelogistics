'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import TrackModal from '@/components/TrackModal';
import FloatingQuotePill from '@/components/FloatingQuotePill';
import MetricsSection from '@/components/MetricsSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import AbilitiesSection from '@/components/AbilitiesSection';
import FranchiseSection from '@/components/FranchiseSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  const [trackModalOpen, setTrackModalOpen] = useState(false);

  return (
    <main className="relative min-h-screen w-full bg-brand-pure-black overflow-x-hidden">
      <Navigation onTrackOpen={() => setTrackModalOpen(true)} />
      <HeroSection onTrackOpen={() => setTrackModalOpen(true)} />
      <MetricsSection />
      <AboutSection />
      <ServicesSection />
      <AbilitiesSection />
      <FranchiseSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer onTrackOpen={() => setTrackModalOpen(true)} />
      <TrackModal isOpen={trackModalOpen} onClose={() => setTrackModalOpen(false)} />
      <FloatingQuotePill />
    </main>
  );
}
