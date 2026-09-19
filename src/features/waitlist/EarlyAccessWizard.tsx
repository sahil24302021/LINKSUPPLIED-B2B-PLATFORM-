"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { EarlyAccessSubmission, EarlyAccessRole } from "@/types";
import {
  Sparkle,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
} from "@phosphor-icons/react";

const INITIAL_SUBMISSION: EarlyAccessSubmission = {
  fullName: "",
  workEmail: "",
  phone: "",
  designation: "",
  companyName: "",
  website: "",
  industry: "",
  location: "",
  companySize: "",
  role: "buyer",
  buyerCommodities: "",
  buyerCurrentMethod: "",
  buyerVolume: "",
  buyerBiggestProblem: "",
  supplierProducts: "",
  supplierProcesses: "",
  supplierMaterials: "",
  supplierCapacity: "",
  supplierCertifications: "",
  platformIntent: "",
  referenceId: "",
  submittedAt: "",
};

const COUNTRY_CODES = [
  { code: "IN", dialCode: "+91", name: "India", flag: "🇮🇳" },
  { code: "DE", dialCode: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "US", dialCode: "+1", name: "United States", flag: "🇺🇸" },
  { code: "GB", dialCode: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "AE", dialCode: "+971", name: "UAE", flag: "🇦🇪" },
  { code: "SG", dialCode: "+65", name: "Singapore", flag: "🇸🇬" },
  { code: "CH", dialCode: "+41", name: "Switzerland", flag: "🇨🇭" },
  { code: "FR", dialCode: "+33", name: "France", flag: "🇫🇷" },
  { code: "IT", dialCode: "+39", name: "Italy", flag: "🇮🇹" },
  { code: "NL", dialCode: "+31", name: "Netherlands", flag: "🇳🇱" },
  { code: "AT", dialCode: "+43", name: "Austria", flag: "🇦🇹" },
  { code: "SE", dialCode: "+46", name: "Sweden", flag: "🇸🇪" },
  { code: "PL", dialCode: "+48", name: "Poland", flag: "🇵🇱" },
  { code: "ES", dialCode: "+34", name: "Spain", flag: "🇪🇸" },
  { code: "JP", dialCode: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "KR", dialCode: "+82", name: "South Korea", flag: "🇰🇷" },
  { code: "VN", dialCode: "+84", name: "Vietnam", flag: "🇻🇳" },
  { code: "TW", dialCode: "+886", name: "Taiwan", flag: "🇹🇼" },
  { code: "CN", dialCode: "+86", name: "China", flag: "🇨🇳" },
  { code: "AU", dialCode: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "CA", dialCode: "+1", name: "Canada", flag: "🇨🇦" },
  { code: "MX", dialCode: "+52", name: "Mexico", flag: "🇲🇽" },
  { code: "SA", dialCode: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
];

export function EarlyAccessWizard() {
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<EarlyAccessSubmission>(INITIAL_SUBMISSION);
  const [countryCode, setCountryCode] = useState<string>("+91");
  const [phoneNational, setPhoneNational] = useState<string>("");
  const [confirmedReference, setConfirmedReference] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateField = <K extends keyof EarlyAccessSubmission>(
    field: K,
    value: EarlyAccessSubmission[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCountryCodeChange = (code: string) => {
    setCountryCode(code);
    const trimmed = phoneNational.trim();
    updateField("phone", trimmed ? `${code} ${trimmed}` : "");
  };

  const handlePhoneChange = (val: string) => {
    const cleanVal = val.replace(/[^\d\s-]/g, "");
    setPhoneNational(cleanVal);
    const trimmed = cleanVal.trim();
    updateField("phone", trimmed ? `${countryCode} ${trimmed}` : "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const trimmedPhone = phoneNational.trim();
      const completePhone = trimmedPhone ? `${countryCode} ${trimmedPhone}` : "";

      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          phone: completePhone,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setConfirmedReference(data.referenceId || "EA-2026-CONFIRMED");
        setStep(6);
      } else {
        setErrorMessage(
          data.message || "Something went wrong. Please try again."
        );
      }
    } catch (err) {
      console.error("[EarlyAccess] Network submission error:", err);
      setErrorMessage("Something went wrong. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface rounded-2xl border border-ink/[0.08] shadow-xs overflow-hidden max-w-2xl mx-auto">
      {/* Header bar */}
      <div className="p-5 sm:p-6 border-b border-ink/[0.06] bg-paper">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-copper font-bold px-2 py-0.5 rounded bg-copper/10">
              PRIORITY ACCESS APPLICATION
            </span>
            <span className="text-xs font-mono text-slate">
              Step {step} of 5
            </span>
          </div>
          <span className="text-xs text-slate font-medium">
            {step === 1 && "Contact Person"}
            {step === 2 && "Company Profile"}
            {step === 3 && "Operational Role"}
            {step === 4 && "Qualification Scope"}
            {step === 5 && "Platform Objectives"}
            {step === 6 && "Application Confirmed"}
          </span>
        </div>

        {step <= 5 && (
          <div className="grid grid-cols-5 gap-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-colors ${
                  s <= step ? "bg-copper" : "bg-ink/[0.08]"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-6 sm:p-8">
        {/* ── STEP 1: About You ──────────────────────────────── */}
        {step === 1 && (
          <div className="space-y-5 max-w-md mx-auto">
            <div>
              <h2 className="text-xl font-bold text-ink">
                About you
              </h2>
              <p className="text-xs text-slate mt-1">
                Tell us who will be leading sourcing or capacity management at your organization.
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
                  placeholder="e.g. David Mueller"
                  required
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
                  placeholder="d.mueller@heavy-machinery.de"
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Phone Number
                  </label>
                  <div className="flex items-center rounded-lg border border-ink/[0.12] bg-paper focus-within:border-copper transition-colors overflow-hidden">
                    <select
                      value={countryCode}
                      onChange={(e) => handleCountryCodeChange(e.target.value)}
                      className="w-[92px] shrink-0 bg-transparent pl-2.5 pr-1 py-2.5 text-xs text-ink font-medium border-r border-ink/[0.08] outline-none cursor-pointer truncate"
                      aria-label="Country Code Selector"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={`${c.code}-${c.dialCode}`} value={c.dialCode} className="bg-surface text-ink">
                          {c.flag} {c.dialCode} ({c.name})
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      value={phoneNational}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder={countryCode === "+91" ? "98765 43210" : countryCode === "+49" ? "170 1234567" : "123 456 7890"}
                      className="w-full min-w-0 px-2.5 py-2.5 bg-transparent text-ink text-xs outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Your Title
                  </label>
                  <input
                    type="text"
                    value={form.designation}
                    onChange={(e) => updateField("designation", e.target.value)}
                    placeholder="Head of Global Sourcing"
                    className="w-full px-3 py-2.5 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none"
                  />
                </div>
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
              Continue to Company Information
            </Button>
          </div>
        )}

        {/* ── STEP 2: Company Information ────────────────────── */}
        {step === 2 && (
          <div className="space-y-5 max-w-md mx-auto">
            <div>
              <h2 className="text-xl font-bold text-ink">
                Company profile
              </h2>
              <p className="text-xs text-slate mt-1">
                Help us understand your enterprise scale and operating sector.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={form.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                  placeholder="Mueller Engineering Group"
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none"
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
                    <option value="">Select industry...</option>
                    <option value="Precision Engineering">Precision Engineering</option>
                    <option value="Automotive & Transportation">Automotive & Transportation</option>
                    <option value="Aerospace & Defense">Aerospace & Defense</option>
                    <option value="Industrial Valves & Hydraulics">Industrial Valves & Hydraulics</option>
                    <option value="Consumer Hardware & Packaging">Consumer Hardware & Packaging</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Company Size
                  </label>
                  <select
                    value={form.companySize}
                    onChange={(e) => updateField("companySize", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none"
                  >
                    <option value="">Select company size...</option>
                    <option value="1-10">1–10 employees</option>
                    <option value="11-50">11–50 employees</option>
                    <option value="51-200">51–200 employees</option>
                    <option value="201-1000">201–1,000 employees</option>
                    <option value="1000+">1,000+ enterprise</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Headquarters Location (City, Country)
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  placeholder="Stuttgart, Germany"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none"
                />
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
                Continue to Role
              </Button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Role Selection ─────────────────────────── */}
        {step === 3 && (
          <div className="space-y-5 max-w-md mx-auto">
            <div>
              <h2 className="text-xl font-bold text-ink">
                How will your team use LINKSUPPLIED?
              </h2>
              <p className="text-xs text-slate mt-1">
                Select your primary operational profile.
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              {[
                {
                  id: "buyer",
                  title: "Buyer / Procurement Team",
                  desc: "We source machined parts, castings, assemblies, or custom components from qualified suppliers.",
                },
                {
                  id: "manufacturer",
                  title: "Manufacturer / Factory Owner",
                  desc: "We own machine tools and want to receive qualified RFQs to fill open capacity.",
                },
                {
                  id: "supplier",
                  title: "Industrial Supplier / Stockist",
                  desc: "We distribute raw materials, hardware, or standard components.",
                },
                {
                  id: "consultant",
                  title: "Sourcing Consultant / Engineering Firm",
                  desc: "We manage procurement pipelines on behalf of enterprise clients.",
                },
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => updateField("role", r.id as EarlyAccessRole)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    form.role === r.id
                      ? "bg-copper/10 border-copper ring-1 ring-copper"
                      : "bg-paper border-ink/[0.08] hover:border-ink/[0.16]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-ink text-sm">{r.title}</p>
                    {form.role === r.id && (
                      <CheckCircle size={18} className="text-copper" weight="fill" />
                    )}
                  </div>
                  <p className="text-xs text-slate mt-1 leading-relaxed">{r.desc}</p>
                </button>
              ))}
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
                Continue to Scope
              </Button>
            </div>
          </div>
        )}

        {/* ── STEP 4: Tailored Qualification ─────────────────── */}
        {step === 4 && (
          <div className="space-y-5 max-w-md mx-auto">
            <div>
              <h2 className="text-xl font-bold text-ink">
                {form.role === "buyer"
                  ? "Your Sourcing Scope"
                  : "Your Manufacturing Scope"}
              </h2>
              <p className="text-xs text-slate mt-1">
                Help us qualify your application for the appropriate onboarding wave.
              </p>
            </div>

            {form.role === "buyer" || form.role === "consultant" ? (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    What components or commodities do you source?
                  </label>
                  <input
                    type="text"
                    value={form.buyerCommodities}
                    onChange={(e) => updateField("buyerCommodities", e.target.value)}
                    placeholder="e.g. 5-axis CNC titanium parts, precision forgings"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Current Sourcing Method
                  </label>
                  <select
                    value={form.buyerCurrentMethod}
                    onChange={(e) => updateField("buyerCurrentMethod", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none"
                  >
                    <option value="">Select current method...</option>
                    <option value="Direct supplier outreach & trade fairs">Direct supplier outreach & trade fairs</option>
                    <option value="Middlemen brokers & trading agents">Middlemen brokers & trading agents</option>
                    <option value="Unvetted online web directories">Unvetted online web directories</option>
                    <option value="In-house internal supplier database">In-house internal supplier database</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Biggest Sourcing Frustration
                  </label>
                  <textarea
                    rows={2}
                    value={form.buyerBiggestProblem}
                    onChange={(e) => updateField("buyerBiggestProblem", e.target.value)}
                    placeholder="e.g. Suppliers claiming 5-axis machines when they only have 3-axis, or unpredictable lead times."
                    className="w-full px-3.5 py-2 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none resize-none"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Key Machine Tools & Processes
                  </label>
                  <input
                    type="text"
                    value={form.supplierProcesses}
                    onChange={(e) => updateField("supplierProcesses", e.target.value)}
                    placeholder="e.g. 5-Axis VMC, Wire EDM, CMM Metrology Lab"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Monthly Production Metric & Capacity
                  </label>
                  <input
                    type="text"
                    value={form.supplierCapacity}
                    onChange={(e) => updateField("supplierCapacity", e.target.value)}
                    placeholder="e.g. 25,000 units/mo, open slots Q4"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Certifications Held
                  </label>
                  <input
                    type="text"
                    value={form.supplierCertifications}
                    onChange={(e) => updateField("supplierCertifications", e.target.value)}
                    placeholder="e.g. ISO 9001:2015, IATF 16949, AS9100D"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none"
                  />
                </div>
              </div>
            )}

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
                Continue to Objectives
              </Button>
            </div>
          </div>
        )}

        {/* ── STEP 5: Platform Objectives ────────────────────── */}
        {step === 5 && (
          <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto">
            <div>
              <h2 className="text-xl font-bold text-ink">
                What would you want LINKSUPPLIED to help you do?
              </h2>
              <p className="text-xs text-slate mt-1">
                Your direct input guides our engineering qualification pipeline.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Primary Objective
                </label>
                <textarea
                  rows={4}
                  value={form.platformIntent}
                  onChange={(e) => updateField("platformIntent", e.target.value)}
                  placeholder="e.g. Connect directly with audited CNC machining facilities capable of holding ±0.01mm tolerances without going through 3 layers of middlemen."
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none resize-none"
                />
              </div>

              {errorMessage && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              <div className="bg-paper p-3.5 rounded-xl border border-ink/[0.06] text-[11px] text-slate space-y-1">
                <span className="font-bold text-ink block">Platform Policy:</span>
                <p>We do not publish artificial waitlist numbers. Early access invitations are extended to engineering organizations based on verified manufacturing fit.</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-3">
              <Button
                type="button"
                onClick={() => setStep(4)}
                variant="secondary"
                size="md"
                disabled={isSubmitting}
                iconLeading={<ArrowLeft size={14} weight="bold" />}
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                iconLeading={
                  isSubmitting ? undefined : <Sparkle size={15} weight="fill" />
                }
              >
                {isSubmitting ? "Joining..." : "Request Early Access"}
              </Button>
            </div>
          </form>
        )}

        {/* ── STEP 6: Confirmation ───────────────────────────── */}
        {step === 6 && (
          <div className="space-y-6 max-w-md mx-auto text-center py-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle size={32} weight="fill" />
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-copper font-bold px-2 py-0.5 rounded bg-copper/10">
                APPLICATION RECEIVED
              </span>
              <h2 className="text-2xl font-bold text-ink mt-2">
                You&apos;re on the Priority List
              </h2>
              <p className="text-xs text-slate mt-1 max-w-[46ch] mx-auto leading-relaxed">
                Thank you, <strong className="text-ink">{form.fullName || "Partner"}</strong>. Your application has been registered under Reference <span className="font-mono text-ink font-semibold">{confirmedReference}</span>.
              </p>
            </div>

            <div className="bg-paper p-4 rounded-xl border border-ink/[0.06] text-xs text-left space-y-2 text-slate">
              <span className="font-bold text-ink font-mono uppercase text-[10px] block">
                Next Operational Milestones:
              </span>
              <ul className="list-disc list-inside space-y-1 text-[11px]">
                <li>Manufacturing capability team reviews corporate domain and sourcing fit.</li>
                <li>You will receive a confidential invitation link at <span className="font-medium text-ink">{form.workEmail || "your email"}</span>.</li>
                <li>Direct engineering onboarding call scheduled for early pilot access.</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button
                href="/discover"
                variant="primary"
                size="md"
                className="w-full sm:w-auto"
                iconTrailing={<ArrowRight size={14} weight="bold" />}
              >
                Submit a Sourcing Brief Now
              </Button>
              <Button
                href="/"
                variant="outline"
                size="md"
                className="w-full sm:w-auto"
              >
                Return to Homepage
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
