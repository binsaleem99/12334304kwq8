import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { Check, Star, Zap, Info, Wallet, Bot, CheckCircle, BarChart3, Gift, Banknote } from 'lucide-react';
import { CREDIT_PACKAGES } from '../../constants';
import { CreditPackage } from '../../types';

interface CreditCardProps {
  pkg: CreditPackage;
}

const CreditCard: React.FC<CreditCardProps> = ({ pkg }) => {
  const isPopular = pkg.popular;
  const isEnterprise = pkg.id === 'enterprise';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative p-6 rounded-2xl flex flex-col h-full transition-all duration-300 ${
        isPopular 
        ? 'bg-[#7C3AED] text-white border-[3px] border-[#1A1A1A] shadow-[6px_6px_0px_0px_#1A1A1A] scale-105 z-10' 
        : isEnterprise
        ? 'bg-[#1A1A1A] text-white border-[3px] border-[#7C3AED] shadow-[6px_6px_0px_0px_#7C3AED]'
        : 'bg-white text-black border-[3px] border-[#1A1A1A] shadow-[6px_6px_0px_0px_#1A1A1A]'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FACC15] text-[#1A1A1A] px-4 py-1 rounded-full text-xs font-black border-2 border-[#1A1A1A] shadow-sm whitespace-nowrap flex items-center gap-1">
          <Star size={12} fill="currentColor" /> الأكثر طلباً
        </div>
      )}
      
      {pkg.savings && !isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold border-2 border-[#1A1A1A] shadow-sm whitespace-nowrap">
          {pkg.savings}
        </div>
      )}

      <div className="mb-6 text-center border-b-2 border-current pb-6 border-opacity-10">
        <h3 className={`text-xl font-black mb-4 ${isPopular ? 'text-white' : 'text-black'} ${isEnterprise ? 'text-white' : ''}`}>{pkg.name}</h3>
        
        <div className="mb-2">
            <span className="text-5xl font-black font-heading">{pkg.credits}</span>
        </div>
        <div className="text-sm font-bold opacity-80 mb-4">رصيد AI</div>
        
        {pkg.bonus > 0 && (
            <div className="inline-block bg-white/20 px-2 py-1 rounded text-xs font-bold mb-4">
                + {pkg.bonus} رصيد إضافي
            </div>
        )}

        <div className="text-2xl font-black">{pkg.price} د.ك</div>
      </div>

      <div className="flex-grow space-y-3 mb-8">
        {pkg.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3 text-sm font-bold opacity-90">
                <Check className={`w-5 h-5 shrink-0 ${isPopular || isEnterprise ? 'text-white' : 'text-green-600'}`} strokeWidth={3} />
                <span>{feature}</span>
            </div>
        ))}
      </div>

      <button 
        className={`w-full py-3 rounded-xl font-black text-lg border-2 transition-all active:translate-y-1 active:shadow-none ${
            isPopular 
            ? 'bg-[#FACC15] text-black border-black shadow-[4px_4px_0px_0px_#000] hover:bg-yellow-300' 
            : isEnterprise
            ? 'bg-[#7C3AED] text-white border-[#7C3AED] shadow-[4px_4px_0px_0px_#000] hover:bg-violet-600'
            : 'bg-white text-black border-black shadow-[4px_4px_0px_0px_#000] hover:bg-slate-50'
        }`}
      >
        {isEnterprise ? 'تواصل معنا' : 'شراء الآن'}
      </button>
    </motion.div>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-white border-t-[3px] border-b-[3px] border-black relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-violet-100 text-violet-700 border-2 border-violet-700 text-sm font-black mb-6">
            <Wallet size={16} /> باقات الرصيد
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-black mb-4 font-heading">
            اشترِ رصيداً. ابنِ أي شيء.
          </h2>
          <p className="text-xl text-slate-600 font-bold max-w-2xl mx-auto">
            ادفع فقط مقابل ما تستخدمه. لا اشتراكات شهرية. لا رسوم خفية.
          </p>
        </div>

        {/* First Purchase Bonus Banner */}
        <div className="max-w-4xl mx-auto mb-16 bg-gradient-to-r from-violet-500 to-pink-500 border-[3px] border-black rounded-xl p-6 text-white text-center shadow-[6px_6px_0px_0px_#000] relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black text-2xl border-2 border-black shadow-sm">
                    <Gift size={24} />
                </div>
                <div className="text-right">
                    <h3 className="text-xl font-black">مكافأة الشراء الأول!</h3>
                    <p className="font-medium opacity-90">احصل على +20% رصيد إضافي عند أول عملية شراء.</p>
                </div>
            </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 items-end mb-20">
            {CREDIT_PACKAGES.map((pkg) => (
                <CreditCard key={pkg.id} pkg={pkg} />
            ))}
        </div>

        {/* How it works */}
        <div className="max-w-5xl mx-auto border-[3px] border-black rounded-2xl p-8 bg-slate-50">
            <h3 className="text-2xl font-black text-center mb-10">كيف يعمل نظام الرصيد؟</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center relative">
                {/* Connector Line (Desktop) */}
                <div className="hidden md:block absolute top-1/3 left-0 w-full h-1 bg-slate-300 -z-10 transform -translate-y-1/2"></div>

                <div className="flex flex-col items-center gap-4 bg-slate-50 p-2">
                    <div className="w-16 h-16 bg-white border-[3px] border-black rounded-xl flex items-center justify-center text-3xl shadow-[4px_4px_0px_0px_#000]">
                        <Wallet size={32} className="text-green-600" />
                    </div>
                    <div className="font-bold">1. اشترِ رصيداً</div>
                    <p className="text-xs text-slate-500 font-bold">اختر الباقة المناسبة لك</p>
                </div>
                <div className="flex flex-col items-center gap-4 bg-slate-50 p-2">
                    <div className="w-16 h-16 bg-white border-[3px] border-black rounded-xl flex items-center justify-center text-3xl shadow-[4px_4px_0px_0px_#000]">
                        <Bot size={32} className="text-violet-600" />
                    </div>
                    <div className="font-bold">2. استخدم AI</div>
                    <p className="text-xs text-slate-500 font-bold">ابنِ، عدل، وانشر</p>
                </div>
                <div className="flex flex-col items-center gap-4 bg-slate-50 p-2">
                    <div className="w-16 h-16 bg-white border-[3px] border-black rounded-xl flex items-center justify-center text-3xl shadow-[4px_4px_0px_0px_#000]">
                        <CheckCircle size={32} className="text-blue-600" />
                    </div>
                    <div className="font-bold">3. خصم الرصيد</div>
                    <p className="text-xs text-slate-500 font-bold">نقطة واحدة لكل أمر AI تقريباً</p>
                </div>
                <div className="flex flex-col items-center gap-4 bg-slate-50 p-2">
                    <div className="w-16 h-16 bg-white border-[3px] border-black rounded-xl flex items-center justify-center text-3xl shadow-[4px_4px_0px_0px_#000]">
                        <BarChart3 size={32} className="text-orange-600" />
                    </div>
                    <div className="font-bold">4. تابع رصيدك</div>
                    <p className="text-xs text-slate-500 font-bold">تحكم كامل في استهلاكك</p>
                </div>
            </div>
            
            <div className="mt-10 flex flex-col md:flex-row justify-center gap-6 text-sm font-bold text-slate-600 bg-white border-2 border-slate-200 rounded-xl p-4 w-fit mx-auto">
                <span className="flex items-center gap-2"><Info size={16} /> الرصيد صالح لمدة 90 يوم</span>
                <span className="flex items-center gap-2"><Info size={16} /> لا رسوم شهرية، ادفع عند الحاجة</span>
            </div>
        </div>

        {/* Currency Selector */}
        <div className="mt-12 flex justify-center">
            <div className="inline-flex items-center gap-2 bg-white border-[3px] border-black rounded-lg px-4 py-2 font-bold shadow-[4px_4px_0px_0px_#000]">
                <Banknote size={20} className="text-green-600" />
                <span>الأسعار بـ:</span>
                <select className="bg-transparent font-black focus:outline-none cursor-pointer">
                    <option>🇰🇼 KWD</option>
                    <option>🇸🇦 SAR</option>
                    <option>🇦🇪 AED</option>
                    <option>🇺🇸 USD</option>
                </select>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Pricing;