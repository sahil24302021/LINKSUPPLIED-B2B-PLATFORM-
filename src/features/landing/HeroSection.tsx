"use client";

import { useState } from "react";
import { Cta69 } from "@/components/ui/cta69";
import { ShoppingBag, Factory, Sparkle, ArrowRight } from "@phosphor-icons/react";
import { InstantEvaluationModal } from "@/components/ui/InstantEvaluationModal";

export function HeroSection() {
  const [evalModalOpen, setEvalModalOpen] = useState(false);

  return (
    <>
      <Cta69
        badge={{ label: "STRUCTURED INDUSTRIAL SOURCING" }}
        heading={
          <>
            Find the manufacturing capability
            <br />
            <span className="text-copper">that actually fits your requirement.</span>
          </>
        }
        button={{
          label: "Submit a requirement",
          href: "/login",
        }}
        secondaryButton={{
          label: "I'm a supplier →",
          href: "/login",
        }}
        labels={{
          marqueePhrase: "Find the ones that fit",
          note: "Submit technical requirements once. LINKSUPPLIED helps you identify relevant manufacturing capabilities, inspect verification evidence, and request direct quotations.",
          footnote: "Structured specifications · Multi-tier verification framework · Explainable match criteria",
        }}
      >
        {/* ── Dual Entry Orientation Strip ─────────────────────── */}
        <div className="mt-3 sm:mt-4 pt-4 sm:pt-6 border-t border-ink/[0.06] grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 max-w-2xl mx-auto text-left">
          <div className="p-2.5 sm:p-3.5 rounded-xl bg-surface/70 border border-ink/[0.06] flex items-start gap-2.5 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-copper/10 text-copper flex items-center justify-center shrink-0 mt-0.5">
              <ShoppingBag size={15} weight="bold" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-ink">For Procurement Teams</h2>
              <p className="text-[11px] text-slate mt-0.5 leading-snug">
                Specify batch size, tolerances, and materials to receive ranked, verified matches.
              </p>
            </div>
          </div>

          <div className="p-2.5 sm:p-3.5 rounded-xl bg-surface/70 border border-ink/[0.06] flex items-start gap-2.5 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-ink/[0.05] text-ink flex items-center justify-center shrink-0 mt-0.5">
              <Factory size={15} weight="bold" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-ink">For Manufacturers</h2>
              <p className="text-[11px] text-slate mt-0.5 leading-snug">
                Get discovered for the machine capabilities and capacity you actually operate.
              </p>
            </div>
          </div>
        </div>

        {/* ── Instant Evaluation Mode Launcher ─────────────────── */}
        <div className="mt-3 sm:mt-4 flex items-center justify-center">
          <button
            type="button"
            onClick={() => setEvalModalOpen(true)}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-medium text-slate hover:text-copper bg-surface/80 hover:bg-surface border border-ink/[0.08] hover:border-copper/35 transition-all cursor-pointer shadow-2xs group"
          >
            <Sparkle size={12} className="text-copper group-hover:rotate-12 transition-transform" weight="bold" />
            <span className="hidden xs:inline">Evaluating the platform?</span>
            <span className="font-semibold text-copper underline underline-offset-2">
              Instant Evaluation Mode
            </span>
            <ArrowRight size={11} className="text-copper" />
          </button>
        </div>
      </Cta69>

      <InstantEvaluationModal
        isOpen={evalModalOpen}
        onClose={() => setEvalModalOpen(false)}
      />
    </>
  );
}
