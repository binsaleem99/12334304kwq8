"use client";

import * as React from "react";
import Link from "next/link";
import { 
  Search, Eye, Trash2, ExternalLink, Globe
} from "lucide-react";
// Fixed: Standardized casing for Button.tsx import
import Button from "../../../components/ui/Button.tsx";
import { Badge } from "../../../components/ui/badge.tsx";
import { AdminPageHeader, AdminTable } from "../../../components/admin/index.ts";
import { cn } from "../../../lib/utils/cn.ts";

const projects = [
  { id: "1", name: "صالون الجمال", owner: "أحمد محمد", status: "published", subdomain: "beauty-salon", views: 1250, createdAt: "2024-01-15" },
  { id: "2", name: "مطعم الديرة", owner: "فاطمة علي", status: "draft", subdomain: null, views: 0, createdAt: "2024-01-10" },
  { id: "3", name: "متجر الأزياء", owner: "محمد خالد", status: "published", subdomain: "fashion-store", views: 890, createdAt: "2024-01-05" },
  { id: "4", name: "عيادة الابتسامة", owner: "سارة أحمد", status: "draft", subdomain: null, views: 0, createdAt: "2024-01-01" },
];

const filters = [
  { value: "all", label: "الكل" },
  { value: "published", label: "منشور" },
  { value: "draft", label: "مسودة" },
];

export default function ProjectsManagementPage() {
  const [activeFilter, setActiveFilter] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredProjects = projects.filter((project) => {
    if (activeFilter !== "all" && project.status !== activeFilter) return false;
    if (searchQuery && !project.name.includes(searchQuery) && !project.owner.includes(searchQuery)) return false;
    return true;
  });

  const columns = [
    {
      key: "name",
      label: "المشروع",
      render: (project: typeof projects[0]) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-cyan/20 border border-brand-cyan flex items-center justify-center">
            <Globe className="h-5 w-5 text-brand-cyan" />
          </div>
          <div>
            <p className="font-medium text-white">{project.name}</p>
            {project.subdomain && (
              <p className="text-sm text-content-muted">{project.subdomain}.kwq8.com</p>
            )}
          </div>
        </div>
      ),
    },
    { key: "owner", label: "المالك" },
    {
      key: "status",
      label: "الحالة",
      render: (project: typeof projects[0]) => (
        <Badge variant={project.status === "published" ? "success" : "secondary"}>
          {project.status === "published" ? "منشور" : "مسودة"}
        </Badge>
      ),
    },
    {
      key: "views",
      label: "الزيارات",
      render: (project: typeof projects[0]) => (
        <span className="font-mono">{project.views.toLocaleString()}</span>
      ),
    },
    { key: "createdAt", label: "تاريخ الإنشاء" },
    {
      key: "actions",
      label: "",
      render: (project: typeof projects[0]) => (
        <div className="flex items-center gap-2">
          <button 
            className="p-2 text-content-muted hover:text-white hover:bg-white/10 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              // In a real app, route to detailed view
              console.log("Viewing project:", project.id);
            }}
          >
            <Eye className="h-4 w-4" />
          </button>
          {project.subdomain && (
            <a 
              href={`https://${project.subdomain}.kwq8.com`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-content-muted hover:text-white hover:bg-white/10 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
          <button 
            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              console.log("Deleting project:", project.id);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div dir="rtl">
      <AdminPageHeader
        title="إدارة المشاريع"
        description={`${projects.length} مشروع مسجل في النظام`}
      />

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-content-muted" />
          <input
            type="text"
            placeholder="بحث باسم المشروع أو المالك..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-darker border border-border-dark text-white pr-10 pl-4 py-3 focus:outline-none focus:border-brand-violet transition-all rounded-sm"
          />
        </div>

        {/* Status Filters */}
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

      {/* Projects Table */}
      <AdminTable 
        columns={columns} 
        data={filteredProjects} 
        onRowClick={(project) => console.log("Row clicked:", project.id)}
      />
    </div>
  );
}