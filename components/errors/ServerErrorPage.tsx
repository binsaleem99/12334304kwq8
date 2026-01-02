import React from 'react';
import { ViewState } from '../../types';
import { RefreshCw, Mail, Copy } from 'lucide-react';

interface ServerErrorPageProps {
  onNavigate: (view: ViewState) => void;
}

const ServerErrorPage: React.FC<ServerErrorPageProps> = ({ onNavigate }) => {
  const errorId = "ERR-2025-12345";

  const handleCopy = () => {
      navigator.clipboard.writeText(errorId);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center font-sans" dir="rtl">
        
        <div className="mb-8 cursor-pointer z-10" onClick={() => onNavigate('landing')}>
            <div className="bg-black text-white px-4 py-2 transform -rotate-2 font-black text-3xl border-[3px] border-white shadow-lg inline-block">
                KWQ8
            </div>
        </div>

        <div className="relative z-10 max-w-lg bg-white border-[3px] border-black rounded-3xl p-8 shadow-[12px_12px_0px_0px_#EF4444]">
            <h1 className="text-[120px] leading-none font-black text-[#EF4444] font-heading select-none mb-4" style={{ textShadow: '4px 4px 0px #000' }}>
                500
            </h1>
            <h2 className="text-3xl font-black text-black mb-4">خطأ في الخادم</h2>
            <p className="text-slate-600 font-bold mb-8">
                حدث خطأ غير متوقع من جانبنا. نحن نعمل على إصلاحه الآن.
            </p>

            <div className="bg-slate-100 border-2 border-slate-300 rounded-xl p-4 mb-8 flex items-center justify-between gap-4 font-mono text-sm" dir="ltr">
                <span className="font-bold text-slate-700">ID: {errorId}</span>
                <button 
                    onClick={handleCopy}
                    className="text-[#7C3AED] font-bold hover:underline flex items-center gap-1"
                >
                    <Copy size={14} /> Copy
                </button>
            </div>

            <div className="flex flex-col gap-3">
                <button 
                    onClick={() => window.location.reload()}
                    className="w-full flex items-center justify-center gap-2 bg-black text-white border-[3px] border-black py-3 rounded-xl font-black text-lg hover:bg-slate-800 transition-all"
                >
                    <RefreshCw size={20} /> إعادة المحاولة
                </button>
                <button 
                    onClick={() => onNavigate('dashboard-help')}
                    className="w-full flex items-center justify-center gap-2 bg-white text-black border-[3px] border-black py-3 rounded-xl font-black text-lg hover:bg-slate-50 transition-all"
                >
                    <Mail size={20} /> تواصل مع الدعم
                </button>
            </div>
        </div>
    </div>
  );
};

export default ServerErrorPage;