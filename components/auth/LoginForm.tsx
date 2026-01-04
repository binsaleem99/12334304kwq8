import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
// Fixed: Standardized import casing for Button.tsx
import Button from '../ui/Button.tsx';
import Input from '../ui/input.tsx';
import { 
  AuthCard, 
  GoogleAuthButton, 
  AuthDivider 
} from './index.ts';
import { ViewState } from '../../types.ts';
import { createClient } from '../../lib/supabase/client.ts';
import { useRouter } from 'next/navigation';

interface LoginProps {
  onNavigate: (view: ViewState) => void;
}

const LoginForm: React.FC<LoginProps> = ({ onNavigate }) => {
  const router = useRouter();
  const supabase = createClient();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setErrors({ auth: error.message });
      setIsLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ 
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`
      }
    });
    if (error) {
      setErrors({ auth: error.message });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-secondary p-4 md:p-8" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <AuthCard
          title="تسجيل الدخول"
          description="مرحباً بعودتك! سجّل دخولك للمتابعة"
          onLogoClick={() => onNavigate('landing')}
          footer={
            <p className="text-content-secondary">
              ليس لديك حساب؟{" "}
              <button 
                onClick={() => onNavigate('signup')} 
                className="text-brand-violet font-black hover:underline"
              >
                أنشئ حساباً جديداً
              </button>
            </p>
          }
        >
          <GoogleAuthButton mode="login" isLoading={isLoading} onClick={handleGoogleLogin} />

          <AuthDivider />

          {errors.auth && (
            <p className="mb-4 text-sm text-red-500 font-bold text-center bg-red-50 p-2 border border-red-200 rounded-lg">
              {errors.auth}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              label="البريد الإلكتروني"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
              leftIcon={<Mail className="h-5 w-5" />}
              disabled={isLoading}
              autoComplete="email"
              dir="ltr"
              className="text-left"
            />

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                label="كلمة المرور"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={errors.password}
                leftIcon={<Lock className="h-5 w-5" />}
                disabled={isLoading}
                autoComplete="current-password"
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-5 h-5 border-3 border-black rounded-lg accent-brand-violet transition-all"
                />
                <span className="text-sm font-bold group-hover:text-brand-violet">تذكرني</span>
              </label>
              <button
                type="button"
                onClick={() => onNavigate('forgot-password')}
                className="text-sm font-bold text-brand-violet hover:underline"
              >
                نسيت كلمة المرور؟
              </button>
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="xl"
              fullWidth
              isLoading={isLoading}
              className="text-xl shadow-brutal mt-4"
            >
              دخول
              <ArrowLeft className="h-6 w-6 ms-2 rtl-flip" />
            </Button>
          </form>
        </AuthCard>

        <div className="text-center mt-8">
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

export default LoginForm;