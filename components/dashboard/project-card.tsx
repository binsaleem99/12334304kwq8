"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { 
  MoreVertical, Eye, Edit, Trash2, Globe, Copy,
  Calendar, ExternalLink 
} from "lucide-react";
import Badge from "../ui/badge.tsx";
import { cn } from "../../lib/utils/cn.ts";

interface Project {
  id: string;
  name: string;
  industry: string;
  status: "draft" | "published" | "archived";
  thumbnail?: string;
  subdomain?: string;
  updatedAt: string;
}

interface ProjectCardProps {
  project: Project;
  onNavigate?: (view: any) => void;
  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
}

const statusLabels = {
  draft: { label: "مسودة", variant: "secondary" as const },
  published: { label: "منشور", variant: "success" as const },
  archived: { label: "مؤرشف", variant: "warning" as const },
};

/**
 * ProjectCard component for displaying project summary in the dashboard.
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onNavigate, onDelete, onDuplicate }) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-3 border-black shadow-brutal group hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm transition-all"
    >
      <div className="aspect-video bg-gradient-to-br from-surface-secondary to-white border-b-3 border-black relative overflow-hidden">
        {project.thumbnail ? (
          <img src={project.thumbnail} alt={project.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Globe className="h-12 w-12 text-content-muted" />
          </div>
        )}
        
        <div className="absolute top-3 right-3">
          <Badge variant={statusLabels[project.status].variant}>
            {statusLabels[project.status].label}
          </Badge>
        </div>

        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button 
            onClick={() => onNavigate?.('builder')}
            className="p-3 bg-white border-3 border-black hover:bg-brand-violet hover:text-white transition-colors"
          >
            <Edit className="h-5 w-5" />
          </button>
          <button 
            onClick={() => onNavigate?.('dashboard-preview')}
            className="p-3 bg-white border-3 border-black hover:bg-brand-violet hover:text-white transition-colors"
          >
            <Eye className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="p-4 text-right">
        <div className="flex items-start justify-between gap-2">
          <div className="relative" ref={menuRef}>
            <button onClick={() => setShowMenu(!showMenu)} className="p-2 hover:bg-surface-secondary transition-colors">
              <MoreVertical className="h-5 w-5" />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white border-3 border-black shadow-brutal z-20 overflow-hidden">
                <button onClick={() => onNavigate?.('builder')} className="w-full flex items-center justify-start gap-3 px-4 py-3 hover:bg-surface-secondary text-right font-bold">
                  <Edit className="h-4 w-4" /> تعديل
                </button>
                <button onClick={() => onNavigate?.('dashboard-preview')} className="w-full flex items-center justify-start gap-3 px-4 py-3 hover:bg-surface-secondary text-right font-bold">
                  <Eye className="h-4 w-4" /> معاينة
                </button>
                <button onClick={() => onDuplicate?.(project.id)} className="w-full flex items-center justify-start gap-3 px-4 py-3 hover:bg-surface-secondary text-right font-bold">
                  <Copy className="h-4 w-4" /> نسخ
                </button>
                <button onClick={() => onDelete?.(project.id)} className="w-full flex items-center justify-start gap-3 px-4 py-3 hover:bg-red-50 text-red-600 text-right font-bold">
                  <Trash2 className="h-4 w-4" /> حذف
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-black text-lg truncate">{project.name}</h3>
            <p className="text-sm text-content-secondary font-bold">{project.industry}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-border-light text-sm text-content-muted font-bold">
          <span>آخر تعديل: {project.updatedAt}</span>
          <Calendar className="h-4 w-4" />
        </div>
      </div>
    </motion.div>
  );
}
