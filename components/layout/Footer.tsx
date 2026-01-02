import React from 'react';
import { Twitter, Instagram, Linkedin, Heart, Mail, Coffee } from 'lucide-react';
import Button from '../ui/Button';
import { ViewState } from '../../types';

interface FooterProps {
  onNavigate: (view: ViewState) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t-[4px] border-black">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Newsletter */}
        <div className="flex flex-col md:flex-row items-center justify-between border-b-2 border-white/20 pb-12 mb-12 gap-8">
            <div className="text-center md:text-right">
                <h3 className="text-3xl font-black text-white mb-2 flex items-center gap-2 justify-center md:justify-start">
                    لنبقى على تواصل <Mail className="text-pink-500" />
                </h3>
                <p className="text-slate-400 font-medium">آخر التحديثات والنصائح لبناء موقعك</p>
            </div>
            <div className="flex w-full md:w-auto gap-3">
                <input 
                    type="email" 
                    placeholder="بريدك الإلكتروني" 
                    className="bg-white border-[3px] border-white text-black font-bold px-4 py-3 rounded-xl w-full md:w-80 focus:outline-none focus:bg-yellow-100 focus:shadow-[4px_4px_0px_0px_#ffffff] transition-all"
                />
                <Button variant="accent" className="rounded-xl shadow-[4px_4px_0px_0px_#ffffff]">اشترك</Button>
            </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-sm">
            <div>
                <h4 className="text-yellow-400 font-black text-lg mb-6 uppercase">المنتج</h4>
                <ul className="space-y-4 font-bold text-slate-300">
                    <li><button onClick={() => onNavigate('landing')} className="hover:text-white hover:underline decoration-2 underline-offset-4 transition-all">الميزات</button></li>
                    <li><button onClick={() => onNavigate('landing')} className="hover:text-white hover:underline decoration-2 underline-offset-4 transition-all">القوالب</button></li>
                    <li><button onClick={() => onNavigate('landing')} className="hover:text-white hover:underline decoration-2 underline-offset-4 transition-all">الأسعار</button></li>
                    <li><button onClick={() => onNavigate('changelog')} className="hover:text-white hover:underline decoration-2 underline-offset-4 transition-all">سجل التحديثات</button></li>
                </ul>
            </div>
            <div>
                <h4 className="text-pink-400 font-black text-lg mb-6 uppercase">الشركة</h4>
                <ul className="space-y-4 font-bold text-slate-300">
                    <li><button onClick={() => onNavigate('about')} className="hover:text-white hover:underline decoration-2 underline-offset-4 transition-all">عن KWQ8</button></li>
                    <li><button onClick={() => onNavigate('blog')} className="hover:text-white hover:underline decoration-2 underline-offset-4 transition-all">المدونة</button></li>
                    <li><button onClick={() => onNavigate('hiring')} className="flex items-center gap-2 hover:text-white transition-colors">وظائف <span className="text-xs bg-violet-600 text-white px-1.5 py-0.5 rounded border border-white">New</span></button></li>
                    <li><button onClick={() => onNavigate('contact')} className="hover:text-white hover:underline decoration-2 underline-offset-4 transition-all">تواصل معنا</button></li>
                </ul>
            </div>
            <div>
                <h4 className="text-cyan-400 font-black text-lg mb-6 uppercase">الدعم</h4>
                <ul className="space-y-4 font-bold text-slate-300">
                    <li><button onClick={() => onNavigate('public-help')} className="hover:text-white hover:underline decoration-2 underline-offset-4 transition-all">مركز المساعدة</button></li>
                    <li><button onClick={() => onNavigate('public-help')} className="hover:text-white hover:underline decoration-2 underline-offset-4 transition-all">الأسئلة الشائعة</button></li>
                    <li><button onClick={() => onNavigate('system-status')} className="hover:text-white hover:underline decoration-2 underline-offset-4 transition-all">حالة النظام</button></li>
                    <li><button onClick={() => onNavigate('contact')} className="hover:text-white hover:underline decoration-2 underline-offset-4 transition-all">واتساب</button></li>
                </ul>
            </div>
            <div>
                <h4 className="text-green-400 font-black text-lg mb-6 uppercase">القانونية</h4>
                <ul className="space-y-4 font-bold text-slate-300">
                    <li><button onClick={() => onNavigate('terms')} className="hover:text-white hover:underline decoration-2 underline-offset-4 transition-all">شروط الاستخدام</button></li>
                    <li><button onClick={() => onNavigate('privacy')} className="hover:text-white hover:underline decoration-2 underline-offset-4 transition-all">سياسة الخصوصية</button></li>
                    <li><button onClick={() => onNavigate('refund')} className="hover:text-white hover:underline decoration-2 underline-offset-4 transition-all">سياسة الاسترداد</button></li>
                </ul>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t-2 border-white/20 gap-4">
            <div className="flex items-center gap-4">
                <span className="text-3xl font-black font-heading text-white">KWQ8</span>
                <span className="text-slate-400 font-bold">© 2025 سبرينغوود</span>
            </div>
            
            <div className="flex gap-4">
                <div className="bg-white p-2 rounded border-2 border-white hover:bg-yellow-400 hover:border-yellow-400 transition-colors cursor-pointer group">
                    <Twitter className="w-5 h-5 text-black" />
                </div>
                <div className="bg-white p-2 rounded border-2 border-white hover:bg-pink-400 hover:border-pink-400 transition-colors cursor-pointer group">
                    <Instagram className="w-5 h-5 text-black" />
                </div>
                <div className="bg-white p-2 rounded border-2 border-white hover:bg-blue-400 hover:border-blue-400 transition-colors cursor-pointer group">
                    <Linkedin className="w-5 h-5 text-black" />
                </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 font-bold group cursor-default bg-white/10 px-3 py-1 rounded-full border border-white/10">
                <span>صُنع بـ</span>
                <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                <span>و</span>
                <Coffee className="w-3 h-3 text-yellow-500" />
                <span>في الكويت 🇰🇼</span>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;