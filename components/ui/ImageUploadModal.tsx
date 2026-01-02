import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Image as ImageIcon, Sparkles, Search, Check } from 'lucide-react';
import Button from './Button';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'library' | 'ai'>('upload');
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Mock Library Images
  const libraryImages = [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80',
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&q=80',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80',
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80',
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80',
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white border-[3px] border-black rounded-2xl w-full max-w-3xl shadow-[8px_8px_0px_0px_#000] overflow-hidden flex flex-col max-h-[85vh]"
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-[3px] border-black bg-slate-50">
          <h2 className="text-2xl font-black text-black">اختيار صورة</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-black">
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b-[3px] border-black bg-white">
          <button 
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-4 font-black text-sm flex items-center justify-center gap-2 transition-colors ${activeTab === 'upload' ? 'bg-[#7C3AED] text-white' : 'hover:bg-slate-50 text-black'}`}
          >
            <Upload size={18} /> رفع صورة
          </button>
          <button 
            onClick={() => setActiveTab('library')}
            className={`flex-1 py-4 font-black text-sm flex items-center justify-center gap-2 transition-colors border-r-[3px] border-l-[3px] border-black ${activeTab === 'library' ? 'bg-[#7C3AED] text-white' : 'hover:bg-slate-50 text-black'}`}
          >
            <ImageIcon size={18} /> المكتبة
          </button>
          <button 
            onClick={() => setActiveTab('ai')}
            className={`flex-1 py-4 font-black text-sm flex items-center justify-center gap-2 transition-colors ${activeTab === 'ai' ? 'bg-[#7C3AED] text-white' : 'hover:bg-slate-50 text-black'}`}
          >
            <Sparkles size={18} /> توليد AI
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
          
          {/* Upload Tab */}
          {activeTab === 'upload' && (
            <div 
              className={`h-full border-[3px] border-dashed rounded-xl flex flex-col items-center justify-center p-12 transition-all ${dragActive ? 'border-[#7C3AED] bg-violet-50' : 'border-slate-300 bg-white'}`}
              onDragEnter={() => setDragActive(true)}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => { e.preventDefault(); setDragActive(false); }}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 border-[3px] border-black shadow-[4px_4px_0px_0px_#000]">
                <Upload size={32} className="text-black" />
              </div>
              <h3 className="text-xl font-black text-black mb-2">اسحب وأفلت الصورة هنا</h3>
              <p className="text-slate-500 font-bold mb-6">أو اضغط للتصفح من جهازك</p>
              <Button variant="primary" onClick={() => {}}>
                اختر ملفاً
              </Button>
              <p className="text-xs font-bold text-slate-400 mt-4">يدعم JPG, PNG, WEBP (حد أقصى 5MB)</p>
            </div>
          )}

          {/* Library Tab */}
          {activeTab === 'library' && (
            <div className="space-y-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="بحث في المكتبة..." 
                  className="w-full pl-4 pr-10 py-3 rounded-xl border-[3px] border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] font-bold"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {libraryImages.map((src, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setSelectedImage(src)}
                    className={`aspect-square rounded-xl border-[3px] overflow-hidden cursor-pointer relative group transition-all ${selectedImage === src ? 'border-[#7C3AED] shadow-[4px_4px_0px_0px_#7C3AED]' : 'border-black hover:shadow-[4px_4px_0px_0px_#000]'}`}
                  >
                    <img src={src} alt="Library asset" className="w-full h-full object-cover" />
                    {selectedImage === src && (
                      <div className="absolute inset-0 bg-[#7C3AED]/20 flex items-center justify-center">
                        <div className="w-8 h-8 bg-[#7C3AED] rounded-full flex items-center justify-center text-white border-2 border-white">
                          <Check size={16} strokeWidth={4} />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Tab */}
          {activeTab === 'ai' && (
            <div className="h-full flex flex-col">
              <div className="bg-white border-[3px] border-black rounded-xl p-4 mb-6 shadow-[4px_4px_0px_0px_#000]">
                <label className="block text-sm font-black text-black mb-2">وصف الصورة</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="مثال: طبق سمك مشوي على طاولة خشبية..."
                    className="flex-1 px-4 py-2 rounded-lg border-2 border-slate-200 focus:border-[#7C3AED] focus:outline-none font-bold"
                  />
                  <Button variant="secondary" size="sm">
                    <Sparkles size={16} className="ml-1" /> توليد
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 flex items-center justify-center text-slate-400 font-bold border-2 border-dashed border-slate-300 rounded-xl">
                الصور المولدة ستظهر هنا
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t-[3px] border-black bg-white flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>إلغاء</Button>
          <Button 
            variant="primary" 
            disabled={!selectedImage && activeTab !== 'upload'}
            onClick={() => selectedImage && onSelect(selectedImage)}
          >
            اختيار الصورة
          </Button>
        </div>

      </motion.div>
    </div>
  );
};

export default ImageUploadModal;