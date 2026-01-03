"use client";

import React, { useState, useRef, useEffect } from 'react';
// Fixed casing and corrected import for default export
import BuilderNavbar from './BuilderNavbar.tsx';
import MockWebsite from '../website/MockWebsite.tsx';
import { ViewState } from '../../types.ts';
import { Sparkles, Monitor, Tablet, Smartphone, ArrowUp, Loader2, CheckCircle2, Palette, Type, Image } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageUploadModal from '../ui/ImageUploadModal.tsx';
import ColorPickerPanel from './panels/ColorPickerPanel.tsx';
import { generateWebsiteStructure } from '../../lib/gemini.ts';

interface AIBuilderProps {
  onNavigate: (view: ViewState) => void;
}

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: string;
  isAction?: boolean;
}

const AIBuilder: React.FC<AIBuilderProps> = ({ onNavigate }) => {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [showImageModal, setShowImageModal] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      role: 'ai', 
      content: 'مرحباً! 👋 أنا المساعد الذكي الخاص بك. جاري تحضير هيكل موقعك بناءً على طلبك السابق...', 
      timestamp: 'الآن' 
    }
  ]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const pendingPrompt = sessionStorage.getItem('pending_website_prompt');
    if (pendingPrompt) {
      sessionStorage.removeItem('pending_website_prompt');
      handleAISubmit(pendingPrompt);
    }
  }, []);

  const handleAISubmit = async (prompt: string) => {
    setIsProcessing(true);
    const aiResponse = await generateWebsiteStructure(prompt);
    
    const aiMsg: Message = { 
        id: Date.now().toString(), 
        role: 'ai', 
        content: `تم إنشاء هيكل الموقع! 🎉\n\n${aiResponse}\n\nيمكنك الآن طلب أي تعديلات إضافية هنا.`,
        timestamp: new Date().toLocaleTimeString('ar-KW', { hour: '2-digit', minute: '2-digit' }),
        isAction: true
    };
    setMessages(prev => [...prev, aiMsg]);
    setIsProcessing(false);
  };

  const handleSend = () => {
    if (!input.trim() || isProcessing) return;
    
    const userMsg: Message = { 
      id: Date.now().toString(), 
      role: 'user', 
      content: input, 
      timestamp: new Date().toLocaleTimeString('ar-KW', { hour: '2-digit', minute: '2-digit' }) 
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    handleAISubmit(input);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden font-sans" dir="rtl">
      <BuilderNavbar onNavigate={onNavigate} />
      
      <ImageUploadModal isOpen={showImageModal} onClose={() => setShowImageModal(false)} onSelect={() => {}} />
      <AnimatePresence>
        {showColorPicker && <ColorPickerPanel onClose={() => setShowColorPicker(false)} onChange={() => {}} />}
      </AnimatePresence>

      <div className="flex-1 flex pt-16 h-full relative">
        {/* Chat Sidebar */}
        <div className="w-full md:w-[380px] bg-white border-l-[3px] border-black flex flex-col shrink-0 z-20 shadow-xl">
            <div className="p-4 border-b-2 border-slate-100 flex items-center justify-between">
                <h2 className="font-black text-lg flex items-center gap-2">
                    <Sparkles className="text-[#7C3AED]" size={20} fill="currentColor" /> المساعد الذكي
                </h2>
                <div className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">نشط</div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
                {messages.map((msg) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={msg.id} 
                        className={`flex flex-col ${msg.role === 'ai' ? 'items-start' : 'items-end'}`}
                    >
                        <div className={`max-w-[90%] rounded-2xl p-4 text-sm font-bold leading-relaxed whitespace-pre-wrap shadow-neo-sm border-2 ${
                            msg.role === 'ai' 
                            ? 'bg-slate-50 border-slate-200 text-slate-800 rounded-tr-none' 
                            : 'bg-black text-white border-black rounded-tl-none'
                        }`}>
                            {msg.content}
                            {msg.isAction && (
                                <div className="mt-3 flex items-center gap-2 text-xs bg-green-100 text-green-800 px-3 py-1.5 rounded-lg border border-green-200 w-fit">
                                    <CheckCircle2 size={14} /> تم التحديث
                                </div>
                            )}
                        </div>
                        <span className="text-[10px] font-bold text-slate-300 mt-1 px-2">
                            {msg.role === 'ai' ? 'AI Architect' : 'أنت'} • {msg.timestamp}
                        </span>
                    </motion.div>
                ))}
                
                {isProcessing && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start">
                        <div className="bg-white border-2 border-[#7C3AED] px-4 py-3 rounded-2xl rounded-tr-none flex items-center gap-2 shadow-sm">
                            <Loader2 className="w-4 h-4 text-[#7C3AED] animate-spin" />
                            <span className="text-xs font-bold text-[#7C3AED]">الذكاء الاصطناعي يفكر...</span>
                        </div>
                    </motion.div>
                )}
                <div ref={chatEndRef} />
            </div>

            <div className="p-4 bg-white border-t-[3px] border-black">
                <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide pb-1">
                    <button onClick={() => setShowColorPicker(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-colors border border-slate-200">
                        <Palette size={14} /> الألوان
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-colors border border-slate-200">
                        <Type size={14} /> الخطوط
                    </button>
                    <button onClick={() => setShowImageModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-colors border border-slate-200">
                        <Image size={14} /> صور
                    </button>
                </div>

                <div className="relative group">
                    <div className="relative bg-white border-[3px] border-black rounded-xl flex items-end p-2 transition-shadow focus-within:shadow-neo">
                        <textarea 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                            placeholder="اكتب تعديلاً... (مثال: غير لون الخلفية للأزرق)"
                            className="w-full bg-transparent border-none focus:ring-0 resize-none h-14 max-h-32 py-3 px-2 font-bold text-sm placeholder:text-slate-400"
                            disabled={isProcessing}
                        ></textarea>
                        <button 
                            onClick={handleSend}
                            disabled={!input.trim() || isProcessing}
                            className="p-2.5 bg-black text-white rounded-lg hover:bg-[#7C3AED] disabled:bg-slate-200 disabled:text-slate-400 transition-colors mb-1 ml-1"
                        >
                            <ArrowUp size={18} strokeWidth={3} />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Preview Area */}
        <div className="hidden md:flex flex-1 bg-[#F5F5F5] relative flex-col overflow-hidden" 
             style={{ backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
            
            <div className="h-14 flex items-center justify-center px-4 relative pointer-events-none">
                <div className="pointer-events-auto bg-white border-2 border-black rounded-xl p-1 flex gap-1 shadow-sm mt-4">
                    <button onClick={() => setDevice('desktop')} className={`p-2 rounded-lg transition-all ${device === 'desktop' ? 'bg-black text-white shadow-sm' : 'text-slate-400 hover:text-black hover:bg-slate-50'}`}>
                        <Monitor size={18} />
                    </button>
                    <button onClick={() => setDevice('tablet')} className={`p-2 rounded-lg transition-all ${device === 'tablet' ? 'bg-black text-white shadow-sm' : 'text-slate-400 hover:text-black hover:bg-slate-50'}`}>
                        <Tablet size={18} />
                    </button>
                    <button onClick={() => setDevice('mobile')} className={`p-2 rounded-lg transition-all ${device === 'mobile' ? 'bg-black text-white shadow-sm' : 'text-slate-400 hover:text-black hover:bg-slate-50'}`}>
                        <Smartphone size={18} />
                    </button>
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-8 overflow-hidden">
                <motion.div 
                    layout
                    initial={false}
                    animate={{ 
                        width: device === 'mobile' ? 375 : device === 'tablet' ? 768 : '100%',
                        height: device === 'mobile' ? 700 : device === 'tablet' ? 900 : '100%',
                        borderRadius: device === 'desktop' ? '12px' : '32px',
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className={`bg-white shadow-2xl overflow-hidden relative border-[3px] border-black ${device === 'desktop' ? 'w-full h-full' : ''}`}
                >
                    <div className="w-full h-full overflow-y-auto scrollbar-hide bg-white">
                        <MockWebsite />
                    </div>

                    <AnimatePresence>
                        {isProcessing && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-30 flex items-center justify-center"
                            >
                                <div className="bg-black text-white px-6 py-3 rounded-full font-bold flex items-center gap-3 shadow-xl border-2 border-white/20">
                                    <Sparkles className="animate-pulse text-[#FACC15]" size={18} />
                                    جاري تطبيق التعديلات...
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AIBuilder;