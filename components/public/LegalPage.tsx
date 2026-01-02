import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Scale, RefreshCcw, ArrowRight, ShieldCheck, Lock, CreditCard } from 'lucide-react';
import { ViewState } from '../../types';

interface LegalPageProps {
  view: 'terms' | 'privacy' | 'refund';
}

const LegalPage: React.FC<LegalPageProps> = ({ view }) => {
  const content = {
    terms: {
      title: 'شروط الاستخدام',
      icon: Scale,
      color: 'bg-blue-100 text-blue-700 border-blue-700',
      lastUpdated: '1 ديسمبر 2024',
      sections: [
        { title: 'قبول الشروط', text: 'باستخدامك لمنصة KWQ8، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق، يرجى التوقف عن استخدام المنصة.' },
        { title: 'استخدام الحساب', text: 'أنت مسؤول عن الحفاظ على سرية معلومات حسابك وكلمة المرور، وعن جميع الأنشطة التي تحدث تحت حسابك.' },
        { title: 'الملكية الفكرية', text: 'محتوى موقعك الذي تنشئه هو ملك لك، ولكن الكود البريدي والتصميمات الأساسية للمنصة تظل ملكية فكرية لشركة سبرينغوود.' },
        { title: 'نظام الرصيد', text: 'الرصيد المشترى صالح لمدة 90 يوماً من تاريخ الشراء ولا يمكن تحويله لحساب آخر.' }
      ]
    },
    privacy: {
      title: 'سياسة الخصوصية',
      icon: Lock,
      color: 'bg-violet-100 text-violet-700 border-violet-700',
      lastUpdated: '1 ديسمبر 2024',
      sections: [
        { title: 'المعلومات التي نجمعها', text: 'نجمع فقط المعلومات الضرورية لتشغيل حسابك، مثل البريد الإلكتروني والاسم ومعلومات الدفع المشفرة.' },
        { title: 'كيف نستخدم بياناتك', text: 'نستخدم بياناتك لتحسين خدماتنا، والتواصل معك بخصوص حسابك، وتخصيص تجربة بناء المواقع.' },
        { title: 'أمن البيانات', text: 'نستخدم أحدث تقنيات التشفير لحماية بياناتك، ولا نقوم ببيع معلوماتك لأي طرف ثالث.' },
        { title: 'ملفات تعريف الارتباط (Cookies)', text: 'نستخدم الكوكيز لضمان بقاء تسجيل دخولك فعالاً وتحليل أداء الموقع.' }
      ]
    },
    refund: {
      title: 'سياسة الاسترداد',
      icon: RefreshCcw,
      color: 'bg-pink-100 text-pink-700 border-pink-700',
      lastUpdated: '1 ديسمبر 2024',
      sections: [
        { title: 'سياسة استرداد الرصيد', text: 'نظراً لأن خدماتنا رقمية وتعتمد على استهلاك موارد الـ AI فوراً، فإن الرصيد المستخدم لا يمكن استرداده.' },
        { title: 'الرصيد غير المستخدم', text: 'يمكنك طلب استرداد مبالغ الرصيد غير المستخدم خلال 24 ساعة من عملية الشراء فقط.' },
        { title: 'الدفع المكرر أو الخطأ', text: 'في حال حدوث خطأ في عملية الدفع أو تكرار العملية، يرجى التواصل مع الدعم الفني فوراً وسنقوم بمعالجة الأمر.' },
        { title: 'إغلاق الحساب', text: 'في حال إغلاق الحساب بسبب مخالفة شروط الاستخدام، يسقط الحق في المطالبة بأي مبالغ متبقية.' }
      ]
    }
  }[view];

  const Icon = content.icon;

  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        
        {/* Header */}
        <header className="mb-16">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border-2 font-black text-xs mb-6 ${content.color}`}>
                <Icon size={14} /> {content.title}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-black mb-6 font-heading">
                {content.title}
            </h1>
            <p className="text-slate-400 font-bold">آخر تحديث: {content.lastUpdated}</p>
        </header>

        {/* Content Body */}
        <div className="bg-slate-50 border-[3px] border-black rounded-3xl p-8 md:p-12 shadow-neo relative">
            <div className="space-y-12 text-right" dir="rtl">
                {content.sections.map((section, i) => (
                    <div key={i} className="space-y-4">
                        <h2 className="text-2xl font-black text-black flex items-center gap-3">
                            <span className="w-8 h-8 bg-white border-2 border-black rounded-lg flex items-center justify-center text-sm">{i + 1}</span>
                            {section.title}
                        </h2>
                        <p className="text-lg text-slate-600 font-bold leading-relaxed pr-11">
                            {section.text}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-16 pt-12 border-t-2 border-slate-200">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2 text-slate-500 font-bold">
                        <ShieldCheck className="text-green-600" /> موثق من شركة سبرينغوود
                    </div>
                    <div className="flex gap-4">
                        <button className="text-sm font-black text-slate-400 hover:text-black transition-colors">تحميل نسخة PDF</button>
                        <button className="text-sm font-black text-slate-400 hover:text-black transition-colors">طباعة</button>
                    </div>
                </div>
            </div>
        </div>

        {/* Sidebar-like internal links */}
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
            {view !== 'terms' && <a href="#terms" className="text-slate-500 hover:text-[#7C3AED] font-black underline decoration-2">شروط الاستخدام</a>}
            {view !== 'privacy' && <a href="#privacy" className="text-slate-500 hover:text-[#7C3AED] font-black underline decoration-2">سياسة الخصوصية</a>}
            {view !== 'refund' && <a href="#refund" className="text-slate-500 hover:text-[#7C3AED] font-black underline decoration-2">سياسة الاسترداد</a>}
        </div>

      </div>
    </div>
  );
};

export default LegalPage;