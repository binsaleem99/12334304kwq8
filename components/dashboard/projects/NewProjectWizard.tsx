import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, LayoutTemplate, ArrowRight, ArrowLeft, Check, Sparkles, Loader2, Globe, Search, Link as LinkIcon, X, CheckCircle2, Copy, ExternalLink, Share2, Smartphone, Twitter, Facebook, Instagram, Palette, MessageSquare, PartyPopper, Rocket, MousePointer2 } from 'lucide-react';
import { ViewState } from '../../../types';
import Button from '../../ui/Button';

interface NewProjectWizardProps {
  onNavigate: (view: ViewState) => void;
}

const NewProjectWizard: React.FC<NewProjectWizardProps> = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [description, setDescription] = useState('');
  const [progress, setProgress] = useState(0);

  // Domain State
  const [domainType, setDomainType] = useState<'subdomain' | 'buy' | 'connect'>('subdomain');
  const [subdomain, setSubdomain] = useState('blue-sea-restaurant');
  const [domainSearch, setDomainSearch] = useState('');
  const [connectedDomain, setConnectedDomain] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  // Step 4 Progress Animation
  useEffect(() => {
    if (step === 4) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep(5), 800); // Transition to Success Step
            return 100;
          }
          return prev + 1; // Progress tick
        });
      }, 40); // Faster for demo
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://${subdomain}.kwq8.com`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const publishSteps = [
    { label: 'تحضير الملفات', threshold: 0 },
    { label: 'رفع المحتوى', threshold: 20 },
    { label: 'ربط الدومين', threshold: 45 },
    { label: 'إعداد SSL', threshold: 70 },
    { label: 'التحقق النهائي', threshold: 90 },
  ];

  return (
    <div className="max-w-4xl mx-auto min-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
            <button 
                onClick={() => step === 1 ? onNavigate('dashboard') : setStep(step - 1)}
                className={`text-slate-500 hover:text-black font-bold flex items-center gap-2 ${step >= 4 ? 'invisible' : ''}`}
            >
                <ArrowRight size={20} /> {step === 1 ? 'إلغاء' : 'رجوع'}
            </button>
            <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(s => (
                    <div key={s} className={`w-3 h-3 rounded-full transition-colors ${step >= s ? 'bg-[#7C3AED]' : 'bg-slate-200'} ${s === 5 ? 'hidden' : ''}`}></div>
                ))}
            </div>
            <div className="w-20"></div> {/* Spacer */}
        </div>

        <AnimatePresence mode='wait'>
            
            {/* STEP 1: CHOOSE METHOD */}
            {step === 1 && (
                <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-1 flex flex-col justify-center"
                >
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-black text-black mb-4 flex items-center justify-center gap-4">
                            كيف تريد البدء؟ <MousePointer2 className="text-[#7C3AED]" size={36} />
                        </h1>
                        <p className="text-xl text-slate-600 font-bold">اختر الطريقة الأنسب لك لبناء موقعك</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* AI Method */}
                        <div 
                            onClick={() => setStep(2)}
                            className="bg-white border-[3px] border-black rounded-2xl p-8 shadow-[8px_8px_0px_0px_rgba(124,58,237,0.3)] hover:shadow-[8px_8px_0px_0px_#7C3AED] hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden"
                        >
                            <div className="absolute top-4 left-4 bg-yellow-300 text-black text-xs font-black px-2 py-1 rounded border border-black z-10 flex items-center gap-1">
                                <Sparkles size={12} /> الأسرع
                            </div>
                            <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mb-6 border-2 border-black group-hover:bg-[#7C3AED] group-hover:text-white transition-colors">
                                <Bot size={32} strokeWidth={2.5} />
                            </div>
                            <h3 className="text-2xl font-black text-black mb-3">الذكاء الاصطناعي</h3>
                            <p className="text-slate-600 font-medium mb-8 leading-relaxed">
                                اوصف موقعك بكلمات بسيطة، وسيقوم الذكاء الاصطناعي ببنائه وكتابة المحتوى وتنسيق الصور في ثوانٍ.
                            </p>
                            <div className="font-bold text-[#7C3AED] flex items-center gap-2">
                                ابدأ البناء <ArrowLeft size={18} />
                            </div>
                        </div>

                        {/* Templates Method */}
                        <div className="bg-white border-[3px] border-black rounded-2xl p-8 shadow-[8px_8px_0px_0px_#000] hover:-translate-y-1 transition-all cursor-pointer group hover:bg-slate-50">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6 border-2 border-black group-hover:bg-black group-hover:text-white transition-colors">
                                <LayoutTemplate size={32} strokeWidth={2.5} />
                            </div>
                            <h3 className="text-2xl font-black text-black mb-3">اختر من القوالب</h3>
                            <p className="text-slate-600 font-medium mb-8 leading-relaxed">
                                تصفح مكتبة من القوالب المصممة احترافياً وعدّلها يدوياً لتناسب هويتك التجارية.
                            </p>
                            <div className="font-bold text-black flex items-center gap-2">
                                استعرض القوالب <ArrowLeft size={18} />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* STEP 2: AI DESCRIPTION */}
            {step === 2 && (
                <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-1 max-w-2xl mx-auto w-full"
                >
                    <div className="mb-8">
                        <h1 className="text-3xl font-black text-black mb-2 flex items-center gap-2">
                            اوصف موقع أحلامك <MessageSquare className="text-blue-500" />
                        </h1>
                        <p className="text-slate-600 font-bold">كلما زادت التفاصيل، كانت النتيجة أفضل.</p>
                    </div>

                    <div className="bg-white border-[3px] border-black rounded-2xl p-2 shadow-[4px_4px_0px_0px_#000] mb-6">
                        <textarea 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full h-48 p-4 text-lg font-medium resize-none focus:outline-none rounded-xl"
                            placeholder="مثال: أريد موقع لمطعم مأكولات بحرية كويتي، بتصميم أزرق مستوحى من البحر. يحتوي على قائمة طعام، صفحة 'عن المطعم'، ونموذج لحجز الطاولات..."
                            autoFocus
                        ></textarea>
                        <div className="flex justify-between items-center px-4 pb-2">
                            <span className={`text-xs font-bold ${description.length > 500 ? 'text-red-500' : 'text-slate-400'}`}>
                                {description.length}/500 حرف
                            </span>
                            <div className="flex gap-2">
                                <button className="text-xs bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded font-bold transition-colors">مطعم</button>
                                <button className="text-xs bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded font-bold transition-colors">صالون</button>
                                <button className="text-xs bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded font-bold transition-colors">متجر</button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#F5F3FF] border-2 border-[#7C3AED] rounded-xl p-4 mb-8">
                        <div className="flex items-start gap-3">
                            <Sparkles className="text-[#7C3AED] shrink-0 mt-1" size={20} />
                            <div>
                                <h4 className="font-bold text-[#7C3AED] mb-1">نصيحة من الذكاء الاصطناعي:</h4>
                                <p className="text-sm text-slate-700">اذكر نوع الخدمات التي تقدمها، الألوان التي تفضلها، والجمهور المستهدف.</p>
                            </div>
                        </div>
                    </div>

                    <Button 
                        fullWidth 
                        size="lg" 
                        disabled={description.length < 10}
                        onClick={() => setStep(3)}
                        className="bg-[#7C3AED] border-black text-white hover:bg-[#6D28D9]"
                    >
                        {description.length < 10 ? 'اكتب وصفاً للمتابعة' : 'التالي: اختيار الدومين ←'}
                    </Button>
                </motion.div>
            )}

            {/* STEP 3: DOMAIN SELECTION */}
            {step === 3 && (
                <motion.div 
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-1 max-w-2xl mx-auto w-full"
                >
                    <div className="mb-8">
                        <h1 className="text-3xl font-black text-black mb-2 flex items-center gap-2">
                            اختر دومين موقعك <Globe className="text-green-600" />
                        </h1>
                        <p className="text-slate-600 font-bold">كيف سيصل العملاء إلى موقعك؟</p>
                    </div>

                    <div className="space-y-4 mb-8">
                        
                        {/* Option 1: Free Subdomain */}
                        <div 
                            onClick={() => setDomainType('subdomain')}
                            className={`border-[3px] rounded-2xl p-6 cursor-pointer transition-all relative overflow-hidden ${
                                domainType === 'subdomain' 
                                ? 'border-black bg-white shadow-[4px_4px_0px_0px_#000] z-10' 
                                : 'border-slate-200 bg-slate-50 opacity-80 hover:opacity-100 hover:border-slate-300'
                            }`}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`w-6 h-6 rounded-full border-[3px] border-black flex items-center justify-center transition-colors ${domainType === 'subdomain' ? 'bg-[#7C3AED]' : 'bg-white'}`}>
                                    {domainType === 'subdomain' && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                                </div>
                                <div>
                                    <h3 className="font-black text-lg text-black">دومين مجاني من KWQ8</h3>
                                    <p className="text-xs font-bold text-slate-500">سريع، مجاني، وجاهز فوراً</p>
                                </div>
                            </div>

                            {domainType === 'subdomain' && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="bg-slate-50 border-2 border-slate-200 rounded-xl p-2 flex items-center gap-2 text-left" dir="ltr"
                                >
                                    <div className="pl-3 text-slate-400 font-bold">https://</div>
                                    <input 
                                        type="text" 
                                        value={subdomain}
                                        onChange={(e) => setSubdomain(e.target.value)}
                                        className="flex-1 bg-transparent border-none outline-none font-black text-black placeholder:text-slate-300 min-w-0"
                                        placeholder="your-project"
                                    />
                                    <div className="pr-3 text-slate-400 font-bold">.kwq8.com</div>
                                    <div className="ml-auto px-2 py-1 bg-green-100 text-green-700 text-xs font-black rounded flex items-center gap-1 border border-green-200">
                                        <Check size={12} /> متاح
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Option 2: Buy Domain */}
                        <div 
                            onClick={() => setDomainType('buy')}
                            className={`border-[3px] rounded-2xl p-6 cursor-pointer transition-all relative ${
                                domainType === 'buy' 
                                ? 'border-black bg-white shadow-[4px_4px_0px_0px_#000] z-10' 
                                : 'border-slate-200 bg-slate-50 opacity-80 hover:opacity-100 hover:border-slate-300'
                            }`}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`w-6 h-6 rounded-full border-[3px] border-black flex items-center justify-center transition-colors ${domainType === 'buy' ? 'bg-[#7C3AED]' : 'bg-white'}`}>
                                    {domainType === 'buy' && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                                </div>
                                <div>
                                    <h3 className="font-black text-lg text-black flex items-center gap-2">
                                        دومين خاص جديد
                                        <span className="bg-yellow-300 text-black border border-black text-[10px] px-2 py-0.5 rounded shadow-[1px_1px_0px_0px_#000]">
                                            مجاني مع باقتك
                                        </span>
                                    </h3>
                                    <p className="text-xs font-bold text-slate-500">احترافي وموثوق لعلامتك التجارية</p>
                                </div>
                            </div>

                            {domainType === 'buy' && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                >
                                    <div className="flex gap-2 mb-4">
                                        <input 
                                            type="text" 
                                            value={domainSearch}
                                            onChange={(e) => setDomainSearch(e.target.value)}
                                            placeholder="ابحث عن دومين مميز..."
                                            className="flex-1 bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-2 font-bold text-black focus:border-black focus:outline-none transition-colors"
                                            dir="auto"
                                        />
                                        <button className="bg-black text-white px-4 py-2 rounded-xl font-bold border-2 border-black">بحث</button>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between p-3 border-2 border-green-200 bg-green-50 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px] font-bold">✓</div>
                                                <span className="font-black text-black">bluesea.kw</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs font-bold text-slate-500 line-through">12 د.ك</span>
                                                <span className="text-xs font-black bg-yellow-300 px-2 py-1 rounded border border-black">مجاني</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between p-3 border-2 border-slate-100 rounded-lg opacity-60 bg-slate-50">
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 rounded-full bg-red-400 flex items-center justify-center text-white text-[10px] font-bold">✗</div>
                                                <span className="font-bold text-slate-500 line-through">bluesea.com</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-400">محجوز</span>
                                        </div>
                                         <div className="flex items-center justify-between p-3 border-2 border-slate-200 bg-white rounded-lg hover:border-black cursor-pointer">
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>
                                                <span className="font-bold text-black">bluesea.net</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs font-bold text-slate-500 line-through">9 د.ك</span>
                                                <span className="text-xs font-black bg-yellow-300 px-2 py-1 rounded border border-black">مجاني</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Option 3: Connect Domain */}
                        <div 
                            onClick={() => setDomainType('connect')}
                            className={`border-[3px] rounded-2xl p-6 cursor-pointer transition-all relative ${
                                domainType === 'connect' 
                                ? 'border-black bg-white shadow-[4px_4px_0px_0px_#000] z-10' 
                                : 'border-slate-200 bg-slate-50 opacity-80 hover:opacity-100 hover:border-slate-300'
                            }`}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`w-6 h-6 rounded-full border-[3px] border-black flex items-center justify-center transition-colors ${domainType === 'connect' ? 'bg-[#7C3AED]' : 'bg-white'}`}>
                                    {domainType === 'connect' && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                                </div>
                                <div>
                                    <h3 className="font-black text-lg text-black">لديك دومين بالفعل؟</h3>
                                    <p className="text-xs font-bold text-slate-500">اربط دومين تملكه من GoDaddy أو غيره</p>
                                </div>
                            </div>

                             {domainType === 'connect' && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="bg-slate-50 border-2 border-slate-200 rounded-xl p-2 flex items-center gap-2 text-left" dir="ltr"
                                >
                                    <LinkIcon size={16} className="ml-2 text-slate-400" />
                                    <input 
                                        type="text" 
                                        value={connectedDomain}
                                        onChange={(e) => setConnectedDomain(e.target.value)}
                                        className="flex-1 bg-transparent border-none outline-none font-bold text-black placeholder:text-slate-300 min-w-0"
                                        placeholder="www.your-existing-domain.com"
                                    />
                                    <button className="mr-1 px-3 py-1.5 bg-black text-white text-xs font-bold rounded-lg border border-black hover:bg-slate-800">
                                        تحقق
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    <Button 
                        fullWidth 
                        size="lg" 
                        onClick={() => setStep(4)}
                        className="bg-[#7C3AED] border-black text-white hover:bg-[#6D28D9]"
                    >
                         <Sparkles className="ml-2" size={18} /> ابدأ البناء السريع
                    </Button>
                </motion.div>
            )}

            {/* STEP 4: PUBLISHING */}
            {step === 4 && (
                <motion.div 
                    key="step4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex-1 flex flex-col items-center justify-center w-full"
                >
                    <div className="w-full max-w-xl bg-white border-[3px] border-black rounded-2xl p-8 md:p-12 shadow-[8px_8px_0px_0px_#000]">
                        
                        <h2 className="text-3xl font-black text-black mb-8 text-center flex items-center justify-center gap-3">
                            <motion.div 
                                animate={{ y: [0, -5, 0] }} 
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="inline-block"
                            >
                                <Rocket size={32} className="text-[#7C3AED]" />
                            </motion.div> 
                            جاري نشر موقعك...
                        </h2>

                        {/* Progress Bar */}
                        <div className="w-full h-8 bg-slate-100 rounded-full border-[3px] border-black overflow-hidden mb-2 relative">
                            <motion.div 
                                className="h-full bg-[#7C3AED] relative"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[pulse_1s_infinite]"></div>
                            </motion.div>
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-black text-black z-10 mix-blend-overlay">
                                {progress}%
                            </div>
                        </div>
                        
                        <div className="h-px bg-slate-200 my-8"></div>

                        {/* Checklist */}
                        <div className="space-y-5">
                            {publishSteps.map((s, idx) => {
                                const isDone = progress > s.threshold + 15;
                                const isActive = progress >= s.threshold && !isDone;
                                const isPending = progress < s.threshold;

                                return (
                                    <div key={idx} className="flex items-center gap-4">
                                        <div className="w-8 flex justify-center">
                                            {isDone && (
                                                <motion.div 
                                                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                                                    className="w-6 h-6 bg-green-500 rounded-full border-2 border-black flex items-center justify-center text-white"
                                                >
                                                    <Check size={14} strokeWidth={4} />
                                                </motion.div>
                                            )}
                                            {isActive && (
                                                <Loader2 size={24} className="text-[#7C3AED] animate-spin" strokeWidth={3} />
                                            )}
                                            {isPending && (
                                                <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>
                                            )}
                                        </div>
                                        <span className={`font-bold text-lg ${
                                            isDone ? 'text-slate-400 line-through' : 
                                            isActive ? 'text-black' : 
                                            'text-slate-300'
                                        }`}>
                                            {s.label} {isActive && '...'}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* STEP 5: SUCCESS */}
            {step === 5 && (
                <motion.div 
                    key="step5"
                    initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="flex-1 flex flex-col items-center justify-center w-full relative"
                >
                    <div className="w-full max-w-xl bg-white border-[3px] border-black rounded-2xl p-8 shadow-[12px_12px_0px_0px_#000] relative overflow-hidden">
                        
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-[#7C3AED] rounded-full flex items-center justify-center mx-auto mb-4 border-[3px] border-black shadow-[4px_4px_0px_0px_#000]">
                                <PartyPopper size={40} className="text-white animate-bounce" />
                            </div>
                            <h2 className="text-3xl font-black text-black mb-2">تم النشر بنجاح</h2>
                            <p className="text-slate-600 font-bold">موقعك الآن على الهواء ليشاهده الجميع</p>
                        </div>

                        {/* URL Card */}
                        <div className="bg-slate-50 border-[3px] border-black rounded-xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3 w-full md:w-auto overflow-hidden">
                                <div className="w-10 h-10 bg-white rounded-lg border-2 border-black flex items-center justify-center shrink-0">
                                    <Globe size={20} className="text-[#7C3AED]" />
                                </div>
                                <a 
                                    href={`https://${subdomain}.kwq8.com`} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="font-black text-[#7C3AED] hover:underline truncate"
                                    dir="ltr"
                                >
                                    https://{subdomain}.kwq8.com
                                </a>
                            </div>
                            <div className="flex gap-2 w-full md:w-auto">
                                <button 
                                    onClick={() => window.open(`https://${subdomain}.kwq8.com`, '_blank')}
                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-black text-white font-bold rounded-lg border-2 border-black hover:bg-slate-800 transition-all shadow-[2px_2px_0px_0px_#7C3AED]"
                                >
                                    <ExternalLink size={16} /> زيارة
                                </button>
                                <button 
                                    onClick={handleCopy}
                                    className="px-3 py-2 bg-white text-black border-2 border-black rounded-lg font-bold hover:bg-slate-100 transition-all"
                                    title="نسخ الرابط"
                                >
                                    {isCopied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Social Share */}
                        <div className="mb-8">
                            <label className="block text-sm font-bold text-slate-500 mb-3 text-center">شارك موقعك الجديد:</label>
                            <div className="flex justify-center gap-3">
                                <button className="p-3 bg-green-500 text-white rounded-xl border-[3px] border-black hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#000] transition-all">
                                    <Smartphone size={24} />
                                </button>
                                <button className="p-3 bg-sky-500 text-white rounded-xl border-[3px] border-black hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#000] transition-all">
                                    <Twitter size={24} />
                                </button>
                                <button className="p-3 bg-blue-600 text-white rounded-xl border-[3px] border-black hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#000] transition-all">
                                    <Facebook size={24} />
                                </button>
                                <button className="p-3 bg-pink-500 text-white rounded-xl border-[3px] border-black hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#000] transition-all">
                                    <Instagram size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Next Steps Checklist */}
                        <div className="border-t-2 border-slate-100 pt-6 mb-8">
                             <h3 className="font-bold text-black mb-4 flex items-center gap-2">
                                <Sparkles size={18} className="text-[#7C3AED]" /> الخطوات التالية:
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-sm font-bold text-slate-700 hover:text-black cursor-pointer group">
                                    <div className="w-6 h-6 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-300 group-hover:border-[#7C3AED] group-hover:text-[#7C3AED] transition-colors">
                                        <ArrowLeft size={14} className="rotate-180" />
                                    </div>
                                    ربط دومين خاص
                                </li>
                                <li className="flex items-center gap-3 text-sm font-bold text-slate-700 hover:text-black cursor-pointer group">
                                     <div className="w-6 h-6 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-300 group-hover:border-[#7C3AED] group-hover:text-[#7C3AED] transition-colors">
                                        <ArrowLeft size={14} className="rotate-180" />
                                    </div>
                                    إضافة Google Analytics
                                </li>
                                <li className="flex items-center gap-3 text-sm font-bold text-slate-700 hover:text-black cursor-pointer group">
                                     <div className="w-6 h-6 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-300 group-hover:border-[#7C3AED] group-hover:text-[#7C3AED] transition-colors">
                                        <ArrowLeft size={14} className="rotate-180" />
                                    </div>
                                    ربط WhatsApp Business
                                </li>
                            </ul>
                        </div>

                        <Button 
                            variant="primary" 
                            fullWidth 
                            size="lg"
                            onClick={() => onNavigate('dashboard')}
                            className="bg-white text-black border-black hover:bg-slate-50"
                        >
                            ← العودة للوحة التحكم
                        </Button>

                    </div>
                </motion.div>
            )}

        </AnimatePresence>
    </div>
  );
};

export default NewProjectWizard;