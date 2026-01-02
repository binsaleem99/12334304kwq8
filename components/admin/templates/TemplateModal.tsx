import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Image, FileText, Save, Check } from 'lucide-react';

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  template?: any;
}

const TemplateModal: React.FC<TemplateModalProps> = ({ isOpen, onClose, template }) => {
  const [formData, setFormData] = useState({
    name: template?.name || '',
    category: template?.category || 'restaurant',
    access: template?.access || 'free',
    status: template?.status || 'active',
    description: template?.description || '',
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        ></motion.div>

        <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-[#1A1A1A] border border-[#333333] rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#333333] bg-[#0A0A0A]">
                <h2 className="text-xl font-bold text-white">
                    {template ? 'Edit Template' : 'Add New Template'}
                </h2>
                <button onClick={onClose} className="text-[#666] hover:text-white transition-colors">
                    <X size={24} />
                </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-6">
                
                {/* Basic Info */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-[#A0A0A0] uppercase mb-2">Template Name (Arabic)</label>
                        <input 
                            type="text" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-[#0A0A0A] border border-[#333333] rounded p-3 text-white focus:outline-none focus:border-[#7C3AED] transition-colors"
                            placeholder="e.g. مطعم عصري فاخر"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-[#A0A0A0] uppercase mb-2">Category</label>
                            <select 
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                                className="w-full bg-[#0A0A0A] border border-[#333333] rounded p-3 text-white focus:outline-none focus:border-[#7C3AED] transition-colors"
                            >
                                <option value="restaurant">Restaurant</option>
                                <option value="salon">Salon</option>
                                <option value="store">Store</option>
                                <option value="corporate">Corporate</option>
                                <option value="portfolio">Portfolio</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-[#A0A0A0] uppercase mb-2">Access Tier</label>
                            <select 
                                value={formData.access}
                                onChange={(e) => setFormData({...formData, access: e.target.value})}
                                className="w-full bg-[#0A0A0A] border border-[#333333] rounded p-3 text-white focus:outline-none focus:border-[#7C3AED] transition-colors"
                            >
                                <option value="free">Free</option>
                                <option value="pro">Pro</option>
                                <option value="premium">Premium</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-[#A0A0A0] uppercase mb-2">Description</label>
                        <textarea 
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="w-full bg-[#0A0A0A] border border-[#333333] rounded p-3 text-white focus:outline-none focus:border-[#7C3AED] transition-colors h-24 resize-none"
                            placeholder="Describe the template..."
                        />
                    </div>
                </div>

                {/* Uploads */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-[#A0A0A0] uppercase mb-2">Screenshots</label>
                        <div className="border-2 border-dashed border-[#333333] rounded-lg p-8 flex flex-col items-center justify-center text-[#666] hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors cursor-pointer bg-[#0A0A0A]">
                            <Image size={32} className="mb-2" />
                            <span className="text-sm font-bold">Drag & drop screenshots here</span>
                            <span className="text-xs mt-1">or click to browse</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-[#A0A0A0] uppercase mb-2">Template Files (ZIP)</label>
                        <div className="border-2 border-dashed border-[#333333] rounded-lg p-6 flex flex-col items-center justify-center text-[#666] hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors cursor-pointer bg-[#0A0A0A]">
                            <FileText size={24} className="mb-2" />
                            <span className="text-sm font-bold">Upload source code</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[#333333] bg-[#0A0A0A] flex justify-end gap-3">
                <button 
                    onClick={onClose}
                    className="px-6 py-2 text-white font-bold hover:bg-[#222] rounded transition-colors"
                >
                    Cancel
                </button>
                <button 
                    className="px-6 py-2 bg-[#7C3AED] text-white font-bold rounded hover:bg-[#6D28D9] transition-colors flex items-center gap-2"
                >
                    <Save size={18} /> Save Template
                </button>
            </div>
        </motion.div>
    </div>
  );
};

export default TemplateModal;