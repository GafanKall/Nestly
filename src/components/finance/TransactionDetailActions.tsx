"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit2, Trash2, ArrowLeft } from "lucide-react";
import { deleteTransaction } from "@/lib/actions/finance";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { toast } from "sonner";

export function TransactionDetailActions({ id }: { id: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      const result = await deleteTransaction(id);
      if (result?.error) {
        toast.error("Failed to delete transaction");
      } else {
        toast.success("Transaction deleted");
        router.push("/finance");
      }
    });
  };

  return (
    <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 pt-6 border-t" style={{ borderColor: "var(--color-border)" }}>
      <Link
        href="/finance"
        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border hover:bg-accent/5 w-full sm:w-auto"
        style={{
          borderColor: "var(--color-border)",
          color: "var(--color-text-secondary)",
        }}
      >
        <ArrowLeft size={16} />
        Back to Finance
      </Link>

      <div className="flex items-center gap-2.5 w-full sm:w-auto">
        <Link
          href={`/finance/${id}/edit`}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border"
          style={{
            borderColor: "var(--color-border)",
            backgroundColor: "var(--color-surface)",
            color: "var(--color-text-primary)",
          }}
        >
          <Edit2 size={16} />
          Edit
        </Link>

        <ConfirmDialog
          title="Delete Transaction"
          description="Are you sure you want to delete this transaction? This action cannot be undone."
          onConfirm={handleDelete}
        >
          <button
            disabled={isPending}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors text-white disabled:opacity-60"
            style={{ backgroundColor: "var(--color-expense)" }}
          >
            <Trash2 size={16} />
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </ConfirmDialog>
      </div>
    </div>
  );
}
