"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Feather } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginInput) {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      toast.error("Couldn't sign you in. Please check your credentials.");
      setIsLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <>
      {/* Avatar placeholder */}
      <div className="flex justify-center mb-5">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "var(--color-accent-light)", color: "var(--color-accent)" }}
        >
          <Feather size={20} />
        </div>
      </div>

      <h1
        className="text-xl font-semibold text-center mb-1"
        style={{ color: "var(--color-text-primary)" }}
      >
        Welcome back to your space.
      </h1>
      <p
        className="text-sm text-center mb-7"
        style={{ color: "var(--color-text-secondary)" }}
      >
        Please enter your details to sign in.
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

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-xs font-medium"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs transition-colors"
              style={{ color: "var(--color-text-muted)" }}
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
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

        {/* Submit */}
        <button
          id="btn-login"
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 rounded-lg text-sm font-medium transition-all mt-2 disabled:opacity-60"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "white",
          }}
        >
          {isLoading ? "Signing in…" : "Login"}
        </button>
      </form>

      <p
        className="text-center text-xs mt-5"
        style={{ color: "var(--color-text-muted)" }}
      >
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium"
          style={{ color: "var(--color-accent)" }}
        >
          Sign up
        </Link>
      </p>
    </>
  );
}
