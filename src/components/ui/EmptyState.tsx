import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center p-8 border border-dashed rounded-2xl", className)} style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "var(--color-background)", color: "var(--color-text-secondary)" }}>
        {icon}
      </div>
      <h3 className="text-base font-medium mb-1" style={{ color: "var(--color-text-primary)" }}>{title}</h3>
      <p className="text-sm max-w-sm mb-6" style={{ color: "var(--color-text-secondary)" }}>{description}</p>
      
      {action && (
        <Link
          href={action.href}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
          style={{ backgroundColor: "var(--color-accent-light)", color: "var(--color-accent)" }}
        >
          <Plus size={16} />
          {action.label}
        </Link>
      )}
    </div>
  );
}
