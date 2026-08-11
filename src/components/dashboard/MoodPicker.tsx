"use client";

import { useRouter } from "next/navigation";
import { MOOD_OPTIONS } from "@/lib/constants";

export function MoodPicker() {
  const router = useRouter();

  const handleMoodSelect = (moodValue: string) => {
    // Navigate to new journal entry with mood pre-filled in query params
    router.push(`/journal/new?mood=${moodValue}`);
  };

  // Only show the first 5 for the dashboard quick picker
  const dashboardMoods = MOOD_OPTIONS.slice(0, 5);

  return (
    <div className="mb-8">
      <p
        className="text-sm font-medium mb-3"
        style={{ color: "var(--color-text-primary)" }}
      >
        How are you feeling today?
      </p>
      <div className="flex flex-wrap gap-3">
        {dashboardMoods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => handleMoodSelect(mood.value)}
            className="flex flex-col items-center justify-center w-16 h-20 rounded-xl border transition-all hover:scale-105"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
            }}
          >
            <span className="text-2xl mb-1">{mood.emoji}</span>
            <span
              className="text-[10px] font-medium"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {mood.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
