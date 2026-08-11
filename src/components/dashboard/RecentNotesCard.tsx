import Link from "next/link";
import { FileText } from "lucide-react";
import type { Note } from "@/types/database";
import { truncate } from "@/lib/utils/format";

export function RecentNotesCard({ notes }: { notes: Note[] }) {
  return (
    <div className="card flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText size={16} style={{ color: "var(--color-accent)" }} />
          <h3 className="font-semibold" style={{ color: "var(--color-text-primary)" }}>
            Recent Notes
          </h3>
        </div>
        <Link
          href="/notes"
          className="text-xs font-medium transition-colors hover:underline"
          style={{ color: "var(--color-text-muted)" }}
        >
          View All
        </Link>
      </div>

      <div className="flex-1 flex flex-col gap-3">
        {notes.length > 0 ? (
          notes.map((note) => (
            <Link
              key={note.id}
              href={`/notes/${note.id}`}
              className="block p-3 rounded-lg border transition-colors hover:bg-accent/5"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                <h4
                  className="text-sm font-medium leading-tight"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {note.title}
                </h4>
                {note.tags && note.tags.length > 0 && (
                  <span className="tag">{note.tags[0]}</span>
                )}
              </div>
              <p
                className="text-xs line-clamp-1"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {truncate(note.content, 60)}
              </p>
            </Link>
          ))
        ) : (
          <div
            className="flex-1 flex flex-col items-center justify-center p-4 rounded-lg border border-dashed h-[150px]"
            style={{
              backgroundColor: "var(--color-background)",
              borderColor: "var(--color-border)",
            }}
          >
            <p className="text-sm text-center" style={{ color: "var(--color-text-secondary)" }}>
              No notes yet.
            </p>
            <Link
              href="/notes/new"
              className="text-sm font-medium mt-2 hover:underline"
              style={{ color: "var(--color-accent)" }}
            >
              Capture an idea
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
