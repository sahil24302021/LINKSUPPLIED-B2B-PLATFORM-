"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { SupplierOnboardingForm } from "@/types";
import {
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  FileText,
} from "@phosphor-icons/react";
import { openComingSoonModal } from "@/lib/coming-soon";

const INITIAL_SUPPLIER_FORM: SupplierOnboardingForm = {
  fullName: "",
  workEmail: "",
  password: "",
  companyName: "",
  website: "",
  yearEstablished: "",
  plantCity: "",
  plantCountry: "",
  plantAreaSqFt: "",
  businessType: "manufacturer",
  primaryProcesses: [],
  primaryMaterials: [],
  targetIndustries: [],
  keyMachineryTypes: [],
  monthlyCapacityMetric: "",
  standardMoq: "",
  standardLeadTimeDays: "",
  certificationsHeld: [],
  hasIncorporationDoc: false,
  hasIsoCertificates: false,
  hasMachineInvoices: false,
  hasFacilityPhotos: false,
};

export function SupplierOnboardingWizard() {
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<SupplierOnboardingForm>(INITIAL_SUPPLIER_FORM);

  const updateField = <K extends keyof SupplierOnboardingForm>(
    field: K,
    value: SupplierOnboardingForm[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFieldInteraction = (
    e: React.FocusEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>
  ) => {
    e.currentTarget.blur();
    openComingSoonModal();
  };

  // Calculate realistic profile completeness based on filled data
  const calculateCompleteness = () => {
    let score = 0;
    if (form.fullName && form.companyName && form.workEmail) score += 20;
    if (form.plantCity && form.plantAreaSqFt) score += 15;
    if (form.primaryProcesses.length > 0) score += 15;
    if (form.keyMachineryTypes.length > 0) score += 10;
    if (form.certificationsHeld.length > 0) score += 10;
    if (form.hasIncorporationDoc) score += 10;
    if (form.hasIsoCertificates) score += 10;
    if (form.hasMachineInvoices) score += 5;
    if (form.hasFacilityPhotos) score += 5;
    return Math.min(score, 100);
  };

  return (
    <div className="bg-surface rounded-2xl border border-ink/[0.08] shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-ink/[0.06] bg-paper">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-copper font-bold px-2 py-0.5 rounded bg-copper/10">
              SUPPLIER ONBOARDING
            </span>
            <span className="text-xs font-mono text-slate">
              Step {step} of 5
            </span>
          </div>
          <span className="text-xs text-slate font-medium">
            {step === 1 && "Account"}
            {step === 2 && "Company Identity"}
            {step === 3 && "Manufacturing Profile"}
            {step === 4 && "Machinery & Capacity"}
            {step === 5 && "Verification Dossier"}
          </span>
        </div>

        {/* 5-step progress dots */}
        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-colors ${
                s <= step ? "bg-copper" : "bg-ink/[0.08]"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {/* ── STEP 1: Account Credentials ────────────────────── */}
        {step === 1 && (
          <div className="space-y-5 max-w-md mx-auto">
            <div>
              <h2 className="text-xl font-bold text-ink">
                Create your factory profile
              </h2>
              <p className="text-xs text-slate mt-1">
                Receive qualified RFQs directly from verified enterprise procurement teams.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Contact Person Name
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  onFocus={handleFieldInteraction}
                  onClick={handleFieldInteraction}
                  autoComplete="off"
                  placeholder="e.g. Ramesh Patel"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Corporate Work Email
                </label>
                <input
                  type="email"
                  value={form.workEmail}
                  onChange={(e) => updateField("workEmail", e.target.value)}
                  onFocus={handleFieldInteraction}
                  onClick={handleFieldInteraction}
                  autoComplete="off"
                  placeholder="contact@precisioncast.in"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  onFocus={handleFieldInteraction}
                  onClick={handleFieldInteraction}
                  autoComplete="new-password"
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none"
                />
              </div>
            </div>

            <Button
              type="button"
              onClick={() => setStep(2)}
              variant="primary"
              size="lg"
              className="w-full mt-4"
              iconTrailing={<ArrowRight size={14} weight="bold" />}
            >
              Continue to Company Identity
            </Button>
          </div>
        )}

        {/* ── STEP 2: Company Identity ───────────────────────── */}
        {step === 2 && (
          <div className="space-y-5 max-w-md mx-auto">
            <div>
              <h2 className="text-xl font-bold text-ink">
                Company & Facility Premises
              </h2>
              <p className="text-xs text-slate mt-1">
                Tell us about your legal entity and physical manufacturing plant.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Registered Company Name
                </label>
                <input
                  type="text"
                  value={form.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                  placeholder="e.g. PrecisionCast Components Pvt Ltd"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Year Established
                  </label>
                  <input
                    type="text"
                    value={form.yearEstablished}
                    onChange={(e) => updateField("yearEstablished", e.target.value)}
                    placeholder="2014"
                    className="w-full px-3 py-2.5 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Plant Area (Sq. Ft.)
                  </label>
                  <input
                    type="text"
                    value={form.plantAreaSqFt}
                    onChange={(e) => updateField("plantAreaSqFt", e.target.value)}
                    placeholder="25,000"
                    className="w-full px-3 py-2.5 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Plant City / Hub
                  </label>
                  <input
                    type="text"
                    value={form.plantCity}
                    onChange={(e) => updateField("plantCity", e.target.value)}
                    placeholder="Pune"
                    className="w-full px-3 py-2.5 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={form.plantCountry}
                    onChange={(e) => updateField("plantCountry", e.target.value)}
                    placeholder="India"
                    className="w-full px-3 py-2.5 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-3">
              <Button
                type="button"
                onClick={() => setStep(1)}
                variant="secondary"
                size="md"
                iconLeading={<ArrowLeft size={14} weight="bold" />}
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={() => setStep(3)}
                variant="primary"
                size="md"
                iconTrailing={<ArrowRight size={14} weight="bold" />}
              >
                Continue to Manufacturing Profile
              </Button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Manufacturing Profile ──────────────────── */}
        {step === 3 && (
          <div className="space-y-5 max-w-md mx-auto">
            <div>
              <h2 className="text-xl font-bold text-ink">
                Entity Classification & Processes
              </h2>
              <p className="text-xs text-slate mt-1">
                LINKSUPPLIED strictly differentiates manufacturers from distributors.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">
                  Business Entity Classification
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["manufacturer", "trader", "distributor"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => updateField("businessType", type)}
                      className={`p-3 rounded-xl border text-center capitalize transition-all ${
                        form.businessType === type
                          ? "bg-copper/10 border-copper text-ink font-bold"
                          : "bg-paper border-ink/[0.08] text-slate hover:text-ink"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                <span className="text-[10px] text-slate/70 mt-1.5 block">
                  {form.businessType === "manufacturer"
                    ? "You own or operate physical machine tools and production floors."
                    : "You operate warehouse inventory and logistics networks."}
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Primary Manufacturing Processes
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {form.primaryProcesses.map((proc) => (
                    <span
                      key={proc}
                      className="px-2.5 py-1 rounded bg-copper/10 text-copper font-medium text-xs"
                    >
                      {proc}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Key Material Capabilities
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {form.primaryMaterials.map((mat) => (
                    <span
                      key={mat}
                      className="px-2.5 py-1 rounded bg-paper border border-ink/[0.08] text-ink text-xs"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-3">
              <Button
                type="button"
                onClick={() => setStep(2)}
                variant="secondary"
                size="md"
                iconLeading={<ArrowLeft size={14} weight="bold" />}
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={() => setStep(4)}
                variant="primary"
                size="md"
                iconTrailing={<ArrowRight size={14} weight="bold" />}
              >
                Continue to Machinery & Capacity
              </Button>
            </div>
          </div>
        )}

        {/* ── STEP 4: Capability & Equipment ─────────────────── */}
        {step === 4 && (
          <div className="space-y-5 max-w-md mx-auto">
            <div>
              <h2 className="text-xl font-bold text-ink">
                Equipment & Capacity Parameters
              </h2>
              <p className="text-xs text-slate mt-1">
                Provide structured equipment data for requirement tolerance matching.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Featured Machinery (Make & Models)
                </label>
                <div className="space-y-1.5 mb-2">
                  {form.keyMachineryTypes.map((mach, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2 rounded-lg bg-paper border border-ink/[0.06] text-xs text-ink"
                    >
                      <span>{mach}</span>
                      <span className="font-mono text-[10px] text-slate uppercase">Active</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Monthly Production Metric
                  </label>
                  <input
                    type="text"
                    value={form.monthlyCapacityMetric}
                    onChange={(e) => updateField("monthlyCapacityMetric", e.target.value)}
                    placeholder="15,000 units/mo"
                    className="w-full px-3 py-2 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Standard MOQ
                  </label>
                  <input
                    type="text"
                    value={form.standardMoq}
                    onChange={(e) => updateField("standardMoq", e.target.value)}
                    placeholder="500 units"
                    className="w-full px-3 py-2 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Accredited Certifications Held
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {form.certificationsHeld.map((cert) => (
                    <span
                      key={cert}
                      className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-[11px]"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-3">
              <Button
                type="button"
                onClick={() => setStep(3)}
                variant="secondary"
                size="md"
                iconLeading={<ArrowLeft size={14} weight="bold" />}
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={() => setStep(5)}
                variant="primary"
                size="md"
                iconTrailing={<ArrowRight size={14} weight="bold" />}
              >
                Proceed to Verification Setup
              </Button>
            </div>
          </div>
        )}

        {/* ── STEP 5: Verification Orientation ──────────────── */}
        {step === 5 && (
          <div className="space-y-6 max-w-lg mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-copper/10 text-copper flex items-center justify-center mx-auto mb-2">
                <ShieldCheck size={28} />
              </div>
              <h2 className="text-2xl font-bold text-ink">
                Verification Orientation
              </h2>
              <p className="text-xs text-slate mt-1 max-w-[46ch] mx-auto leading-relaxed">
                LINKSUPPLIED badges are not awarded automatically upon registration. Every manufacturer undergoes document auditing and physical verification before receiving qualified RFQs.
              </p>
            </div>

            {/* Completeness Meter */}
            <div className="bg-paper p-4 rounded-xl border border-ink/[0.08] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-ink">Initial Profile Completeness</span>
                <span className="font-mono font-bold text-copper">{calculateCompleteness()}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-ink/[0.08] overflow-hidden">
                <div
                  className="h-full bg-copper rounded-full transition-all duration-500"
                  style={{ width: `${calculateCompleteness()}%` }}
                />
              </div>
              <p className="text-[11px] text-slate">
                Status: <strong className="text-amber-700 font-semibold">Under Verification Onboarding</strong>
              </p>
            </div>

            {/* Requested Audit Checklist */}
            <div className="space-y-2 text-xs">
              <h4 className="font-mono uppercase text-[11px] font-bold text-ink tracking-wider">
                Requested Documents for Engineering Audit:
              </h4>

              <div className="space-y-2">
                <label className="flex items-center justify-between p-3 rounded-lg border border-ink/[0.08] bg-surface">
                  <div className="flex items-center gap-2.5">
                    <FileText size={16} className="text-copper" />
                    <div>
                      <p className="font-semibold text-ink">Company Incorporation / GST Tax Certificate</p>
                      <span className="text-[10px] text-slate">Legal entity verification</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-700 font-semibold">Ready</span>
                </label>

                <label className="flex items-center justify-between p-3 rounded-lg border border-ink/[0.08] bg-surface">
                  <div className="flex items-center gap-2.5">
                    <FileText size={16} className="text-copper" />
                    <div>
                      <p className="font-semibold text-ink">ISO 9001 / IATF Quality Certificates</p>
                      <span className="text-[10px] text-slate">Accredited registrar validation</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-700 font-semibold">Ready</span>
                </label>

                <label className="flex items-center justify-between p-3 rounded-lg border border-ink/[0.08] bg-surface">
                  <div className="flex items-center gap-2.5">
                    <FileText size={16} className="text-slate" />
                    <div>
                      <p className="font-semibold text-ink">Key Machine Purchase Invoices</p>
                      <span className="text-[10px] text-slate">Proves machine ownership & precision specs</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-amber-700 font-semibold">Upload in Portal</span>
                </label>

                <label className="flex items-center justify-between p-3 rounded-lg border border-ink/[0.08] bg-surface">
                  <div className="flex items-center gap-2.5">
                    <FileText size={16} className="text-slate" />
                    <div>
                      <p className="font-semibold text-ink">Factory Floor & CMM Metrology Lab Photos</p>
                      <span className="text-[10px] text-slate">Premises and QA apparatus validation</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-amber-700 font-semibold">Upload in Portal</span>
                </label>
              </div>
            </div>

            <div className="pt-2 text-center">
              <Button
                type="button"
                onClick={() => openComingSoonModal()}
                variant="primary"
                size="lg"
                className="w-full"
                iconTrailing={<ArrowRight size={14} weight="bold" />}
              >
                Enter Supplier Portal & Submit Audit Pack
              </Button>
              <p className="text-[11px] text-slate mt-2">
                Our sourcing desk will assign an engineering auditor within 24 hours.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
