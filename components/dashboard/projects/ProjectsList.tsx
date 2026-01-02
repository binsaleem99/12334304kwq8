import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, LayoutGrid, List, MoreVertical, Edit2, ExternalLink, Copy, Trash2, Settings } from 'lucide-react';
import { ViewState } from '../../../types';
import Button from '../../ui/Button';

interface ProjectsListProps {
  onNavigate: (view: ViewState) => void;
}

const ProjectsList: React.FC<ProjectsListProps> = ({ onNavigate }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState('all');

  const projects = [
    { id: '1', name: 'موقع المطعم البحري', status: 'draft', lastEdited: 'منذ ساعتين', thumbnailColor: 'bg-blue-100' },
    { id: '2', name: 'متجر العطور الفاخرة', status: 'published', lastEdited: 'أمس', thumbnailColor: 'bg-pink-100' },
    { id: '3', name: 'صالون الجمال', status: 'draft', lastEdited: 'منذ 3 أيام', thumbnailColor: 'bg-purple-100' },
    { id: '4', name: 'شركة المقاولات', status: 'draft', lastEdited: 'منذ أسبوع', thumbnailColor: 'bg-yellow-100' },
    { id: '5', name: 'مدونة شخصية', status: 'published', lastEdited: 'منذ شهر', thumbnailColor: 'bg-green-100' },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.status === filter);

  return (
    <div className="space-y-8">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-black text-black mb-1">مشاريعي 📁</h1>
                <p className="text-slate-600 font-bold">إدارة جميع مواقعك ومسوداتك</p>
            </div>
            <Button onClick={() => onNavigate('dashboard-new-project')} className="bg-[#7C3AED] text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Plus className="ml-2 w-5 h-5" /> مشروع جديد
            </Button>
        </div>

        {/* Filters Bar */}
        <div className="bg-white border-[3px] border-black rounded-xl p-2 flex flex-col md:flex-row gap-4 items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                {['all', 'draft', 'published'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-all border-[3px] ${
                            filter === f 
                            ? 'bg-black text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]' 
                            : 'bg-white text-slate-500 border-transparent hover:bg-slate-100 hover:border-black'
                        }`}
                    >
                        {f === 'all' ? 'جميع المشاريع' : f === 'draft' ? 'المسودات' : 'المنشورة'}
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                    <input 
                        type="text" 
                        placeholder="بحث في المشاريع..." 
                        className="w-full pl-4 pr-10 py-2 rounded-lg bg-slate-50 border-[3px] border-slate-200 focus:border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] focus:bg-white transition-all font-bold"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                </div>
                <div className="flex border-[3px] border-slate-200 rounded-lg p-1 bg-slate-50">
                    <button 
                        onClick={() => setViewMode('grid')}
                        className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm text-black border-2 border-black' : 'text-slate-400 border-2 border-transparent'}`}
                    >
                        <LayoutGrid size={18} />
                    </button>
                    <button 
                         onClick={() => setViewMode('list')}
                         className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-sm text-black border-2 border-black' : 'text-slate-400 border-2 border-transparent'}`}
                    >
                        <List size={18} />
                    </button>
                </div>
            </div>
        </div>

        {/* Projects Grid/List */}
        {filteredProjects.length > 0 ? (
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredProjects.map((project) => (
                    <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ y: -4, boxShadow: "6px 6px 0px 0px #000" }}
                        className={`bg-white border-[3px] border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_#000] transition-all group flex ${viewMode === 'list' ? 'flex-row items-center p-4 gap-6' : 'flex-col'}`}
                    >
                        {/* Thumbnail */}
                        <div className={`relative overflow-hidden border-b-[3px] border-black group-hover:bg-opacity-90 transition-colors ${viewMode === 'list' ? 'w-32 h-20 rounded-lg border-[3px] border-black' : 'h-48 w-full'}`}>
                            <div className={`absolute inset-0 ${project.thumbnailColor}`}></div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 backdrop-blur-[2px]">
                                <Button size="sm" onClick={() => onNavigate('builder')}>
                                    تعديل
                                </Button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className={`flex-1 ${viewMode === 'grid' ? 'p-5' : ''}`}>
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="text-xl font-black text-black mb-1">{project.name}</h3>
                                    <div className="text-xs font-bold text-slate-500">آخر تعديل: {project.lastEdited}</div>
                                </div>
                                {viewMode === 'grid' && (
                                    <button 
                                        onClick={() => onNavigate('dashboard-settings')}
                                        className="text-slate-400 hover:text-black p-1 rounded hover:bg-slate-100"
                                        title="الإعدادات"
                                    >
                                        <Settings size={20} />
                                    </button>
                                )}
                            </div>
                            
                            <div className="flex items-center gap-2 mt-4">
                                <span className={`text-xs font-black px-2 py-1 rounded border-2 border-black/10 ${
                                    project.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                                }`}>
                                    {project.status === 'published' ? '● منشور' : '● مسودة'}
                                </span>
                            </div>

                            {viewMode === 'grid' && (
                                <div className="grid grid-cols-2 gap-2 mt-6 pt-4 border-t-[3px] border-slate-100">
                                    <button onClick={() => onNavigate('builder')} className="flex items-center justify-center gap-2 py-2 rounded-lg bg-black text-white font-bold text-sm hover:bg-slate-800 transition-colors border-2 border-black">
                                        <Edit2 size={14} /> تعديل
                                    </button>
                                    <button className="flex items-center justify-center gap-2 py-2 rounded-lg border-2 border-black text-black font-bold text-sm hover:bg-slate-50 transition-colors">
                                        {project.status === 'published' ? <ExternalLink size={14} /> : <Copy size={14} />} 
                                        {project.status === 'published' ? 'زيارة' : 'نسخ'}
                                    </button>
                                </div>
                            )}
                        </div>

                         {viewMode === 'list' && (
                            <div className="flex items-center gap-3">
                                 <button onClick={() => onNavigate('builder')} className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-black text-white font-bold text-sm hover:bg-slate-800 transition-colors border-2 border-black">
                                    <Edit2 size={14} /> تعديل
                                </button>
                                <button 
                                    onClick={() => onNavigate('dashboard-settings')}
                                    className="p-2 text-slate-400 hover:text-black hover:bg-slate-100 rounded-lg transition-colors border-2 border-transparent hover:border-black"
                                    title="الإعدادات"
                                >
                                    <Settings size={20} />
                                </button>
                                <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border-2 border-transparent hover:border-black">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        ) : (
            // Empty State
            <div className="bg-white border-[3px] border-black rounded-2xl p-16 text-center shadow-[4px_4px_0px_0px_#000]">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 border-[3px] border-black border-dashed">
                    <Plus size={40} className="text-slate-400" />
                </div>
                <h2 className="text-2xl font-black text-black mb-2">لا توجد مشاريع بعد</h2>
                <p className="text-slate-600 font-bold mb-8">ابدأ ببناء موقعك الأول الآن بضغطة زر!</p>
                <div className="flex justify-center gap-4">
                     <Button onClick={() => onNavigate('dashboard-new-project')} className="bg-[#7C3AED] text-white border-black">
                        <Plus className="ml-2 w-5 h-5" /> ابدأ مشروع جديد
                    </Button>
                    <Button variant="secondary">
                        استعرض القوالب
                    </Button>
                </div>
            </div>
        )}
    </div>
  );
};

export default ProjectsList;