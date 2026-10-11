import Link from "next/link";
import { PenLine, FileText, Wallet } from "lucide-react";

export function QuickActions() {
  return (
    <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3 mb-6 sm:mb-8">
      <Link
        href="/journal/new"
        className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-full border text-xs sm:text-sm font-medium transition-colors hover:bg-accent/5 text-center"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
          color: "var(--color-text-primary)",
        }}
      >
        <PenLine size={14} style={{ color: "var(--color-text-muted)" }} />
        <span>+ Journal</span>
      </Link>
      
      <Link
        href="/notes/new"
        className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-full border text-xs sm:text-sm font-medium transition-colors hover:bg-accent/5 text-center"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
          color: "var(--color-text-primary)",
        }}
      >
        <FileText size={14} style={{ color: "var(--color-text-muted)" }} />
        <span>+ Note</span>
      </Link>
      
      <Link
        href="/finance/new"
        className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-full border text-xs sm:text-sm font-medium transition-colors hover:bg-accent/5 text-center"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
          color: "var(--color-text-primary)",
        }}
      >
        <Wallet size={14} style={{ color: "var(--color-text-muted)" }} />
        <span>+ Expense</span>
      </Link>
    </div>
  );
}
