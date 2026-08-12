"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { resetPasswordSchema, type ResetPasswordInput } from "@/lib/validations/auth";

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  async function onSubmit(data: ResetPasswordInput) {
    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });

    setIsLoading(false);

    if (error) {
      toast.error(error.message || "Failed to reset password.");
      return;
    }

    toast.success("Password updated successfully!");
    router.push("/login");
  }

  return (
    <>
      <h1
        className="text-xl font-semibold text-center mb-1"
        style={{ color: "var(--color-text-primary)" }}
      >
        Set new password
      </h1>
      <p
        className="text-sm text-center mb-7"
        style={{ color: "var(--color-text-secondary)" }}
      >
        Please enter your new password below.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* New Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="text-xs font-medium"
            style={{ color: "var(--color-text-secondary)" }}
          >
            New Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            {...register("password")}
            className="w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors"
            style={{
              borderColor: errors.password ? "var(--color-expense)" : "var(--color-border)",
              backgroundColor: "var(--color-background)",
              color: "var(--color-text-primary)",
            }}
          />
          {errors.password && (
            <p className="text-xs" style={{ color: "var(--color-expense)" }}>
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="confirm_password"
            className="text-xs font-medium"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Confirm New Password
          </label>
          <input
            id="confirm_password"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            {...register("confirm_password")}
            className="w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors"
            style={{
              borderColor: errors.confirm_password ? "var(--color-expense)" : "var(--color-border)",
              backgroundColor: "var(--color-background)",
              color: "var(--color-text-primary)",
            }}
          />
          {errors.confirm_password && (
            <p className="text-xs" style={{ color: "var(--color-expense)" }}>
              {errors.confirm_password.message}
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
          {isLoading ? "Updating password..." : "Reset password"}
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
