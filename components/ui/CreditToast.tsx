import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface CreditToastProps {
  spent: number;
  remaining: number;
  isVisible: boolean;
  onClose: () => void;
}

const CreditToast: React.FC<CreditToastProps> = ({ spent, remaining, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '50%' }}
          animate={{ opacity: 1, y: 0, x: '50%' }}
          exit={{ opacity: 0, y: 20, scale: 0.9, x: '50%' }}
          className="fixed bottom-6 right-1/2 translate-x-1/2 md:right-6 md:translate-x-0 z-[100] flex items-start gap-3 md:gap-4 bg-[#1A1A1A] text-white p-4 md:p-5 rounded-2xl border-[3px] border-[#22C55E] shadow-neo min-w-[280px] md:min-w-[320px] max-w-[90vw] md:max-w-md font-sans"
          dir="rtl"
        >
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#22C55E] flex items-center justify-center border-2 border-black text-white shrink-0">
            <Check size={18} strokeWidth={4} />
          </div>
          <div className="flex-1 pt-0.5">
            <h4 className="font-black text-sm md:text-base text-white mb-0.5">تم تنفيذ الأمر بنجاح</h4>
            <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-slate-400">
                <span className="text-[#22C55E] font-black">-{spent} نقطة</span>
                <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                <span>المتبقي: <span className="text-white font-bold">{remaining}</span></span>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-500 hover:text-white transition-colors shrink-0 p-1"
          >
            <X size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreditToast;