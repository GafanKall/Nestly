import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { getCategoryLabel } from "@/lib/constants";
import { formatCurrency, formatDateFull, formatDate } from "@/lib/utils/format";
import { ArrowDown, ArrowUp, Calendar, Tag, FileText, Clock } from "lucide-react";
import { TransactionDetailActions } from "@/components/finance/TransactionDetailActions";
import type { Transaction } from "@/types/database";

export default async function TransactionDetailPage(props: {
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
    .eq("user_id", user.id)
    .single();

  if (error || !data) {
    notFound();
  }

  const tx = data as Transaction;
  const isIncome = tx.type === "income";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <PageHeader
        title="Transaction Details"
        subtitle={`Recorded ${formatDate(tx.transaction_date)}`}
      />

      <div className="card space-y-6 overflow-hidden">
        {/* Top summary section */}
        <div className="flex flex-col items-center justify-center py-6 text-center border-b" style={{ borderColor: "var(--color-border)" }}>
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
            style={{
              backgroundColor: isIncome ? "var(--color-income-bg)" : "var(--color-expense-bg)",
            }}
          >
            {isIncome ? (
              <ArrowDown size={28} style={{ color: "var(--color-income)" }} />
            ) : (
              <ArrowUp size={28} style={{ color: "var(--color-expense)" }} />
            )}
          </div>

          <span
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider mb-2"
            style={{
              backgroundColor: isIncome ? "var(--color-income-bg)" : "var(--color-expense-bg)",
              color: isIncome ? "var(--color-income)" : "var(--color-expense)",
            }}
          >
            {tx.type}
          </span>

          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight max-w-full overflow-hidden text-ellipsis whitespace-nowrap px-4"
            style={{
              color: isIncome ? "var(--color-income)" : "var(--color-text-primary)",
            }}
            title={`${isIncome ? "+" : "-"}${formatCurrency(Number(tx.amount))}`}
          >
            {isIncome ? "+" : "-"}{formatCurrency(Number(tx.amount))}
          </h2>
        </div>

        {/* Detailed Fields */}
        <div className="space-y-4 text-sm">
          <div className="flex items-start gap-3 p-3.5 rounded-xl border bg-background" style={{ borderColor: "var(--color-border)" }}>
            <Tag size={18} className="mt-0.5 shrink-0" style={{ color: "var(--color-accent)" }} />
            <div>
              <p className="text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>
                Category
              </p>
              <p className="font-semibold text-base" style={{ color: "var(--color-text-primary)" }}>
                {getCategoryLabel(tx.category)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl border bg-background" style={{ borderColor: "var(--color-border)" }}>
            <Calendar size={18} className="mt-0.5 shrink-0" style={{ color: "var(--color-accent)" }} />
            <div>
              <p className="text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>
                Transaction Date
              </p>
              <p className="font-semibold" style={{ color: "var(--color-text-primary)" }}>
                {formatDateFull(tx.transaction_date)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl border bg-background" style={{ borderColor: "var(--color-border)" }}>
            <FileText size={18} className="mt-0.5 shrink-0" style={{ color: "var(--color-accent)" }} />
            <div>
              <p className="text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>
                Description
              </p>
              <p className="font-normal whitespace-pre-wrap break-words" style={{ color: tx.description ? "var(--color-text-primary)" : "var(--color-text-muted)" }}>
                {tx.description || "No description provided."}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl border bg-background" style={{ borderColor: "var(--color-border)" }}>
            <Clock size={18} className="mt-0.5 shrink-0" style={{ color: "var(--color-text-muted)" }} />
            <div>
              <p className="text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>
                Created At
              </p>
              <p className="font-medium text-xs" style={{ color: "var(--color-text-muted)" }}>
                {new Date(tx.created_at).toLocaleString("en-GB", {
                  dateStyle: "full",
                  timeStyle: "medium",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons (Back, Edit, Delete) */}
        <TransactionDetailActions id={tx.id} />
      </div>
    </div>
  );
}
