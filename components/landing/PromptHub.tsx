import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send } from 'lucide-react';
import { ViewState } from '../../types';

interface PromptHubProps {
  onNavigate: (view: ViewState) => void;
}

const PromptHub: React.FC<PromptHubProps> = ({ onNavigate }) => {
  const [userPrompt, setUserPrompt] = useState('');

  const handleStartBuilding = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userPrompt.trim()) return;
    
    // Save prompt to use after signup
    localStorage.setItem('pending_website_prompt', userPrompt);
    onNavigate('signup');
  };

  const suggestions = [
    { label: '🍔 مطعم برجر', prompt: 'موقع لمطعم برجر عصري بستايل شبابي' },
    { label: '💇 صالون تجميل', prompt: 'موقع لصالون تجميل نسائي فاخر باللون الوردي والذهبي' },
    { label: '📦 متجر عطور', prompt: 'متجر إلكتروني لبيع العطور الشرقية بتصميم ملكي' },
    { label: '🏛️ شركة مقاولات', prompt: 'موقع تعريفي لشركة مقاولات هندسية' }
  ];

  return (
    <section className="bg-white py-12 md:py-20 overflow-hidden px-4">
      <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
      >
          <div className="bg-white border-[3px] border-black rounded-[24px] md:rounded-[40px] p-5 md:p-12 shadow-neo-lg relative overflow-hidden group">
              {/* Visual Flair Decor */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-violet-100 rounded-full blur-3xl opacity-40 group-hover:bg-violet-200 transition-all duration-500"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-50 rounded-full blur-3xl opacity-40 group-hover:bg-yellow-100 transition-all duration-500"></div>

              <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 md:mb-10 text-center md:text-right">
                      <div>
                        <h2 className="text-2xl md:text-4xl font-black text-black mb-2 flex items-center justify-center md:justify-start gap-3">
                            <Sparkles className="text-violet-600 w-8 h-8 md:w-10 md:h-10" fill="currentColor" />
                            ما هو الموقع الذي تحلم به؟
                        </h2>
                        <p className="text-slate-500 font-bold text-sm md:text-lg">اكتب وصفاً مختصراً وسيقوم الذكاء الاصطناعي بالباقي.</p>
                      </div>
                      <div className="hidden md:block bg-yellow-300 border-2 border-black px-4 py-2 rounded-xl rotate-3 shadow-neo-sm font-black text-sm">
                        مجاني للتجربة!
                      </div>
                  </div>

                  <form onSubmit={handleStartBuilding} className="relative mb-8">
                      <textarea 
                          value={userPrompt}
                          onChange={(e) => setUserPrompt(e.target.value)}
                          className="w-full h-40 md:h-52 p-5 md:p-10 rounded-2xl md:rounded-3xl bg-slate-50 border-[3px] border-black font-bold text-base md:text-2xl placeholder:text-slate-300 focus:outline-none focus:shadow-neo transition-all resize-none shadow-neo-sm leading-relaxed"
                          placeholder="مثال: أريد موقعاً لمطعم برجر عصري باللون الأسود والأصفر، مع صفحة منيو وحجز طاولات..."
                      />
                      <div className="mt-4 md:absolute md:bottom-6 md:left-6 flex">
                          <button 
                              type="submit"
                              disabled={!userPrompt.trim()}
                              className="w-full md:w-auto bg-[#7C3AED] text-white px-8 md:px-12 py-4 md:py-5 rounded-2xl border-[3px] border-black font-black text-lg md:text-2xl flex items-center justify-center gap-3 hover:translate-y-[-4px] hover:shadow-neo shadow-neo-sm transition-all active:translate-y-0 active:shadow-none disabled:opacity-50 disabled:translate-y-0 disabled:shadow-neo-sm group"
                          >
                              <Send size={24} className="rotate-180 group-hover:-translate-x-1 transition-transform" /> 
                              ابدأ البناء الآن
                          </button>
                      </div>
                  </form>

                  {/* Suggestions Grid */}
                  <div className="flex flex-col md:flex-row items-center gap-4 text-right">
                      <span className="text-sm font-black text-slate-400 whitespace-nowrap">أفكار ملهمة:</span>
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-3">
                          {suggestions.map((item, idx) => (
                              <button 
                                  key={idx}
                                  type="button"
                                  onClick={() => setUserPrompt(item.prompt)}
                                  className="px-4 py-2 bg-white border-2 border-slate-200 rounded-xl text-xs md:text-sm font-bold text-slate-600 hover:border-black hover:bg-slate-50 hover:text-black transition-all shadow-sm active:scale-95"
                              >
                                  {item.label}
                              </button>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8 text-slate-400 font-bold text-xs md:text-sm text-center">
              <span className="flex items-center gap-1">✓ لا حاجة لخبرة تقنية</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-1">✓ يدعم اللغة العربية بطلاقة</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-1">✓ بناء فوري في 5 دقائق</span>
          </div>
      </motion.div>
    </section>
  );
};

export default PromptHub;