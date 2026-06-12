'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Handshake, TrendingUp, Users, Award, ArrowRight, Send, CheckCircle } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const benefits = [
  { icon: TrendingUp, title: 'High Growth Potential', description: 'Be part of India\'s fastest-growing logistics network with proven business models' },
  { icon: Users, title: 'Full Training & Support', description: 'Comprehensive onboarding, training programs, and ongoing operational support' },
  { icon: Award, title: 'Established Brand', description: 'Leverage our brand reputation, technology platform, and marketing materials' },
  { icon: Handshake, title: 'Low Investment', description: 'Flexible investment tiers starting from ₹5 Lakhs with quick ROI' },
];

export default function FranchiseSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [investmentBudget, setInvestmentBudget] = useState('');
  const [businessExperience, setBusinessExperience] = useState('');
  const [message, setMessage] = useState('');

  const resetForm = () => {
    setName(''); setEmail(''); setPhone(''); setCity('');
    setInvestmentBudget(''); setBusinessExperience(''); setMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess(false);
    try {
      const res = await fetch(`${API_URL}/api/forms/franchise-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, phone,
          city_location: city,
          investment_budget: investmentBudget,
          business_experience: businessExperience || undefined,
          message: message || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to submit');
      }
      setSuccess(true);
      resetForm();
      setTimeout(() => setShowForm(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-brand-pure-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-red transition-colors text-sm";
  const labelClass = "block text-sm text-gray-400 mb-1.5";

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
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-red text-white font-semibold rounded-lg hover:bg-red-600 transition-all hover:shadow-[0_0_30px_rgba(227,30,36,0.3)] group"
            >
              {showForm ? 'Hide Form' : 'Apply for Franchise'}
              <ArrowRight className={`w-4 h-4 transition-transform ${showForm ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
            </button>
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

        {/* Franchise Application Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 64 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="bg-brand-pure-black/50 border border-white/5 rounded-2xl p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Franchise Application
                </h3>

                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <p className="text-sm text-green-400">
                      Thank you! We&apos;ll review your application and get back to you shortly.
                    </p>
                  </motion.div>
                )}

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}

                {!success && (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Name *</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your full name"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Email *</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Phone *</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 9876543210"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>City/Location *</label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="e.g. Bangalore"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Investment Budget Range *</label>
                      <select
                        required
                        value={investmentBudget}
                        onChange={(e) => setInvestmentBudget(e.target.value)}
                        className={inputClass}
                      >
                        <option value="">Select budget range</option>
                        <option value="5-10 lakhs">₹5-10 Lakhs</option>
                        <option value="10-20 lakhs">₹10-20 Lakhs</option>
                        <option value="20-50 lakhs">₹20-50 Lakhs</option>
                        <option value="50+ lakhs">₹50+ Lakhs</option>
                      </select>
                    </div>

                    <div>
                      <label className={labelClass}>Business Experience (Optional)</label>
                      <input
                        type="text"
                        value={businessExperience}
                        onChange={(e) => setBusinessExperience(e.target.value)}
                        placeholder="Years in business or relevant experience"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Additional Message (Optional)</label>
                      <textarea
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us why you want to become a franchise partner"
                        className={inputClass}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-red text-white font-semibold rounded-lg hover:bg-red-600 transition-all disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      {loading ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
