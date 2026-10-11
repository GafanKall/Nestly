import { redirect } from "next/navigation";
import { FileText } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { NoteCard } from "@/components/notes/NoteCard";
import { NoteFilters } from "@/components/notes/NoteFilters";
import type { Note } from "@/types/database";

export default async function NotesPage(props: {
  searchParams: Promise<{ q?: string }>;
}) {
  const searchParams = await props.searchParams;
  const q = searchParams.q || "";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: notes, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });
    
  let filteredNotes = (notes as Note[]) || [];
  if (q) {
    const searchLower = q.toLowerCase();
    filteredNotes = filteredNotes.filter(
      (n) =>
        n.title.toLowerCase().includes(searchLower) ||
        n.content.toLowerCase().includes(searchLower) ||
        n.tags?.some((t) => t.toLowerCase().includes(searchLower))
    );
  }

  return (
    <div>
      <PageHeader
        title="Notes"
        subtitle="Capture your ideas, lists, and reference material."
        action={{ label: "New Note", href: "/notes/new" }}
      />

      <NoteFilters />

      {error ? (
        <p className="text-sm text-expense">Failed to load notes.</p>
      ) : filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 items-start">
          {filteredNotes.map((note) => (
            <div key={note.id} className="h-full">
               <NoteCard note={note} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<FileText size={24} />}
          title="No notes found"
          description={
            q ? "Try adjusting your search query." : "You haven't written any notes yet."
          }
          action={
            !q ? { label: "Create a note", href: "/notes/new" } : undefined
          }
        />
      )}
    </div>
  );
}
