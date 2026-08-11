"use client";

import { useEffect, useState } from "react";
import { getGreeting, formatDateFull } from "@/lib/utils/format";

export function GreetingHeader({ initialName }: { initialName: string }) {
  const [greeting, setGreeting] = useState("");
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    setGreeting(getGreeting(initialName));
    setDateStr(formatDateFull(new Date()));
  }, [initialName]);

  // Avoid hydration mismatch by waiting for client render
  if (!greeting) return <div className="h-16" />;

  return (
    <div className="mb-8">
      <h1
        className="text-2xl sm:text-3xl font-semibold tracking-tight"
        style={{ color: "var(--color-text-primary)" }}
      >
        {greeting}
      </h1>
      <p
        className="text-sm mt-1"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {dateStr}
      </p>
    </div>
  );
}
