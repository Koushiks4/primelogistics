'use client';

import { motion } from 'framer-motion';

export default function BackgroundAnimations() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Red floating orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(227, 30, 36, 0.15) 0%, rgba(227, 30, 36, 0) 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          x: ['-10%', '110%'],
          y: ['20%', '80%'],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(227, 30, 36, 0.12) 0%, rgba(227, 30, 36, 0) 70%)',
          filter: 'blur(50px)',
        }}
        animate={{
          x: ['100%', '-10%'],
          y: ['70%', '10%'],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(227, 30, 36, 0.1) 0%, rgba(227, 30, 36, 0) 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: ['50%', '30%', '50%'],
          y: ['30%', '60%', '30%'],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5,
        }}
      />

      {/* Subtle particles - with fixed positions to avoid hydration mismatch */}
      {[
        { left: 10, top: 20 },
        { left: 25, top: 45 },
        { left: 40, top: 15 },
        { left: 55, top: 70 },
        { left: 70, top: 30 },
        { left: 85, top: 60 },
        { left: 15, top: 80 },
        { left: 30, top: 50 },
        { left: 45, top: 25 },
        { left: 60, top: 65 },
        { left: 75, top: 40 },
        { left: 90, top: 75 },
        { left: 20, top: 35 },
        { left: 35, top: 55 },
        { left: 50, top: 10 },
        { left: 65, top: 85 },
        { left: 80, top: 50 },
        { left: 5, top: 40 },
        { left: 95, top: 20 },
        { left: 12, top: 90 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-brand-red rounded-full"
          style={{
            left: `${pos.left}%`,
            top: `${pos.top}%`,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: i * 0.25,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
