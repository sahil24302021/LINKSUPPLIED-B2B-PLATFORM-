"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import type { MatchResult } from "@/lib/types";
import FactorBarChart from "@/components/ui/FactorBarChart";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import {
  MapPin,
  Factory,
  ArrowRight,
  CaretDown,
} from "@phosphor-icons/react";

interface MatchCardProps {
  result: MatchResult;
  compact?: boolean;
  onViewProfile?: (companyId: string) => void;
  animateScore?: boolean;
  entranceDelay?: number;
}

function useCountUp(target: number, animate: boolean, delay: number = 0) {
  const [value, setValue] = useState(animate ? 0 : target);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!animate) {
      const id = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(id);
    }

    const start = performance.now() + delay;
    const duration = 700;

    const tick = (now: number) => {
      if (now < start) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame((now) => {
      setValue(0);
      tick(now);
    });
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, animate, delay]);

  return value;
}

export function MatchCard({
  result,
  compact = false,
  onViewProfile,
  animateScore = false,
  entranceDelay = 0,
}: MatchCardProps) {
  const reduce = useReducedMotion();
  const { company, matchScore, reasons, factors } = result;
  const [expanded, setExpanded] = useState(false);
  const [hoveredFactorIndex, setHoveredFactorIndex] = useState<number | null>(
    null
  );

  const displayScore = useCountUp(
    matchScore,
    animateScore && !reduce,
    entranceDelay
  );

  const scoreColor =
    matchScore >= 80
      ? "text-success"
      : matchScore >= 60
      ? "text-copper"
      : "text-warning";

  if (compact) {
    return (
      <div
        className="flex items-center gap-4 p-4 bg-surface rounded-xl hover:shadow-raised transition-shadow duration-200 group cursor-pointer"
        style={{ boxShadow: "var(--shadow-resting)" }}
        onClick={() => onViewProfile?.(company.id)}
      >
        {/* Score */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <span
            className={`font-mono text-2xl font-bold tabular-nums ${scoreColor}`}
          >
            {displayScore}
          </span>
          <span className="text-mono-label text-slate">MATCH</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-ink truncate">
            {company.name}
          </h4>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-slate capitalize">
              {company.type}
            </span>
            <span className="text-silver">·</span>
            <span className="text-xs text-slate flex items-center gap-0.5">
              <MapPin size={11} weight="bold" />
              {company.location}
            </span>
          </div>
        </div>

        <ArrowRight
          size={14}
          className="text-silver group-hover:text-copper transition-colors flex-shrink-0"
        />
      </div>
    );
  }

  return (
    <div
      className="bg-surface rounded-2xl overflow-hidden transition-shadow duration-200"
      style={{ boxShadow: "var(--shadow-raised)" }}
    >
      {/* Scan tier — always visible */}
      <div className="p-5 md:p-6">
        <div className="flex items-start gap-5">
          {/* Score numeral */}
          <div className="flex-shrink-0 flex flex-col items-center pt-0.5">
            <span
              className={`font-mono text-4xl md:text-5xl font-bold tabular-nums leading-none ${scoreColor}`}
            >
              {displayScore}
            </span>
            <span className="text-mono-label text-slate mt-1">MATCH</span>
          </div>

          {/* Primary info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-base md:text-lg font-semibold text-ink">
                  {company.name}
                </h4>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-sm text-slate">
                  <span className="capitalize">{company.type}</span>
                  <span className="flex items-center gap-1">
                    <MapPin size={13} weight="bold" />
                    {company.location}
                  </span>
                  {company.capacity && (
                    <span className="flex items-center gap-1">
                      <Factory size={13} weight="bold" />
                      {company.capacity}
                    </span>
                  )}
                </div>
              </div>
              {onViewProfile && (
                <button
                  onClick={() => onViewProfile(company.id)}
                  className="flex items-center gap-1 text-xs font-medium text-copper hover:text-copper-muted transition-colors px-3 py-1.5 rounded-lg border border-copper/20 hover:bg-copper/5 flex-shrink-0 active:scale-[0.98]"
                >
                  View profile
                  <ArrowRight size={12} />
                </button>
              )}
            </div>

            {/* Top 2 verification badges */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {company.verification.slice(0, 2).map((v) => (
                <VerificationBadge key={v.type} verification={v} compact />
              ))}
            </div>

            {/* Match reasons */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {reasons.map((reason, i) => (
                <button
                  key={reason}
                  className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors duration-150 ${
                    hoveredFactorIndex === i
                      ? "bg-copper/15 text-copper"
                      : "bg-copper/6 text-copper/80"
                  }`}
                  onMouseEnter={() => setHoveredFactorIndex(i)}
                  onMouseLeave={() => setHoveredFactorIndex(null)}
                >
                  {reason}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Expand toggle */}
        {factors && factors.length > 0 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 mt-4 text-xs text-slate hover:text-copper transition-colors w-full justify-center"
          >
            <span>{expanded ? "Hide" : "Why this score"}</span>
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <CaretDown size={12} />
            </motion.span>
          </button>
        )}
      </div>

      {/* Detail tier — expandable factor composition */}
      <AnimatePresence>
        {expanded && factors && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 pb-5 md:pb-6 pt-2 border-t border-ink/[0.05]">
              <span className="text-mono-label text-slate mb-3 block">
                SCORE COMPOSITION
              </span>
              <FactorBarChart
                factors={factors}
                animate={false}
                highlightIndex={hoveredFactorIndex}
                compact
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
