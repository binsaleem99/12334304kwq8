import React, { useState } from 'react';
import { Search, Filter, Folder, Globe, FileText, Archive, MoreVertical, Eye, ExternalLink, LogIn, ArrowRightLeft, Trash2, LayoutTemplate } from 'lucide-react';

const AdminProjects: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock Stats
  const stats = [
    { label: 'Total Projects', value: '3,891', icon: Folder, color: 'text-[#3B82F6]', bg: 'bg-[#3B82F6]/10', border: 'border-[#3B82F6]/30' },
    { label: 'Published', value: '892', icon: Globe, color: 'text-[#22C55E]', bg: 'bg-[#22C55E]/10', border: 'border-[#22C55E]/30' },
    { label: 'Drafts', value: '2,999', icon: FileText, color: 'text-[#A0A0A0]', bg: 'bg-[#333333]', border: 'border-[#555555]' },
    { label: 'Archived', value: '45', icon: Archive, color: 'text-[#F97316]', bg: 'bg-[#F97316]/10', border: 'border-[#F97316]/30' },
  ];

  // Mock Projects Data
  const projects = [
    { id: '1', name: 'موقع المطعم البحري', user: 'محمد أحمد', status: 'published', visits: '1,234', lastModified: '2h ago', url: 'blue-sea.kwq8.com', type: 'restaurant' },
    { id: '2', name: 'صالون نورة', user: 'نورة سعد', status: 'draft', visits: '-', lastModified: '1d ago', url: 'noura-salon.kwq8.com', type: 'salon' },
    { id: '3', name: 'متجر الملابس', user: 'سارة علي', status: 'published', visits: '567', lastModified: '3h ago', url: 'fashion.kwq8.com', type: 'store' },
    { id: '4', name: 'شركة المقاولات', user: 'خالد محمد', status: 'archived', visits: '120', lastModified: '1mo ago', url: 'construction.kwq8.com', type: 'corporate' },
    { id: '5', name: 'عيادة الأسنان', user: 'د. فهد', status: 'published', visits: '2,100', lastModified: '5m ago', url: 'dental.kwq8.com', type: 'clinic' },
    { id: '6', name: 'بورتفوليو مصمم', user: 'أحمد سالم', status: 'draft', visits: '-', lastModified: '2d ago', url: 'design.kwq8.com', type: 'portfolio' },
  ];

  const filteredProjects = projects.filter(p => 
    (filterStatus === 'all' || p.status === filterStatus) &&
    (p.name.includes(searchQuery) || p.user.includes(searchQuery))
  );

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'published': return <span className="flex items-center gap-1.5 px-2 py-1 rounded text-xs font-bold bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/50"><Globe size={10} /> Published</span>;
      case 'draft': return <span className="flex items-center gap-1.5 px-2 py-1 rounded text-xs font-bold bg-[#666666]/20 text-[#A0A0A0] border border-[#666666]/50"><FileText size={10} /> Draft</span>;
      case 'archived': return <span className="flex items-center gap-1.5 px-2 py-1 rounded text-xs font-bold bg-[#F97316]/20 text-[#F97316] border border-[#F97316]/50"><Archive size={10} /> Archived</span>;
      default: return null;
    }
  };

  const getThumbnail = (type: string) => {
      // Simplified mock thumbnails based on type
      const colors: any = {
          restaurant: 'bg-blue-900',
          salon: 'bg-pink-900',
          store: 'bg-indigo-900',
          corporate: 'bg-slate-800',
          clinic: 'bg-cyan-900',
          portfolio: 'bg-violet-900'
      };
      return (
          <div className={`w-8 h-8 rounded flex items-center justify-center border border-white/10 ${colors[type] || 'bg-gray-800'}`}>
              <LayoutTemplate size={14} className="text-white/70" />
          </div>
      )
  };

  return (
    <div className="space-y-8 min-h-[calc(100vh-100px)]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold text-white mb-1">Projects Management</h1>
            <p className="text-[#A0A0A0] text-sm">Monitor and manage user websites.</p>
        </div>
        <div className="flex flex-wrap gap-3">
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="Search projects..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-[#1A1A1A] border border-[#333333] text-white pl-10 pr-4 py-2 rounded focus:outline-none focus:border-[#7C3AED] transition-colors w-64"
                />
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]" />
            </div>
            
            <div className="flex bg-[#1A1A1A] border border-[#333333] rounded overflow-hidden">
                <button 
                    onClick={() => setFilterStatus('all')}
                    className={`px-3 py-2 text-xs font-bold transition-colors ${filterStatus === 'all' ? 'bg-[#333] text-white' : 'text-[#666] hover:text-white'}`}
                >
                    All
                </button>
                <button 
                    onClick={() => setFilterStatus('published')}
                    className={`px-3 py-2 text-xs font-bold transition-colors ${filterStatus === 'published' ? 'bg-[#333] text-white' : 'text-[#666] hover:text-white'}`}
                >
                    Published
                </button>
                <button 
                    onClick={() => setFilterStatus('draft')}
                    className={`px-3 py-2 text-xs font-bold transition-colors ${filterStatus === 'draft' ? 'bg-[#333] text-white' : 'text-[#666] hover:text-white'}`}
                >
                    Drafts
                </button>
            </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
            <div key={idx} className={`p-4 rounded-lg border ${stat.bg} ${stat.border}`}>
                <div className="flex justify-between items-start mb-2">
                    <span className={`text-xs font-bold ${stat.color}`}>{stat.label}</span>
                    <stat.icon size={16} className={stat.color} />
                </div>
                <div className="text-2xl font-mono font-bold text-white">{stat.value}</div>
            </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-[#333333] bg-[#0A0A0A]">
                        <th className="p-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">Project</th>
                        <th className="p-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">User</th>
                        <th className="p-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">Status</th>
                        <th className="p-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">Visits</th>
                        <th className="p-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">Last Modified</th>
                        <th className="p-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProjects.map((project) => (
                        <tr key={project.id} className="border-b border-[#333333] hover:bg-[#2A2A2A] transition-colors">
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    {getThumbnail(project.type)}
                                    <div>
                                        <div className="font-bold text-white text-sm">{project.name}</div>
                                        <a href={`https://${project.url}`} className="text-xs text-[#666] hover:text-[#7C3AED] flex items-center gap-1">
                                            {project.url}
                                        </a>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-[#333] flex items-center justify-center text-[10px] text-white font-bold">
                                        {project.user.charAt(0)}
                                    </div>
                                    <span className="text-sm text-[#CCCCCC]">{project.user}</span>
                                </div>
                            </td>
                            <td className="p-4">{getStatusBadge(project.status)}</td>
                            <td className="p-4 font-mono text-sm text-white">{project.visits}</td>
                            <td className="p-4 text-xs font-bold text-[#666666]">{project.lastModified}</td>
                            <td className="p-4 text-right relative">
                                <button 
                                    onClick={() => setActiveMenu(activeMenu === project.id ? null : project.id)}
                                    className="p-1.5 text-[#666666] hover:text-white rounded hover:bg-[#333333] transition-colors"
                                >
                                    <MoreVertical size={16} />
                                </button>

                                {/* Dropdown Menu */}
                                {activeMenu === project.id && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)}></div>
                                        <div className="absolute right-8 top-8 w-48 bg-[#1A1A1A] border border-[#333333] rounded shadow-[0_4px_12px_rgba(0,0,0,0.5)] z-20 overflow-hidden">
                                            <button className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#2A2A2A] flex items-center gap-2">
                                                <Eye size={14} /> View Details
                                            </button>
                                            {project.status === 'published' && (
                                                <button className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#2A2A2A] flex items-center gap-2">
                                                    <ExternalLink size={14} /> Visit Site
                                                </button>
                                            )}
                                            <button className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#2A2A2A] flex items-center gap-2">
                                                <LogIn size={14} /> Log in as User
                                            </button>
                                            <button className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#2A2A2A] flex items-center gap-2">
                                                <ArrowRightLeft size={14} /> Transfer
                                            </button>
                                            <button className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#2A2A2A] flex items-center gap-2">
                                                <Archive size={14} /> Archive
                                            </button>
                                            <div className="h-px bg-[#333333]"></div>
                                            <button className="w-full text-left px-4 py-2 text-sm text-[#EF4444] hover:bg-[#2A2A2A] flex items-center gap-2">
                                                <Trash2 size={14} /> Delete
                                            </button>
                                        </div>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

    </div>
  );
};

export default AdminProjects;