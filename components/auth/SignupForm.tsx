import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft, Gift } from 'lucide-react';
// Fixed: Standardized casing for Button.tsx import
import Button from '../ui/Button.tsx';
import Input from '../ui/input.tsx';
import { 
  AuthCard, 
  GoogleAuthButton, 
  AuthDivider,
  PhoneInput,
  PasswordStrength,
} from './index.ts';
import { ViewState } from '../../types.ts';
import { createClient } from '../../lib/supabase/client.ts';
import { useRouter } from 'next/navigation';

interface SignupProps {
  onNavigate: (view: ViewState) => void;
}

const SignupForm: React.FC<SignupProps> = ({ onNavigate }) => {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    if (formData.password.length < 12) {
      setErrors({ password: "يجب أن تكون كلمة المرور 12 حرفاً على الأقل للأمان" });
      return;
    }

    if (!agreed) {
      setErrors({ terms: "يجب الموافقة على الشروط للمتابعة" });
      return;
    }
    
    setIsLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
          phone: formData.phone,
        },
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (error) {
      setErrors({ auth: error.message });
      setIsLoading(false);
      return;
    }

    if (data.user) {
      router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    await supabase.auth.signInWithOAuth({ 
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-secondary p-4 md:p-8" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="mb-8 p-4 bg-brand-lime border-3 border-black shadow-brutal text-center rotate-1"
        >
          <div className="flex items-center justify-center gap-3 text-black">
            <Gift className="h-6 w-6" />
            <span className="font-black text-lg">هدية ترحيبية: +20% رصيد إضافي مجاناً! 🎁</span>
          </div>
        </motion.div>

        <AuthCard
          title="إنشاء حساب جديد"
          description="انضم لأكثر من 5,000 رائد أعمال يستخدمون KWQ8"
          onLogoClick={() => onNavigate('landing')}
          footer={
            <p className="text-content-secondary">
              لديك حساب بالفعل؟{" "}
              <button 
                onClick={() => onNavigate('login')} 
                className="text-brand-violet font-black hover:underline"
              >
                سجّل دخولك الآن
              </button>
            </p>
          }
        >
          <GoogleAuthButton mode="signup" isLoading={isLoading} onClick={handleGoogleSignup} />

          <AuthDivider />

          {errors.auth && (
            <p className="mb-4 text-sm text-red-500 font-bold text-center bg-red-50 p-2 border border-red-200 rounded-lg">
              {errors.auth}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="text"
              label="الاسم الكامل"
              placeholder="مثال: أحمد الصباح"
              value={formData.fullName}
              onChange={e => setFormData({...formData, fullName: e.target.value})}
              error={errors.fullName}
              leftIcon={<User className="h-5 w-5" />}
              disabled={isLoading}
              autoComplete="name"
            />

            <Input
              type="email"
              label="البريد الإلكتروني"
              placeholder="name@company.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              error={errors.email}
              leftIcon={<Mail className="h-5 w-5" />}
              disabled={isLoading}
              autoComplete="email"
              dir="ltr"
              className="text-left"
            />

            <PhoneInput
              value={formData.phone}
              onChange={(phone) => setFormData({ ...formData, phone })}
              error={errors.phone}
              disabled={isLoading}
            />

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                label="كلمة المرور"
                placeholder="••••••••"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                error={errors.password}
                leftIcon={<Lock className="h-5 w-5" />}
                disabled={isLoading}
                autoComplete="new-password"
                dir="ltr"
                className="text-left"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-4 top-[42px] text-content-muted hover:text-content-primary transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <PasswordStrength password={formData.password} />

            <div className="space-y-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-5 h-5 border-3 border-black rounded-lg accent-brand-violet transition-all mt-1"
                />
                <span className="text-sm font-bold text-content-secondary leading-relaxed">
                  أوافق على{" "}
                  <a href="#terms" className="text-brand-violet hover:underline">شروط الاستخدام</a>
                  {" "}و{" "}
                  <a href="#privacy" className="text-brand-violet hover:underline">سياسة الخصوصية</a>
                </span>
              </label>
              {errors.terms && <p className="text-xs text-red-500 font-bold pr-8">{errors.terms}</p>}
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="xl"
              fullWidth
              isLoading={isLoading}
              className="text-xl shadow-brutal mt-4"
            >
              إنشاء حسابي مجاناً
              <ArrowLeft className="h-6 w-6 ms-3 rtl-flip" />
            </Button>
          </form>
        </AuthCard>

        <div className="text-center mt-8 mb-20">
          <button
            onClick={() => onNavigate('landing')}
            className="text-sm font-black text-content-muted hover:text-content-primary inline-flex items-center gap-2 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 rtl-flip rotate-180 transition-transform group-hover:-translate-x-1" />
            العودة للرئيسية
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupForm;