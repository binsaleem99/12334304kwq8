import React from 'react';
import { ViewState } from '../../types';
import { Home, LayoutTemplate, HelpCircle } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (view: ViewState) => void;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center font-sans relative overflow-hidden" dir="rtl">
        {/* Background Decor */}
        <div className="absolute top-20 left-20 text-9xl opacity-5 rotate-12 select-none">?</div>
        <div className="absolute bottom-20 right-20 text-9xl opacity-5 -rotate-12 select-none">404</div>

        <div className="mb-8 cursor-pointer z-10" onClick={() => onNavigate('landing')}>
            <div className="bg-black text-white px-4 py-2 transform -rotate-2 font-black text-3xl border-[3px] border-white shadow-lg inline-block">
                KWQ8
            </div>
        </div>

        <div className="relative z-10 max-w-lg">
            <h1 className="text-[150px] leading-none font-black text-black font-heading text-shadow-neo select-none">
                404
            </h1>
            <h2 className="text-4xl font-black text-black mb-4">الصفحة غير موجودة</h2>
            <p className="text-slate-600 font-bold text-lg mb-8">
                عذراً، الصفحة التي تبحث عنها قد تكون حذفت أو تم تغيير رابطها.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                    onClick={() => onNavigate('landing')}
                    className="flex items-center justify-center gap-2 bg-[#7C3AED] text-white border-[3px] border-black py-3 px-6 rounded-xl font-black text-lg shadow-[4px_4px_0px_0px_#000] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none transition-all"
                >
                    <Home size={20} /> الرئيسية
                </button>
                <button 
                    onClick={() => onNavigate('dashboard')}
                    className="flex items-center justify-center gap-2 bg-white text-black border-[3px] border-black py-3 px-6 rounded-xl font-black text-lg shadow-[4px_4px_0px_0px_#000] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none transition-all"
                >
                    <LayoutTemplate size={20} /> لوحة التحكم
                </button>
            </div>

            <div className="mt-12 pt-8 border-t-[3px] border-black border-dashed">
                <p className="text-slate-500 font-bold text-sm mb-4">صفحات قد تهمك:</p>
                <div className="flex justify-center gap-4 text-sm font-black text-black">
                    <button onClick={() => onNavigate('dashboard-templates')} className="hover:text-[#7C3AED] hover:underline">القوالب</button>
                    <span>•</span>
                    <button onClick={() => onNavigate('landing')} className="hover:text-[#7C3AED] hover:underline">الأسعار</button>
                    <span>•</span>
                    <button onClick={() => onNavigate('dashboard-help')} className="hover:text-[#7C3AED] hover:underline">المساعدة</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default NotFoundPage;