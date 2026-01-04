import React from 'react';
import Link from "next/link";
import { Instagram, Twitter, Linkedin, MessageCircle, Heart, Mail, Coffee } from "lucide-react";
// Fixed: Standardized import casing to uppercase GradientText.tsx
import GradientText from "../ui/GradientText.tsx";
// Fixed: Standardized import casing to uppercase Button.tsx
import Button from '../ui/Button.tsx';
import { ViewState } from '../../types.ts';

/**
 * Public Footer used in layout.tsx
 */
export function Footer() {
  return (
    <footer className="bg-surface-dark text-content-inverse border-t-3 border-black">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-2xl font-bold">
              <GradientText>KWQ8</GradientText>
            </Link>
            <p className="mt-4 text-content-muted text-sm">
              أداة بناء المواقع الأولى للعرب
            </p>
            {/* Social Links */}
            <div className="flex gap-3 mt-4">
              <a href="https://twitter.com/kwq8" target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-border-dark hover:border-brand-violet hover:text-brand-violet transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/kwq8" target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-border-dark hover:border-brand-violet hover:text-brand-violet transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/company/kwq8" target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-border-dark hover:border-brand-violet hover:text-brand-violet transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://wa.me/96500000000" target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-border-dark hover:border-brand-violet hover:text-brand-violet transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="font-bold mb-4">المنتج</h4>
            <ul className="space-y-2">
              <li><Link href="/features" className="text-content-muted hover:text-white transition-colors">الميزات</Link></li>
              <li><Link href="/templates" className="text-content-muted hover:text-white transition-colors">القوالب</Link></li>
              <li><Link href="/pricing" className="text-content-muted hover:text-white transition-colors">الأسعار</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">الشركة</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-content-muted hover:text-white transition-colors">عن KWQ8</Link></li>
              <li><Link href="/blog" className="text-content-muted hover:text-white transition-colors">المدونة</Link></li>
              <li><Link href="/contact" className="text-content-muted hover:text-white transition-colors">تواصل معنا</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">الدعم</h4>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-content-muted hover:text-white transition-colors">مركز المساعدة</Link></li>
              <li><Link href="/status" className="text-content-muted hover:text-white transition-colors">حالة النظام</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">القانونية</h4>
            <ul className="space-y-2">
              <li><Link href="/terms" className="text-content-muted hover:text-white transition-colors">شروط الاستخدام</Link></li>
              <li><Link href="/privacy" className="text-content-muted hover:text-white transition-colors">سياسة الخصوصية</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border-dark flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-content-muted text-sm">© 2025 سبرينغوود. جميع الحقوق محفوظة</p>
          <div className="flex items-center gap-2 text-sm text-content-muted">
            <span>🇰🇼</span>
            <span>صُنع في الكويت</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

interface LandingFooterProps {
  onNavigate: (view: ViewState) => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t-[4px] border-black">
      <div className="container mx-auto px-4 md:px-8">
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
                    className="bg-white border-[3px] border-white text-black font-bold px-4 py-3 rounded-xl w-full md:w-80 focus:outline-none focus:bg-yellow-100 transition-all"
                />
                <Button className="rounded-xl" onClick={() => {}}>اشترك</Button>
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-sm">
            <div>
                <h4 className="text-yellow-400 font-black text-lg mb-6 uppercase">المنتج</h4>
                <ul className="space-y-4 font-bold text-slate-300">
                    <li><button onClick={() => onNavigate('landing')} className="hover:text-white">الميزات</button></li>
                    <li><button onClick={() => onNavigate('landing')} className="hover:text-white">الأسعار</button></li>
                    <li><button onClick={() => onNavigate('changelog')} className="hover:text-white">سجل التحديثات</button></li>
                </ul>
            </div>
            <div>
                <h4 className="text-pink-400 font-black text-lg mb-6 uppercase">الشركة</h4>
                <ul className="space-y-4 font-bold text-slate-300">
                    <li><button onClick={() => onNavigate('about')} className="hover:text-white">عن KWQ8</button></li>
                    <li><button onClick={() => onNavigate('blog')} className="hover:text-white">المدونة</button></li>
                    <li><button onClick={() => onNavigate('contact')} className="hover:text-white">تواصل معنا</button></li>
                </ul>
            </div>
            <div>
                <h4 className="text-cyan-400 font-black text-lg mb-6 uppercase">الدعم</h4>
                <ul className="space-y-4 font-bold text-slate-300">
                    <li><button onClick={() => onNavigate('public-help')} className="hover:text-white">مركز المساعدة</button></li>
                    <li><button onClick={() => onNavigate('system-status')} className="hover:text-white">حالة النظام</button></li>
                    <li><a href="https://wa.me/96598765432" target="_blank" className="hover:text-white">واتساب</a></li>
                </ul>
            </div>
            <div>
                <h4 className="text-green-400 font-black text-lg mb-6 uppercase">القانونية</h4>
                <ul className="space-y-4 font-bold text-slate-300">
                    <li><button onClick={() => onNavigate('terms')} className="hover:text-white">شروط الاستخدام</button></li>
                </ul>
            </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t-2 border-white/20 gap-4">
            <div className="flex items-center gap-4">
                <span className="text-3xl font-black font-heading text-white">KWQ8</span>
                <span className="text-slate-400 font-bold">© 2025 سبرينغوود</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-bold bg-white/10 px-3 py-1 rounded-full">
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
