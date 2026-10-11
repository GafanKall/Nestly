"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { taskSchema, type TaskInput } from "@/lib/validations/tasks";
import { createTask, updateTask } from "@/lib/actions/tasks";
import { getTodayDateString } from "@/lib/utils/format";
import type { Task } from "@/types/database";
import { cn } from "@/lib/utils";

interface TaskFormProps {
  initialData?: Task;
}

export function TaskForm({ initialData }: TaskFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isEditing = !!initialData;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TaskInput>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      due_date: initialData?.due_date || getTodayDateString(),
      priority: initialData?.priority || "medium",
    },
  });

  const selectedPriority = watch("priority");

  const onSubmit = (data: TaskInput) => {
    startTransition(async () => {
      let result;
      if (isEditing) {
        result = await updateTask(initialData.id, data);
      } else {
        result = await createTask(data);
      }

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(isEditing ? "Task updated." : "Task created.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title */}
      <div className="space-y-1.5">
        <label htmlFor="title" className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
          Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="What needs to be done?"
          {...register("title")}
          className="w-full px-4 py-3 rounded-xl border text-base outline-none transition-colors"
          style={{
            borderColor: errors.title ? "var(--color-expense)" : "var(--color-border)",
            backgroundColor: "var(--color-surface)",
            color: "var(--color-text-primary)",
          }}
        />
        {errors.title && <p className="text-xs" style={{ color: "var(--color-expense)" }}>{errors.title.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Date */}
        <div className="space-y-1.5">
          <label htmlFor="due_date" className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
            Due Date (Optional)
          </label>
          <input
            id="due_date"
            type="date"
            {...register("due_date")}
            className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors h-[50px]"
            style={{
              borderColor: errors.due_date ? "var(--color-expense)" : "var(--color-border)",
              backgroundColor: "var(--color-surface)",
              color: "var(--color-text-primary)",
            }}
          />
          {errors.due_date && <p className="text-xs" style={{ color: "var(--color-expense)" }}>{errors.due_date.message}</p>}
        </div>

        {/* Priority */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
            Priority
          </label>
          <div className="flex p-1 rounded-xl bg-background border h-[50px]" style={{ borderColor: "var(--color-border)" }}>
            {(["low", "medium", "high"] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setValue("priority", p)}
                className={cn(
                  "flex-1 flex items-center justify-center py-2 text-xs font-medium rounded-lg transition-all capitalize",
                  selectedPriority === p ? "shadow-sm" : "opacity-60 hover:opacity-100"
                )}
                style={{
                  backgroundColor: selectedPriority === p ? "var(--color-surface)" : "transparent",
                  color: selectedPriority === p 
                    ? `var(--color-priority-${p})`
                    : "var(--color-text-secondary)",
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <label htmlFor="description" className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
          Description (Optional)
        </label>
        <textarea
          id="description"
          placeholder="Add details..."
          rows={4}
          {...register("description")}
          className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors resize-y"
          style={{
            borderColor: errors.description ? "var(--color-expense)" : "var(--color-border)",
            backgroundColor: "var(--color-surface)",
            color: "var(--color-text-primary)",
          }}
        />
        {errors.description && <p className="text-xs" style={{ color: "var(--color-expense)" }}>{errors.description.message}</p>}
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-3 pt-4 border-t" style={{ borderColor: "var(--color-border)" }}>
        <button
          type="button"
          onClick={() => router.back()}
          disabled={isPending}
          className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm font-medium transition-colors border sm:border-transparent"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-60"
          style={{ backgroundColor: "var(--color-accent)", color: "white" }}
        >
          {isPending ? "Saving..." : isEditing ? "Update Task" : "Save Task"}
        </button>
      </div>
    </form>
  );
}
