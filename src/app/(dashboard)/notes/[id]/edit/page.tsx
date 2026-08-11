import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { NoteForm } from "@/components/notes/NoteForm";
import type { Note } from "@/types/database";

export default async function EditNotePage(props: {
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

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader title="Edit Note" />
      <div className="card">
        <NoteForm initialData={data as Note} />
      </div>
    </div>
  );
}
