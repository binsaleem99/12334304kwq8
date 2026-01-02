import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Check, Download, AlertTriangle, Plus, Star, Zap, Trash2, Edit2, X, History, TrendingUp, Wallet, Timer } from 'lucide-react';
import { ViewState } from '../../../types';
import Button from '../../ui/Button';
import { CREDIT_PACKAGES } from '../../../constants';

interface BillingSettingsProps {
  onNavigate: (view: ViewState) => void;
}

const BillingSettings: React.FC<BillingSettingsProps> = ({ onNavigate }) => {
  const [balance, setBalance] = useState(487);
  
  const history = [
    { date: '15 ديسمبر 2025', package: 'الباقة الشائعة', credits: '720', amount: '20.000 د.ك', status: 'active' },
    { date: '20 نوفمبر 2025', package: 'باقة البداية', credits: '120', amount: '5.000 د.ك', status: 'expired' },
  ];

  return (
    <div className="space-y-12 min-h-[80vh]">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-black mb-1 flex items-center gap-2">
            متجر الرصيد <Wallet className="text-[#7C3AED]" />
        </h1>
        <p className="text-slate-600 font-bold">اشترِ رصيداً لتستمر في بناء وتطوير مواقعك</p>
      </div>

      {/* Credit Balance Card */}
      <div className="bg-black text-white border-[4px] border-black rounded-2xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-right">
                  <h2 className="text-xl font-bold opacity-80 mb-2">رصيدك الحالي</h2>
                  <div className="text-6xl font-black font-heading tracking-tighter text-[#FACC15] drop-shadow-md">
                      {balance}
                  </div>
                  <div className="text-sm font-bold mt-2 text-[#A0A0A0]">نقطة رصيد</div>
              </div>
              
              <div className="flex flex-col gap-2">
                  <div className="bg-[#1A1A1A] border border-[#333] px-4 py-2 rounded-lg flex items-center gap-3">
                      <Timer size={18} className="text-[#FACC15]" />
                      <span className="text-sm font-bold">234 نقطة تنتهي خلال 15 يوم</span>
                  </div>
                  <div className="bg-[#1A1A1A] border border-[#333] px-4 py-2 rounded-lg flex items-center gap-3">
                      <Timer size={18} className="text-[#FACC15]" />
                      <span className="text-sm font-bold">253 نقطة تنتهي خلال 45 يوم</span>
                  </div>
              </div>
          </div>

          {balance < 50 && (
              <div className="mt-8 bg-[#EF4444] text-white p-4 rounded-xl border-2 border-white/20 flex items-center gap-4 animate-pulse">
                  <AlertTriangle size={24} className="text-white" />
                  <div>
                      <div className="font-black text-lg">تحذير: رصيدك منخفض!</div>
                      <div className="text-sm font-medium">لديك 23 نقطة فقط. اشترِ المزيد للاستمرار في استخدام ميزات الذكاء الاصطناعي.</div>
                  </div>
              </div>
          )}
      </div>

      {/* Credit Packages */}
      <div>
          <h2 className="text-2xl font-black text-black mb-6">اختر باقة رصيد</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
              {CREDIT_PACKAGES.map((pkg) => (
                  <div 
                    key={pkg.id} 
                    className={`relative p-6 rounded-2xl border-[3px] flex flex-col h-full transition-all ${
                        pkg.popular 
                        ? 'bg-[#7C3AED] text-white border-black shadow-[6px_6px_0px_0px_#000] scale-105 z-10'
                        : pkg.id === 'enterprise'
                        ? 'bg-black text-white border-black shadow-[6px_6px_0px_0px_#000]'
                        : 'bg-white text-black border-black shadow-[6px_6px_0px_0px_#000]'
                    }`}
                  >
                      {pkg.popular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FACC15] text-black px-4 py-1 rounded-full text-xs font-black border-2 border-black flex items-center gap-1">
                              <Star size={12} fill="currentColor" /> الأكثر طلباً
                          </div>
                      )}
                      {pkg.savings && !pkg.popular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold border-2 border-black">
                              {pkg.savings}
                          </div>
                      )}

                      <div className="text-center mb-6 pb-6 border-b-2 border-current border-opacity-10">
                          <h3 className="text-xl font-black mb-2">{pkg.name}</h3>
                          <div className="text-4xl font-black mb-1">{pkg.credits}</div>
                          <div className="text-xs font-bold opacity-70 mb-4">رصيد</div>
                          {pkg.bonus > 0 && (
                              <div className="inline-block bg-white/20 px-2 py-1 rounded text-xs font-bold mb-4">
                                  + {pkg.bonus} مجاناً
                              </div>
                          )}
                          <div className="text-2xl font-black">{pkg.price} د.ك</div>
                      </div>

                      <button className={`w-full py-3 rounded-xl font-black border-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] hover:translate-y-1 hover:shadow-none transition-all ${
                          pkg.popular ? 'bg-[#FACC15] text-black border-black' : 
                          pkg.id === 'enterprise' ? 'bg-[#7C3AED] text-white border-[#7C3AED]' : 
                          'bg-black text-white border-black'
                      }`}>
                          {pkg.id === 'enterprise' ? 'تواصل معنا' : 'شراء الآن'}
                      </button>
                  </div>
              ))}
          </div>
      </div>

      {/* Stats & History Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Usage Stats */}
          <div className="bg-white border-[3px] border-black rounded-xl p-6 shadow-[6px_6px_0px_0px_#000]">
              <h3 className="text-xl font-black text-black mb-6">استهلاك الرصيد (آخر 30 يوم)</h3>
              
              <div className="flex items-end gap-2 h-40 mb-6 px-4">
                  {[20, 45, 30, 60, 40, 75, 50, 45, 30, 20].map((h, i) => (
                      <div key={i} className="flex-1 bg-[#7C3AED] rounded-t-lg relative group" style={{ height: `${h}%` }}>
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              {h} نقطة
                          </div>
                      </div>
                  ))}
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center border-t-2 border-slate-100 pt-4">
                  <div>
                      <div className="text-xs text-slate-500 font-bold">الإجمالي</div>
                      <div className="font-black text-lg">415</div>
                  </div>
                  <div>
                      <div className="text-xs text-slate-500 font-bold">المتوسط/يوم</div>
                      <div className="font-black text-lg">13.8</div>
                  </div>
                  <div>
                      <div className="text-xs text-slate-500 font-bold">الأكثر استهلاكاً</div>
                      <div className="font-black text-lg">AI الصور</div>
                  </div>
              </div>
          </div>

          {/* Purchase History */}
          <div className="bg-white border-[3px] border-black rounded-xl p-6 shadow-[6px_6px_0px_0px_#000]">
              <h3 className="text-xl font-black text-black mb-6">سجل المشتريات</h3>
              <div className="space-y-4">
                  {history.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 border-2 border-slate-100 rounded-xl hover:border-black transition-colors group bg-slate-50">
                          <div>
                              <div className="font-black text-black">{item.package}</div>
                              <div className="text-xs text-slate-500 font-bold">{item.date}</div>
                          </div>
                          <div className="text-right">
                              <div className="font-black text-[#7C3AED]">{item.credits} نقطة</div>
                              <div className="text-xs font-bold text-slate-500">{item.amount}</div>
                          </div>
                          <div className={`w-3 h-3 rounded-full ${item.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} title={item.status === 'active' ? 'نشط' : 'منتهي'}></div>
                      </div>
                  ))}
              </div>
              <button className="w-full mt-4 py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-bold hover:text-black hover:border-black transition-colors">
                  عرض السجل الكامل
              </button>
          </div>

      </div>
    </div>
  );
};

export default BillingSettings;