'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What areas do you cover for domestic shipping?',
    answer: 'We cover 500+ cities across India with our extensive network of delivery partners. This includes all major metros, tier-2, and tier-3 cities. For remote locations, delivery timelines may vary.',
  },
  {
    question: 'How can I track my shipment?',
    answer: 'You can track your shipment using the AWB (Air Waybill) number or LR (Lorry Receipt) number provided at the time of booking. Simply click "Track Shipment" on our website and enter your tracking number for real-time updates.',
  },
  {
    question: 'What are the international shipping destinations?',
    answer: 'We currently ship to 50+ countries including UAE, Singapore, UK, USA, Canada, Australia, and many more. Both air freight and sea freight options are available depending on the destination.',
  },
  {
    question: 'How do I start a franchise with Prime Logistics?',
    answer: 'Starting a franchise is simple. Click "Apply for Franchise" and fill out the form with your details. Our team will review your application and connect with you within 48 hours. Investment starts from ₹5 Lakhs.',
  },
  {
    question: 'Do you offer insurance for shipments?',
    answer: 'Yes, we offer comprehensive insurance coverage for all shipments. Standard coverage is included for domestic shipments. For high-value or international consignments, additional insurance options are available at competitive rates.',
  },
  {
    question: 'What are your customer support hours?',
    answer: 'Our customer support team is available 24/7 via phone, email, and WhatsApp. For urgent shipment inquiries, you can reach us at +91 9739994318. Our support team typically responds within 15 minutes during business hours.',
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="border border-white/5 rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="text-white font-medium pr-8">{faq.question}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5 text-brand-red flex-shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-4">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="faqs" ref={ref} className="relative py-28 bg-brand-charcoal">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand-red text-sm font-semibold tracking-widest uppercase">FAQs</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
            Frequently asked <span className="text-brand-red">questions</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
