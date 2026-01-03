"use client";

import * as React from "react";
import { Send, Image } from "lucide-react";
// Standardized: Using lowercase button.tsx to resolve casing conflicts
import Button from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils/cn.ts";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, isLoading, disabled, placeholder }: ChatInputProps) {
  const [message, setMessage] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <form onSubmit={handleSubmit} className="border-t-3 border-black bg-white p-4">
      <div className="flex items-end gap-3">
        {/* Attachment Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            className="p-2 hover:bg-surface-secondary border-3 border-transparent hover:border-black transition-all rounded-lg"
            title="إرفاق صورة"
          >
            <Image className="h-5 w-5 text-content-muted" />
          </button>
        </div>

        {/* Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder || "اكتب ما تريد بناءه..."}
            disabled={disabled || isLoading}
            rows={1}
            className={cn(
              "w-full border