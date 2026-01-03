import * as React from "react";
import { cn } from "../../lib/utils/cn.ts";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: "increase" | "decrease";
  };
  icon: LucideIcon;
  color?: "violet" | "pink" | "cyan" | "lime" | "gold" | "orange";
}

const colorClasses = {
  violet: "bg-brand-violet text-white",
  pink: "bg-brand-pink text-white",
  cyan: "bg-brand-cyan text-white",
  lime: "bg-brand-lime text-black",
  gold: "bg-brand-gold text-black",
  orange: "bg-brand-orange text-white",
};

export function StatsCard({ title, value, change, icon: Icon, color = "violet" }: StatsCardProps) {
  return (
    <div className="bg-white border-3 border-black shadow-brutal p-6 rounded-2xl group hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm transition-all">
      <div className="flex items-start justify-between">
        <div className="text-right flex-1 min-w-0">
          <p className="text-content-muted text-xs font-black uppercase tracking-widest mb-2">{title}</p>
          <p className="text-4xl font-black text-content-primary truncate tracking-tighter">{value}</p>
          {change && (
            <div className={cn(
              "inline-flex items-center gap-1 mt-3 px-2 py-0.5 rounded-lg border-2 border-black font-black text-xs",
              change.type === "increase" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            )}>
              {change.type === "increase" ? "↑" : "↓"} {Math.abs(change.value)}%
            </div>
          )}
        </div>
        <div className={cn(
          "p-4 border-3 border-black shadow-brutal-sm rounded-xl group-hover:rotate-6 transition-transform", 
          colorClasses[color]
        )}>
          <Icon className="h-6 w-6" strokeWidth={3} />
        </div>
      </div>
    </div>
  );
}
