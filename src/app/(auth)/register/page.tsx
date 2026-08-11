"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterInput) {
    setIsLoading(true);
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          display_name: data.display_name,
        },
      },
    });

    if (error) {
      toast.error(error.message || "Couldn't create your account.");
      setIsLoading(false);
      return;
    }

    toast.success("Account created successfully!");
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <>
      <h1
        className="text-xl font-semibold text-center mb-1"
        style={{ color: "var(--color-text-primary)" }}
      >
        Create your space.
      </h1>
      <p
        className="text-sm text-center mb-7"
        style={{ color: "var(--color-text-secondary)" }}
      >
        Sign up to get started.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Display Name */}
        <div className="space-y-1.5">
          <label
            htmlFor="display_name"
            className="text-xs font-medium"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Display Name
          </label>
          <input
            id="display_name"
            type="text"
            placeholder="What should we call you?"
            {...register("display_name")}
            className="w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors"
            style={{
              borderColor: errors.display_name ? "var(--color-expense)" : "var(--color-border)",
              backgroundColor: "var(--color-background)",
              color: "var(--color-text-primary)",
            }}
          />
          {errors.display_name && (
            <p className="text-xs" style={{ color: "var(--color-expense)" }}>
              {errors.display_name.message}
            </p>
          )}
        </div>

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

        {/* Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="text-xs font-medium"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Create a password"
              {...register("password")}
              className="w-full px-3 py-2 pr-10 rounded-lg border text-sm outline-none transition-colors"
              style={{
                borderColor: errors.password ? "var(--color-expense)" : "var(--color-border)",
                backgroundColor: "var(--color-background)",
                color: "var(--color-text-primary)",
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--color-text-muted)" }}
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
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
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirm_password"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Confirm your password"
              {...register("confirm_password")}
              className="w-full px-3 py-2 pr-10 rounded-lg border text-sm outline-none transition-colors"
              style={{
                borderColor: errors.confirm_password ? "var(--color-expense)" : "var(--color-border)",
                backgroundColor: "var(--color-background)",
                color: "var(--color-text-primary)",
              }}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--color-text-muted)" }}
            >
              {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
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
          {isLoading ? "Creating account…" : "Sign up"}
        </button>
      </form>

      <p
        className="text-center text-xs mt-5"
        style={{ color: "var(--color-text-muted)" }}
      >
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium"
          style={{ color: "var(--color-accent)" }}
        >
          Sign in
        </Link>
      </p>
    </>
  );
}
