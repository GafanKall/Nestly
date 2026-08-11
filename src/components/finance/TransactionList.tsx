"use client";

import { useTransition } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, MoreVertical, Edit2, Trash2 } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { deleteTransaction } from "@/lib/actions/finance";
import type { Transaction } from "@/types/database";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

export function TransactionList({ transactions }: { transactions: Transaction[] }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async (id: string) => {
    startTransition(async () => {
      const result = await deleteTransaction(id);
      if (result?.error) {
        toast.error("Failed to delete transaction");
      } else {
        toast.success("Transaction deleted");
      }
    });
  };

  return (
    <div className="card">
      <h3 className="font-semibold mb-4" style={{ color: "var(--color-text-primary)" }}>Recent Transactions</h3>
      
      {transactions.length > 0 ? (
        <div className="divide-y" style={{ borderColor: "var(--color-border)" }}>
          {transactions.map((tx) => (
            <div key={tx.id} className="py-3 flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: tx.type === "income" ? "var(--color-income-bg)" : "var(--color-expense-bg)",
                  }}
                >
                  {tx.type === "income" ? (
                    <ArrowDown size={18} style={{ color: "var(--color-income)" }} />
                  ) : (
                    <ArrowUp size={18} style={{ color: "var(--color-expense)" }} />
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm" style={{ color: "var(--color-text-primary)" }}>
                    {tx.category}
                  </p>
                  <div className="flex items-center gap-2 text-xs" style={{ color: "var(--color-text-secondary)" }}>
                    <span>{formatDate(tx.transaction_date)}</span>
                    {tx.description && (
                      <>
                        <span>•</span>
                        <span className="truncate max-w-[120px] sm:max-w-[200px]">{tx.description}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <p
                  className="font-semibold text-sm whitespace-nowrap"
                  style={{
                    color: tx.type === "income" ? "var(--color-income)" : "var(--color-text-primary)",
                  }}
                >
                  {tx.type === "income" ? "+" : "-"}{formatCurrency(Number(tx.amount))}
                </p>
                
                <div className="hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    href={`/finance/${tx.id}/edit`}
                    className="p-1.5 rounded-md hover:bg-accent/10 transition-colors"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    <Edit2 size={14} />
                  </Link>
                  <ConfirmDialog
                    title="Delete Transaction"
                    description="Are you sure you want to delete this transaction?"
                    onConfirm={() => handleDelete(tx.id)}
                  >
                    <button
                      className="p-1.5 rounded-md hover:bg-expense/10 transition-colors"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </ConfirmDialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-center py-6" style={{ color: "var(--color-text-secondary)" }}>
          No transactions found.
        </p>
      )}
    </div>
  );
}
