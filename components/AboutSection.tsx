'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, Zap, Shield, Globe } from 'lucide-react';

const differentiators = [
  { icon: Zap, title: 'Express Delivery', description: 'Same-day and next-day delivery across major cities' },
  { icon: Shield, title: 'Secure Handling', description: 'Advanced packaging and real-time monitoring' },
  { icon: Globe, title: 'Global Reach', description: 'International shipping to 50+ countries' },
  { icon: Target, title: 'Precision Tracking', description: 'Live GPS tracking for every shipment' },
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} className="relative py-28 bg-brand-pure-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Story */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-red text-sm font-semibold tracking-widest uppercase">About Us</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6 leading-tight">
              Built for the <span className="text-brand-red">future</span> of logistics
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                Prime Logistic Services is a tech-driven logistics company dedicated to transforming how businesses ship domestically and internationally. We combine cutting-edge technology with operational excellence to deliver a seamless shipping experience.
              </p>
              <p>
                Our mission is simple — make logistics effortless. From real-time tracking to automated notifications, we&apos;ve built every touchpoint to give you complete visibility and control over your shipments.
              </p>
              <p>
                Whether you&apos;re shipping across cities or across continents, our network of trusted delivery partners ensures your packages reach their destination safely, on time, every time.
              </p>
            </div>
          </motion.div>

          {/* Right — Differentiator Cards */}
          <div className="grid grid-cols-2 gap-4">
            {differentiators.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  className="bg-brand-charcoal border border-white/5 rounded-2xl p-6 hover:border-brand-red/20 transition-all duration-500 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-red/10 flex items-center justify-center mb-4 group-hover:bg-brand-red/20 transition-colors">
                    <Icon className="w-5 h-5 text-brand-red" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
