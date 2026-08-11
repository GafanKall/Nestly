import Link from "next/link";
import { Wallet, ArrowDown, ArrowUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";

interface FinanceSummaryCardProps {
  income: number;
  expense: number;
}

export function FinanceSummaryCard({ income, expense }: FinanceSummaryCardProps) {
  const balance = income - expense;

  return (
    <div className="card flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Wallet size={16} style={{ color: "var(--color-accent)" }} />
          <h3 className="font-semibold" style={{ color: "var(--color-text-primary)" }}>
            Finance
          </h3>
        </div>
        <Link
          href="/finance"
          className="text-xs font-medium transition-colors hover:underline"
          style={{ color: "var(--color-text-muted)" }}
        >
          Details
        </Link>
      </div>

      <div className="mb-6">
        <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: "var(--color-text-secondary)" }}>
          Total Balance
        </p>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight" style={{ color: "var(--color-text-primary)" }}>
          {formatCurrency(balance)}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-auto">
        <div
          className="p-3 rounded-lg border flex flex-col gap-1"
          style={{
            backgroundColor: "var(--color-income-bg)",
            borderColor: "transparent", // Stitch design is very soft
          }}
        >
          <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>
            <ArrowDown size={12} style={{ color: "var(--color-income)" }} />
            Income
          </div>
          <p className="font-semibold text-sm" style={{ color: "var(--color-text-primary)" }}>
            +{formatCurrency(income)}
          </p>
        </div>
        
        <div
          className="p-3 rounded-lg border flex flex-col gap-1"
          style={{
            backgroundColor: "var(--color-expense-bg)",
            borderColor: "transparent",
          }}
        >
          <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>
            <ArrowUp size={12} style={{ color: "var(--color-expense)" }} />
            Expense
          </div>
          <p className="font-semibold text-sm" style={{ color: "var(--color-text-primary)" }}>
            -{formatCurrency(expense)}
          </p>
        </div>
      </div>
    </div>
  );
}
