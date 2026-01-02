import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Download, Mail, ArrowRight, CreditCard, ExternalLink } from 'lucide-react';
import { ViewState } from '../../types';
import Button from '../ui/Button';

interface SuccessPageProps {
  onNavigate: (view: ViewState) => void;
}

// Fix: Explicitly typing as React.FC to properly handle React's built-in 'key' prop
const ConfettiPiece: React.FC<{ delay: number }> = ({ delay }) => {
    const randomColor = ['#7C3AED', '#FACC15', '#22C55E', '#EF4444', '#3B82F6'][Math.floor(Math.random() * 5)];
    const randomX = Math.random() * 100 - 50;
    
    return (
        <motion.div
            initial={{ opacity: 1, y: -20, x: 0, rotate: 0 }}
            animate={{ 
                opacity: 0, 
                y: 400, 
                x: randomX * 5, 
                rotate: 360 * Math.random() 
            }}
            transition={{ duration: 2, delay: delay, ease: "easeOut" }}
            className="absolute top-0 w-3 h-3 rounded-sm"
            style={{ 
                backgroundColor: randomColor, 
                left: `${50 + randomX}%` 
            }}
        />
    );
};

const SuccessPage: React.FC<SuccessPageProps> = ({ onNavigate }) => {
  
  const receiptData = {
      orderId: '#KWQ8-2025-12345',
      date: 'December 29, 2025',
      package: 'Popular Pack',
      baseCredits: 500,
      bonusCredits: 100,
      firstPurchaseBonus: 120,
      totalCredits: 720,
      amount: '20.000 KWD',
      expiry: 'March 29, 2026'
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans" dir="ltr">
        
        {/* Confetti Animation Layer */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            {[...Array(30)].map((_, i) => (
                <ConfettiPiece key={i} delay={i * 0.1} />
            ))}
        </div>

        {/* Logo */}
        <div className="mb-8 z-10">
            <div className="bg-black text-white px-4 py-2 transform -rotate-2 font-black text-3xl border-[3px] border-white shadow-lg">
                KWQ8
            </div>
        </div>

        {/* Main Card */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="bg-white border-[3px] border-black rounded-3xl p-8 max-w-md w-full shadow-[12px_12px_0px_0px_#000] relative z-10"
        >
            <div className="flex flex-col items-center text-center mb-8">
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="w-24 h-24 bg-[#22C55E] rounded-full flex items-center justify-center border-[4px] border-black shadow-[4px_4px_0px_0px_#000] mb-6"
                >
                    <Check size={48} strokeWidth={4} className="text-white" />
                </motion.div>
                
                <h1 className="text-3xl font-black text-black mb-2 uppercase tracking-tight">Payment Successful!</h1>
                <p className="text-slate-600 font-bold text-lg">
                    <span className="text-[#7C3AED] font-black">{receiptData.totalCredits} credits</span> have been added to your account.
                </p>
            </div>

            {/* Receipt */}
            <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-6 mb-8 relative">
                <div className="flex justify-between items-center mb-4 pb-4 border-b-2 border-slate-200 border-dashed">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Receipt</span>
                    <span className="text-xs font-bold text-black font-mono bg-white px-2 py-1 rounded border border-slate-200">{receiptData.orderId}</span>
                </div>

                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-slate-500 font-bold">Date</span>
                        <span className="font-bold text-black">{receiptData.date}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-500 font-bold">Package</span>
                        <span className="font-bold text-black">{receiptData.package}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-500 font-bold">Base Credits</span>
                        <span className="font-bold text-black">{receiptData.baseCredits}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                        <span className="font-bold">Package Bonus</span>
                        <span className="font-black">+{receiptData.bonusCredits}</span>
                    </div>
                    <div className="flex justify-between text-[#7C3AED]">
                        <span className="font-bold">First Purchase Bonus</span>
                        <span className="font-black">+{receiptData.firstPurchaseBonus}</span>
                    </div>
                </div>

                <div className="border-t-2 border-slate-200 border-dashed my-4"></div>

                <div className="flex justify-between items-end mb-1">
                    <span className="font-black text-black uppercase text-sm">Total Paid</span>
                    <span className="font-black text-2xl text-black">{receiptData.amount}</span>
                </div>
                <div className="text-right text-xs font-bold text-slate-400">
                    Expires: {receiptData.expiry}
                </div>

                <div className="flex gap-2 mt-6">
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white border-2 border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:border-black hover:text-black transition-colors">
                        <Mail size={14} /> Email Receipt
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white border-2 border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:border-black hover:text-black transition-colors">
                        <Download size={14} /> Download PDF
                    </button>
                </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
                <button 
                    onClick={() => onNavigate('dashboard')}
                    className="w-full bg-[#7C3AED] text-white border-[3px] border-black py-4 rounded-xl font-black text-xl shadow-[4px_4px_0px_0px_#000] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none transition-all flex items-center justify-center gap-2 group"
                >
                    START BUILDING NOW <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button 
                    onClick={() => onNavigate('dashboard-billing')}
                    className="w-full text-slate-500 font-bold text-sm hover:text-black py-2 transition-colors flex items-center justify-center gap-2"
                >
                    <CreditCard size={16} /> View Credit Balance
                </button>
            </div>

        </motion.div>
    </div>
  );
};

export default SuccessPage;