import Link from "next/link";
import { PenLine, FileText, Wallet } from "lucide-react";

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-3 mb-10">
      <Link
        href="/journal/new"
        className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors hover:bg-accent/5"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
          color: "var(--color-text-primary)",
        }}
      >
        <PenLine size={14} style={{ color: "var(--color-text-muted)" }} />
        + Journal
      </Link>
      
      <Link
        href="/notes/new"
        className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors hover:bg-accent/5"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
          color: "var(--color-text-primary)",
        }}
      >
        <FileText size={14} style={{ color: "var(--color-text-muted)" }} />
        + Note
      </Link>
      
      <Link
        href="/finance/new"
        className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors hover:bg-accent/5"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
          color: "var(--color-text-primary)",
        }}
      >
        <Wallet size={14} style={{ color: "var(--color-text-muted)" }} />
        + Expense
      </Link>
    </div>
  );
}
