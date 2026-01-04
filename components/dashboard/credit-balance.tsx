"use client";

import * as React from "react";
import { Coins, Plus, AlertTriangle } from "lucide-react";
// Fixed: Standardized import casing to Button.tsx
import Button from "../ui/Button.tsx";
import { cn } from "../../lib/utils/cn.ts";

interface CreditBalanceProps {
  balance: number;
  expiringCredits?: number;
  expiringDate?: string;
  compact?: boolean;
  onNavigate?: (view: any) => void;
}

export function CreditBalance({ 
  balance, 
  expiringCredits, 
  expiringDate,
  compact = false,
  onNavigate
}: CreditBalanceProps) {
  const isLow = balance < 50;

  if (compact) {
    return (
      <button 
        onClick={() => onNavigate?.('dashboard-billing')}
        className={cn(
          "flex items-center gap-2 px-3 py-2 border-3 border-black shadow-brutal-sm hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all",
          isLow ? "bg-red-100" : "bg-brand-lime"
        )}
      >
        <Coins className="h-4 w-4" />
        <span className="font-black">{balance}</span>
        <span className="text-xs font-bold">رصيد</span>
      </button>
    );
  }

  return (
    <div className="bg-white border-3 border-black shadow-brutal p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-black text-lg">رصيدك الحالي</h3>
        <div className={cn(
          "p-2 border-3 border-black",
          isLow ? "bg-red-500 text-white" : "bg-brand-lime"
        )}>
          <Coins className="h-5 w-5" />
        </div>
      </div>

      <div className="mb-4">
        <span className="text-4xl font-black">{balance.toLocaleString()}</span>
        <span className="text-content-secondary mr-2 font-bold">رصيد</span>
      </div>

      {isLow && (
        <div className="flex items-center gap-2 text-red-600 mb-4 p-3 bg-red-50 border-2 border-red-200 font-bold">
          <AlertTriangle className="h-5 w-5" />
          <span className="text-sm">رصيدك منخفض! اشحن الآن</span>
        </div>
      )}

      {expiringCredits && expiringCredits > 0 && (
        <div className="flex items-center gap-2 text-orange-600 mb-4 p-3 bg-orange-50 border-2 border-orange-200 font-bold">
          <AlertTriangle className="h-5 w-5" />
          <span className="text-sm">
            {expiringCredits} رصيد ينتهي في {expiringDate}
          </span>
        </div>
      )}

      <Button variant="gradient" className="w-full" onClick={() => onNavigate?.('dashboard-billing')}>
        <Plus className="h-5 w-5 ml-2" />
        شراء رصيد
      </Button>
    </div>
  );
}