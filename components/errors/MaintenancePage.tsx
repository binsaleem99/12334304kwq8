import React from 'react';
import { ViewState } from '../../types';
import { Bell, Clock, Wrench, Settings } from 'lucide-react';

interface MaintenancePageProps {
  onNavigate: (view: ViewState) => void;
}

const MaintenancePage: React.FC<MaintenancePageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center font-sans text-white relative overflow-hidden" dir="rtl">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED] to-[#EC4899] z-0"></div>
        {/* Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-0"></div>

        <div className="relative z-10 w-full max-w-lg">
            <div className="mb-8 inline-block">
                <div className="bg-black text-white px-4 py-2 transform -rotate-2 font-black text-3xl border-[3px] border-white shadow-lg">
                    KWQ8
                </div>
            </div>

            <div className="bg-white text-black border-[4px] border-black rounded-3xl p-8 md:p-12 shadow-[12px_12px_0px_0px_#000]">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 border-[3px] border-black animate-pulse">
                    <Settings size={40} className="text-black" />
                </div>
                
                <h1 className="text-4xl font-black mb-4">جاري الصيانة</h1>
                <p className="text-slate-600 font-bold text-lg mb-8 leading-relaxed">
                    نقوم بتحديث أنظمتنا لتقديم خدمة أفضل. سنعود قريباً جداً!
                </p>

                <div className="bg-[#FEF3C7] border-2 border-[#F59E0B] rounded-xl p-4 mb-8 flex items-center justify-center gap-2 font-black text-[#92400E]">
                    <Clock size={20} />
                    الوقت المتوقع للعودة: 30 دقيقة
                </div>

                <div className="text-right">
                    <label className="block text-sm font-black mb-2 flex items-center gap-2">
                        <Bell size={16} /> أبلغني عند العودة
                    </label>
                    <div className="flex gap-2">
                        <input 
                            type="email" 
                            placeholder="بريدك الإلكتروني" 
                            className="flex-1 bg-slate-50 border-[3px] border-slate-200 rounded-xl px-4 py-3 font-bold focus:border-black focus:outline-none transition-colors"
                        />
                        <button className="bg-black text-white px-6 py-3 rounded-xl font-bold border-[3px] border-black hover:bg-slate-800">
                            إرسال
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-center gap-6 font-bold text-white/80">
                <a href="#" className="hover:text-white hover:underline">تويتر</a>
                <a href="#" className="hover:text-white hover:underline">انستقرام</a>
                <a href="#" className="hover:text-white hover:underline">واتساب</a>
            </div>
        </div>
    </div>
  );
};

export default MaintenancePage;