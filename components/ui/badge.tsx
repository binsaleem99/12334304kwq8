import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils/cn.ts";

const badgeVariants = cva(
  "inline-flex items-center font-bold border-2 border-black rounded-lg",
  {
    variants: {
      variant: {
        default: "bg-brand-violet text-white",
        secondary: "bg-surface-secondary text-content-primary",
        success: "bg-brand-lime text-black",
        warning: "bg-brand-gold text-black",
        danger: "bg-red-500 text-white",
        outline: "bg-transparent text-content-primary",
        gradient: "bg-gradient-to-r from-brand-violet to-brand-pink text-white",
      },
      size: {
        sm: "text-[10px] px-1.5 py-0.5",
        md: "text-xs px-2.5 py-1",
        lg: "text-sm px-3 py-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & 
  VariantProps<typeof badgeVariants> & {
    children?: React.ReactNode;
  };

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export default Badge;
export { badgeVariants };