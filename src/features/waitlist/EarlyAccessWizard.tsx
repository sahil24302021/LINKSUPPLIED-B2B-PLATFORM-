"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { ArrowLeft, ArrowRight, Check, CheckCircle, WhatsappLogo } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { RESPONSE_WINDOW, type EarlyAccessRole, type EarlyAccessSubmission } from "@/types";

const DRAFT_KEY = "linksupplied-early-access-draft-v2";
const COUNTRY_CODES = [
  { code: "IN", dialCode: "+91", name: "India", flag: "🇮🇳" },
  { code: "US", dialCode: "+1", name: "United States", flag: "🇺🇸" },
  { code: "GB", dialCode: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "AE", dialCode: "+971", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "SG", dialCode: "+65", name: "Singapore", flag: "🇸🇬" },
  { code: "DE", dialCode: "+49", name: "Germany", flag: "🇩🇪" },
];
const PROCESS_OPTIONS = ["CNC turning", "VMC / CNC milling", "Laser cutting", "Bending / press brake", "Welding & fabrication", "Casting / forging", "Injection moulding", "Other"];
const MANUFACTURER_METHODS = ["Referrals", "IndiaMART / online listings", "Trade fairs", "Our sales team", "We rarely get new customers", "Other"];
const BUYER_METHODS = ["Existing suppliers / referrals", "Google / IndiaMART", "Trade fairs", "Agents or brokers", "Other"];
const BUYER_PROBLEMS = ["Can't find the right supplier", "Quality is inconsistent", "Deliveries are late", "Hard to compare prices", "Other"];

type ErrorMap = Partial<Record<keyof EarlyAccessSubmission | "processes" | "method" | "problem", string>>;
type SelectionKey = "processes" | "method" | "problem";
type Draft = {
  form: EarlyAccessSubmission;
  countryCode: string;
  phoneNational: string;
  selections: Record<SelectionKey, string[]>;
  otherText: Record<SelectionKey, string>;
};

const INITIAL_FORM: EarlyAccessSubmission = {
  fullName: "", workEmail: "", phone: "", companyName: "", location: "", role: "",
  buyerCommodities: "", buyerCurrentMethod: "", buyerBiggestProblem: "", supplierProducts: "", supplierProcesses: "", companyUrl: "",
};

const ROLE_OPTIONS: { role: EarlyAccessRole; title: string; description: string }[] = [
  { role: "manufacturer", title: "I'm a manufacturer or supplier", description: "I want buyers to find my company and send me enquiries." },
  { role: "buyer", title: "I'm a buyer", description: "I want to find the right suppliers for what I need." },
  { role: "both", title: "Both", description: "I make or supply products, and I also buy from other suppliers." },
];

function cleanPhone(value: string) {
  return value.replace(/[^\d\s]/g, "");
}

function selectedText(selected: string[], other: string) {
  return selected.map((item) => item === "Other" ? other.trim() : item).filter(Boolean).join(", ");
}

