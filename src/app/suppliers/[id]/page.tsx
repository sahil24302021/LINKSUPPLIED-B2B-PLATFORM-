import { Suspense } from "react";
import { notFound } from "next/navigation";
import { companies } from "@/data";
import { SupplierDetailClient } from "@/features/company/SupplierDetailClient";

interface SupplierPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return companies.map((c) => ({
    id: c.id,
  }));
}

export default async function SupplierDetailPage({ params }: SupplierPageProps) {
  const { id } = await params;
  const company = companies.find((c) => c.id === id);

  if (!company) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate">Loading supplier dossier...</div>}>
      <SupplierDetailClient company={company} />
    </Suspense>
  );
}
