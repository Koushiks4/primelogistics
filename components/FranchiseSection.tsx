'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Handshake, TrendingUp, Users, Award, ArrowRight } from 'lucide-react';

const benefits = [
  { icon: TrendingUp, title: 'High Growth Potential', description: 'Be part of India\'s fastest-growing logistics network with proven business models' },
  { icon: Users, title: 'Full Training & Support', description: 'Comprehensive onboarding, training programs, and ongoing operational support' },
  { icon: Award, title: 'Established Brand', description: 'Leverage our brand reputation, technology platform, and marketing materials' },
  { icon: Handshake, title: 'Low Investment', description: 'Flexible investment tiers starting from ₹5 Lakhs with quick ROI' },
];

export default function FranchiseSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="franchise" ref={ref} className="relative py-28 bg-brand-charcoal overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(227,30,36,0.08),_transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — CTA */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-red text-sm font-semibold tracking-widest uppercase">Franchise</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6 leading-tight">
              Partner with <span className="text-brand-red">Prime</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Join India&apos;s expanding logistics network. We provide the technology, brand, and operational playbook — you provide the local expertise. Start your logistics franchise with Prime Logistic Services.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-red text-white font-semibold rounded-lg hover:bg-red-600 transition-all hover:shadow-[0_0_30px_rgba(227,30,36,0.3)] group"
            >
              Apply for Franchise
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Right — Benefits grid */}
          <div className="grid grid-cols-2 gap-4">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  className="bg-brand-pure-black/50 border border-white/5 rounded-2xl p-6 hover:border-brand-red/20 transition-all duration-500"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-red/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-brand-red" />
                  </div>
                  <h3 className="text-white font-semibold mb-2 text-sm">{benefit.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
