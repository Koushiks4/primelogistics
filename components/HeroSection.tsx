'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Weight, Truck, Plane, CheckCircle, Send } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function HeroSection({ onTrackOpen }: { onTrackOpen?: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');
  const [shipmentType, setShipmentType] = useState<'domestic' | 'international'>('domestic');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/forms/shipment-enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, phone,
          origin_city: origin,
          destination_city: destination,
          shipment_type: shipmentType,
          approximate_weight: weight,
          message: `Quote request: ${weight || 'N/A'} from ${origin} to ${destination} (${shipmentType})`,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to submit');
      }
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSuccess(false);
    setName(''); setEmail(''); setPhone('');
    setOrigin(''); setDestination(''); setWeight('');
    setError('');
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-brand-red transition-colors text-sm";

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-pure-black via-brand-charcoal to-brand-pure-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(227,30,36,0.15),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(227,30,36,0.1),_transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-brand-red/30 rounded-full"
          style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text + CTAs */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1.5 border border-brand-red/30 rounded-full text-xs text-brand-red tracking-widest uppercase mb-8">
                Domestic & International Shipping
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[0.92] mb-6"
            >
              <span className="text-white">Delivering</span>
              <br />
              <span className="text-brand-red">Beyond</span>{' '}
              <span className="text-white">Boundaries</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base lg:text-lg text-gray-400 max-w-md mb-10 leading-relaxed"
            >
              Tech-driven logistics solutions built to fuel the difference in your business.
              We make shipping seamless, reliable, and transparent.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <a href="#contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-red text-white font-semibold rounded-lg hover:bg-red-600 transition-all hover:shadow-[0_0_30px_rgba(227,30,36,0.3)] group">
                Contact Us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={onTrackOpen}
                className="px-8 py-3.5 border border-white/20 text-white font-semibold rounded-lg hover:border-white/40 hover:bg-white/5 transition-all"
              >
                Track Shipment
              </button>
            </motion.div>
          </div>

          {/* Right — Quote Form */}
          <motion.div
            id="quote"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="bg-brand-charcoal/60 backdrop-blur-xl border border-white/10 rounded-2xl p-7 shadow-2xl">
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-8 text-center"
                  >
                    <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">Quote Request Submitted!</h3>
                    <p className="text-sm text-gray-400 mb-4">Our team will get back to you within 24 hours.</p>
                    <button onClick={resetForm} className="text-sm text-brand-red hover:text-red-400 transition-colors">
                      Submit another enquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                  >
                    <h3 className="text-lg font-bold text-white mb-1">Get a Shipping Quote</h3>
                    <p className="text-xs text-gray-500 mb-5">Fill in your shipment details for instant pricing</p>

                    {/* Shipment type toggle */}
                    <div className="flex rounded-lg overflow-hidden border border-white/10 mb-4">
                      <button
                        type="button"
                        onClick={() => setShipmentType('domestic')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-medium transition-all ${
                          shipmentType === 'domestic' ? 'bg-brand-red text-white' : 'bg-white/5 text-gray-400 hover:text-white'
                        }`}
                      >
                        <Truck className="w-3.5 h-3.5" /> Domestic
                      </button>
                      <button
                        type="button"
                        onClick={() => setShipmentType('international')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-medium transition-all ${
                          shipmentType === 'international' ? 'bg-brand-red text-white' : 'bg-white/5 text-gray-400 hover:text-white'
                        }`}
                      >
                        <Plane className="w-3.5 h-3.5" /> International
                      </button>
                    </div>

                    {/* Route */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-[11px] text-gray-500 uppercase tracking-wider mb-1">Origin *</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                          <input type="text" required value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="From city" className={`${inputClass} pl-9`} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] text-gray-500 uppercase tracking-wider mb-1">Destination *</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-red" />
                          <input type="text" required value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="To city" className={`${inputClass} pl-9`} />
                        </div>
                      </div>
                    </div>

                    {/* Weight */}
                    <div className="mb-3">
                      <label className="block text-[11px] text-gray-500 uppercase tracking-wider mb-1">Approx. Weight</label>
                      <div className="relative">
                        <Weight className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                        <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 5 kg" className={`${inputClass} pl-9`} />
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="mb-3">
                      <label className="block text-[11px] text-gray-500 uppercase tracking-wider mb-1">Name *</label>
                      <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={inputClass} />
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <label className="block text-[11px] text-gray-500 uppercase tracking-wider mb-1">Email *</label>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-[11px] text-gray-500 uppercase tracking-wider mb-1">Phone *</label>
                        <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765..." className={inputClass} />
                      </div>
                    </div>

                    {error && <p className="text-xs text-red-400 mb-3">{error}</p>}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 bg-brand-red text-white font-semibold rounded-lg hover:bg-red-600 transition-all hover:shadow-[0_0_30px_rgba(227,30,36,0.3)] flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      {loading ? 'Submitting...' : 'Get Quote'}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-brand-red rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
