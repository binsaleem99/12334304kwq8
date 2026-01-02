import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Check, Lock, Globe, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import { ViewState } from '../../types';

interface SignupProps {
  onNavigate: (view: ViewState) => void;
}

const GCC_CURRENCIES = {
  KW: { code: 'KWD', name: 'الكويت' },
  SA: { code: 'SAR', name: 'السعودية' },
  AE: { code: 'AED', name: 'الإمارات' },
  QA: { code: 'QAR', name: 'قطر' },
  BH: { code: 'BHD', name: 'البحرين' },
  OM: { code: 'OMR', name: 'عمان' },
};

const SignupForm: React.FC<SignupProps> = ({ onNavigate }) => {
  const [country, setCountry] = useState<keyof typeof GCC_CURRENCIES>('KW');
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);

  useEffect(() => {
    const prompt = localStorage.getItem('pending_website_prompt');
    if (prompt) setPendingPrompt(prompt);
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!agreed) return;
    setIsLoading(true);
    // Simulate Signup API
    setTimeout(() => {
        setIsLoading(false);
        onNavigate('verify-email');
    }, 1500);
  };

  const handleGoogleSignup = () => {
    setIsLoading(true);
    setTimeout(() => {
        localStorage.setItem('kwq8_tier', 'pro');
        onNavigate('dashboard');
        setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex bg-slate-50" dir="rtl">
       {/* Decorative Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#7C3AED] relative overflow-hidden items-center justify-center p-12 sticky top-0 h-screen border-l-[3px] border-black">
        {/* Decor */}
        <div className="absolute top-10 left-10 w-20 h-20 border-4 border-black rotate-45 bg-yellow-300"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-pink-400 rounded-full border-[3px] border-black shadow-[4px_4px_0px_0px_#000]"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-white border-[3px] border-black -rotate-12 shadow-[4px_4px_0px_0px_#000]"></div>

        <div className="relative z-10 text-center max-w-lg">
            <h2 className="text-5xl font-black text-white mb-6 font-heading drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">ابدأ مجاناً</h2>
            <p className="text-xl text-white font-bold mb-10 opacity-90">
                أنشئ حسابك واستمتع بتجربة بناء المواقع بالذكاء الاصطناعي.
            </p>
            
            <div className="bg-white border-[3px] border-black p-6 rounded-2xl shadow-[8px_8px_0px_0px_#000] text-right space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-black flex items-center justify-center text-white"><Check size={14} strokeWidth={4}/></div>
                    <span className="font-bold text-black">تسجيل مجاني بالكامل</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-black flex items-center justify-center text-white"><Check size={14} strokeWidth={4}/></div>
                    <span className="font-bold text-black">استكشف جميع الميزات</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-black flex items-center justify-center text-white"><Check size={14} strokeWidth={4}/></div>
                    <span className="font-bold text-black">اشترِ الرصيد عندما تكون جاهزاً</span>
                </div>
            </div>
        </div>
      </div>

      {/* Form Panel */}
      <div className="w-full lg:w-1/2 flex justify-center p-4 md:p-8 overflow-y-auto bg-white">
        <div className="w-full max-w-md my-auto">
            {/* Header */}
            <div className="mb-8 text-center">
                <div 
                    className="cursor-pointer inline-block mb-6"
                    onClick={() => onNavigate('landing')}
                >
                    <span className="font-heading tracking-tighter text-3xl font-black bg-black text-white px-3 py-1 transform -rotate-2 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">KWQ8</span>
                </div>

                {pendingPrompt ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-violet-50 border-2 border-violet-200 p-4 rounded-xl mb-6 text-right relative overflow-hidden"
                  >
                    <div className="flex items-center gap-2 text-violet-700 font-black text-sm mb-1">
                      <Sparkles size={16} fill="currentColor" /> فكرة موقعك رائعة!
                    </div>
                    <p className="text-violet-600 text-xs font-bold line-clamp-2 italic">"{pendingPrompt}"</p>
                    <div className="mt-3 text-[10px] font-black text-violet-400">سجل حسابك الآن لنقوم ببناء هذه الفكرة لك فوراً.</div>
                  </motion.div>
                ) : (
                  <>
                    <h1 className="text-3xl font-black text-black mb-2">إنشاء حساب جديد</h1>
                    <p className="text-slate-600 font-bold">أدخل بياناتك للبدء في رحلتك</p>
                  </>
                )}
            </div>

            <button 
                onClick={handleGoogleSignup}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-white border-[3px] border-black py-3.5 rounded-xl font-black text-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50 mb-6"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                التسجيل بواسطة جوجل
            </button>

            <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-[3px] border-slate-100 border-dashed"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-slate-400 font-black">أو عبر البريد</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-bold text-black mb-2">الاسم الكامل</label>
                    <div className="relative">
                        <input 
                            type="text" 
                            value={formData.fullName}
                            onChange={e => setFormData({...formData, fullName: e.target.value})}
                            className="w-full pl-4 pr-10 py-3 rounded-xl border-[3px] border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] focus:-translate-y-1 transition-all font-bold bg-slate-50" 
                            placeholder="مثال: محمد أحمد"
                            required
                        />
                        <User className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-black mb-2">البريد الإلكتروني</label>
                    <div className="relative">
                        <input 
                            type="email" 
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            className="w-full pl-4 pr-10 py-3 rounded-xl border-[3px] border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] focus:-translate-y-1 transition-all text-left font-bold bg-slate-50" 
                            dir="ltr" 
                            placeholder="name@company.com" 
                            required
                        />
                        <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-black mb-2">كلمة المرور</label>
                    <div className="relative">
                        <input 
                            type="password" 
                            value={formData.password}
                            onChange={e => setFormData({...formData, password: e.target.value})}
                            className="w-full pl-4 pr-10 py-3 rounded-xl border-[3px] border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] focus:-translate-y-1 transition-all text-left font-bold bg-slate-50" 
                            dir="ltr" 
                            placeholder="••••••••" 
                            required
                        />
                        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    </div>
                </div>

                <div className="flex items-start gap-3 mt-4">
                    <input 
                        type="checkbox" 
                        id="terms" 
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="w-5 h-5 border-[3px] border-black rounded mt-1 accent-[#7C3AED]"
                    />
                    <label htmlFor="terms" className="text-sm font-bold text-slate-600 leading-tight cursor-pointer text-right">
                        أوافق على <a href="#terms" className="text-[#7C3AED] underline">الشروط والأحكام</a> و <a href="#privacy" className="text-[#7C3AED] underline">سياسة الخصوصية</a>
                    </label>
                </div>

                <Button 
                    variant="primary" 
                    fullWidth 
                    size="lg"
                    type="submit"
                    disabled={isLoading || !agreed}
                    className="mt-6 text-lg"
                >
                    {isLoading ? 'جاري الإنشاء...' : 'إنشاء حساب مجاني'}
                </Button>
            </form>

            <p className="mt-8 text-center text-slate-600 font-bold">
                لديك حساب بالفعل؟{' '}
                <button onClick={() => onNavigate('login')} className="text-[#7C3AED] underline decoration-2 hover:text-black">
                    تسجيل الدخول
                </button>
            </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;