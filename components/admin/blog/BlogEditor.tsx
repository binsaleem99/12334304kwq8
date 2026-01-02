import React, { useState } from 'react';
import { ArrowLeft, Image, Save, Eye, Send, Bold, Italic, List, Link as LinkIcon, Hash, Calendar, User, Search, X } from 'lucide-react';

interface BlogEditorProps {
  post?: any;
  onBack: () => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ post, onBack }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [content, setContent] = useState(post?.content || '');
  const [category, setCategory] = useState(post?.category || 'tech');
  const [tags, setTags] = useState<string[]>(post?.tags || []);
  const [tagInput, setTagInput] = useState('');

  // Generate slug from title automatically if not manually set
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!post) {
      setSlug(newTitle.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header Actions */}
      <div className="flex justify-between items-center bg-[#1A1A1A] border border-[#333] p-4 rounded-lg sticky top-16 z-20 shadow-lg">
        <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-[#333] rounded-lg text-[#A0A0A0] hover:text-white transition-colors">
                <ArrowLeft size={20} />
            </button>
            <h2 className="text-lg font-bold text-white">
                {post ? 'Edit Post' : 'New Blog Post'}
            </h2>
        </div>
        <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#333] text-white text-sm font-bold rounded hover:bg-[#444] transition-colors">
                <Save size={16} /> Save Draft
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#333] text-white text-sm font-bold rounded hover:bg-[#444] transition-colors">
                <Eye size={16} /> Preview
            </button>
            <button className="flex items-center gap-2 px-6 py-2 bg-[#7C3AED] text-white text-sm font-bold rounded hover:bg-[#6D28D9] transition-colors">
                <Send size={16} /> Publish
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Editor (Left) */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Title & Slug */}
            <div className="bg-[#1A1A1A] border border-[#333] rounded-lg p-6 space-y-4">
                <input 
                    type="text" 
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Post Title"
                    className="w-full bg-transparent text-3xl font-black text-white placeholder:text-[#333] border-none focus:outline-none"
                />
                <div className="flex items-center gap-2 text-sm text-[#666]">
                    <span className="font-bold">Slug:</span>
                    <input 
                        type="text" 
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="bg-[#0A0A0A] border border-[#333] rounded px-2 py-1 text-[#A0A0A0] text-xs font-mono flex-1 focus:border-[#7C3AED] focus:outline-none transition-colors"
                    />
                </div>
            </div>

            {/* Rich Text Editor Mock */}
            <div className="bg-[#1A1A1A] border border-[#333] rounded-lg overflow-hidden min-h-[500px] flex flex-col">
                {/* Toolbar */}
                <div className="flex items-center gap-1 p-2 border-b border-[#333] bg-[#222]">
                    <button className="p-2 text-[#A0A0A0] hover:text-white hover:bg-[#333] rounded"><Bold size={18} /></button>
                    <button className="p-2 text-[#A0A0A0] hover:text-white hover:bg-[#333] rounded"><Italic size={18} /></button>
                    <div className="w-px h-6 bg-[#444] mx-1"></div>
                    <button className="p-2 text-[#A0A0A0] hover:text-white hover:bg-[#333] rounded flex items-center gap-1 text-sm font-bold"><Hash size={18} /> H1</button>
                    <button className="p-2 text-[#A0A0A0] hover:text-white hover:bg-[#333] rounded flex items-center gap-1 text-sm font-bold"><Hash size={16} /> H2</button>
                    <div className="w-px h-6 bg-[#444] mx-1"></div>
                    <button className="p-2 text-[#A0A0A0] hover:text-white hover:bg-[#333] rounded"><List size={18} /></button>
                    <button className="p-2 text-[#A0A0A0] hover:text-white hover:bg-[#333] rounded"><LinkIcon size={18} /></button>
                    <button className="p-2 text-[#A0A0A0] hover:text-white hover:bg-[#333] rounded"><Image size={18} /></button>
                </div>
                {/* Text Area */}
                <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="flex-1 w-full bg-[#1A1A1A] text-white p-6 resize-none focus:outline-none leading-relaxed text-lg"
                    placeholder="Write your amazing content here..."
                ></textarea>
            </div>

        </div>

        {/* Sidebar Settings (Right) */}
        <div className="space-y-6">
            
            {/* Featured Image */}
            <div className="bg-[#1A1A1A] border border-[#333] rounded-lg p-4">
                <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Featured Image</h3>
                <div className="border-2 border-dashed border-[#333] rounded-lg h-40 flex flex-col items-center justify-center text-[#666] hover:border-[#7C3AED] hover:text-[#7C3AED] transition-all cursor-pointer bg-[#0A0A0A]">
                    <Image size={32} className="mb-2" />
                    <span className="text-xs font-bold">Upload Image</span>
                </div>
            </div>

            {/* Meta Data */}
            <div className="bg-[#1A1A1A] border border-[#333] rounded-lg p-4 space-y-6">
                
                {/* Author */}
                <div>
                    <label className="text-xs font-bold text-[#666] uppercase mb-2 block">Author</label>
                    <div className="relative">
                        <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" />
                        <select className="w-full bg-[#0A0A0A] border border-[#333] rounded-lg pl-10 pr-4 py-2 text-white text-sm focus:border-[#7C3AED] focus:outline-none appearance-none">
                            <option>Team KWQ8</option>
                            <option>Sarah Ali</option>
                            <option>Ahmed Salem</option>
                        </select>
                    </div>
                </div>

                {/* Publish Date */}
                <div>
                    <label className="text-xs font-bold text-[#666] uppercase mb-2 block">Publish Date</label>
                    <div className="relative">
                        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" />
                        <input 
                            type="date"
                            className="w-full bg-[#0A0A0A] border border-[#333] rounded-lg pl-10 pr-4 py-2 text-white text-sm focus:border-[#7C3AED] focus:outline-none"
                        />
                    </div>
                </div>

                {/* Category */}
                <div>
                    <label className="text-xs font-bold text-[#666] uppercase mb-2 block">Category</label>
                    <select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-[#0A0A0A] border border-[#333] rounded-lg px-4 py-2 text-white text-sm focus:border-[#7C3AED] focus:outline-none"
                    >
                        <option value="tech">Technology</option>
                        <option value="design">Design</option>
                        <option value="business">Business</option>
                        <option value="tutorials">Tutorials</option>
                    </select>
                </div>

                {/* Tags */}
                <div>
                    <label className="text-xs font-bold text-[#666] uppercase mb-2 block">Tags</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {tags.map(tag => (
                            <span key={tag} className="bg-[#333] text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                                {tag}
                                <button onClick={() => removeTag(tag)} className="hover:text-red-400"><X size={12} /></button>
                            </span>
                        ))}
                    </div>
                    <input 
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleAddTag}
                        placeholder="Add tags..."
                        className="w-full bg-[#0A0A0A] border border-[#333] rounded-lg px-4 py-2 text-white text-sm focus:border-[#7C3AED] focus:outline-none"
                    />
                </div>

            </div>

            {/* SEO Section */}
            <div className="bg-[#1A1A1A] border border-[#333] rounded-lg p-4">
                <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                    <Search size={16} /> SEO Settings
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-[#666] mb-1 block">Meta Title</label>
                        <input type="text" className="w-full bg-[#0A0A0A] border border-[#333] rounded px-3 py-2 text-white text-sm focus:border-[#7C3AED] focus:outline-none" placeholder={title} />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-[#666] mb-1 block">Meta Description</label>
                        <textarea className="w-full bg-[#0A0A0A] border border-[#333] rounded px-3 py-2 text-white text-sm focus:border-[#7C3AED] focus:outline-none resize-none h-24" placeholder="Brief description for search engines..."></textarea>
                    </div>
                </div>
            </div>

        </div>

      </div>
    </div>
  );
};

export default BlogEditor;