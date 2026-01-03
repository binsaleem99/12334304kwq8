import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
// Fixed: Standardized casing for button.tsx import
import Button from '../ui/button.tsx';
import { AuthCard } from './index.ts';
import { ViewState } from '../../types.ts';

interface EmailVerificationProps {
  onNavigate: (view: ViewState) => void;
}

type Status = 'pending' | 'success' | 'error' | 'loading';

const EmailVerification: React.FC<EmailVerificationProps> = ({ onNavigate }) => {
  const [status, setStatus] = useState<Status>('pending');
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    // Check for mock token verification scenario
    const hasToken = window.location.href.includes('token');
    if (hasToken) {
      setStatus('loading');
      setTimeout(() => setStatus('success'), 2000);
    }
  }, []);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleResend = () => {
    if (cooldown > 0) return;
    setCooldown(60);
    // Simulate resend logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-secondary p-4 md:p-8" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <AuthCard
          title={
            status === 'success' ? "تم التحقق!" : 
            status === 'loading' ? "جاري التحقق..." : 
            "تأكيد الحساب"
          }
          description={
            status === 'success' ? "أهلاً بك في KWQ8" : 
            "تحقق من بريدك الإلكتروني للمتابعة"
          }
          onLogoClick={() => onNavigate('landing')}
        >
          <div className="text-center py-6">
            {status === 'loading' && (
              <div className="flex flex-col items-center gap-6">
                <RefreshCw className="h-16 w-16 text-brand-violet animate-spin" strokeWidth={3} />
                <p className="text-content-secondary font-bold">جاري معالجة طلب التحقق الخاص بك...</p>
              </div>
            )}

            {status === 'pending' && (
              <div className="space-y-8">
                <div className="inline-flex p-5 bg-violet-50 border-3 border-brand-violet shadow-brutal rounded-2xl">
                  <Mail className="h-12 w-12 text-brand-violet" strokeWidth={2.5} />
                </div>
                
                <div className="space-y-4">
                  <p className="text-lg font-bold text-black leading-relaxed">
                    لقد أرسلنا رابط تفعيل إلى بريدك الإلكتروني.
                    <br />
                    <span className="text-brand-violet font-black">user@example.com</span>
                  </p>
                  
                  <div className="bg-slate-50 border-2 border-black/5 rounded-xl p-4 text-right">
                    <h4 className="font-black text-sm text-black mb-2 uppercase">ماذا تفعل الآن؟</h4>
                    <ul className="text-sm font-bold text-slate-600 space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-brand-lime flex items-center justify-center text-[10px] text-black border border-black">1</div>
                        افتح صندوق الوارد الخاص بك
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-brand-lime flex items-center justify-center text-[10px] text-black border border-black">2</div>
                        اضغط على زر التفعيل في الرسالة
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-slate-100 flex flex-col gap-4">
                  <button
                    onClick={handleResend}
                    disabled={cooldown > 0}
                    className="flex items-center justify-center gap-2 font-black text-brand-violet hover:underline disabled:text-slate-400 disabled:no-underline"
                  >
                    <RefreshCw size={18} className={cooldown > 0 ? "animate-spin" : ""} />
                    {cooldown > 0 ? `إعادة الإرسال خلال ${cooldown} ثانية` : "لم تصلك الرسالة؟ أعد الإرسال"}
                  </button>
                </div>
              </div>
            )}

            {status === 'success' && (
              <div className="space-y-8">
                <div className="inline-flex p-5 bg-brand-lime border-3 border-black shadow-brutal rounded-2xl">
                  <CheckCircle className="h-12 w-12 text-black" strokeWidth={2.5} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-black">مبروك! حسابك نشط الآن</h3>
                  <p className="text-content-secondary font-bold">ابدأ رحلتك الإبداعية الآن وابنِ موقعك الأول في دقائق.</p>
                </div>
                <Button
                  variant="gradient"
                  fullWidth
                  size="xl"
                  onClick={() => onNavigate('dashboard')}
                  className="shadow-brutal"
                >
                  الذهاب للوحة التحكم
                  <ArrowLeft className="ms-2 h-6 w-6 rtl-flip" />
                </Button>
              </div>
            )}

            {status === 'error' && (
              <div className="space-y-8">
                <div className="inline-flex p-5 bg-red-50 border-3 border-red-500 shadow-brutal rounded-2xl">
                  <AlertCircle className="h-12 w-12 text-red-500" strokeWidth={2.5} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-red-600">عذراً، الرابط غير صالح</h3>
                  <p className="text-content-secondary font-bold">ربما انتهت صلاحية الرابط أو تم استخدامه مسبقاً.</p>
                </div>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setStatus('pending')}
                >
                  إرسال رابط جديد
                </Button>
              </div>
            )}
          </div>
        </AuthCard>
      </motion.div>
    </div>
  );
};

export default EmailVerification;