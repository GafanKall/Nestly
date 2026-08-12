"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { journalSchema, type JournalInput } from "@/lib/validations/journal";

export async function createJournal(data: JournalInput) {
  const parsed = journalSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid form data." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated." };

  const { error } = await supabase.from("journals").insert({
    user_id: user.id,
    title: parsed.data.title,
    content: parsed.data.content,
    mood: (parsed.data.mood as any) || null,
    tags: parsed.data.tags,
    entry_date: parsed.data.entry_date,
  });

  if (error) return { error: error.message };

  revalidatePath("/journal");
  revalidatePath("/dashboard");
  redirect("/journal");
}

export async function updateJournal(id: string, data: JournalInput) {
  const parsed = journalSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid form data." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated." };

  const { error } = await supabase
    .from("journals")
    .update({
      title: parsed.data.title,
      content: parsed.data.content,
      mood: (parsed.data.mood as any) || null,
      tags: parsed.data.tags,
      entry_date: parsed.data.entry_date,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/journal");
  revalidatePath(`/journal/${id}`);
  revalidatePath("/dashboard");
  redirect(`/journal/${id}`);
}

export async function deleteJournal(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated." };

  const { error } = await supabase
    .from("journals")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/journal");
  revalidatePath("/dashboard");
  redirect("/journal");
}
