import { redirect } from "next/navigation";
import { BookOpenText } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { JournalCard } from "@/components/journal/JournalCard";
import { JournalFilters } from "@/components/journal/JournalFilters";
import type { JournalEntry } from "@/types/database";

export default async function JournalPage(props: {
  searchParams: Promise<{ q?: string; mood?: string }>;
}) {
  const searchParams = await props.searchParams;
  const q = searchParams.q || "";
  const mood = searchParams.mood || "";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  let query = supabase
    .from("journals")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (mood) {
    query = query.eq("mood", mood as any);
  }

  const { data: journals, error } = await query;
  
  // Client-side search filtering (since Supabase textSearch can be complex to setup without proper indexes)
  let filteredJournals = (journals as JournalEntry[]) || [];
  if (q) {
    const searchLower = q.toLowerCase();
    filteredJournals = filteredJournals.filter(
      (j) =>
        j.title.toLowerCase().includes(searchLower) ||
        j.content.toLowerCase().includes(searchLower) ||
        j.tags?.some((t) => t.toLowerCase().includes(searchLower))
    );
  }

  return (
    <div>
      <PageHeader
        title="Journal"
        subtitle="Your private space for thoughts and reflections."
        action={{ label: "New Entry", href: "/journal/new" }}
      />

      <JournalFilters />

      {error ? (
        <p className="text-sm text-expense">Failed to load journals.</p>
      ) : filteredJournals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {filteredJournals.map((journal) => (
            <JournalCard key={journal.id} journal={journal} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<BookOpenText size={24} />}
          title="No entries found"
          description={
            q || mood
              ? "Try adjusting your search or filters."
              : "Write down how your day went."
          }
          action={
            !q && !mood
              ? { label: "Write your first entry", href: "/journal/new" }
              : undefined
          }
        />
      )}
    </div>
  );
}
