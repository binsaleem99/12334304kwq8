import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Hand, Rocket } from 'lucide-react';
import Button from '../ui/Button';
import { ViewState } from '../../types';

interface LoginProps {
  onNavigate: (view: ViewState) => void;
}

const LoginForm: React.FC<LoginProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Standard authentication simulation
    // In production, this would call your backend API
    setTimeout(() => {
        localStorage.setItem('kwq8_tier', 'pro'); // Default to pro for new logins
        onNavigate('dashboard');
        setIsLoading(false);
    }, 1000);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulate Google Auth Redirect/Popup
    setTimeout(() => {
        localStorage.setItem('kwq8_tier', 'pro');
        onNavigate('dashboard');
        setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Decorative Left Panel (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-yellow-50 relative overflow-hidden items-center justify-center p-12 border-l-[3px] border-black">
        {/* Geometric Decor */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-pink-300 rounded-full border-[3px] border-black shadow-[8px_8px_0px_0px_#000]"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-violet-300 rotate-12 border-[3px] border-black shadow-[8px_8px_0px_0px_#000]"></div>
        
        <div className="relative z-10 text-center bg-white p-8 rounded-2xl border-[3px] border-black shadow-[8px_8px_0px_0px_#000]">
            <h2 className="text-4xl font-black text-black mb-6 flex items-center justify-center gap-2">
                مرحباً بعودتك <Hand className="text-yellow-500" />
            </h2>
            <p className="text-slate-700 text-lg max-w-md mx-auto font-medium">
                مواقعك في انتظارك. استكمل رحلة البناء والإبداع مع KWQ8.
            </p>
        </div>
      </div>

      {/* Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 overflow-y-auto">
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-md my-auto"
        >
            <div 
                className="text-2xl font-bold mb-8 cursor-pointer inline-block"
                onClick={() => onNavigate('landing')}
            >
                <span className="font-heading tracking-tighter text-3xl font-black bg-black text-white px-2 py-1 transform -rotate-2 inline-block shadow-[4px_4px_0px_0px_#000]">KWQ8</span>
            </div>

            <h1 className="text-3xl font-black text-black mb-2 flex items-center gap-2">
                دخول الأعضاء <Lock className="text-violet-600" />
            </h1>
            <p className="text-slate-600 font-medium mb-8">أدخل بياناتك للمتابعة إلى لوحة التحكم</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-black mb-2">البريد الإلكتروني</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-[3px] border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] focus:-translate-y-1 transition-all text-left bg-slate-50 font-bold" 
                        dir="ltr"
                        placeholder="name@example.com"
                        required
                    />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-bold text-black">كلمة المرور</label>
                        <button 
                            type="button" 
                            onClick={() => onNavigate('forgot-password')} 
                            className="text-sm text-violet-600 hover:text-violet-800 font-bold underline"
                        >
                            نسيت كلمة المرور؟
                        </button>
                    </div>
                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            className="w-full px-4 py-3 rounded-xl border-[3px] border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] focus:-translate-y-1 transition-all text-left bg-slate-50 font-bold" 
                            dir="ltr"
                            placeholder="••••••••"
                            required
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                <Button 
                    variant="primary" 
                    fullWidth 
                    size="lg"
                    type="submit"
                    disabled={isLoading}
                    className="rounded-xl flex items-center justify-center gap-2"
                >
                    {isLoading ? 'جاري الدخول...' : (
                        <>
                            <Rocket size={18} /> دخول
                        </>
                    )}
                </Button>
            </form>

            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-[3px] border-slate-100 border-dashed"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-slate-400 font-black">أو</span>
                </div>
            </div>

            <button 
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-white border-[3px] border-black py-4 rounded-xl font-black text-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                الدخول بواسطة جوجل
            </button>

            <p className="mt-8 text-center text-slate-600 font-medium">
                ليس لديك حساب؟{' '}
                <button onClick={() => onNavigate('signup')} className="text-violet-600 font-bold hover:underline decoration-2">
                    إنشاء حساب جديد ✨
                </button>
            </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginForm;