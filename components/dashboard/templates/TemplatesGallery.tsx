import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, Lock, Eye, ArrowRight, X, Smartphone, Monitor, Check } from 'lucide-react';
import { ViewState } from '../../../types';
import Button from '../../ui/Button';
import MockWebsite from '../../website/MockWebsite';

interface TemplatesGalleryProps {
  onNavigate: (view: ViewState) => void;
}

interface Template {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  type: 'free' | 'pro' | 'premium';
  description: string;
  image: string; // Placeholder color class
  features: string[];
}

const TemplatesGallery: React.FC<TemplatesGalleryProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'restaurant', label: '🍔 مطاعم' },
    { id: 'salon', label: '💇 صالونات' },
    { id: 'store', label: '🛒 متاجر' },
    { id: 'corporate', label: '🏢 شركات' },
    { id: 'portfolio', label: '👨‍💻 بورتفوليو' },
    { id: 'clinic', label: '🏥 عيادات' },
    { id: 'agency', label: '🕌 مؤسسات' },
  ];

  const templates: Template[] = [
    {
      id: '1',
      name: 'مطعم عصري',
      category: 'restaurant',
      rating: 4.8,
      reviews: 124,
      type: 'free',
      description: 'تصميم أنيق وعصري لمطاعم الوجبات السريعة والكافيهات. يركز على الصور الكبيرة وقائمة الطعام التفاعلية.',
      image: 'bg-orange-100',
      features: ['قائمة طعام تفاعلية', 'نظام حجز طاولات', 'معرض صور', 'خريطة الموقع', 'ربط واتساب'],
    },
    {
      id: '2',
      name: 'صالون أنيق',
      category: 'salon',
      rating: 4.9,
      reviews: 89,
      type: 'free',
      description: 'واجهة هادئة ومريحة للصالونات ومراكز التجميل. تتضمن جدول مواعيد وقائمة خدمات مفصلة.',
      image: 'bg-pink-100',
      features: ['حجز مواعيد', 'معرض أعمال', 'قائمة أسعار', 'فريق العمل', 'تكامل انستقرام'],
    },
    {
      id: '3',
      name: 'متجر إلكتروني',
      category: 'store',
      rating: 4.7,
      reviews: 156,
      type: 'pro',
      description: 'قالب متكامل للتجارة الإلكترونية يدعم منتجات متعددة، سلة مشتريات، ودفع إلكتروني.',
      image: 'bg-blue-100',
      features: ['سلة مشتريات', 'بوابة دفع', 'إدارة مخزون', 'حسابات عملاء', 'كوبونات خصم'],
    },
    {
      id: '4',
      name: 'شركة استشارات',
      category: 'corporate',
      rating: 4.6,
      reviews: 45,
      type: 'free',
      description: 'تصميم احترافي للشركات والمؤسسات يعكس الثقة والجدية. مثالي لمكاتب المحاماة والاستشارات.',
      image: 'bg-slate-200',
      features: ['نبذة عن الشركة', 'خدماتنا', 'شركاء النجاح', 'مدونة أخبار', 'نموذج تواصل'],
    },
    {
      id: '5',
      name: 'عيادة الأسنان',
      category: 'clinic',
      rating: 4.9,
      reviews: 210,
      type: 'premium',
      description: 'قالب نظيف وعملي للعيادات والمراكز الطبية. يسهل على المرضى حجز المواعيد والتعرف على الأطباء.',
      image: 'bg-cyan-100',
      features: ['حجز أونلاين', 'ملفات الأطباء', 'نصائح طبية', 'جولة افتراضية', 'تكامل خرائط جوجل'],
    },
    {
      id: '6',
      name: 'معرض أعمالي',
      category: 'portfolio',
      rating: 5.0,
      reviews: 32,
      type: 'free',
      description: 'اعرض أعمالك وإبداعاتك بطريقة بصرية مذهلة. مناسب للمصورين والمصممين والمستقلين.',
      image: 'bg-violet-100',
      features: ['معرض أعمال شبكي', 'سيرة ذاتية', 'مهارات وتقنيات', 'شهادات عملاء', 'تواصل سريع'],
    },
  ];

  const filteredTemplates = templates.filter(t => 
    (selectedCategory === 'all' || t.category === selectedCategory) &&
    t.name.includes(searchQuery)
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-black mb-1">القوالب الجاهزة 🎨</h1>
          <p className="text-slate-600 font-bold">اختر تصميماً وخصّصه بالذكاء الاصطناعي</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
             <div className="relative flex-1 md:w-64">
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="🔍 البحث..." 
                    className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-white border-[3px] border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all font-bold"
                />
            </div>
            <button className="px-4 py-2.5 bg-white border-[3px] border-black rounded-xl font-bold hover:bg-slate-50 transition-colors">
                 الأحدث ▼
            </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-6 py-3 rounded-xl font-black whitespace-nowrap border-[3px] transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#7C3AED] text-white border-black shadow-[4px_4px_0px_0px_#000]'
                : 'bg-white text-slate-600 border-slate-200 hover:border-black hover:text-black'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTemplates.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ y: -8 }}
            className="group bg-white border-[3px] border-black rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_#000] hover:shadow-[10px_10px_0px_0px_#000] transition-all duration-300"
          >
            {/* Screenshot Area */}
            <div className={`h-48 w-full ${template.image} relative border-b-[3px] border-black group-hover:bg-opacity-80 transition-all`}>
               {template.type !== 'free' && (
                   <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-lg border-2 border-white/50 text-xs font-black shadow-lg">
                       {template.type === 'pro' ? 'Pro 🔒' : 'Premium ⭐'}
                   </div>
               )}
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[2px]">
                   <Button size="sm" onClick={() => setSelectedTemplate(template)} className="shadow-lg">
                       <Eye size={16} className="mr-2" /> معاينة
                   </Button>
               </div>
            </div>

            {/* Content Area */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-black text-black">{template.name}</h3>
                    <div className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                        {categories.find(c => c.id === template.category)?.label}
                    </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1 text-yellow-500 font-black text-sm">
                        <Star size={16} fill="currentColor" /> {template.rating}
                        <span className="text-slate-400 font-bold text-xs">({template.reviews})</span>
                    </div>
                    <div className={`text-xs font-black px-2 py-0.5 rounded border-2 border-black ${
                        template.type === 'free' ? 'bg-green-300 text-black' : 
                        template.type === 'pro' ? 'bg-violet-300 text-black' : 'bg-orange-300 text-black'
                    }`}>
                        ◆ {template.type === 'free' ? 'مجاني' : template.type === 'pro' ? 'Pro' : 'Premium'}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button 
                        onClick={() => setSelectedTemplate(template)}
                        className="flex items-center justify-center py-2.5 rounded-xl border-[3px] border-black font-bold text-sm hover:bg-slate-50 transition-colors"
                    >
                        معاينة
                    </button>
                    {template.type === 'free' ? (
                        <button 
                             onClick={() => onNavigate('dashboard-new-project')}
                             className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-black text-white border-[3px] border-black font-bold text-sm hover:bg-slate-800 transition-colors group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]"
                        >
                            استخدام <ArrowRight size={16} />
                        </button>
                    ) : (
                        <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 text-slate-500 border-[3px] border-slate-300 font-bold text-sm cursor-not-allowed">
                            <Lock size={14} /> ترقية
                        </button>
                    )}
                </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedTemplate && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-12">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    onClick={() => setSelectedTemplate(null)}
                ></motion.div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative bg-white w-full max-w-6xl h-full max-h-[800px] rounded-3xl border-[4px] border-black shadow-[12px_12px_0px_0px_rgba(255,255,255,0.2)] flex flex-col overflow-hidden"
                >
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-4 border-b-[3px] border-black bg-slate-50">
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl font-black text-black">{selectedTemplate.name}</h2>
                            <div className="h-6 w-[2px] bg-slate-300"></div>
                            <div className="flex bg-white rounded-lg border-2 border-slate-300 p-1">
                                <button 
                                    onClick={() => setPreviewDevice('desktop')}
                                    className={`p-1.5 rounded ${previewDevice === 'desktop' ? 'bg-black text-white' : 'text-slate-400 hover:text-black'}`}
                                >
                                    <Monitor size={18} />
                                </button>
                                <button 
                                    onClick={() => setPreviewDevice('mobile')}
                                    className={`p-1.5 rounded ${previewDevice === 'mobile' ? 'bg-black text-white' : 'text-slate-400 hover:text-black'}`}
                                >
                                    <Smartphone size={18} />
                                </button>
                            </div>
                        </div>
                        <button 
                            onClick={() => setSelectedTemplate(null)}
                            className="p-2 bg-red-50 text-red-500 rounded-lg border-2 border-transparent hover:border-red-500 hover:bg-red-100 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Modal Content - Split Layout */}
                    <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                        
                        {/* Live Preview Area */}
                        <div className="flex-1 bg-[#222] relative flex items-center justify-center p-8 overflow-hidden">
                             {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                            
                            <motion.div 
                                layout
                                animate={{ 
                                    width: previewDevice === 'mobile' ? '375px' : '100%',
                                    height: previewDevice === 'mobile' ? '650px' : '100%',
                                    borderRadius: previewDevice === 'mobile' ? '32px' : '12px'
                                }}
                                className={`bg-white overflow-hidden shadow-2xl relative ${previewDevice === 'mobile' ? 'border-[8px] border-black' : 'border border-slate-700'}`}
                            >
                                {previewDevice === 'mobile' && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-xl z-20"></div>}
                                <div className="h-full w-full overflow-y-auto scrollbar-hide">
                                    <MockWebsite />
                                </div>
                            </motion.div>
                        </div>

                        {/* Info Panel */}
                        <div className="w-full lg:w-[400px] bg-white border-t-[3px] lg:border-t-0 lg:border-r-[3px] border-black p-8 overflow-y-auto">
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-2xl font-black text-black mb-2">{selectedTemplate.name}</h3>
                                    <p className="text-slate-600 font-medium leading-relaxed">
                                        {selectedTemplate.description}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-bold text-black mb-4">الميزات الرئيسية:</h4>
                                    <ul className="space-y-3">
                                        {selectedTemplate.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                                                <div className="w-5 h-5 rounded-full bg-green-100 border border-green-500 flex items-center justify-center text-green-700">
                                                    <Check size={12} strokeWidth={3} />
                                                </div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="p-4 bg-slate-50 border-2 border-slate-200 rounded-xl">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-slate-500">التقييم:</span>
                                        <div className="flex items-center gap-1 text-yellow-500 font-black">
                                            <Star size={16} fill="currentColor" /> {selectedTemplate.rating}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-slate-500">النوع:</span>
                                        <span className={`text-xs font-black px-2 py-0.5 rounded border border-black ${
                                            selectedTemplate.type === 'free' ? 'bg-green-300 text-black' : 
                                            selectedTemplate.type === 'pro' ? 'bg-violet-300 text-black' : 'bg-orange-300 text-black'
                                        }`}>
                                            {selectedTemplate.type === 'free' ? 'مجاني' : selectedTemplate.type === 'pro' ? 'Pro' : 'Premium'}
                                        </span>
                                    </div>
                                </div>

                                <Button 
                                    fullWidth 
                                    size="lg" 
                                    onClick={() => onNavigate('dashboard-new-project')}
                                    className="bg-[#7C3AED] border-black text-white hover:bg-[#6D28D9] shadow-[4px_4px_0px_0px_#000]"
                                >
                                    استخدام هذا القالب <ArrowRight size={18} className="mr-2" />
                                </Button>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TemplatesGallery;