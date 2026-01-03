"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils/cn.ts";

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface AdminTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
}

export function AdminTable<T extends { id: string }>({ 
  columns, 
  data, 
  onRowClick 
}: AdminTableProps<T>) {
  return (
    <div className="bg-surface-darker border border-border-dark overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface-dark border-b border-border-dark">
            <tr>
              {columns.map((col) => (
                <th 
                  key={String(col.key)} 
                  className="text-right p-4 font-bold text-content-muted text-sm"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr 
                key={item.id}
                onClick={() => onRowClick?.(item)}
                className={cn(
                  "border-b border-border-dark transition-colors",
                  onRowClick && "cursor-pointer hover:bg-white/5"
                )}
              >
                {columns.map((col) => (
                  <td key={String(col.key)} className="p-4 text-white">
                    {col.render 
                      ? col.render(item) 
                      : String(item[col.key as keyof T] ?? "-")
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 border-t border-border-dark">
        <span className="text-sm text-content-muted">
          عرض 1-10 من {data.length}
        </span>
        <div className="flex items-center gap-2">
          <button className="p-2 text-content-muted hover:text-white hover:bg-white/5 transition-colors">
            <ChevronRight className="h-4 w-4" />
          </button>
          <button className="p-2 text-content-muted hover:text-white hover:bg-white/5 transition-colors">
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
