"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import type { DiscoveryPath, Company } from "@/lib/types";
import { RoleSwitcher } from "@/components/discovery/RoleSwitcher";
import { RequirementForm } from "@/components/discovery/RequirementForm";
import { MatchCard } from "@/components/discovery/MatchCard";
import { BusinessProfilePreview } from "@/components/business/BusinessProfilePreview";
import { SampleDataTag } from "@/components/ui/SampleDataTag";
import {
  companies,
  heroMatchResults,
  textileMatchResults,
  industrialMatchResults,
} from "@/lib/data";
import { MagnifyingGlass } from "@phosphor-icons/react";

const matchSets: Record<string, typeof heroMatchResults> = {
  buy: heroMatchResults,
  sell: textileMatchResults,
  partners: industrialMatchResults,
  "new-market": heroMatchResults,
};

type ResolvePhase = "idle" | "interpreting" | "evaluating" | "results";

export default function DiscoverPage() {
  const [activeRole, setActiveRole] = useState<DiscoveryPath>("buy");
  const [phase, setPhase] = useState<ResolvePhase>("idle");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const reduce = useReducedMotion();

  const currentMatches = matchSets[activeRole];

  const handleSubmit = useCallback(() => {
    if (reduce) {
      setPhase("results");
      return;
    }
    setPhase("interpreting");
    setTimeout(() => setPhase("evaluating"), 600);
    setTimeout(() => setPhase("results"), 1400);
  }, [reduce]);

  const handleRoleChange = useCallback((role: DiscoveryPath) => {
    setActiveRole(role);
    setPhase("idle");
  }, []);

  const handleViewProfile = useCallback((companyId: string) => {
    const company = companies.find((c) => c.id === companyId);
    if (company) setSelectedCompany(company);
  }, []);

  return (
    <div className="py-16 md:py-24">
      <div className="grid-page">
        <div className="col-content">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-10">
            <motion.div
              className="max-w-[52ch]"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-hero text-ink">Discover</h1>
              <p className="mt-4 text-base text-slate leading-relaxed">
                Interactive demonstration of LINKSUPPLIED matching.
                Choose a path, describe what you need, and see how
                relevance-based discovery works.
              </p>
            </motion.div>
            <SampleDataTag />
          </div>

          {/* Role Switcher */}
          <div className="mb-10">
            <RoleSwitcher
              activeRole={activeRole}
              onRoleChange={handleRoleChange}
            />
          </div>

          {/* Form + Results */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* ── Left: Form ────────────────────── */}
            <div className="lg:col-span-5">
              <div
                className="bg-surface rounded-2xl p-6 sticky top-24"
                style={{ boxShadow: "var(--shadow-resting)" }}
              >
                <RequirementForm path={activeRole} onSubmit={handleSubmit} />
              </div>
            </div>

            {/* ── Right: Results ─────────────────── */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {/* Interpreting / Evaluating */}
                {(phase === "interpreting" || phase === "evaluating") && (
                  <motion.div
                    key="processing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center justify-center py-20"
                  >
                    {/* Animated dots */}
                    <div className="flex gap-1.5 mb-4">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-copper"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.4, 1, 0.4],
                          }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-slate">
                      {phase === "interpreting"
                        ? "Interpreting requirement…"
                        : "Evaluating businesses…"}
                    </p>
                  </motion.div>
                )}

                {/* Results */}
                {phase === "results" && (
                  <motion.div
                    key={`results-${activeRole}`}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <div className="flex items-center justify-between mb-5">
                      <p className="text-sm text-slate">
                        <span className="font-medium text-ink">
                          {currentMatches.length} matches found
                        </span>{" "}
                        — ranked by relevance
                      </p>
                      <SampleDataTag />
                    </div>

                    <div className="space-y-4">
                      {currentMatches.map((result, i) => (
                        <motion.div
                          key={result.company.id}
                          initial={
                            reduce ? false : { opacity: 0, y: 16 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: i * 0.08,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <MatchCard
                            result={result}
                            onViewProfile={handleViewProfile}
                            animateScore
                            entranceDelay={i * 100}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Empty state */}
                {phase === "idle" && (
                  <motion.div
                    key="placeholder"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    className="flex flex-col items-center justify-center py-20 rounded-2xl bg-ink/[0.015]"
                  >
                    <div className="w-12 h-12 rounded-xl bg-copper/8 flex items-center justify-center mb-4">
                      <MagnifyingGlass
                        size={22}
                        weight="duotone"
                        className="text-copper/40"
                      />
                    </div>
                    <p className="text-sm text-slate mb-1">
                      Fill in your requirement and click{" "}
                      <span className="font-medium text-ink">
                        &ldquo;Find matches&rdquo;
                      </span>
                    </p>
                    <p className="text-xs text-slate/50">
                      Ranked results with reasons will appear here
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Preview Modal */}
      <BusinessProfilePreview
        company={selectedCompany}
        onClose={() => setSelectedCompany(null)}
      />
    </div>
  );
}
