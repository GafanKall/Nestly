import { z } from "zod";

export const noteSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .max(200, "Title must be at most 200 characters."),
  content: z.string().min(1, "Content is required."),
  tags: z.array(z.string()).default([]),
});

export type NoteInput = z.input<typeof noteSchema>;
