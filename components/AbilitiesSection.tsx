'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Boxes, BarChart3, Route, ShieldCheck, Timer, Warehouse } from 'lucide-react';

const abilities = [
  { icon: Route, title: 'Route Optimization', description: 'AI-powered routing for fastest delivery times' },
  { icon: Boxes, title: 'Bulk Shipping', description: 'Volume discounts for high-quantity shipments' },
  { icon: BarChart3, title: 'Analytics Dashboard', description: 'Real-time insights into your shipping operations' },
  { icon: ShieldCheck, title: 'Insured Shipping', description: 'Full coverage for high-value consignments' },
  { icon: Timer, title: 'Express Delivery', description: 'Time-critical same-day delivery services' },
  { icon: Warehouse, title: 'Warehousing', description: 'Secure storage and fulfillment solutions' },
];

export default function AbilitiesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-28 bg-brand-pure-black overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand-red text-sm font-semibold tracking-widest uppercase">Why Choose Us</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
            Capabilities that set us <span className="text-brand-red">apart</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {abilities.map((ability, i) => {
            const Icon = ability.icon;
            return (
              <motion.div
                key={ability.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative"
              >
                <div className="bg-brand-charcoal/50 border border-white/5 rounded-2xl p-8 h-full hover:border-brand-red/30 transition-all duration-500 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center mb-5 group-hover:bg-brand-red group-hover:text-white transition-all duration-500">
                    <Icon className="w-6 h-6 text-brand-red group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{ability.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{ability.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
