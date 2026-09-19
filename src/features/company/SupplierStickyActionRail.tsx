"use client";

import type { Company } from "@/types";
import { Button } from "@/components/ui/Button";
import {
  PaperPlaneTilt,
  CheckCircle,
  Headset,
  Lock,
  ChatCircleText,
} from "@phosphor-icons/react";

interface SupplierStickyActionRailProps {
  company: Company;
  onRequestQuote: () => void;
  onSendInquiry?: () => void;
}

export function SupplierStickyActionRail({
  company,
  onRequestQuote,
  onSendInquiry,
}: SupplierStickyActionRailProps) {
  const isManufacturer = company.type === "manufacturer";

  return (
    <div className="space-y-4">
      {/* Sticky Action Card */}
      <div className="bg-surface rounded-2xl border border-ink/[0.08] p-5 shadow-sm space-y-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate font-medium">
            PROCUREMENT NEXT STEP
          </span>
          <h3 className="text-base font-bold text-ink mt-0.5">
            Evaluate Commercial Quotation
          </h3>
          <p className="text-xs text-slate mt-1 leading-relaxed">
            Direct quotation pathways are open for pre-qualified buyers with active engineering drawings or CAD specifications.
          </p>
        </div>

        <div className="space-y-2 pt-1">
          <Button
            type="button"
            onClick={onRequestQuote}
            variant="primary"
            size="lg"
            className="w-full"
            iconLeading={<PaperPlaneTilt size={16} weight="bold" />}
          >
            Request a Quote
          </Button>

          {onSendInquiry && (
            <Button
              type="button"
              onClick={onSendInquiry}
              variant="secondary"
              size="md"
              className="w-full"
              iconLeading={<ChatCircleText size={15} />}
            >
              Send Inquiry Brief
            </Button>
          )}
        </div>

        {/* Verification Summary Checkmarks */}
        <div className="pt-3 border-t border-ink/[0.06] space-y-2 text-xs">
          <div className="flex items-center gap-2 text-ink">
            <CheckCircle size={14} weight="fill" className="text-emerald-700 shrink-0" />
            <span>Corporate Entity & Tax Verified</span>
          </div>

          <div className="flex items-center gap-2 text-ink">
            <CheckCircle size={14} weight="fill" className="text-emerald-700 shrink-0" />
            <span>
              {isManufacturer
                ? "Physical Plant Audited On-Site"
                : "Commercial Warehouse Verified"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-ink">
            <CheckCircle size={14} weight="fill" className="text-emerald-700 shrink-0" />
            <span>Mutual Non-Disclosure Protected</span>
          </div>
        </div>

        {/* NDA notice */}
        <div className="bg-ink/[0.02] border border-ink/[0.06] rounded-xl p-3 flex items-start gap-2 text-[11px] text-slate">
          <Lock size={14} className="text-copper shrink-0 mt-0.5" />
          <p className="leading-snug">
            Technical files and drawings are encrypted and transmitted exclusively under executed reciprocal NDAs.
          </p>
        </div>
      </div>

      {/* Sourcing Desk Help Card */}
      <div className="bg-paper/70 rounded-2xl border border-ink/[0.06] p-4 text-xs space-y-2">
        <div className="flex items-center gap-2 text-ink font-semibold">
          <Headset size={16} className="text-copper" />
          <span>Need Dedicated Supplier Audit?</span>
        </div>
        <p className="text-slate text-[11px] leading-relaxed">
          Our engineering desk can execute custom facility inspections, pilot sample lot audits, or witness testing on your behalf.
        </p>
        <span className="text-copper font-mono text-[11px] font-semibold block">
          sourcing@linksupplied.com
        </span>
      </div>
    </div>
  );
}
