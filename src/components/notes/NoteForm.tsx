"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { noteSchema, type NoteInput } from "@/lib/validations/notes";
import { createNote, updateNote } from "@/lib/actions/notes";
import { TagInput } from "@/components/ui/TagInput";
import type { Note } from "@/types/database";

interface NoteFormProps {
  initialData?: Note;
}

export function NoteForm({ initialData }: NoteFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isEditing = !!initialData;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NoteInput>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      tags: initialData?.tags || [],
    },
  });

  const onSubmit = (data: NoteInput) => {
    startTransition(async () => {
      let result;
      if (isEditing) {
        result = await updateNote(initialData.id, data);
      } else {
        result = await createNote(data);
      }

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(isEditing ? "Note updated." : "Note created.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-1.5">
        <label htmlFor="title" className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
          Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Note title..."
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

      <div className="space-y-1.5">
        <label htmlFor="content" className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
          Content
        </label>
        <textarea
          id="content"
          placeholder="Start writing..."
          rows={16}
          {...register("content")}
          className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors resize-y"
          style={{
            borderColor: errors.content ? "var(--color-expense)" : "var(--color-border)",
            backgroundColor: "var(--color-surface)",
            color: "var(--color-text-primary)",
          }}
        />
        {errors.content && <p className="text-xs" style={{ color: "var(--color-expense)" }}>{errors.content.message}</p>}
      </div>

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

      <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: "var(--color-border)" }}>
        <button
          type="button"
          onClick={() => router.back()}
          disabled={isPending}
          className="px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-60"
          style={{ backgroundColor: "var(--color-accent)", color: "white" }}
        >
          {isPending ? "Saving..." : isEditing ? "Update Note" : "Save Note"}
        </button>
      </div>
    </form>
  );
}
