'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, AlertCircle, Mail, Lock, LogOut, Package, MapPin, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface TrackingData {
  awb_number: string;
  partner_name?: string;
  partner_awb_number?: string;
  shipment_type: string;
  status: string;
  origin_city: string;
  destination_city: string;
  sender_name: string;
  receiver_name: string;
  order_status_history: Array<{
    id: string;
    status: string;
    location?: string;
    remarks?: string;
    created_at: string;
  }>;
}

interface Order {
  awb_number: string;
  status: string;
  origin_city: string;
  destination_city: string;
  receiver_name: string;
  shipment_type: string;
  created_at: string;
}

const statusBadge: Record<string, string> = {
  booked: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  picked_up: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  in_transit: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  out_for_delivery: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  delivered: 'bg-green-500/10 text-green-400 border-green-500/20',
  on_hold: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  returned: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
};

const statusDot: Record<string, string> = {
  booked: 'bg-blue-400',
  picked_up: 'bg-cyan-400',
  in_transit: 'bg-orange-400',
  out_for_delivery: 'bg-yellow-400',
  delivered: 'bg-green-400',
  on_hold: 'bg-gray-400',
  returned: 'bg-purple-400',
  cancelled: 'bg-red-400',
};

function fmt(s: string) {
  return s.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function fmtDate(d: string) {
  return new Date(d).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

type Tab = 'track' | 'orders';
type AuthStep = 'email' | 'otp' | 'list';

export default function TrackModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [tab, setTab] = useState<Tab>('track');

  // Track state
  const [awb, setAwb] = useState('');
  const [trackLoading, setTrackLoading] = useState(false);
  const [trackData, setTrackData] = useState<TrackingData | null>(null);
  const [trackError, setTrackError] = useState('');

  // My Orders state
  const [authStep, setAuthStep] = useState<AuthStep>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [fetchingOrders, setFetchingOrders] = useState(false);
  const [authError, setAuthError] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const doTrack = async (awbNum: string) => {
    if (!awbNum.trim()) return;
    setTrackLoading(true); setTrackError(''); setTrackData(null);
    try {
      const res = await fetch(`${API_URL}/api/track/${encodeURIComponent(awbNum.trim())}`);
      if (res.status === 404) { setTrackError('No shipment found with this tracking number.'); return; }
      if (!res.ok) throw new Error();
      setTrackData(await res.json());
    } catch { setTrackError('Unable to fetch tracking info. Please try again.'); }
    finally { setTrackLoading(false); }
  };

  const handleTrack = (e: React.FormEvent) => { e.preventDefault(); doTrack(awb); };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !supabase) { setAuthError('Please enter a valid email.'); return; }
    setSending(true); setAuthError('');
    try {
      const { error } = await supabase.auth.signInWithOtp({ email: email.trim() });
      if (error) throw error;
      setAuthStep('otp');
    } catch (err: any) { setAuthError(err.message || 'Failed to send OTP.'); }
    finally { setSending(false); }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim() || !supabase) return;
    setVerifying(true); setAuthError('');
    try {
      const { data, error } = await supabase.auth.verifyOtp({ email: email.trim(), token: otp.trim(), type: 'email' });
      if (error) throw error;
      if (!data.session) throw new Error('No session');
      setToken(data.session.access_token);
      setAuthStep('list');
      await loadOrders(data.session.access_token);
    } catch (err: any) { setAuthError(err.message || 'Invalid OTP.'); }
    finally { setVerifying(false); }
  };

  const loadOrders = async (t: string) => {
    setFetchingOrders(true); setAuthError('');
    try {
      const res = await fetch(`${API_URL}/api/track/my-orders`, { method: 'POST', headers: { 'Authorization': `Bearer ${t}`, 'Content-Type': 'application/json' } });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setOrders(data.orders || []);
    } catch { setAuthError('Unable to fetch orders.'); }
    finally { setFetchingOrders(false); }
  };

  const handleSignOut = async () => {
    if (supabase) await supabase.auth.signOut();
    setAuthStep('email'); setEmail(''); setOtp(''); setOrders([]); setToken('');
  };

  const viewOrder = (orderAwb: string) => {
    setTab('track');
    setAwb(orderAwb);
    doTrack(orderAwb);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.97 }}
          transition={{ duration: 0.25 }}
          className="relative bg-brand-charcoal rounded-2xl max-w-xl w-full max-h-[85vh] overflow-hidden border border-white/10 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-brand-red" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Shipment Center</h2>
                <p className="text-xs text-gray-500">Track or view your orders</p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex mx-6 mb-5 bg-brand-pure-black/50 rounded-xl p-1">
            <button
              onClick={() => setTab('track')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                tab === 'track' ? 'bg-brand-red text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Search className="w-4 h-4" />
              Track Shipment
            </button>
            <button
              onClick={() => setTab('orders')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                tab === 'orders' ? 'bg-brand-red text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4" />
              My Orders
            </button>
          </div>

          {/* Content */}
          <div className="px-6 pb-6 overflow-y-auto max-h-[calc(85vh-140px)]">
            <AnimatePresence mode="wait">
              {/* ===== TRACK TAB ===== */}
              {tab === 'track' && (
                <motion.div key="track" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }}>
                  <form onSubmit={handleTrack} className="flex gap-2 mb-5">
                    <div className="relative flex-1">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        value={awb}
                        onChange={(e) => setAwb(e.target.value)}
                        placeholder="Enter AWB or LR number"
                        className="w-full bg-brand-pure-black/60 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-brand-red transition-colors"
                      />
                    </div>
                    <button type="submit" disabled={trackLoading} className="px-5 py-3 bg-brand-red text-white text-sm font-semibold rounded-xl hover:bg-red-600 transition-all disabled:opacity-50 flex-shrink-0">
                      {trackLoading ? '...' : 'Track'}
                    </button>
                  </form>

                  {trackError && (
                    <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-4">
                      <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                      <p className="text-sm text-red-400">{trackError}</p>
                    </div>
                  )}

                  {trackLoading && (
                    <div className="flex justify-center py-10">
                      <div className="w-8 h-8 border-3 border-brand-red border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}

                  {trackData && !trackLoading && (
                    <div className="space-y-4">
                      {/* Shipment card */}
                      <div className="bg-brand-pure-black/60 border border-white/5 rounded-xl p-5">
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider">AWB Number</p>
                            <p className="text-base font-bold text-white">{trackData.awb_number}</p>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${statusBadge[trackData.status] || statusBadge.booked}`}>
                            {fmt(trackData.status)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm mb-3">
                          <MapPin className="w-3.5 h-3.5 text-gray-500" />
                          <span className="text-white">{trackData.origin_city}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-brand-red" />
                          <span className="text-white">{trackData.destination_city}</span>
                        </div>

                        <div className="flex gap-4 text-xs text-gray-500">
                          <span className="capitalize">{trackData.shipment_type}</span>
                          {trackData.partner_name && <span>via {trackData.partner_name}</span>}
                        </div>
                      </div>

                      {/* Timeline */}
                      {trackData.order_status_history?.length > 0 && (
                        <div className="bg-brand-pure-black/60 border border-white/5 rounded-xl p-5">
                          <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-4">Tracking History</p>
                          {trackData.order_status_history.map((entry, i) => (
                            <div key={entry.id} className="flex gap-3">
                              <div className="flex flex-col items-center">
                                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${i === 0 ? (statusDot[entry.status] || 'bg-brand-red') : 'bg-gray-700'}`} />
                                {i < trackData.order_status_history.length - 1 && <div className="w-px flex-1 min-h-[32px] bg-white/5" />}
                              </div>
                              <div className="pb-5">
                                <p className="text-sm font-medium text-white">{fmt(entry.status)}</p>
                                {entry.location && <p className="text-xs text-gray-400 mt-0.5">{entry.location}</p>}
                                {entry.remarks && <p className="text-xs text-gray-500 mt-0.5">{entry.remarks}</p>}
                                <p className="text-[11px] text-gray-600 mt-1">{fmtDate(entry.created_at)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {!trackData && !trackLoading && !trackError && (
                    <div className="text-center py-10">
                      <Search className="w-10 h-10 text-gray-700 mx-auto mb-3" />
                      <p className="text-sm text-gray-500">Enter your tracking number above</p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* ===== MY ORDERS TAB ===== */}
              {tab === 'orders' && (
                <motion.div key="orders" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>

                  {/* Email input */}
                  {authStep === 'email' && (
                    <div>
                      <p className="text-sm text-gray-400 mb-5">Verify your email to view all your shipments</p>
                      <form onSubmit={handleSendOTP} className="space-y-3">
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" required
                            className="w-full bg-brand-pure-black/60 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-brand-red transition-colors"
                          />
                        </div>
                        <button type="submit" disabled={sending} className="w-full py-3 bg-brand-red text-white text-sm font-semibold rounded-xl hover:bg-red-600 transition-all disabled:opacity-50">
                          {sending ? 'Sending OTP...' : 'Send Verification Code'}
                        </button>
                      </form>
                    </div>
                  )}

                  {/* OTP input */}
                  {authStep === 'otp' && (
                    <div>
                      <p className="text-sm text-gray-400 mb-1">We sent a code to</p>
                      <p className="text-sm text-white font-medium mb-5">{email}</p>
                      <form onSubmit={handleVerifyOTP} className="space-y-3">
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                          <input type="text" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} placeholder="Enter 6-digit code" maxLength={6} required
                            className="w-full bg-brand-pure-black/60 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-brand-red transition-colors tracking-widest text-center font-mono text-lg"
                          />
                        </div>
                        <button type="submit" disabled={verifying} className="w-full py-3 bg-brand-red text-white text-sm font-semibold rounded-xl hover:bg-red-600 transition-all disabled:opacity-50">
                          {verifying ? 'Verifying...' : 'Verify & View Orders'}
                        </button>
                        <div className="flex items-center justify-between">
                          <button type="button" onClick={() => { setAuthStep('email'); setOtp(''); }} className="text-xs text-gray-500 hover:text-white transition-colors">
                            ← Change email
                          </button>
                          <button type="button" onClick={handleSendOTP} disabled={sending} className="text-xs text-gray-500 hover:text-brand-red transition-colors">
                            Resend code
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Orders list */}
                  {authStep === 'list' && (
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div>
                          <p className="text-xs text-gray-500">Showing orders for</p>
                          <p className="text-sm text-white font-medium">{email}</p>
                        </div>
                        <button onClick={handleSignOut} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5">
                          <LogOut className="w-3.5 h-3.5" /> Sign out
                        </button>
                      </div>

                      {fetchingOrders && (
                        <div className="flex justify-center py-10">
                          <div className="w-8 h-8 border-3 border-brand-red border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}

                      {!fetchingOrders && orders.length === 0 && (
                        <div className="text-center py-10">
                          <Package className="w-10 h-10 text-gray-700 mx-auto mb-3" />
                          <p className="text-sm text-gray-500">No orders found for this email</p>
                        </div>
                      )}

                      {!fetchingOrders && orders.length > 0 && (
                        <div className="space-y-2">
                          {orders.map((order) => (
                            <button
                              key={order.awb_number}
                              onClick={() => viewOrder(order.awb_number)}
                              className="w-full bg-brand-pure-black/40 border border-white/5 rounded-xl p-4 hover:border-brand-red/30 transition-all text-left group"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-bold text-white">{order.awb_number}</p>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusBadge[order.status] || statusBadge.booked}`}>
                                  {fmt(order.status)}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
                                <MapPin className="w-3 h-3" />
                                {order.origin_city} → {order.destination_city}
                              </div>
                              <div className="flex items-center justify-between">
                                <p className="text-[11px] text-gray-600">
                                  {new Date(order.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                </p>
                                <span className="text-[11px] text-brand-red opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                  View details <ArrowRight className="w-3 h-3" />
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {authError && (
                    <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-3 mt-4">
                      <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                      <p className="text-xs text-red-400">{authError}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
