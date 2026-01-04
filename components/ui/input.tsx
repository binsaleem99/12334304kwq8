import * as React from "react";
import { cn } from "../../lib/utils/cn.ts";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, hint, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-bold text-content-primary mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-content-muted">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "w-full border-3 border-black bg-white px-4 py-3 text-content-primary",
              "placeholder:text-content-muted font-medium",
              "focus:outline-none focus:shadow-brutal-violet focus:border-brand-violet",
              "transition-all duration-150",
              leftIcon && "pr-10",
              rightIcon && "pl-10",
              error && "border-red-500 focus:border-red-500 focus:shadow-none",
              "rounded-xl",
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-content-muted">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-500 font-bold">{error}</p>
        )}
        {hint && !error && (
          <p className="mt-1 text-sm text-content-muted">{hint}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;