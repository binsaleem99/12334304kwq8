"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Eye, Wand2, Scissors, UtensilsCrossed, 
  ShoppingBag, Briefcase, Sparkles, Layout,
  Smartphone, Monitor, X
} from "lucide-react";
import { Button, Badge, Modal } from "../../../components/ui/index.ts";
import { PageHeader } from "../../../components/dashboard/index.ts";
import { cn } from "../../../lib/utils/cn.ts";
import { ViewState } from "../../../types.ts";

interface TemplatesPageProps {
  onNavigate: (view: ViewState) => void;
}

const categories = [
  { id: "all", label: "الكل", icon: Layout },
  { id: "salon", label: "صالونات", icon: Scissors },
  { id: "restaurant", label: "مطعم", icon: UtensilsCrossed },
  { id: "store", label: "متاجر", icon: ShoppingBag },
  { id: "business", label: "أعمال", icon: Briefcase },
];

const templates = [
  {
    id: "1",
    name: "صالون أنيق",
    category: "salon",
    thumbnail: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80",
    isNew: true,
    isPremium: false,
    description: "تصميم عصري لمراكز التجميل يركز على الصور والخدمات."
  },
  {
    id: "2",
    name: "مطعم عصري",
    category: "restaurant",
    thumbnail: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
    isNew: false,
    isPremium: false,
    description: "واجهة جذابة للمطاعم مع ميزة تصفح قائمة الطعام."
  },
  {
    id: "3",
    name: "متجر أزياء",
    category: "store",
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
    isNew: true,
    isPremium: true,
    description: "متجر إلكتروني متكامل لعرض المنتجات بأسلوب احترافي."
  },
  {
    id: "4",
    name: "شركة استشارات",
    category: "business",
    thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    isNew: false,
    isPremium: false,
    description: "تصميم رسمي وجاد للشركات والمكاتب الاستشارية."
  },
  {
    id: "5",
    name: "صالون VIP",
    category: "salon",
    thumbnail: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&q=80",
    isNew: false,
    isPremium: true,
    description: "تصميم فاخر للصالونات الراقية مع نظام حجز متقدم."
  },
  {
    id: "6",
    name: "كافيه ديوان",
    category: "restaurant",
    thumbnail: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80",
    isNew: true,
    isPremium: false,
    description: "تصميم دافئ ومريح للكافيهات والمقاهي التقليدية."
  },
];

