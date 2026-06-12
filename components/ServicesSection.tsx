'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Truck, Plane, CheckCircle } from 'lucide-react';

const services = [
  {
    icon: Truck,
    title: 'Domestic Shipping',
    description: 'Fast, reliable delivery across India with real-time tracking and multiple service tiers to match your needs.',
    features: ['Pan-India coverage across 500+ cities', 'Same-day & next-day express options', 'Real-time GPS tracking', 'Automated status notifications', 'Flexible pickup scheduling', 'Cash on Delivery support'],
  },
  {
    icon: Plane,
    title: 'International Shipping',
    description: 'Seamless cross-border logistics with customs clearance, documentation support, and end-to-end visibility.',
    features: ['Coverage in 50+ countries', 'Customs clearance & documentation', 'Air & sea freight options', 'Door-to-door delivery', 'Temperature-controlled shipping', 'Insurance & secure handling'],
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" ref={ref} className="relative py-28 bg-brand-charcoal">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(227,30,36,0.05),_transparent_60%)]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand-red text-sm font-semibold tracking-widest uppercase">Our Services</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
            Shipping <span className="text-brand-red">solutions</span> for every need
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.2 }}
                className="bg-brand-pure-black/60 border border-white/5 rounded-2xl p-10 hover:border-brand-red/20 transition-all duration-500 group relative overflow-hidden"
              >
                {/* Red glow on hover */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-red/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-brand-red/10 flex items-center justify-center mb-6 group-hover:bg-brand-red/20 transition-colors">
                    <Icon className="w-7 h-7 text-brand-red" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400 mb-8 leading-relaxed">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
