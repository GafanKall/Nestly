import Link from "next/link";
import { formatDate, truncate } from "@/lib/utils/format";
import type { Note } from "@/types/database";

export function NoteCard({ note }: { note: Note }) {
  return (
    <Link
      href={`/notes/${note.id}`}
      className="card card-hover flex flex-col h-full gap-3"
    >
      <div className="flex items-start justify-between">
        <h3
          className="font-semibold text-lg leading-tight mb-1"
          style={{ color: "var(--color-text-primary)" }}
        >
          {note.title}
        </h3>
        <p
          className="text-xs font-medium whitespace-nowrap ml-2"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {formatDate(note.updated_at)}
        </p>
      </div>

      <p
        className="text-sm line-clamp-4 leading-relaxed flex-1"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {truncate(note.content, 200)}
      </p>

      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2 pt-3 border-t" style={{ borderColor: "var(--color-border)" }}>
          {note.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
