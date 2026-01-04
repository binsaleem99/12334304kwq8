import * as React from "react";
import { LucideIcon } from "lucide-react";
// Fixed: Standardized import casing to Button.tsx
import Button from "../ui/Button.tsx";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="p-4 bg-surface-secondary border-3 border-black mb-6 shadow-brutal">
        <Icon className="h-12 w-12 text-content-muted" />
      </div>
      <h3 className="text-xl font-black mb-2">{title}</h3>
      <p className="text-content-secondary max-w-md mb-6 font-bold">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="gradient" onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}