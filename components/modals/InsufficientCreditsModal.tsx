import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, X, ArrowRight, Zap } from 'lucide-react';
import { ViewState } from '../../types';

interface InsufficientCreditsModalProps {
  onNavigate: (view: ViewState) => void;
  onClose: () => void;
}

const InsufficientCreditsModal: React.FC<InsufficientCreditsModalProps> = ({ onNavigate, onClose }) => {
  const [selectedTopUp, setSelectedTopUp] = useState('popular');

  const topUps = [
    { id: 'starter', credits: '+100', price: '5 KWD', label: '' },
    { id: 'popular', credits: '+600', price: '20 KWD', label: '⭐ Best Value' },
    { id: 'power', credits: '+1,300', price: '35 KWD', label: '' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm font-sans" dir="ltr">
        <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white border-[4px] border-[#F59E0B] rounded-3xl p-8 max-w-md w-full shadow-[12px_12px_0px_0px_#F59E0B] relative"
        >
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-black transition-colors"
            >
                <X size={24} />
            </button>

            <div className="text-center mb-6">
                <div className="w-20 h-20 bg-[#FEF3C7] rounded-full flex items-center justify-center mx-auto mb-4 border-[3px] border-[#F59E0B]">
                    <AlertTriangle size={40} className="text-[#F59E0B]" strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl font-black text-black mb-2 uppercase">Insufficient Credits</h2>
                <div className="text-slate-600 font-bold bg-slate-50 p-3 rounded-lg border-2 border-slate-100 inline-block text-sm">
                    This action requires <span className="text-black">5 credits</span>.<br/>
                    Your balance: <span className="text-[#EF4444]">2 credits</span>
                </div>
            </div>

            <div className="border-t-[3px] border-black border-dashed my-6 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                    Quick Top-Up
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
                {topUps.map((opt) => (
                    <button
                        key={opt.id}
                        onClick={() => setSelectedTopUp(opt.id)}
                        className={`relative p-3 rounded-xl border-[3px] text-center transition-all ${
                            selectedTopUp === opt.id 
                            ? 'bg-[#7C3AED] border-black text-white shadow-[4px_4px_0px_0px_#000] -translate-y-1' 
                            : 'bg-white border-slate-200 text-black hover:border-black'
                        }`}
                    >
                        {opt.label && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FACC15] text-black text-[10px] font-black px-2 py-0.5 rounded border border-black whitespace-nowrap">
                                {opt.label}
                            </span>
                        )}
                        <div className="font-black text-lg">{opt.credits}</div>
                        <div className={`text-xs font-bold ${selectedTopUp === opt.id ? 'text-white/80' : 'text-slate-500'}`}>{opt.price}</div>
                    </button>
                ))}
            </div>

            <button 
                onClick={() => onNavigate('checkout-payment')}
                className="w-full bg-black text-white border-[3px] border-black py-4 rounded-xl font-black text-xl hover:bg-[#7C3AED] transition-all flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#000] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none"
            >
                <Zap size={20} fill="currentColor" /> BUY CREDITS NOW
            </button>

            <div className="mt-4 text-center">
                <button 
                    onClick={() => onNavigate('dashboard-billing')}
                    className="text-slate-500 font-bold text-sm hover:text-black hover:underline"
                >
                    View All Packages
                </button>
            </div>

        </motion.div>
    </div>
  );
};

export default InsufficientCreditsModal;