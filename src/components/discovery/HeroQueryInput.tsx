// src/components/discovery/HeroQueryInput.tsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { heroPlaceholders } from "@/lib/data";

interface HeroQueryInputProps {
  onSubmit: (query: string) => void;
}

export function HeroQueryInput({ onSubmit }: HeroQueryInputProps) {
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [justPopulated, setJustPopulated] = useState(false);
  const populatedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  // Rotate placeholder text
  useEffect(() => {
    if (reduce) return;
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % heroPlaceholders.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [reduce]);

  useEffect(() => {
    return () => {
      if (populatedTimeoutRef.current) clearTimeout(populatedTimeoutRef.current);
    };
  }, []);

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      const submission = query.trim() || heroPlaceholders[placeholderIndex];
      onSubmit(submission);
    },
    [query, placeholderIndex, onSubmit]
  );

  const handleChipClick = useCallback(
    (example: string) => {
      setQuery(example);
      // Brief highlight on the input to make the population feel like
      // a deliberate action, not a silent value swap.
      setJustPopulated(true);
      if (populatedTimeoutRef.current) clearTimeout(populatedTimeoutRef.current);
      populatedTimeoutRef.current = setTimeout(
        () => setJustPopulated(false),
        420
      );
      onSubmit(example);
    },
    [onSubmit]
  );

  return (
    <div className="w-full">
      {/* Instrument-style input */}
      <div className="relative">
        <span className="text-mono-label text-copper mb-2 block">
          YOUR REQUIREMENT
        </span>
        <form onSubmit={handleSubmit}>
          <motion.div
            className="relative bg-surface rounded-xl overflow-hidden border"
            animate={{
              borderColor: isFocused
                ? "rgba(196,133,76,0.35)"
                : justPopulated
                ? "rgba(196,133,76,0.5)"
                : "rgba(26,26,46,0.06)",
              boxShadow: isFocused
                ? "var(--shadow-floating)"
                : "var(--shadow-raised)",
            }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={heroPlaceholders[placeholderIndex]}
              className="w-full px-5 py-4 md:py-5 bg-transparent text-ink placeholder:text-silver/70 text-base md:text-lg outline-none min-w-0 pr-28"
              aria-label="Describe what your business needs or makes"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 px-5 py-2.5 bg-copper hover:bg-copper-muted text-surface text-sm font-semibold rounded-lg transition-all duration-200 active:scale-[0.98] shadow-sm"
            >
              Match
              <ArrowRight size={15} weight="bold" />
            </button>
          </motion.div>
        </form>
      </div>

      {/* Suggestion chips */}
      <div className="flex flex-wrap gap-2 mt-4">
        {heroPlaceholders.slice(0, 3).map((example, i) => (
          <motion.button
            key={example}
            onClick={() => handleChipClick(example)}
            className="text-xs text-slate px-3.5 py-2 rounded-lg border border-ink/[0.06] hover:border-copper/30 hover:text-copper hover:bg-copper/[0.04] bg-surface/80 transition-colors duration-200 active:scale-[0.97]"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.8 + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {example}
          </motion.button>
        ))}
      </div>
    </div>
  );
}