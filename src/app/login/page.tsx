"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { InstantEvaluationModal } from "@/components/ui/InstantEvaluationModal";
import { setDemoMode } from "@/lib/demo-mode";
import { openComingSoonModal } from "@/lib/coming-soon";
import {
  ShoppingBag,
  Factory,
  ArrowRight,
  Sparkle,
} from "@phosphor-icons/react";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"buyer" | "supplier">("buyer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading] = useState(false);
  const [isEvalModalOpen, setIsEvalModalOpen] = useState(false);

  const handleFieldInteraction = (
    e: React.FocusEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>
  ) => {
    e.currentTarget.blur();
    openComingSoonModal();
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Pre-launch gating: Intercept all login attempts and show ComingSoonModal
    openComingSoonModal();
  };

  const handleLaunchDemo = (demoRole: "buyer" | "supplier") => {
    setDemoMode(demoRole);
    if (demoRole === "buyer") {
      router.push("/dashboard/buyer?demo=buyer");
    } else {
      router.push("/dashboard/supplier?demo=supplier");
    }
  };

  return (
    <div className="py-14 md:py-20 bg-paper min-h-screen">
      <div className="max-w-md mx-auto px-4 sm:px-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <span className="text-[10px] font-mono uppercase tracking-widest text-copper font-bold px-2 py-0.5 rounded bg-copper/10 inline-block mb-2">
            ENTERPRISE ACCESS
          </span>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
            Sign In to Your Workspace
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate">
            Secure workspace for procurement teams and audited manufacturing facilities.
          </p>
        </div>

        {/* Role Switcher Tabs */}
        <div className="grid grid-cols-2 gap-2 bg-surface p-1 rounded-xl border border-ink/[0.08] text-xs">
          <button
            type="button"
            onClick={() => setRole("buyer")}
            className={`flex items-center justify-center gap-2 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
              role === "buyer"
                ? "bg-ink text-surface shadow-xs"
                : "text-slate hover:text-ink"
            }`}
          >
            <ShoppingBag size={14} />
            Buyer Workspace
          </button>

          <button
            type="button"
            onClick={() => setRole("supplier")}
            className={`flex items-center justify-center gap-2 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
              role === "supplier"
                ? "bg-ink text-surface shadow-xs"
                : "text-slate hover:text-ink"
            }`}
          >
            <Factory size={14} />
            Manufacturer Desk
          </button>
        </div>

        {/* Real Production Login Card (Clean - Zero Demo Buttons inside) */}
        <Card level="primary" className="p-6 sm:p-8">
          <form className="space-y-4" onSubmit={handleLogin} autoComplete="off">
            <FormField
              id="login-email"
              label="Corporate Work Email"
              required
            >
              <Input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={handleFieldInteraction}
                onClick={handleFieldInteraction}
                autoComplete="off"
                placeholder="name@company.com"
                required
              />
            </FormField>

            <FormField
              id="login-password"
              label={
                <span className="flex items-center justify-between w-full">
                  <span>Password</span>
                  <span className="text-[10px] text-slate/70 font-normal cursor-pointer hover:underline">
                    Forgot?
                  </span>
                </span>
              }
              required
            >
              <Input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={handleFieldInteraction}
                onClick={handleFieldInteraction}
                autoComplete="new-password"
                placeholder="••••••••••••"
                required
              />
            </FormField>

            <Button
              type="submit"
              isLoading={loading}
              variant="primary"
              size="lg"
              className="w-full mt-2"
              iconTrailing={<ArrowRight size={13} weight="bold" />}
            >
              Enter {role === "buyer" ? "Buyer Workspace" : "Manufacturer Desk"}
            </Button>
          </form>

          <p className="mt-5 text-center text-xs text-slate border-t border-ink/[0.06] pt-4">
            Need to onboard your organization?{" "}
            <Link
              href="/register"
              className="text-copper hover:text-copper-muted font-semibold underline underline-offset-2"
            >
              Register here
            </Link>
          </p>
        </Card>

        {/* ── Separate "Instant Evaluation Mode" Section ────────────── */}
        <div className="rounded-2xl border border-copper/30 bg-copper/[0.03] p-5 text-xs space-y-3 shadow-xs">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkle size={15} className="text-copper" weight="bold" />
              <strong className="text-ink font-semibold">Instant Evaluation Mode</strong>
            </div>
            <span className="text-[10px] font-mono text-copper font-bold px-1.5 py-0.5 rounded bg-copper/10">
              DEMO
            </span>
          </div>

          <p className="text-slate text-[11px] leading-relaxed">
            Explore buyer and supplier procurement workflows with pre-loaded industrial sample records without entering credentials.
          </p>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleLaunchDemo("buyer")}
              className="p-2.5 rounded-xl bg-surface border border-ink/[0.1] hover:border-copper text-left transition-all group cursor-pointer shadow-xs"
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-bold text-ink text-xs group-hover:text-copper transition-colors">
                  Try as Buyer
                </span>
                <ArrowRight size={11} className="text-slate group-hover:text-copper transition-colors" />
              </div>
              <span className="text-[10px] text-slate block truncate">
                AeroTech Hydraulics
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleLaunchDemo("supplier")}
              className="p-2.5 rounded-xl bg-surface border border-ink/[0.1] hover:border-copper text-left transition-all group cursor-pointer shadow-xs"
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-bold text-ink text-xs group-hover:text-copper transition-colors">
                  Try as Supplier
                </span>
                <ArrowRight size={11} className="text-slate group-hover:text-copper transition-colors" />
              </div>
              <span className="text-[10px] text-slate block truncate">
                PrecisionCast Plant
              </span>
            </button>
          </div>

          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => setIsEvalModalOpen(true)}
              className="text-[11px] text-copper hover:underline font-medium cursor-pointer"
            >
              View all evaluation options & details →
            </button>
          </div>
        </div>
      </div>

      {/* Instant Evaluation Modal */}
      <InstantEvaluationModal
        isOpen={isEvalModalOpen}
        onClose={() => setIsEvalModalOpen(false)}
      />
    </div>
  );
}
