"use client";

import { useEffect, useRef } from "react";
import type { Company } from "@/lib/types";
import { BusinessProfileCard } from "./BusinessProfileCard";
import { X } from "@phosphor-icons/react";

interface BusinessProfilePreviewProps {
  company: Company | null;
  onClose: () => void;
}

export function BusinessProfilePreview({
  company,
  onClose,
}: BusinessProfilePreviewProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (company) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.close();
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [company]);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!company) return null;

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 bg-transparent p-0 m-0 max-w-none max-h-none w-full h-full backdrop:bg-ink/50"
      onClick={handleBackdropClick}
      aria-label={`Profile for ${company.name}`}
    >
      <div className="flex items-start justify-center min-h-full p-4 pt-16">
        <div className="relative w-full max-w-2xl">
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 text-surface/80 hover:text-surface transition-colors p-1"
            aria-label="Close profile"
          >
            <X size={24} />
          </button>
          <BusinessProfileCard company={company} />
        </div>
      </div>
    </dialog>
  );
}
