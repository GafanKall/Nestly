"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { transactionSchema, type TransactionInput } from "@/lib/validations/finance";
import { createTransaction, updateTransaction } from "@/lib/actions/finance";
import { getTodayDateString } from "@/lib/utils/format";
import { FINANCE_CATEGORIES } from "@/lib/constants";
import type { Transaction } from "@/types/database";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

interface TransactionFormProps {
  initialData?: Transaction;
}

const formatDisplayAmount = (val: string | number | undefined): string => {
  if (val === undefined || val === null || val === "") return "";
  const numStr = String(val).replace(/\D/g, "");
  if (!numStr) return "";
  return new Intl.NumberFormat("id-ID").format(parseInt(numStr, 10));
};

export function TransactionForm({ initialData }: TransactionFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isEditing = !!initialData;

  const initialAmount = initialData?.amount ? formatDisplayAmount(initialData.amount) : "";

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TransactionInput>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: initialData?.type || "expense",
      amount: initialAmount,
      category: initialData?.category || "",
      description: initialData?.description || "",
      transaction_date: initialData?.transaction_date || getTodayDateString(),
    },
  });

  const selectedType = watch("type");
  const currentAmount = watch("amount");
  const categories = FINANCE_CATEGORIES;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digits = raw.replace(/\D/g, "");
    if (!digits) {
      setValue("amount", "", { shouldValidate: true });
      return;
    }
    const formatted = new Intl.NumberFormat("id-ID").format(parseInt(digits, 10));
    setValue("amount", formatted, { shouldValidate: true });
  };

  const onSubmit = (data: TransactionInput) => {
    startTransition(async () => {
      let result;
      if (isEditing) {
        result = await updateTransaction(initialData.id, data);
      } else {
        result = await createTransaction(data);
      }

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(isEditing ? "Transaction updated." : "Transaction added.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Type Toggle */}
      <div className="flex p-1 rounded-xl bg-background border" style={{ borderColor: "var(--color-border)" }}>
        <button
          type="button"
          onClick={() => {
            setValue("type", "expense");
            setValue("category", "");
          }}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all",
            selectedType === "expense" ? "shadow-sm" : "opacity-60 hover:opacity-100"
          )}
          style={{
            backgroundColor: selectedType === "expense" ? "var(--color-surface)" : "transparent",
            color: selectedType === "expense" ? "var(--color-text-primary)" : "var(--color-text-secondary)",
          }}
        >
          <ArrowUp size={16} style={{ color: selectedType === "expense" ? "var(--color-expense)" : "inherit" }} />
          Expense
        </button>
        <button
          type="button"
          onClick={() => {
            setValue("type", "income");
            setValue("category", "");
          }}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all",
            selectedType === "income" ? "shadow-sm" : "opacity-60 hover:opacity-100"
          )}
          style={{
            backgroundColor: selectedType === "income" ? "var(--color-surface)" : "transparent",
            color: selectedType === "income" ? "var(--color-text-primary)" : "var(--color-text-secondary)",
          }}
        >
          <ArrowDown size={16} style={{ color: selectedType === "income" ? "var(--color-income)" : "inherit" }} />
          Income
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Amount */}
        <div className="space-y-1.5">
          <label htmlFor="amount" className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
            Amount
          </label>
          <div className="relative">
            <span
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold select-none"
              style={{ color: "var(--color-text-muted)" }}
            >
              Rp
            </span>
            <input
              id="amount"
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={currentAmount || ""}
              onChange={handleAmountChange}
              className="w-full pl-11 pr-4 py-3 rounded-xl border text-base outline-none transition-colors"
              style={{
                borderColor: errors.amount ? "var(--color-expense)" : "var(--color-border)",
                backgroundColor: "var(--color-surface)",
                color: "var(--color-text-primary)",
              }}
            />
          </div>
          {errors.amount && (
            <p className="text-xs" style={{ color: "var(--color-expense)" }}>
              {errors.amount.message as string}
            </p>
          )}
        </div>

        {/* Date */}
        <div className="space-y-1.5">
          <label htmlFor="transaction_date" className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
            Date
          </label>
          <input
            id="transaction_date"
            type="date"
            {...register("transaction_date")}
            className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors h-[50px]"
            style={{
              borderColor: errors.transaction_date ? "var(--color-expense)" : "var(--color-border)",
              backgroundColor: "var(--color-surface)",
              color: "var(--color-text-primary)",
            }}
          />
          {errors.transaction_date && <p className="text-xs" style={{ color: "var(--color-expense)" }}>{errors.transaction_date.message}</p>}
        </div>
      </div>

      {/* Category */}
      <div className="space-y-1.5">
        <label htmlFor="category" className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
          Category
        </label>
        <select
          id="category"
          {...register("category")}
          className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors h-[50px] cursor-pointer"
          style={{
            borderColor: errors.category ? "var(--color-expense)" : "var(--color-border)",
            backgroundColor: "var(--color-surface)",
            color: "var(--color-text-primary)",
          }}
        >
          <option value="" disabled>Select a category</option>
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
        {errors.category && <p className="text-xs" style={{ color: "var(--color-expense)" }}>{errors.category.message}</p>}
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <label htmlFor="description" className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
          Description (Optional)
        </label>
        <input
          id="description"
          type="text"
          placeholder="What was this for?"
          {...register("description")}
          className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors"
          style={{
            borderColor: errors.description ? "var(--color-expense)" : "var(--color-border)",
            backgroundColor: "var(--color-surface)",
            color: "var(--color-text-primary)",
          }}
        />
        {errors.description && <p className="text-xs" style={{ color: "var(--color-expense)" }}>{errors.description.message}</p>}
      </div>

      <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: "var(--color-border)" }}>
        <button
          type="button"
          onClick={() => router.back()}
          disabled={isPending}
          className="px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-60"
          style={{ backgroundColor: "var(--color-accent)", color: "white" }}
        >
          {isPending ? "Saving..." : isEditing ? "Update Transaction" : "Add Transaction"}
        </button>
      </div>
    </form>
  );
}
