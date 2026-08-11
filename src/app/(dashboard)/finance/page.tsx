import { redirect } from "next/navigation";
import { Wallet } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { FinanceSummaryCard } from "@/components/dashboard/FinanceSummaryCard";
import { TransactionList } from "@/components/finance/TransactionList";
import type { Transaction } from "@/types/database";

export default async function FinancePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: transactions, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id)
    .order("transaction_date", { ascending: false })
    .order("created_at", { ascending: false });

  const txs = (transactions as Transaction[]) || [];

  let totalIncome = 0;
  let totalExpense = 0;
  txs.forEach((tx) => {
    if (tx.type === "income") totalIncome += Number(tx.amount);
    if (tx.type === "expense") totalExpense += Number(tx.amount);
  });

  return (
    <div>
      <PageHeader
        title="Finance"
        subtitle="Track your spending and income simply."
        action={{ label: "Add Transaction", href: "/finance/new" }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <FinanceSummaryCard income={totalIncome} expense={totalExpense} />
        </div>

        <div className="lg:col-span-2">
          {error ? (
            <p className="text-sm text-expense">Failed to load transactions.</p>
          ) : txs.length > 0 ? (
            <TransactionList transactions={txs} />
          ) : (
            <EmptyState
              icon={<Wallet size={24} />}
              title="No transactions yet"
              description="Start tracking your money by adding your first income or expense."
              action={{ label: "Add Transaction", href: "/finance/new" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
