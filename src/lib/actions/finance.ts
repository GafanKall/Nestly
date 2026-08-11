"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { transactionSchema, type TransactionInput } from "@/lib/validations/finance";

export async function createTransaction(data: TransactionInput) {
  const parsed = transactionSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid form data." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated." };

  const { error } = await supabase.from("transactions").insert({
    user_id: user.id,
    type: parsed.data.type as any,
    amount: Number(parsed.data.amount),
    category: parsed.data.category as any,
    description: parsed.data.description || null,
    transaction_date: parsed.data.transaction_date,
  });

  if (error) return { error: error.message };

  revalidatePath("/finance");
  revalidatePath("/dashboard");
  redirect("/finance");
}

export async function updateTransaction(id: string, data: TransactionInput) {
  const parsed = transactionSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid form data." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("transactions")
    .update({
      type: parsed.data.type as any,
      amount: Number(parsed.data.amount),
      category: parsed.data.category as any,
      description: parsed.data.description || null,
      transaction_date: parsed.data.transaction_date,
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/finance");
  revalidatePath("/dashboard");
  redirect("/finance");
}

export async function deleteTransaction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("transactions").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/finance");
  revalidatePath("/dashboard");
  return { success: true };
}
