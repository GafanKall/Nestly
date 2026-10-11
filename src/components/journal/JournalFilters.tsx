"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { MOOD_OPTIONS } from "@/lib/constants";

export function JournalFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("q") || "";
  const currentMood = searchParams.get("mood") || "";

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
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      {/* Search Input */}
      <div
        className="relative flex-1 flex items-center px-3 py-2 rounded-lg border focus-within:ring-2 focus-within:ring-accent transition-all"
        style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
      >
        <Search size={16} style={{ color: "var(--color-text-muted)" }} className="min-w-[16px]" />
        <input
          type="text"
          placeholder="Search journals..."
          defaultValue={currentSearch}
          onChange={(e) => updateFilters("q", e.target.value)}
          className="w-full pl-2 bg-transparent text-sm outline-none"
          style={{ color: "var(--color-text-primary)" }}
        />
      </div>

      {/* Mood Filter */}
      <select
        value={currentMood}
        onChange={(e) => updateFilters("mood", e.target.value)}
        className="px-3 py-2 rounded-lg border text-sm outline-none cursor-pointer"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
          color: "var(--color-text-primary)",
        }}
      >
        <option value="">All Moods</option>
        {MOOD_OPTIONS.map((mood) => (
          <option key={mood.value} value={mood.value}>
            {mood.emoji} {mood.label}
          </option>
        ))}
      </select>
    </div>
  );
}
