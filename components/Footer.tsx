'use client';

import { useState } from 'react';
import { CONTACT, MESSAGING } from '@/lib/constants';
import { Mail, Phone, MapPin, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Franchise', href: '#franchise' },
  { label: 'FAQs', href: '#faqs' },
];

const services = [
  { label: 'Domestic Shipping', href: '#services' },
  { label: 'International Shipping', href: '#services' },
  { label: 'Express Delivery', href: '#services' },
  { label: 'Track Shipment', href: 'https://admin.primelogistic.com/track' },
];

const privacyContent = `
Prime Logistic Services ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information.

**Information We Collect**
We collect information you provide directly, including: name, email address, phone number, shipping addresses, business details, and payment information necessary for processing shipments.

**How We Use Your Information**
- To process and track shipments
- To communicate about your orders and account
- To send service updates and promotional materials (with your consent)
- To improve our services and customer experience
- To comply with legal obligations

**Data Security**
We implement industry-standard security measures to protect your data, including encryption, secure servers, and access controls. We never sell your personal information to third parties.

**Data Retention**
We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, including legal, accounting, or reporting requirements.

**Your Rights**
You have the right to access, correct, or delete your personal information. Contact us at ${CONTACT.email} for any privacy-related requests.

**Cookies**
Our website uses cookies to enhance your experience. You can manage cookie preferences through your browser settings.

This policy is effective as of January 2026 and may be updated periodically.
`;

const termsContent = `
These Terms and Conditions govern your use of Prime Logistic Services and the shipment of goods through our network.

**1. Service Agreement**
By using our services, you agree to these terms. We provide domestic and international shipping, warehousing, and logistics management services.

**2. Shipment Responsibility**
- Sender is responsible for proper packaging and accurate labeling
- Prohibited items include hazardous materials, illegal goods, and items restricted by applicable laws
- We reserve the right to inspect shipments for compliance

**3. Liability & Insurance**
- Standard liability coverage is included for all domestic shipments
- Additional insurance is available for high-value goods
- Our maximum liability is limited to the declared value of the shipment or the applicable insurance coverage
- We are not liable for delays caused by force majeure, customs, or regulatory actions

**4. Delivery & Timelines**
- Estimated delivery times are indicative and not guaranteed
- Delivery attempts will be made as per the service tier selected
- Unclaimed shipments may be returned to sender after 7 days

**5. Pricing & Payment**
- Rates are based on weight, dimensions, origin, destination, and service tier
- Payment is due upon booking unless credit terms are agreed
- All applicable taxes (GST) will be added to the invoice

**6. Claims & Disputes**
- Claims for loss or damage must be filed within 7 days of delivery (or expected delivery)
- Claims must include supporting documentation (photos, invoice, etc.)
- Disputes will be resolved under the jurisdiction of Bengaluru, Karnataka

**7. Franchise Terms**
- Franchise agreements are governed by separate franchise contracts
- Investment amounts, territories, and obligations are detailed in the franchise agreement

**8. Modifications**
We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of updated terms.

For questions, contact us at ${CONTACT.email} or call ${CONTACT.phone1}.
`;

function LegalModal({ title, content, onClose }: { title: string; content: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-brand-charcoal border border-white/10 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <div className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">
              {content.split('\n').map((line, i) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <p key={i} className="text-white font-semibold mt-4 mb-2">{line.replace(/\*\*/g, '')}</p>;
                }
                if (line.startsWith('- ')) {
                  return <p key={i} className="pl-4 mb-1">• {line.substring(2)}</p>;
                }
                if (line.trim() === '') return <br key={i} />;
                return <p key={i} className="mb-2">{line}</p>;
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Footer() {
  const [modal, setModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <>
      <footer className="relative bg-brand-charcoal border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Company Info + Map */}
            <div className="lg:col-span-1">
              <img src="/logos/logo14x-1002.png" alt="Prime Logistic Services" width={200} height={65} className="mb-5" />
              <div className="flex items-start gap-2 text-sm text-gray-400 mb-4">
                <MapPin className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                <p>2139, Ramesh Road, T. Dasarahalli,<br />Bengaluru 560057, Karnataka</p>
              </div>
              <div className="rounded-xl overflow-hidden border border-white/5 h-[150px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.0!2d77.5130!3d13.0450!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d!2sT.+Dasarahalli%2C+Bengaluru!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Prime Logistic Services Location"
                />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-gray-400 hover:text-brand-red transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service.label}>
                    <a href={service.href} className="text-sm text-gray-400 hover:text-brand-red transition-colors">
                      {service.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-2 text-sm text-gray-400">
                  <Mail className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                  <a href={`mailto:${CONTACT.email}`} className="hover:text-brand-red transition-colors">
                    {CONTACT.email}
                  </a>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-400">
                  <Phone className="w-4 h-4 text-brand-red flex-shrink-0 mt-1" />
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                    <a href={`tel:${CONTACT.phone1}`} className="hover:text-brand-red transition-colors">{CONTACT.phone1}</a>
                    <a href={`tel:${CONTACT.phone2}`} className="hover:text-brand-red transition-colors">{CONTACT.phone2}</a>
                    <a href={`tel:${CONTACT.phone3}`} className="hover:text-brand-red transition-colors">{CONTACT.phone3}</a>
                    <a href={`tel:${CONTACT.phone4}`} className="hover:text-brand-red transition-colors">{CONTACT.phone4}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">{MESSAGING.copyright}</p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setModal('privacy')}
                className="text-sm text-gray-500 hover:text-brand-red transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setModal('terms')}
                className="text-sm text-gray-500 hover:text-brand-red transition-colors"
              >
                Terms & Conditions
              </button>
              <a
                href="https://www.instagram.com/primelogisticservice?igsh=MWw0c3UzZ3J5c3Yxcw=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-red transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Modals */}
      {modal === 'privacy' && (
        <LegalModal title="Privacy Policy" content={privacyContent} onClose={() => setModal(null)} />
      )}
      {modal === 'terms' && (
        <LegalModal title="Terms & Conditions" content={termsContent} onClose={() => setModal(null)} />
      )}
    </>
  );
}
