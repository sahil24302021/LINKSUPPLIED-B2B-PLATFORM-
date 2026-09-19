"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkle, ArrowRight, ShieldCheck } from "@phosphor-icons/react";
import { openDemoModal } from "@/lib/coming-soon";
import { FADE_VARIANTS, MODAL_VARIANTS } from "@/lib/animation";

interface ComingSoonModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOpenDemo?: () => void;
}

export function ComingSoonModal({
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
  onOpenDemo: controlledOnOpenDemo,
}: ComingSoonModalProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  const isControlled = typeof controlledIsOpen === "boolean";
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  // Listen for global custom events and URL parameter ?gate=coming-soon
  useEffect(() => {
    const handleOpen = () => setInternalIsOpen(true);
    window.addEventListener("linksupplied_open_coming_soon", handleOpen);

    try {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("gate") === "coming-soon") {
        setInternalIsOpen(true);
      }
    } catch {}

    return () => {
      window.removeEventListener("linksupplied_open_coming_soon", handleOpen);
    };
  }, [pathname]);

  const handleClose = useCallback(() => {
    if (controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalIsOpen(false);
    }

    // Clean query parameter if present
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.has("gate") || url.searchParams.has("early-access")) {
        url.searchParams.delete("gate");
        url.searchParams.delete("early-access");
        window.history.replaceState({}, "", url.pathname + (url.search ? url.search : ""));
      }
    } catch {}

    // Ensure closing the modal returns to Home if not already there
    if (pathname !== "/") {
      router.push("/");
    }
  }, [controlledOnClose, pathname, router]);

  const handleGetEarlyAccess = () => {
    handleClose();
    router.push("/early-access");
  };

  const handleTryDemo = () => {
    handleClose();
    if (controlledOnOpenDemo) {
      controlledOnOpenDemo();
    } else {
      openDemoModal();
    }
  };

  // Close on Escape key & manage body scroll
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, handleClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={FADE_VARIANTS}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/65 backdrop-blur-sm overflow-y-auto"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="coming-soon-modal-title"
        >
          <motion.div
            variants={MODAL_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-surface rounded-3xl border border-ink/[0.12] w-full max-w-md shadow-2xl overflow-hidden my-auto p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top badge & close button */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-copper/10 border border-copper/20 text-copper font-mono text-[10px] uppercase font-bold tracking-wider">
                <ShieldCheck size={13} weight="bold" />
                <span>PRIVATE ACCESS & PREVIEW</span>
              </div>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Close modal"
                className="w-8 h-8 rounded-full bg-ink/[0.04] hover:bg-ink/[0.08] text-slate hover:text-ink flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X size={16} weight="bold" />
              </button>
            </div>

            {/* Content */}
            <h2
              id="coming-soon-modal-title"
              className="text-2xl sm:text-[26px] font-bold tracking-tight text-ink"
            >
              We haven&apos;t launched yet
            </h2>

            <p className="mt-3 text-xs sm:text-sm text-slate leading-relaxed">
              LINKSUPPLIED is currently onboarding select enterprise buyers and verified manufacturing partners under NDA. Apply for Early Access to be prioritized for our upcoming commercial launch, or explore our live interactive demo right now.
            </p>

            {/* Action Buttons */}
            <div className="mt-6 space-y-2.5">
              <button
                type="button"
                onClick={handleGetEarlyAccess}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-ink hover:bg-ink/90 text-surface text-xs sm:text-sm font-bold shadow-sm hover:shadow transition-all cursor-pointer active:scale-[0.99]"
              >
                <span>Get Early Access</span>
                <ArrowRight size={14} weight="bold" />
              </button>

              <button
                type="button"
                onClick={handleTryDemo}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-paper hover:bg-paper/80 border border-ink/[0.12] text-ink text-xs sm:text-sm font-semibold transition-all cursor-pointer active:scale-[0.99]"
              >
                <Sparkle size={14} weight="bold" className="text-copper" />
                <span>Try Interactive Demo</span>
              </button>
            </div>

            {/* Footnote */}
            <p className="mt-4 text-center text-[11px] text-slate/80">
              No credit card or commitment required.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
