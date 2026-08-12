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
    <div className="flex flex-wrap gap-3">
      {MOOD_OPTIONS.map((mood) => {
        const isSelected = value === mood.value;
        return (
          <button
            key={mood.value}
            type="button"
            onClick={() => onChange(mood.value as MoodValue)}
            className={cn(
              "flex flex-col items-center justify-center w-16 h-20 rounded-xl border transition-all hover:scale-105 p-2",
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
              width={36}
              height={36}
              className="object-contain mb-1"
            />
            <span
              className="text-[10px] font-medium truncate max-w-full"
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
