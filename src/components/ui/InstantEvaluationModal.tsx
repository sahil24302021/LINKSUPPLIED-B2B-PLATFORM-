"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { setDemoMode } from "@/lib/demo-mode";
import { FADE_VARIANTS, MODAL_VARIANTS } from "@/lib/animation";
import {
  X,
  ShoppingBag,
  Factory,
  FileText,
  ArrowRight,
  Sparkle,
  CheckCircle,
} from "@phosphor-icons/react";
import { ENGINEERING_PRESETS } from "@/features/discovery/constants";

interface InstantEvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InstantEvaluationModal({ isOpen, onClose }: InstantEvaluationModalProps) {
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  const handleLaunchBuyerDemo = () => {
    setDemoMode("buyer");
    onClose();
    router.push("/dashboard/buyer?demo=buyer");
  };

  const handleLaunchSupplierDemo = () => {
    setDemoMode("supplier");
    onClose();
    router.push("/dashboard/supplier?demo=supplier");
  };

  const handleLaunchWizardDemo = () => {
    setDemoMode("buyer");
    try {
      const samplePreset = ENGINEERING_PRESETS[0]?.data;
      if (samplePreset) {
        localStorage.setItem("linksupplied_requirement_form", JSON.stringify(samplePreset));
        localStorage.setItem(
          "linksupplied_requirement_draft_v2",
          JSON.stringify({
            data: samplePreset,
            savedAt: "Demo Pre-load",
            step: 6,
          })
        );
      }
    } catch {}
    onClose();
    router.push("/discover?demo=true");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={FADE_VARIANTS}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ink/60 backdrop-blur-sm overflow-y-auto"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="evaluation-modal-title"
        >
          <motion.div
            variants={MODAL_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-surface rounded-2xl sm:rounded-3xl border border-ink/[0.12] w-full max-w-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] max-h-[90dvh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
        {/* Header */}
        <div className="p-4 sm:p-8 pb-3 sm:pb-4 border-b border-ink/[0.06] flex items-start justify-between gap-3 shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-copper/10 border border-copper/20 text-copper font-mono text-[10px] uppercase font-bold tracking-wider mb-1.5 sm:mb-2">
              <Sparkle size={12} weight="bold" />
              <span>SIMULATED PRODUCT ENVIRONMENT</span>
            </div>
            <h2 id="evaluation-modal-title" className="text-xl sm:text-3xl font-bold tracking-tight text-ink">
              Instant Evaluation Mode
            </h2>
            <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-slate max-w-[56ch] leading-relaxed">
              Explore LINKSUPPLIED with authentic, pre-loaded industrial sourcing records. No signup or credentials required.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-ink/[0.04] hover:bg-ink/[0.08] text-slate hover:text-ink flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X size={16} weight="bold" />
          </button>
        </div>

        {/* Tracks Grid - Scrollable Body */}
        <div className="p-4 sm:p-8 space-y-4 overflow-y-auto flex-1 overscroll-contain">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Track 1: Buyer Persona */}
            <div className="bg-paper rounded-2xl border border-ink/[0.08] p-5 flex flex-col justify-between hover:border-copper/40 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-copper/10 text-copper flex items-center justify-center mb-3">
                  <ShoppingBag size={20} weight="bold" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate font-semibold block">
                  DEMO TRACK 01
                </span>
                <h3 className="text-base font-bold text-ink mt-0.5">
                  Enterprise Buyer Desk
                </h3>
                <p className="text-[11px] text-slate mt-1 leading-relaxed">
                  Persona: <strong className="text-ink">Alex Vance</strong>, AeroTech Hydraulics GmbH.
                </p>

                <ul className="mt-3.5 space-y-1.5 text-xs text-slate border-t border-ink/[0.06] pt-3">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-copper shrink-0" weight="fill" />
                    <span>Hydraulic valve body specifications</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-copper shrink-0" weight="fill" />
                    <span>Explainable supplier match scoring</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-copper shrink-0" weight="fill" />
                    <span>Side-by-side commercial quote bids</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={handleLaunchBuyerDemo}
                className="mt-5 w-full py-2.5 px-4 rounded-xl bg-ink hover:bg-black text-surface text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
              >
                <span>Launch Buyer Demo</span>
                <ArrowRight size={13} weight="bold" />
              </button>
            </div>

            {/* Track 2: Supplier Persona */}
            <div className="bg-paper rounded-2xl border border-ink/[0.08] p-5 flex flex-col justify-between hover:border-copper/40 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-ink/[0.06] text-ink flex items-center justify-center mb-3">
                  <Factory size={20} weight="bold" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate font-semibold block">
                  DEMO TRACK 02
                </span>
                <h3 className="text-base font-bold text-ink mt-0.5">
                  Manufacturer Factory Desk
                </h3>
                <p className="text-[11px] text-slate mt-1 leading-relaxed">
                  Persona: <strong className="text-ink">PrecisionCast Engineering</strong> (Tier-4 Plant).
                </p>

                <ul className="mt-3.5 space-y-1.5 text-xs text-slate border-t border-ink/[0.06] pt-3">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-emerald-600 shrink-0" weight="fill" />
                    <span>Inbound buyer RFQ inbox & drawings</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-emerald-600 shrink-0" weight="fill" />
                    <span>Submit itemized piece price & NRE</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-emerald-600 shrink-0" weight="fill" />
                    <span>Audited machinery & CMM metrology</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={handleLaunchSupplierDemo}
                className="mt-5 w-full py-2.5 px-4 rounded-xl bg-copper hover:bg-copper-dark text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
              >
                <span>Launch Supplier Demo</span>
                <ArrowRight size={13} weight="bold" />
              </button>
            </div>
          </div>

          {/* Optional Track 3: Sourcing Wizard Walkthrough */}
          <div className="p-4 rounded-2xl bg-copper/[0.04] border border-copper/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-copper/10 text-copper flex items-center justify-center shrink-0">
                <FileText size={17} weight="bold" />
              </div>
              <div>
                <strong className="text-ink block">Looking to test the Sourcing Intake Engine?</strong>
                <span className="text-slate text-[11px]">
                  Walk through the 6-step wizard pre-loaded with a 5-Axis CNC hydraulic manifold brief.
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLaunchWizardDemo}
              className="px-3.5 py-1.5 rounded-lg border border-copper/30 bg-surface hover:bg-copper/10 text-copper font-semibold text-xs transition-colors shrink-0 cursor-pointer text-center"
            >
              Test Wizard with Sample Data
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="p-3.5 sm:p-5 bg-ink/[0.02] border-t border-ink/[0.06] text-[11px] text-slate text-center shrink-0">
          Notice: In Demo Mode, you can exit anytime using the persistent top banner. Real sourcing submissions remain 100% confidential.
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
