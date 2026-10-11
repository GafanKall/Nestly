"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search } from "lucide-react";

export function NoteFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("q") || "";

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className="mb-6">
      <div
        className="relative max-w-md flex items-center px-3 py-2 rounded-lg border focus-within:ring-2 focus-within:ring-accent transition-all"
        style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
      >
        <Search size={16} style={{ color: "var(--color-text-muted)" }} className="min-w-[16px]" />
        <input
          type="text"
          placeholder="Search notes..."
          defaultValue={currentSearch}
          onChange={(e) => updateFilters("q", e.target.value)}
          className="w-full pl-2 bg-transparent text-sm outline-none"
          style={{ color: "var(--color-text-primary)" }}
        />
      </div>
    </div>
  );
}
