"use client";

import { useEffect } from "react";
import { Trash2, Loader2 } from "lucide-react";

interface ConfirmDeleteModalProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

/**
 * Reusable styled confirmation modal replacing browser-native confirm() dialogs.
 */
export default function ConfirmDeleteModal({
  open,
  title,
  description,
  confirmLabel = "Yes, Delete",
  loading = false,
  onCancel,
  onConfirm,
}: ConfirmDeleteModalProps) {
  useEffect(() => {
    if (!open || loading) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, loading, onCancel]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-delete-title"
      onClick={() => !loading && onCancel()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 backdrop-blur-xs p-4 animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150"
      >
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 border border-red-100 text-red-600">
            <Trash2 className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h4
              id="confirm-delete-title"
              className="font-bold text-slate-900 text-sm sm:text-base"
            >
              {title}
            </h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed break-words">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            disabled={loading}
            onClick={onCancel}
            className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 hover:bg-red-700 px-4 py-2 text-xs font-bold text-white shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
          >
            {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            <span>{loading ? "Deleting..." : confirmLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

