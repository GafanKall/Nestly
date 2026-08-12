import Link from "next/link";
import Image from "next/image";
import { formatDate, truncate } from "@/lib/utils/format";
import { MOOD_OPTIONS } from "@/lib/constants";
import type { JournalEntry } from "@/types/database";

export function JournalCard({ journal }: { journal: JournalEntry }) {
  const mood = MOOD_OPTIONS.find((m) => m.value === journal.mood);

  return (
    <Link
      href={`/journal/${journal.id}`}
      className="card card-hover flex flex-col h-full gap-3"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3
            className="font-semibold text-lg leading-tight mb-1"
            style={{ color: "var(--color-text-primary)" }}
          >
            {journal.title}
          </h3>
          <p
            className="text-xs font-medium"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {formatDate(journal.entry_date)}
          </p>
        </div>
        {mood && (
          <div className="flex-shrink-0" title={mood.label}>
            <Image
              src={mood.iconUrl}
              alt={mood.label}
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
        )}
      </div>

      <p
        className="text-sm line-clamp-3 leading-relaxed flex-1"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {truncate(journal.content, 150)}
      </p>

      {journal.tags && journal.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {journal.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
