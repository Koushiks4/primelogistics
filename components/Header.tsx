'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MESSAGING } from '@/lib/constants';

export default function Header() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/10"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-4 lg:py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src="/logos/logo14x-1002.png"
              alt="Prime Logistic Services Logo"
              width={300}
              height={100}
              priority
              className="w-auto h-10 sm:h-12 md:h-14 lg:h-16"
            />
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
