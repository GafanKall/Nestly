import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { JournalForm } from "@/components/journal/JournalForm";
import type { JournalEntry } from "@/types/database";

export default async function EditJournalPage(props: {
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
    .eq("user_id", user.id)
    .single();

  if (error || !data) notFound();

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader title="Edit Journal Entry" />
      <div className="card">
        <JournalForm initialData={data as JournalEntry} />
      </div>
    </div>
  );
}
