import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react';
// Fixed: Standardized casing for button.tsx import
import Button from '../ui/button.tsx';
import Input from '../ui/input.tsx';
import { AuthCard, PasswordStrength } from './index.ts';
import { ViewState } from '../../types.ts';

interface ResetPasswordProps {
  onNavigate: (view: ViewState) => void;
}

const ResetPasswordForm: React.FC<ResetPasswordProps> = ({ onNavigate }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "كلمات المرور غير متطابقة" });
      return;
    }

    if (password.length < 8) {
      setErrors({ password: "كلمة المرور قصيرة جداً" });
      return;
    }

    setIsLoading(true);
    // Simulate API process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-secondary p-4 md:p-8" dir="rtl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg"
        >
          <AuthCard
            title="تم التغيير بنجاح"
            description="يمكنك الآن استخدام كلمة المرور الجديدة"
          >
            <div className="text-center py-8">
              <div className="inline-flex p-5 bg-brand-lime border-3 border-black shadow-brutal mb-8 rounded-2xl">
                <CheckCircle className="h-12 w-12 text-black" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-black text-black mb-4">تم تعيين كلمة المرور!</h3>
              <p className="text-content-secondary font-bold mb-8">
                لقد قمت بتغيير كلمة المرور الخاصة بك بنجاح. يرجى تسجيل الدخول للوصول إلى حسابك.
              </p>
              <Button
                variant="gradient"
                fullWidth
                size="xl"
                onClick={() => onNavigate('login')}
              >
                تسجيل الدخول الآن
              </Button>
            </div>
          </AuthCard>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-secondary p-4 md:p-8" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <AuthCard
          title="تعيين كلمة مرور جديدة"
          description="اختر كلمة مرور قوية وآمنة لحسابك"
          onLogoClick={() => onNavigate('landing')}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                label="كلمة المرور الجديدة"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
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

            <PasswordStrength password={password} />

            <div className="relative pt-2">
              <Input
                type={showPassword ? "text" : "password"}
                label="تأكيد كلمة المرور"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
                leftIcon={<Lock className="h-5 w-5" />}
                disabled={isLoading}
                autoComplete="new-password"
                dir="ltr"
                className="text-left"
              />
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="xl"
              fullWidth
              isLoading={isLoading}
              className="text-xl shadow-brutal mt-4"
            >
              حفظ كلمة المرور
              <ArrowLeft className="h-6 w-6 ms-3 rtl-flip" />
            </Button>
          </form>
        </AuthCard>
      </motion.div>
    </div>
  );
};

export default ResetPasswordForm;