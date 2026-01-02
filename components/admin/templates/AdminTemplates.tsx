import React, { useState } from 'react';
import { Search, Filter, Plus, Star, MoreVertical, Eye, BarChart3, Edit, Trash2, LayoutTemplate, Download } from 'lucide-react';
import TemplateModal from './TemplateModal';

const AdminTemplates: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);

  const templates = [
    { 
        id: '1', 
        name: 'قالب المطعم العصري', 
        category: 'restaurant', 
        access: 'free', 
        status: 'active', 
        rating: 4.8, 
        reviews: 124, 
        usage: 234, 
        image: 'bg-orange-900' 
    },
    { 
        id: '2', 
        name: 'صالون التجميل الفاخر', 
        category: 'salon', 
        access: 'pro', 
        status: 'active', 
        rating: 4.9, 
        reviews: 89, 
        usage: 156, 
        image: 'bg-pink-900' 
    },
    { 
        id: '3', 
        name: 'المتجر الإلكتروني الشامل', 
        category: 'store', 
        access: 'premium', 
        status: 'active', 
        rating: 4.7, 
        reviews: 210, 
        usage: 543, 
        image: 'bg-blue-900' 
    },
    { 
        id: '4', 
        name: 'بورتفوليو المصور', 
        category: 'portfolio', 
        access: 'free', 
        status: 'inactive', 
        rating: 4.5, 
        reviews: 45, 
        usage: 89, 
        image: 'bg-violet-900' 
    },
    { 
        id: '5', 
        name: 'الشركة الهندسية', 
        category: 'corporate', 
        access: 'pro', 
        status: 'active', 
        rating: 4.6, 
        reviews: 67, 
        usage: 112, 
        image: 'bg-slate-800' 
    },
  ];

  const filteredTemplates = templates.filter(t => 
    (filterCategory === 'all' || t.category === filterCategory) &&
    t.name.includes(searchQuery)
  );

  const getAccessBadge = (access: string) => {
    switch(access) {
      case 'premium': return <span className="px-2 py-0.5 rounded text-[10px] font-black bg-[#F97316]/20 text-[#F97316] border border-[#F97316]/50 uppercase">Premium</span>;
      case 'pro': return <span className="px-2 py-0.5 rounded text-[10px] font-black bg-[#7C3AED]/20 text-[#7C3AED] border border-[#7C3AED]/50 uppercase">Pro</span>;
      default: return <span className="px-2 py-0.5 rounded text-[10px] font-black bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/50 uppercase">Free</span>;
    }
  };

  const openAddModal = () => {
      setEditingTemplate(null);
      setIsModalOpen(true);
  }

  const openEditModal = (template: any) => {
      setEditingTemplate(template);
      setIsModalOpen(true);
      setActiveMenu(null);
  }

  return (
    <div className="space-y-8 relative min-h-[calc(100vh-100px)]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold text-white mb-1">Templates Management</h1>
            <p className="text-[#A0A0A0] text-sm">Manage website templates, categories, and access.</p>
        </div>
        <div className="flex flex-wrap gap-3">
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="Search templates..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-[#1A1A1A] border border-[#333333] text-white pl-10 pr-4 py-2 rounded focus:outline-none focus:border-[#7C3AED] transition-colors w-64"
                />
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]" />
            </div>
            
            <div className="flex bg-[#1A1A1A] border border-[#333333] rounded overflow-hidden">
                <button 
                    onClick={() => setFilterCategory('all')}
                    className={`px-3 py-2 text-xs font-bold transition-colors ${filterCategory === 'all' ? 'bg-[#333] text-white' : 'text-[#666] hover:text-white'}`}
                >
                    All
                </button>
                <button 
                    onClick={() => setFilterCategory('restaurant')}
                    className={`px-3 py-2 text-xs font-bold transition-colors ${filterCategory === 'restaurant' ? 'bg-[#333] text-white' : 'text-[#666] hover:text-white'}`}
                >
                    Restaurants
                </button>
                <button 
                    onClick={() => setFilterCategory('store')}
                    className={`px-3 py-2 text-xs font-bold transition-colors ${filterCategory === 'store' ? 'bg-[#333] text-white' : 'text-[#666] hover:text-white'}`}
                >
                    Stores
                </button>
            </div>
            
            <button 
                onClick={openAddModal}
                className="flex items-center gap-2 px-4 py-2 bg-[#7C3AED] text-white font-bold rounded hover:bg-[#6D28D9] transition-colors"
            >
                <Plus size={18} /> Add Template
            </button>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
            <div key={template.id} className="bg-[#1A1A1A] border border-[#333333] rounded-lg overflow-hidden hover:border-[#555] transition-colors group">
                
                {/* Screenshot Placeholder */}
                <div className={`h-48 w-full ${template.image} relative flex items-center justify-center`}>
                    <LayoutTemplate size={48} className="text-white/20" />
                    {template.status === 'inactive' && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-[#A0A0A0] font-bold border border-[#A0A0A0] px-3 py-1 rounded">Inactive</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-white text-lg">{template.name}</h3>
                        <button 
                            onClick={() => setActiveMenu(activeMenu === template.id ? null : template.id)}
                            className="text-[#666] hover:text-white p-1 rounded hover:bg-[#333] relative"
                        >
                            <MoreVertical size={18} />
                            {activeMenu === template.id && (
                                <div className="absolute right-0 top-8 w-40 bg-[#1A1A1A] border border-[#333] rounded shadow-xl z-20 overflow-hidden text-left">
                                    <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setActiveMenu(null); }}></div>
                                    <div className="relative z-20">
                                        <button onClick={() => openEditModal(template)} className="w-full px-4 py-2 text-sm text-white hover:bg-[#2A2A2A] flex items-center gap-2">
                                            <Edit size={14} /> Edit
                                        </button>
                                        <button className="w-full px-4 py-2 text-sm text-white hover:bg-[#2A2A2A] flex items-center gap-2">
                                            <Download size={14} /> Download
                                        </button>
                                        <div className="h-px bg-[#333]"></div>
                                        <button className="w-full px-4 py-2 text-sm text-[#EF4444] hover:bg-[#2A2A2A] flex items-center gap-2">
                                            <Trash2 size={14} /> Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </button>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-bold text-[#A0A0A0] mb-4">
                        <span className="flex items-center gap-1 text-[#FACC15]"><Star size={14} fill="currentColor" /> {template.rating} ({template.reviews})</span>
                        <span className="w-px h-3 bg-[#333]"></span>
                        <span>🔄 Used {template.usage} times</span>
                    </div>

                    <div className="h-px bg-[#333] w-full mb-4"></div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#A0A0A0] bg-[#333] px-2 py-0.5 rounded capitalize">{template.category}</span>
                            {getAccessBadge(template.access)}
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => openEditModal(template)} className="p-2 text-[#A0A0A0] hover:text-white hover:bg-[#333] rounded transition-colors" title="Edit">
                                <Edit size={16} />
                            </button>
                            <button className="p-2 text-[#A0A0A0] hover:text-white hover:bg-[#333] rounded transition-colors" title="Preview">
                                <Eye size={16} />
                            </button>
                            <button className="p-2 text-[#A0A0A0] hover:text-white hover:bg-[#333] rounded transition-colors" title="Stats">
                                <BarChart3 size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ))}
      </div>

      <TemplateModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        template={editingTemplate} 
      />

    </div>
  );
};

export default AdminTemplates;