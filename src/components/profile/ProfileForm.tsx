"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateProfile, signOut } from "@/lib/actions/profile";
import { LogOut } from "lucide-react";

interface ProfileFormProps {
  initialDisplayName: string;
  email: string;
}

export function ProfileForm({ initialDisplayName, email }: ProfileFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [displayName, setDisplayName] = useState(initialDisplayName);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await updateProfile({ display_name: displayName });
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Profile updated.");
      }
    });
  };

  const handleSignOut = async () => {
    startTransition(async () => {
      await signOut();
      router.push("/login");
      router.refresh();
    });
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleUpdate} className="space-y-6">
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            disabled
            className="w-full px-4 py-3 rounded-xl border text-sm outline-none bg-gray-50 cursor-not-allowed"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-text-secondary)",
            }}
          />
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Email cannot be changed.</p>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="display_name" className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
            Display Name
          </label>
          <input
            id="display_name"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-surface)",
              color: "var(--color-text-primary)",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={isPending || displayName === initialDisplayName}
          className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-60 text-center"
          style={{ backgroundColor: "var(--color-accent)", color: "white" }}
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </form>

      <div className="pt-8 border-t" style={{ borderColor: "var(--color-border)" }}>
        <button
          type="button"
          onClick={handleSignOut}
          disabled={isPending}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-expense/10 border border-expense/20 sm:border-transparent"
          style={{ color: "var(--color-expense)" }}
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
