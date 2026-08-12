import { z } from "zod";
import { FINANCE_CATEGORIES, TRANSACTION_TYPES } from "@/lib/constants";

const categoryValues = FINANCE_CATEGORIES.map((c) => c.value) as [string, ...string[]];
const typeValues = TRANSACTION_TYPES.map((t) => t.value) as [string, ...string[]];

export const transactionSchema = z.object({
  type: z.enum(typeValues as [string, ...string[]]),
  amount: z
    .union([z.string(), z.number()])
    .transform((val) => {
      if (typeof val === "number") return val;
      if (!val || val.trim() === "") return NaN;
      // Strip dots (thousands separator in IDR) and replace comma with dot for decimals
      const clean = val.replace(/\./g, "").replace(",", ".");
      return parseFloat(clean);
    })
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Amount must be a valid number greater than zero.",
    }),
  category: z.enum(categoryValues as [string, ...string[]]),
  description: z.string().max(500, "Description too long.").optional().nullable(),
  transaction_date: z.string().min(1, "Date is required."),
});

export type TransactionInput = z.input<typeof transactionSchema>;