export function EarlyAccessWizard({ onSubmitted }: { onSubmitted?: () => void }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<EarlyAccessSubmission>(INITIAL_FORM);
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNational, setPhoneNational] = useState("");
  const [selections, setSelections] = useState<Record<SelectionKey, string[]>>({ processes: [], method: [], problem: [] });
  const [otherText, setOtherText] = useState<Record<SelectionKey, string>>({ processes: "", method: "", problem: "" });
  const [errors, setErrors] = useState<ErrorMap>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [confirmedReference, setConfirmedReference] = useState("");
  const [isExisting, setIsExisting] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const reduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(DRAFT_KEY);
      if (stored) {
        const draft = JSON.parse(stored) as Partial<Draft>;
        if (draft.form) setForm({ ...INITIAL_FORM, ...draft.form, companyUrl: "" });
        if (typeof draft.countryCode === "string") setCountryCode(draft.countryCode);
        if (typeof draft.phoneNational === "string") setPhoneNational(cleanPhone(draft.phoneNational));
        if (draft.selections) setSelections({ ...draft.selections, processes: draft.selections.processes || [], method: draft.selections.method || [], problem: draft.selections.problem || [] });
        if (draft.otherText) setOtherText({ ...draft.otherText, processes: draft.otherText.processes || "", method: draft.otherText.method || "", problem: draft.otherText.problem || "" });
      }
    } catch {
      // Storage is optional. The form remains usable when it is blocked or corrupt.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated || step === 4) return;
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ form, countryCode, phoneNational, selections, otherText } satisfies Draft));
    } catch {
      // Storage is optional.
    }
  }, [countryCode, form, hydrated, otherText, phoneNational, selections, step]);

  useEffect(() => {
    if (!hydrated) return;
    if (step <= 3) track("ea_step_view", { step, role: form.role || "unselected" });
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    cardRef.current?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    window.setTimeout(() => headingRef.current?.focus(), prefersReducedMotion ? 0 : 150);
    document.title = step === 4 ? "Early access request received | LINKSUPPLIED" : document.title;
    return () => window.clearTimeout(0);
  }, [form.role, hydrated, step]);

  const updateField = <K extends keyof EarlyAccessSubmission>(field: K, value: EarlyAccessSubmission[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setServerError("");
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const updateRole = (role: EarlyAccessRole) => {
    if (role === form.role) return;
    const clearSupplier = role === "buyer";
    const clearBuyer = role === "manufacturer";
    setForm((current) => ({
      ...current,
      role,
      supplierProducts: clearSupplier ? "" : current.supplierProducts,
      supplierProcesses: clearSupplier ? "" : current.supplierProcesses,
      buyerCommodities: clearBuyer ? "" : current.buyerCommodities,
      buyerCurrentMethod: clearBuyer ? "" : current.buyerCurrentMethod,
      buyerBiggestProblem: clearBuyer ? "" : current.buyerBiggestProblem,
    }));
    if (clearSupplier) setSelections((current) => ({ ...current, processes: [] }));
    if (clearBuyer) setSelections((current) => ({ ...current, method: [], problem: [] }));
    setErrors((current) => ({ ...current, role: undefined }));
  };

  const validate = (targetStep: number): ErrorMap => {
    const next: ErrorMap = {};
    if (targetStep === 1 && !form.role) next.role = "Choose the option that best describes you.";
    if (targetStep === 2) {
      if (form.companyName.trim().length < 2 || form.companyName.trim().length > 100) next.companyName = "Enter a company name between 2 and 100 characters.";
      if (form.fullName.trim().length < 2 || form.fullName.trim().length > 80) next.fullName = "Enter your name between 2 and 80 characters.";
      const digits = phoneNational.replace(/\D/g, "");
      if (!digits || (countryCode === "+91" ? !/^[6-9]\d{9}$/.test(digits) : digits.length < 6 || digits.length > 14)) next.phone = countryCode === "+91" ? "Please enter a valid 10-digit WhatsApp number." : "Enter a WhatsApp number with 6 to 14 digits.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.workEmail.trim())) next.workEmail = "Enter a valid email address.";
      if (form.location.trim().length < 2 || form.location.trim().length > 80) next.location = "Enter a city and state between 2 and 80 characters.";
    }
    if (targetStep === 3) {
      const supplier = form.role === "manufacturer" || form.role === "both";
      const buyer = form.role === "buyer";
      if (supplier) {
        if (!form.supplierProducts.trim() || form.supplierProducts.trim().length > 150) next.supplierProducts = "Tell us what you make or supply (up to 150 characters).";
        if (!selections.processes.length || (selections.processes.includes("Other") && !otherText.processes.trim())) next.processes = "Choose at least one process and describe Other if selected.";
      }
      if (buyer) {
        if (!form.buyerCommodities.trim() || form.buyerCommodities.trim().length > 150) next.buyerCommodities = "Tell us what you need to source (up to 150 characters).";
        if (!selections.method.length || (selections.method.includes("Other") && !otherText.method.trim())) next.method = "Choose at least one way you find suppliers and describe Other if selected.";
      }
    }
    return next;
  };

  const showValidation = (targetStep: number) => {
    const next = validate(targetStep);
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) window.setTimeout(() => document.getElementById(`ea-${first}`)?.focus(), 0);
    return Object.keys(next).length === 0;
  };

  const toggleChip = (key: SelectionKey, option: string) => {
    setSelections((current) => {
      const hasOption = current[key].includes(option);
      return { ...current, [key]: hasOption ? current[key].filter((item) => item !== option) : [...current[key], option] };
    });
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const onBlur = (_field: keyof ErrorMap) => {
    if (step === 2 || step === 3) setErrors((current) => ({ ...current, ...validate(step) }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    if (step < 3) {
      if (!showValidation(step)) return;
      track("ea_step_complete", { step, role: form.role || "unselected" });
      setStep((current) => current + 1);
      return;
    }
    if (!showValidation(3)) return;

    setIsSubmitting(true);
    setServerError("");
    const requestForm = {
      ...form,
      phone: `${countryCode} ${phoneNational.trim()}`,
      supplierProcesses: selectedText(selections.processes, otherText.processes),
      buyerCurrentMethod: selectedText(selections.method, otherText.method),
      buyerBiggestProblem: selectedText(selections.problem, otherText.problem),
      company_url: form.companyUrl,
    };
    try {
      const response = await fetch("/api/early-access", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(requestForm) });
      const data: { success?: boolean; referenceId?: string; isExisting?: boolean; message?: string } = await response.json().catch(() => ({}));
      if (!response.ok || !data.success) {
        track("ea_submit_error", { role: form.role || "unselected", status: response.status });
        setServerError(data.message || "We could not send your request. Please try again.");
        return;
      }
      try { sessionStorage.removeItem(DRAFT_KEY); } catch { /* Storage is optional. */ }
      setConfirmedReference(data.referenceId || "EA-RECEIVED");
      setIsExisting(Boolean(data.isExisting));
      track("ea_submit_success", { role: form.role || "unselected" });
      setStep(4);
      onSubmitted?.();
    } catch (error) {
      console.error("[EarlyAccess] Network submission error:", error);
      track("ea_submit_error", { role: form.role || "unselected", status: "network" });
      setServerError("Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderChips = (key: SelectionKey, options: string[], label: string, required: boolean) => (
    <fieldset id={`ea-${key}`} tabIndex={-1} className="space-y-2 outline-none" aria-describedby={errors[key] ? `ea-${key}-error` : undefined}>
      <legend className="text-sm font-semibold text-ink">{label}{required ? "" : " (optional)"}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = selections[key].includes(option);
          return <button key={option} type="button" aria-pressed={selected} onClick={() => toggleChip(key, option)} className={`inline-flex min-h-11 items-center gap-1.5 rounded-lg border px-3 py-2 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 ${selected ? "border-copper bg-copper/10 text-ink" : "border-ink/[0.14] bg-paper text-slate hover:border-ink/[0.3] hover:text-ink"}`}>
            {selected && <Check size={16} weight="bold" aria-hidden="true" />}{option}
          </button>;
        })}
      </div>
      {selections[key].includes("Other") && <input id={`ea-${key}-other`} autoFocus maxLength={80} value={otherText[key]} onBlur={() => onBlur(key)} onChange={(event) => { setOtherText((current) => ({ ...current, [key]: event.target.value })); if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined })); }} className="min-h-11 w-full rounded-lg border border-ink/[0.16] bg-paper px-3 text-base text-ink outline-none focus-visible:border-copper focus-visible:ring-2 focus-visible:ring-copper/30" placeholder="Please describe" aria-label={`${label}: other`} />}
      {errors[key] && <p id={`ea-${key}-error`} className="text-sm text-red-700">{errors[key]}</p>}
    </fieldset>
  );

  if (step === 4) {
    const shareText = encodeURIComponent("I just joined LINKSUPPLIED early access, a platform to help manufacturers and buyers find each other. Join here: https://linksupplied-b2b.vercel.app/early-access");
    const canPost = form.role === "buyer" || form.role === "both";
    return <motion.div ref={cardRef} initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }} className="w-full max-w-2xl overflow-hidden rounded-2xl border border-ink/[0.08] bg-surface p-5 shadow-xs sm:p-8">
      <div className="mx-auto max-w-md space-y-6 text-center">
        <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.78 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.08, type: "spring", stiffness: 260, damping: 18 }} className="mx-auto flex size-16 items-center justify-center rounded-full border border-copper/25 bg-copper/10 text-copper shadow-[0_10px_30px_rgba(194,97,56,0.12)]"><CheckCircle size={36} weight="fill" aria-hidden="true" /></motion.div>
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14, duration: 0.3 }} className="space-y-2">
          <span className="inline-flex rounded bg-copper/10 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-copper">{isExisting ? "Already registered" : "Request received"}</span>
          <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-bold text-ink outline-none sm:text-3xl">You&apos;re on the early access list</h2>
          <p className="text-sm leading-relaxed text-slate">Thank you, {form.fullName}. Your reference is <span className="font-mono font-semibold text-ink">{confirmedReference}</span>.</p>
        </motion.div>
        <motion.section initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.32 }} className="space-y-3 rounded-xl border border-ink/[0.08] bg-paper p-4 text-left">
          <h3 className="text-sm font-bold text-ink">What happens next</h3>
          <ol className="space-y-3 text-sm leading-relaxed text-slate">
            <li className="flex gap-3"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-copper/10 text-xs font-bold text-copper">1</span><span>We review your details.</span></li>
            <li className="flex gap-3"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-copper/10 text-xs font-bold text-copper">2</span><span>We contact you on WhatsApp at <span className="font-medium text-ink">{form.phone}</span> within {RESPONSE_WINDOW}.</span></li>
            <li className="flex gap-3"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-copper/10 text-xs font-bold text-copper">3</span><span>{form.role === "buyer" ? "We will help you find suppliers for what you need." : "As we start matching suppliers with buyer requirements, we will reach out to you."}</span></li>
          </ol>
          <p className="break-all text-sm text-slate">A confirmation was sent to {form.workEmail}.</p><p className="text-sm text-slate">Can&apos;t find the email? Check your Spam folder.</p>
        </motion.section>
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26, duration: 0.32 }} className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          {canPost && <Button href="/discover" variant="primary" size="md" className="w-full sm:w-auto" iconTrailing={<ArrowRight size={16} weight="bold" />}>Post a sourcing requirement</Button>}
          <Button href="/" variant={canPost ? "secondary" : "primary"} size="md" className="w-full sm:w-auto">Back to homepage</Button>
        </motion.div>
        <motion.a initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.32, duration: 0.3 }} href={`https://wa.me/?text=${shareText}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-copper underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2"><WhatsappLogo size={18} weight="fill" aria-hidden="true" />Share on WhatsApp</motion.a>
      </div>
    </motion.div>;
  }

  const stepName = step === 1 ? "About you" : step === 2 ? "Contact" : "Your business";
  return <div ref={cardRef} className="w-full max-w-2xl overflow-hidden rounded-2xl border border-ink/[0.08] bg-surface shadow-xs">
    <div className="border-b border-ink/[0.06] bg-paper p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-3"><span className="font-mono text-xs font-medium text-slate">Step {step} of 3</span><span className="rounded-full bg-ink/[0.05] px-2.5 py-1 text-xs font-semibold text-ink">{stepName}</span></div>
      <div className="grid grid-cols-3 gap-1.5" aria-label={`Step ${step} of 3`}><span className="sr-only">{`Step ${step} of 3: ${stepName}`}</span>{[1, 2, 3].map((item) => <span key={item} className="h-1.5 overflow-hidden rounded-full bg-ink/[0.1]"><motion.span initial={false} animate={{ width: item <= step ? "100%" : "0%" }} transition={reduceMotion ? { duration: 0 } : { duration: 0.32, ease: "easeOut" }} className="block h-full rounded-full bg-copper" /></span>)}</div>
    </div>
    <form noValidate onSubmit={handleSubmit} className="space-y-6 p-4 sm:p-6 md:p-8">
      <div className="sr-only" aria-live="polite">{`Step ${step} of 3: ${stepName}`}</div>
      {step === 1 && <section className="mx-auto max-w-md space-y-5">
        <div><h2 ref={headingRef} tabIndex={-1} className="text-xl font-bold text-ink outline-none">What best describes you?</h2><p className="mt-1 text-sm leading-relaxed text-slate">Choose the option that fits your business today.</p></div>
        <div id="ea-role" role="radiogroup" aria-describedby={errors.role ? "ea-role-error" : undefined} className="space-y-3">
          {ROLE_OPTIONS.map(({ role, title, description }) => { const selected = form.role === role; return <button key={role} type="button" role="radio" aria-checked={selected} onClick={() => updateRole(role)} className={`w-full rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 ${selected ? "border-copper bg-copper/10" : "border-ink/[0.1] bg-paper hover:border-ink/[0.3]"}`}><span className="flex items-start justify-between gap-3"><span><span className="block text-base font-bold text-ink">{title}</span><span className="mt-1 block text-sm leading-relaxed text-slate">{description}</span></span>{selected && <CheckCircle className="shrink-0 text-copper" size={22} weight="fill" aria-hidden="true" />}</span></button>; })}
        </div>
        {errors.role && <p id="ea-role-error" className="text-sm text-red-700">{errors.role}</p>}
      </section>}
      {step === 2 && <section className="mx-auto max-w-md space-y-4">
        <div><h2 ref={headingRef} tabIndex={-1} className="text-xl font-bold text-ink outline-none">Your contact details</h2><p className="mt-1 text-sm leading-relaxed text-slate">We only use these details to contact you about early access.</p></div>
        {([ ["companyName", "Company name", "e.g. Sai Engineering Works", "organization"], ["fullName", "Your name", "e.g. Rahul Patil", "name"], ["workEmail", "Email", "you@example.com", "email"], ["location", "City and state", "e.g. Pune, Maharashtra", "address-level2"] ] as const).map(([field, label, placeholder, autoComplete]) => <div key={field} className="space-y-1.5"><label htmlFor={`ea-${field}`} className="text-sm font-semibold text-ink">{label}</label><input id={`ea-${field}`} type={field === "workEmail" ? "email" : "text"} autoComplete={autoComplete} value={form[field]} onBlur={() => onBlur(field)} onChange={(event) => updateField(field, event.target.value)} placeholder={placeholder} maxLength={field === "companyName" ? 100 : field === "fullName" || field === "location" ? 80 : undefined} aria-invalid={Boolean(errors[field])} aria-describedby={errors[field] ? `ea-${field}-error` : undefined} className="min-h-11 w-full rounded-lg border border-ink/[0.16] bg-paper px-3 text-base text-ink outline-none placeholder:text-slate/80 focus-visible:border-copper focus-visible:ring-2 focus-visible:ring-copper/30" />{errors[field] && <p id={`ea-${field}-error`} className="text-sm text-red-700">{errors[field]}</p>}</div>)}
        <div className="space-y-1.5"><label htmlFor="ea-phone" className="text-sm font-semibold text-ink">WhatsApp number</label><div className="flex min-w-0 rounded-lg border border-ink/[0.16] bg-paper focus-within:border-copper focus-within:ring-2 focus-within:ring-copper/30"><select value={countryCode} onChange={(event) => { setCountryCode(event.target.value); updateField("phone", `${event.target.value} ${phoneNational.trim()}`); }} className="h-11 w-[92px] shrink-0 border-r border-ink/[0.12] bg-transparent px-2 text-base text-ink outline-none" aria-label="Country code">{COUNTRY_CODES.map((country) => <option key={`${country.code}-${country.dialCode}`} value={country.dialCode} aria-label={`${country.name} ${country.dialCode}`}>{country.flag} {country.dialCode}</option>)}</select><input id="ea-phone" type="tel" inputMode="tel" autoComplete="tel-national" value={phoneNational} onBlur={() => onBlur("phone")} onChange={(event) => { const value = cleanPhone(event.target.value); setPhoneNational(value); updateField("phone", value ? `${countryCode} ${value.trim()}` : ""); }} placeholder="98765 43210" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "ea-phone-error" : undefined} className="min-w-0 flex-1 bg-transparent px-3 text-base text-ink outline-none placeholder:text-slate/80" /></div>{errors.phone && <p id="ea-phone-error" className="text-sm text-red-700">{errors.phone}</p>}</div>
      </section>}
      {step === 3 && <section className="mx-auto max-w-md space-y-5">
        <div><h2 ref={headingRef} tabIndex={-1} className="text-xl font-bold text-ink outline-none">Your business</h2><p className="mt-1 text-sm leading-relaxed text-slate">Answer the first two questions. The last one is optional.</p></div>
        {(form.role === "manufacturer" || form.role === "both") && <><div className="space-y-1.5"><label htmlFor="ea-supplierProducts" className="text-sm font-semibold text-ink">What do you make or supply?</label><input id="ea-supplierProducts" value={form.supplierProducts} onBlur={() => onBlur("supplierProducts")} onChange={(event) => updateField("supplierProducts", event.target.value)} maxLength={150} placeholder="e.g. CNC turned parts, sheet metal brackets" aria-invalid={Boolean(errors.supplierProducts)} aria-describedby={errors.supplierProducts ? "ea-supplierProducts-error" : undefined} className="min-h-11 w-full rounded-lg border border-ink/[0.16] bg-paper px-3 text-base text-ink outline-none placeholder:text-slate/80 focus-visible:border-copper focus-visible:ring-2 focus-visible:ring-copper/30" />{errors.supplierProducts && <p id="ea-supplierProducts-error" className="text-sm text-red-700">{errors.supplierProducts}</p>}</div>{renderChips("processes", PROCESS_OPTIONS, "Which machines or processes do you have?", true)}</>}
        {form.role === "manufacturer" && renderChips("method", MANUFACTURER_METHODS, "How do you find new customers today?", false)}
        {form.role === "buyer" && <><div className="space-y-1.5"><label htmlFor="ea-buyerCommodities" className="text-sm font-semibold text-ink">What do you need to source?</label><input id="ea-buyerCommodities" value={form.buyerCommodities} onBlur={() => onBlur("buyerCommodities")} onChange={(event) => updateField("buyerCommodities", event.target.value)} maxLength={150} placeholder="e.g. machined parts, packaging machines, fasteners" aria-invalid={Boolean(errors.buyerCommodities)} aria-describedby={errors.buyerCommodities ? "ea-buyerCommodities-error" : undefined} className="min-h-11 w-full rounded-lg border border-ink/[0.16] bg-paper px-3 text-base text-ink outline-none placeholder:text-slate/80 focus-visible:border-copper focus-visible:ring-2 focus-visible:ring-copper/30" />{errors.buyerCommodities && <p id="ea-buyerCommodities-error" className="text-sm text-red-700">{errors.buyerCommodities}</p>}</div>{renderChips("method", BUYER_METHODS, "How do you find suppliers today?", true)}{renderChips("problem", BUYER_PROBLEMS, "What is your biggest problem when sourcing?", false)}</>}
        {form.role === "both" && <div className="space-y-1.5"><label htmlFor="ea-buyerCommodities" className="text-sm font-semibold text-ink">What do you need to source? <span className="font-normal text-slate">(optional)</span></label><input id="ea-buyerCommodities" value={form.buyerCommodities} onChange={(event) => updateField("buyerCommodities", event.target.value)} maxLength={150} placeholder="e.g. machined parts, packaging machines, fasteners" className="min-h-11 w-full rounded-lg border border-ink/[0.16] bg-paper px-3 text-base text-ink outline-none placeholder:text-slate/80 focus-visible:border-copper focus-visible:ring-2 focus-visible:ring-copper/30" /></div>}
        <input name="company_url" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.companyUrl} onChange={(event) => updateField("companyUrl", event.target.value)} className="absolute size-px overflow-hidden opacity-0" />
        {serverError && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">{serverError}</p>}
      </section>}
      <div className={`mx-auto flex max-w-md flex-col-reverse gap-3 pt-1 ${step > 1 ? "sm:flex-row sm:justify-between" : ""}`}>
        {step > 1 && <Button type="button" variant="secondary" size="md" onClick={() => setStep((current) => current - 1)} disabled={isSubmitting} className="w-full sm:w-auto" iconLeading={<ArrowLeft size={16} weight="bold" />}>Back</Button>}
        <Button type="submit" variant="primary" size="md" loading={isSubmitting} loadingText="Submitting..." className="w-full sm:ml-auto sm:w-auto" iconTrailing={step < 3 ? <ArrowRight size={16} weight="bold" /> : undefined}>{step < 3 ? "Continue" : "Submit"}</Button>
      </div>
    </form>
  </div>;
}
