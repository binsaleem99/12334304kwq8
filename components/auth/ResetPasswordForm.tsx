import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Check, X, ArrowRight, ShieldCheck } from 'lucide-react';
import Button from '../ui/Button';
import { ViewState } from '../../types';

interface ResetPasswordProps {
  onNavigate: (view: ViewState) => void;
}

const ResetPasswordForm: React.FC<ResetPasswordProps> = ({ onNavigate }) => {
  const [tokenStatus, setTokenStatus] = useState<'valid' | 'invalid' | 'checking'>('checking');
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Simulate Token Validation
  useEffect(() => {
    // In a real app, parse URL query params here
    const timer = setTimeout(() => {
        // Simulate valid token for demo purposes
        setTokenStatus('valid');
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Password Requirements Logic
  const requirements = [
    { id: 'length', label: '٨ أحرف على الأقل', valid: password.length >= 8 },
    { id: 'upper', label: 'حرف كبير واحد (A-Z)', valid: /[A-Z]/.test(password) },
    { id: 'number', label: 'رقم واحد (0-9)', valid: /[0-9]/.test(password) },
  ];

  const getStrength = () => {
    const validCount = requirements.filter(r => r.valid).length;
    if (validCount <= 1) return { label: 'ضعيفة', color: 'bg-red-500', width: '33%' };
    if (validCount === 2) return { label: 'متوسطة', color: 'bg-yellow-400', width: '66%' };
    return { label: 'قوية ✓', color: 'bg-green-500', width: '100%' };
  };

  const strength = getStrength();
  const passwordsMatch = password && confirmPassword && password === confirmPassword;
  const isFormValid = requirements.every(r => r.valid) && passwordsMatch;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    setFormStatus('loading');
    setTimeout(() => {
        setFormStatus('success');
        // Auto redirect after 3 seconds
        setTimeout(() => {
            onNavigate('login');
        }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Panel (Decorative) */}
      <div className="hidden lg:flex lg:w-2/5 bg-[#7C3AED] relative overflow-hidden items-center justify-center p-12 text-center border-l-2 border-black">
        {/* Geometric Decor */}
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-white/20 rotate-12"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full border-4 border-white/20"></div>
        
        <div className="relative z-10 text-white">
          <div className="text-8xl mb-6 flex justify-center">
            <div className="relative">
                <div className="absolute inset-0 bg-white/20 blur-xl rounded-full"></div>
                🔑
            </div>
          </div>
          <h2 className="text-4xl font-black mb-4 font-heading">كلمة سر جديدة!</h2>
          <p className="text-xl font-medium opacity-90 max-w-sm mx-auto">
            اختر كلمة سر قوية وآمنة لحماية حسابك ومشاريعك.
          </p>
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

            <AnimatePresence mode='wait'>
                {tokenStatus === 'checking' && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="w-12 h-12 border-4 border-slate-200 border-t-[#7C3AED] rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-slate-500 font-bold">جاري التحقق من الرابط...</p>
                    </motion.div>
                )}

                {tokenStatus === 'invalid' && (
                    <motion.div
                        key="invalid"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#FEF2F2] border-[3px] border-[#EF4444] p-8 rounded-xl shadow-[4px_4px_0px_0px_#EF4444] text-center"
                    >
                        <div className="w-16 h-16 bg-[#EF4444] rounded-full flex items-center justify-center mx-auto mb-4 text-white border-2 border-red-900">
                            <X size={32} strokeWidth={3} />
                        </div>
                        <h2 className="text-2xl font-black text-red-900 mb-2">✗ الرابط غير صالح</h2>
                        <p className="text-red-800 font-medium mb-8">
                            ⚠️ هذا الرابط منتهي الصلاحية أو غير صحيح
                        </p>
                        <Button variant="secondary" onClick={() => onNavigate('forgot-password')}>
                            → طلب رابط جديد
                        </Button>
                    </motion.div>
                )}

                {tokenStatus === 'valid' && formStatus === 'success' && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#F0FDF4] border-[3px] border-[#22C55E] p-8 rounded-xl shadow-[4px_4px_0px_0px_#22C55E] text-center relative overflow-hidden"
                    >
                         {/* Confetti (Simple CSS shapes) */}
                        <div className="absolute top-5 left-10 w-3 h-3 bg-yellow-400 rotate-45"></div>
                        <div className="absolute bottom-10 right-10 w-3 h-3 bg-blue-400 rounded-full"></div>

                        <div className="w-16 h-16 bg-[#22C55E] rounded-full flex items-center justify-center mx-auto mb-4 text-white border-2 border-green-900 animate-bounce">
                            <Check size={32} strokeWidth={3} />
                        </div>
                        <h2 className="text-2xl font-black text-green-900 mb-2">✓ تم تغيير كلمة السر!</h2>
                        <p className="text-green-800 font-medium mb-6">
                            🎉 كلمة السر الجديدة جاهزة. سيتم توجيهك لتسجيل الدخول...
                        </p>
                        <Button 
                            variant="primary" 
                            fullWidth 
                            onClick={() => onNavigate('login')}
                            className="bg-[#22C55E] border-black hover:bg-green-600"
                        >
                            → تسجيل الدخول الآن
                        </Button>
                    </motion.div>
                )}

                {tokenStatus === 'valid' && formStatus !== 'success' && (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                         <div className="flex items-center gap-3 mb-8">
                            <h1 className="text-3xl font-black text-black">تعيين كلمة سر جديدة</h1>
                            <div className="h-1 flex-grow bg-slate-200 rounded"></div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-black mb-2">كلمة السر الجديدة</label>
                                <div className="relative">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-5 py-4 bg-white border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_#000] focus:outline-none focus:border-[#7C3AED] focus:shadow-[4px_4px_0px_0px_#7C3AED] transition-all text-left font-medium text-lg placeholder:text-slate-300"
                                        dir="ltr"
                                        placeholder="●●●●●●●●"
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {/* Strength Meter */}
                                <div className="mt-3 bg-slate-100 h-2 rounded-full overflow-hidden flex">
                                    <div 
                                        className={`h-full transition-all duration-500 ${strength.color}`} 
                                        style={{ width: strength.width }}
                                    ></div>
                                </div>
                                <div className="flex justify-between mt-1 text-xs font-bold">
                                    <span className="text-slate-400">قوة كلمة السر:</span>
                                    <span className={`${strength.color.replace('bg-', 'text-')}`}>{strength.label}</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-black mb-2">تأكيد كلمة السر</label>
                                <div className="relative">
                                    <input 
                                        type={showConfirmPassword ? "text" : "password"} 
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full px-5 py-4 bg-white border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_#000] focus:outline-none focus:border-[#7C3AED] focus:shadow-[4px_4px_0px_0px_#7C3AED] transition-all text-left font-medium text-lg placeholder:text-slate-300"
                                        dir="ltr"
                                        placeholder="●●●●●●●●"
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black"
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {password && confirmPassword && (
                                    <div className={`text-sm font-bold mt-2 flex items-center gap-1 ${passwordsMatch ? 'text-green-600' : 'text-red-500'}`}>
                                        {passwordsMatch ? <Check size={14} /> : <X size={14} />}
                                        {passwordsMatch ? '✓ كلمتا السر متطابقتان' : '✗ كلمتا السر غير متطابقتين'}
                                    </div>
                                )}
                            </div>

                            {/* Requirements Checklist */}
                            <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4">
                                <p className="text-sm font-black text-black mb-3 flex items-center gap-2">
                                    <ShieldCheck size={16} /> متطلبات كلمة السر:
                                </p>
                                <ul className="space-y-2">
                                    {requirements.map(req => (
                                        <li key={req.id} className="flex items-center gap-2 text-sm font-bold">
                                            {req.valid ? (
                                                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px] border border-black">✓</div>
                                            ) : (
                                                <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 text-[10px] border border-slate-300">✗</div>
                                            )}
                                            <span className={req.valid ? 'text-green-700' : 'text-slate-400'}>{req.label}</span>
                                        </li>
                                    ))}
                                    <li className="flex items-center gap-2 text-sm font-bold text-slate-400">
                                        <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-[10px]">○</div>
                                        رمز خاص (!@#$) — اختياري
                                    </li>
                                </ul>
                            </div>

                            <Button 
                                variant="primary" 
                                fullWidth 
                                size="lg"
                                type="submit"
                                disabled={!isFormValid || formStatus === 'loading'}
                                className="bg-[#7C3AED] border-black hover:bg-[#6D28D9] h-14 text-lg shadow-[4px_4px_0px_0px_#000]"
                            >
                                {formStatus === 'loading' ? 'جاري التعيين...' : (
                                    <span className="flex items-center gap-2">
                                        → تعيين كلمة السر الجديدة
                                    </span>
                                )}
                            </Button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;