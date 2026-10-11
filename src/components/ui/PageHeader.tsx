import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    href: string;
  };
  className?: string;
}

export function PageHeader({ title, subtitle, action, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8", className)}>
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight" style={{ color: "var(--color-text-primary)" }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs sm:text-sm mt-0.5 sm:mt-1" style={{ color: "var(--color-text-secondary)" }}>
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all w-full sm:w-auto shrink-0"
          style={{ backgroundColor: "var(--color-accent)", color: "white" }}
        >
          <Plus size={16} />
          {action.label}
        </Link>
      )}
    </div>
  );
}
