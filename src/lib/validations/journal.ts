import { z } from "zod";
import { MOOD_OPTIONS } from "@/lib/constants";

const moodValues = MOOD_OPTIONS.map((m) => m.value) as [string, ...string[]];

export const journalSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .max(200, "Title must be at most 200 characters."),
  content: z.string().min(1, "Content is required."),
  mood: z.enum(moodValues as [string, ...string[]]).optional().nullable(),
  tags: z.array(z.string()).default([]),
  entry_date: z.string().min(1, "Date is required."),
});

export type JournalInput = z.input<typeof journalSchema>;
