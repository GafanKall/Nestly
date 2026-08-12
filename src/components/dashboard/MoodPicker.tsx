"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { MOOD_OPTIONS } from "@/lib/constants";

export function MoodPicker() {
  const router = useRouter();

  const handleMoodSelect = (moodValue: string) => {
    router.push(`/journal/new?mood=${moodValue}`);
  };

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
            className="flex flex-col items-center justify-center w-16 h-20 rounded-xl border transition-all hover:scale-105 p-2"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
            }}
          >
            <Image
              src={mood.iconUrl}
              alt={mood.label}
              width={36}
              height={36}
              className="object-contain mb-1"
            />
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
