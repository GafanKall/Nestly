"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, Edit2, Trash2, Search, Eye } from "lucide-react";
import { getCategoryLabel } from "@/lib/constants";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { deleteTransaction } from "@/lib/actions/finance";
import type { Transaction } from "@/types/database";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

export function TransactionList({ transactions }: { transactions: Transaction[] }) {
  const [isPending, startTransition] = useTransition();
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all");
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredTransactions = transactions.filter((tx) => {
    if (filterType !== "all" && tx.type !== filterType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const catLabel = getCategoryLabel(tx.category).toLowerCase();
      const desc = (tx.description || "").toLowerCase();
      const amountStr = tx.amount.toString();
      return catLabel.includes(q) || desc.includes(q) || amountStr.includes(q);
    }
    return true;
  });

  return (
    <div className="card space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b" style={{ borderColor: "var(--color-border)" }}>
        <h3 className="font-semibold text-lg" style={{ color: "var(--color-text-primary)" }}>
          Recent Transactions
        </h3>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-background border" style={{ borderColor: "var(--color-border)" }}>
          {(["all", "income", "expense"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className="px-3 py-1 text-xs font-medium rounded-md capitalize transition-all"
              style={{
                backgroundColor: filterType === t ? "var(--color-surface)" : "transparent",
                color: filterType === t ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                boxShadow: filterType === t ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      {transactions.length > 0 && (
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--color-text-muted)" }} />
          <input
            type="text"
            placeholder="Search by category, description, or amount..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border outline-none transition-colors"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-surface)",
              color: "var(--color-text-primary)",
            }}
          />
        </div>
      )}

      {filteredTransactions.length > 0 ? (
        <div className="divide-y" style={{ borderColor: "var(--color-border)" }}>
          {filteredTransactions.map((tx) => (
            <div key={tx.id} className="py-3 flex items-center justify-between gap-3 group min-w-0">
              <Link href={`/finance/${tx.id}`} className="flex items-center gap-3 min-w-0 flex-1 hover:opacity-80 transition-opacity">
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
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm truncate" style={{ color: "var(--color-text-primary)" }}>
                    {getCategoryLabel(tx.category)}
                  </p>

                  <div className="flex items-center gap-2 text-xs" style={{ color: "var(--color-text-secondary)" }}>
                    <span className="shrink-0">{formatDate(tx.transaction_date)}</span>
                    {tx.description && (
                      <>
                        <span>•</span>
                        <span className="truncate max-w-[120px] sm:max-w-[220px]">{tx.description}</span>
                      </>
                    )}
                  </div>
                </div>
              </Link>

              <div className="flex items-center gap-3 shrink-0">
                <p
                  className="font-semibold text-sm whitespace-nowrap"
                  style={{
                    color: tx.type === "income" ? "var(--color-income)" : "var(--color-text-primary)",
                  }}
                >
                  {tx.type === "income" ? "+" : "-"}{formatCurrency(Number(tx.amount))}
                </p>
                
                <div className="flex items-center gap-1 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    href={`/finance/${tx.id}`}
                    title="View Details"
                    className="p-1.5 rounded-md hover:bg-accent/10 transition-colors"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    <Eye size={14} />
                  </Link>
                  <Link
                    href={`/finance/${tx.id}/edit`}
                    title="Edit Transaction"
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
                      title="Delete Transaction"
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
          {searchQuery || filterType !== "all" ? "No matching transactions found." : "No transactions found."}
        </p>
      )}
    </div>
  );
}
