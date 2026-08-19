import Link from "next/link";
import { Wallet, ArrowDown, ArrowUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";

interface FinanceSummaryCardProps {
  income: number;
  expense: number;
  showDetailsLink?: boolean;
  variant?: "compact" | "wide";
}

export function FinanceSummaryCard({
  income,
  expense,
  showDetailsLink = true,
  variant = "compact",
}: FinanceSummaryCardProps) {
  const balance = income - expense;
  const formattedBalance = formatCurrency(balance);
  const formattedIncome = formatCurrency(income);
  const formattedExpense = formatCurrency(expense);

  // Dynamic text size based on currency string length to prevent overflow
  const getBalanceFontSize = (str: string, isWide: boolean) => {
    if (isWide) {
      if (str.length > 20) return "text-xl sm:text-2xl lg:text-3xl";
      if (str.length > 14) return "text-2xl sm:text-3xl lg:text-4xl";
      return "text-3xl sm:text-4xl";
    } else {
      if (str.length > 18) return "text-lg sm:text-xl";
      if (str.length > 13) return "text-xl sm:text-2xl";
      return "text-2xl sm:text-3xl";
    }
  };

  const getBadgeFontSize = (str: string) => {
    if (str.length > 16) return "text-[11px] sm:text-xs";
    if (str.length > 12) return "text-xs sm:text-sm";
    return "text-xs sm:text-sm";
  };

  if (variant === "wide") {
    return (
      <div className="card flex flex-col lg:flex-row lg:items-center justify-between gap-6 overflow-hidden">
        {/* Left side: Header & Total Balance */}
        <div className="flex-1 min-w-0 space-y-3">
          <div className="flex items-center justify-between lg:justify-start gap-2">
            <div className="flex items-center gap-2">
              <Wallet size={18} style={{ color: "var(--color-accent)" }} />
              <h3 className="font-semibold text-base" style={{ color: "var(--color-text-primary)" }}>
                Finance
              </h3>
            </div>
            {showDetailsLink && (
              <Link
                href="/finance"
                className="text-xs font-medium transition-colors hover:underline lg:ml-2"
                style={{ color: "var(--color-text-muted)" }}
              >
                Details
              </Link>
            )}
          </div>

          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: "var(--color-text-secondary)" }}>
              Total Balance
            </p>
            <h2
              className={`font-bold tracking-tight min-w-0 overflow-hidden text-ellipsis whitespace-nowrap ${getBalanceFontSize(
                formattedBalance,
                true
              )}`}
              style={{ color: "var(--color-text-primary)" }}
              title={formattedBalance}
            >
              {formattedBalance}
            </h2>
          </div>
        </div>

        {/* Right side: Income & Expense Badges */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 shrink-0 lg:min-w-[340px]">
          <div
            className="p-3.5 px-4 rounded-xl border flex flex-col gap-1.5 min-w-0 overflow-hidden"
            style={{
              backgroundColor: "var(--color-income-bg)",
              borderColor: "transparent",
            }}
          >
            <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>
              <ArrowDown size={14} style={{ color: "var(--color-income)" }} />
              Income
            </div>
            <p
              className={`font-bold truncate ${getBadgeFontSize(formattedIncome)}`}
              style={{ color: "var(--color-text-primary)" }}
              title={`+${formattedIncome}`}
            >
              +{formattedIncome}
            </p>
          </div>
          
          <div
            className="p-3.5 px-4 rounded-xl border flex flex-col gap-1.5 min-w-0 overflow-hidden"
            style={{
              backgroundColor: "var(--color-expense-bg)",
              borderColor: "transparent",
            }}
          >
            <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>
              <ArrowUp size={14} style={{ color: "var(--color-expense)" }} />
              Expense
            </div>
            <p
              className={`font-bold truncate ${getBadgeFontSize(formattedExpense)}`}
              style={{ color: "var(--color-text-primary)" }}
              title={`-${formattedExpense}`}
            >
              -{formattedExpense}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Compact variant (Default for dashboard columns)
  return (
    <div className="card flex flex-col h-full overflow-hidden justify-between space-y-4">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Wallet size={16} style={{ color: "var(--color-accent)" }} />
            <h3 className="font-semibold" style={{ color: "var(--color-text-primary)" }}>
              Finance
            </h3>
          </div>
          {showDetailsLink && (
            <Link
              href="/finance"
              className="text-xs font-medium transition-colors hover:underline"
              style={{ color: "var(--color-text-muted)" }}
            >
              Details
            </Link>
          )}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: "var(--color-text-secondary)" }}>
            Total Balance
          </p>
          <h2
            className={`font-bold tracking-tight min-w-0 overflow-hidden text-ellipsis whitespace-nowrap ${getBalanceFontSize(
              formattedBalance,
              false
            )}`}
            style={{ color: "var(--color-text-primary)" }}
            title={formattedBalance}
          >
            {formattedBalance}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 mt-auto pt-1">
        <div
          className="p-3 rounded-lg border flex flex-col gap-1 min-w-0 overflow-hidden"
          style={{
            backgroundColor: "var(--color-income-bg)",
            borderColor: "transparent",
          }}
        >
          <div className="flex items-center gap-1 text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>
            <ArrowDown size={12} style={{ color: "var(--color-income)" }} />
            Income
          </div>
          <p
            className={`font-semibold truncate ${getBadgeFontSize(formattedIncome)}`}
            style={{ color: "var(--color-text-primary)" }}
            title={`+${formattedIncome}`}
          >
            +{formattedIncome}
          </p>
        </div>
        
        <div
          className="p-3 rounded-lg border flex flex-col gap-1 min-w-0 overflow-hidden"
          style={{
            backgroundColor: "var(--color-expense-bg)",
            borderColor: "transparent",
          }}
        >
          <div className="flex items-center gap-1 text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>
            <ArrowUp size={12} style={{ color: "var(--color-expense)" }} />
            Expense
          </div>
          <p
            className={`font-semibold truncate ${getBadgeFontSize(formattedExpense)}`}
            style={{ color: "var(--color-text-primary)" }}
            title={`-${formattedExpense}`}
          >
            -{formattedExpense}
          </p>
        </div>
      </div>
    </div>
  );
}
