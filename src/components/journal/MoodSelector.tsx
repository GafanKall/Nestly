import React from "react";
import { MOOD_OPTIONS, type MoodValue } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface MoodSelectorProps {
  value?: MoodValue | null;
  onChange: (mood: MoodValue) => void;
}

export function MoodSelector({ value, onChange }: MoodSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {MOOD_OPTIONS.map((mood) => {
        const isSelected = value === mood.value;
        return (
          <button
            key={mood.value}
            type="button"
            onClick={() => onChange(mood.value as MoodValue)}
            className={cn(
              "flex flex-col items-center justify-center w-14 h-16 rounded-xl border transition-all hover:scale-105",
              isSelected ? "ring-2 ring-accent" : ""
            )}
            style={{
              backgroundColor: isSelected ? "var(--color-accent-light)" : "var(--color-surface)",
              borderColor: isSelected ? "var(--color-accent)" : "var(--color-border)",
            }}
          >
            <span className="text-xl mb-1">{mood.emoji}</span>
            <span
              className="text-[10px] font-medium"
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
