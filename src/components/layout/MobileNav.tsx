"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Book,
  FileText,
  Wallet,
  CheckCircle2,
} from "lucide-react";

const mobileNavItems = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/journal", label: "Journal", icon: Book },
  { href: "/notes", label: "Notes", icon: FileText },
  { href: "/finance", label: "Finance", icon: Wallet },
  { href: "/tasks", label: "Tasks", icon: CheckCircle2 },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t pb-safe flex items-center justify-around px-2 h-[68px]"
      style={{ borderColor: "var(--color-border)" }}
    >
      {mobileNavItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center justify-center w-full h-full space-y-1"
          >
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                isActive ? "bg-accent-light" : "bg-transparent"
              }`}
              style={{
                backgroundColor: isActive ? "var(--color-accent-light)" : "transparent",
              }}
            >
              <item.icon
                size={20}
                strokeWidth={isActive ? 2.5 : 2}
                style={{
                  color: isActive ? "var(--color-accent)" : "var(--color-text-secondary)",
                }}
              />
            </div>
            <span
              className="text-[10px] font-medium"
              style={{
                color: isActive ? "var(--color-accent)" : "var(--color-text-secondary)",
              }}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
