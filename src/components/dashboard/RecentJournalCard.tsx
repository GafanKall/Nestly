import Link from "next/link";
import Image from "next/image";
import { Book } from "lucide-react";
import type { JournalEntry } from "@/types/database";
import { formatDate, truncate } from "@/lib/utils/format";
import { MOOD_OPTIONS } from "@/lib/constants";

export function RecentJournalCard({ journal }: { journal: JournalEntry | null }) {
  const mood = journal?.mood ? MOOD_OPTIONS.find((m) => m.value === journal.mood) : null;

  return (
    <div className="card flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Book size={16} style={{ color: "var(--color-accent)" }} />
          <h3 className="font-semibold" style={{ color: "var(--color-text-primary)" }}>
            Recent Journal
          </h3>
        </div>
        <Link
          href="/journal"
          className="text-xs font-medium transition-colors hover:underline"
          style={{ color: "var(--color-text-muted)" }}
        >
          View All
        </Link>
      </div>

      {journal ? (
        <Link
          href={`/journal/${journal.id}`}
          className="flex-1 block p-4 rounded-lg border transition-colors hover:bg-accent/5 group"
          style={{
            backgroundColor: "var(--color-background)",
            borderColor: "transparent",
          }}
        >
          <div className="flex items-start justify-between mb-2">
            <span
              className="text-xs font-medium"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {formatDate(journal.entry_date)}
            </span>
            {mood && (
              <span className="flex-shrink-0" title={mood.label}>
                <Image
                  src={mood.iconUrl}
                  alt={mood.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </span>
            )}
          </div>
          <h4
            className="font-medium mb-1 group-hover:text-accent transition-colors"
            style={{ color: "var(--color-text-primary)" }}
          >
            {journal.title}
          </h4>
          <p
            className="text-sm line-clamp-3 leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {truncate(journal.content, 120)}
          </p>
        </Link>
      ) : (
        <div
          className="flex-1 flex flex-col items-center justify-center p-4 rounded-lg border border-dashed"
          style={{
            backgroundColor: "var(--color-background)",
            borderColor: "var(--color-border)",
          }}
        >
          <p className="text-sm text-center" style={{ color: "var(--color-text-secondary)" }}>
            No journal entries yet.
          </p>
          <Link
            href="/journal/new"
            className="text-sm font-medium mt-2 hover:underline"
            style={{ color: "var(--color-accent)" }}
          >
            Write your first entry
          </Link>
        </div>
      )}
    </div>
  );
}
