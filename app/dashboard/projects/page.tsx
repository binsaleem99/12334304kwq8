"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Plus, Search, Grid, List, FolderOpen 
} from "lucide-react";
// Fixed: Standardized casing for Button.tsx import
import Button from "../../../components/ui/Button.tsx";
import { PageHeader, ProjectCard, EmptyState } from "../../../components/dashboard/index.ts";
import { cn } from "../../../lib/utils/cn.ts";
import { createClient } from "../../../lib/supabase/client.ts";
import { Project } from "../../../types/index.ts";

const filters = [
  { value: "all", label: "الكل" },
  { value: "published", label: "منشور" },
  { value: "draft", label: "مسودة" },
];

export default function ProjectsListPage() {
  const router = useRouter();
  const supabase = createClient();
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [activeFilter, setActiveFilter] = React.useState("all");
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    const fetchProjects = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      let query = supabase.from('projects').select('*').eq('user_id', user.id);
      if (activeFilter !== 'all') {
        query = query.eq('status', activeFilter);
      }
      
      const { data } = await query.order('updated_at', { ascending: false });
      if (data) {
        setProjects(data.map(p => ({
          id: p.id,
          name: p.name,
          industry: p.industry || 'عام',
          status: p.status,
          updatedAt: new Date(p.updated_at).toLocaleDateString('ar-KW'),
          thumbnail: p.thumbnail_url,
          subdomain: p.subdomain
        })));
      }
      setLoading(false);
    };
    fetchProjects();
  }, [activeFilter, supabase]);

  const filteredProjects = projects.filter((project) => {
    if (searchQuery && !project.name.includes(searchQuery)) return false;
    return true;
  });

  return (
    <div dir="rtl">
      <PageHeader
        title="مشاريعي"
        description={`${projects.length} مشروع متاح`}
      >
        <Button variant="gradient" size="md" onClick={() => router.push('/dashboard/projects/new')}>
          <Plus className="h-5 w-5 ms-2" />
          مشروع جديد
        </Button>
      </PageHeader>

      <div className="flex flex-col lg:flex-row gap-4 mb-8">
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

          <div className="flex items-center border-3 border-black bg-white rounded-xl overflow-hidden shadow-brutal-sm">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-3 transition-colors border-l-3 border-black",
                viewMode === "grid" ? "bg-brand-violet text-white" : "hover:bg-surface-secondary"
              )}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-3 transition-colors",
                viewMode === "list" ? "bg-brand-violet text-white" : "hover:bg-surface-secondary"
              )}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="p-20 text-center font-black">جاري تحميل المشاريع...</div>
      ) : filteredProjects.length > 0 ? (
        <div className={cn(
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            : "space-y-4"
        )}>
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project}
              onNavigate={(v) => router.push(`/dashboard/projects/${project.id}/${v === 'builder' ? 'builder' : 'preview'}`)}
            />
          ))}
        </div>
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
              if (searchQuery) setSearchQuery("");
              else router.push('/dashboard/projects/new');
            }}
          />
        </div>
      )}
    </div>
  );
}