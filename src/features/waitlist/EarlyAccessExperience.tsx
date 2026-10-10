"use client";

import { useState } from "react";
import { Clock, CurrencyInr, UsersThree } from "@phosphor-icons/react";
import { EARLY_ACCESS_COST_COPY, RESPONSE_WINDOW } from "@/types/waitlist";
import { EarlyAccessWizard } from "./EarlyAccessWizard";

const INFO_CARDS = [
  { label: "Who it is for", title: "Manufacturers, suppliers and buyers", text: "Factories and suppliers who want more enquiries, and buyers who want reliable suppliers.", icon: UsersThree },
  { label: "What it costs", title: "Free to join", text: EARLY_ACCESS_COST_COPY, icon: CurrencyInr },
  { label: "What happens next", title: "We contact you on WhatsApp", text: `We review your details and reach out within ${RESPONSE_WINDOW}.`, icon: Clock },
];

export function EarlyAccessExperience() {
  const [submitted, setSubmitted] = useState(false);
  return <>
    {!submitted && <>
      <header className="space-y-3 text-center">
        <span className="inline-flex rounded-full border border-copper/25 bg-copper/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-copper">Early access</span>
        <h1 className="break-words text-3xl font-bold tracking-tight text-ink sm:text-4xl">Join LINKSUPPLIED Early Access</h1>
        <p className="mx-auto max-w-[48ch] text-sm leading-relaxed text-slate sm:text-base">Tell us a little about your business. It takes about a minute.</p>
      </header>
      <div className="grid grid-cols-1 gap-3 text-left md:grid-cols-3">
        {INFO_CARDS.map(({ label, title, text, icon: Icon }) => <section key={label} className="min-w-0 space-y-1 rounded-xl border border-ink/[0.08] bg-surface p-4 shadow-xs"><div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wide text-copper"><Icon size={14} weight="bold" aria-hidden="true" />{label}</div><h2 className="text-xs font-bold text-ink">{title}</h2><p className="text-[11px] leading-relaxed text-slate">{text}</p></section>)}
      </div>
    </>}
    <EarlyAccessWizard onSubmitted={() => setSubmitted(true)} />
  </>;
}
