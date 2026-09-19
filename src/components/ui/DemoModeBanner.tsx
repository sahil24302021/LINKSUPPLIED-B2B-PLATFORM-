"use client";

import { useRouter, usePathname } from "next/navigation";
import { useDemoMode } from "@/hooks/use-demo-mode";
import { X, UserSwitch } from "@phosphor-icons/react";

interface DemoModeBannerProps {
  redirectOnExit?: string;
}

export function DemoModeBanner({ redirectOnExit }: DemoModeBannerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isDemo, demoRole, setDemo, exitDemo } = useDemoMode();

  if (!isDemo || !demoRole) return null;

  const handleSwitchRole = () => {
    const nextRole = demoRole === "buyer" ? "supplier" : "buyer";
    setDemo(nextRole);
    if (pathname.includes("/dashboard/buyer")) {
      router.push("/dashboard/supplier?demo=supplier");
    } else if (pathname.includes("/dashboard/supplier")) {
      router.push("/dashboard/buyer?demo=buyer");
    }
  };

  return (
    <div
      role="status"
      aria-label="Demo Evaluation Mode Active"
      className="relative z-50 w-full bg-graphite border-b border-copper/30 text-surface px-4 py-2 sm:py-2.5 shadow-md backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 text-xs">
        {/* Left: Indicator & Description */}
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-copper/20 border border-copper/40 text-copper font-mono text-[10px] uppercase font-bold tracking-wider shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-copper animate-pulse" />
            DEMO MODE · {demoRole.toUpperCase()}
          </span>

          <p className="text-silver/80 truncate text-[11px] sm:text-xs">
            Viewing simulated industrial procurement records ({demoRole === "buyer" ? "AeroTech Hydraulics" : "PrecisionCast Plant"}). No real data is affected.
          </p>
        </div>

        {/* Right: Actions (Role Switch & Exit) */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          <button
            type="button"
            onClick={handleSwitchRole}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/15 text-white text-[11px] font-medium transition-colors cursor-pointer"
            title={`Switch to ${demoRole === "buyer" ? "Supplier" : "Buyer"} demo view`}
          >
            <UserSwitch size={13} />
            <span>Switch to {demoRole === "buyer" ? "Supplier" : "Buyer"}</span>
          </button>

          <button
            type="button"
            onClick={() => exitDemo(redirectOnExit)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-copper hover:bg-copper-dark text-white text-[11px] font-semibold transition-colors cursor-pointer shadow-xs"
          >
            <span>Exit Demo Mode</span>
            <X size={12} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
}
