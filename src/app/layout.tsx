import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: {
    default: "Nestly — Your little space for life.",
    template: "%s | Nestly",
  },
  description:
    "A private digital companion designed to help you organize your life with clarity and calm. No noise, just focus.",
  keywords: ["journal", "notes", "finance", "tasks", "personal", "productivity"],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://nestly.app"
  ),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <TooltipProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-primary)",
                fontSize: "0.875rem",
              },
            }}
          />
        </TooltipProvider>
      </body>
    </html>
  );
}
