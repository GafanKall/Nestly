import React, { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export function TagInput({ value = [], onChange, placeholder = "Add tags..." }: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = inputValue.trim().toLowerCase();
      if (newTag && !value.includes(newTag)) {
        onChange([...value, newTag]);
      }
      setInputValue("");
    } else if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const removeTag = (indexToRemove: number) => {
    onChange(value.filter((_, i) => i !== indexToRemove));
  };

  return (
    <div
      className="flex flex-wrap items-center gap-2 p-2 rounded-lg border focus-within:ring-2 focus-within:ring-accent transition-colors min-h-[42px]"
      style={{
        backgroundColor: "var(--color-background)",
        borderColor: "var(--color-border)",
      }}
    >
      {value.map((tag, index) => (
        <span
          key={index}
          className="flex items-center gap-1 px-2 py-1 rounded bg-white text-xs font-medium border"
          style={{ borderColor: "var(--color-border)", color: "var(--color-text-primary)" }}
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(index)}
            className="hover:text-expense transition-colors outline-none"
            style={{ color: "var(--color-text-muted)" }}
          >
            <X size={12} />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={value.length === 0 ? placeholder : ""}
        className="flex-1 bg-transparent text-sm outline-none min-w-[80px] py-1"
        style={{ color: "var(--color-text-primary)" }}
      />
    </div>
  );
}
