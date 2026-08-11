import { PageHeader } from "@/components/ui/PageHeader";
import { TransactionForm } from "@/components/finance/TransactionForm";

export default function NewTransactionPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader title="Add Transaction" />
      <div className="card">
        <TransactionForm />
      </div>
    </div>
  );
}
