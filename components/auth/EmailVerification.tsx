import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Mail, AlertTriangle } from 'lucide-react';
import Button from '../ui/Button';
import { ViewState } from '../../types';

interface EmailVerificationProps {
  onNavigate: (view: ViewState) => void;
}

type VerificationStatus = 'pending' | 'loading' | 'success' | 'invalid' | 'already_verified';

const EmailVerification: React.FC<EmailVerificationProps> = ({ onNavigate }) => {
  const [status, setStatus] = useState<VerificationStatus>('pending');
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    // Check for token in URL
    const hasToken = window.location.href.includes('token');

    if (hasToken) {
        setStatus('loading');
        // Simulate API verification
        setTimeout(() => {
            // Randomly succeed or fail for demo purposes, or default to success
            setStatus('success');
            
            // Auto redirect
            setTimeout(() => {
                onNavigate('landing'); // Redirect to dashboard normally
            }, 3000);
        }, 2000);
    } else {
        setStatus('pending');
    }
  }, [onNavigate]);

  useEffect(() => {
    let interval: number;
    if (cooldown > 0) {
      interval = window.setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [cooldown]);

  const handleResend = () => {
    if (cooldown > 0) return;
    setCooldown(60);
    // Simulate resend API call
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[520px]"
      >
        {/* Header Logo */}
        <div className="text-center mb-8">
            <span 
                onClick={() => onNavigate('landing')}
                className="cursor-pointer font-heading tracking-tighter text-3xl font-black bg-black text-white px-2 py-1 transform -rotate-2 inline-block hover:rotate-0 transition-transform"
            >
                KWQ8
            </span>
        </div>

        {/* LOADING STATE */}
        {status === 'loading' && (
            <div className="bg-white border-[3px] border-black p-8 rounded-2xl shadow-[4px_4px_0px_0px_#000] text-center">
                <div className="w-16 h-16 mx-auto mb-6 relative">
                    <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-[#7C3AED] border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h2 className="text-2xl font-black text-black mb-2">⟳ جاري التحقق...</h2>
                <p className="text-slate-500 font-medium">نتحقق من بريدك الإلكتروني</p>
            </div>
        )}

        {/* SUCCESS STATE */}
        {status === 'success' && (
            <div className="bg-[#F0FDF4] border-[3px] border-[#22C55E] p-8 rounded-2xl shadow-[4px_4px_0px_0px_#22C55E] text-center relative overflow-hidden">
                <div className="w-20 h-20 bg-[#22C55E] rounded-full flex items-center justify-center mx-auto mb-6 text-white border-4 border-[#14532D] shadow-sm animate-[bounce_1s_infinite]">
                    <Check size={40} strokeWidth={4} />
                </div>
                <h2 className="text-3xl font-black text-green-900 mb-2">✓ تم التحقق!</h2>
                <p className="text-green-800 font-bold text-lg mb-6">🎉 مرحباً بك! بريدك الإلكتروني تم تأكيده بنجاح</p>
                <div className="bg-white/50 rounded-lg p-3 text-sm text-green-700 font-medium inline-block mb-6 border border-green-200">
                    سيتم توجيهك للوحة التحكم خلال 3 ثوانٍ...
                </div>
                <Button 
                    variant="primary" 
                    fullWidth 
                    onClick={() => onNavigate('landing')}
                    className="bg-[#22C55E] border-black hover:bg-green-600 text-white"
                >
                    → الذهاب للوحة التحكم الآن
                </Button>
            </div>
        )}

        {/* PENDING STATE (Check Email) */}
        {status === 'pending' && (
            <div className="bg-white border-[3px] border-black p-8 rounded-2xl shadow-[4px_4px_0px_0px_#000] text-center">
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-black">
                    <Mail size={32} className="text-black" />
                </div>
                
                <h2 className="text-2xl font-black text-black mb-4">📧 تحقق من بريدك</h2>
                
                <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4 mb-6">
                    <p className="text-slate-500 text-sm font-bold mb-1">أرسلنا رابط تأكيد إلى:</p>
                    <p className="text-[#7C3AED] font-black text-lg">user@email.com</p>
                </div>

                <div className="space-y-3 text-right bg-slate-50 p-4 rounded-xl border-2 border-slate-100 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center border border-green-500 text-green-700 text-xs">✓</div>
                        <span className="font-bold text-sm">افتح بريدك الإلكتروني</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center border border-green-500 text-green-700 text-xs">✓</div>
                        <span className="font-bold text-sm">ابحث عن رسالة من KWQ8</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center border border-green-500 text-green-700 text-xs">✓</div>
                        <span className="font-bold text-sm">اضغط على رابط التأكيد</span>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <span className="text-xs font-bold text-slate-500">لم تصلك الرسالة؟</span>
                        <button 
                            onClick={handleResend}
                            disabled={cooldown > 0}
                            className={`px-3 py-1.5 rounded text-xs font-black border-2 border-black transition-all ${
                                cooldown > 0 
                                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                                : 'bg-[#FACC15] hover:bg-yellow-400 shadow-[2px_2px_0px_0px_#000] active:translate-y-[1px] active:shadow-none'
                            }`}
                        >
                            {cooldown > 0 ? `انتظر ${cooldown}ث` : '◆ إعادة الإرسال'}
                        </button>
                    </div>
                    
                    <p className="text-xs text-slate-400 font-bold">
                        تأكد من مراجعة مجلد الرسائل غير المرغوبة (Spam)
                    </p>
                </div>
                
                <div className="mt-8 pt-6 border-t-2 border-slate-100">
                    <button 
                        onClick={() => onNavigate('signup')}
                        className="text-slate-500 text-sm font-bold hover:text-black underline decoration-2 underline-offset-4"
                    >
                        تغيير البريد الإلكتروني
                    </button>
                </div>
            </div>
        )}

        {/* INVALID STATE */}
        {status === 'invalid' && (
            <div className="bg-[#FEF2F2] border-[3px] border-[#EF4444] p-8 rounded-2xl shadow-[4px_4px_0px_0px_#EF4444] text-center">
                 <div className="w-16 h-16 bg-[#EF4444] rounded-full flex items-center justify-center mx-auto mb-6 text-white border-2 border-red-900">
                    <AlertTriangle size={32} strokeWidth={3} />
                </div>
                <h2 className="text-2xl font-black text-red-900 mb-2">✗ رابط غير صالح</h2>
                <p className="text-red-800 font-medium mb-8">
                    ⚠️ هذا الرابط منتهي الصلاحية أو غير صحيح
                </p>
                <div className="flex flex-col gap-3">
                    <Button variant="primary" className="bg-[#7C3AED] border-black">
                        ◆ إرسال رابط جديد
                    </Button>
                    <button 
                        onClick={() => onNavigate('login')}
                        className="text-slate-500 font-bold hover:text-black hover:underline"
                    >
                        ← العودة لتسجيل الدخول
                    </button>
                </div>
            </div>
        )}

        {/* ALREADY VERIFIED */}
        {status === 'already_verified' && (
            <div className="bg-white border-[3px] border-[#7C3AED] p-8 rounded-2xl shadow-[4px_4px_0px_0px_#7C3AED] text-center">
                 <div className="w-16 h-16 bg-[#7C3AED] rounded-full flex items-center justify-center mx-auto mb-6 text-white border-2 border-purple-900">
                    <Check size={32} strokeWidth={3} />
                </div>
                <h2 className="text-2xl font-black text-purple-900 mb-2">◆ تم التحقق مسبقاً</h2>
                <p className="text-purple-800 font-medium mb-8">
                    👋 مرحباً! بريدك مؤكد بالفعل. يمكنك تسجيل الدخول.
                </p>
                <Button 
                    variant="primary" 
                    fullWidth 
                    onClick={() => onNavigate('login')}
                >
                    → تسجيل الدخول
                </Button>
            </div>
        )}

      </motion.div>
    </div>
  );
};

export default EmailVerification;