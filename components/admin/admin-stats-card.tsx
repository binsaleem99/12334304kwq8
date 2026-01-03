import * as React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils/cn.ts";

export interface AdminStatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: "increase" | "decrease";
  };
  icon: LucideIcon;
  color?: "violet" | "pink" | "cyan" | "lime" | "gold" | "orange" | "red";
}

const colorClasses = {
  violet: "bg-brand-violet/20 text-brand-violet border-brand-violet",
  pink: "bg-brand-pink/20 text-brand-pink border-brand-pink",
  cyan: "bg-brand-cyan/20 text-brand-cyan border-brand-cyan",
  lime: "bg-brand-lime/20 text-brand-lime border-brand-lime",
  gold: "bg-brand-gold/20 text-brand-gold border-brand-gold",
  orange: "bg-brand-orange/20 text-brand-orange border-brand-orange",
  red: "bg-red-500/20 text-red-500 border-red-500",
};

/**
 * AdminStatsCard component for displaying key performance indicators in the admin dashboard.
 * Fixed: Converted to React.FC to resolve JSX prop type issues with reserved props like 'key'.
 */
export const AdminStatsCard: React.FC<AdminStatsCardProps> = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color = "violet" 
}) => {
  return (
    <div className="bg-surface-darker border border-border-dark p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-content-muted text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {change && (
            <p className={cn(
              "text-sm mt-2 font-medium",
              change.type === "increase" ? "text-green-400" : "text-red-400"
            )}>
              {change.type === "increase" ? "↑" : "↓"} {Math.abs(change.value)}%
              <span className="text-content-muted mr-1">من الشهر الماضي</span>
            </p>
          )}
        </div>
        <div className={cn("p-3 border", colorClasses[color])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};
