"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface ConfirmDialogProps {
  children: React.ReactNode;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => Promise<void>;
  variant?: "destructive" | "default";
}

export function ConfirmDialog({
  children,
  title,
  description,
  confirmText = "Continue",
  cancelText = "Cancel",
  onConfirm,
  variant = "destructive",
}: ConfirmDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onConfirm();
      setOpen(false);
    } catch (err) {
      toast.error("An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger render={React.isValidElement(children) ? children : <button type="button">{children}</button>} />
      <AlertDialogContent style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}>
        <AlertDialogHeader>
          <AlertDialogTitle style={{ color: "var(--color-text-primary)" }}>{title}</AlertDialogTitle>
          <AlertDialogDescription style={{ color: "var(--color-text-secondary)" }}>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading} style={{ color: "var(--color-text-primary)" }}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isLoading}
            style={
              variant === "destructive"
                ? { backgroundColor: "var(--color-expense)", color: "white" }
                : { backgroundColor: "var(--color-accent)", color: "white" }
            }
          >
            {isLoading ? "Wait..." : confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