export default function TemplatesPage({ onNavigate }: TemplatesPageProps) {
  const [activeCategory, setActiveCategory] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [previewTemplate, setPreviewTemplate] = React.useState<typeof templates[0] | null>(null);
  const [previewDevice, setPreviewDevice] = React.useState<'desktop' | 'mobile'>('desktop');

  const filteredTemplates = templates.filter((t) => {
    if (activeCategory !== "all" && t.category !== activeCategory) return false;
    if (searchQuery && !t.name.includes(searchQuery)) return false;
    return true;
  });

  const handleUseTemplate = (id: string) => {
    // In a real app, this would pass the template ID state
    onNavigate('dashboard-new-project');
  };

  return (
    <div className="space-y-8" dir="rtl">
      <PageHeader
        title="مكتبة القوالب"
        description="اختر التصميم المثالي لمشروعك وابدأ البناء فوراً."
      />

      {/* Search & Filters */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-content-muted" />
          <input
            type="text"
            placeholder="ابحث عن اسم القالب..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border-3 border-black bg-white pr-12 pl-4 py-4 font-bold rounded-2xl focus:outline-none focus:border-brand-violet focus:shadow-brutal-sm transition-all"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-3 border-3 border-black font-black text-sm transition-all rounded-xl",
                activeCategory === cat.id
                  ? "bg-brand-violet text-white shadow-brutal translate-x-[2px] translate-y-[2px]"
                  : "bg-white hover:bg-surface-secondary hover:translate-x-[1px] hover:translate-y-[1px]"
              )}
            >
              <cat.icon className="h-4 w-4" />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group bg-white border-3 border-black shadow-brutal overflow-hidden rounded-[2rem] flex flex-col hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm transition-all"
          >
            {/* Thumbnail */}
            <div className="aspect-video bg-slate-100 border-b-3 border-black relative overflow-hidden">
              <img 
                src={template.thumbnail} 
                alt={template.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              
              {/* Badges */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                {template.isNew && (
                  <Badge variant="success" size="lg" className="shadow-brutal-sm">جديد</Badge>
                )}
                {template.isPremium && (
                  <Badge variant="gradient" size="lg" className="shadow-brutal-sm">مميز VIP</Badge>
                )}
              </div>

              {/* Hover Actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <Button 
                  variant="secondary" 
                  size="md" 
                  className="shadow-none border-2"
                  onClick={() => setPreviewTemplate(template)}
                >
                  <Eye className="h-4 w-4 ml-2" />
                  معاينة
                </Button>
              </div>
            </div>

            {/* Info */}
            <div className="p-6 flex-1 flex flex-col">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-black text-xl text-content-primary">{template.name}</h3>
                  <span className="text-[10px] font-black uppercase text-brand-violet bg-brand-violet/10 px-2 py-0.5 rounded border border-brand-violet/20">
                    {categories.find(c => c.id === template.category)?.label}
                  </span>
                </div>
                <p className="text-sm text-content-secondary font-bold leading-relaxed">
                  {template.description}
                </p>
              </div>
              
              <Button 
                variant="gradient" 
                className="w-full mt-auto h-12"
                onClick={() => handleUseTemplate(template.id)}
              >
                <Wand2 className="h-4 w-4 ml-2" />
                استخدم هذا القالب
              </Button>
            </div>
          </motion.div>
        ))}

        {/* AI Generator Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-brand-violet text-white border-3 border-black shadow-brutal p-8 rounded-[2rem] flex flex-col items-center justify-center text-center group relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-white/20" />
          <div className="w-20 h-20 bg-white/20 border-2 border-white/40 rounded-3xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-2xl font-black mb-3">لم تجد ما تبحث عنه؟</h3>
          <p className="font-bold opacity-90 mb-8">
            دع الذكاء الاصطناعي يبني لك قالباً مخصصاً تماماً لاحتياجاتك بضغطة زر.
          </p>
          <Button 
            variant="secondary" 
            size="lg" 
            className="w-full bg-white text-brand-violet border-white hover:bg-brand-lime hover:text-black"
            onClick={() => onNavigate('dashboard-new-project')}
          >
            جرب البناء بالذكاء الاصطناعي
          </Button>
        </motion.div>
      </div>

      {/* Preview Modal */}
      <Modal
        isOpen={!!previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        size="full"
        showCloseButton={true}
      >
        {previewTemplate && (
          <div className="flex flex-col h-[80vh]">
            <div className="flex items-center justify-between mb-6 bg-slate-50 p-4 border-2 border-black rounded-2xl">
              <div>
                <h2 className="text-2xl font-black">{previewTemplate.name}</h2>
                <p className="text-sm text-content-secondary font-bold">معاينة القالب الحيّة</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex bg-white border-2 border-black rounded-lg p-1">
                  <button 
                    onClick={() => setPreviewDevice('desktop')}
                    className={cn("p-1.5 rounded", previewDevice === 'desktop' ? "bg-brand-violet text-white" : "text-slate-400")}
                  >
                    <Monitor size={18} />
                  </button>
                  <button 
                    onClick={() => setPreviewDevice('mobile')}
                    className={cn("p-1.5 rounded", previewDevice === 'mobile' ? "bg-brand-violet text-white" : "text-slate-400")}
                  >
                    <Smartphone size={18} />
                  </button>
                </div>
                <Button variant="gradient" onClick={() => handleUseTemplate(previewTemplate.id)}>
                  ابدأ بهذا القالب
                </Button>
              </div>
            </div>

            <div className="flex-1 bg-slate-100 rounded-2xl border-3 border-black overflow-hidden flex justify-center p-4">
              <motion.div
                layout
                animate={{ width: previewDevice === 'desktop' ? '100%' : '375px' }}
                className="bg-white shadow-brutal h-full rounded-xl overflow-hidden relative"
              >
                {/* Mock Template Content */}
                <div className="h-full overflow-y-auto scrollbar-hide">
                  <img src={previewTemplate.thumbnail} className="w-full h-64 object-cover" />
                  <div className="p-8 space-y-6">
                    <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse" />
                    <div className="space-y-3">
                      <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
                      <div className="h-4 w-5/6 bg-slate-100 rounded animate-pulse" />
                      <div className="h-4 w-4/6 bg-slate-100 rounded animate-pulse" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-32 bg-slate-50 rounded-xl border-2 border-slate-200 border-dashed" />
                      <div className="h-32 bg-slate-50 rounded-xl border-2 border-slate-200 border-dashed" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}