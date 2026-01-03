"use client";

import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { motion } from "framer-motion";
/* Fixed: Using consistent casing for utility import */
import { cn } from "../../lib/utils/cn.ts";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-bold transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: 
          "bg-brand-violet text-white border-3 border-black shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
        secondary:
          "bg-white text-content-primary border-3 border-black shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
        gradient:
          "bg-gradient-to-r from-brand-violet via-brand-pink to-brand-orange text-white border-3 border-black shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
        ghost:
          "bg-transparent text-content-primary hover:bg-surface-secondary border-3 border-transparent hover:border-black shadow-none",
        outline:
          "bg-transparent text-content-primary border-3 border-black hover:bg-black hover:text-white",
        danger:
          "bg-red-500 text-white border-3 border-black shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm",
      },
      size: {
        sm: "text-sm px-3 py-1.5 rounded-lg",
        md: "text-base px-4 py-2.5 rounded-xl",
        lg: "text-lg px-6 py-3 rounded-xl",
        xl: "text-xl px-8 py-4 rounded-2xl",
        icon: "h-10 w-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, leftIcon, rightIcon, children, disabled, fullWidth, ...props }, ref) => {
    return (
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          buttonVariants({ variant, size, className }),
          fullWidth ? "w-full" : ""
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="ms-2 h-4 w-4 animate-spin" />
        ) : leftIcon ? (
          <span className="ms-2">{leftIcon}</span>
        ) : null}
        {children}
        {rightIcon && !isLoading && <span className="me-2">{rightIcon}</span>}
      </motion.button>
    );
  }
);
Button.displayName = "Button";

export default Button;
export { buttonVariants };