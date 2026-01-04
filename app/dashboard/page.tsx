
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { 
  FolderOpen, Globe, Coins, Plus, Rocket, Sparkles
} from "lucide-react";
import Button from "../../components/ui/Button.tsx";
import GradientText from "../../components/ui/GradientText.tsx";
import { StatsCard, ProjectCard, EmptyState } from "../../components/dashboard/index.ts";
import { Project } from "../../types.ts";
import { cn } from "../../lib/utils/cn.ts";
import { createClient } from "../../lib/supabase/client.ts";

export default function DashboardPage() {
  const supabase = createClient();
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [profile, setProfile] = React.useState({ name: '...', credits: 0, published: 0 });

  React.useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [projectsRes, profileRes] = await Promise.all([
        supabase.from('projects')
          .select('*')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false })
          .limit(4),
        supabase.from('profiles')
          .select('full_name, credits_remaining')
          .eq('id', user.id)
          .single()
      ]);

      if (projectsRes.data) {
        setProjects(projectsRes.data.map((p: any) => ({
          id: p.id,
          name: p.name,
          industry: p.industry || 'عام',
          status: p.status,
          updatedAt: new Date(p.updated_at).toLocaleDateString('ar-KW'),
          thumbnail: p.thumbnail_url
        })));
      }

      if (profileRes.data) {
        setProfile({
          name: profileRes.data.full_name || user.email?.split('@')[0] || 'أهلاً',
          credits: profileRes.data.credits_remaining || 0,
          published: projectsRes.data?.filter((p: any) => p.status === 'published').length || 0
        });
      }

      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-20 text-center font-black">جاري التحميل...</div>;

  return (
    <div className="space-y-10 pb-20" dir="rtl">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-4xl md:text-5xl font-black mb-2">
            مرحباً، <GradientText>{profile.name}</GradientText> 👋
          </h1>
          <p className="text-xl text-content-secondary font-bold">
            لديك <span className="text-brand-violet font-black underline">{projects.length} مشاريع</span> جاهزة.
          </p>
        </motion.div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
           <StatsCard title="المشاريع" value={projects.length} icon={FolderOpen} color="violet" />
           <StatsCard title="المنشورة" value={profile.published} icon={Globe} color="cyan" />
           <StatsCard title="الرصيد" value={profile.credits} icon={Coins} color="lime" />
        </div>

        <div className="lg:col-span-3 space-y-8">
          <h2 className="text-2xl font-black">أحدث المشاريع</h2>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project as any} />
              ))}
            </div>
          ) : (
            <EmptyState 
              icon={FolderOpen} 
              title="لا توجد مشاريع" 
              description="ابدأ الآن وحول فكرتك إلى واقع!" 
              actionLabel="ابدأ مشروعك الأول" 
            />
          )}
        </div>
      </div>
    </div>
  );
}
