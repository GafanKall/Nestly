"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/validations/auth";

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(data: ForgotPasswordInput) {
    setIsLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    });

    setIsLoading(false);

    if (error) {
      toast.error(error.message || "Failed to send reset email.");
      return;
    }

    setIsSuccess(true);
  }

  if (isSuccess) {
    return (
      <div className="text-center space-y-4">
        <h1
          className="text-xl font-semibold"
          style={{ color: "var(--color-text-primary)" }}
        >
          Check your email
        </h1>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          We&apos;ve sent you a link to reset your password. It might take a few minutes to arrive.
        </p>
        <div className="pt-4">
          <Link
            href="/login"
            className="text-sm font-medium transition-colors"
            style={{ color: "var(--color-accent)" }}
          >
            ← Back to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1
        className="text-xl font-semibold text-center mb-1"
        style={{ color: "var(--color-text-primary)" }}
      >
        Reset password
      </h1>
      <p
        className="text-sm text-center mb-7"
        style={{ color: "var(--color-text-secondary)" }}
      >
        Enter your email address and we&apos;ll send you a link to reset your password.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="text-xs font-medium"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            {...register("email")}
            className="w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors"
            style={{
              borderColor: errors.email ? "var(--color-expense)" : "var(--color-border)",
              backgroundColor: "var(--color-background)",
              color: "var(--color-text-primary)",
            }}
          />
          {errors.email && (
            <p className="text-xs" style={{ color: "var(--color-expense)" }}>
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 rounded-lg text-sm font-medium transition-all mt-2 disabled:opacity-60"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "white",
          }}
        >
          {isLoading ? "Sending link…" : "Send reset link"}
        </button>
      </form>

      <div className="text-center mt-5">
        <Link
          href="/login"
          className="text-xs font-medium transition-colors"
          style={{ color: "var(--color-text-muted)" }}
        >
          ← Back to login
        </Link>
      </div>
    </>
  );
}
