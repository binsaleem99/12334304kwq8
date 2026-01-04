"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowRight, Settings, Eye, Rocket,
  Coins, PanelRightOpen, PanelRightClose
} from "lucide-react";
// Fix: Standardized import casing to lowercase
import Button from "../../../../../components/ui/button.tsx";
import Badge from "../../../../../components/ui/badge.tsx";
/* Fixed: Standardized casing for GradientText import to use lowercase facade */
import { GradientText } from "../../../../../components/ui/gradient-text.tsx";
import { ChatMessage, ChatInput, PreviewFrame } from "../../../../../components/builder/index.ts";
import { cn } from "../../../../../lib/utils/cn.ts";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  creditsUsed?: number;
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "مرحباً! 👋 أنا مساعدك في بناء موقعك. صف لي ما تريد وسأبدأ البناء فوراً.\n\nمثال: \"أريد صفحة رئيسية لصالون تجميل مع صور وخدمات وأسعار\"",
  },
];

export default function BuilderPage() {
  const params = useParams();
  const projectId = params?.id as string;
  
  const [messages, setMessages] = React.useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isPanelOpen, setIsPanelOpen] = React.useState(true);
  const [credits, setCredits] = React.useState(245);
  const [previewUrl, setPreviewUrl] = React.useState<string | undefined>();
  
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response logic
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const creditsUsed = Math.floor(Math.random() * 5) + 3;
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "تم! قمت ببناء الموقع مع الأقسام المطلوبة. هل تريد تعديل أي شيء في النصوص أو الصور؟",
      creditsUsed,
    };
    setMessages((prev) => [...prev, aiMessage]);
    setCredits((prev) => prev - creditsUsed);
    setIsLoading(false);
    setPreviewUrl("https://kwq8.com/preview-demo"); // Placeholder preview
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col -m-6" dir="rtl">
      {/* Builder Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b-3 border-black z-30">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/projects">
            <Button variant="ghost" size="sm">
              <ArrowRight className="h-4 w-4 ml-2" />
              المشاريع
            </Button>
          </Link>
          <div className="h-6 w-[2px] bg-black/10" />
          <h1 className="font-black text-lg">صالون الجمال</h1>
          <Badge variant="secondary">مسودة</Badge>
        </div>

        <div className="flex items-center gap-3">
          {/* Credits Display */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-lime border-3 border-black shadow-brutal-sm rounded-lg">
            <Coins className="h-4 w-4" />
            <span className="font-black">{credits}</span>
          </div>

          <Link href={`/dashboard/projects/${projectId}/preview`}>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4 ml-2" />
              معاينة
            </Button>
          </Link>
          
          <Button variant="gradient" size="sm">
            <Rocket className="h-4 w-4 ml-2" />
            نشر الموقع
          </Button>
        </div>
      </header>

      {/* Main Builder Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Chat Panel */}
        <motion.div
          initial={false}
          animate={{ width: isPanelOpen ? "400px" : "0px" }}
          className="flex-shrink-0 border-l-3 border-black bg-white flex flex-col overflow-hidden z-20"
        >
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                role={message.role}
                content={message.content}
                creditsUsed={message.creditsUsed}
              />
            ))}
            {isLoading && (
              <ChatMessage role="assistant" content="" isLoading />
            )}
            <div ref={chatEndRef} />
          </div>

          <ChatInput
            onSend={handleSendMessage}
            isLoading={isLoading}
            placeholder="اكتب ما تريد تعديله..."
          />
        </motion.div>

        {/* Toggle Panel Button */}
        <button
          onClick={() => setIsPanelOpen(!isPanelOpen)}
          className="absolute right-[400px] top-1/2 -translate-y-1/2 z-30 bg-white border-3 border-black p-2 shadow-brutal hover:shadow-brutal-sm transition-all rounded-r-none rounded-l-xl"
          style={{ right: isPanelOpen ? "400px" : "0", transition: "right 0.3s ease" }}
        >
          {isPanelOpen ? (
            <PanelRightClose className="h-4 w-4 rotate-180" />
          ) : (
            <PanelRightOpen className="h-4 w-4 rotate-180" />
          )}
        </button>

        {/* Preview Panel */}
        <div className="flex-1 relative">
          <PreviewFrame url={previewUrl} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}