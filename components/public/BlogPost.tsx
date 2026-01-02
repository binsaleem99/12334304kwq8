import React from 'react';
import { motion } from 'framer-motion';
// Fixed: Added Palette to the lucide-react imports
import { ArrowRight, Calendar, User, Share2, Facebook, Twitter, Link as LinkIcon, MessageSquare, Tag, Zap, Palette } from 'lucide-react';
import { ViewState } from '../../types';

interface BlogPostProps {
  onNavigate: (view: ViewState) => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ onNavigate }) => {
  return (
    <div className="pt-32 pb-20 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        
        {/* Navigation Back */}
        <button 
            onClick={() => onNavigate('blog')}
            className="flex items-center gap-2 text-slate-500 hover:text-black font-black mb-8 transition-colors group"
        >
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /> العودة للمدونة
        </button>

        {/* Post Header */}
        <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
                <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-lg font-black text-xs border-2 border-violet-700">تعليمي</span>
                <span className="text-slate-400 font-bold text-sm flex items-center gap-1">
                    <Calendar size={14} /> 20 ديسمبر 2024
                </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-8 leading-tight font-heading">
                كيف تبني موقعك في 5 دقائق باستخدام الذكاء الاصطناعي
            </h1>
            <div className="flex items-center justify-between border-y-2 border-slate-100 py-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-violet-500 border-2 border-black"></div>
                    <div>
                        <div className="font-black text-black">فريق KWQ8</div>
                        <div className="text-xs font-bold text-slate-400">فريق المحتوى التقني</div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 rounded-lg border-2 border-slate-200 hover:border-black transition-colors" title="مشاركة على فيسبوك">
                        <Facebook size={20} />
                    </button>
                    <button className="p-2 rounded-lg border-2 border-slate-200 hover:border-black transition-colors" title="مشاركة على تويتر">
                        <Twitter size={20} />
                    </button>
                    <button className="p-2 rounded-lg border-2 border-slate-200 hover:border-black transition-colors" title="نسخ الرابط">
                        <LinkIcon size={20} />
                    </button>
                </div>
            </div>
        </header>

        {/* Featured Image */}
        <div className="bg-violet-100 border-[4px] border-black rounded-3xl h-64 md:h-96 flex items-center justify-center mb-12 shadow-[12px_12px_0px_0px_#000]">
            <Zap size={140} strokeWidth={2.5} className="text-black/80" />
        </div>

        {/* Content Body */}
        <article className="prose prose-lg max-w-none font-medium text-slate-800 leading-relaxed text-right space-y-6" dir="rtl">
            <p className="text-xl font-bold text-black mb-8">
                في عصر السرعة الحالي، لم يعد بناء المواقع الإلكترونية يحتاج لأسابيع من البرمجة أو خبرة تقنية واسعة. بفضل الذكاء الاصطناعي، أصبح بإمكانك تحويل فكرتك إلى واقع ملموس في دقائق معدودة.
            </p>

            <h2 className="text-3xl font-black text-black pt-8">ما هو البناء بالذكاء الاصطناعي؟</h2>
            <p>
                الذكاء الاصطناعي في KWQ8 لا يقوم فقط برسم الموقع، بل يفهم سياق عملك. إذا كنت تملك مطعماً، فإنه يعلم أنك تحتاج لقائمة طعام، نموذج حجز، وخريطة للموقع. هو يقوم بعمل المصمم والمبرمج وكاتب المحتوى في آن واحد.
            </p>

            <div className="bg-slate-50 border-r-8 border-violet-600 p-8 rounded-xl my-12 italic font-bold text-2xl text-black">
                "الموقع الإلكتروني ليس مجرد ترف، بل هو واجهتك الأساسية أمام العالم في عام 2025."
            </div>

            <h2 className="text-3xl font-black text-black pt-8">خطوات البناء في KWQ8</h2>
            <ol className="list-decimal list-inside space-y-4">
                <li><span className="font-black text-black">الوصف الدقيق:</span> ابدأ بكتابة وصف لمشروعك، كلما كنت دقيقاً كانت النتيجة مذهلة.</li>
                <li><span className="font-black text-black">اختيار الهوية:</span> حدد الألوان التي تناسب علامتك التجارية.</li>
                <li><span className="font-black text-black">التعديل الفوري:</span> استخدم المحادثة مع الذكاء الاصطناعي لطلب تغييرات محددة.</li>
            </ol>

            <h2 className="text-3xl font-black text-black pt-8">الخلاصة</h2>
            <p>
                لا تدع العوائق التقنية تقف في طريق أحلامك. ابدأ اليوم بـ 1 د.ك فقط وشاهد فكرتك تنمو على الإنترنت.
            </p>
        </article>

        {/* Footer Meta */}
        <footer className="mt-16 pt-8 border-t-2 border-slate-100">
            <div className="flex flex-wrap gap-2 mb-12">
                <span className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-lg text-sm font-bold text-slate-600 border border-slate-200">
                    <Tag size={14} /> ذكاء_اصطناعي
                </span>
                <span className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-lg text-sm font-bold text-slate-600 border border-slate-200">
                    <Tag size={14} /> بناء_مواقع
                </span>
                <span className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-lg text-sm font-bold text-slate-600 border border-slate-200">
                    <Tag size={14} /> الكويت
                </span>
            </div>

            {/* Author Bio */}
            <div className="bg-slate-50 border-[3px] border-black rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-center text-center md:text-right">
                <div className="w-24 h-24 rounded-full bg-violet-500 border-[3px] border-black shrink-0"></div>
                <div>
                    <h4 className="text-2xl font-black text-black mb-2">فريق KWQ8</h4>
                    <p className="text-slate-600 font-bold leading-relaxed mb-4">نحن نسعى لجعل التقنية متاحة للجميع في العالم العربي. فريقنا يعمل يومياً على تطوير أدوات ذكية تخدم رواد الأعمال والمبدعين.</p>
                    <div className="flex justify-center md:justify-start gap-4">
                        <button className="text-violet-600 font-black hover:underline">تابعنا على تويتر</button>
                        <button className="text-violet-600 font-black hover:underline">مشاهدة كل المقالات</button>
                    </div>
                </div>
            </div>
        </footer>

        {/* Related Posts */}
        <div className="mt-20">
            <h3 className="text-2xl font-black text-black mb-8">مقالات قد تعجبك</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map(i => (
                    <div key={i} className="flex gap-4 p-4 border-2 border-slate-100 rounded-xl hover:border-black transition-colors cursor-pointer group">
                        <div className="w-24 h-24 bg-pink-100 rounded-lg border-2 border-black shrink-0 flex items-center justify-center">
                            <Palette size={40} className="text-black/70" />
                        </div>
                        <div>
                            <h4 className="font-black text-black mb-1 group-hover:text-violet-600 transition-colors">أهم صيحات التصميم في 2025</h4>
                            <div className="text-xs font-bold text-slate-400">18 ديسمبر 2024</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default BlogPost;