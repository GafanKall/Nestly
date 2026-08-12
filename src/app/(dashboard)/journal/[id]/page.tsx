import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Edit2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatDateFull } from "@/lib/utils/format";
import { MOOD_OPTIONS } from "@/lib/constants";
import { deleteJournal } from "@/lib/actions/journal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import type { JournalEntry } from "@/types/database";

export default async function ViewJournalPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data, error } = await supabase
    .from("journals")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !data) notFound();

  const journal = data as JournalEntry;
  const mood = MOOD_OPTIONS.find((m) => m.value === journal.mood);

  // Server action wrapper for delete
  const handleDelete = async () => {
    "use server";
    await deleteJournal(journal.id);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/journal"
          className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-accent"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <ArrowLeft size={16} />
          Back to Journal
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href={`/journal/${journal.id}/edit`}
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
            title="Delete this journal?"
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
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1
              className="text-2xl font-semibold mb-2"
              style={{ color: "var(--color-text-primary)" }}
            >
              {journal.title}
            </h1>
            <p className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
              {formatDateFull(journal.entry_date)}
            </p>
          </div>

          {mood && (
            <div
              className="flex flex-col items-center justify-center w-16 h-20 rounded-xl border p-2"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <Image
                src={mood.iconUrl}
                alt={mood.label}
                width={36}
                height={36}
                className="object-contain mb-1"
              />
              <span
                className="text-[10px] font-medium"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {mood.label}
              </span>
            </div>
          )}
        </div>


        <div

          className="prose prose-sm sm:prose-base whitespace-pre-wrap max-w-none mb-8"
          style={{ color: "var(--color-text-primary)" }}
        >
          {journal.content}
        </div>

        {journal.tags && journal.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4 border-t" style={{ borderColor: "var(--color-border)" }}>
            {journal.tags.map((tag) => (
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
