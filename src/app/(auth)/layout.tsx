import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* Logo */}
      <Link href="/" className="mb-8">
        <span
          className="text-xl font-semibold tracking-tight"
          style={{ color: "var(--color-text-primary)" }}
        >
          Nestly
        </span>
      </Link>

      {/* Card */}
      <div
        className="w-full max-w-[380px] rounded-2xl border p-5 sm:p-8"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
          boxShadow: "0 1px 20px rgba(0,0,0,0.05)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
