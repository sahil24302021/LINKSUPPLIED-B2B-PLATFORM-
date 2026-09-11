"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import type { Company } from "@/lib/types";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { SampleDataTag } from "@/components/ui/SampleDataTag";
import {
  MapPin,
  Factory,
  Package,
  Globe,
  Certificate,
  CalendarDots,
  Buildings,
  CaretDown,
} from "@phosphor-icons/react";

interface BusinessProfileCardProps {
  company: Company;
}

export function BusinessProfileCard({ company }: BusinessProfileCardProps) {
  const reduce = useReducedMotion();
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="bg-surface rounded-2xl overflow-hidden transition-shadow duration-200"
      style={{ boxShadow: "var(--shadow-floating)" }}
    >
      {/* ── Scan tier (always visible) ─────────────────────── */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-copper/10 flex items-center justify-center shrink-0">
              <Buildings size={22} weight="duotone" className="text-copper" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-ink">
                {company.name}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-slate capitalize">
                  {company.type}
                </span>
                <span className="text-silver">·</span>
                <span className="text-xs text-slate flex items-center gap-1">
                  <MapPin size={11} weight="bold" />
                  {company.location}
                </span>
                {company.capacity && (
                  <>
                    <span className="text-silver">·</span>
                    <span className="text-xs text-slate flex items-center gap-1">
                      <Factory size={11} weight="bold" />
                      {company.capacity}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          <SampleDataTag />
        </div>

        {/* Top 2 verification badges */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {company.verification.slice(0, 2).map((v) => (
            <VerificationBadge key={v.type} verification={v} compact />
          ))}
          {company.verification.length > 2 && (
            <span className="text-xs px-2 py-1 rounded-md bg-ink/[0.04] text-slate">
              +{company.verification.length - 2} more
            </span>
          )}
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 mt-4 text-xs text-slate hover:text-copper transition-colors w-full justify-center py-1"
        >
          <span>{expanded ? "Less detail" : "Full profile"}</span>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <CaretDown size={12} />
          </motion.span>
        </button>
      </div>

      {/* ── Detail tier (expandable) ──────────────────────── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 border-t border-ink/[0.05] space-y-5">
              {/* Description */}
              <p className="text-sm text-slate leading-relaxed">
                {company.description}
              </p>

              {/* Key info */}
              <div className="grid grid-cols-2 gap-3">
                {company.moq && (
                  <InfoRow
                    icon={<Package size={14} />}
                    label="Min. order"
                    value={company.moq}
                  />
                )}
                {company.yearsInBusiness && (
                  <InfoRow
                    icon={<CalendarDots size={14} />}
                    label="Established"
                    value={`${company.yearsInBusiness} years`}
                  />
                )}
              </div>

              {/* Products */}
              <div>
                <span className="text-mono-label text-slate block mb-2">
                  PRODUCTS
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {company.products.map((product) => (
                    <span
                      key={product}
                      className="text-xs px-2.5 py-1 rounded-lg bg-paper text-ink/70"
                    >
                      {product}
                    </span>
                  ))}
                </div>
              </div>

              {/* Markets */}
              <div>
                <span className="text-mono-label text-slate block mb-2">
                  MARKETS
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {company.marketsServed.map((market) => (
                    <span
                      key={market}
                      className="text-xs px-2.5 py-1 rounded-lg bg-paper text-ink/70 flex items-center gap-1"
                    >
                      <Globe size={11} />
                      {market}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              {company.certifications.length > 0 && (
                <div>
                  <span className="text-mono-label text-slate block mb-2">
                    CERTIFICATIONS
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {company.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="text-xs px-2.5 py-1 rounded-lg bg-copper/6 text-copper font-medium flex items-center gap-1"
                      >
                        <Certificate size={11} />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* All verifications */}
              <div>
                <span className="text-mono-label text-slate block mb-2">
                  VERIFICATION
                </span>
                <div className="space-y-2">
                  {company.verification.map((v) => (
                    <VerificationBadge key={v.type} verification={v} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-slate mt-0.5 shrink-0">{icon}</span>
      <div>
        <p className="text-[11px] text-slate uppercase tracking-wider">
          {label}
        </p>
        <p className="text-sm text-ink font-medium">{value}</p>
      </div>
    </div>
  );
}
