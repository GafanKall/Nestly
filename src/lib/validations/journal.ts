import { z } from "zod";
import { MOOD_OPTIONS } from "@/lib/constants";

const moodValues = MOOD_OPTIONS.map((m) => m.value) as [string, ...string[]];

export const journalSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .max(200, "Title must be at most 200 characters."),
  content: z
    .string()
    .min(1, "Content is required.")
    .max(50000, "Content must be at most 50,000 characters."),
  mood: z.enum(moodValues as [string, ...string[]]).optional().nullable(),
  tags: z
    .array(z.string().trim().min(1).max(30, "Tag too long."))
    .max(10, "Maximum 10 tags allowed.")
    .default([]),
  entry_date: z
    .string()
    .min(1, "Date is required.")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must follow YYYY-MM-DD format."),
});

export type JournalInput = z.input<typeof journalSchema>;
