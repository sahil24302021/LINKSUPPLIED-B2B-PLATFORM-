"use client";

import { Suspense } from "react";
import { SupplierDashboardView } from "@/features/dashboard/SupplierDashboardView";
import { useDemoMode } from "@/hooks/use-demo-mode";
import { RouteGate } from "@/components/auth/RouteGate";
import {
  SAMPLE_SUPPLIER_INBOUND_RFQS,
  SAMPLE_QUOTES,
  SAMPLE_BUYER_ACTIVITY,
  companies,
} from "@/data";
import type { Company } from "@/types";

const EMPTY_SUPPLIER_PROFILE: Company = {
  id: "unregistered-supplier",
  name: "Manufacturer Operational Workspace",
  description: "Register your manufacturing plant to list machinery envelopes, upload ISO certifications, and receive verified buyer RFQs.",
  type: "manufacturer",
  location: "Plant Pending Registration",
  country: "—",
  products: [],
  industries: [],
  marketsServed: [],
  certifications: [],
  verification: [],
};

function SupplierDashboardContent() {
  const { isDemo, demoRole } = useDemoMode();
  const isSupplierDemo = isDemo && demoRole === "supplier";

  const company = isSupplierDemo ? companies[7] : EMPTY_SUPPLIER_PROFILE;
  const inboundRfqs = isSupplierDemo ? SAMPLE_SUPPLIER_INBOUND_RFQS : [];
  const submittedQuotes = isSupplierDemo ? SAMPLE_QUOTES : [];
  const recentActivity = isSupplierDemo ? SAMPLE_BUYER_ACTIVITY : [];

  return (
    <SupplierDashboardView
      company={company}
      inboundRfqs={inboundRfqs}
      submittedQuotes={submittedQuotes}
      recentActivity={recentActivity}
      isDemo={isSupplierDemo}
    />
  );
}

export default function SupplierDashboardPage() {
  return (
    <RouteGate>
      <div className="py-10 md:py-16 bg-paper min-h-screen">
        <div className="grid-page">
          <div className="col-content">
            <Suspense fallback={<div className="p-8 text-center text-xs text-slate">Loading supplier desk...</div>}>
              <SupplierDashboardContent />
            </Suspense>
          </div>
        </div>
      </div>
    </RouteGate>
  );
}
