import { redirect } from "next/navigation";
import { CheckSquare } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { TaskList } from "@/components/tasks/TaskList";
import { getTodayDateString } from "@/lib/utils/format";
import type { Task } from "@/types/database";

export default async function TasksPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", user.id)
    .order("due_date", { ascending: true })
    .order("created_at", { ascending: false });

  const allTasks = (tasks as Task[]) || [];
  const todayStr = getTodayDateString();

  const overdue = allTasks.filter(
    (t) => t.status === "pending" && t.due_date && t.due_date < todayStr
  );
  const today = allTasks.filter(
    (t) => t.due_date === todayStr && t.status === "pending"
  );
  const upcoming = allTasks.filter(
    (t) => t.status === "pending" && t.due_date && t.due_date > todayStr
  );
  const noDate = allTasks.filter(
    (t) => t.status === "pending" && !t.due_date
  );
  const completed = allTasks.filter((t) => t.status === "completed");

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        title="Tasks"
        subtitle="Stay on top of what needs to be done."
        action={{ label: "Add Task", href: "/tasks/new" }}
      />

      {error ? (
        <p className="text-sm text-expense">Failed to load tasks.</p>
      ) : allTasks.length > 0 ? (
        <div className="space-y-6">
          <TaskList tasks={overdue} title="Overdue" />
          <TaskList tasks={today} title="Today" />
          <TaskList tasks={upcoming} title="Upcoming" />
          <TaskList tasks={noDate} title="No Date" />
          <TaskList tasks={completed} title="Completed" />
        </div>
      ) : (
        <EmptyState
          icon={<CheckSquare size={24} />}
          title="No tasks yet"
          description="Create your first task and start organizing your life."
          action={{ label: "Add Task", href: "/tasks/new" }}
        />
      )}
    </div>
  );
}
