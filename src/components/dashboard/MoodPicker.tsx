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
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {dashboardMoods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => handleMoodSelect(mood.value)}
            className="flex flex-col items-center justify-center w-full aspect-4/5 sm:w-16 sm:h-20 rounded-xl border transition-all hover:scale-105 p-1.5 sm:p-2 cursor-pointer"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
            }}
          >
            <Image
              src={mood.iconUrl}
              alt={mood.label}
              width={32}
              height={32}
              className="object-contain mb-1 w-6 h-6 sm:w-8 sm:h-8"
            />
            <span
              className="text-[9px] sm:text-[10px] font-medium truncate max-w-full"
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
