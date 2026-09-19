"use client";

import { useEffect, useRef } from "react";
import type { Company, StructuredRequirement, BuyerRequirementForm } from "@/types";
import { SupplierProfileDossier } from "./SupplierProfileDossier";
import { X, ArrowSquareOut } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";

interface BusinessProfilePreviewProps {
  company: Company | null;
  requirement?: StructuredRequirement | BuyerRequirementForm | null;
  onClose: () => void;
  onRequestQuote?: (company: Company) => void;
}

export function BusinessProfilePreview({
  company,
  requirement,
  onClose,
  onRequestQuote,
}: BusinessProfilePreviewProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (company) {
      if (!dialog.open) {
        dialog.showModal();
      }
      document.body.style.overflow = "hidden";
    } else {
      if (dialog.open) {
        dialog.close();
      }
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

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && company) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [company, onClose]);

  if (!company) return null;

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 bg-transparent p-0 m-0 max-w-none max-h-none w-full h-full backdrop:bg-ink/60 backdrop:backdrop-blur-xs overflow-y-auto"
      onClick={handleBackdropClick}
      aria-label={`Capability Dossier for ${company.name}`}
    >
      <div className="flex items-start justify-center min-h-full p-2 sm:p-4 md:p-6 lg:p-8">
        <div className="relative w-full max-w-6xl bg-paper rounded-2xl sm:rounded-3xl shadow-2xl border border-ink/[0.1] my-4 overflow-hidden">
          {/* Modal Header Bar */}
          <div className="sticky top-0 z-30 flex items-center justify-between px-5 sm:px-7 py-3.5 bg-surface/90 backdrop-blur-md border-b border-ink/[0.08]">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-copper font-bold px-2 py-0.5 rounded bg-copper/10">
                MANUFACTURING CAPABILITY DOSSIER
              </span>
              <span className="hidden sm:inline text-xs text-slate font-medium">
                · {company.name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                href={`/suppliers/${company.id}`}
                target="_blank"
                variant="secondary"
                size="sm"
                className="hidden sm:inline-flex"
                iconTrailing={<ArrowSquareOut size={13} />}
                title="Open profile in dedicated tab"
              >
                Full Page View
              </Button>

              <Button
                type="button"
                variant="icon"
                size="icon"
                onClick={onClose}
                aria-label="Close capability dossier"
              >
                <X size={18} />
              </Button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-4 sm:p-6 md:p-8">
            <SupplierProfileDossier
              company={company}
              requirement={requirement}
              onRequestQuote={() => {
                onClose();
                if (onRequestQuote) onRequestQuote(company);
              }}
              onSendInquiry={() => {
                onClose();
                if (onRequestQuote) onRequestQuote(company);
              }}
            />
          </div>
        </div>
      </div>
    </dialog>
  );
}
