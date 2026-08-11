import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { TransactionForm } from "@/components/finance/TransactionForm";
import type { Transaction } from "@/types/database";

export default async function EditTransactionPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !data) notFound();

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader title="Edit Transaction" />
      <div className="card">
        <TransactionForm initialData={data as Transaction} />
      </div>
    </div>
  );
}
