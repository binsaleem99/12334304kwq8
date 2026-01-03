import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, Lock, Eye, ArrowRight, X, Smartphone, Monitor, Check } from 'lucide-react';
import { ViewState } from '../../../types';
// Standardized casing for button import
import Button from '../../ui/button.tsx';
import MockWebsite from '../../website/MockWebsite';

interface Template {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  type: 'free' | 'pro' | 'premium';
  description: string;
  image: string;
  features: string[];
}

interface TemplatesGalleryProps {
  onNavigate: (view: ViewState) => void;
}

const TemplatesGallery: React.FC<TemplatesGalleryProps> = ({ onNavigate }) => {
  // Fix: Ensure useState is used correctly
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  // Fix: Corrected syntax error (removed duplicate setPreviewDevice and bracket)
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'restaurant', label: '🍔 مطاعم' },
    { id: 'salon', label: '💇 صالونات' },
    { id: 'store', label: '🛒 متاجر' },
    { id: 'corporate', label: '🏢 شركات' },
    { id: 'portfolio', label: '👨‍💻 بورتفوليو' },
  ];

  const templates: Template[] = [
    {
      id: '1',
      name: 'مطعم عصري',
      category: 'restaurant',
      rating: 4.8,
      reviews: 124,
      type: 'free',
      description: 'تصميم أنيق لمطاعم الوجبات السريعة والكافيهات.',
      image: 'bg-orange-100',
      features: ['قائمة طعام تفاعلية', 'نظام حجز', 'معرض صور'],
    },
    {
      id: '2',
      name: 'صالون أنيق',
      category: 'salon',
      rating: 4.9,
      reviews: 89,
      type: 'free',
      description: 'واجهة هادئة لمراكز التجميل.',
      image: 'bg-pink-100',
      features: ['حجز مواعيد', 'قائمة خدمات'],
    }
  ];

  const filteredTemplates = templates.filter(t => 
    (selectedCategory === 'all' || t.category === selectedCategory) &&
    t.name.includes(searchQuery)
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-black mb-1">معرض القوالب 🎨</h1>
        <p className="text-slate-600 font-bold">اختر من بين تشكيلة واسعة من التصميمات الاحترافية</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 border-[3px] border-black rounded-xl shadow-neo-sm">
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap border-2 transition-all ${
                selectedCategory === cat.id ? 'bg-black text-white border-black' : 'bg-white text-slate-500 border-transparent hover:border-black'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-64">
          <input 
            type="text" 
            placeholder="بحث..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-2 rounded-lg border-2 border-slate-200 focus:border-black outline-none font-bold"
          />
          <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTemplates.map(template => (
          <motion.div
            key={template.id}
            whileHover={{ y: -5 }}
            className="bg-white border-[3px] border-black rounded-2xl overflow-hidden shadow-neo group"
          >
            <div className={`h-48 ${template.image} border-b-[3px] border-black relative`}>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[2px]">
                 <div className="flex gap-2">
                    <Button size="sm" variant="secondary" onClick={() => setSelectedTemplate(template)}>
                        معاينة
                    </Button>
                    <Button size="sm" onClick={() => onNavigate('builder')}>
                        استخدام
                    </Button>
                 </div>
              </div>
            </div>
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-black text-black">{template.name}</h3>
                    <div className="flex items-center gap-1 text-[#FACC15] font-bold text-sm">
                        <Star size={14} fill="currentColor" /> {template.rating}
                    </div>
                </div>
                <p className="text-slate-500 text-sm font-bold mb-6">{template.description}</p>
                <div className="flex flex-wrap gap-2">
                    {template.features.slice(0, 2).map((feat, i) => (
                        <span key={i} className="text-[10px] font-black px-2 py-1 bg-slate-100 rounded-lg border border-slate-200 uppercase">
                            {feat}
                        </span>
                    ))}
                    {template.features.length > 2 && (
                        <span className="text-[10px] font-black px-2 py-1 bg-slate-100 rounded-lg border border-slate-200 uppercase">
                            +{template.features.length - 2} ميزات
                        </span>
                    )}
                </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Template Preview Modal */}
      <AnimatePresence>
        {selectedTemplate && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedTemplate(null)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white border-[4px] border-black rounded-3xl w-full max-w-6xl h-full shadow-neo-lg overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-slate-50 border-b-[3px] border-black p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button onClick={() => setSelectedTemplate(null)} className="p-2 hover:bg-slate-200 rounded-xl transition-colors border-2 border-transparent hover:border-black">
                    <X size={24} />
                  </button>
                  <div>
                    <h2 className="text-2xl font-black text-black">{selectedTemplate.name}</h2>
                    <p className="text-xs font-bold text-slate-500">{selectedTemplate.category} • {selectedTemplate.reviews} مراجعة</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="hidden md:flex bg-white border-2 border-black rounded-lg p-1">
                    <button onClick={() => setPreviewDevice('desktop')} className={`p-1.5 rounded ${previewDevice === 'desktop' ? 'bg-black text-white' : 'text-slate-400'}`}><Monitor size={18} /></button>
                    <button onClick={() => setPreviewDevice('mobile')} className={`p-1.5 rounded ${previewDevice === 'mobile' ? 'bg-black text-white' : 'text-slate-400'}`}><Smartphone size={18} /></button>
                  </div>
                  <Button variant="default" onClick={() => onNavigate('builder')}>
                    استخدم هذا القالب
                  </Button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 bg-slate-100 p-4 md:p-8 overflow-hidden">
                <div className="h-full w-full flex items-center justify-center">
                    <motion.div 
                      layout
                      className={`bg-white border-[3px] border-black shadow-neo-sm rounded-xl overflow-hidden transition-all duration-500 ${previewDevice === 'mobile' ? 'w-[375px] h-[667px]' : 'w-full h-full'}`}
                    >
                        <div className="w-full h-full overflow-y-auto scrollbar-hide">
                            <MockWebsite />
                        </div>
                    </motion.div>
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