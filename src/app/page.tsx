import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpenText,
  Wallet,
  CheckSquare,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Nestly — Your little space for life.",
  description:
    "A private digital companion designed to help you organize your life with clarity and calm. No noise, just focus.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-background)" }}>
      {/* Nav */}
      <header className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5">
        <span className="font-semibold text-lg tracking-tight" style={{ color: "var(--color-text-primary)" }}>
          Nestly
        </span>
        <Link
          href="/login"
          className="text-sm font-medium transition-colors"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Login
        </Link>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 pb-20 sm:pb-24">
        {/* Badge */}
        <div
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-6 sm:mb-8"
          style={{
            backgroundColor: "var(--color-accent-light)",
            color: "var(--color-accent)",
          }}
        >
          Digital Quiet
        </div>

        {/* Headline */}
        <h1
          className="text-3xl sm:text-5xl font-semibold leading-tight max-w-xl mb-4 sm:mb-5"
          style={{ color: "var(--color-text-primary)" }}
        >
          Your personal space for thoughts, notes, money, and everyday life.
        </h1>

        {/* Subtext */}
        <p
          className="text-sm sm:text-base max-w-sm mb-8 sm:mb-10 leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          A private digital companion designed to help you organize your life
          with clarity and calm. No noise, just focus.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto max-w-xs sm:max-w-none">
          <Link
            href="/register"
            id="cta-get-started"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all w-full sm:w-auto"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "white",
            }}
          >
            Get Started
            <ArrowRight size={15} />
          </Link>
          <Link
            href="/login"
            id="cta-sign-in"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-medium border transition-all w-full sm:w-auto"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-text-secondary)",
              backgroundColor: "white",
            }}
          >
            Sign In
          </Link>
        </div>

        {/* Feature icons */}
        <div className="flex items-center justify-center gap-6 sm:gap-8 mt-10 sm:mt-14">
          {[
            { icon: BookOpenText, label: "Journal" },
            { icon: Wallet, label: "Finance" },
            { icon: CheckSquare, label: "Tasks" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center border"
                style={{
                  backgroundColor: "white",
                  borderColor: "var(--color-border)",
                }}
              >
                <Icon size={20} style={{ color: "var(--color-text-secondary)" }} />
              </div>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6">
        <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
          © 2024 Nestly. A quiet space.
        </p>
      </footer>
    </div>
  );
}
