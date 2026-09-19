import { HeroProblemTransition } from "@/features/landing/HeroProblemTransition";
import { PipelineSection } from "@/features/landing/PipelineSection";
import { MatchingSection } from "@/features/landing/MatchingSection";
import { VerificationSection } from "@/features/landing/VerificationSection";
import { ProfilePreviewSection } from "@/features/landing/ProfilePreviewSection";
import { TwoSidedSection } from "@/features/landing/TwoSidedSection";
import { WhyLinksuppliedSection } from "@/features/landing/WhyLinksuppliedSection";
import { CTASection } from "@/features/landing/CTASection";

export default function Home() {
  return (
    <>
      {/* 01 + 02: Approved Hero & Problem Reveal */}
      <HeroProblemTransition />

      {/* 03: Better Approach — Traditional Search vs LINKSUPPLIED Model */}
      <WhyLinksuppliedSection />

      {/* 04: How It Works — 5-Step Pipeline with Realistic Product Previews */}
      <PipelineSection />

      {/* 05: Two-Sided Platform Network — Direct Procurement Teams & Plant Connections */}
      <TwoSidedSection />

      {/* 06: Verified Supplier Dossier Preview */}
      <ProfilePreviewSection />

      {/* 07: Explainable Matching Engine */}
      <MatchingSection />

      {/* 08: Multi-Tier Verification Framework */}
      <VerificationSection />

      {/* 09: Dual Intake Call to Action */}
      <CTASection />
    </>
  );
}
