export const MOOD_OPTIONS = [
  { value: "happy", label: "Happy", emoji: "😊", iconUrl: "/assets/emoticon/nestly_happy.png" },
  { value: "excited", label: "Excited", emoji: "🤩", iconUrl: "/assets/emoticon/nestly_excited.png" },
  { value: "neutral", label: "Neutral", emoji: "😐", iconUrl: "/assets/emoticon/nestly_neutral.png" },
  { value: "tired", label: "Tired", emoji: "😴", iconUrl: "/assets/emoticon/nestly_tired.png" },
  { value: "anxious", label: "Anxious", emoji: "😰", iconUrl: "/assets/emoticon/nestly_anxious.png" },
] as const;

export type MoodValue = (typeof MOOD_OPTIONS)[number]["value"];

export const PRIORITY_OPTIONS = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
] as const;

export type PriorityValue = (typeof PRIORITY_OPTIONS)[number]["value"];

export const EXPENSE_CATEGORIES = [
  { value: "food", label: "Food & Dining" },
  { value: "transport", label: "Transportation" },
  { value: "shopping", label: "Shopping" },
  { value: "bills", label: "Bills & Utilities" },
  { value: "entertainment", label: "Entertainment" },
  { value: "education", label: "Education" },
  { value: "health", label: "Health & Fitness" },
  { value: "housing", label: "Housing & Rent" },
  { value: "other_expense", label: "Other Expense" },
] as const;

export const INCOME_CATEGORIES = [
  { value: "salary", label: "Salary & Wages" },
  { value: "freelance", label: "Freelance & Projects" },
  { value: "investment", label: "Investment & Dividends" },
  { value: "business", label: "Business" },
  { value: "gift", label: "Gift & Allowance" },
  { value: "bonus", label: "Bonus & Rewards" },
  { value: "other_income", label: "Other Income" },
] as const;

export const FINANCE_CATEGORIES = [
  ...EXPENSE_CATEGORIES,
  ...INCOME_CATEGORIES,
  { value: "other", label: "Other" },
] as const;

export type FinanceCategoryValue = (typeof FINANCE_CATEGORIES)[number]["value"];

export const getCategoryLabel = (categoryValue: string): string => {
  const found = FINANCE_CATEGORIES.find((c) => c.value === categoryValue);
  if (found) return found.label;
  return categoryValue.charAt(0).toUpperCase() + categoryValue.slice(1);
};

export const TRANSACTION_TYPES = [
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" },
] as const;

export type TransactionTypeValue = (typeof TRANSACTION_TYPES)[number]["value"];

export const TASK_STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
] as const;

export type TaskStatusValue = (typeof TASK_STATUSES)[number]["value"];
