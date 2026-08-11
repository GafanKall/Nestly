import { PageHeader } from "@/components/ui/PageHeader";
import { JournalForm } from "@/components/journal/JournalForm";
import type { MoodValue } from "@/lib/constants";

export default async function NewJournalPage(props: {
  searchParams: Promise<{ mood?: string }>;
}) {
  const searchParams = await props.searchParams;
  const initialMood = (searchParams.mood as MoodValue) || null;

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader title="New Journal Entry" />
      <div className="card">
        <JournalForm initialMood={initialMood} />
      </div>
    </div>
  );
}
