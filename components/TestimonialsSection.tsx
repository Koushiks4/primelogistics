'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  { name: 'Rajesh Sharma', company: 'TechVista Solutions', review: 'Prime Logistics transformed our supply chain. Deliveries are faster and tracking is seamless. Best logistics partner we\'ve had.' },
  { name: 'Priya Nair', company: 'FreshFoods Ltd', review: 'Their cold chain logistics is exceptional. Temperature-sensitive products arrive in perfect condition every time.' },
  { name: 'Amit Gupta', company: 'AutoParts Hub', review: 'The real-time tracking and automated notifications have saved us countless hours. Our customers love the transparency.' },
  { name: 'Sneha Reddy', company: 'TexStyle Exports', review: 'International shipping was always a headache until we partnered with Prime. Their customs clearance support is top-notch.' },
  { name: 'Vikram Joshi', company: 'BuildMart Materials', review: 'Reliable, affordable, and always on time. We\'ve been shipping with Prime for over a year with zero complaints.' },
  { name: 'Kavya Menon', company: 'EcoGreen Industries', review: 'The franchise model is brilliant. Within 6 months, our franchise was profitable. Great support from the Prime team.' },
];

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="flex-shrink-0 w-[400px] bg-brand-charcoal/50 border border-white/5 rounded-2xl p-8 mx-3">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-brand-red fill-brand-red" />
        ))}
      </div>
      <p className="text-gray-300 text-sm leading-relaxed mb-6">&ldquo;{testimonial.review}&rdquo;</p>
      <div>
        <p className="text-white font-semibold text-sm">{testimonial.name}</p>
        <p className="text-gray-500 text-xs">{testimonial.company}</p>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-28 bg-brand-pure-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-brand-red text-sm font-semibold tracking-widest uppercase">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
            Trusted by <span className="text-brand-red">businesses</span> nationwide
          </h2>
        </motion.div>
      </div>

      {/* Infinite marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-pure-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-pure-black to-transparent z-10" />

        <motion.div
          className="flex"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ x: { duration: 30, repeat: Infinity, ease: 'linear' } }}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={i} testimonial={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
