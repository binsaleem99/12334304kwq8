import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, RefreshCw, HelpCircle, ArrowRight, AlertOctagon, CreditCard } from 'lucide-react';
import { ViewState } from '../../types';
// Standardized casing for button import
import Button from '../ui/button.tsx';

interface FailedPageProps {
  onNavigate: (view: ViewState) => void;
}

const FailedPage: React.FC<FailedPageProps> = ({ onNavigate }) => {
  const errorMessage = "Your card was declined. Please try a different card.";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans" dir="ltr">
        
        {/* Logo */}
        <div className="mb-8 cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className="bg-black text-white px-4 py-2 transform -rotate-2 font-black text-3xl border-[3px] border-white shadow-lg inline-block">
                KWQ8
            </div>
        </div>

        {/* Main Card */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="bg-white border-[3px] border-black rounded-3xl p-8 max-w-md w-full shadow-[12px_12px_0px_0px_#EF4444] relative z-10"
        >
            <div className="flex flex-col items-center text-center mb-8">
                <motion.div 
                    initial={{ x: 0 }}
                    animate={{ x: [-10, 10, -10, 10, 0] }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-24 h-24 bg-[#EF4444] rounded-full flex items-center justify-center border-[4px] border-black shadow-[4px_4px_0px_0px_#000] mb-6"
                >
                    <X size={48} strokeWidth={4} className="text-white" />
                </motion.div>
                
                <h1 className="text-3xl font-black text-black mb-2 uppercase tracking-tight">Payment Failed</h1>
                <p className="text-slate-600 font-bold text-lg">
                    Your payment could not be processed.
                </p>
            </div>

            {/* Error Details */}
            <div className="bg-[#FEF2F2] border-2 border-[#EF4444] rounded-xl p-6 mb-8 relative">
                <div className="flex items-start gap-3 mb-4">
                    <AlertOctagon className="text-[#EF4444] shrink-0 mt-1" size={20} />
                    <div>
                        <h3 className="text-sm font-black text-[#7F1D1D] uppercase mb-1">What Happened</h3>
                        <p className="text-sm font-bold text-[#991B1B]">{errorMessage}</p>
                    </div>
                </div>

                <div className="border-t-2 border-[#FECACA] border-dashed my-4"></div>

                <div>
                    <h4 className="text-xs font-black text-[#7F1D1D] uppercase mb-2">Common Reasons:</h4>
                    <ul className="text-xs font-bold text-[#991B1B] space-y-1 list-disc list-inside">
                        <li>Insufficient funds</li>
                        <li>Card declined by bank</li>
                        <li>Incorrect card details</li>
                        <li>Card expired</li>
                    </ul>
                </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
                <button 
                    onClick={() => onNavigate('checkout-payment')}
                    className="w-full bg-black text-white border-[3px] border-black py-4 rounded-xl font-black text-xl shadow-[4px_4px_0px_0px_#EF4444] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none transition-all flex items-center justify-center gap-2 group"
                >
                    <RefreshCw size={20} className="group-hover:rotate-180 transition-transform" /> TRY AGAIN
                </button>
                
                <button 
                    onClick={() => onNavigate('checkout-payment')}
                    className="w-full bg-white text-black border-[3px] border-black py-3 rounded-xl font-bold text-base hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                    <CreditCard size={18} /> Use Different Method
                </button>

                <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t-2 border-slate-100">
                    <button 
                        onClick={() => onNavigate('dashboard-billing')}
                        className="text-slate-500 font-bold text-sm hover:text-black transition-colors"
                    >
                        Back to Shop
                    </button>
                    <span className="text-slate-300">|</span>
                    <button 
                        onClick={() => onNavigate('dashboard-help')}
                        className="text-slate-500 font-bold text-sm hover:text-black transition-colors flex items-center gap-1"
                    >
                        <HelpCircle size={14} /> Contact Support
                    </button>
                </div>
            </div>

        </motion.div>
    </div>
  );
};

export default FailedPage;