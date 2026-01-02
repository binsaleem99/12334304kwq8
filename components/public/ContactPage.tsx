import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, MapPin, Clock, Send, Phone, CheckCircle2, Globe } from 'lucide-react';
import { ViewState } from '../../types';
import Button from '../ui/Button';

interface ContactPageProps {
  onNavigate: (view: ViewState) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-32 pb-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-20">
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 border-2 border-green-700 text-sm font-black mb-8"
            >
                <MessageCircle size={16} fill="currentColor" /> نحن هنا للمساعدة
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black text-black mb-8 font-heading leading-tight">
                دعنا نتحدث عن <br/> <span className="text-[#7C3AED]">مشروعك القادم</span>
            </h1>
            <p className="text-xl text-slate-600 font-bold max-w-2xl mx-auto">
                لديك استفسار؟ تواجه مشكلة تقنية؟ أو تريد باقة مخصصة لشركتك؟ فريقنا جاهز للرد عليك.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            
            {/* Contact Info Sidebar */}
            <div className="space-y-8">
                <div className="bg-slate-50 border-[3px] border-black rounded-3xl p-8 shadow-neo-sm">
                    <h3 className="text-2xl font-black text-black mb-8">معلومات التواصل</h3>
                    
                    <div className="space-y-8">
                        <div className="flex gap-4 items-start">
                            <div className="w-12 h-12 rounded-xl bg-violet-100 border-2 border-black flex items-center justify-center shrink-0">
                                <Mail className="text-[#7C3AED]" size={24} />
                            </div>
                            <div>
                                <div className="font-black text-black text-lg">البريد الإلكتروني</div>
                                <div className="text-slate-500 font-bold font-mono">hi@kwq8.com</div>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <div className="w-12 h-12 rounded-xl bg-green-100 border-2 border-black flex items-center justify-center shrink-0">
                                <Phone className="text-green-600" size={24} />
                            </div>
                            <div>
                                <div className="font-black text-black text-lg">واتساب الدعم</div>
                                <div className="text-slate-500 font-bold font-mono">+965 9876 5432</div>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <div className="w-12 h-12 rounded-xl bg-yellow-100 border-2 border-black flex items-center justify-center shrink-0">
                                <Clock className="text-yellow-700" size={24} />
                            </div>
                            <div>
                                <div className="font-black text-black text-lg">ساعات العمل</div>
                                <div className="text-slate-500 font-bold">الأحد - الخميس (9 ص - 6 م)</div>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <div className="w-12 h-12 rounded-xl bg-pink-100 border-2 border-black flex items-center justify-center shrink-0">
                                <MapPin className="text-pink-600" size={24} />
                            </div>
                            <div>
                                <div className="font-black text-black text-lg">الموقع</div>
                                <div className="text-slate-500 font-bold">برج الحمراء، مدينة الكويت</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-black text-white border-[3px] border-black rounded-3xl p-8 shadow-neo-sm relative overflow-hidden group cursor-pointer" onClick={() => onNavigate('dashboard-help')}>
                    <div className="absolute top-0 left-0 w-full h-1 bg-violet-500"></div>
                    <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                        تبحث عن إجابات فورية؟ <Globe className="text-violet-400" />
                    </h3>
                    <p className="text-slate-400 text-sm font-bold mb-6">
                        راجع مركز المساعدة الخاص بنا للحصول على شروحات مفصلة لكل ميزات المنصة.
                    </p>
                    <div className="text-[#7C3AED] font-black flex items-center gap-2 group-hover:gap-3 transition-all">
                        زيارة مركز المساعدة ←
                    </div>
                </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
                <div className="bg-white border-[4px] border-black rounded-3xl p-8 md:p-12 shadow-neo-lg relative">
                    <h2 className="text-3xl font-black text-black mb-8">أرسل لنا رسالة</h2>
                    
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-black text-black mb-2">الاسم بالكامل</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-slate-50 border-[3px] border-black rounded-xl px-4 py-3 font-bold text-black focus:shadow-neo-sm focus:outline-none transition-all"
                                    placeholder="محمد أحمد"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-black text-black mb-2">البريد الإلكتروني</label>
                                <input 
                                    type="email" 
                                    className="w-full bg-slate-50 border-[3px] border-black rounded-xl px-4 py-3 font-bold text-black focus:shadow-neo-sm focus:outline-none transition-all text-left"
                                    placeholder="name@email.com"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-black text-black mb-2">الموضوع</label>
                            <select className="w-full bg-slate-50 border-[3px] border-black rounded-xl px-4 py-3 font-bold text-black focus:shadow-neo-sm focus:outline-none transition-all">
                                <option>استفسار عام</option>
                                <option>مشكلة تقنية</option>
                                <option>طلب باقة مخصصة (Enterprise)</option>
                                <option>اقتراح ميزة جديدة</option>
                                <option>أخرى</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-black text-black mb-2">رسالتك</label>
                            <textarea 
                                rows={6}
                                className="w-full bg-slate-50 border-[3px] border-black rounded-xl px-4 py-3 font-bold text-black focus:shadow-neo-sm focus:outline-none transition-all resize-none"
                                placeholder="كيف يمكننا مساعدتك اليوم؟"
                            ></textarea>
                        </div>

                        <div className="flex items-center gap-2 text-slate-500 font-bold text-sm mb-6">
                            <CheckCircle2 size={16} className="text-green-600" /> سنقوم بالرد عليك خلال 24 ساعة عمل كحد أقصى.
                        </div>

                        <button className="w-full md:w-auto bg-[#7C3AED] text-white border-[3px] border-black px-10 py-4 rounded-xl font-black text-xl shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3">
                            <Send size={24} /> إرسال الرسالة
                        </button>
                    </form>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;