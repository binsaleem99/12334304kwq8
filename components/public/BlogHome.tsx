import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowLeft, Calendar, User, Tag, ArrowRight, PenLine, Rocket, Palette, Briefcase, Bell } from 'lucide-react';
import { ViewState } from '../../types';

interface BlogHomeProps {
  onNavigate: (view: ViewState) => void;
}

const BlogHome: React.FC<BlogHomeProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState('الكل');

  const categories = ['الكل', 'تعليمي', 'تصميم', 'أخبار', 'أعمال'];
  
  const posts = [
    {
      id: '1',
      title: 'كيف تبني موقعك في 5 دقائق باستخدام الذكاء الاصطناعي',
      excerpt: 'تعرف على الخطوات البسيطة لبناء حضورك الرقمي في وقت قياسي وبأقل مجهود ممكن...',
      category: 'تعليمي',
      date: '20 ديسمبر 2024',
      author: 'فريق KWQ8',
      icon: Rocket,
      image: 'bg-violet-200',
      featured: true
    },
    {
      id: '2',
      title: 'أهم 10 صيحات في تصميم المواقع لعام 2025',
      excerpt: 'نظرة معمقة على الألوان والخطوط والتقنيات التي ستسيطر على الويب في العام القادم...',
      category: 'تصميم',
      date: '18 ديسمبر 2024',
      author: 'سارة علي',
      icon: Palette,
      image: 'bg-pink-200'
    },
    {
      id: '3',
      title: 'لماذا يجب على كل مطعم في الكويت امتلاك موقع إلكتروني؟',
      excerpt: 'لم يعد التواجد على انستقرام كافياً. اكتشف كيف يساعدك الموقع الخاص في زيادة الطلبات...',
      category: 'أعمال',
      date: '15 ديسمبر 2024',
      author: 'أحمد سالم',
      icon: Briefcase,
      image: 'bg-yellow-200'
    },
    {
      id: '4',
      title: 'تحديثات شهر ديسمبر: قوالب جديدة وميزات أمان مطورة',
      excerpt: 'قمنا بإضافة 5 قوالب جديدة مصممة خصيصاً للمتاجر الإلكترونية في الخليج...',
      category: 'أخبار',
      date: '10 ديسمبر 2024',
      author: 'فريق KWQ8',
      icon: Bell,
      image: 'bg-cyan-200'
    }
  ];

  const featuredPost = posts.find(p => p.featured);
  const recentPosts = posts.filter(p => !p.featured);

  return (
    <div className="pt-24 md:pt-32 pb-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-6xl font-black text-black mb-4 md:mb-6 font-heading flex items-center justify-center gap-3">
                مدونة KWQ8 <PenLine size={32} className="text-[#7C3AED] md:w-12 md:h-12" />
            </h1>
            <p className="text-base md:text-xl text-slate-600 font-bold">نصائح، أخبار، ودروس لمساعدتك في بناء حضورك الرقمي.</p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => onNavigate('blog-post')}
                className="group relative bg-white border-[3px] border-black rounded-3xl overflow-hidden shadow-neo-lg cursor-pointer mb-12 md:mb-16 hover:-translate-y-1 transition-all"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className={`h-56 md:h-80 lg:h-auto ${featuredPost.image} border-b-[3px] lg:border-b-0 lg:border-l-[3px] border-black flex items-center justify-center`}>
                        <featuredPost.icon size={80} strokeWidth={2.5} className="text-black/80 md:w-24 md:h-24 lg:w-32 lg:h-32" />
                    </div>
                    <div className="p-6 md:p-10 lg:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4 md:mb-6">
                            <span className="bg-violet-600 text-white px-2.5 py-1 rounded-lg font-black text-[10px] md:text-xs uppercase border-2 border-black">مميّز: {featuredPost.category}</span>
                            <span className="text-slate-400 font-bold text-xs md:text-sm">{featuredPost.date}</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-black mb-4 md:mb-6 group-hover:text-violet-600 transition-colors leading-tight">
                            {featuredPost.title}
                        </h2>
                        <p className="text-sm md:text-lg text-slate-600 font-bold mb-6 md:mb-8 leading-relaxed line-clamp-3">
                            {featuredPost.excerpt}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-black border-2 border-black"></div>
                                <span className="font-bold text-black text-sm md:text-base">{featuredPost.author}</span>
                            </div>
                            <span className="font-black text-black text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                                اقرأ الآن <ArrowLeft size={18} />
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>
        )}

        {/* Filters */}
        <div className="flex gap-2 md:gap-3 overflow-x-auto pb-6 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:justify-center mb-8">
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-xl font-black text-sm md:text-base border-[3px] whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-black text-white border-black shadow-neo-sm' : 'bg-white text-slate-600 border-slate-200 hover:border-black'}`}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {recentPosts.map(post => (
                <motion.div 
                    key={post.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    onClick={() => onNavigate('blog-post')}
                    className="bg-white border-[3px] border-black rounded-2xl overflow-hidden shadow-neo hover:shadow-neo-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col group"
                >
                    <div className={`h-40 md:h-48 ${post.image} border-b-[3px] border-black flex items-center justify-center`}>
                        <post.icon size={40} strokeWidth={2.5} className="text-black/70 md:w-12 md:h-12" />
                    </div>
                    <div className="p-5 md:p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-[10px] font-black uppercase text-violet-600 bg-violet-50 px-2 py-0.5 rounded border border-violet-200">{post.category}</span>
                            <span className="text-[10px] font-bold text-slate-400">{post.date}</span>
                        </div>
                        <h3 className="text-lg md:text-xl font-black text-black mb-3 group-hover:text-violet-600 transition-colors line-clamp-2">
                            {post.title}
                        </h3>
                        <p className="text-xs md:text-sm text-slate-500 font-bold mb-6 line-clamp-3 leading-relaxed">
                            {post.excerpt}
                        </p>
                        <div className="mt-auto pt-4 border-t-2 border-slate-50 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400">بواسطة: {post.author}</span>
                            <ArrowLeft size={16} className="text-black group-hover:-translate-x-1 transition-transform" />
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* Newsletter - Mobile Optimized */}
        <div className="mt-16 md:mt-24 bg-yellow-300 border-[4px] border-black rounded-3xl p-6 md:p-12 text-center shadow-neo-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 -rotate-45 translate-x-10 -translate-y-10"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
                <h3 className="text-2xl md:text-4xl font-black text-black mb-3 flex items-center justify-center gap-2">
                    نشرة KWQ8 التقنية <PenLine size={24} className="md:w-8 md:h-8" />
                </h3>
                <p className="text-sm md:text-lg text-black font-bold mb-8 opacity-80">انضم لأكثر من 1,000 رائد أعمال واحصل على نصائح البناء الرقمي.</p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input 
                        type="email" 
                        placeholder="بريدك الإلكتروني" 
                        className="flex-1 px-5 py-3 rounded-xl border-[3px] border-black focus:outline-none focus:shadow-neo-sm font-bold text-sm"
                    />
                    <button className="bg-black text-white px-8 py-3 rounded-xl font-black border-[3px] border-black hover:bg-slate-800 transition-all shadow-neo-sm active:translate-x-0 active:translate-y-0 active:shadow-none">
                        اشترك
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHome;