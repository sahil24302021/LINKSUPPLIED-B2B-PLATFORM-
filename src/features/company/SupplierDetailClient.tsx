"use client";

import { useState } from "react";
import Link from "next/link";
import { SupplierProfileDossier } from "@/features/company/SupplierProfileDossier";
import { RequestQuoteModal } from "@/features/rfq/RequestQuoteModal";
import { SOURCING_PRESETS } from "@/data";
import type { Company, RFQSubmission } from "@/types";
import { CaretRight } from "@phosphor-icons/react";

interface SupplierDetailClientProps {
  company: Company;
}

export function SupplierDetailClient({ company }: SupplierDetailClientProps) {
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [_lastSubmission, setLastSubmission] = useState<RFQSubmission | null>(null);

  return (
    <div className="py-8 md:py-12 bg-paper min-h-screen">
      <div className="grid-page">
        <div className="col-content space-y-6">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate">
            <Link href="/" className="hover:text-ink transition-colors">
              Home
            </Link>
            <CaretRight size={12} />
            <Link href="/discover" className="hover:text-ink transition-colors">
              Discover
            </Link>
            <CaretRight size={12} />
            <span className="text-ink font-semibold truncate max-w-[30ch]">
              {company.name}
            </span>
          </div>

          {/* Master Supplier Dossier */}
          <SupplierProfileDossier
            company={company}
            requirement={SOURCING_PRESETS[0].requirement}
            onRequestQuote={() => setRfqModalOpen(true)}
            onSendInquiry={() => setRfqModalOpen(true)}
          />
        </div>
      </div>

      {/* Request Quote Modal */}
      <RequestQuoteModal
        company={company}
        requirement={SOURCING_PRESETS[0].requirement}
        isOpen={rfqModalOpen}
        onClose={() => setRfqModalOpen(false)}
        onSubmitRFQ={(sub) => setLastSubmission(sub)}
      />
    </div>
  );
}
