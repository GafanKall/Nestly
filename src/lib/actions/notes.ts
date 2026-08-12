"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { noteSchema, type NoteInput } from "@/lib/validations/notes";

export async function createNote(data: NoteInput) {
  const parsed = noteSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid form data." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated." };

  const { error } = await supabase.from("notes").insert({
    user_id: user.id,
    title: parsed.data.title,
    content: parsed.data.content,
    tags: parsed.data.tags,
  });

  if (error) return { error: error.message };

  revalidatePath("/notes");
  revalidatePath("/dashboard");
  redirect("/notes");
}

export async function updateNote(id: string, data: NoteInput) {
  const parsed = noteSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid form data." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated." };

  const { error } = await supabase
    .from("notes")
    .update({
      title: parsed.data.title,
      content: parsed.data.content,
      tags: parsed.data.tags,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/notes");
  revalidatePath(`/notes/${id}`);
  revalidatePath("/dashboard");
  redirect(`/notes/${id}`);
}

export async function deleteNote(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated." };

  const { error } = await supabase
    .from("notes")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/notes");
  revalidatePath("/dashboard");
  redirect("/notes");
}
