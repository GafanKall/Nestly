import { z } from "zod";

export const noteSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .max(200, "Title must be at most 200 characters."),
  content: z
    .string()
    .min(1, "Content is required.")
    .max(50000, "Content must be at most 50,000 characters."),
  tags: z
    .array(z.string().trim().min(1).max(30, "Tag too long."))
    .max(10, "Maximum 10 tags allowed.")
    .default([]),
});

export type NoteInput = z.input<typeof noteSchema>;
