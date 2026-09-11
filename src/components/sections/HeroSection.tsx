"use client";

import { Cta69 } from "@/components/ui/cta69";

export function HeroSection() {
  return (
    <Cta69
      badge={{ label: "B2B Discovery & Intelligence" }}
      heading={
        <>
          Don&apos;t search through thousands.
          <br />
          <span className="text-copper">Find the ones that fit.</span>
        </>
      }
      button={{
        label: "Start discovering",
        href: "/discover",
      }}
      labels={{
        marqueePhrase: "Relevance, not volume",
        note: "Tell LINKSUPPLIED what your business needs or what it makes — get ranked matches with explainable scores, capability verification, and evidence for every recommendation.",
        footnote: "Evidence-backed matching · Explainable scores · Two-sided discovery",
      }}
    />
  );
}
