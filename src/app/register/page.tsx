"use client";

import { useState } from "react";
import Link from "next/link";
import { BuyerOnboardingWizard } from "@/features/auth/BuyerOnboardingWizard";
import { SupplierOnboardingWizard } from "@/features/auth/SupplierOnboardingWizard";
import { RouteGate } from "@/components/auth/RouteGate";
import {
  ShoppingBag,
  Factory,
  ArrowRight,
} from "@phosphor-icons/react";

type RegistrationRole = "select" | "buyer" | "supplier";

export default function RegisterPage() {
  const [role, setRole] = useState<RegistrationRole>("select");

  return (
    <RouteGate>
      <div className="py-12 md:py-20 bg-paper min-h-screen">
      <div className="grid-page">
        <div className="col-content max-w-2xl mx-auto">
          {/* ── Role Selection Screen ──────────────────────────── */}
          {role === "select" && (
            <div className="space-y-8 text-center">
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-copper font-bold px-2 py-0.5 rounded bg-copper/10">
                    B2B ONBOARDING PORTAL
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-ink">
                  What brings you to LINKSUPPLIED?
                </h1>

                <p className="mt-3 text-sm text-slate max-w-[50ch] mx-auto leading-relaxed">
                  Select your role to configure your dedicated workspace and matching preferences.
                </p>
              </div>

              {/* Two Role Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                {/* Option 1: Buyer */}
                <button
                  type="button"
                  onClick={() => setRole("buyer")}
                  className="group bg-surface rounded-2xl border border-ink/[0.08] hover:border-copper p-6 shadow-xs transition-all hover:shadow-md text-left flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-copper/10 text-copper flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                      <ShoppingBag size={24} weight="bold" />
                    </div>

                    <span className="text-[10px] font-mono uppercase text-slate tracking-wider block">
                      Procurement / Engineering
                    </span>
                    <h2 className="text-lg font-bold text-ink mt-1">
                      I&apos;m sourcing parts
                    </h2>
                    <p className="text-xs text-slate mt-2 leading-relaxed">
                      Submit technical requirements, evaluate verified supplier machinery and tolerances, and receive direct quotations without broker markups.
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-copper mt-6 group-hover:translate-x-1 transition-transform">
                    Continue as buyer
                    <ArrowRight size={13} weight="bold" />
                  </div>
                </button>

                {/* Option 2: Manufacturer */}
                <button
                  type="button"
                  onClick={() => setRole("supplier")}
                  className="group bg-surface rounded-2xl border border-ink/[0.08] hover:border-copper p-6 shadow-xs transition-all hover:shadow-md text-left flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-ink/[0.06] text-ink flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                      <Factory size={24} weight="bold" />
                    </div>

                    <span className="text-[10px] font-mono uppercase text-slate tracking-wider block">
                      Factory / Plant Operations
                    </span>
                    <h2 className="text-lg font-bold text-ink mt-1">
                      I&apos;m a manufacturer
                    </h2>
                    <p className="text-xs text-slate mt-2 leading-relaxed">
                      Build a verified capability dossier, undergo engineering audit, and receive relevant technical briefs matching your machine envelope.
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-copper mt-6 group-hover:translate-x-1 transition-transform">
                    Continue as manufacturer
                    <ArrowRight size={13} weight="bold" />
                  </div>
                </button>
              </div>

              <p className="text-xs text-slate pt-2">
                Already registered with LINKSUPPLIED?{" "}
                <Link
                  href="/login"
                  className="text-copper hover:text-copper-muted font-semibold underline underline-offset-2"
                >
                  Log in to your portal
                </Link>
              </p>
            </div>
          )}

          {/* ── Buyer Onboarding Flow ──────────────────────────── */}
          {role === "buyer" && (
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setRole("select")}
                className="text-xs text-slate hover:text-ink transition-colors font-medium flex items-center gap-1"
              >
                ← Switch role selection
              </button>
              <BuyerOnboardingWizard />
            </div>
          )}

          {/* ── Supplier Onboarding Flow ───────────────────────── */}
          {role === "supplier" && (
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setRole("select")}
                className="text-xs text-slate hover:text-ink transition-colors font-medium flex items-center gap-1"
              >
                ← Switch role selection
              </button>
              <SupplierOnboardingWizard />
            </div>
          )}
        </div>
      </div>
    </div>
    </RouteGate>
  );
}
