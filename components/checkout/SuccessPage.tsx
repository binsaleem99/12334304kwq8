import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Download, Mail, ArrowRight, CreditCard, ExternalLink } from 'lucide-react';
// Fix: Use correct path for ViewState
import { ViewState } from '../../types.ts';
// Fixed: Standardized casing for Button.tsx
import Button from '../ui/Button.tsx';

interface SuccessPageProps {
  onNavigate: (view: ViewState) => void;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    // Scroll to top on successful payment mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans" dir="ltr">
        
        {/* Logo */}
        <div className="mb-8 cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className="bg-black text-white px-4 py-2 transform -rotate-2 font-black text-3xl border-[3px] border-white shadow-lg inline-block">
                KWQ8
            </div>
        </div>

        {/* Main Success Card */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="bg-white border-[3px] border-black rounded-3xl p-8 max-w-md w-full shadow-[12px_12px_0px_0px_#22C55E] relative z-10"
        >
            <div className="flex flex-col items-center text-center mb-8">
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, delay: 0.2 }}
                    className="w-24 h-24 bg-[#22C55E] rounded-full flex items-center justify-center border-[4px] border-black shadow-[4px_4px_0px_0px_#000] mb-6"
                >
                    <Check size={48} strokeWidth={4} className="text-white" />
                </motion.div>
                
                <h1 className="text-3xl font-black text-black mb-2 uppercase tracking-tight">Payment Success!</h1>
                <p className="text-slate-600 font-bold text-lg">
                    Your credits have been added to your account.
                </p>
            </div>

            {/* Order Details Summary */}
            <div className="bg-slate-50 border-2 border-black rounded-xl p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-500 font-bold text-sm uppercase">Order ID</span>
                    <span className="font-mono font-bold text-black">#KW-827364</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-500 font-bold text-sm uppercase">Amount Paid</span>
                    <span className="font-black text-black">20.000 KWD</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-bold text-sm uppercase">Credits Added</span>
                    <span className="text-[#7C3AED] font-black">+700 Credits</span>
                </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="space-y-3">
                <Button 
                    variant="default" 
                    fullWidth 
                    size="lg"
                    onClick={() => onNavigate('dashboard')}
                    className="h-14 text-xl"
                >
                    GO TO DASHBOARD
                </Button>
                
                <button className="w-full flex items-center justify-center gap-2 py-3 font-bold text-slate-500 hover:text-black transition-colors">
                    <Download size={18} /> Download Invoice
                </button>
            </div>

            {/* Extra Info Footer */}
            <div className="mt-8 pt-6 border-t-2 border-slate-100 flex flex-col items-center gap-4">
                <p className="text-xs font-bold text-slate-400 text-center">
                    A confirmation email has been sent to your inbox.
                </p>
                <div className="flex gap-4">
                    <button className="text-slate-400 hover:text-[#7C3AED]" title="Support Email"><Mail size={18} /></button>
                    <button className="text-slate-400 hover:text-[#7C3AED]" title="Billing History"><CreditCard size={18} /></button>
                    <button className="text-slate-400 hover:text-[#7C3AED]" title="View Dashboard"><ExternalLink size={18} /></button>
                </div>
            </div>
        </motion.div>
    </div>
  );
};

export default SuccessPage;