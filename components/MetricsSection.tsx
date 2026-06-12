'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Package, Clock, Headphones } from 'lucide-react';

const metrics = [
  { icon: MapPin, value: 500, suffix: '+', label: 'Cities Covered', description: 'Pan-India network' },
  { icon: Package, value: 10000, suffix: '+', label: 'Shipments Delivered', description: 'And counting' },
  { icon: Clock, value: 99.5, suffix: '%', label: 'On-Time Delivery', description: 'Industry leading' },
  { icon: Headphones, value: 24, suffix: '/7', label: 'Customer Support', description: 'Always available' },
];

function AnimatedCounter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  const display = target % 1 !== 0 ? count.toFixed(1) : count.toLocaleString();
  return <span>{display}{suffix}</span>;
}

export default function MetricsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-24 bg-brand-charcoal">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(227,30,36,0.05),_transparent_70%)]" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative group"
              >
                <div className="bg-brand-pure-black/50 border border-white/5 rounded-2xl p-8 text-center hover:border-brand-red/20 transition-all duration-500 hover:-translate-y-1">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-red/10 text-brand-red mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                    <AnimatedCounter target={metric.value} suffix={metric.suffix} inView={inView} />
                  </p>
                  <p className="text-sm font-medium text-white mb-1">{metric.label}</p>
                  <p className="text-xs text-gray-500">{metric.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
