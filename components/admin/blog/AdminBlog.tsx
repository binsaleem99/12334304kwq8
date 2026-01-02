import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Eye, Trash2, Calendar, FileText } from 'lucide-react';
import BlogEditor from './BlogEditor';

const AdminBlog: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPost, setSelectedPost] = useState<any>(null);

  // Mock Posts Data
  const posts = [
    { id: '1', title: 'كيف تبني موقعك في 5 دقائق', author: 'فريق KWQ8', status: 'published', views: '1,234', date: '20/12/2025', category: 'Tutorials' },
    { id: '2', title: 'أفضل 10 قوالب للمطاعم في الكويت', author: 'سارة علي', status: 'published', views: '892', date: '18/12/2025', category: 'Design' },
    { id: '3', title: 'دليل SEO للمبتدئين', author: 'أحمد سالم', status: 'draft', views: '-', date: '15/12/2025', category: 'Marketing' },
    { id: '4', title: 'تحديثات جديدة في المنصة', author: 'Admin', status: 'scheduled', views: '-', date: '25/12/2025', category: 'News' },
  ];

  const filteredPosts = posts.filter(post => 
    (filterStatus === 'all' || post.status === filterStatus) &&
    post.title.includes(searchQuery)
  );

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'published': return <span className="px-2 py-1 rounded text-xs font-bold bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/50">Published</span>;
      case 'draft': return <span className="px-2 py-1 rounded text-xs font-bold bg-[#FACC15]/20 text-[#FACC15] border border-[#FACC15]/50">Draft</span>;
      case 'scheduled': return <span className="px-2 py-1 rounded text-xs font-bold bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/50">Scheduled</span>;
      default: return null;
    }
  };

  const handleEdit = (post: any) => {
      setSelectedPost(post);
      setIsEditing(true);
  };

  const handleNew = () => {
      setSelectedPost(null);
      setIsEditing(true);
  };

  const handleBack = () => {
      setIsEditing(false);
      setSelectedPost(null);
  };

  if (isEditing) {
      return <BlogEditor post={selectedPost} onBack={handleBack} />;
  }

  return (
    <div className="space-y-8 min-h-[calc(100vh-100px)]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold text-white mb-1">Blog Management</h1>
            <p className="text-[#A0A0A0] text-sm">Create, edit, and manage blog posts.</p>
        </div>
        <div className="flex flex-wrap gap-3">
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="Search posts..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-[#1A1A1A] border border-[#333333] text-white pl-10 pr-4 py-2 rounded focus:outline-none focus:border-[#7C3AED] transition-colors w-64"
                />
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]" />
            </div>
            
            <div className="flex bg-[#1A1A1A] border border-[#333333] rounded overflow-hidden">
                <button onClick={() => setFilterStatus('all')} className={`px-3 py-2 text-xs font-bold transition-colors ${filterStatus === 'all' ? 'bg-[#333] text-white' : 'text-[#666] hover:text-white'}`}>All</button>
                <button onClick={() => setFilterStatus('published')} className={`px-3 py-2 text-xs font-bold transition-colors ${filterStatus === 'published' ? 'bg-[#333] text-white' : 'text-[#666] hover:text-white'}`}>Published</button>
                <button onClick={() => setFilterStatus('draft')} className={`px-3 py-2 text-xs font-bold transition-colors ${filterStatus === 'draft' ? 'bg-[#333] text-white' : 'text-[#666] hover:text-white'}`}>Drafts</button>
            </div>
            
            <button 
                onClick={handleNew}
                className="flex items-center gap-2 px-4 py-2 bg-[#7C3AED] text-white font-bold rounded hover:bg-[#6D28D9] transition-colors"
            >
                <Plus size={18} /> New Post
            </button>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-[#333333] bg-[#0A0A0A]">
                        <th className="p-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">Title</th>
                        <th className="p-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">Author</th>
                        <th className="p-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">Category</th>
                        <th className="p-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">Status</th>
                        <th className="p-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">Views</th>
                        <th className="p-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider text-right">Date</th>
                        <th className="p-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPosts.map((post) => (
                        <tr key={post.id} className="border-b border-[#333333] hover:bg-[#2A2A2A] transition-colors group">
                            <td className="p-4">
                                <div className="font-bold text-white flex items-center gap-2">
                                    <FileText size={16} className="text-[#666]" />
                                    {post.title}
                                </div>
                            </td>
                            <td className="p-4 text-sm text-[#CCCCCC]">{post.author}</td>
                            <td className="p-4">
                                <span className="bg-[#333] text-[#A0A0A0] px-2 py-1 rounded text-xs font-bold border border-[#555]">
                                    {post.category}
                                </span>
                            </td>
                            <td className="p-4">{getStatusBadge(post.status)}</td>
                            <td className="p-4 font-mono text-sm text-[#A0A0A0]">{post.views}</td>
                            <td className="p-4 text-right text-[#666] font-mono text-sm">{post.date}</td>
                            <td className="p-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <button 
                                        onClick={() => handleEdit(post)}
                                        className="p-1.5 text-[#666] hover:text-white hover:bg-[#333] rounded transition-colors" 
                                        title="Edit"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button className="p-1.5 text-[#666] hover:text-white hover:bg-[#333] rounded transition-colors" title="View">
                                        <Eye size={16} />
                                    </button>
                                    <button className="p-1.5 text-[#666] hover:text-red-500 hover:bg-[#333] rounded transition-colors" title="Delete">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
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

export default AdminBlog;