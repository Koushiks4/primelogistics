'use client';

import { motion } from 'framer-motion';
import { MESSAGING } from '@/lib/constants';
import ContactInfo from './ContactInfo';

// Staggered container animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.5,
    },
  },
};

// Slide up and fade in
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.9] as const,
    },
  },
};

export default function HeroSection() {
  return (
    <motion.div
      className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <br></br>
      {/* Main Headline */}
      <motion.div variants={itemVariants} className="space-y-1">
        <h1 className="text-brand-white font-bold leading-[0.9] tracking-tight">
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            Launching
          </span>
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            soon
          </span>
        </h1>
      </motion.div>

      {/* Description */}
      <motion.div variants={itemVariants} className="max-w-xl lg:max-w-2xl">
        <p className="text-brand-gray text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed font-light">
          {MESSAGING.description}
        </p>
      </motion.div>

      {/* Contact Info */}
      <motion.div variants={itemVariants}>
        <ContactInfo />
      </motion.div>
    </motion.div>
  );
}
