"use client";

import Link from "next/link";
import { User, Plus } from "lucide-react";
import { usePathname } from "next/navigation";

export function MobileHeader() {
  const pathname = usePathname();

  return (
    <header
      className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 h-14 bg-white/95 backdrop-blur-md border-b"
      style={{ borderColor: "var(--color-border)" }}
    >
      <Link href="/dashboard" className="flex items-center gap-2">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          N
        </div>
        <div>
          <span
            className="font-semibold text-sm tracking-tight block leading-tight"
            style={{ color: "var(--color-accent)" }}
          >
            Nestly
          </span>
          <span
            className="text-[9px] uppercase font-medium tracking-wider block"
            style={{ color: "var(--color-text-muted)" }}
          >
            Digital Quiet
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-2">
        <Link
          href="/journal/new"
          className="flex items-center justify-center w-8 h-8 rounded-full text-white transition-opacity hover:opacity-90 shadow-xs"
          style={{ backgroundColor: "var(--color-accent)" }}
          title="New Entry"
        >
          <Plus size={16} />
        </Link>
        <Link
          href="/profile"
          className={`flex items-center justify-center w-8 h-8 rounded-full border transition-colors ${
            pathname.startsWith("/profile") ? "bg-accent-light" : "hover:bg-accent/5"
          }`}
          style={{
            borderColor: "var(--color-border)",
            color: pathname.startsWith("/profile")
              ? "var(--color-accent)"
              : "var(--color-text-secondary)",
          }}
          title="Profile & Settings"
        >
          <User size={15} />
        </Link>
      </div>
    </header>
  );
}
