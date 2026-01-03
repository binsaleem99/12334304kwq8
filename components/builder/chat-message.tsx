"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { User, Bot, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn.ts";

export interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isLoading?: boolean;
  creditsUsed?: number;
}

/**
 * ChatMessage component displaying AI or user messages.
 * Fixed: Explicitly typed as React.FC to resolve "key does not exist on ChatMessageProps" error in builder page loop.
 */
export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content, isLoading, creditsUsed }) => {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex gap-3",
        isUser ? "flex-row-reverse" : ""
      )}
    >
      {/* Avatar */}
      <div className={cn(
        "flex-shrink-0 w-10 h-10 border-3 border-black flex items-center justify-center",
        isUser ? "bg-brand-violet text-white" : "bg-brand-lime"
      )}>
        {isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
      </div>

      {/* Message */}
      <div className={cn(
        "flex-1 max-w-[80%]",
        isUser ? "text-left" : "text-right"
      )}>
        <div className={cn(
          "inline-block p-4 border-3 border-black",
          isUser 
            ? "bg-brand-violet text-white" 
            : "bg-white shadow-brutal-sm"
        )}>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>جارٍ التفكير...</span>
            </div>
          ) : (
            <p className="whitespace-pre-wrap">{content}</p>
          )}
        </div>
        
        {/* Credits Used */}
        {creditsUsed && creditsUsed > 0 && (
          <p className="text-xs text-content-muted mt-1">
            تم استهلاك {creditsUsed} رصيد
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default ChatMessage;
