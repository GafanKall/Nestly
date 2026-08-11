import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatDateFull } from "@/lib/utils/format";
import { deleteNote } from "@/lib/actions/notes";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import type { Note } from "@/types/database";

export default async function ViewNotePage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !data) notFound();

  const note = data as Note;

  const handleDelete = async () => {
    "use server";
    await deleteNote(note.id);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/notes"
          className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-accent"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <ArrowLeft size={16} />
          Back to Notes
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href={`/notes/${note.id}/edit`}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-medium transition-colors hover:bg-accent/5"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
              color: "var(--color-text-primary)",
            }}
          >
            <Edit2 size={14} />
            Edit
          </Link>

          <ConfirmDialog
            title="Delete this note?"
            description="This action cannot be undone."
            confirmText="Delete"
            onConfirm={handleDelete}
          >
            <button
              className="px-3 py-1.5 rounded-md text-xs font-medium transition-colors hover:bg-expense/10"
              style={{ color: "var(--color-expense)" }}
            >
              Delete
            </button>
          </ConfirmDialog>
        </div>
      </div>

      <div className="card">
        <div className="mb-6">
          <h1
            className="text-2xl font-semibold mb-2"
            style={{ color: "var(--color-text-primary)" }}
          >
            {note.title}
          </h1>
          <p className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
            Last updated {formatDateFull(note.updated_at)}
          </p>
        </div>

        <div
          className="prose prose-sm sm:prose-base whitespace-pre-wrap max-w-none mb-8"
          style={{ color: "var(--color-text-primary)" }}
        >
          {note.content}
        </div>

        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4 border-t" style={{ borderColor: "var(--color-border)" }}>
            {note.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
