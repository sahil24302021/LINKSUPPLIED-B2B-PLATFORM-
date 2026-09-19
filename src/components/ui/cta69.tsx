"use client";

import React from "react";
import { Badge7 } from "@/components/ui/Badge7";
import { Button12 } from "@/components/ui/Button12";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Badge {
  label: string;
}

interface ActionButton {
  label: string;
  href: string;
}

interface Cta69Labels {
  /** Repeated phrase scrolling across the backdrop */
  marqueePhrase?: string;
  /** Short supporting line beneath the heading */
  note?: string;
  /** Fine print sitting under the button */
  footnote?: string;
}

export interface Cta69Props {
  badge?: Badge;
  heading?: React.ReactNode;
  button?: ActionButton;
  secondaryButton?: ActionButton;
  labels?: Cta69Labels;
  className?: string;
  children?: React.ReactNode;
}

export const cta69Demo: Cta69Props = {
  badge: { label: "B2B Discovery & Intelligence" },
  heading: (
    <>
      Don&apos;t search through thousands.
      <br />
      <span className="text-copper">Find the ones that fit.</span>
    </>
  ),
  button: {
    label: "Start discovering",
    href: "/discover",
  },
  labels: {
    marqueePhrase: "Find the ones that fit",
    note: "Tell LINKSUPPLIED what your business needs or what it makes — get ranked matches with explainable scores, capability verification, and evidence for every recommendation.",
    footnote: "Evidence-backed matching · Explainable scores · Two-sided discovery",
  },
};

const REPEATS = 8;

export function Cta69({
  badge,
  heading,
  button,
  secondaryButton,
  labels = {},
  className,
  children,
}: Cta69Props) {
  const marqueePhrase = labels.marqueePhrase;
  const marqueeLine = marqueePhrase
    ? `${marqueePhrase} · `.repeat(REPEATS)
    : "";

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-paper text-ink w-full flex flex-col justify-center sm:justify-start items-center min-h-[calc(100svh-54px)] md:min-h-[calc(100dvh-64px)] py-8 px-4 sm:py-12 sm:px-5 sm:pt-14 sm:pb-24",
        className
      )}
    >
      <style>{`
        @keyframes cta69-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>

      {/* Subtle paper dot-matrix atmosphere */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-ink) 0.75px, transparent 0.75px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Giant scrolling marquee backdrop */}
      {marqueePhrase && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center overflow-hidden select-none"
        >
          <div className="flex w-max shrink-0 animate-[cta69-marquee_40s_linear_infinite] whitespace-nowrap text-ink/[0.035]">
            {[0, 1].map((copy) => (
              <span
                key={copy}
                className="text-[22vw] sm:text-[20vw] md:text-[14vw] font-bold leading-none tracking-tighter uppercase select-none"
              >
                {marqueeLine}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Centered statement with optical vertical centering on mobile */}
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-2 sm:px-4 md:px-6 text-center z-10 -translate-y-1 sm:translate-y-0">
        {badge && <Badge7 label={badge.label} />}

        {heading && (
          <h1 className="mt-4 sm:mt-6 text-balance text-[26px] xs:text-[28px] sm:text-5xl md:text-6xl lg:text-[76px] font-bold leading-[1.14] sm:leading-[1.06] tracking-tight text-ink max-w-sm sm:max-w-4xl">
            {heading}
          </h1>
        )}

        {labels.note && (
          <p className="mt-3 sm:mt-5 max-w-sm sm:max-w-2xl text-balance text-[14px] sm:text-lg md:text-xl leading-relaxed text-slate font-normal">
            {labels.note}
          </p>
        )}

        {(button || secondaryButton) && (
          <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center gap-2.5 sm:gap-4 w-full sm:w-auto">
            {button && (
              <Button12 asChild label={button.label}>
                <Link href={button.href} />
              </Button12>
            )}
            {secondaryButton && (
              <Link
                href={secondaryButton.href}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-ink/[0.12] bg-surface/80 hover:bg-paper text-ink text-xs sm:text-sm font-semibold transition-colors shadow-2xs min-h-[44px]"
              >
                {secondaryButton.label}
              </Link>
            )}
          </div>
        )}

        {labels.footnote && (
          <p className="mt-5 sm:mt-8 text-[11px] sm:text-sm font-mono text-slate/70 tracking-wide max-w-xs sm:max-w-none text-center leading-normal">
            {labels.footnote}
          </p>
        )}

        {children && <div className="mt-5 sm:mt-8 w-full">{children}</div>}
      </div>
    </section>
  );
}

export default Cta69;
