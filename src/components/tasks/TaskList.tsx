"use client";

import { useTransition } from "react";
import Link from "next/link";
import { CheckCircle2, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils/format";
import { completeTask, deleteTask } from "@/lib/actions/tasks";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import type { Task } from "@/types/database";
import { cn } from "@/lib/utils";

export function TaskList({ tasks, title }: { tasks: Task[]; title?: string }) {
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

  const handleDelete = (taskId: string) => {
    startTransition(async () => {
      const result = await deleteTask(taskId);
      if (result?.error) {
        toast.error("Failed to delete task.");
      } else {
        toast.success("Task deleted.");
      }
    });
  };

  if (tasks.length === 0) return null;

  return (
    <div className="mb-8">
      {title && (
        <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--color-text-muted)" }}>
          {title} ({tasks.length})
        </h3>
      )}
      <div className="card space-y-0 p-0 overflow-hidden divide-y" style={{ borderColor: "var(--color-border)" }}>
        {tasks.map((task) => {
          const isCompleted = task.status === "completed";
          return (
            <div key={task.id} className="p-4 flex items-start sm:items-center justify-between group transition-colors hover:bg-accent/5">
              <div className="flex items-start gap-3">
                <button
                  onClick={() => handleToggle(task.id, task.status)}
                  disabled={isPending}
                  className="mt-0.5 sm:mt-0 flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  style={{
                    borderColor: isCompleted ? "var(--color-accent)" : "var(--color-border)",
                    backgroundColor: isCompleted ? "var(--color-accent)" : "var(--color-surface)",
                  }}
                >
                  {isCompleted && <CheckCircle2 size={14} color="white" />}
                </button>
                <div>
                  <label
                    className={cn(
                      "text-sm font-medium leading-tight cursor-pointer block mb-1",
                      isCompleted && "line-through text-muted-foreground"
                    )}
                    style={{ color: isCompleted ? "var(--color-text-muted)" : "var(--color-text-primary)" }}
                    onClick={() => handleToggle(task.id, task.status)}
                  >
                    {task.title}
                  </label>
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="px-1.5 py-0.5 rounded capitalize"
                      style={{
                        backgroundColor: `color-mix(in srgb, var(--color-priority-${task.priority}) 15%, transparent)`,
                        color: `var(--color-priority-${task.priority})`,
                      }}
                    >
                      {task.priority}
                    </span>
                    {task.due_date && (
                      <span style={{ color: "var(--color-text-secondary)" }}>
                        {formatDate(task.due_date)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                <Link
                  href={`/tasks/${task.id}/edit`}
                  className="p-1.5 rounded-md hover:bg-accent/10 transition-colors"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <Edit2 size={14} />
                </Link>
                <ConfirmDialog
                  title="Delete Task"
                  description="Are you sure you want to delete this task?"
                  onConfirm={async () => handleDelete(task.id)}
                >
                  <button
                    className="p-1.5 rounded-md hover:bg-expense/10 transition-colors"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    <Trash2 size={14} />
                  </button>
                </ConfirmDialog>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
