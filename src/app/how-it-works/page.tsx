"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Link from "next/link";
import { SampleDataTag } from "@/components/ui/SampleDataTag";
import PinnedPipeline from "@/components/ui/PinnedPipeline";
import { DURATION, EASE } from "@/lib/animation";
import {
  FileText,
  ArrowsLeftRight,
  ShieldCheck,
  PaperPlaneRight,
  ChartBar,
  Wrench,
  UploadSimple,
  Bell,
  Handshake,
  ArrowRight,
  Buildings,
  Gear,
} from "@phosphor-icons/react";

// TODO: real asset — live walkthrough screencasts & production shop-floor video assets

type WalkthroughTrack = "buyer" | "supplier";

export default function HowItWorksPage() {
  const [activeTrack, setActiveTrack] = useState<WalkthroughTrack>("buyer");
  const reduce = useReducedMotion();

  const buyerSteps = [
    {
      step: "01",
      icon: FileText,
      title: "Tell us what you need",
      subtitle: "Structured Requirement Intake",
      description:
        "Input your component specifications: geometry, material grade, technical tolerance, batch volumes, and target delivery city. No vague keyword searches.",
      preview: (
        <div className="bg-paper p-4 rounded-xl border border-ink/[0.08] text-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-ink/[0.06]">
            <span className="font-mono text-[10px] uppercase font-bold text-copper">Requirement Intake</span>
            <SampleDataTag />
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-slate block text-[10px] font-mono uppercase">Component</span>
              <strong className="text-ink font-mono">Round Bright Bar</strong>
            </div>
            <div>
              <span className="text-slate block text-[10px] font-mono uppercase">Material</span>
              <strong className="text-ink font-mono">EN1A / 11SMn30</strong>
            </div>
            <div>
              <span className="text-slate block text-[10px] font-mono uppercase">Tolerance</span>
              <strong className="text-ink font-mono">ISO h9 (±0.030mm)</strong>
            </div>
            <div>
              <span className="text-slate block text-[10px] font-mono uppercase">Batch Volume</span>
              <strong className="text-ink font-mono">2,000 kg / mo</strong>
            </div>
          </div>
          <div className="pt-1.5 border-t border-ink/[0.06] flex items-center justify-between text-[11px]">
            <span className="text-slate">Destination:</span>
            <span className="font-semibold text-ink">Mumbai, India (DAP)</span>
          </div>
        </div>
      ),
    },
    {
      step: "02",
      icon: Gear,
      title: "We structure the requirement",
      subtitle: "Deterministic Engineering Sanity Check",
      description:
        "Our system maps your request into a normalized B2B sourcing brief, verifying material designations, dimensional tolerances, and process feasibility against industrial standards.",
      preview: (
        <div className="bg-paper p-4 rounded-xl border border-ink/[0.08] text-xs space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-ink/[0.06]">
            <span className="font-mono text-[10px] uppercase font-bold text-ink">Sourcing Brief Status</span>
            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-mono font-bold">READY</span>
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between p-1.5 rounded bg-surface border border-ink/[0.04]">
              <span className="text-slate">Material Standards:</span>
              <span className="text-emerald-700 font-mono font-semibold">DIN 1.0718 / ASTM A108 ✓</span>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded bg-surface border border-ink/[0.04]">
              <span className="text-slate">Tolerance Feasibility:</span>
              <span className="text-emerald-700 font-mono font-semibold">Cold Drawn / Peeling ✓</span>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded bg-surface border border-ink/[0.04]">
              <span className="text-slate">Required Machinery:</span>
              <span className="text-ink font-mono">Combined Drawbench + Polisher</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      step: "03",
      icon: ArrowsLeftRight,
      title: "Review relevant suppliers",
      subtitle: "Audited Facility Matching",
      description:
        "See only manufacturers that operate verified machines capable of holding your tolerances and materials. No paid sponsor placements or unverified brokers.",
      preview: (
        <div className="bg-paper p-4 rounded-xl border border-ink/[0.08] text-xs space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-ink/[0.06]">
            <span className="font-mono text-[10px] font-bold text-ink">MATCHED MANUFACTURERS (3)</span>
            <span className="text-[10px] font-mono text-emerald-700 font-bold">High Alignment</span>
          </div>
          <div className="p-2.5 rounded-lg bg-surface border border-ink/[0.06] space-y-1">
            <div className="flex items-center justify-between">
              <strong className="text-ink">Vanguard Precision Eng.</strong>
              <span className="text-[10px] font-mono text-copper font-bold">4/6 AUDITED</span>
            </div>
            <div className="flex flex-wrap gap-1 text-[10px] font-mono text-slate">
              <span className="px-1.5 py-0.5 rounded bg-paper border border-ink/[0.06]">Material: Confirmed</span>
              <span className="px-1.5 py-0.5 rounded bg-paper border border-ink/[0.06]">Tolerance: ±0.03mm</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      step: "04",
      icon: ShieldCheck,
      title: "Inspect the evidence",
      subtitle: "6-Layer Capability Dossier",
      description:
        "Inspect verified proof before starting outreach: tax records, plant footage, machinery serial plates, CMM calibration certificates, and export history.",
      preview: (
        <div className="bg-paper p-4 rounded-xl border border-ink/[0.08] text-xs space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-ink/[0.06]">
            <span className="font-mono text-[10px] uppercase font-bold text-ink">Evidence Verification Stack</span>
            <span className="text-[10px] font-mono text-slate">12-Mo. Valid</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
            <div className="p-2 rounded bg-surface border border-emerald-200/80 text-emerald-800">
              ✓ 01 Corporate Entity
            </div>
            <div className="p-2 rounded bg-surface border border-emerald-200/80 text-emerald-800">
              ✓ 02 Factory Physical
            </div>
            <div className="p-2 rounded bg-surface border border-emerald-200/80 text-emerald-800">
              ✓ 03 Equipment & Tech
            </div>
            <div className="p-2 rounded bg-surface border border-amber-200/80 text-amber-800">
              ⏳ 04 Quality Systems
            </div>
          </div>
        </div>
      ),
    },
    {
      step: "05",
      icon: PaperPlaneRight,
      title: "Request formal quotations",
      subtitle: "Structured Commercial Inquiry",
      description:
        "Send your requirement brief directly to verified suppliers with one click. Suppliers receive clear technical deliverables, enabling rapid, accurate bidding.",
      preview: (
        <div className="bg-paper p-4 rounded-xl border border-ink/[0.08] text-xs space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-ink/[0.06]">
            <span className="font-mono text-[10px] uppercase font-bold text-copper">RFQ Dispatched</span>
            <span className="font-mono text-[10px] text-ink font-bold">RFQ-2026-0841</span>
          </div>
          <div className="space-y-1 text-[11px] text-slate">
            <div className="flex justify-between">
              <span>Target Lead Time:</span>
              <strong className="text-ink">14 Calendar Days</strong>
            </div>
            <div className="flex justify-between">
              <span>Delivery Terms:</span>
              <strong className="text-ink">DAP Mumbai</strong>
            </div>
            <div className="flex justify-between">
              <span>Supplier Response SLA:</span>
              <strong className="text-emerald-700">3-5 Business Days</strong>
            </div>
          </div>
        </div>
      ),
    },
    {
      step: "06",
      icon: ChartBar,
      title: "Compare quotations side-by-side",
      subtitle: "Objective Commercial Decision Matrix",
      description:
        "Evaluate unit rates, tooling charges, production lead times, and payment terms in one standardized matrix. Transition directly to sample signoff and purchase order.",
      preview: (
        <div className="bg-paper p-4 rounded-xl border border-ink/[0.08] text-xs space-y-2">
          <div className="flex items-center justify-between pb-1.5 border-b border-ink/[0.06]">
            <span className="font-mono text-[10px] uppercase font-bold text-ink">Quotation Comparison</span>
            <span className="text-[10px] font-mono text-emerald-700 font-bold">2 Quotes Active</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
            <div className="p-2 rounded bg-surface border border-ink/[0.06]">
              <strong className="text-ink block">Supplier A</strong>
              <span className="text-copper font-bold text-xs">₹120/kg</span>
              <span className="text-slate block mt-0.5">14d lead · 1t MOQ</span>
            </div>
            <div className="p-2 rounded bg-surface border border-ink/[0.06]">
              <strong className="text-ink block">Supplier B</strong>
              <span className="text-copper font-bold text-xs">₹125/kg</span>
              <span className="text-slate block mt-0.5">10d lead · 500kg MOQ</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const supplierSteps = [
    {
      step: "01",
      icon: Buildings,
      title: "Build your manufacturing profile",
      subtitle: "Facility Entity & Footprint",
      description:
        "Register your plant identity, operating facility address, covered footprint (sq ft), and key target industries (automotive, aerospace, medical, general engineering).",
      preview: (
        <div className="bg-paper p-4 rounded-xl border border-ink/[0.08] text-xs space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-ink/[0.06]">
            <span className="font-mono text-[10px] uppercase font-bold text-copper">Facility Profile</span>
            <SampleDataTag />
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="text-ink font-bold">Vanguard Precision Engineering</div>
            <div className="text-slate text-[10px] font-mono">Plant: Bhosari MIDC, Pune · 32,000 sq ft</div>
            <div className="flex gap-1 text-[10px] font-mono text-slate pt-1">
              <span className="px-1.5 py-0.5 rounded bg-surface border border-ink/[0.05]">Automotive</span>
              <span className="px-1.5 py-0.5 rounded bg-surface border border-ink/[0.05]">Precision Turned Parts</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      step: "02",
      icon: Wrench,
      title: "Detail machinery & capabilities",
      subtitle: "Equipment Specification",
      description:
        "Enumerate your equipment: CNC turning centers, 4/5-axis milling machines, drawing lines, stamping tonnage, and precision tolerances achievable on production runs.",
      preview: (
        <div className="bg-paper p-4 rounded-xl border border-ink/[0.08] text-xs space-y-2">
          <div className="flex items-center justify-between pb-1.5 border-b border-ink/[0.06]">
            <span className="font-mono text-[10px] uppercase font-bold text-ink">Equipment Index</span>
            <span className="text-[10px] font-mono text-slate">14 Units Listed</span>
          </div>
          <div className="space-y-1 text-[11px] font-mono">
            <div className="p-1.5 rounded bg-surface border border-ink/[0.04] flex justify-between">
              <span>Mazak VCN-530C (5-Axis)</span>
              <span className="text-emerald-700 font-semibold">±0.005mm</span>
            </div>
            <div className="p-1.5 rounded bg-surface border border-ink/[0.04] flex justify-between">
              <span>Doosan Puma GT2600</span>
              <span className="text-emerald-700 font-semibold">Ø300mm max</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      step: "03",
      icon: UploadSimple,
      title: "Submit verification evidence",
      subtitle: "Multi-Layer Audit Submission",
      description:
        "Upload factory registration, active ISO/IATF certificates, utility bills, and equipment photos. Our engineering desk verifies each layer without decorative fees.",
      preview: (
        <div className="bg-paper p-4 rounded-xl border border-ink/[0.08] text-xs space-y-2">
          <div className="flex items-center justify-between pb-1.5 border-b border-ink/[0.06]">
            <span className="font-mono text-[10px] uppercase font-bold text-ink">Verification Audit</span>
            <span className="text-emerald-700 font-mono text-[10px] font-bold">4/6 CONFIRMED</span>
          </div>
          <div className="space-y-1 text-[10px] font-mono">
            <div className="flex items-center justify-between p-1.5 rounded bg-surface text-emerald-800 border border-emerald-200/60">
              <span>✓ ISO 9001:2015 Cert</span>
              <span>SHA-256 Valid</span>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded bg-surface text-emerald-800 border border-emerald-200/60">
              <span>✓ Factory Utility Bill (Electricity)</span>
              <span>Audited</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      step: "04",
      icon: Bell,
      title: "Receive matched requirements",
      subtitle: "Filtered Inbound Procurement Demands",
      description:
        "Get notified only when buyer requirements match your specific machines, alloys, and open capacity. Zero junk inquiries or generic spam.",
      preview: (
        <div className="bg-paper p-4 rounded-xl border border-ink/[0.08] text-xs space-y-2">
          <div className="flex items-center justify-between pb-1.5 border-b border-ink/[0.06]">
            <span className="font-mono text-[10px] uppercase font-bold text-copper">New Procurement Opportunity</span>
            <span className="text-[10px] font-mono text-emerald-700 font-bold">100% Fit</span>
          </div>
          <div className="p-2 rounded bg-surface border border-ink/[0.06] space-y-1">
            <strong className="text-ink block text-xs">EN1A Cold Drawn Hex & Round Bars</strong>
            <p className="text-slate text-[11px]">Volume: 2,000 kg / month · Repeat Production Order</p>
            <span className="text-[10px] font-mono text-slate block pt-1">Buyer: Tier-1 Auto Systems · Pune</span>
          </div>
        </div>
      ),
    },
    {
      step: "05",
      icon: Handshake,
      title: "Respond to RFQs & win orders",
      subtitle: "Direct Quotation & Commercial Contract",
      description:
        "Submit transparent pricing, sample turnaround, and production schedules directly to enterprise buyers. Build recurring, long-term manufacturing contracts.",
      preview: (
        <div className="bg-paper p-4 rounded-xl border border-ink/[0.08] text-xs space-y-2">
          <div className="flex items-center justify-between pb-1.5 border-b border-ink/[0.06]">
            <span className="font-mono text-[10px] uppercase font-bold text-ink">Submit Quotation</span>
            <span className="text-copper font-mono text-[10px] font-bold">RFQ-2026-0841</span>
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate">Quoted Price:</span>
              <strong className="text-ink font-mono">₹120 / kg (Ex-Works)</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate">Sample Dispatch:</span>
              <strong className="text-ink font-mono">5 Working Days</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate">Payment Term:</span>
              <strong className="text-ink font-mono">30 Days Net on QC Pass</strong>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="pt-20 md:pt-28 pb-0 bg-paper min-h-screen">
      {/* ── Header ───────────────────────────────────────────── */}
      <div className="grid-page mb-12 md:mb-16">
        <div className="col-content max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-copper/10 border border-copper/20 mb-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-copper font-bold">
              PLATFORM OPERATING MODEL
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-ink tracking-tight leading-[1.08]">
            How LINKSUPPLIED works.
          </h1>
          <p className="mt-5 text-base md:text-lg text-slate leading-relaxed">
            One structured, evidence-backed platform connecting enterprise procurement teams with precision manufacturing facilities. Choose your workflow to see the full operational journey.
          </p>

          {/* Dual Persona Switcher */}
          <div className="mt-8 inline-flex p-1 rounded-full bg-surface border border-ink/[0.08] shadow-xs">
            <button
              type="button"
              onClick={() => setActiveTrack("buyer")}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeTrack === "buyer"
                  ? "bg-ink text-surface shadow-xs"
                  : "text-slate hover:text-ink"
              }`}
            >
              For Buyers & Procurement Teams (6 Steps)
            </button>
            <button
              type="button"
              onClick={() => setActiveTrack("supplier")}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeTrack === "supplier"
                  ? "bg-ink text-surface shadow-xs"
                  : "text-slate hover:text-ink"
              }`}
            >
              For Manufacturers & Suppliers (5 Steps)
            </button>
          </div>
        </div>
      </div>

      {/* ── Sequential Walkthrough Grid ──────────────────────── */}
      <div className="grid-page mb-24">
        <div className="col-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTrack}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: DURATION.normal, ease: EASE.out }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {(activeTrack === "buyer" ? buyerSteps : supplierSteps).map((item) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.step}
                    whileHover={reduce ? undefined : { y: -3, transition: { duration: DURATION.fast, ease: EASE.out } }}
                    className="bg-surface rounded-2xl border border-ink/[0.08] hover:border-ink/[0.16] p-6 shadow-xs flex flex-col justify-between transition-all group"
                  >
                    <div>
                      {/* Step Badge & Icon */}
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-ink/[0.06]">
                        <span className="font-mono text-xs font-bold text-copper bg-copper/10 px-2.5 py-0.5 rounded-md">
                          STEP {item.step}
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-paper border border-ink/[0.06] flex items-center justify-center text-slate group-hover:text-ink transition-colors">
                          <IconComponent size={16} />
                        </div>
                      </div>

                      {/* Headings */}
                      <h2 className="text-base sm:text-lg font-bold text-ink">
                        {item.title}
                      </h2>
                      <span className="text-xs font-mono text-copper font-semibold block mt-0.5 mb-2.5">
                        {item.subtitle}
                      </span>
                      <p className="text-sm sm:text-base text-slate leading-relaxed mb-5">
                        {item.description}
                      </p>
                    </div>

                    {/* Embedded Product UI Snapshot */}
                    <div className="mt-auto pt-2">
                      <div className="text-[10px] font-mono text-slate/70 uppercase mb-1.5 flex items-center gap-1 font-semibold">
                        <span>Platform Interface Preview</span>
                      </div>
                      {item.preview}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Interactive Workflow Visualizer ──────────────────── */}
      <div className="mb-20">
        <div className="grid-page mb-8">
          <div className="col-content">
            <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
              From requirement to delivery in 5 stages
            </h2>
            <p className="text-base text-slate mt-2 max-w-2xl leading-relaxed">
              Scroll through the interactive platform pipeline below to inspect how a raw specification turns into an audited, delivered production contract.
            </p>
          </div>
        </div>
        <PinnedPipeline detailed />
      </div>

      {/* ── Bottom Conversion Strip ──────────────────────────── */}
      <section className="relative bg-ink py-20 md:py-28 overflow-hidden text-surface">
        <div className="relative z-10 grid-page">
          <div className="col-content text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface tracking-tight">
              Ready to modernize your manufacturing sourcing?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-silver leading-relaxed">
              Submit your technical part requirements or register your manufacturing facility to connect with verified partners.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
              <Link
                href="/discover"
                className="group relative inline-flex items-center gap-3.5 pl-6 pr-2.5 py-2 rounded-full bg-copper hover:bg-copper-muted text-white text-xs sm:text-sm font-semibold tracking-wide border border-white/20 shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>Submit a Requirement</span>
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/20 text-white shrink-0 group-hover:translate-x-0.5 transition-transform duration-200">
                  <ArrowRight size={14} weight="bold" />
                </span>
              </Link>
              <Link
                href="/register?role=supplier"
                className="group inline-flex items-center gap-3 pl-6 pr-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-silver hover:text-surface text-xs sm:text-sm font-medium tracking-wide border border-white/12 hover:border-white/25 shadow-sm transition-all duration-200"
              >
                <span>Register manufacturing facility</span>
                <ArrowRight
                  size={14}
                  className="text-silver/60 group-hover:text-surface group-hover:translate-x-0.5 transition-all duration-200"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
