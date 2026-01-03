"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Plus, Search, Grid, List, FolderOpen 
} from "lucide-react";
// Fix: Standardized import casing to lowercase
import Button from "../../../components/ui/button.tsx";
import Badge from "../../../components/ui/badge.tsx";
import { PageHeader, ProjectCard, EmptyState } from "../../../components/dashboard/index.ts";
import { cn } from "../../../lib/utils/cn.ts";

// Mock data reflecting GCC market niches
const mockProjects = [
  {
    id: "1",
    name: "صالون الجمال",
    industry: "صالونات",
    status: "published" as const,
    subdomain: "beauty-salon",
    updatedAt: "منذ ساعتين",
  },
  {
    id: "2",
    name: "مطعم الديرة",
    industry: "مطاعم",
    status: "draft" as const,
    updatedAt: "منذ يوم",
  },
  {
    id: "3",
    name: "متجر الأزياء",
    industry: "متاجر",
    status: "published" as const,
    subdomain: "fashion-store",
    updatedAt: "منذ 3 أيام",
  },
  {
    id: "4",
    name: "عيادة الابتسامة",
    industry: "عيادات",
    status: "draft" as const,
    updatedAt: "منذ أسبوع",
  },
];

const filters = [
  { value: "all", label: "الكل" },
  { value: "published", label: "منشور" },
  { value: "draft", label: "مسودة" },
  { value: "archived", label: "مؤرشف" },
];

export default function ProjectsListPage() {
  const [activeFilter, setActiveFilter] = React.useState("all");
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredProjects = mockProjects.filter((project) => {
    if (activeFilter !== "all" && project.status !== activeFilter) return false;
    if (searchQuery && !project.name.includes(searchQuery)) return false;
    return true;
  });

  return (
    <div dir="rtl">
      <PageHeader
        title="مشاريعي"
        description={`${mockProjects.length} مشروع متاح`}
      >
        <Link href="/dashboard/projects/new">
          <Button variant="gradient" size="md">
            <Plus className="h-5 w-5 ms-2" />
            مشروع جديد
          </Button>
        </Link>
      </PageHeader>

      {/* Filters & Search Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row gap-4 mb-8"
      >
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-content-muted" />
          <input
            type="text"
            placeholder="ابحث عن مشروع..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border-3 border-black bg-white pr-12 pl-4 py-3 font-bold focus:outline-none focus:border-brand-violet focus:shadow-brutal-sm transition-all rounded-xl"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Filter Tabs */}
          <div className="flex items-center border-3 border-black bg-white rounded-xl overflow-hidden shadow-brutal-sm">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={cn(
                  "px-5 py-3 font-black text-sm transition-colors border-l-3 last:border-l-0 border-black",
                  activeFilter === filter.value
                    ? "bg-brand-violet text-white"
                    : "hover:bg-surface-secondary text-content-primary"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center border-3 border-black bg-white rounded-xl overflow-hidden shadow-brutal-sm">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-3 transition-colors border-l-3 border-black",
                viewMode === "grid" ? "bg-brand-violet text-white" : "hover:bg-surface-secondary"
              )}
              title="عرض الشبكة"
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-3 transition-colors",
                viewMode === "list" ? "bg-brand-violet text-white" : "hover:bg-surface-secondary"
              )}
              title="عرض القائمة"
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Results Section */}
      {filteredProjects.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={cn(
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-4"
          )}
        >
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project}
              onNavigate={(view) => window.location.hash = `#${view}`}
            />
          ))}
        </motion.div>
      ) : (
        <div className="bg-white border-3 border-black shadow-brutal rounded-[2rem] overflow-hidden">
          <EmptyState
            icon={FolderOpen}
            title={searchQuery ? "لم نجد أي نتائج" : "لا توجد مشاريع"}
            description={
              searchQuery
                ? `عذراً، لم نجد أي مشروع يطابق "${searchQuery}"`
                : "لم تقم بإنشاء أي مشاريع بعد. ابدأ الآن وحول فكرتك إلى واقع!"
            }
            actionLabel={!searchQuery ? "ابدأ مشروعك الأول" : "مسح البحث"}
            onAction={() => {
              if (searchQuery) {
                setSearchQuery("");
                setActiveFilter("all");
              } else {
                window.location.hash = "#dashboard-new-project";
              }
            }}
          />
        </div>
      )}
    </div>
  );
}