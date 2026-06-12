'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator } from 'lucide-react';

export default function FloatingQuotePill() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#home"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 bg-brand-red text-white font-semibold rounded-full shadow-[0_4px_20px_rgba(227,30,36,0.4)] hover:bg-red-600 hover:shadow-[0_4px_30px_rgba(227,30,36,0.5)] transition-all group"
        >
          <Calculator className="w-4 h-4" />
          <span className="text-sm">Get a Quote</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
