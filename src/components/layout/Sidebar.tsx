"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Book,
  FileText,
  Wallet,
  CheckCircle2,
  Settings,
  LifeBuoy,
  Plus,
} from "lucide-react";

const mainNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/journal", label: "Journal", icon: Book },
  { href: "/notes", label: "Notes", icon: FileText },
  { href: "/finance", label: "Finance", icon: Wallet },
  { href: "/tasks", label: "Tasks", icon: CheckCircle2 },
];

const bottomNavItems = [
  { href: "/profile", label: "Settings", icon: Settings },
  { href: "/support", label: "Support", icon: LifeBuoy },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden md:flex flex-col w-64 border-r fixed inset-y-0 z-50 bg-white"
      style={{ borderColor: "var(--color-border)" }}
    >
      {/* Logo Area */}
      <div className="h-20 flex items-center px-6 mb-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            <span className="font-bold text-sm">N</span>
          </div>
          <div>
            <h2
              className="font-semibold tracking-tight text-sm"
              style={{ color: "var(--color-accent)" }}
            >
              Nestly
            </h2>
            <p
              className="text-[10px] uppercase font-medium tracking-wider"
              style={{ color: "var(--color-text-muted)" }}
            >
              Digital Quiet
            </p>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {mainNavItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? "bg-accent/10" : "hover:bg-accent/5"
              }`}
              style={{
                backgroundColor: isActive ? "var(--color-accent-light)" : "transparent",
                color: isActive ? "var(--color-accent)" : "var(--color-text-secondary)",
              }}
            >
              <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 space-y-4">
        <Link
          href="/journal/new" // Defaulting new entry to journal
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-medium transition-all"
          style={{ backgroundColor: "var(--color-accent)", color: "white" }}
        >
          <Plus size={16} />
          New Entry
        </Link>

        <div className="space-y-1 pt-2 border-t" style={{ borderColor: "var(--color-border)" }}>
          {bottomNavItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-colors hover:bg-accent/5`}
                style={{
                  color: isActive ? "var(--color-accent)" : "var(--color-text-secondary)",
                }}
              >
                <item.icon size={15} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
