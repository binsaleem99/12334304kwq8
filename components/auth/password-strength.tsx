"use client";

import * as React from "react";
import { cn } from "../../lib/utils/cn.ts";
import { Check, X } from "lucide-react";

interface PasswordStrengthProps {
  password?: string;
}

interface Requirement {
  label: string;
  test: (password: string) => boolean;
}

const requirements: Requirement[] = [
  { label: "8 أحرف على الأقل", test: (p) => p.length >= 8 },
  { label: "حرف كبير واحد", test: (p) => /[A-Z]/.test(p) },
  { label: "حرف صغير واحد", test: (p) => /[a-z]/.test(p) },
  { label: "رقم واحد", test: (p) => /[0-9]/.test(p) },
  { label: "رمز خاص واحد", test: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
];

export function PasswordStrength({ password = "" }: PasswordStrengthProps) {
  const passedCount = requirements.filter((req) => req.test(password)).length;
  
  const getStrengthColor = () => {
    if (passedCount <= 1) return "bg-red-500";
    if (passedCount <= 2) return "bg-orange-500";
    if (passedCount <= 3) return "bg-yellow-500";
    if (passedCount <= 4) return "bg-lime-500";
    return "bg-green-500";
  };

  const getStrengthLabel = () => {
    if (passedCount <= 1) return "ضعيفة جداً";
    if (passedCount <= 2) return "ضعيفة";
    if (passedCount <= 3) return "متوسطة";
    if (passedCount <= 4) return "قوية";
    return "قوية جداً";
  };

  if (!password) return null;

  return (
    <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-1 duration-300">
      {/* Strength Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-content-secondary font-bold">قوة كلمة المرور</span>
          <span className="font-black">{getStrengthLabel()}</span>
        </div>
        <div className="h-2 bg-surface-secondary border-2 border-black overflow-hidden rounded-full">
          <div
            className={cn("h-full transition-all duration-500", getStrengthColor())}
            style={{ width: `${(passedCount / requirements.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Requirements List */}
      <div className="grid grid-cols-2 gap-2">
        {requirements.map((req, index) => {
          const passed = req.test(password);
          return (
            <div
              key={index}
              className={cn(
                "flex items-center gap-2 text-xs font-bold transition-colors",
                passed ? "text-green-600" : "text-content-muted"
              )}
            >
              {passed ? (
                <Check className="h-3 w-3" strokeWidth={3} />
              ) : (
                <X className="h-3 w-3" strokeWidth={3} />
              )}
              <span>{req.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
