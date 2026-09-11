// src/components/discovery/ResolutionPanel.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import FactorBarChart from "@/components/ui/FactorBarChart";
import type { MatchResult, MatchFactor } from "@/lib/types";
import { ShieldCheck, MapPin, Factory } from "@phosphor-icons/react";

interface ResolutionPanelProps {
  requirement: string;
  matchResults: MatchResult[];
  isTriggered: boolean;
}

const defaultFactors: MatchFactor[] = [
  { label: "Product fit", value: 95 },
  { label: "Capacity", value: 88 },
  { label: "Certifications", value: 92 },
  { label: "Market experience", value: 85 },
  { label: "Location", value: 78 },
];

const understoodFields = [
  { label: "Product", value: "Glass cosmetic bottles" },
  { label: "Volume", value: "50,000 units/month" },
  { label: "Certification", value: "ISO 9001" },
  { label: "Market", value: "EU export" },
];

type Phase =
  | "idle"
  | "parsing"
  | "evaluating"
  | "factors"
  | "discovery"
  | "result"
  | "complete";

function getScoreColor(score: number) {
  if (score >= 80) return "text-success";
  if (score >= 60) return "text-copper";
  return "text-warning";
}

export default function ResolutionPanel({
  requirement,
  matchResults,
  isTriggered,
}: ResolutionPanelProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [displayRequirement, setDisplayRequirement] = useState("");
  const [scoreDisplay, setScoreDisplay] = useState(0);

  const primary = matchResults[0];
  const candidates = matchResults.slice(0, 3);
  const factors = primary?.factors || defaultFactors;

  // ── Single coordinated GSAP timeline drives the entire phase
  // sequence. gsap.context scopes every tween/call created inside it
  // to this component instance, so ctx.revert() on cleanup guarantees
  // no leftover timers/tweens can fire into an unmounted/retriggered
  // panel — this mirrors the gsap.context pattern already used in
  // PinnedPipeline for the same reason.
  useEffect(() => {
    if (!isTriggered || !requirement || !primary) {
      const id = requestAnimationFrame(() => {
        setPhase("idle");
        setDisplayRequirement("");
        setScoreDisplay(0);
      });
      return () => cancelAnimationFrame(id);
    }

    if (reducedMotion || !containerRef.current) {
      const id = requestAnimationFrame(() => {
        setDisplayRequirement(requirement);
        setPhase("complete");
        setScoreDisplay(primary.matchScore);
      });
      return () => cancelAnimationFrame(id);
    }

    let cancelRaf: number | null = null;
    const ctx = gsap.context(() => {
      cancelRaf = requestAnimationFrame(() => {
        setDisplayRequirement(requirement);
        setScoreDisplay(0);
      });
      const tl = gsap.timeline();

      tl.call(() => setPhase("parsing"))
        .call(() => setPhase("evaluating"), undefined, "+=0.55")
        .call(() => setPhase("factors"), undefined, "+=0.45")
        // Bars finish filling ~1.02s after "factors" starts
        // (5 factors * 80ms stagger + 700ms fill duration). Hold a
        // beat longer so the evaluated state registers before
        // candidates appear.
        .call(() => setPhase("discovery"), undefined, "+=1.15")
        .call(
          () => {
            setPhase("result");
            const scoreTarget = { v: 0 };
            gsap.to(scoreTarget, {
              v: primary.matchScore,
              duration: 0.8,
              ease: "power3.out",
              onUpdate: () => setScoreDisplay(Math.round(scoreTarget.v)),
            });
          },
          undefined,
          "+=0.9"
        )
        .call(() => setPhase("complete"), undefined, "+=0.7");
    }, containerRef.current);

    return () => {
      if (cancelRaf) cancelAnimationFrame(cancelRaf);
      ctx.revert();
    };
  }, [isTriggered, requirement, reducedMotion, primary]);

  const isActive = phase !== "idle";
  const showParsingFields = phase === "parsing" || phase === "evaluating";
  const showFactors =
    phase === "factors" ||
    phase === "discovery" ||
    phase === "result" ||
    phase === "complete";
  const showDiscovery = phase === "discovery";
  const showResult = phase === "result" || phase === "complete";

  return (
    <div className="relative w-full h-full flex flex-col" ref={containerRef}>
      <div
        className="relative flex-1 rounded-2xl overflow-hidden border border-ink/[0.04]"
        style={{
          background:
            "linear-gradient(145deg, rgba(254,253,251,0.97) 0%, rgba(248,247,244,1) 100%)",
          boxShadow: "var(--shadow-floating)",
        }}
      >
        {/* Dot grid background */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--color-ink) 0.5px, transparent 0.5px)",
            backgroundSize: "16px 16px",
          }}
        />

        <div className="relative z-10 p-5 md:p-6 lg:p-7 flex flex-col h-full min-h-[500px] lg:min-h-[560px]">
          {/* ── Header: System status ────────────────────── */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-mono-label text-slate/60">
              LINKSUPPLIED INTELLIGENCE
            </span>
            <AnimatePresence mode="wait">
              {phase === "parsing" && (
                <motion.span
                  key="parsing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-mono-label text-copper"
                >
                  PARSING…
                </motion.span>
              )}
              {phase === "evaluating" && (
                <motion.span
                  key="evaluating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-mono-label text-copper"
                >
                  EVALUATING…
                </motion.span>
              )}
              {phase === "factors" && (
                <motion.span
                  key="factors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-mono-label text-copper"
                >
                  SCORING…
                </motion.span>
              )}
              {phase === "discovery" && (
                <motion.span
                  key="discovery"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-mono-label text-copper"
                >
                  COMPARING…
                </motion.span>
              )}
              {(phase === "result" || phase === "complete") && (
                <motion.span
                  key="done"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-mono-label text-success"
                >
                  MATCHED
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* ── Requirement display ─────────────────────── */}
          <div className="mb-5">
            <span className="text-mono-label text-copper/70 mb-1.5 block text-[10px]">
              REQUIREMENT
            </span>
            <AnimatePresence mode="wait">
              {displayRequirement ? (
                <motion.p
                  key={displayRequirement}
                  initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="text-sm text-ink font-medium leading-relaxed"
                >
                  &ldquo;{displayRequirement}&rdquo;
                </motion.p>
              ) : (
                <p className="text-sm text-silver/50 italic">
                  Awaiting requirement…
                </p>
              )}
            </AnimatePresence>
          </div>

          {/* ── Sweep divider ──────────────────────────── */}
          <AnimatePresence>
            {isActive && (
              <div className="relative h-px mb-5">
                <motion.div
                  className="absolute inset-y-0 left-0 h-px bg-copper/50"
                  initial={reducedMotion ? { width: "100%" } : { width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="absolute inset-0 h-px bg-ink/[0.04]" />
              </div>
            )}
          </AnimatePresence>

          {/* ── Parsed fields (brief flash during parsing) ─ */}
          <AnimatePresence>
            {showParsingFields && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="mb-4 space-y-1.5 overflow-hidden"
              >
                <span className="text-mono-label text-slate/50 text-[10px]">
                  UNDERSTOOD
                </span>
                {understoodFields.map((field, i) => (
                  <motion.div
                    key={field.label}
                    className="flex items-baseline gap-3"
                    initial={reducedMotion ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.3 }}
                  >
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate/40 w-20 shrink-0">
                      {field.label}
                    </span>
                    <span className="text-xs text-ink/80 font-medium">
                      {field.value}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Factor bars ────────────────────────────── */}
          <AnimatePresence>
            {showFactors && (
              <motion.div
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="mb-4 flex-shrink-0"
              >
                <span className="text-mono-label text-slate/50 text-[10px] block mb-2">
                  EVALUATION
                </span>
                <FactorBarChart
                  factors={factors}
                  animate={phase === "factors"}
                  staggerMs={80}
                  compact
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Match discovery: candidates compared ────── */}
          <AnimatePresence>
            {showDiscovery && (
              <motion.div
                key="discovery-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="mb-4"
              >
                <span className="text-mono-label text-slate/50 text-[10px] block mb-2">
                  CANDIDATES
                </span>
                <div className="space-y-1.5">
                  {candidates.map((m, i) => (
                    <motion.div
                      key={m.company.id}
                      initial={reducedMotion ? false : { opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: i * 0.1,
                        duration: 0.35,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`flex items-center gap-3 rounded-lg px-2.5 py-2 border-l-2 ${
                        i === 0
                          ? "bg-copper/[0.06] border-copper"
                          : "border-transparent"
                      }`}
                    >
                      <span
                        className={`font-mono text-lg font-bold tabular-nums w-9 shrink-0 ${getScoreColor(
                          m.matchScore
                        )}`}
                      >
                        {m.matchScore}
                      </span>
                      <div className="min-w-0">
                        <p
                          className={`text-xs truncate ${
                            i === 0
                              ? "text-ink font-semibold"
                              : "text-slate font-medium"
                          }`}
                        >
                          {m.company.name}
                        </p>
                        <p className="text-[10px] text-slate/60 capitalize truncate">
                          {m.company.type} · {m.company.location}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Match result ───────────────────────────── */}
          <div className="mt-auto">
            <AnimatePresence>
              {showResult && primary && (
                <motion.div
                  key="result"
                  initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="border-t border-ink/[0.06] pt-4">
                    <span className="text-mono-label text-slate/50 text-[10px] mb-3 block">
                      TOP MATCH
                    </span>

                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-ink">
                          {primary.company.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="text-xs text-slate capitalize">
                            {primary.company.type}
                          </span>
                          <span className="text-silver/40">·</span>
                          <span className="flex items-center gap-0.5 text-xs text-slate">
                            <MapPin size={10} weight="bold" />
                            {primary.company.location}
                          </span>
                          {primary.company.capacity && (
                            <>
                              <span className="text-silver/40">·</span>
                              <span className="flex items-center gap-0.5 text-xs text-slate">
                                <Factory size={10} weight="bold" />
                                {primary.company.capacity}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end shrink-0">
                        <span
                          className={`font-mono text-4xl font-bold tabular-nums leading-none ${getScoreColor(
                            primary.matchScore
                          )}`}
                        >
                          {scoreDisplay}
                        </span>
                        <span className="text-mono-label text-slate/50 mt-0.5 text-[10px]">
                          MATCH
                        </span>
                      </div>
                    </div>

                    {/* Why this match */}
                    <AnimatePresence>
                      {phase === "complete" && (
                        <motion.div
                          initial={reducedMotion ? false : { opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.3 }}
                          className="mt-3"
                        >
                          <span className="text-mono-label text-slate/40 text-[9px] block mb-1.5">
                            WHY THIS MATCH
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {primary.reasons.slice(0, 3).map((reason) => (
                              <span
                                key={reason}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-success/8 text-success text-[11px] font-medium"
                              >
                                <ShieldCheck size={11} weight="duotone" />
                                {reason}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Idle state ─────────────────────────────── */}
          {phase === "idle" && (
            <div className="flex-1 flex flex-col justify-center items-center">
              <div className="w-full max-w-[220px] space-y-3 opacity-[0.12]">
                {[
                  { w: 78, h: 6 },
                  { w: 62, h: 6 },
                  { w: 88, h: 6 },
                  { w: 52, h: 6 },
                  { w: 70, h: 6 },
                ].map((bar, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="h-[5px] rounded-full bg-slate/60"
                      style={{ width: `${bar.w}%` }}
                    />
                    <div className="h-3 w-5 rounded bg-slate/40 shrink-0" />
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-col items-center gap-1">
                <div className="w-20 h-px bg-copper/20" />
                <p className="text-[11px] text-silver/50 mt-2">
                  Select a requirement to see it resolve
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}