import { z } from "zod";
import { PRIORITY_OPTIONS } from "@/lib/constants";

const priorityValues = PRIORITY_OPTIONS.map((p) => p.value) as [string, ...string[]];

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .max(200, "Title must be at most 200 characters."),
  description: z.string().max(1000, "Description too long.").optional().nullable(),
  due_date: z.string().optional().nullable(),
  priority: z.enum(priorityValues as [string, ...string[]]).default("medium"),
});

export type TaskInput = z.input<typeof taskSchema>;
