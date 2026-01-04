"use client";

import * as React from "react";
import { Send, Sparkles } from "lucide-react";
// Fixed: Standardized casing for Button.tsx import
import Button from "../ui/Button.tsx";
import { cn } from "../../lib/utils/cn.ts";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

/**
 * ChatInput component for the builder interface.
 */
export const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading, placeholder }) => {
  const [input, setInput] = React.useState("");

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="p-4 bg-white border-t-3 border-black">
      <div className="relative group">
        <div className="relative bg-white border-[3px] border-black rounded-xl flex items-end p-2 focus-within:shadow-brutal-sm transition-all">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={placeholder || "اكتب ما تريد..."}
            className="w-full bg-transparent border-none focus:ring-0 resize-none h-12 max-h-32 py-2 px-2 font-bold text-sm placeholder:text-slate-400"
            dir="rtl"
            disabled={isLoading}
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="shrink-0 mb-1 ml-1"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;