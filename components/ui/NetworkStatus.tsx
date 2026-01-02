import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi } from 'lucide-react';

const NetworkStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [showBackOnline, setShowBackOnline] = useState(false);

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setShowBackOnline(true);
      setTimeout(() => setShowBackOnline(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 bg-[#FACC15] border-t-[3px] border-black p-3 z-[200] shadow-[0_-4px_10px_rgba(0,0,0,0.1)]"
        >
          <div className="container mx-auto flex items-center justify-center gap-2 font-black text-black">
            <WifiOff size={20} />
            <span>لا يوجد اتصال بالإنترنت. يرجى التحقق من الشبكة.</span>
          </div>
        </motion.div>
      )}

      {isOnline && showBackOnline && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 bg-[#22C55E] border-t-[3px] border-black p-3 z-[200] shadow-[0_-4px_10px_rgba(0,0,0,0.1)]"
        >
          <div className="container mx-auto flex items-center justify-center gap-2 font-black text-white">
            <Wifi size={20} />
            <span>عاد الاتصال بالإنترنت! ⚡</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NetworkStatus;