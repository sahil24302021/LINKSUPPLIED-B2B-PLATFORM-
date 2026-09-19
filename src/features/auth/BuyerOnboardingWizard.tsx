"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { BuyerOnboardingForm } from "@/types";
import {
  CheckCircle,
  ArrowRight,
  ArrowLeft,
} from "@phosphor-icons/react";
import { openComingSoonModal } from "@/lib/coming-soon";

const INITIAL_BUYER_FORM: BuyerOnboardingForm = {
  fullName: "",
  workEmail: "",
  password: "",
  companyName: "",
  website: "",
  industry: "",
  location: "",
  companySize: "",
  designation: "",
  sourcedCommodities: [],
  annualSourcingVolume: "",
  preferredSupplierRegions: [],
  mandatoryCertifications: [],
};

export function BuyerOnboardingWizard() {
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<BuyerOnboardingForm>(INITIAL_BUYER_FORM);
  const [commodityInput, setCommodityInput] = useState("");

  const updateField = <K extends keyof BuyerOnboardingForm>(
    field: K,
    value: BuyerOnboardingForm[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFieldInteraction = (
    e: React.FocusEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>
  ) => {
    e.currentTarget.blur();
    openComingSoonModal();
  };

  const handleAddCommodity = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && commodityInput.trim()) {
      e.preventDefault();
      if (!form.sourcedCommodities.includes(commodityInput.trim())) {
        updateField("sourcedCommodities", [...form.sourcedCommodities, commodityInput.trim()]);
      }
      setCommodityInput("");
    }
  };

  const handleRemoveCommodity = (comm: string) => {
    updateField(
      "sourcedCommodities",
      form.sourcedCommodities.filter((c) => c !== comm)
    );
  };

  return (
    <div className="bg-surface rounded-2xl border border-ink/[0.08] shadow-xs overflow-hidden">
      {/* Wizard Progress Bar */}
      <div className="p-5 sm:p-6 border-b border-ink/[0.06] bg-paper">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-copper font-bold px-2 py-0.5 rounded bg-copper/10">
              BUYER ONBOARDING
            </span>
            <span className="text-xs font-mono text-slate">
              Step {step} of 4
            </span>
          </div>
          <span className="text-xs text-slate font-medium">
            {step === 1 && "Account Credentials"}
            {step === 2 && "Company Identity"}
            {step === 3 && "Sourcing Profile"}
            {step === 4 && "Workspace Ready"}
          </span>
        </div>

        {/* 4-step progress dots */}
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((s) => (
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
                Create your procurement account
              </h2>
              <p className="text-xs text-slate mt-1">
                Access verified manufacturing capacities and RFQ pipelines.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  onFocus={handleFieldInteraction}
                  onClick={handleFieldInteraction}
                  autoComplete="off"
                  placeholder="e.g. Alex Vance"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none focus:border-copper"
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
                  placeholder="alex@aerotech-hydraulics.de"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none focus:border-copper"
                />
                <span className="text-[10px] text-slate/70 mt-1 block">
                  Please use your enterprise domain for verification.
                </span>
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
                  className="w-full px-3.5 py-2.5 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none focus:border-copper"
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
                About your company
              </h2>
              <p className="text-xs text-slate mt-1">
                Suppliers review your company standing before preparing binding quotes.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Company Legal Name
                </label>
                <input
                  type="text"
                  value={form.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                  placeholder="e.g. AeroTech Hydraulics GmbH"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none focus:border-copper"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Industry
                  </label>
                  <select
                    value={form.industry}
                    onChange={(e) => updateField("industry", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none"
                  >
                    <option value="Industrial Machinery">Industrial Machinery</option>
                    <option value="Automotive & Mobility">Automotive & Mobility</option>
                    <option value="Aerospace & Defense">Aerospace & Defense</option>
                    <option value="Medical Devices">Medical Devices</option>
                    <option value="Packaging & Containers">Packaging & Containers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Company Size
                  </label>
                  <select
                    value={form.companySize}
                    onChange={(e) => updateField("companySize", e.target.value as BuyerOnboardingForm["companySize"])}
                    className="w-full px-3 py-2.5 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none"
                  >
                    <option value="1-10">1–10 employees</option>
                    <option value="11-50">11–50 employees</option>
                    <option value="51-200">51–200 employees</option>
                    <option value="201-1000">201–1,000 employees</option>
                    <option value="1000+">1,000+ enterprise</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Headquarters City
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => updateField("location", e.target.value)}
                    placeholder="Hamburg, Germany"
                    className="w-full px-3 py-2.5 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Your Title / Role
                  </label>
                  <input
                    type="text"
                    value={form.designation}
                    onChange={(e) => updateField("designation", e.target.value)}
                    placeholder="Lead Sourcing Engineer"
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
                Continue to Sourcing Profile
              </Button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Sourcing Profile ───────────────────────── */}
        {step === 3 && (
          <div className="space-y-5 max-w-md mx-auto">
            <div>
              <h2 className="text-xl font-bold text-ink">
                Your sourcing scope
              </h2>
              <p className="text-xs text-slate mt-1">
                Help LINKSUPPLIED pre-filter relevant manufacturing capabilities.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Commodities & Components You Source
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {form.sourcedCommodities.map((comm) => (
                    <span
                      key={comm}
                      className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-copper/10 text-copper font-medium"
                    >
                      {comm}
                      <button
                        type="button"
                        onClick={() => handleRemoveCommodity(comm)}
                        className="hover:text-ink"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  value={commodityInput}
                  onChange={(e) => setCommodityInput(e.target.value)}
                  onKeyDown={handleAddCommodity}
                  placeholder="Type a commodity and press Enter (e.g. Sheet Metal, Forgings)..."
                  className="w-full px-3.5 py-2 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Typical Annual Sourcing Volume
                </label>
                <select
                  value={form.annualSourcingVolume}
                  onChange={(e) => updateField("annualSourcingVolume", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none"
                >
                  <option value="Under ₹10 Lakhs">Under ₹10 Lakhs</option>
                  <option value="₹10 Lakhs - ₹50 Lakhs">₹10 Lakhs – ₹50 Lakhs</option>
                  <option value="₹50 Lakhs - ₹2 Cr">₹50 Lakhs – ₹2 Cr</option>
                  <option value="₹2 Cr - ₹10 Cr">₹2 Cr – ₹10 Cr</option>
                  <option value="₹10 Cr+">₹10 Cr+ Enterprise</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Mandatory Quality Standards
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {["ISO 9001:2015", "IATF 16949", "AS9100D", "ISO 13485"].map((cert) => {
                    const checked = form.mandatoryCertifications.includes(cert);
                    return (
                      <label
                        key={cert}
                        className={`flex items-center gap-2 p-2 rounded-lg border transition-colors cursor-pointer ${
                          checked
                            ? "bg-copper/10 border-copper/30 text-ink font-semibold"
                            : "bg-paper border-ink/[0.08] text-slate"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              updateField("mandatoryCertifications", [...form.mandatoryCertifications, cert]);
                            } else {
                              updateField(
                                "mandatoryCertifications",
                                form.mandatoryCertifications.filter((c) => c !== cert)
                              );
                            }
                          }}
                          className="accent-copper"
                        />
                        <span>{cert}</span>
                      </label>
                    );
                  })}
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
                variant="primary"
                size="md"
                onClick={() => {
                  openComingSoonModal();
                }}
                disabled={!form.password || form.password.length < 8}
              >
                Complete Registration
              </Button>
            </div>
          </div>
        )}

        {/* ── STEP 4: Workspace Ready ────────────────────────── */}
        {step === 4 && (
          <div className="space-y-6 max-w-md mx-auto text-center py-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle size={32} weight="fill" />
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-copper font-bold px-2 py-0.5 rounded bg-copper/10">
                REGISTRATION CONFIRMED
              </span>
              <h2 className="text-2xl font-bold text-ink mt-2">
                Your Sourcing Workspace is Ready
              </h2>
              <p className="text-xs text-slate mt-1 max-w-[44ch] mx-auto leading-relaxed">
                Welcome, <strong className="text-ink">{form.fullName || "Procurement Manager"}</strong>. You can now submit part specifications, inspect audited machine capacities, and dispatch binding RFQs.
              </p>
            </div>

            <div className="bg-paper p-4 rounded-xl border border-ink/[0.06] text-xs text-left space-y-2 text-slate">
              <div className="flex items-center justify-between">
                <span>Account Domain:</span>
                <strong className="text-ink font-mono">{form.workEmail || "buyer@aerotech.de"}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Company:</span>
                <strong className="text-ink">{form.companyName || "AeroTech Hydraulics"}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Access Level:</span>
                <span className="text-emerald-700 font-semibold">Verified Buyer Desk</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button
                href="/dashboard/buyer"
                variant="primary"
                size="md"
                className="w-full sm:w-auto"
                iconTrailing={<ArrowRight size={14} weight="bold" />}
              >
                Go to Buyer Workspace
              </Button>
              <Button
                href="/discover"
                variant="outline"
                size="md"
                className="w-full sm:w-auto"
              >
                Submit First Requirement
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
