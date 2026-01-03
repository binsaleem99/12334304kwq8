"use client";

import * as React from "react";
import { 
  Plus, Search, FileText, Eye, Edit, Trash2,
} from "lucide-react";
// Fix: Standardized import casing to lowercase
import Button from "../../../components/ui/button.tsx";
import { Badge } from "../../../components/ui/badge.tsx";
import { AdminPageHeader, AdminTable } from "../../../components/admin/index.ts";
import { cn } from "../../../lib/utils/cn.ts";
import { ViewState } from "../../../types.ts";

interface BlogManagementPageProps {
  onNavigate?: (view: ViewState) => void;
}

const posts = [
  { id: "1", title: "كيف تبني موقعك الأول بالذكاء الاصطناعي", status: "published", views: 450, author: "فريق KWQ8", publishedAt: "2024-01-15" },
  { id: "2", title: "5 نصائح لتحسين تجربة مستخدمي موقعك", status: "published", views: 320, author: "فريق KWQ8", publishedAt: "2024-01-10" },
  { id: "3", title: "دليل المبتدئين لبناء المتاجر الإلكترونية", status: "draft", views: 0, author: "فريق KWQ8", publishedAt: null },
  { id: "4", title: "أفضل ممارسات تصميم صفحات الهبوط", status: "draft", views: 0, author: "فريق KWQ8", publishedAt: null },
];

const filters = [
  { value: "all", label: "الكل" },
  { value: "published", label: "منشور" },
  { value: "draft", label: "مسودة" },
];

export default function BlogManagementPage({ onNavigate }: BlogManagementPageProps) {
  const [activeFilter, setActiveFilter] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredPosts = posts.filter((post) => {
    if (activeFilter !== "all" && post.status !== activeFilter) return false;
    if (searchQuery && !post.title.includes(searchQuery)) return false;
    return true;
  });

  const columns = [
    {
      key: "title",
      label: "العنوان",
      render: (post: typeof posts[0]) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-pink/20 border border-brand-pink flex items-center justify-center">
            <FileText className="h-5 w-5 text-brand-pink" />
          </div>
          <div>
            <p className="font-medium text-white">{post.title}</p>
            <p className="text-sm text-content-muted">{post.author}</p>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      label: "الحالة",
      render: (post: typeof posts[0]) => (
        <Badge variant={post.status === "published" ? "success" : "secondary"}>
          {post.status === "published" ? "منشور" : "مسودة"}
        </Badge>
      ),
    },
    {
      key: "views",
      label: "المشاهدات",
      render: (post: typeof posts[0]) => <span className="font-mono">{post.views.toLocaleString()}</span>,
    },
    {
      key: "publishedAt",
      label: "تاريخ النشر",
      render: (post: typeof posts[0]) => <span className="font-mono">{post.publishedAt || "—"}</span>,
    },
    {
      key: "actions",
      label: "",
      render: (post: typeof posts[0]) => (
        <div className="flex items-center gap-2">
          <button className="p-2 text-content-muted hover:text-white hover:bg-white/10 transition-colors">
            <Eye className="h-4 w-4" />
          </button>
          <button 
            className="p-2 text-content-muted hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => onNavigate?.('admin-blog' as any)} // For editing
          >
            <Edit className="h-4 w-4" />
          </button>
          <button className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div dir="rtl">
      <AdminPageHeader
        title="إدارة المدونة"
        description={`${posts.length} مقال مسجل في النظام`}
      >
        <Button variant="gradient" onClick={() => onNavigate?.('admin-blog' as any)}>
          <Plus className="h-4 w-4 ml-2" />
          مقال جديد
        </Button>
      </AdminPageHeader>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-content-muted" />
          <input
            type="text"
            placeholder="بحث بالعنوان..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-darker border border-border-dark text-white pr-10 pl-4 py-3 focus:outline-none focus:border-brand-violet transition-all rounded-sm"
          />
        </div>

        <div className="flex items-center bg-surface-darker border border-border-dark rounded-sm overflow-hidden">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                "px-6 py-3 font-bold transition-colors border-l last:border-l-0 border-border-dark",
                activeFilter === filter.value
                  ? "bg-brand-violet text-white"
                  : "text-content-muted hover:text-white"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <AdminTable columns={columns} data={filteredPosts} />
    </div>
  );
}