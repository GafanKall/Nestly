"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateProfile(data: { display_name: string }) {
  const trimmed = data.display_name?.trim();
  if (!trimmed || trimmed.length < 2) {
    return { error: "Display name must be at least 2 characters." };
  }
  if (trimmed.length > 50) {
    return { error: "Display name must be at most 50 characters." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated." };

  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: data.display_name.trim(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/profile");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return { success: true };
}
