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
    <div className="space-y-5 sm:space-y-6">
      {/* Contact Button */}
      <motion.button
        onClick={handleEmailClick}
        whileHover={{ scale: 1.05, backgroundColor: '#ffffff', color: '#000000' }}
        whileTap={{ scale: 0.95 }}
        className="relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 border-2 border-brand-white text-brand-white font-semibold tracking-wide uppercase text-xs sm:text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
      >
        Contact Us
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -top-10 sm:-top-12 left-1/2 transform -translate-x-1/2 bg-brand-red text-white text-xs px-3 py-1.5 rounded whitespace-nowrap shadow-lg"
          >
            Email copied!
          </motion.span>
        )}
      </motion.button>

      {/* Divider */}
      <div className="pt-1 sm:pt-2">
        <p className="text-brand-gray text-xs sm:text-sm font-light tracking-wide mb-2.5 sm:mb-3">
          {MESSAGING.contactLabel}
        </p>

        <div className="space-y-2 sm:space-y-2.5">
          {/* Email */}
          <motion.button
            onClick={handleEmailClick}
            whileHover={{ x: 4 }}
            className="block text-brand-white hover:text-brand-red transition-colors duration-300 text-left"
            aria-label={`Email: ${CONTACT.email}`}
          >
            <span className="text-xs sm:text-sm md:text-base font-medium">
              {CONTACT.email}
            </span>
          </motion.button>

          {/* Phone */}
          <motion.a
            href={`tel:${CONTACT.phone1.replace(/\s/g, '')}`}
            whileHover={{ x: 4 }}
            className="block text-brand-white hover:text-brand-red transition-colors duration-300"
            aria-label={`Phone: ${CONTACT.phone1}`}
          >
            <span className="text-xs sm:text-sm md:text-base font-medium">
              {CONTACT.phone1}
            </span>
          </motion.a>
          <motion.a
            href={`tel:${CONTACT.phone2.replace(/\s/g, '')}`}
            whileHover={{ x: 4 }}
            className="block text-brand-white hover:text-brand-red transition-colors duration-300"
            aria-label={`Phone: ${CONTACT.phone2}`}
          >
            <span className="text-xs sm:text-sm md:text-base font-medium">
              {CONTACT.phone2}
            </span>
          </motion.a>
          <motion.a
            href={`tel:${CONTACT.phone3.replace(/\s/g, '')}`}
            whileHover={{ x: 4 }}
            className="block text-brand-white hover:text-brand-red transition-colors duration-300"
            aria-label={`Phone: ${CONTACT.phone3}`}
          >
            <span className="text-xs sm:text-sm md:text-base font-medium">
              {CONTACT.phone3}
            </span>
          </motion.a>
          <motion.a
            href={`tel:${CONTACT.phone4.replace(/\s/g, '')}`}
            whileHover={{ x: 4 }}
            className="block text-brand-white hover:text-brand-red transition-colors duration-300"
            aria-label={`Phone: ${CONTACT.phone4}`}
          >
            <span className="text-xs sm:text-sm md:text-base font-medium">
              {CONTACT.phone4}
            </span>
          </motion.a>
        </div>
      </div>
    </div>
  );
}
