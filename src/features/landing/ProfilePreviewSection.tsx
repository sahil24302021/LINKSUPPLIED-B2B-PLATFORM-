"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DURATION, EASE } from "@/lib/animation";
import { companies } from "@/data";
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
  ArrowRight,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProfilePreviewSection() {
  const reduce = useReducedMotion();
  const company = companies[0]; // ABC Packaging
  const [showDeep, setShowDeep] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInnerRef = useRef<HTMLDivElement>(null);
  const identityRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const capabilityGridRef = useRef<HTMLDivElement>(null);
  const productsLabelRef = useRef<HTMLSpanElement>(null);
  const productsListRef = useRef<HTMLDivElement>(null);
  const verificationLabelRef = useRef<HTMLSpanElement>(null);
  const badgesListRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (reduce) return;

    const mm = gsap.matchMedia();

    // ══════════════════════════════════════════════════════════════
    // DESKTOP PRESERVATION (>= 768px)
    // ══════════════════════════════════════════════════════════════
    mm.add("(min-width: 768px)", () => {
      const heading = headingRef.current;
      const card = cardRef.current;
      if (!heading || !card) return;

      gsap.fromTo(
        heading,
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        card,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          delay: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    // ══════════════════════════════════════════════════════════════
    // MOBILE SCROLL-DRIVEN CHOREOGRAPHY (< 768px)
    // ══════════════════════════════════════════════════════════════
    mm.add("(max-width: 767px)", () => {
      const heading = headingRef.current;
      const card = cardInnerRef.current;
      const identity = identityRef.current;
      const desc = descRef.current;
      const capGrid = capabilityGridRef.current;
      const capFields = capGrid
        ? gsap.utils.toArray<HTMLElement>(capGrid.children)
        : [];
      const productsLabel = productsLabelRef.current;
      const productsList = productsListRef.current;
      const verifLabel = verificationLabelRef.current;
      const badgesList = badgesListRef.current;
      const badges = badgesList
        ? gsap.utils.toArray<HTMLElement>(badgesList.children)
        : [];
      const toggle = toggleRef.current;

      if (!sectionRef.current || !heading || !card) return;

      // 1. Initial Hidden States on Mobile
      gsap.set(heading, { autoAlpha: 0, y: 24 });
      gsap.set(card, { autoAlpha: 0, y: 28, scale: 0.98 });
      if (identity) gsap.set(identity, { autoAlpha: 0, y: 14 });
      if (desc) gsap.set(desc, { autoAlpha: 0, y: 12 });
      if (capFields.length) {
        gsap.set(capFields, { autoAlpha: 0, y: 16, scale: 0.96 });
      }
      if (productsLabel) gsap.set(productsLabel, { autoAlpha: 0, y: 8 });
      if (productsList) gsap.set(productsList, { autoAlpha: 0, y: 12 });
      if (verifLabel) gsap.set(verifLabel, { autoAlpha: 0, y: 8 });
      if (badges.length) {
        gsap.set(badges, { autoAlpha: 0, y: 14, scale: 0.96 });
      }
      if (toggle) gsap.set(toggle, { autoAlpha: 0, y: 10 });

      // 2. Scroll-Scrubbed Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 80%",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // Step 1: Heading enters smoothly (0.00 -> 0.16)
      tl.to(
        heading,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.16,
          ease: "power2.out",
        },
        0.0
      );

      // Step 2: Profile Card & Identity Header reveal (0.14 -> 0.36)
      tl.to(
        card,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.18,
          ease: "power2.out",
        },
        0.14
      );

      if (identity) {
        tl.to(
          identity,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.12,
            ease: "power1.out",
          },
          0.2
        );
      }

      // Step 3: Profile Data Progressively Reveals (0.34 -> 0.62)
      if (desc) {
        tl.to(
          desc,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.1,
            ease: "power1.out",
          },
          0.34
        );
      }

      if (capFields.length) {
        capFields.forEach((field, i) => {
          tl.to(
            field,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.1,
              ease: "back.out(1.1)",
            },
            0.4 + i * 0.04
          );
        });
      }

      if (productsLabel) {
        tl.to(
          productsLabel,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.08,
            ease: "power1.out",
          },
          0.54
        );
      }

      if (productsList) {
        tl.to(
          productsList,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.1,
            ease: "power1.out",
          },
          0.56
        );
      }

      // Step 4: Verified Evidence Progressively Reveals (0.60 -> 0.84)
      if (verifLabel) {
        tl.to(
          verifLabel,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.08,
            ease: "power1.out",
          },
          0.62
        );
      }

      if (badges.length) {
        badges.forEach((badge, i) => {
          tl.to(
            badge,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.1,
              ease: "back.out(1.1)",
            },
            0.65 + i * 0.05
          );
        });
      }

      if (toggle) {
        tl.to(
          toggle,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.1,
            ease: "power1.out",
          },
          0.78
        );
      }

      // Step 5: Settle Plateau (0.84 -> 1.00)
      tl.set({}, {}, 1.0);
    });

    return () => mm.revert();
  }, [reduce]);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [showDeep]);

  return (
    <section ref={sectionRef} className="py-24 md:py-36">
      <div className="grid-page">
        <div className="col-content">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* ── Left: Heading ──────────────────────── */}
            <div
              ref={headingRef}
              className="lg:col-span-4 lg:sticky lg:top-32"
            >
              <span className="text-mono-label text-copper block mb-2">
                06 — SUPPLIER CAPABILITY DOSSIER
              </span>
              <h2 className="text-display text-ink">
                Not a directory listing.
              </h2>
              <h2 className="text-display text-slate/60 mt-1">
                A verified capability dossier.
              </h2>
              <p className="mt-5 text-base text-slate leading-relaxed max-w-[36ch]">
                Here is what you will know about a supplier before contacting them. Every record is built on factual capability data: verified machinery, demonstrated tolerances, certified capacity, and primary audit certificates.
              </p>
              <Link
                href="/suppliers/abc-packaging"
                className="group inline-flex items-center gap-2 mt-6 text-sm font-semibold text-copper hover:text-copper-muted transition-colors"
              >
                Inspect full supplier dossier
                <ArrowRight size={14} weight="bold" className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            {/* ── Right: Intelligence Profile ─────────── */}
            <div
              ref={cardRef}
              className="lg:col-span-8"
            >
              <div
                ref={cardInnerRef}
                className="bg-surface rounded-2xl overflow-hidden"
                style={{ boxShadow: "var(--shadow-floating)" }}
              >
                {/* ── Identity header ──────────────── */}
                <div ref={identityRef} className="p-6 md:p-8 border-b border-ink/[0.04]">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-copper/8 flex items-center justify-center shrink-0">
                        <Buildings
                          size={28}
                          weight="duotone"
                          className="text-copper"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-ink">
                          {company.name}
                        </h3>
                        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                          <span className="text-sm text-slate capitalize">
                            {company.type}
                          </span>
                          <span className="text-silver/30">·</span>
                          <span className="flex items-center gap-1 text-sm text-slate">
                            <MapPin size={13} weight="bold" />
                            {company.location}
                          </span>
                          {company.yearsInBusiness && (
                            <span className="inline-flex items-center gap-3">
                              <span className="text-silver/30">·</span>
                              <span className="flex items-center gap-1 text-sm text-slate">
                                <CalendarDots size={13} weight="bold" />
                                {company.yearsInBusiness} years
                              </span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="self-start sm:self-auto shrink-0">
                      <SampleDataTag />
                    </div>
                  </div>
                </div>

                {/* ── Intelligence layers ──────────── */}
                <div className="p-6 md:p-8 space-y-6">
                  {/* Manufacturing Category Badge & Description */}
                  <div>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-copper font-semibold bg-copper/10 px-2 py-0.5 rounded border border-copper/20">
                        CATEGORY: PRECISION GLASS PACKAGING
                      </span>
                      <span className="text-[10px] font-mono text-slate/60">
                        Primary Facility: Navi Mumbai Industrial Zone (JNPT 38km)
                      </span>
                    </div>
                    <p ref={descRef} className="text-sm text-slate leading-relaxed max-w-[60ch]">
                      {company.description}
                    </p>
                  </div>

                  {/* Capability grid */}
                  <div ref={capabilityGridRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <IntelField
                      icon={<Factory size={14} />}
                      label="Capacity"
                      value="80,000 units / mo"
                    />
                    <IntelField
                      icon={<Package size={14} />}
                      label="Min. order"
                      value="5,000 units (MOQ)"
                    />
                    <IntelField
                      icon={<Globe size={14} />}
                      label="Facility Area"
                      value="32,000 sq ft (2 Lines)"
                    />
                    <IntelField
                      icon={<Certificate size={14} />}
                      label="Certifications"
                      value="ISO 9001 · ISO 22716 · GMP"
                    />
                  </div>

                  {/* Machines & Production Capabilities */}
                  <div className="p-3.5 rounded-xl bg-ink/[0.02] border border-ink/[0.04]">
                    <span className="text-mono-label text-slate/60 block mb-2 text-[10px]">
                      VERIFIED MACHINERY & CAPABILITIES
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-ink/90 font-medium">
                      <div className="flex items-center gap-1.5 p-1.5 rounded bg-surface border border-ink/[0.04]">
                        <span className="text-copper">✓</span>
                        <span>2x Automated 8-Section IS Lines</span>
                      </div>
                      <div className="flex items-center gap-1.5 p-1.5 rounded bg-surface border border-ink/[0.04]">
                        <span className="text-copper">✓</span>
                        <span>Opto-Electronic Cold-End Inspection</span>
                      </div>
                      <div className="flex items-center gap-1.5 p-1.5 rounded bg-surface border border-ink/[0.04]">
                        <span className="text-copper">✓</span>
                        <span>3-Color UV Screen Printing</span>
                      </div>
                    </div>
                  </div>

                  {/* Products */}
                  <div>
                    <span ref={productsLabelRef} className="text-mono-label text-slate/50 block mb-2 text-[10px]">
                      MANUFACTURED PRODUCTS
                    </span>
                    <div ref={productsListRef} className="flex flex-wrap gap-1.5">
                      {company.products.map((product) => (
                        <span
                          key={product}
                          className="text-xs px-2.5 py-1 rounded-md bg-ink/[0.03] text-ink/70 font-medium"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Verification status & depth */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span ref={verificationLabelRef} className="text-mono-label text-slate/50 text-[10px]">
                        VERIFICATION STATUS & AUDIT DEPTH
                      </span>
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded">
                        4 EVIDENCE FILES VALIDATED
                      </span>
                    </div>
                    <div ref={badgesListRef} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface border border-ink/[0.06] shadow-2xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-ink">Business Registration</span>
                            <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-700 font-medium">Document Verified</span>
                          </div>
                          <p className="text-[11px] text-slate/70 mt-0.5">Active incorporation & GST records verified</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface border border-ink/[0.06] shadow-2xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-ink">Production Facility</span>
                            <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-700 font-medium">Physically Audited</span>
                          </div>
                          <p className="text-[11px] text-slate/70 mt-0.5">Navi Mumbai plant inspected & video audit on file</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface border border-ink/[0.06] shadow-2xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-ink">Throughput Capacity</span>
                            <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-700 font-medium">Registry Validated</span>
                          </div>
                          <p className="text-[11px] text-slate/70 mt-0.5">80,000 monthly units verified via machine logs</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface border border-ink/[0.06] shadow-2xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-ink">Quality Standards</span>
                            <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-700 font-medium">Active Registry</span>
                          </div>
                          <p className="text-[11px] text-slate/70 mt-0.5">ISO 9001:2015 & ISO 22716 active on registry</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expand for deeper intel */}
                  <AnimatePresence>
                    {showDeep && (
                      <motion.div
                        key="deep-intel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: DURATION.normal, ease: EASE.out }}
                        className="overflow-hidden space-y-5"
                      >
                        {/* Markets */}
                        <div>
                          <span className="text-mono-label text-slate/50 block mb-2 text-[10px]">
                            MARKETS SERVED
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {company.marketsServed.map((market) => (
                              <span
                                key={market}
                                className="text-xs px-2.5 py-1 rounded-md bg-ink/[0.03] text-ink/70 font-medium flex items-center gap-1"
                              >
                                <Globe size={10} />
                                {market}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Industries */}
                        <div>
                          <span className="text-mono-label text-slate/50 block mb-2 text-[10px]">
                            INDUSTRIES
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {company.industries.map((ind) => (
                              <span
                                key={ind}
                                className="text-xs px-2.5 py-1 rounded-md bg-ink/[0.03] text-ink/70 font-medium"
                              >
                                {ind}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Toggle deeper intel */}
                  <button
                    ref={toggleRef}
                    onClick={() => setShowDeep(!showDeep)}
                    className="flex items-center gap-1.5 text-xs text-slate hover:text-copper transition-colors w-full justify-center py-2"
                  >
                    <span>{showDeep ? "Less detail" : "Full intelligence profile"}</span>
                    <motion.span
                      animate={{ rotate: showDeep ? 180 : 0 }}
                      transition={{ duration: DURATION.fast, ease: EASE.out }}
                    >
                      <CaretDown size={12} />
                    </motion.span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IntelField({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="p-3 rounded-xl bg-ink/[0.02]">
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-slate/50">{icon}</span>
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate/40">
          {label}
        </span>
      </div>
      <p className="text-sm text-ink font-medium leading-snug">{value}</p>
    </div>
  );
}
