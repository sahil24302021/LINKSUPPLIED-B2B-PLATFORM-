"use client";

import { Suspense } from "react";
import { BuyerDashboardView } from "@/features/dashboard/BuyerDashboardView";
import { useDemoMode } from "@/hooks/use-demo-mode";
import { RouteGate } from "@/components/auth/RouteGate";
import {
  SAMPLE_REQUIREMENTS_DASHBOARD,
  SAMPLE_RFQS,
  SAMPLE_QUOTES,
  SAMPLE_BUYER_ACTIVITY,
  companies,
} from "@/data";

function BuyerDashboardContent() {
  const { isDemo, demoRole } = useDemoMode();
  const isBuyerDemo = isDemo && demoRole === "buyer";

  const savedSuppliers = isBuyerDemo
    ? [companies[7], companies[8], companies[0]]
    : [];

  return (
    <BuyerDashboardView
      requirements={isBuyerDemo ? SAMPLE_REQUIREMENTS_DASHBOARD : []}
      rfqs={isBuyerDemo ? SAMPLE_RFQS : []}
      quotes={isBuyerDemo ? SAMPLE_QUOTES : []}
      savedSuppliers={savedSuppliers}
      recentActivity={isBuyerDemo ? SAMPLE_BUYER_ACTIVITY : []}
      isDemo={isBuyerDemo}
    />
  );
}

export default function BuyerDashboardPage() {
  return (
    <RouteGate>
      <div className="py-10 md:py-16 bg-paper min-h-screen">
        <div className="grid-page">
          <div className="col-content">
            <Suspense fallback={<div className="p-8 text-center text-xs text-slate">Loading buyer workspace...</div>}>
              <BuyerDashboardContent />
            </Suspense>
          </div>
        </div>
      </div>
    </RouteGate>
  );
}
