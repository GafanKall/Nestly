export const MOOD_OPTIONS = [
  { value: "happy", label: "Happy", emoji: "😊" },
  { value: "excited", label: "Excited", emoji: "🤩" },
  { value: "neutral", label: "Neutral", emoji: "😐" },
  { value: "tired", label: "Tired", emoji: "😴" },
  { value: "anxious", label: "Anxious", emoji: "😰" },
  { value: "sad", label: "Sad", emoji: "😢" },
  { value: "angry", label: "Angry", emoji: "😠" },
] as const;

export type MoodValue = (typeof MOOD_OPTIONS)[number]["value"];

export const PRIORITY_OPTIONS = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
] as const;

export type PriorityValue = (typeof PRIORITY_OPTIONS)[number]["value"];

export const FINANCE_CATEGORIES = [
  { value: "food", label: "Food" },
  { value: "transport", label: "Transport" },
  { value: "shopping", label: "Shopping" },
  { value: "bills", label: "Bills" },
  { value: "entertainment", label: "Entertainment" },
  { value: "education", label: "Education" },
  { value: "health", label: "Health" },
  { value: "other", label: "Other" },
] as const;

export type FinanceCategoryValue = (typeof FINANCE_CATEGORIES)[number]["value"];

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
