"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { JournalInput, journalSchema } from "@/lib/validations/journal";
import { createJournal, updateJournal } from "@/lib/actions/journal";
import { getTodayDateString } from "@/lib/utils/format";
import { MoodSelector } from "./MoodSelector";
import { TagInput } from "@/components/ui/TagInput";
import type { JournalEntry } from "@/types/database";
import type { MoodValue } from "@/lib/constants";

interface JournalFormProps {
  initialData?: JournalEntry;
  initialMood?: MoodValue | null;
}

export function JournalForm({ initialData, initialMood }: JournalFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const isEditing = !!initialData;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<JournalInput>({
    resolver: zodResolver(journalSchema),
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      mood: initialData?.mood || initialMood || null,
      tags: initialData?.tags || [],
      entry_date: initialData?.entry_date || getTodayDateString(),
    },
  });

  const onSubmit = (data: JournalInput) => {
    startTransition(async () => {
      let result;
      if (isEditing) {
        result = await updateJournal(initialData.id, data);
      } else {
        result = await createJournal(data);
      }

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(isEditing ? "Journal updated." : "Journal created.");
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
          placeholder="Give your entry a title..."
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

      {/* Date & Mood row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label htmlFor="entry_date" className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
            Date
          </label>
          <input
            id="entry_date"
            type="date"
            {...register("entry_date")}
            className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors h-[50px]"
            style={{
              borderColor: errors.entry_date ? "var(--color-expense)" : "var(--color-border)",
              backgroundColor: "var(--color-surface)",
              color: "var(--color-text-primary)",
            }}
          />
          {errors.entry_date && <p className="text-xs" style={{ color: "var(--color-expense)" }}>{errors.entry_date.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
            Mood
          </label>
          <Controller
            control={control}
            name="mood"
            render={({ field }) => (
              <MoodSelector value={field.value as MoodValue} onChange={field.onChange} />
            )}
          />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-1.5">
        <label htmlFor="content" className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
          Content
        </label>
        <textarea
          id="content"
          placeholder="Write down how your day went..."
          rows={8}
          {...register("content")}
          className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors resize-y min-h-[180px]"
          style={{
            borderColor: errors.content ? "var(--color-expense)" : "var(--color-border)",
            backgroundColor: "var(--color-surface)",
            color: "var(--color-text-primary)",
          }}
        />
        {errors.content && <p className="text-xs" style={{ color: "var(--color-expense)" }}>{errors.content.message}</p>}
      </div>

      {/* Tags */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
          Tags (Optional)
        </label>
        <Controller
          control={control}
          name="tags"
          render={({ field }) => (
            <TagInput value={field.value || []} onChange={field.onChange} />
          )}
        />
      </div>

      {/* Actions */}
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
          {isPending ? "Saving..." : isEditing ? "Update Entry" : "Save Entry"}
        </button>
      </div>
    </form>
  );
}
