import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, AlertCircle, RefreshCw } from 'lucide-react';
import Button from '../ui/Button';
import { ViewState } from '../../types';

interface ForgotPasswordProps {
  onNavigate: (view: ViewState) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    let interval: number;
    if (cooldown > 0) {
      interval = window.setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [cooldown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('idle');
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Simple validation simulation
      if (!email.includes('@')) {
          setStatus('error');
      } else {
          setStatus('success');
          setCooldown(60);
      }
    }, 1500);
  };

  const handleResend = () => {
    if (cooldown > 0) return;
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        setCooldown(60);
    }, 1500);
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Panel (Decorative) */}
      <div className="hidden lg:flex lg:w-2/5 bg-[#7C3AED] relative overflow-hidden items-center justify-center p-12 text-center border-l-2 border-black">
        {/* Geometric Decor */}
        <div className="absolute top-10 left-10 w-24 h-24 border-4 border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 border-4 border-white/20 rotate-45"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-4 border-white/20 rounded-full"></div>
        
        <div className="relative z-10 text-white">
          <div className="text-8xl mb-6">🔐</div>
          <h2 className="text-4xl font-black mb-4 font-heading">نسيت كلمة السر؟</h2>
          <p className="text-xl font-medium opacity-90 max-w-sm mx-auto">لا تقلق، يحصل للجميع!</p>
        </div>
      </div>

      {/* Right Panel (Form) */}
      <div className="w-full lg:w-3/5 flex items-center justify-center p-6 md:p-12 bg-[#FAFAFA]">
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-lg"
        >
            <div 
                className="mb-8 cursor-pointer inline-block group"
                onClick={() => onNavigate('landing')}
            >
                <span className="font-heading tracking-tighter text-2xl font-black bg-black text-white px-2 py-1 transform -rotate-2 inline-block group-hover:rotate-0 transition-transform">KWQ8</span>
            </div>

            <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-black text-black">━━━━━━━━━━━━━━ استعادة كلمة السر</h1>
            </div>
            <p className="text-[#525252] font-bold mb-8">أدخل بريدك الإلكتروني وسنرسل لك رابط لإعادة تعيين كلمة السر</p>

            <AnimatePresence mode='wait'>
                {status === 'success' ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#F0FDF4] border-[3px] border-[#22C55E] p-6 rounded-xl shadow-[4px_4px_0px_0px_#22C55E]"
                    >
                        <div className="flex items-center gap-3 mb-4 border-b-2 border-[#22C55E]/20 pb-4">
                            <div className="w-8 h-8 bg-[#22C55E] rounded-full flex items-center justify-center text-white border-2 border-[#14532D]">
                                <Check size={18} strokeWidth={4} />
                            </div>
                            <h3 className="text-xl font-black text-green-900">✓ تم إرسال الرابط! ━━━━━━━━━━━━━━</h3>
                        </div>
                        
                        <div className="space-y-4 mb-6">
                            <p className="font-bold text-green-800">📧 تحقق من بريدك الإلكتروني</p>
                            <p className="text-green-700 text-sm font-medium bg-white/50 p-3 rounded border border-green-200">
                                "أرسلنا رابط استعادة كلمة السر إلى"<br/>
                                <span className="font-black underline text-green-900">{email}</span>
                            </p>
                            <div className="inline-flex items-center gap-2 bg-[#22C55E] text-white px-3 py-1 rounded border-2 border-green-900 text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
                                ⏱️ الرابط صالح لمدة 30 دقيقة
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 pt-4 border-t-2 border-[#22C55E]/20">
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-sm font-bold text-green-900">لم يصلك شيء؟</span>
                                <button 
                                    onClick={handleResend}
                                    disabled={cooldown > 0 || isLoading}
                                    className={`text-sm font-black flex items-center gap-1 transition-all ${
                                        cooldown > 0 
                                        ? 'text-slate-400 cursor-not-allowed' 
                                        : 'text-black bg-[#FACC15] px-2 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-none'
                                    }`}
                                >
                                    {isLoading ? <RefreshCw className="animate-spin w-3 h-3"/> : '◆'}
                                    {cooldown > 0 ? ` إعادة الإرسال (${cooldown})` : ' إعادة الإرسال'}
                                </button>
                            </div>
                            <button 
                                onClick={() => onNavigate('login')}
                                className="w-full py-3 bg-white border-2 border-[#22C55E] text-green-700 font-bold rounded-lg hover:bg-green-50 transition-colors mt-2"
                            >
                                ← العودة لتسجيل الدخول
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.form 
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit} 
                        className="space-y-6"
                    >
                        <div>
                            <label className="block text-sm font-bold text-black mb-2">البريد الإلكتروني</label>
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full px-5 py-4 bg-white border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_#000] focus:outline-none focus:border-[#7C3AED] focus:shadow-[4px_4px_0px_0px_#7C3AED] transition-all text-left font-medium text-lg placeholder:text-slate-300 ${status === 'error' ? 'border-red-500 shadow-[4px_4px_0px_0px_#EF4444] animate-[shake_0.3s_ease]' : ''}`}
                                dir="ltr"
                                placeholder="your@email.com"
                                required
                            />
                            {status === 'error' && (
                                <motion.p 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-sm font-bold mt-2 flex items-center gap-1"
                                >
                                    <AlertCircle size={16} strokeWidth={2.5} />
                                    ✗ لم نجد حساباً بهذا البريد
                                </motion.p>
                            )}
                        </div>

                        <Button 
                            variant="primary" 
                            fullWidth 
                            size="lg"
                            type="submit"
                            disabled={isLoading}
                            className="bg-[#7C3AED] border-black hover:bg-[#6D28D9] h-14 text-lg shadow-[4px_4px_0px_0px_#000]"
                        >
                            {isLoading ? 'جاري الإرسال...' : (
                                <span className="flex items-center gap-2">
                                    → إرسال رابط الاستعادة
                                </span>
                            )}
                        </Button>

                        <div className="text-center pt-4">
                            <button 
                                type="button"
                                onClick={() => onNavigate('login')}
                                className="text-[#7C3AED] font-bold hover:text-black transition-colors relative group"
                            >
                                ← العودة لتسجيل الدخول
                                <span className="absolute -bottom-1 left-0 w-0 h-2 bg-[#FACC15] -z-10 transition-all group-hover:w-full opacity-50"></span>
                            </button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;