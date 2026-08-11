"use client";

import { useTransition } from "react";
import Link from "next/link";
import { CheckCircle2, Plus } from "lucide-react";
import type { Task } from "@/types/database";
import { completeTask } from "@/lib/actions/tasks";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function TodaysTasksCard({ tasks }: { tasks: Task[] }) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = (taskId: string, currentStatus: string) => {
    const isCompleted = currentStatus === "completed";
    startTransition(async () => {
      const result = await completeTask(taskId, !isCompleted);
      if (result?.error) {
        toast.error("Failed to update task.");
      } else {
        toast.success(isCompleted ? "Task uncompleted." : "Task completed!");
      }
    });
  };

  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const totalCount = tasks.length;

  return (
    <div className="card flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} style={{ color: "var(--color-accent)" }} />
          <h3 className="font-semibold" style={{ color: "var(--color-text-primary)" }}>
            Today&apos;s Tasks
          </h3>
        </div>
        {totalCount > 0 && (
          <div
            className="px-2 py-0.5 rounded-full text-[10px] font-medium"
            style={{
              backgroundColor: "var(--color-accent-light)",
              color: "var(--color-accent)",
            }}
          >
            {completedCount}/{totalCount} Done
          </div>
        )}
      </div>

      <div className="flex-1 space-y-3 mb-4">
        {tasks.length > 0 ? (
          tasks.slice(0, 5).map((task) => {
            const isCompleted = task.status === "completed";
            return (
              <div key={task.id} className="flex items-start gap-3">
                <button
                  onClick={() => handleToggle(task.id, task.status)}
                  disabled={isPending}
                  className="mt-0.5 flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  style={{
                    borderColor: isCompleted ? "var(--color-accent)" : "var(--color-border)",
                    backgroundColor: isCompleted ? "var(--color-accent)" : "var(--color-surface)",
                  }}
                >
                  {isCompleted && <CheckCircle2 size={12} color="white" />}
                </button>
                <label
                  className={cn(
                    "text-sm font-medium leading-tight cursor-pointer",
                    isCompleted && "line-through text-muted-foreground"
                  )}
                  style={{ color: isCompleted ? "var(--color-text-muted)" : "var(--color-text-primary)" }}
                  onClick={() => handleToggle(task.id, task.status)}
                >
                  {task.title}
                </label>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-center py-4" style={{ color: "var(--color-text-secondary)" }}>
            No tasks due today.
          </p>
        )}
      </div>

      <Link
        href="/tasks/new"
        className="flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-dashed text-xs font-medium transition-colors hover:bg-accent/5"
        style={{
          borderColor: "var(--color-border)",
          color: "var(--color-text-secondary)",
        }}
      >
        <Plus size={14} />
        Add Task
      </Link>
    </div>
  );
}
