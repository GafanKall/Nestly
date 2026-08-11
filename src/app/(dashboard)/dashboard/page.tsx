import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { GreetingHeader } from "@/components/dashboard/GreetingHeader";
import { MoodPicker } from "@/components/dashboard/MoodPicker";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentJournalCard } from "@/components/dashboard/RecentJournalCard";
import { TodaysTasksCard } from "@/components/dashboard/TodaysTasksCard";
import { FinanceSummaryCard } from "@/components/dashboard/FinanceSummaryCard";
import { RecentNotesCard } from "@/components/dashboard/RecentNotesCard";
import { getTodayDateString } from "@/lib/utils/format";

export default async function DashboardPage() {
  const supabase = await createClient();

  // Get user session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch all dashboard data in parallel
  const [
    profileResponse,
    journalResponse,
    tasksResponse,
    notesResponse,
    transactionsResponse,
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single(),
    supabase
      .from("journals")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single(),
    supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id)
      .eq("due_date", getTodayDateString())
      .order("created_at", { ascending: false }),
    supabase
      .from("notes")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })
      .limit(3),
    supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id), // In a real app, filter by current month
  ]);

  const displayName = profileResponse.data?.display_name || "there";
  const recentJournal = journalResponse.data || null;
  const todaysTasks = tasksResponse.data || [];
  const recentNotes = notesResponse.data || [];
  
  // Calculate finance summary
  let totalIncome = 0;
  let totalExpense = 0;
  if (transactionsResponse.data) {
    transactionsResponse.data.forEach((tx) => {
      if (tx.type === "income") totalIncome += Number(tx.amount);
      if (tx.type === "expense") totalExpense += Number(tx.amount);
    });
  }

  return (
    <div>
      <GreetingHeader initialName={displayName} />
      <MoodPicker />
      <QuickActions />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {/* Left Column */}
        <div className="space-y-4 lg:space-y-6">
          <RecentJournalCard journal={recentJournal} />
          <FinanceSummaryCard income={totalIncome} expense={totalExpense} />
        </div>

        {/* Right Column */}
        <div className="space-y-4 lg:space-y-6">
          <TodaysTasksCard tasks={todaysTasks} />
          <RecentNotesCard notes={recentNotes} />
        </div>
      </div>
    </div>
  );
}
