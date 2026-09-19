"use client";

import { useState } from "react";
import { VERIFICATION_LAYER_DETAILS } from "@/data";
import { VerificationStatus } from "./VerificationStatus";
import { SampleDataTag } from "@/components/ui/SampleDataTag";
import {
  CheckCircle,
  FileText,
  MagnifyingGlass,
  CaretDown,
} from "@phosphor-icons/react";

export function VerificationExplorer() {
  const layers = VERIFICATION_LAYER_DETAILS;
  const [activeKey, setActiveKey] = useState<string>("capability");
  // For mobile accordion
  const [expandedKey, setExpandedKey] = useState<string>("capability");

  const activeLayer = layers.find((l) => l.key === activeKey) || layers[2];

  const handleMobileToggle = (key: string) => {
    setExpandedKey((prev) => (prev === key ? "" : key));
  };

  return (
    <div className="space-y-6">
      {/* ── Desktop View (Hidden on mobile) ─────────────────── */}
      <div className="hidden md:grid grid-cols-12 gap-6 bg-surface rounded-2xl md:rounded-3xl border border-ink/[0.08] p-6 lg:p-8 shadow-xs">
        {/* Left Layer Navigation Track (5 cols) */}
        <div className="col-span-5 space-y-2 border-r border-ink/[0.06] pr-6">
          <div className="mb-4 pb-3 border-b border-ink/[0.06] flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate font-semibold">
              SIX VERIFICATION LAYERS
            </span>
            <span className="text-[10px] font-mono text-copper font-medium">
              Click layer to inspect
            </span>
          </div>

          {layers.map((layer) => {
            const isActive = layer.key === activeKey;

            return (
              <button
                key={layer.key}
                type="button"
                onClick={() => setActiveKey(layer.key)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                  isActive
                    ? "bg-paper border-copper/30 shadow-xs ring-1 ring-copper/20"
                    : "bg-surface border-transparent hover:bg-paper/50 hover:border-ink/[0.06]"
                }`}
                aria-selected={isActive}
                role="tab"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`font-mono text-xs font-bold shrink-0 ${
                      isActive ? "text-copper" : "text-slate/60"
                    }`}
                  >
                    {layer.number}
                  </span>
                  <div className="min-w-0">
                    <p
                      className={`text-sm font-bold truncate ${
                        isActive ? "text-ink" : "text-slate hover:text-ink"
                      }`}
                    >
                      {layer.title}
                    </p>
                    <p className="text-[11px] text-slate/70 truncate mt-0.5">
                      {layer.tagline}
                    </p>
                  </div>
                </div>

                <VerificationStatus status={layer.sampleStatus} size="sm" />
              </button>
            );
          })}
        </div>

        {/* Right Dynamic Inspection Panel (7 cols) */}
        <div className="col-span-7 pl-2 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-ink/[0.06]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-copper">
                    LAYER {activeLayer.number}
                  </span>
                  <span className="text-silver">·</span>
                  <span className="text-xs font-mono uppercase text-slate">
                    AUDIT SPECIFICATION
                  </span>
                  <SampleDataTag />
                </div>
                <h3 className="text-2xl font-bold text-ink tracking-tight">
                  {activeLayer.title}
                </h3>
                <p className="text-xs text-slate mt-1 leading-relaxed">
                  {activeLayer.description}
                </p>
              </div>

              <VerificationStatus status={activeLayer.sampleStatus} size="lg" />
            </div>

            {/* What We Examine */}
            <div className="space-y-2">
              <h4 className="font-mono uppercase text-[11px] font-bold text-ink tracking-wider flex items-center gap-1.5">
                <MagnifyingGlass size={14} className="text-copper" />
                What LINKSUPPLIED Examines
              </h4>
              <div className="bg-paper p-4 rounded-xl border border-ink/[0.06] space-y-1.5 text-xs text-ink">
                {activeLayer.whatWeExamine.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-copper mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Evidence Required */}
            <div className="space-y-2">
              <h4 className="font-mono uppercase text-[11px] font-bold text-ink tracking-wider flex items-center gap-1.5">
                <FileText size={14} className="text-copper" />
                Evidence Checked by Sourcing Desk
              </h4>
              <div className="bg-surface p-4 rounded-xl border border-ink/[0.08] space-y-1.5 text-xs text-slate">
                {activeLayer.evidenceRequired.map((ev, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-emerald-600 mt-0.5 shrink-0" weight="fill" />
                    <span className="text-ink">{ev}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Methodology & Why It Matters */}
            <div className="grid grid-cols-1 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-xl bg-paper/60 border border-ink/[0.04] space-y-1">
                <span className="text-[10px] font-mono uppercase text-copper font-bold block">
                  Why this matters for your procurement team
                </span>
                <p className="text-xs text-slate leading-relaxed">
                  {activeLayer.whyItMatters}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-ink/[0.06] flex items-center justify-between text-xs text-slate">
            <span className="font-mono text-[11px]">
              Audit Method: <strong className="text-ink">{activeLayer.auditMethodology}</strong>
            </span>
            <span className="font-mono text-[10px] text-slate/70">
              Ref: {activeLayer.sampleEvidenceRef}
            </span>
          </div>
        </div>
      </div>

      {/* ── Mobile Accordion View (Under 768px) ─────────────── */}
      <div className="md:hidden space-y-3">
        {layers.map((layer) => {
          const isExpanded = expandedKey === layer.key;

          return (
            <div
              key={layer.key}
              className="bg-surface rounded-xl border border-ink/[0.08] shadow-xs overflow-hidden"
            >
              <button
                type="button"
                onClick={() => handleMobileToggle(layer.key)}
                className="w-full text-left p-4 min-h-[48px] flex items-center justify-between gap-2 transition-colors active:bg-paper"
                aria-expanded={isExpanded}
                aria-controls={`layer-detail-${layer.key}`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="font-mono text-xs font-bold text-copper shrink-0">
                    {layer.number}
                  </span>
                  <div className="min-w-0">
                    <p className="font-bold text-ink text-sm truncate">
                      {layer.title}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <VerificationStatus status={layer.sampleStatus} size="sm" />
                  <CaretDown
                    size={16}
                    className={`text-slate transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {isExpanded && (
                <div
                  id={`layer-detail-${layer.key}`}
                  className="p-4 pt-1 border-t border-ink/[0.06] bg-paper/30 space-y-3 text-xs"
                >
                  <p className="text-slate leading-relaxed">
                    {layer.description}
                  </p>

                  <div className="space-y-1.5">
                    <span className="font-mono uppercase text-[10px] font-bold text-ink block">
                      What We Examine:
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-slate text-[11px]">
                      {layer.whatWeExamine.map((ex, i) => (
                        <li key={i}>{ex}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-ink/[0.04]">
                    <span className="font-mono uppercase text-[10px] font-bold text-ink block">
                      Why It Matters:
                    </span>
                    <p className="text-[11px] text-slate leading-relaxed">
                      {layer.whyItMatters}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
