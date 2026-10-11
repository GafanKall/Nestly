import React from "react";
import Image from "next/image";
import { MOOD_OPTIONS, type MoodValue } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface MoodSelectorProps {
  value?: MoodValue | null;
  onChange: (mood: MoodValue) => void;
}

export function MoodSelector({ value, onChange }: MoodSelectorProps) {
  return (
    <div className="grid grid-cols-5 gap-2 sm:gap-3">
      {MOOD_OPTIONS.map((mood) => {
        const isSelected = value === mood.value;
        return (
          <button
            key={mood.value}
            type="button"
            onClick={() => onChange(mood.value as MoodValue)}
            className={cn(
              "flex flex-col items-center justify-center w-full aspect-4/5 sm:w-16 sm:h-20 rounded-xl border transition-all hover:scale-105 p-1.5 sm:p-2 cursor-pointer",
              isSelected ? "ring-2 ring-accent shadow-sm" : "opacity-80 hover:opacity-100"
            )}
            style={{
              backgroundColor: isSelected ? "var(--color-accent-light)" : "var(--color-surface)",
              borderColor: isSelected ? "var(--color-accent)" : "var(--color-border)",
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
              style={{ color: isSelected ? "var(--color-accent)" : "var(--color-text-secondary)" }}
            >
              {mood.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
